<?php

/**
 * Renders custom JavaScript from blocks in the footer with security validation
 */
function mello_render_custom_js() {
    // Only run on the front end
    if (is_admin()) {
        return;
    }

    $post_id = get_the_ID();
    
    if (!$post_id) {
        return;
    }
    
    $post = get_post($post_id);
    
    if (!$post || empty($post->post_content)) {
        return;
    }
    
    // Parse blocks from content
    $blocks = parse_blocks($post->post_content);
    
    // Collect all custom JS from allowed blocks
    $all_js = mello_collect_custom_js($blocks);
    
    // If we have custom JS, validate it and output in the footer
    if (!empty($all_js)) {
        // Validate JS before output
        if (mello_validate_js($all_js)) {
            echo '<script id="mello-custom-block-js">' . "\n";
            echo "document.addEventListener('DOMContentLoaded', function() {\n";
            echo $all_js;
            echo "\n});\n";
            echo '</script>' . "\n";
        } else {
            // Optionally log the error for admins
            if (current_user_can('manage_options') && is_user_logged_in()) {
                echo '<!-- Warning: Custom JS was blocked due to security concerns -->';
            }
        }
    }
}
add_action('wp_footer', 'mello_render_custom_js', 99);

/**
 * Recursively collect custom JS from blocks
 *
 * @param array $blocks The blocks to search through
 * @return string The collected JS
 */
function mello_collect_custom_js($blocks) {
    $all_js = '';
    $allowed_blocks = array('core/group', 'core/columns', 'core/cover');
    
    foreach ($blocks as $block) {
        // Check if this is an allowed block type with custom JS
        if (in_array($block['blockName'], $allowed_blocks) && 
            isset($block['attrs']['customJS']) && 
            !empty($block['attrs']['customJS'])) {
            
            // Validate the JS before adding it
            $js = $block['attrs']['customJS'];
            if (mello_validate_js($js)) {
                // Add a comment to identify which block the JS belongs to
                $all_js .= "\n// JS from " . $block['blockName'] . " block\n";
                $all_js .= $js . "\n";
            }
        }
        
        // Recursively check for inner blocks
        if (!empty($block['innerBlocks'])) {
            $inner_js = mello_collect_custom_js($block['innerBlocks']);
            if (!empty($inner_js)) {
                $all_js .= $inner_js;
            }
        }
    }
    
    return $all_js;
}

/**
 * Validates JavaScript for security concerns
 *
 * @param string $js The JavaScript code to validate
 * @return bool Whether the code passes security validation
 */
function mello_validate_js($js) {
    // Skip empty JS
    if (empty($js)) {
        return true;
    }
    
    // List of potentially dangerous patterns to check for
    $dangerous_patterns = array(
        // Prevent JavaScript from making HTTP requests to external domains
        '/(fetch|XMLHttpRequest|ajax)\s*\(/i',
        
        // Block eval and similar functions
        '/\b(eval|Function|setTimeout|setInterval)\s*\(\s*[\'"`]/i',
        
        // Block creating script tags
        '/document\.createElement\s*\(\s*[\'"`]script[\'"`]\s*\)/i',
        
        // Block potentially harmful global objects
        '/\b(localStorage|sessionStorage|indexedDB|document\.cookie)\b/i',
        
        // Block iframe manipulation
        '/\b(iframe|embed|object)\b/i',
        
        // Block direct form manipulation that could be used for phishing
        '/\bdocument\.forms\b/i',
        
        // Block potential data exfiltration
        '/\b(navigator\.sendBeacon)\b/i',
        
        // Block WebSocket connections
        '/\bnew\s+WebSocket\b/i'
    );
    
    // Check for dangerous patterns
    foreach ($dangerous_patterns as $pattern) {
        if (preg_match($pattern, $js)) {
            // If you want to log which pattern was triggered for debugging
            if (WP_DEBUG) {
                error_log('Blocked potentially harmful JS matching pattern: ' . $pattern);
            }
            return false;
        }
    }
    
    // Additional allowlist approach - you can define a list of allowed functions/methods
    // and only allow those, blocking everything else
    
    // If the code passes all checks, return true
    return true;
}

/**
 * Creates admin notice for users if unsafe JS was detected and blocked
 */
function mello_notify_unsafe_js() {
    // This function would display a notice to administrators if unsafe JS was detected
    // You'd need to implement a mechanism to track when JS was blocked
    // For example, store a transient when JS is blocked and check for it here
}
add_action('admin_notices', 'mello_notify_unsafe_js');

/**
 * Option to bypass JS security for admin users
 * 
 * @param string $js The JavaScript code to validate
 * @return bool Whether the code passes validation
 */
function mello_maybe_bypass_js_validation($js) {
    // Check if current user has permission to bypass validation
    if (current_user_can('manage_options') && get_option('mello_bypass_js_validation', false)) {
        return true;
    }
    
    // Otherwise, use the standard validation
    return mello_validate_js($js);
}

/**
 * Adds settings to control JS validation
 */
function mello_register_validation_settings() {
    register_setting('writing', 'mello_bypass_js_validation', array(
        'type' => 'boolean',
        'description' => __('Allow admins to bypass JavaScript validation (use with caution)', 'mello-block-extensions'),
        'default' => false,
    ));
}
add_action('admin_init', 'mello_register_validation_settings');

/**
 * Add field to Writing settings page
 */
function mello_validation_settings_field() {
    add_settings_field(
        'mello_bypass_js_validation',
        __('JavaScript Validation', 'mello-block-extensions'),
        'mello_render_validation_field',
        'writing'
    );
}
add_action('admin_init', 'mello_validation_settings_field');

/**
 * Render the bypass validation checkbox
 */
function mello_render_validation_field() {
    $value = get_option('mello_bypass_js_validation', false);
    ?>
    <label for="mello_bypass_js_validation">
        <input name="mello_bypass_js_validation" type="checkbox" id="mello_bypass_js_validation" value="1" <?php checked($value, true); ?>>
        <?php _e('Allow administrators to bypass JavaScript security validation (use with caution)', 'mello-block-extensions'); ?>
    </label>
    <p class="description">
        <?php _e('Warning: Enabling this option could pose security risks if malicious code is entered.', 'mello-block-extensions'); ?>
    </p>
    <?php
}