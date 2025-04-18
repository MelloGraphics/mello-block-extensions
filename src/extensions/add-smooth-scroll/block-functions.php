<?php

function mello_render_scroll_speed_data($block_content, $block) {
    if (!in_array($block['blockName'], ['core/post-title', 'core/query-title'])) {
        return $block_content;
    }

    $attributes = [];

    if (!empty($block['attrs']['dataAttributes'])) {
        $attributes[] = htmlspecialchars_decode(esc_attr($block['attrs']['dataAttributes']));
    }

    if (isset($block['attrs']['scrollSpeed']) && is_numeric($block['attrs']['scrollSpeed'])) {
        $attributes[] = 'data-scroll-speed="' . esc_attr($block['attrs']['scrollSpeed']) . '"';
    }

    if (!empty($attributes)) {
        $attributes_string = implode(' ', $attributes);
        $block_content = preg_replace('/<(h[1-6])([^>]*)>/i', '<$1$2 ' . $attributes_string . '>', $block_content, 1);
    }

    return $block_content;
}

add_filter('render_block', 'mello_render_scroll_speed_data', 10, 2);