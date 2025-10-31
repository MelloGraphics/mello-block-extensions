<?php

/**
 * Enable SVG uploads in WordPress
 */
function render_svg_ext_enable_svg_upload($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'render_svg_ext_enable_svg_upload');

/**
 * Sanitize SVG uploads for security
 */
function render_svg_ext_sanitize_svg_upload($file)
{
    if ($file['type'] === 'image/svg+xml') {
        $svg_content = file_get_contents($file['tmp_name']);

        $is_svgator = strpos($svg_content, '__SVGATOR_PLAYER__') !== false;
        $has_danger = false;

        // Tags we want to block unless explicitly allowed
        $dangerous_tags = ['iframe', 'object', 'embed', 'link'];

        foreach ($dangerous_tags as $tag) {
            if (stripos($svg_content, '<' . $tag) !== false) {
                $has_danger = true;
                break;
            }
        }

        // Block SVGs with dangerous tags unless it's SVGator
        if ($has_danger && !$is_svgator) {
            $file['error'] = 'This SVG file contains potentially dangerous elements and cannot be uploaded.';
            return $file;
        }
    }

    return $file;
}
add_filter('wp_handle_upload_prefilter', 'render_svg_ext_sanitize_svg_upload');

/**
 * Fix SVG display in media library
 */
function render_svg_ext_fix_svg_display($response, $attachment, $meta)
{
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
add_filter('wp_prepare_attachment_for_js', 'render_svg_ext_fix_svg_display', 10, 3);

/**
 * Add CSS to fix SVG display in media library
 */
function render_svg_ext_media_library_css()
{
    echo '<style>
        table.media .column-title .media-icon img[src$=".svg"] {
            width: 60px;
            height: auto;
        }
    </style>';
}
add_action('admin_head', 'render_svg_ext_media_library_css');

/**
 * Render SVG images inline for styling and animations
 */
function render_style_svg_as_inline($content) {
    if (strpos($content, 'style-svg') === false) {
        return $content;
    }

    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

    $xpath = new DOMXPath($dom);
    $elements = $xpath->query('//*[@class and contains(concat(" ", normalize-space(@class), " "), " style-svg ")]');

    foreach ($elements as $element) {
        $images = $element->getElementsByTagName('img');

        foreach ($images as $img) {
            $src = $img->getAttribute('src');
            if (!$src) continue;

            $path_to_svg = wp_normalize_path(ABSPATH . str_replace(site_url() . '/', '', strtok($src, '?')));
            if (!file_exists($path_to_svg)) continue;

            $cache_key = 'inline_svg_' . md5($path_to_svg . filemtime($path_to_svg));
            $cached_svg = get_transient($cache_key);

            if (!$cached_svg) {
                $svg_content = file_get_contents($path_to_svg);
                if ($svg_content) {
                    set_transient($cache_key, $svg_content, DAY_IN_SECONDS);
                }
            } else {
                $svg_content = $cached_svg;
            }

            if (!$svg_content) continue;

            $img_classes = $img->getAttribute('class');

            // More robust check for <script> tags in SVGs
            if (preg_match('/<script\b/i', $svg_content)) {
                // Clear cache to prevent stale inline render
                delete_transient($cache_key);

                $embed = $dom->createElement('embed');
                $embed->setAttribute('type', 'image/svg+xml');
                $embed->setAttribute('src', esc_url($src));
                $embed->setAttribute('class', $img_classes . ' mello-svg-embed mello-svg-embed-observed');
                $embed->setAttribute('width', '100%');
                $embed->setAttribute('height', '100%');
                $embed->setAttribute('loading', 'lazy');
                $embed->setAttribute('data-animate', 'true');
                $img->parentNode->replaceChild($embed, $img);
                continue;
            }

            $svg_dom = new DOMDocument();
            $svg_dom->loadXML($svg_content);
            $svg_node = $svg_dom->documentElement;
            if (!$svg_node || $svg_node->nodeName !== 'svg') continue;

            $existing_classes = $svg_node->getAttribute('class');
            $combined_classes = trim($existing_classes . ' ' . $img_classes . ' replaced-svg');
            $svg_node->setAttribute('class', $combined_classes);

            $svg_node = $dom->importNode($svg_node, true);
            $img->parentNode->replaceChild($svg_node, $img);
        }
    }

    return $dom->saveHTML();
}

// Apply to full page output
function render_svg_ext_buffer_template_output()
{
    ob_start(function ($content) {
        return render_style_svg_as_inline($content);
    });
}
add_action('template_redirect', 'render_svg_ext_buffer_template_output');

// Apply to post/page content
add_filter('the_content', 'render_style_svg_as_inline', 20);

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

// Add IntersectionObserver to pause/resume SVGator animations in <object> tags
add_action('wp_footer', function () {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function () {
        const observedObjects = document.querySelectorAll('.mello-svg-embed-observed');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const obj = entry.target;
                const svgDoc = obj.contentDocument;
                if (!svgDoc) return;

                const svgEl = svgDoc.querySelector('svg');
                if (!svgEl || typeof svgEl.pauseAnimations !== 'function') return;

                if (entry.isIntersecting) {
                    svgEl.unpauseAnimations?.();
                } else {
                    svgEl.pauseAnimations?.();
                }
            });
        }, { threshold: 0.1 });

        observedObjects.forEach(obj => observer.observe(obj));
    });
    </script>
    <?php
}, 20);

add_action('wp_head', function () {
    echo '<style>
        .mello-svg-embed {
            pointer-events: none;
            position: relative;
            z-index: -1;
        }
        .mello-svg-embed[data-interactive="true"] {
            pointer-events: auto;
            z-index: auto;
        }
    </style>';
});