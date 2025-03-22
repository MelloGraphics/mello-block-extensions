<?php

// Remove current post from the core/query if the toggle is set to true

function exclude_current_post_from_query($block_content, $block) {
    if ($block['blockName'] !== 'core/query') {
        return $block_content;
    }

    $attributes = $block['attrs'];

    // Check if excludeCurrentPost is true
    if (!isset($attributes['excludeCurrentPost']) || !$attributes['excludeCurrentPost']) {
        return $block_content;
    }

    // Get the current post ID
    $current_post_id = get_the_ID();

    // Check if the current post ID is already in the exclude array
    if (!isset($attributes['query']['exclude']) || !in_array($current_post_id, $attributes['query']['exclude'])) {
        // Add the current post ID to the exclude array
        $attributes['query']['exclude'][] = $current_post_id;

        // Update the block's attributes
        $block['attrs'] = $attributes;

        // Re-render the block with the updated attributes
        $block_content = render_block($block);
    }

    return $block_content;
}

// Add the filter
add_filter('render_block', 'exclude_current_post_from_query', 10, 2);