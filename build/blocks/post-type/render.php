<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Ensure this is running within the WordPress context
if (!defined('ABSPATH')) {
    exit;
}

// Get the post ID from the global query (for `core/query` compatibility)
$post_id = get_the_ID();
$post_type_label = '';

if ($post_id) {
    // Get the post type
    $post_type = get_post_type($post_id);
    $post_type_obj = get_post_type_object($post_type);

    // Get the label of the post type
    $post_type_label = isset($post_type_obj->label) ? esc_html($post_type_obj->label) : '';
}

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php if (!empty($post_type_label)) : ?>
        <?php echo esc_html($post_type_label); ?>
    <?php endif; ?>
</div>