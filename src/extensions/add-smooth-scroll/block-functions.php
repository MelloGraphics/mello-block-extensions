<?php

function mello_render_scroll_speed_data($block_content, $block) {
    if (!in_array($block['blockName'], ['core/post-title', 'core/query-title', 'core/post-featured-image'])) {
        return $block_content;
    }

    $attributes = [];

    if (!empty($block['attrs']['dataAttributes'])) {
        $attributes[] = htmlspecialchars_decode(esc_attr($block['attrs']['dataAttributes']));
    }

    if (isset($block['attrs']['scrollSpeed']) && is_numeric($block['attrs']['scrollSpeed'])) {
        if (!empty($block['attrs']['scrollSpeedTargetInner']) && $block['attrs']['scrollSpeedTargetInner'] === true) {
            // Do not add data-scroll-speed to figure here, will be added to img later
        } else {
            $attributes[] = 'data-scroll-speed="' . esc_attr($block['attrs']['scrollSpeed']) . '"';
        }
    }

    if (!empty($attributes)) {
        $attributes_string = implode(' ', $attributes);
        $block_content = preg_replace('/<((h[1-6])|figure)([^>]*)>/i', '<$1$3 ' . $attributes_string . '>', $block_content, 1);
    }

    if (!empty($block['attrs']['scrollSpeedTargetInner']) && $block['attrs']['scrollSpeedTargetInner'] === true) {
        // Add class to figure
        $block_content = preg_replace_callback(
            '/<figure([^>]*)>/i',
            function ($matches) {
                $existing = $matches[1];
                if (strpos($existing, 'class=') !== false) {
                    return str_replace('class="', 'class="has-inner-scroll-speed ', '<figure' . $existing . '>');
                }
                return '<figure class="has-inner-scroll-speed"' . $existing . '>';
            },
            $block_content,
            1
        );

        // Add data-scroll-speed to first <img>
        if (isset($block['attrs']['scrollSpeed']) && is_numeric($block['attrs']['scrollSpeed'])) {
            $speed_attr = 'data-scroll-speed="' . esc_attr($block['attrs']['scrollSpeed']) . '"';
            $block_content = preg_replace('/<img([^>]*)>/i', '<img$1 ' . $speed_attr . '>', $block_content, 1);
        }
    }

    return $block_content;
}

add_filter('render_block', 'mello_render_scroll_speed_data', 10, 2);