import { registerBlockVariation } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';

//
// Query swiper
//

const registerBlockVariations = {
    "core/query": {
        name: "query-swiper",
        title: "Query Swiper",
        description: "A carousel-style query block powered by Swiper JS.",
        textdomain: "swiper",
        attributes: {
            query: {
                perPage: 10,
                pages: 0,
                offset: 0,
                postType: "page",
                order: "desc",
                orderBy: "date",
                inherit: true,
            },
            metadata: { name: 'Query Swiper' },
        },
        innerBlocks: [
            [
                "mello-block/swiper",
                {},
                [
                    [
                        "core/post-template",
                        {
                            metadata: { name: 'Swiper Wrapper' },
                            className: "swiper-wrapper"
                        },
                        [
                            ["core/post-featured-image", { aspectRatio: "1", height: "140px" }],
                            ["core/post-title", {}],
                            ["core/post-excerpt", {}],
                            ["core/read-more", { content: "Learn more", fontSize: "small" }],
                        ],
                    ],
                    ['core/group', { lock: { remove: true }, metadata: { name: 'Pagination Wrapper' }, className: 'swiper-pagination', layout: { type: 'constrained' } }],
                    ['core/group', { lock: { remove: true }, metadata: { name: 'Scrollbar Wrapper' }, className: 'swiper-scrollbar', layout: { type: 'constrained' } }],
                    [
                        'core/buttons',
                        { lock: { remove: true }, metadata: { name: 'Prev / Next Buttons' }, style: { spacing: { blockGap: { left: 'var:preset|spacing|small' } } } },
                        [
                            ['core/button', { className: 'swiper-button-prev', text: __('prev', 'mello-block-extensions') }],
                            ['core/button', { className: 'swiper-button-next', text: __('next', 'mello-block-extensions') }],
                        ],
                    ],
                ],
            ],
            [
                "core/query-no-results",
                {},
                [
                    ["core/paragraph", { placeholder: "Add text or blocks that will display when a query returns no results." }],
                ],
            ],
        ],
        scope: ["inserter"],
    },
    "core/group": [
		{
			name: "swiper-slide",
			title: "Swiper Slide",
			description: "A group block to wrap each swiper slide.",
			attributes: {
				metadata: { name: "Swiper Slide" },
			},
			scope: ["inserter"],
			isDefault: false,
			icon: "screenoptions",
		},
		{
			name: "swiper-thumb",
			title: "Swiper Thumb",
			description: "A group block to wrap each swiper thumb.",
			attributes: {
				metadata: { name: "Swiper Thumb" },
			},
			scope: ["inserter"],
			isDefault: false,
			icon: "screenoptions",
		},
	],
};

domReady(() => {
    Object.entries(registerBlockVariations).forEach(([block, variation]) => {
        registerBlockVariation(block, variation);
    });
});