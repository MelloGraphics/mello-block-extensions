<?php

//
// Update the details block summary to include the selected heading level
//

function mello_render_details_block($block_content, $block) {
    if ($block['blockName'] === 'core/details') {
        // Check if the level attribute is set and valid
        if (isset($block['attrs']['level']) && intval($block['attrs']['level']) > 0) {
            $level = intval($block['attrs']['level']);
            // Ensure the level is within a valid range (1-6) for heading tags
            if ($level >= 1 && $level <= 6) {
                $heading_tag = 'h' . $level;

                // Use DOMDocument to manipulate the HTML
                $dom = new DOMDocument();
                // Suppress errors due to malformed HTML and load content
                libxml_use_internal_errors(true);
                $dom->loadHTML(mb_convert_encoding($block_content, 'HTML-ENTITIES', 'UTF-8'));
                libxml_clear_errors();

                // Find the <summary> element
                $summary_elements = $dom->getElementsByTagName('summary');
                if ($summary_elements->length > 0) {
                    $summary = $summary_elements->item(0);

                    // Create the new heading element
                    $heading = $dom->createElement($heading_tag);

                    // Move all child nodes of <summary> to the new heading element
                    while ($summary->hasChildNodes()) {
                        $heading->appendChild($summary->firstChild);
                    }

                    // Append the heading element to the summary
                    $summary->appendChild($heading);
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
    }

    return $block_content;
}

add_filter('render_block', 'mello_render_details_block', 10, 2);