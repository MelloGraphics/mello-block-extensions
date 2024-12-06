<?php

// Render core/navigation extension background image on the front end
function mello_render_extension_navigation_image($block_content, $block) {
    // Check if this is a core/navigation-link block
    if ($block['blockName'] === 'core/navigation-link') {
        // Check if there is a custom image URL present
        if (isset($block['attrs']['style']['background']['backgroundImage']['url'])) {
            $image_url = $block['attrs']['style']['background']['backgroundImage']['url'];
            $alt_text = isset($block['attrs']['style']['background']['backgroundImage']['title']) ? $block['attrs']['style']['background']['backgroundImage']['title'] : '';

            // Ensure block content is not empty
            if (empty($block_content)) {
                error_log('Empty block content passed to mello_render_extension_navigation_image.');
                return $block_content; // Return unmodified if no content to process
            }

            // Use DOMDocument to manipulate the HTML
            $dom = new DOMDocument();

            // Suppress errors due to malformed HTML and load content
            libxml_use_internal_errors(true);
            $dom->loadHTML(mb_convert_encoding($block_content, 'HTML-ENTITIES', 'UTF-8'));
            libxml_clear_errors();

            // Find the <li> element
            $li_elements = $dom->getElementsByTagName('li');
            if ($li_elements->length > 0) {
                $li = $li_elements->item(0);

                // Create an img element
                $img = $dom->createElement('img');
                $img->setAttribute('src', esc_url($image_url));
                $img->setAttribute('alt', esc_attr($alt_text));

                // Append the img element as the last child of the <li> element
                $li->appendChild($img);
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
    }

    return $block_content;
}

add_filter('render_block', 'mello_render_extension_navigation_image', 10, 2);
