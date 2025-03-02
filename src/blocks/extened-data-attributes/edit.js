import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

// Define allowed blocks
const allowedBlocks = [
	'core/paragraph',
	'core/heading',
	'core/image',
	'core/group',
	'core/columns',
	'core/column'
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
		dataAttributes: {
			type: 'string',
			default: '',
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
	'mello-block-extensions/add-attributes',
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
		const { dataAttributes } = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorAdvancedControls>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={__('Data Attributes', 'mello-block-extensions')}
						value={dataAttributes}
						onChange={(value) => setAttributes({ dataAttributes: value })}
						help={__('Enter attributes in key=value format, separated by spaces.', 'mello-block-extensions')}
					/>
				</InspectorAdvancedControls>
			</>
		);
	};
}

addFilter(
	'editor.BlockEdit',
	'mello-block-extensions/add-inspector-controls',
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
	if (attributes.dataAttributes) {
		const attributePairs = attributes.dataAttributes.match(/([^\s=]+)(?:="([^"]*)")?/g) || [];
		attributePairs.forEach(attribute => {
			const match = attribute.match(/([^=]+)(?:="([^"]*)")?/);
			if (match) {
				const key = match[1];
				const value = match[2] ? match[2].replace(/"/g, '') : '';
				extraProps[key] = value !== '' ? value : true;
			}
		});
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'mello-block-extensions/add-save-props',
	addSaveProps
);
