<?php

function render_style_svg_as_inline($content) {
    // Check if the content contains the `style-svg` class in any form before proceeding
    if (strpos($content, 'style-svg') === false) {
        return $content; // Skip processing if `style-svg` is not found anywhere in the content
    }

    libxml_use_internal_errors(true); // Suppress warnings from invalid HTML
    $dom = new DOMDocument();
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

    $xpath = new DOMXPath($dom);

    // Find all elements with the `style-svg` class in the class list
    $elements = $xpath->query('//*[@class and contains(concat(" ", normalize-space(@class), " "), " style-svg ")]');

    foreach ($elements as $element) {
        // Only process <img> tags that are direct descendants of `.style-svg` parents
        $images = $element->getElementsByTagName('img');

        foreach ($images as $img) {
            $src = $img->getAttribute('src');

            if (!$src) {
                continue; // Skip if the <img> tag doesn't have a valid src
            }

            // Resolve the full path of the SVG file
            $path_to_svg = wp_normalize_path(ABSPATH . str_replace(site_url() . '/', '', $src));

            if (!file_exists($path_to_svg)) {
                error_log("SVG file not found: $path_to_svg");
                continue;
            }

            $cache_key = 'inline_svg_' . md5($path_to_svg . filemtime($path_to_svg));
            $cached_svg = get_transient($cache_key);

            if (!$cached_svg) {
                $svg_content = file_get_contents($path_to_svg);
                if ($svg_content) {
                    $svg_dom = new DOMDocument();
                    $svg_dom->loadXML($svg_content);
                    $svg_node = $svg_dom->documentElement;
                    $cached_svg = $svg_dom->saveXML($svg_node);
                    set_transient($cache_key, $cached_svg, DAY_IN_SECONDS);
                }
            }

            if ($cached_svg) {
                $svg_dom = new DOMDocument();
                $svg_dom->loadXML($cached_svg);
                $svg_node = $svg_dom->documentElement;

                // Retrieve the classes from the <img> tag
                $img_classes = $img->getAttribute('class');
                $existing_classes = $svg_node->getAttribute('class');

                // Combine and set the classes on the <svg> tag
                $combined_classes = trim($existing_classes . ' ' . $img_classes . ' replaced-svg');
                $svg_node->setAttribute('class', $combined_classes);

                // Import the SVG into the current DOM and replace the <img> tag
                $svg_node = $dom->importNode($svg_node, true);
                $img->parentNode->replaceChild($svg_node, $img);
            }
        }
    }

    return $dom->saveHTML();
}

// Apply the SVG replacement filter to the entire page output
function buffer_template_output() {
    ob_start('render_style_svg_as_inline');
}
add_action('template_redirect', 'buffer_template_output');

// Also apply to `the_content` to handle post/page content
add_filter('the_content', 'render_style_svg_as_inline', 20);

add_filter('render_block', function($block_content, $block) {
    if (
        in_array($block['blockName'], ['core/site-logo', 'core/post-featured-image'], true)
        && !empty($block['attrs']['renderSVG'])
    ) {
        $tag = ($block['blockName'] === 'core/site-logo') ? 'div' : 'figure';

        // Inject the style-svg class into the wrapper tag
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