import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';


/**
 * Add the attribute for custom aria-label to all blocks.
 *
 * @param {Object} settings Block settings.
 * @param {string} name Block name.
 */
function addAttributes(settings, name) {
	if (!name.startsWith('core/')) {
		return settings;
	}

	// Add the attribute.
	const customAttributes = {
		ariaLabel: {
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
 * Add InspectorControls to all blocks to set custom aria-label.
 *
 * @param {Object} BlockEdit Block edit component.
 */
function addInspectorControls(BlockEdit) {
	return (props) => {
		const { attributes, setAttributes } = props;
		const { ariaLabel } = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorAdvancedControls>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={__('ARIA Label', 'mello-block-extensions')}
						value={ariaLabel}
						onChange={(value) => setAttributes({ ariaLabel: value })}
						help={__('Optional label for screen readers (used as aria-label)', 'mello-block-extensions')}
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
 * Add the custom aria-label to the front-end save function.
 *
 * @param {Object} extraProps Block properties.
 * @param {Object} blockType Block type.
 * @param {Object} attributes Block attributes.
 */
function addSaveProps(extraProps, blockType, attributes) {
	if (attributes.ariaLabel) {
		extraProps['aria-label'] = attributes.ariaLabel;
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'mello-block-extensions/add-save-props',
	addSaveProps
);
