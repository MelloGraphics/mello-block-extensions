import { registerBlockVariation } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

//
// Query swiper
//

const registerBlockVariations = {
    "core/query": {
        name: "query-swiper-variation",
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
                inherit: false,
            },
			metadata: { name: 'Query Swiper Variation' },
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
                    [
                        "core/group",
                        { 
							metadata: { name: 'Pagination Wrapper' },
                            className: "swiper-pagination",
                            layout: { type: "constrained" }
                        },
                    ],
                    [
                        "core/group",
                        { 
							metadata: { name: 'Scrollbar Wrapper' },
                            className: "swiper-scrollbar",
                            layout: { type: "constrained" }
                        },
                    ],
                    [
                        "core/buttons",
                        {
							metadata: { name: 'Prev / Next buttons' },
                            className: "swiper-navigation",
                            style: { spacing: { blockGap: { left: "var:preset|spacing|small" } } },
                        },
                        [
                            ["core/button", { className: "swiper-button-prev", text: "Prev" }],
                            ["core/button", { className: "swiper-button-next", text: "Next" }],
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
};

domReady(() => {
    Object.entries(registerBlockVariations).forEach(([block, variation]) => {
        registerBlockVariation(block, variation);
    });
});