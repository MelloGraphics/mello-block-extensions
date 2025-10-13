<?php

/**
 * Enable SVG uploads in WordPress
 */
function enable_svg_upload($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'enable_svg_upload');

/**
 * Fix SVG display in media library
 */
function fix_svg_display($response, $attachment, $meta) {
    if ($response['type'] === 'image' && $response['subtype'] === 'svg+xml') {
        $response['image'] = [
            'src' => $response['url'],
            'width' => 150,
            'height' => 150,
        ];
        $response['thumb'] = [
            'src' => $response['url'],
            'width' => 150,
            'height' => 150,
        ];
        $response['sizes'] = [
            'full' => [
                'url' => $response['url'],
                'width' => 150,
                'height' => 150,
            ],
        ];
    }
    return $response;
}
add_filter('wp_prepare_attachment_for_js', 'fix_svg_display', 10, 3);

/**
 * Add CSS to fix SVG display in media library
 */
function svg_media_library_css() {
    echo '<style>
        table.media .column-title .media-icon img[src$=".svg"] {
            width: 60px;
            height: auto;
        }
    </style>';
}
add_action('admin_head', 'svg_media_library_css');

/**
 * Sanitize SVG uploads for security
 */
function sanitize_svg_upload($file) {
    if ($file['type'] === 'image/svg+xml') {
        $svg_content = file_get_contents($file['tmp_name']);
        
        // Basic security check - remove potentially dangerous elements
        $dangerous_tags = ['script', 'iframe', 'object', 'embed', 'link'];
        $has_danger = false;
        
        foreach ($dangerous_tags as $tag) {
            if (stripos($svg_content, '<' . $tag) !== false) {
                // Allow script tags for animations, but log it
                if ($tag === 'script') {
                    error_log('SVG uploaded with script tag: ' . $file['name']);
                    continue;
                }
                $has_danger = true;
                break;
            }
        }
        
        if ($has_danger) {
            $file['error'] = 'This SVG file contains potentially dangerous elements and cannot be uploaded.';
        }
    }
    return $file;
}
add_filter('wp_handle_upload_prefilter', 'sanitize_svg_upload');

/**
 * Render SVG images inline for styling and animations
 */
function render_svg_inline($content) {
    // Check if the content contains the `style-svg` class
    if (strpos($content, 'style-svg') === false) {
        return $content;
    }

    // Find img tags within elements with style-svg class
    $pattern = '/(<[^>]*class="[^"]*style-svg[^"]*"[^>]*>.*?)(<img[^>]*src="([^"]*\.svg)"[^>]*class="([^"]*)"[^>]*\/?>)(.*?<\/[^>]+>)/is';
    
    $content = preg_replace_callback($pattern, function($matches) {
        $before_img = $matches[1];
        $svg_src = $matches[3];
        $img_classes = $matches[4];
        $after_img = $matches[5];
        
        // Resolve the full path of the SVG file
        $path_to_svg = wp_normalize_path(ABSPATH . str_replace(site_url() . '/', '', $svg_src));
        
        if (!file_exists($path_to_svg)) {
            error_log("SVG file not found: $path_to_svg");
            return $matches[0];
        }
        
        // Cache the processed SVG
        $cache_key = 'inline_svg_v3_' . md5($path_to_svg . filemtime($path_to_svg));
        $cached_data = get_transient($cache_key);
        
        if (!$cached_data) {
            $svg_content = file_get_contents($path_to_svg);
            if ($svg_content) {
                
                // Remove CDATA wrappers from text elements
                $svg_content = preg_replace_callback(
                    '/<text([^>]*)>(.*?)<\/text>/is',
                    function($m) {
                        $text = preg_replace('/<!\[CDATA\[(.*?)\]\]>/s', '$1', $m[2]);
                        return '<text' . $m[1] . '>' . $text . '</text>';
                    },
                    $svg_content
                );
                
                // Process scripts - keep them in SVG but escape special characters per SVGator method
                $svg_content = preg_replace_callback(
                    '/<script([^>]*)>(.*?)<\/script>/is',
                    function($m) {
                        $script = $m[2];
                        // Extract from CDATA if present
                        if (preg_match('/^[\s\n]*<!\[CDATA\[(.*)\]\]>[\s\n]*$/s', $script, $cdata)) {
                            $script = $cdata[1];
                        }
                        
                        // Replace special characters with HTML entities (SVGator method)
                        $replacements = [
                            '<' => '&lt;',
                            '>' => '&gt;',
                            '[' => '&#91;',
                            ']' => '&#93;',
                        ];
                        
                        $script = str_replace(
                            array_keys($replacements),
                            array_values($replacements),
                            $script
                        );
                        
                        return '<script' . $m[1] . '>' . $script . '</script>';
                    },
                    $svg_content
                );
                
                $cached_data = $svg_content;
                set_transient($cache_key, $cached_data, DAY_IN_SECONDS);
            }
        }
        
        if (!$cached_data) {
            return $matches[0];
        }
        
        // Add classes to the SVG tag
        $svg_with_classes = preg_replace_callback(
            '/<svg([^>]*)>/',
            function($svg_matches) use ($img_classes) {
                $attrs = $svg_matches[1];
                $combined_classes = trim($img_classes . ' replaced-svg');
                
                if (preg_match('/class="([^"]*)"/', $attrs, $class_match)) {
                    $existing = $class_match[1];
                    $all_classes = trim($existing . ' ' . $combined_classes);
                    $attrs = preg_replace('/class="[^"]*"/', 'class="' . esc_attr($all_classes) . '"', $attrs);
                } else {
                    $attrs .= ' class="' . esc_attr($combined_classes) . '"';
                }
                
                return '<svg' . $attrs . '>';
            },
            $cached_data,
            1
        );
        
        return $before_img . $svg_with_classes . $after_img;
    }, $content);
    
    return $content;
}

// Apply to full page output
function buffer_template_output() {
    ob_start(function ($content) {
        return render_svg_inline($content);
    });
}
add_action('template_redirect', 'buffer_template_output');

// Apply to post/page content
add_filter('the_content', 'render_svg_inline', 20);

// Add class to blocks with the renderSVG attribute
add_filter('render_block', function ($block_content, $block) {
    if (
        in_array($block['blockName'], ['core/site-logo', 'core/post-featured-image'], true)
        && !empty($block['attrs']['renderSVG'])
    ) {
        $tag = ($block['blockName'] === 'core/site-logo') ? 'div' : 'figure';
        
        $block_content = preg_replace_callback(
            '/<' . $tag . '([^>]*class=")([^"]*)"/',
            function ($matches) use ($tag) {
                $existing_classes = $matches[2];
                if (strpos($existing_classes, 'style-svg') === false) {
                    $existing_classes .= ' style-svg';
                }
                return '<' . $tag . $matches[1] . $existing_classes . '"';
            },
            $block_content
        );
    }
    
    return $block_content;
}, 20, 2);