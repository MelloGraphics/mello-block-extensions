<?php

add_filter( 'render_block', 'mello_group_block_with_link', 10, 2 );
function mello_group_block_with_link( $block_content, $block ) {
	if (
		$block['blockName'] !== 'core/group' ||
		empty( $block['attrs']['link']['url'] )
	) {
		return $block_content;
	}

	$url = esc_url( $block['attrs']['link']['url'] );
	$new_tab = ! empty( $block['attrs']['link']['opensInNewTab'] );
	$rel = $new_tab ? 'noopener noreferrer' : '';
	$target = $new_tab ? ' target="_blank"' : '';

	// Inject a covering <a> tag inside the group block
	$overlay = sprintf(
		'<a class="mello-cover-link" href="%s"%s rel="%s" aria-label="Block link"></a>',
		$url,
		$target,
		esc_attr( $rel )
	);

	// Inject before closing tag of the group wrapper
	$block_content = preg_replace( '/(<\/div>\s*)$/', $overlay . '$1', $block_content );

	return $block_content;
}