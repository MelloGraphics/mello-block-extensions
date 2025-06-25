<?php
// Add this to your plugin's main PHP file or functions.php

// Hook into the render_block filter to modify button output
add_filter('render_block', 'mello_add_icon_to_button_block', 10, 2);

function mello_add_icon_to_button_block($block_content, $block) {
    // Only process core/button blocks
    if ($block['blockName'] !== 'core/button') {
        return $block_content;
    }
    
    // Check if icon is enabled and we have the necessary attributes
    $attrs = $block['attrs'] ?? [];
    $icon_enabled = $attrs['iconEnabled'] ?? false;
    $icon_type = $attrs['iconType'] ?? 'none';
    $icon_glyph = $attrs['iconGlyph'] ?? '';
    $icon_image_url = $attrs['iconImageURL'] ?? '';
    
    // Exit early if icon is not enabled or type is none
    if (!$icon_enabled || $icon_type === 'none') {
        return $block_content;
    }
    
    // Generate icon HTML
    $icon_html = '';
    
    if ($icon_type === 'fa' && !empty($icon_glyph)) {
        // Font Awesome icon - don't escape HTML entities for glyphs
        $icon_html = sprintf(
            '<span class="mello-button-icon mello-fa-icon" aria-hidden="true">%s</span>',
            $icon_glyph
        );
    } elseif ($icon_type === 'image' && !empty($icon_image_url)) {
        // Image icon
        $icon_html = sprintf(
            '<img class="mello-button-icon mello-image-icon" src="%s" alt="">',
            esc_url($icon_image_url)
        );
    }
    
    // If we have icon HTML, inject it into the button link
    if (!empty($icon_html)) {
        $pattern = '/(<a[^>]*class="[^"]*wp-block-button__link[^"]*"[^>]*>)/i';
        $replacement = '$1' . $icon_html;
        return preg_replace($pattern, $replacement, $block_content);
    }
    
    return $block_content;
}