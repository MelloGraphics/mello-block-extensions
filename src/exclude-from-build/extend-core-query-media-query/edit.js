import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Extend query block attributes.
 */
function extendQueryAttributes(settings) {
    if (settings.name !== 'core/query') {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            queryMediaLibrary: {
                type: 'boolean',
                default: false,
            },
        },
    };
}

addFilter(
    'blocks.registerBlockType',
    'extend-query-block/add-media-query-attributes',
    extendQueryAttributes
);

/**
 * Add Inspector Control for Media Query
 */
function extendQueryEdit(BlockEdit) {
    return (props) => {
        if (props.name !== 'core/query') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { queryMediaLibrary, query } = attributes;

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title={__('Query Media Library', 'extend-query-block')}>
                        <ToggleControl
                            label={__('Enable Media Query', 'extend-query-block')}
                            checked={queryMediaLibrary}
                            onChange={(value) => {
                                setAttributes({
                                    queryMediaLibrary: value,
                                    query: {
                                        ...query,
                                        postType: value ? 'attachment' : 'post',
                                    },
                                });
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}

addFilter(
    'editor.BlockEdit',
    'extend-query-block/add-media-query-controls',
    extendQueryEdit
);