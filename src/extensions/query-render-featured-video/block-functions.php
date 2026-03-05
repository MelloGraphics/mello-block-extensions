<?php

//
//
// Render featured video URL from a post acf featured_video field
//
//

function mello_render_extension_query_video($block_content, $block) {
    // Bail if no content to parse
    if ( empty( $block_content ) ) {
        return $block_content;
    }

    // Ensure we're only acting on core/query output
    if ( empty( $block['blockName'] ) || $block['blockName'] !== 'core/query' ) {
        return $block_content;
    }

    // If ACF isn't loaded locally, skip gracefully
    if ( ! function_exists( 'get_field' ) ) {
        return $block_content;
    }

    // Prepare DOM
    $html = mb_convert_encoding( $block_content, 'HTML-ENTITIES', 'UTF-8' );
    $dom  = new DOMDocument();

    // Suppress libxml warnings for fragment HTML and load safely
    $oldUse = libxml_use_internal_errors( true );
    $loaded = $dom->loadHTML( $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
    libxml_clear_errors();
    libxml_use_internal_errors( $oldUse );

    if ( ! $loaded ) {
        return $block_content;
    }

    // Get the posts from the query block
    $li_elements = $dom->getElementsByTagName( 'li' );

    foreach ( $li_elements as $li ) {
        $class_attr = $li->getAttribute( 'class' );

        // Extract post ID from the class attribute (e.g., class="post-123 ...")
        if ( ! preg_match( '/post-(\d+)/', $class_attr, $matches ) ) {
            continue;
        }

        $post_id = (int) $matches[1];

        // Get the ACF field value for 'featured_video'
        $video_url = get_field( 'featured_video', $post_id );
        if ( empty( $video_url ) ) {
            continue;
        }

        // Do not add if a video already exists
        $existing_videos = $li->getElementsByTagName( 'video' );
        if ( $existing_videos->length > 0 ) {
            continue;
        }

        // Find the first <figure> inside this <li>
        $figure_elements = $li->getElementsByTagName( 'figure' );
        if ( $figure_elements->length === 0 ) {
            continue;
        }

        $figure = $figure_elements->item( 0 );

        // Find the first <img> inside the <figure>
        $img_elements = $figure->getElementsByTagName( 'img' );
        if ( $img_elements->length === 0 ) {
            continue;
        }

        // Create the <video> element and insert it after the <img>
        $img            = $img_elements->item( 0 );
        $video_element  = $dom->createElement( 'video', '' );
        $video_element->setAttribute( 'class', 'mello-featured-video intrinsic-ignore video-fade-in' );
        
        // CRITICAL: Don't set src directly - use data-src instead for lazy loading
        // This prevents the browser from trying to load ANY video data until JS activates it
        $video_element->setAttribute( 'data-src', esc_url( $video_url ) );
        
        $video_element->setAttribute( 'preload', 'none' );
        $video_element->setAttribute( 'muted', '' );
        $video_element->setAttribute( 'loop', '' );
        $video_element->setAttribute( 'playsinline', '' );
        $video_element->setAttribute( 'data-object-fit', 'cover' );
        $video_element->setAttribute( 'data-autoplay-on-scroll', 'true' );

        $img->parentNode->insertBefore( $video_element, $img->nextSibling );
    }

    // Return the modified HTML, or original if save fails
    $new = $dom->saveHTML();
    return $new ? $new : $block_content;
}

add_filter( 'render_block_core/query', 'mello_render_extension_query_video', 10, 2 );