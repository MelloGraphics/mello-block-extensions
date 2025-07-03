<?php

function mello_render_aria_label($block_content, $block) {
	if (empty($block['attrs']['ariaLabel'])) {
		return $block_content;
	}

	$aria = esc_attr($block['attrs']['ariaLabel']);

	// Inject aria-label into the first HTML tag in block content
	$block_content = preg_replace('/<([a-z1-6]+)([^>]*)>/i', '<$1$2 aria-label="' . $aria . '">', $block_content, 1);

	return $block_content;
}

add_filter('render_block', 'mello_render_aria_label', 10, 2);