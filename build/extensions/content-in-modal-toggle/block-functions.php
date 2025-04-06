<?php
/**
 * Mello Block Extensions – Modal Integration.
 */

// Global flag to determine if any block on the page has the openInModal attribute enabled.
global $mello_openinmodal_found;
$mello_openinmodal_found = false;

/**
 * Modify the block content for buttons with the openInModal attribute enabled.
 *
 * @param string $block_content The block content HTML.
 * @param array  $block         Block data including attributes.
 * @return string Modified block content.
 */
function mello_render_content_modal_global( $block_content, $block ) {
    global $mello_openinmodal_found;
    // Only process if openInModal is enabled and the block is one of our target blocks.
    if ( ! empty( $block['attrs']['openInModal'] ) && in_array( $block['blockName'], array( 'core/button', 'core/post-title', 'core/post-featured-image', 'core/read-more' ) ) ) {
        // Mark that we found a block with openInModal enabled
        $mello_openinmodal_found = true;
        
        // Use DOMDocument to safely add the class and data attribute to the first <a> element within the block.
        libxml_use_internal_errors( true );
        $dom = new DOMDocument();
        
        // Convert the block content to proper HTML entities to preserve encoding.
        $encoding = mb_detect_encoding( $block_content, mb_detect_order(), false );
        if ( $encoding ) {
            $block_content = mb_convert_encoding( $block_content, 'HTML-ENTITIES', $encoding );
        }
        
        // Prepend an XML encoding declaration to ensure correct UTF-8 handling.
        $dom->loadHTML('<?xml encoding="utf-8" ?>' . $block_content);
        
        $xpath = new DOMXPath( $dom );
        // Find the first <a> element within the block.
        $a = $xpath->query( '//a' )->item( 0 );
        if ( $a ) {
            // Append the class is-open-mello-modal while preserving any existing classes.
            $existing_class = $a->getAttribute( 'class' );
            $new_class = trim( $existing_class . ' is-open-mello-modal' );
            $a->setAttribute( 'class', $new_class );
            
            // Add the data attribute for MicroModal trigger
            $a->setAttribute( 'data-micromodal-trigger', 'modal-identifier' );
            
            // Retrieve the updated HTML from the <body> element.
            $body = $dom->getElementsByTagName( 'body' )->item( 0 );
            $new_block_content = '';
            foreach ( $body->childNodes as $child ) {
                $new_block_content .= $dom->saveHTML( $child );
            }
            $block_content = $new_block_content;
        }
        libxml_clear_errors();
    }
    return $block_content;
}
add_filter( 'render_block', 'mello_render_content_modal_global', 10, 2 );

/**
 * Output the modal HTML markup in the footer if any block has the openInModal attribute enabled.
 */
function mello_modal_markup() {
    global $mello_openinmodal_found;
    if ( ! $mello_openinmodal_found ) {
        return;
    }
    ?>
    <div class="modal micromodal micromodal-slide mello-modal" id="modal-identifier" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
            <div id="modal-loader" class="modal__loader" hidden>
                <div class="modal__loader-inner" aria-hidden="true">Loading…</div>
            </div>
            <button class="modal__prev" aria-label="Previous slide">Prev</button>
            <button class="modal__next" aria-label="Next slide">Next</button>
            <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-identifier-title">
                <button class="modal__close" aria-label="Close modal" data-micromodal-close>&times;</button>
                <main class="modal__content" id="modal-content">
                    <!-- Dynamic content will be loaded here -->
                </main>
            </div>
        </div>
    </div>
    <?php
}
add_action( 'wp_footer', 'mello_modal_markup' );