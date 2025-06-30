<?php
/**
 * Holder for collected FAQ items.
 *
 * @var array
 */
$mello_faq_schema_data = [];
// Hook into block rendering
add_filter( 'render_block', 'mello_render_details_faq_schema', 20, 2 );

/**
 * Render filter for core/details with FAQ schema support.
 *
 * @param string $block_content The block HTML.
 * @param array  $block         Block data.
 * @return string Modified block HTML.
 */
function mello_render_details_faq_schema( $block_content, $block ) {
    if ( empty( $block['blockName'] ) || $block['blockName'] !== 'core/details' ) {
        return $block_content;
    }
    $attrs = $block['attrs'] ?? [];
    // Support both hasFaqSchema and hasFAQSchema attribute keys
    $has_faq = ! empty( $attrs['hasFaqSchema'] ) || ! empty( $attrs['hasFAQSchema'] );
    if ( ! $has_faq ) {
        return $block_content;
    }
    // Inject our class into the existing <details> tag
    if ( preg_match( '/^<details[^>]*class="/', $block_content ) ) {
        // If a class attribute exists, prepend our class
        $output = preg_replace(
            '/^<details([^>]*?)class="/',
            '<details$1class="has-faq-schema ',
            $block_content
        );
    } else {
        // No class attribute, add one
        $output = preg_replace(
            '/^<details\b/',
            '<details class="has-faq-schema"',
            $block_content
        );
    }
    $data = extract_faq_data( $output );
    if ( $data ) {
        global $mello_faq_schema_data;
        $mello_faq_schema_data[] = $data;
        // Ensure footer hook is added once
        static $hooked = false;
        if ( ! $hooked ) {
            add_action( 'wp_footer', 'mello_output_faq_schema' );
            $hooked = true;
        }
    }
    return $output;
}

function extract_faq_data( $content ) {
    if ( empty( $content ) ) {
        return false;
    }
    $dom = new DOMDocument();
    libxml_use_internal_errors( true );
    $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' . $content . '</body></html>';
    if ( ! $dom->loadHTML( $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD ) ) {
        libxml_clear_errors();
        return false;
    }
    libxml_clear_errors();

    $details = $dom->getElementsByTagName('details')->item(0);
    if ( ! $details ) {
        return false;
    }

    $summary = $details->getElementsByTagName('summary')->item(0);
    if ( ! $summary ) {
        return false;
    }
    $question = trim( $summary->textContent );
    if ( empty( $question ) ) {
        return false;
    }

    $answer_html = '';
    foreach ( $details->childNodes as $node ) {
        if ( $node === $summary ) {
            continue;
        }
        $answer_html .= $dom->saveHTML( $node );
    }

    $answer = trim( wp_strip_all_tags( $answer_html ) );
    if ( empty( $answer ) ) {
        return false;
    }
    return [
        'question' => $question,
        'answer'   => preg_replace( '/\s+/', ' ', $answer ),
    ];
}

function mello_output_faq_schema() {
    global $mello_faq_schema_data;
    if ( empty( $mello_faq_schema_data ) ) {
        return;
    }
    $items = array_map( function( $faq ) {
        return [
            '@type'          => 'Question',
            'name'           => $faq['question'],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text'  => $faq['answer'],
            ],
        ];
    }, $mello_faq_schema_data );
    $schema = [
        '@context'   => 'https://schema.org',
        '@type'      => 'FAQPage',
        'mainEntity' => $items,
    ];
    echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>';
}
?>