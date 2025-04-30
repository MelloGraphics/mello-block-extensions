<?php
/**
 * Mello Block Extensions – Modal Integration with Custom Taxonomy/Post Type Support.
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
    if ( ! empty( $block['attrs']['openInModal'] ) && in_array( $block['blockName'], array( 'core/post-title', 'core/post-featured-image', 'core/read-more' ) ) ) {
        // Mark that we found a block with openInModal enabled
        $mello_openinmodal_found = true;
        
        // Get the content selector if specified
        $content_selector = ! empty( $block['attrs']['modalContentSelector'] ) ? $block['attrs']['modalContentSelector'] : '.entry-content';
        
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
            // Extract post ID from the href attribute (if it's a local URL)
            $href = $a->getAttribute('href');
            $post_id = url_to_postid($href);
            
            // Get post taxonomy and post type data
            if ($post_id) {
                // Initialize class strings
                $category_classes = '';
                $custom_tax_classes = '';
                
                // Get standard categories 
                $categories = get_the_category($post_id);
                if (!empty($categories)) {
                    foreach ($categories as $category) {
                        $category_classes .= ' category-' . sanitize_html_class($category->slug);
                    }
                }
                
                // Get post format
                $format = get_post_format($post_id) ?: 'standard';
                $format_class = ' format-' . sanitize_html_class($format);
                
                // Get post type
                $post_type = get_post_type($post_id);
                $post_type_class = 'type-' . sanitize_html_class($post_type);
                
                // Get ALL taxonomies registered for this post type
                $taxonomies = get_object_taxonomies($post_type);
                
                // For each taxonomy, get the terms and add them as classes
                if (!empty($taxonomies)) {
                    foreach ($taxonomies as $taxonomy) {
                        // Skip standard categories as we already processed them
                        if ($taxonomy === 'category') {
                            continue;
                        }
                        
                        $terms = get_the_terms($post_id, $taxonomy);
                        if (!empty($terms) && !is_wp_error($terms)) {
                            foreach ($terms as $term) {
                                $tax_slug = sanitize_html_class($taxonomy);
                                $custom_tax_classes .= ' ' . $tax_slug . '-' . sanitize_html_class($term->slug);
                            }
                        }
                    }
                }
                
                // Add all data attributes
                $a->setAttribute('data-post-categories', trim($category_classes));
                $a->setAttribute('data-post-custom-taxonomies', trim($custom_tax_classes));
                $a->setAttribute('data-post-format', $format_class);
                $a->setAttribute('data-post-type', $post_type_class);
            }
            
            // Append the class is-open-mello-modal while preserving any existing classes.
            $existing_class = $a->getAttribute( 'class' );
            $new_class = trim( $existing_class . ' is-open-mello-modal' );
            $a->setAttribute( 'class', $new_class );
            
            // Add the data attribute for MicroModal trigger
            $a->setAttribute( 'data-micromodal-trigger', 'modal-identifier' );
            
            // Add the content selector as a data attribute
            $a->setAttribute( 'data-content-selector', $content_selector );
            
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
            <button class="modal__prev" aria-label="Previous slide"><svg viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="arrow-left" d="M0.585938 11.457L11.3672 1.14453L11.7188 0.792969L12.3633 1.49609L12.0117 1.78906L2.05078 11.2812H25.7812H26.25V12.2188H25.7812H2.05078L12.0117 21.7695L12.3633 22.0625L11.7188 22.7656L11.3672 22.4141L0.585938 12.1016L0.234375 11.75L0.585938 11.457Z" fill="white"/>
</svg>
</button>
            <button class="modal__next" aria-label="Next slide"><svg viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="arrow-right" d="M25.6055 12.1016L14.8242 22.4141L14.4727 22.7656L13.8281 22.0625L14.1797 21.7695L24.1406 12.2188H0.46875H0V11.2812H0.46875H24.1406L14.1797 1.78906L13.8281 1.49609L14.4727 0.792969L14.8242 1.14453L25.6055 11.457L25.957 11.75L25.6055 12.1016Z" fill="white"/>
</svg>
</button>
<button class="modal__close" aria-label="Close modal" data-micromodal-close><svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="close" d="M9.25 9.10547L17.8047 0.550781L18.4492 1.19531L9.89453 9.75L18.4492 18.3633L17.8047 19.0078L9.25 10.4531L0.636719 19.0078L-0.0078125 18.3633L8.54688 9.75L-0.0078125 1.19531L0.636719 0.550781L9.25 9.10547Z" fill="white"/>
</svg>
</button>
            <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-identifier-title">
                <main class="modal__content" id="modal-content">
                    <!-- Dynamic content will be loaded here -->
                </main>
            </div>
        </div>
    </div>
    <?php
}
add_action( 'wp_footer', 'mello_modal_markup' );