<?php

//
//
// Render featured video URL from a post acf featured_video field
//
//

function mello_render_extension_query_video($block_content, $block) {
    // Check if the block is a core/query block
    if ($block['blockName'] === 'core/query') {
        // Use DOMDocument to manipulate the HTML
        $dom = new DOMDocument();
        // Suppress errors due to malformed HTML and load content
        libxml_use_internal_errors(true);
        $dom->loadHTML(mb_convert_encoding($block_content, 'HTML-ENTITIES', 'UTF-8'));
        libxml_clear_errors();

        // Get the posts from the query block
        $li_elements = $dom->getElementsByTagName('li');
        foreach ($li_elements as $li) {
            $post_id = $li->getAttribute('class');
            // Extract post ID from the class attribute
            preg_match('/post-(\d+)/', $post_id, $matches);
            if (isset($matches[1])) {
                $post_id = $matches[1];
                // Get the ACF field value for 'featured_video'
                $video_url = get_field('featured_video', $post_id);
                
                if ($video_url) {
                    // Create the video element
                    $video_element = $dom->createElement('video', '');
                    $video_element->setAttribute('class', 'mello-featured-video intrinsic-ignore');
                    $video_element->setAttribute('autoplay', '');
                    $video_element->setAttribute('muted', '');
                    $video_element->setAttribute('loop', '');
                    $video_element->setAttribute('playsinline', '');
                    $video_element->setAttribute('src', esc_url($video_url));
                    $video_element->setAttribute('data-object-fit', 'cover');

                    // Check if the video element already exists
                    $existing_videos = $li->getElementsByTagName('video');
                    if ($existing_videos->length === 0) {
                        // Find the <figure> element
                        $figure_elements = $li->getElementsByTagName('figure');
                        if ($figure_elements->length > 0) {
                            $figure = $figure_elements->item(0);
                            
                            // Find the <img> tag within the <figure>
                            $img_elements = $figure->getElementsByTagName('img');
                            if ($img_elements->length > 0) {
                                // Insert the video element after the <img> tag
                                $img = $img_elements->item(0);
                                $img->parentNode->insertBefore($video_element, $img->nextSibling);
                            }
                        }
                    }
                }
            }
        }

        // Save the modified HTML back to the block content
        $body = $dom->getElementsByTagName('body')->item(0);
        if ($body) {
            $block_content = '';
            foreach ($body->childNodes as $child) {
                $block_content .= $dom->saveHTML($child);
            }
        }
    }

    return $block_content;
}

add_filter('render_block', 'mello_render_extension_query_video', 10, 2);