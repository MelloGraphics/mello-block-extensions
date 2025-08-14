<?php
/**
 * Add animation attributes to the Post Template block
 * 
 * This function adds animation attributes specifically to the post-template block
 * which is rendered server-side by WordPress.
 */

// Add .js class to the html tag for animation-related styles
add_action('wp_head', function () {
    if ( ! is_admin() ) {
        echo "<script>document.documentElement.classList.add('js');</script>";
    }
}, 0);

add_filter('render_block_core/post-template', function ($block_content, $block) {
    // Only process if child animation is explicitly enabled
    if (empty($block['attrs']['animateChildren']) || $block['attrs']['animateChildren'] !== true) {
        return $block_content;
    }

    // Get animation settings with fallbacks
    $child_type = isset($block['attrs']['childAnimationType']) ? esc_attr($block['attrs']['childAnimationType']) : 'fade-in';
    $child_duration = isset($block['attrs']['childAnimationDuration']) ? intval($block['attrs']['childAnimationDuration']) : 600;
    $child_stagger_delay = isset($block['attrs']['childAnimationStaggerDelay']) ? intval($block['attrs']['childAnimationStaggerDelay']) : 0;
    $childTrigger = isset($block['attrs']['childAnimationTrigger']) ? esc_attr($block['attrs']['childAnimationTrigger']) : 'section';
    $childPoint = isset($block['attrs']['childAnimationTriggerPoint']) ? esc_attr($block['attrs']['childAnimationTriggerPoint']) : -25;

    // Build attribute string with only non-empty values
    $attribute_string = ' data-child-animation="true"' .
        ' data-child-animation-type="' . $child_type . '"' .
        ' data-child-animation-duration="' . $child_duration . '"' .
        ' data-child-animation-stagger-delay="' . $child_stagger_delay . '"' .
        ' data-child-animation-trigger="' . $childTrigger . '"' .
        ' data-child-animation-trigger-point="' . $childPoint . '"';

    // Only add custom selector if trigger is custom AND it has a value
    if ($childTrigger === 'custom' &&
        isset($block['attrs']['childAnimationCustomSelector']) &&
        !empty($block['attrs']['childAnimationCustomSelector'])) {
        $childCustomSelector = esc_attr($block['attrs']['childAnimationCustomSelector']);
        $attribute_string .= ' data-child-animation-custom-selector="' . $childCustomSelector . '"';
    }

    // Find the opening tag of the ul element
    $pattern = '/<ul([^>]*)>/i';

    // Replace only the first occurrence
    $replaced_content = preg_replace($pattern, '<ul$1' . $attribute_string . '>', $block_content, 1);

    return ($replaced_content !== null && $replaced_content !== $block_content)
        ? $replaced_content
        : $block_content;
}, 10, 2);