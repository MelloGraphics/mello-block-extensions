<?php
/**
 * Register ACF fields for Post Featured Video block
 */

acf_add_local_field_group( [
    'key'    => 'group_mello_featured_video',
    'title'  => 'Featured Media',
    'fields' => [
        [
            'key'               => 'field_mello_featured_video',
            'label'             => 'Featured Video',
            'name'              => 'featured_video',
            'type'              => 'file',
            'instructions'      => 'Select a video to be used as the featured video.',
            'return_format'     => 'url',
            'library'           => 'all',
            'mime_types'        => 'mp4,webm,ogg',
            'allow_in_bindings' => 1,
        ],
    ],
    'location' => [
        [
            [
                'param'    => 'post_type',
                'operator' => '!=',
                'value'    => 'attachment',
            ],
        ],
    ],
    'position' => 'side',
    'style'    => 'seamless',
    'show_in_rest' => 1,
    'active'  => true,
] );