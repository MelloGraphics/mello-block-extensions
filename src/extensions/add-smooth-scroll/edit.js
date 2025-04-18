import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { RangeControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

// Define allowed blocks
const allowedBlocks = [
	'core/paragraph',
	'core/heading',
	'core/post-title',
	'core/query-title',
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
		scrollSpeed: {
			type: 'number',
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
		const { scrollSpeed } = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorAdvancedControls>
					<RangeControl
						label={__('Scroll Speed', 'mello-block-extensions')}
						value={ scrollSpeed !== undefined ? scrollSpeed : 0 }
						onChange={(value) => setAttributes({ scrollSpeed: value === 0 ? undefined : value })}
						min={-2}
						max={2}
						step={0.25}
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
	if (typeof attributes.scrollSpeed === 'number' && attributes.scrollSpeed !== 0) {
		extraProps['data-scroll-speed'] = attributes.scrollSpeed.toString();
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'mello-block-extensions/add-save-props',
	addSaveProps
);
