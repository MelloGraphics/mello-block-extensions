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
 * Add the attribute for custom data attributes to specified blocks.
 *
 * @param {Object} settings Block settings.
 */
function addAttributes(settings) {
	if (!allowedBlocks.includes(settings.name)) {
		return settings;
	}

	// Add the attribute.
	const customAttributes = {
		renderSVG: {
			type: 'boolean',
			default: false,
		},
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...customAttributes,
		},
	};

	return newSettings;
}

addFilter(
	'blocks.registerBlockType',
	'mello-block-extensions/add-render-svg-attribute',
	addAttributes
);

/**
 * Add InspectorControls to specified blocks to set custom data attributes.
 *
 * @param {Object} BlockEdit Block edit component.
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
						label={__('Render SVG', 'mello-block-extensions')}
						checked={!!renderSVG}
						onChange={(value) => setAttributes({ renderSVG: value })}
						help={__('Render as inline SVG', 'mello-block-extensions')}
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
 * Add the custom data attributes to the front-end save function.
 *
 * @param {Object} extraProps Block properties.
 * @param {Object} blockType Block type.
 * @param {Object} attributes Block attributes.
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
