<?php

//
// Add faq schema to core/details on the front end
//

// Global variable to accumulate FAQ data
global $faq_data;
$faq_data = array();

// Collect FAQ data from blocks
function collect_faq_data( $block_content, $block ) {
    error_log( print_r( $block, true ) );
    global $faq_data;

    // Check if it's the 'core/details' block and if it has the 'mello-has-faq-schema' class
    if (
        isset( $block['blockName'] ) &&
        'core/details' === $block['blockName'] &&
        isset( $block['attrs']['className'] ) &&
        strpos( $block['attrs']['className'], 'mello-has-faq-schema' ) !== false
    ) {
        // Re-render the dynamic inner blocks
        $question = '';
        $answer = '';

        if ( ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
            foreach ( $block['innerBlocks'] as $index => $inner_block ) {
                $rendered = render_block( $inner_block );

                if ( $index === 0 ) {
                    $question = wp_strip_all_tags( $rendered );
                } else {
                    $answer .= wp_strip_all_tags( $rendered );
                }
            }
        }

        // Add to the FAQ data array if both question and answer are available
        if ( ! empty( $question ) && ! empty( $answer ) ) {
            echo '<script type="application/ld+json">' . wp_json_encode([
                "@context" => "https://schema.org",
                "@type" => "FAQPage",
                "mainEntity" => [[
                    "@type" => "Question",
                    "name" => $question,
                    "acceptedAnswer" => [
                        "@type" => "Answer",
                        "text" => $answer
                    ]
                ]]
            ]) . '</script>';
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

add_action( 'wp_footer', 'output_faq_schema_footer' );

function output_faq_schema_footer() {
    global $faq_data;

    if ( empty( $faq_data ) ) {
        return;
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

    echo '<script type="application/ld+json">' . wp_json_encode( $faq_schema ) . '</script>';

    // Clear FAQ data
    $faq_data = array();
}