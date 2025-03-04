import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Add the attribute needed for the block.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Modified block settings.
 */
function addAttributes(settings) {
    if ('core/query' !== settings.name) {
        return settings;
    }

    const queryAttributes = {
        excludeCurrentPost: {
            type: 'boolean',
            default: false,
        },
    };

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            ...queryAttributes,
        },
    };
}

addFilter(
    'blocks.registerBlockType',
    'extend-query-block/add-attributes',
    addAttributes
);

/**
 * Add the toggle control to the block's inspector controls.
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
        const { excludeCurrentPost } = attributes;

        const onToggleChange = () => {
            const newExcludeCurrentPostState = !excludeCurrentPost;
            setAttributes({
                excludeCurrentPost: newExcludeCurrentPostState,
            });
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title={__('Exclude Posts', 'extend-query-block')} initialOpen={true}>
                        <div className="exclude-current-post-container">
                            <ToggleControl
                                label={__('Exclude Current Post', 'extend-query-block')}
                                checked={excludeCurrentPost}
                                onChange={onToggleChange}
                            />
                        </div>
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}

addFilter(
    'editor.BlockEdit',
    'extend-query-block/add-inspector-controls',
    addInspectorControls
);
