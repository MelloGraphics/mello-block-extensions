<?php

function mello_render_data_attribute($block_content, $block) {
    if (!in_array($block['blockName'], ['core/post-title', 'core/query-title'])) {
        return $block_content;
    }

    if (!empty($block['attrs']['dataAttributes'])) {
        $data_attribute = htmlspecialchars_decode(esc_attr($block['attrs']['dataAttributes']));
        
        // Ensure data attribute is injected into the <h1>-<h6> tag
        $block_content = preg_replace('/<(h[1-6])([^>]*)>/i', '<$1$2 ' . $data_attribute . '>', $block_content, 1);
    }

    return $block_content;
}

add_filter('render_block', 'mello_render_data_attribute', 10, 2);