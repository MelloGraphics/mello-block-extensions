<?php

function mello_render_button_block($block_content, $block) {
    if (!empty($block['attrs']['openInModal'])) {
        // Add a class to indicate this button should open a modal
        $block_content = str_replace('wp-block-button__link', 'wp-block-button__link open-modal', $block_content);
    }
    return $block_content;
}

add_filter('render_block_core/button', 'mello_render_button_block', 10, 2);