<?php

/**
 * Store enabled Query Loop instances so their inner Post Template blocks
 * can later resolve the custom taxonomy-matching or ACF-matching settings.
 */
function mello_match_current_taxonomy_register_query_block( $parsed_block ) {
    if ( ( $parsed_block['blockName'] ?? '' ) !== 'core/query' ) {
        return $parsed_block;
    }

    $attributes = $parsed_block['attrs'] ?? [];

    $has_taxonomy = ! empty( $attributes['matchCurrentTaxonomy'] ) && ! empty( $attributes['matchTaxonomySlug'] );
    $has_acf      = ! empty( $attributes['matchAcfField'] ) && ! empty( $attributes['matchAcfFieldName'] );

    if ( ! $has_taxonomy && ! $has_acf ) {
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
        'matchAcfField'        => ! empty( $attributes['matchAcfField'] ),
        'matchAcfFieldName'    => $attributes['matchAcfFieldName'] ?? '',
        'matchAcfDirection'    => $attributes['matchAcfDirection'] ?? 'pull',
        'query'                => $attributes['query'] ?? [],
        'queryId'              => $query_id,
    ];

    return $parsed_block;
}
add_filter( 'render_block_data', 'mello_match_current_taxonomy_register_query_block', 10, 1 );


/**
 * Main query filter — handles both taxonomy matching and ACF field matching.
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

    $has_taxonomy = ! empty( $attributes['matchCurrentTaxonomy'] ) && ! empty( $attributes['matchTaxonomySlug'] );
    $has_acf      = ! empty( $attributes['matchAcfField'] ) && ! empty( $attributes['matchAcfFieldName'] );

    if ( ! $has_taxonomy && ! $has_acf ) {
        return $query;
    }

    // Resolve the current post ID
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

    // Resolve block query settings (perPage, order, orderBy, offset, pages)
    // from the block's stored query attribute — these mirror what the editor
    // has configured and should be respected by our custom queries too.
    $query_settings = [];
    if ( ! empty( $attributes['query'] ) && is_array( $attributes['query'] ) ) {
        $query_settings = $attributes['query'];
    } elseif ( ! empty( $block->context['query'] ) && is_array( $block->context['query'] ) ) {
        $query_settings = $block->context['query'];
    }

    if ( $has_acf ) {
        return mello_acf_field_query_vars( $query, $attributes, $query_settings, $current_post_id, (int) $page );
    }

    return mello_taxonomy_query_vars( $query, $attributes, $block, $query_settings, $current_post_id, (int) $page );
}
add_filter( 'query_loop_block_query_vars', 'mello_match_current_taxonomy_query_vars', 10, 3 );


/**
 * Extract and normalise the shared pagination/ordering settings from the
 * block's query attribute so both ACF and taxonomy modes can apply them.
 *
 * @param array $query          The WP_Query vars array already built by core.
 * @param array $query_settings The block's stored `query` attribute.
 * @param int   $page           Current pagination page from the filter.
 * @return array {
 *   int    $per_page  Posts per page (from block perPage, falling back to query).
 *   string $orderby   WP_Query orderby value mapped from block orderBy.
 *   string $order     'ASC' or 'DESC'.
 *   int    $offset    Static offset configured in the block.
 *   int    $paged     Current page number for pagination.
 * }
 */
function mello_resolve_query_settings( array $query, array $query_settings, int $page ): array {
    // ── Posts per page ────────────────────────────────────────────────────────
    $per_page = isset( $query['posts_per_page'] ) ? (int) $query['posts_per_page'] : 0;
    if ( ! $per_page && ! empty( $query_settings['perPage'] ) ) {
        $per_page = (int) $query_settings['perPage'];
    }
    if ( $per_page < 1 ) {
        $per_page = (int) get_option( 'posts_per_page', 10 );
    }

    // ── Order ─────────────────────────────────────────────────────────────────
    // The block stores orderBy in camelCase; WP_Query uses snake_case.
    $block_orderby = $query_settings['orderBy'] ?? $query_settings['orderby'] ?? '';
    $orderby_map   = [
        'date'          => 'date',
        'title'         => 'title',
        'modified'      => 'modified',
        'author'        => 'author',
        'comment_count' => 'comment_count',
        'menu_order'    => 'menu_order',
        'rand'          => 'rand',
        'relevance'     => 'relevance',
    ];
    $orderby = ! empty( $block_orderby ) && isset( $orderby_map[ $block_orderby ] )
        ? $orderby_map[ $block_orderby ]
        : ( $query['orderby'] ?? 'date' );

    $block_order = strtoupper( $query_settings['order'] ?? $query['order'] ?? 'DESC' );
    $order       = in_array( $block_order, [ 'ASC', 'DESC' ], true ) ? $block_order : 'DESC';

    // ── Offset ────────────────────────────────────────────────────────────────
    $offset = isset( $query_settings['offset'] ) ? (int) $query_settings['offset'] : 0;

    // ── Pagination ────────────────────────────────────────────────────────────
    // $page comes from the filter and is 1-based. The block's `pages` attribute
    // limits the total number of pages; we don't enforce that here — WordPress
    // handles it via the pagination blocks — but we pass $page for paged queries.
    $paged = max( 1, $page );

    return compact( 'per_page', 'orderby', 'order', 'offset', 'paged' );
}


/**
 * Build query vars for ACF Relationship / Post Object field mode.
 *
 * Direction: 'pull' — field lives on the current post, points outward.
 *            'push' — field lives on other posts, points back to the current post.
 *
 * Block settings mirrored: perPage, order, orderBy, offset, pagination (paged).
 */
function mello_acf_field_query_vars( array $query, array $attributes, array $query_settings, int $current_post_id, int $page ): array {
    $field_name = sanitize_key( $attributes['matchAcfFieldName'] );
    $direction  = ( $attributes['matchAcfDirection'] ?? 'pull' ) === 'push' ? 'push' : 'pull';

    if ( ! function_exists( 'get_field' ) ) {
        return mello_empty_query( $query );
    }

    $settings = mello_resolve_query_settings( $query, $query_settings, $page );
    $post_ids = [];

    if ( 'pull' === $direction ) {
        // ── Pull ──────────────────────────────────────────────────────────────
        // Field lives on the current post and returns the posts it links to.
        $field_value = get_field( $field_name, $current_post_id );

        if ( ! empty( $field_value ) ) {
            if ( is_array( $field_value ) ) {
                foreach ( $field_value as $item ) {
                    $id = is_object( $item ) ? (int) $item->ID : (int) $item;
                    if ( $id > 0 ) {
                        $post_ids[] = $id;
                    }
                }
            } elseif ( is_object( $field_value ) ) {
                $post_ids[] = (int) $field_value->ID;
            } elseif ( is_numeric( $field_value ) && (int) $field_value > 0 ) {
                $post_ids[] = (int) $field_value;
            }
        }
    } else {
        // ── Push ──────────────────────────────────────────────────────────────
        // Field lives on other posts and references the current post.
        // ACF serialises relationship values in postmeta; we LIKE-match the
        // current post ID wrapped in quotes as ACF stores it.
        $post_type = $query['post_type'] ?? 'post';

        $reverse_query = new WP_Query( [
            'post_type'           => $post_type,
            'posts_per_page'      => -1,
            'fields'              => 'ids',
            'no_found_rows'       => true,
            'ignore_sticky_posts' => true,
            'meta_query'          => [
                [
                    'key'     => $field_name,
                    'value'   => '"' . $current_post_id . '"',
                    'compare' => 'LIKE',
                ],
            ],
        ] );

        $post_ids = array_map( 'intval', $reverse_query->posts );
    }

    if ( empty( $post_ids ) ) {
        return mello_empty_query( $query );
    }

    // Apply block ordering to the resolved post IDs.
    // For post__in with a meaningful order, we let WP sort by the chosen field.
    // If orderby is 'rand' we keep post__in intact and let WP shuffle.
    $query['post__in']            = $post_ids;
    $query['posts_per_page']      = $settings['per_page'];
    $query['paged']               = $settings['paged'];
    $query['post__not_in']        = [];
    $query['ignore_sticky_posts'] = true;
    $query['nopaging']            = false;

    if ( 'rand' === $settings['orderby'] ) {
        $query['orderby'] = 'rand';
        unset( $query['order'] );
    } else {
        // When post__in is set and orderby is a date/title field, WP will
        // sort within the post__in set — which is exactly what we want.
        $query['orderby'] = $settings['orderby'];
        $query['order']   = $settings['order'];
    }

    if ( $settings['offset'] > 0 ) {
        $query['offset'] = $settings['offset'];
    } else {
        unset( $query['offset'] );
    }

    unset( $query['tax_query'], $query['meta_query'] );

    return $query;
}


/**
 * Build query vars for taxonomy matching with post-type filler fallback.
 *
 * Block settings mirrored: perPage, order, orderBy, offset, pagination (paged).
 */
function mello_taxonomy_query_vars( array $query, array $attributes, $block, array $query_settings, int $current_post_id, int $page ): array {
    $taxonomy = sanitize_key( $attributes['matchTaxonomySlug'] );

    if ( ! taxonomy_exists( $taxonomy ) ) {
        return $query;
    }

    $settings = mello_resolve_query_settings( $query, $query_settings, $page );

    $post_type = $query['post_type'] ?? '';
    if ( empty( $post_type ) && ! empty( $query_settings['postType'] ) ) {
        $post_type = $query_settings['postType'];
    }
    if ( empty( $post_type ) ) {
        $post_type = get_post_type( $current_post_id );
    }

    $base_exclude = [];
    if ( ! empty( $query['post__not_in'] ) && is_array( $query['post__not_in'] ) ) {
        $base_exclude = array_map( 'intval', $query['post__not_in'] );
    }
    if ( ! empty( $query_settings['exclude'] ) && is_array( $query_settings['exclude'] ) ) {
        $base_exclude = array_merge( $base_exclude, array_map( 'intval', $query_settings['exclude'] ) );
    }
    $base_exclude[] = $current_post_id;
    $base_exclude   = array_values( array_unique( array_filter( $base_exclude ) ) );

    $current_terms = wp_get_post_terms( $current_post_id, $taxonomy, [ 'fields' => 'ids' ] );

    if ( is_wp_error( $current_terms ) || empty( $current_terms ) ) {
        $current_terms = [];
    }

    // Shared WP_Query args — order/orderby come from block settings
    $shared_args = [
        'post_type'           => $post_type,
        'posts_per_page'      => $settings['per_page'],
        'orderby'             => $settings['orderby'],
        'order'               => $settings['order'],
        'post__not_in'        => $base_exclude,
        'fields'              => 'ids',
        'no_found_rows'       => true,
        'ignore_sticky_posts' => true,
        'paged'               => 1,
    ];

    if ( $settings['offset'] > 0 ) {
        $shared_args['offset'] = $settings['offset'];
    }

    // Step 1: taxonomy-matched posts
    $matched_ids = [];

    if ( ! empty( $current_terms ) ) {
        $matched_tax_query   = $query['tax_query'] ?? [];
        $matched_tax_query[] = [
            'taxonomy' => $taxonomy,
            'field'    => 'term_id',
            'terms'    => array_map( 'intval', $current_terms ),
            'operator' => 'IN',
        ];

        $matched_query = new WP_Query( array_merge( $shared_args, [ 'tax_query' => $matched_tax_query ] ) );
        $matched_ids   = array_map( 'intval', $matched_query->posts );
    }

    // Step 2: filler posts of the same type/order to pad to perPage
    $filler_ids = [];

    if ( count( $matched_ids ) < $settings['per_page'] ) {
        $filler_args                   = $shared_args;
        $filler_args['posts_per_page'] = $settings['per_page'] - count( $matched_ids );
        $filler_args['post__not_in']   = array_values( array_unique( array_merge( $base_exclude, $matched_ids ) ) );
        unset( $filler_args['tax_query'] );

        $filler_query = new WP_Query( $filler_args );
        $filler_ids   = array_map( 'intval', $filler_query->posts );
    }

    $final_ids = array_values( array_unique( array_merge( $matched_ids, $filler_ids ) ) );

    if ( empty( $final_ids ) ) {
        return mello_empty_query( $query );
    }

    $query['post__in']            = $final_ids;
    $query['orderby']             = 'post__in';
    $query['order']               = 'ASC';
    $query['post__not_in']        = [];
    $query['posts_per_page']      = count( $final_ids );
    $query['paged']               = $settings['paged'];
    $query['ignore_sticky_posts'] = true;
    $query['nopaging']            = false;

    if ( $settings['offset'] > 0 ) {
        $query['offset'] = $settings['offset'];
    } else {
        unset( $query['offset'] );
    }

    unset( $query['tax_query'] );

    return $query;
}


/**
 * Return query vars that produce zero results, allowing the Query block's
 * built-in "No results" inner block to render.
 */
function mello_empty_query( array $query ): array {
    $query['post__in']            = [ 0 ];
    $query['nopaging']            = false;
    $query['orderby']             = 'post__in';
    $query['post__not_in']        = [];
    $query['posts_per_page']      = 0;
    $query['ignore_sticky_posts'] = true;
    unset( $query['tax_query'] );
    return $query;
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
                    'matchAcfField'        => [
                        'type'    => 'boolean',
                        'default' => false,
                    ],
                    'matchAcfFieldName'    => [
                        'type'    => 'string',
                        'default' => '',
                    ],
                    'matchAcfDirection'    => [
                        'type'    => 'string',
                        'default' => 'pull',
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