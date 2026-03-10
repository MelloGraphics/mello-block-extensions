<?php

/**
 * Store enabled Query Loop instances so their inner Post Template / Pagination
 * blocks can later resolve the custom taxonomy-matching settings.
 *
 * The official Query Loop docs note that the children of the Query Loop block
 * build the query and expose it through `query_loop_block_query_vars`, so the
 * block instance received by that hook is not reliably the parent `core/query`
 * block itself.
 */
function mello_match_current_taxonomy_register_query_block( $parsed_block ) {
    if ( ( $parsed_block['blockName'] ?? '' ) !== 'core/query' ) {
        return $parsed_block;
    }

    $attributes = $parsed_block['attrs'] ?? [];

    if (
        empty( $attributes['matchCurrentTaxonomy'] ) ||
        empty( $attributes['matchTaxonomySlug'] )
    ) {
        return $parsed_block;
    }

    $query_id = $attributes['queryId'] ?? null;

    if ( null === $query_id ) {
        return $parsed_block;
    }

    if ( ! isset( $GLOBALS['mello_match_current_taxonomy_registry'] ) || ! is_array( $GLOBALS['mello_match_current_taxonomy_registry'] ) ) {
        $GLOBALS['mello_match_current_taxonomy_registry'] = [];
    }

    $GLOBALS['mello_match_current_taxonomy_registry'][ (string) $query_id ] = [
        'matchCurrentTaxonomy' => ! empty( $attributes['matchCurrentTaxonomy'] ),
        'matchTaxonomySlug'    => $attributes['matchTaxonomySlug'] ?? '',
        'query'                => $attributes['query'] ?? [],
        'queryId'              => $query_id,
    ];

    return $parsed_block;
}
add_filter( 'render_block_data', 'mello_match_current_taxonomy_register_query_block', 10, 1 );

/**
 * Front-end Query Loop integration for matching posts that share the current
 * post's terms for a chosen taxonomy.
 */
function mello_match_current_taxonomy_query_vars( $query, $block, $page ) {
    $parsed_block = $block->parsed_block ?? [];
    $block_attrs  = $parsed_block['attrs'] ?? [];
    $query_id     = $block->context['queryId'] ?? $block_attrs['queryId'] ?? null;
    $registry     = $GLOBALS['mello_match_current_taxonomy_registry'] ?? [];
    $registered   = null;

    if ( null !== $query_id && isset( $registry[ (string) $query_id ] ) ) {
        $registered = $registry[ (string) $query_id ];
    }

    $attributes = is_array( $registered )
        ? array_merge( $block_attrs, $registered )
        : $block_attrs;

    if (
        empty( $attributes['matchCurrentTaxonomy'] ) ||
        empty( $attributes['matchTaxonomySlug'] )
    ) {
        return $query;
    }

    $taxonomy = sanitize_key( $attributes['matchTaxonomySlug'] );

    if ( ! taxonomy_exists( $taxonomy ) ) {
        return $query;
    }

    $current_post_id = 0;

    if ( ! empty( $block->context['postId'] ) ) {
        $current_post_id = (int) $block->context['postId'];
    }

    if ( ! $current_post_id && is_singular() ) {
        $current_post_id = (int) get_queried_object_id();
    }

    if ( ! $current_post_id ) {
        $current_post_id = (int) get_the_ID();
    }

    if ( ! $current_post_id ) {
        return $query;
    }

    $query_attributes = [];

    if ( ! empty( $attributes['query'] ) && is_array( $attributes['query'] ) ) {
        $query_attributes = $attributes['query'];
    } elseif ( ! empty( $block->context['query'] ) && is_array( $block->context['query'] ) ) {
        $query_attributes = $block->context['query'];
    }

    $per_page = 0;
    if ( isset( $query['posts_per_page'] ) ) {
        $per_page = (int) $query['posts_per_page'];
    }
    if ( ! $per_page && ! empty( $query_attributes['perPage'] ) ) {
        $per_page = (int) $query_attributes['perPage'];
    }
    if ( $per_page < 1 ) {
        $per_page = 3;
    }

    $post_type = $query['post_type'] ?? '';
    if ( empty( $post_type ) && ! empty( $query_attributes['postType'] ) ) {
        $post_type = $query_attributes['postType'];
    }
    if ( empty( $post_type ) ) {
        $post_type = get_post_type( $current_post_id );
    }

    $base_exclude = [];

    if ( ! empty( $query['post__not_in'] ) && is_array( $query['post__not_in'] ) ) {
        $base_exclude = array_map( 'intval', $query['post__not_in'] );
    }

    if ( ! empty( $query_attributes['exclude'] ) && is_array( $query_attributes['exclude'] ) ) {
        $base_exclude = array_merge( $base_exclude, array_map( 'intval', $query_attributes['exclude'] ) );
    }

    $base_exclude[] = $current_post_id;
    $base_exclude   = array_values( array_unique( array_filter( $base_exclude ) ) );

    $current_terms = wp_get_post_terms( $current_post_id, $taxonomy, [ 'fields' => 'ids' ] );

    if ( is_wp_error( $current_terms ) || empty( $current_terms ) ) {
        $query['post__in']            = [ 0 ];
        $query['nopaging']            = false;
        $query['orderby']             = 'post__in';
        $query['post__not_in']        = [];
        $query['posts_per_page']      = 0;
        $query['ignore_sticky_posts'] = true;
        unset( $query['tax_query'] );

        return $query;
    }

    $shared_args = $query;
    $shared_args['post_type']           = $post_type;
    $shared_args['posts_per_page']      = $per_page;
    $shared_args['post__not_in']        = $base_exclude;
    $shared_args['fields']              = 'ids';
    $shared_args['no_found_rows']       = true;
    $shared_args['ignore_sticky_posts'] = true;
    $shared_args['paged']               = 1;

    unset( $shared_args['post__in'] );
    unset( $shared_args['offset'] );

    $matched_tax_query   = [];
    $existing_tax_query  = $shared_args['tax_query'] ?? [];

    if ( ! empty( $existing_tax_query ) && is_array( $existing_tax_query ) ) {
        $matched_tax_query = $existing_tax_query;
    }

    $matched_tax_query[] = [
        'taxonomy' => $taxonomy,
        'field'    => 'term_id',
        'terms'    => array_map( 'intval', $current_terms ),
        'operator' => 'IN',
    ];

    $matched_query = new WP_Query(
        array_merge(
            $shared_args,
            [
                'tax_query' => $matched_tax_query,
            ]
        )
    );

    $matched_ids = array_map( 'intval', $matched_query->posts );
    $filler_ids  = [];

    if ( count( $matched_ids ) < $per_page ) {
        $filler_query = new WP_Query(
            array_merge(
                $shared_args,
                [
                    'posts_per_page' => $per_page - count( $matched_ids ),
                    'post__not_in'   => array_values( array_unique( array_merge( $base_exclude, $matched_ids ) ) ),
                ]
            )
        );

        $filler_ids = array_map( 'intval', $filler_query->posts );
    }

    $final_ids = array_values( array_unique( array_merge( $matched_ids, $filler_ids ) ) );

    if ( empty( $final_ids ) ) {
        $query['post__in']            = [ 0 ];
        $query['nopaging']            = false;
        $query['orderby']             = 'post__in';
        $query['post__not_in']        = [];
        $query['posts_per_page']      = 0;
        $query['ignore_sticky_posts'] = true;
        unset( $query['tax_query'] );

        return $query;
    }

    $query['post__in']            = $final_ids;
    $query['orderby']             = 'post__in';
    $query['order']               = 'ASC';
    $query['post__not_in']        = [];
    $query['posts_per_page']      = count( $final_ids );
    $query['ignore_sticky_posts'] = true;
    $query['nopaging']            = false;

    unset( $query['tax_query'] );
    unset( $query['offset'] );
    unset( $query['meta_key'] );
    unset( $query['meta_value'] );
    unset( $query['meta_compare'] );
    unset( $query['meta_query'] );

    if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
        if ( ! isset( $GLOBALS['mello_match_current_taxonomy_debug'] ) || ! is_array( $GLOBALS['mello_match_current_taxonomy_debug'] ) ) {
            $GLOBALS['mello_match_current_taxonomy_debug'] = [];
        }

        $debug_key = null !== $query_id ? (string) $query_id : 'default';

        $GLOBALS['mello_match_current_taxonomy_debug'][ $debug_key ] = [
            'query_id'        => $query_id,
            'current_post_id' => $current_post_id,
            'taxonomy'        => $taxonomy,
            'current_terms'   => array_map( 'intval', $current_terms ),
            'matched_ids'     => $matched_ids,
            'filler_ids'      => $filler_ids,
            'final_ids'       => $final_ids,
            'page'            => (int) $page,
            'hook_block_name' => $parsed_block['blockName'] ?? '',
        ];
    }

    return $query;
}
add_filter( 'query_loop_block_query_vars', 'mello_match_current_taxonomy_query_vars', 10, 3 );

/**
 * Optional debug output above the rendered Query Loop block while WP_DEBUG is enabled.
 */
function mello_match_current_taxonomy_render_debug( $block_content, $block ) {
    if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
        return $block_content;
    }

    if ( ! current_user_can( 'manage_options' ) ) {
        return $block_content;
    }

    if ( ( $block['blockName'] ?? '' ) !== 'core/query' ) {
        return $block_content;
    }

    $attributes = $block['attrs'] ?? [];
    $query_id   = $attributes['queryId'] ?? null;
    $registry   = $GLOBALS['mello_match_current_taxonomy_registry'] ?? [];

    if ( null !== $query_id && isset( $registry[ (string) $query_id ] ) && is_array( $registry[ (string) $query_id ] ) ) {
        $attributes = array_merge( $attributes, $registry[ (string) $query_id ] );
    }

    if (
        empty( $attributes['matchCurrentTaxonomy'] ) ||
        empty( $attributes['matchTaxonomySlug'] )
    ) {
        return $block_content;
    }

    $all_debug = $GLOBALS['mello_match_current_taxonomy_debug'] ?? null;
    $debug     = null;

    if ( is_array( $all_debug ) ) {
        if ( null !== $query_id && isset( $all_debug[ (string) $query_id ] ) ) {
            $debug = $all_debug[ (string) $query_id ];
        } elseif ( isset( $all_debug['default'] ) ) {
            $debug = $all_debug['default'];
        }
    }

    if ( empty( $debug ) || ! is_array( $debug ) ) {
        return $block_content;
    }

    preg_match_all( '/class="[^"]*\bpost-(\d+)\b[^"]*"/', $block_content, $rendered_matches );
    $debug['rendered_ids'] = array_map( 'intval', $rendered_matches[1] ?? [] );

    return mello_match_current_taxonomy_debug_output( $debug ) . $block_content;
}
add_filter( 'render_block', 'mello_match_current_taxonomy_render_debug', 10, 2 );

/**
 * Render debug details as a small panel.
 */
function mello_match_current_taxonomy_debug_output( array $debug ): string {
    $rows = '';

    foreach ( $debug as $key => $value ) {
        if ( is_array( $value ) ) {
            $value = empty( $value ) ? '(empty array)' : implode( ', ', $value );
        }

        $rows .= '<tr>
            <td style="padding:4px 12px 4px 0;font-weight:600;white-space:nowrap;vertical-align:top;">' . esc_html( $key ) . '</td>
            <td style="padding:4px 0;word-break:break-all;">' . esc_html( (string) $value ) . '</td>
        </tr>';
    }

    return '<div style="background:#1e1e2e;color:#cdd6f4;font-family:monospace;font-size:13px;line-height:1.6;padding:16px 20px;margin:16px 0;border-left:4px solid #cba6f7;border-radius:4px;">
        <div style="color:#cba6f7;font-weight:700;margin-bottom:10px;">&#x1F50D; TaxQuery Debug</div>
        <table style="border-collapse:collapse;width:100%;">' . $rows . '</table>
    </div>';
}

/**
 * Register custom attributes server-side so WordPress doesn't strip them.
 */
function register_taxonomy_query_block_attributes() {
    if ( ! function_exists( 'register_block_type' ) ) {
        return;
    }

    add_filter(
        'register_block_type_args',
        function ( $args, $block_type ) {
            if ( 'core/query' !== $block_type ) {
                return $args;
            }

            $args['attributes'] = array_merge(
                $args['attributes'] ?? [],
                [
                    'matchCurrentTaxonomy' => [
                        'type'    => 'boolean',
                        'default' => false,
                    ],
                    'matchTaxonomySlug'    => [
                        'type'    => 'string',
                        'default' => '',
                    ],
                ]
            );

            return $args;
        },
        10,
        2
    );
}
add_action( 'init', 'register_taxonomy_query_block_attributes' );