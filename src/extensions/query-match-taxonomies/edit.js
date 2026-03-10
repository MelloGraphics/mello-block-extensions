const apiFetch = wp.apiFetch;
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { SelectControl, Spinner, ToggleControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Add the attributes needed for taxonomy matching.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Modified block settings.
 */
function addAttributes(settings) {
    if ('core/query' !== settings.name) {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            matchCurrentTaxonomy: {
                type: 'boolean',
                default: false,
            },
            matchTaxonomySlug: {
                type: 'string',
                default: '',
            },
        },
    };
}

addFilter(
    'blocks.registerBlockType',
    'extend-query-block/taxonomy-match-attributes',
    addAttributes
);

/**
 * Add the taxonomy match controls to the block's advanced inspector controls.
 *
 * @param {Object} BlockEdit Original block edit component.
 * @return {Function} Modified block edit component.
 */
function addInspectorControls(BlockEdit) {
    return (props) => {
        if (props.name !== 'core/query') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { matchCurrentTaxonomy, matchTaxonomySlug } = attributes;

        const [taxonomies, setTaxonomies] = useState([]);
        const [isLoading, setIsLoading] = useState(false);

        // Fetch all public taxonomies registered in the theme/site
        useEffect(() => {
            setIsLoading(true);
            apiFetch({ path: '/wp/v2/taxonomies?context=edit' })
                .then((response) => {
                    const options = Object.values(response)
                        .filter((tax) => tax.visibility?.show_ui !== false)
                        .map((tax) => ({
                            label: tax.name,
                            value: tax.slug,
                        }));

                    setTaxonomies([
                        { label: __('— Select a Taxonomy —', 'extend-query-block'), value: '' },
                        ...options,
                    ]);

                    // If the saved slug no longer exists, clear it
                    if (
                        matchTaxonomySlug &&
                        !options.find((o) => o.value === matchTaxonomySlug)
                    ) {
                        setAttributes({ matchTaxonomySlug: '' });
                    }
                })
                .catch(() => {
                    setTaxonomies([
                        { label: __('Error loading taxonomies', 'extend-query-block'), value: '' },
                    ]);
                })
                .finally(() => setIsLoading(false));
        }, []);

        const onToggleChange = () => {
            const newState = !matchCurrentTaxonomy;
            setAttributes({
                matchCurrentTaxonomy: newState,
                // Clear the selected taxonomy when the toggle is turned off
                ...(!newState && { matchTaxonomySlug: '' }),
            });
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorAdvancedControls>
                    <ToggleControl
                    __nextHasNoMarginBottom
                        label={__('Match Current Taxonomy', 'extend-query-block')}
                        help={
                            matchCurrentTaxonomy
                                ? __('Query will filter by the current post\'s terms in the selected taxonomy.', 'extend-query-block')
                                : __('Enable to show related posts based on a shared taxonomy.', 'extend-query-block')
                        }
                        checked={matchCurrentTaxonomy}
                        onChange={onToggleChange}
                    />

                    {matchCurrentTaxonomy && (
                        isLoading ? (
                            <Spinner />
                        ) : (
                            <SelectControl
                                __next40pxDefaultSize
                                label={__('Taxonomy', 'extend-query-block')}
                                value={matchTaxonomySlug}
                                options={taxonomies}
                                onChange={(value) =>
                                    setAttributes({ matchTaxonomySlug: value })
                                }
                                help={__('Posts sharing any term in this taxonomy with the current post will be returned.', 'extend-query-block')}
                            />
                        )
                    )}
                </InspectorAdvancedControls>
            </>
        );
    };
}

addFilter(
    'editor.BlockEdit',
    'extend-query-block/taxonomy-match-inspector-controls',
    addInspectorControls
);