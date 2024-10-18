<?php

//
// Add faq schema to core/details on the front end
//

// Global variable to accumulate FAQ data
global $faq_data;
$faq_data = array();

// Collect FAQ data from blocks
function collect_faq_data( $block_content, $block ) {
    global $faq_data;

    // Check if it's the 'core/details' block and if it has the 'hasFAQSchema' attribute
    if ( isset( $block['blockName'] ) && 'core/details' === $block['blockName'] && isset( $block['attrs']['hasFAQSchema'] ) && $block['attrs']['hasFAQSchema'] ) {
        // Get the question content
        $question = '';
        if ( ! empty( $block['innerContent'] ) && is_array( $block['innerContent'] ) ) {
            $question = implode( '', $block['innerContent'] );
        }
        $question = esc_html( $question );

        // Collect the answer content from inner blocks
        $answer = '';
        if ( ! empty( $block['innerBlocks'] ) ) {
            foreach ( $block['innerBlocks'] as $inner_block ) {
                if ( ! empty( $inner_block['innerContent'] ) && is_array( $inner_block['innerContent'] ) ) {
                    $answer .= implode( '', $inner_block['innerContent'] );
                }
            }
        }
        $answer = esc_html( $answer );

        // Add to the FAQ data array if both question and answer are available
        if ( ! empty( $question ) && ! empty( $answer ) ) {
            $faq_data[] = array(
                'question' => $question,
                'answer' => $answer
            );
        }
    }

    return $block_content;
}

add_filter( 'render_block', 'collect_faq_data', 10, 2 );

// Output the accumulated FAQ schema at the end of the content
function output_faq_schema( $content ) {
    global $faq_data;

    // Only proceed if there are FAQ data collected
    if ( empty( $faq_data ) ) {
        return $content;
    }

    $faq_schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => array()
    );

    foreach ( $faq_data as $faq ) {
        $faq_schema['mainEntity'][] = array(
            '@type' => 'Question',
            'name' => $faq['question'],
            'acceptedAnswer' => array(
                '@type' => 'Answer',
                'text' => $faq['answer']
            )
        );
    }

    $faq_schema_json = '<script type="application/ld+json">' . json_encode( $faq_schema ) . '</script>';
    $content .= $faq_schema_json;

    // Clear the accumulated FAQ data
    $faq_data = array();

    return $content;
}

add_filter( 'the_content', 'output_faq_schema' );