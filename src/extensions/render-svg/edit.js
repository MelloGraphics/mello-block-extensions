import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

// Define allowed blocks
const allowedBlocks = [
	'core/image',
	'core/cover',
	'core/post-featured-image',
	'core/site-logo',
	'core/group',
	'core/columns',
];

/**
 * Add the renderSVG attribute to specified blocks.
 */
function addAttributes(settings) {
	if (!allowedBlocks.includes(settings.name)) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			renderSVG: {
				type: 'boolean',
				default: false,
			},
		},
	};
}

addFilter(
	'blocks.registerBlockType',
	'mello-block-extensions/add-render-svg-attribute',
	addAttributes
);

/**
 * Add InspectorControls to specified blocks.
 */
function addInspectorControls(BlockEdit) {
	return (props) => {
		if (!allowedBlocks.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;
		const { renderSVG } = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorAdvancedControls>
					<ToggleControl
						label={__('Render as inline SVG', 'mello-block-extensions')}
						checked={!!renderSVG}
						onChange={(value) => setAttributes({ renderSVG: value })}
						help={__(
							'Converts SVG images to inline code for styling and animations.',
							'mello-block-extensions'
						)}
					/>
				</InspectorAdvancedControls>
			</>
		);
	};
}

addFilter(
	'editor.BlockEdit',
	'mello-block-extensions/add-render-svg-inspector-controls',
	addInspectorControls
);

/**
 * Add the style-svg class to blocks with renderSVG enabled.
 */
function addSaveProps(extraProps, blockType, attributes) {
	if (attributes.renderSVG) {
		extraProps.className = (extraProps.className || '') + ' style-svg';
	}
	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'mello-block-extensions/add-render-svg-save-props',
	addSaveProps
);