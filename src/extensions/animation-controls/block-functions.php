<?php

add_filter('render_block', function ($block_content, $block) {
	if (
		!empty($block['attrs']['animateSelf']) &&
		$block['attrs']['animateSelf'] === true
	) {
		$type     = isset($block['attrs']['animationType']) ? esc_attr($block['attrs']['animationType']) : 'fade-in';
		$trigger = isset($block['attrs']['animationTrigger']) 
			? esc_attr($block['attrs']['animationTrigger']) 
			: 'section';
		$customSelector = isset($block['attrs']['animationTriggerCustomSelector']) 
			? esc_attr($block['attrs']['animationTriggerCustomSelector']) 
			: '';
		$point = isset($block['attrs']['animationTriggerPoint']) 
			? esc_attr($block['attrs']['animationTriggerPoint']) 
			: -25;
		$duration = isset($block['attrs']['animationDuration']) ? intval($block['attrs']['animationDuration']) : 600;
		$delay    = isset($block['attrs']['animationDelay']) ? intval($block['attrs']['animationDelay']) : 0;
		
		$animate_children = isset($block['attrs']['animateChildren']) ? $block['attrs']['animateChildren'] : false;
		$child_type      = isset($block['attrs']['childAnimationType']) ? esc_attr($block['attrs']['childAnimationType']) : 'fade-in';
		$child_duration   = isset($block['attrs']['childAnimationDuration']) ? intval($block['attrs']['childAnimationDuration']) : 600;
		$child_stagger_delay = isset($block['attrs']['childAnimationStaggerDelay']) ? intval($block['attrs']['childAnimationStaggerDelay']) : 0;

		$childTrigger = isset($block['attrs']['childAnimationTrigger']) 
			? esc_attr($block['attrs']['childAnimationTrigger']) 
			: 'section';
		$childCustomSelector = isset($block['attrs']['childAnimationCustomSelector']) 
			? esc_attr($block['attrs']['childAnimationCustomSelector']) 
			: '';
		$childPoint = isset($block['attrs']['childAnimationTriggerPoint']) 
			? esc_attr($block['attrs']['childAnimationTriggerPoint']) 
			: -25;

		$block_content = preg_replace(
			'/<([^ >]+)([^>]*)>/',
			'<$1$2 data-animation="true" data-animation-type="' . $type . '" data-animation-trigger="' . $trigger . '" data-animation-trigger-custom-selector="' . $customSelector . '" data-animation-duration="' . $duration . '" data-animation-delay="' . $delay . '" data-animation-trigger-point="' . $point . '" data-animate-children="' . ($animate_children ? 'true' : 'false') . '" data-child-animation-type="' . $child_type . '" data-child-animation-duration="' . $child_duration . '" data-child-animation-stagger-delay="' . $child_stagger_delay . '" data-child-animation-trigger="' . $childTrigger . '" data-child-animation-trigger-point="' . $childPoint . '" data-child-animation-custom-selector="' . $childCustomSelector . '">',
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

		$childTrigger = isset($block['attrs']['childAnimationTrigger']) 
			? esc_attr($block['attrs']['childAnimationTrigger']) 
			: 'section';
		$childCustomSelector = isset($block['attrs']['childAnimationCustomSelector']) 
			? esc_attr($block['attrs']['childAnimationCustomSelector']) 
			: '';
		$childPoint = isset($block['attrs']['childAnimationTriggerPoint']) 
			? esc_attr($block['attrs']['childAnimationTriggerPoint']) 
			: -25;

		$block_content = preg_replace(
			'/<ul([^>]*)>/',
			'<ul$1 data-child-animation="true" data-child-animation-type="' . $child_type . '" data-child-animation-duration="' . $child_duration . '" data-child-animation-stagger-delay="' . $child_stagger_delay . '" data-child-animation-trigger="' . $childTrigger . '" data-child-animation-trigger-point="' . $childPoint . '" data-child-animation-custom-selector="' . $childCustomSelector . '">',
			$block_content
		);
	}

	return $block_content;
}, 10, 2);

// Inject child animation attributes on Query block server render
add_filter('render_block_core/query', function ($block_content, $block) {
    if (! empty($block['attrs']['animateChildren']) && $block['attrs']['animateChildren'] === true) {
        // Retrieve child animation settings
        $childTrigger = isset($block['attrs']['childAnimationTrigger'])
            ? esc_attr($block['attrs']['childAnimationTrigger'])
            : 'section';
        $childCustomSelector = isset($block['attrs']['childAnimationCustomSelector'])
            ? esc_attr($block['attrs']['childAnimationCustomSelector'])
            : '';
        $childPoint = isset($block['attrs']['childAnimationTriggerPoint'])
            ? esc_attr($block['attrs']['childAnimationTriggerPoint'])
            : -25;
        $childType = isset($block['attrs']['childAnimationType'])
            ? esc_attr($block['attrs']['childAnimationType'])
            : 'fade-in';
        $childDuration = isset($block['attrs']['childAnimationDuration'])
            ? intval($block['attrs']['childAnimationDuration'])
            : 600;
        $childStagger = isset($block['attrs']['childAnimationStaggerDelay'])
            ? intval($block['attrs']['childAnimationStaggerDelay'])
            : 100;

        // Inject into the first <ul> in the Query block output
        $block_content = preg_replace(
            '/<ul([^>]*)>/',
            '<ul$1 data-child-animation="true"'
            . ' data-child-animation-type="' . $childType . '"'
            . ' data-child-animation-duration="' . $childDuration . '"'
            . ' data-child-animation-stagger-delay="' . $childStagger . '"'
            . ' data-child-animation-trigger="' . $childTrigger . '"'
            . ' data-child-animation-trigger-point="' . $childPoint . '"'
            . ' data-child-animation-custom-selector="' . $childCustomSelector . '">',
            $block_content
        );
    }
    return $block_content;
}, 10, 2);