<?php

add_filter('render_block', function ($block_content, $block) {
	if (
		!empty($block['attrs']['animateSelf']) &&
		$block['attrs']['animateSelf'] === true
	) {
		$type     = isset($block['attrs']['animationType']) ? esc_attr($block['attrs']['animationType']) : 'fade-in';
		if (!empty($block['attrs']['animateChildren'])) {
		    $trigger = 'parent';
		} else {
		    $trigger = isset($block['attrs']['animationTriggerSelf']) && $block['attrs']['animationTriggerSelf'] ? 'self' : 'parent';
		}
		$duration = isset($block['attrs']['animationDuration']) ? intval($block['attrs']['animationDuration']) : 600;
		$delay    = isset($block['attrs']['animationDelay']) ? intval($block['attrs']['animationDelay']) : 0;
		$point    = isset($block['attrs']['animationTriggerPoint']) ? esc_attr($block['attrs']['animationTriggerPoint']) : -25;

		$animate_children = isset($block['attrs']['animateChildren']) ? $block['attrs']['animateChildren'] : false;
		$child_type      = isset($block['attrs']['childAnimationType']) ? esc_attr($block['attrs']['childAnimationType']) : 'fade-in';
		$child_duration   = isset($block['attrs']['childAnimationDuration']) ? intval($block['attrs']['childAnimationDuration']) : 600;
		$child_stagger_delay = isset($block['attrs']['childAnimationStaggerDelay']) ? intval($block['attrs']['childAnimationStaggerDelay']) : 0;

		$block_content = preg_replace(
			'/^<([^ >]+)([^>]*)>/',
			'<$1$2 data-animation="true" data-animation-type="' . $type . '" data-animation-trigger="' . $trigger . '" data-animation-duration="' . $duration . '" data-animation-delay="' . $delay . '" data-animation-trigger-point="' . $point . '" data-animate-children="' . ($animate_children ? 'true' : 'false') . '" data-child-animation-type="' . $child_type . '" data-child-animation-duration="' . $child_duration . '" data-child-animation-stagger-delay="' . $child_stagger_delay . '">',
			$block_content
		);
	}

	return $block_content;
}, 10, 2);

add_filter('render_block_core/post-template', function ($block_content, $block) {
	if (
		!empty($block['attrs']['animateChildren']) &&
		$block['attrs']['animateChildren'] === true
	) {
		$child_type      = isset($block['attrs']['childAnimationType']) ? esc_attr($block['attrs']['childAnimationType']) : 'fade-in';
		$child_duration   = isset($block['attrs']['childAnimationDuration']) ? intval($block['attrs']['childAnimationDuration']) : 600;
		$child_stagger_delay = isset($block['attrs']['childAnimationStaggerDelay']) ? intval($block['attrs']['childAnimationStaggerDelay']) : 0;

		$block_content = preg_replace(
			'/^<ul([^>]*)>/',
			'<ul$1 data-animation-trigger="parent" data-child-animation="true" data-child-animation-type="' . $child_type . '" data-child-animation-duration="' . $child_duration . '" data-child-animation-stagger-delay="' . $child_stagger_delay . '">',
			$block_content
		);
	}

	return $block_content;
}, 10, 2);