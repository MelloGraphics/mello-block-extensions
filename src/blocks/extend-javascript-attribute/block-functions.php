<?php
function mello_render_custom_js( $block_content, $block ) {
    if ( isset( $block['attrs']['customJS'] ) && ! empty( $block['attrs']['customJS'] ) ) {
        $safe_js = mello_sanitize_js( $block['attrs']['customJS'] );
        $script  = "<script>{$safe_js}</script>";
        return $block_content . $script;
    }

    return $block_content;
}

add_filter( 'render_block', 'mello_render_custom_js', 10, 2 );

function mello_sanitize_js( $js ) {
    // Strip HTML tags
    $js = strip_tags( $js );

    // Decode HTML entities (ensures characters like quotes are restored)
    $js = htmlspecialchars_decode( $js, ENT_QUOTES );

    // Prevent inline event handlers like `onerror=`
    $js = preg_replace( '/on\w+\s*=\s*/i', '', $js );

    // Block dangerous JS functions
    $blocked_functions = [ 'document.write', 'document.execCommand', 'eval', 'Function' ];
    foreach ( $blocked_functions as $blocked ) {
        $js = str_replace( $blocked, '', $js );
    }

    // Ensure single quotes are properly handled to avoid escaping issues
    $js = str_replace('\\\'', "'", $js);

    return trim( $js );
}