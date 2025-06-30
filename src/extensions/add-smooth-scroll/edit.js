import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

// Define allowed blocks
const allowedBlocks = [
	'core/paragraph',
	'core/heading',
	'core/post-title',
	'core/query-title',
	'core/image',
	'core/cover',
	'core/group',
	'core/columns',
	'core/column',
	'core/post-featured-image',
];

// Blocks that support inner parallax targeting
const blocksWithInnerParallaxTarget = [
	'core/image',
	'core/cover',
	'core/post-featured-image'
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
		scrollSpeedTargetInner: {
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
		const { scrollSpeed, scrollSpeedTargetInner } = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__('Parallax', 'mello-block-extensions')} initialOpen={false}>
						<RangeControl
							label={__('Parallax Speed', 'mello-block-extensions')}
							value={ scrollSpeed !== undefined ? scrollSpeed : 0 }
							onChange={(value) => setAttributes({ scrollSpeed: value === 0 ? undefined : value })}
							min={-10}
							max={10}
							step={0.25}
						/>
						{blocksWithInnerParallaxTarget.includes(props.name) && (
							<ToggleControl
								label={__('Target Inner Element', 'mello-block-extensions')}
								checked={!!scrollSpeedTargetInner}
								onChange={(value) => setAttributes({ scrollSpeedTargetInner: value })}
							/>
						)}
					</PanelBody>
				</InspectorControls>
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

		if (attributes.scrollSpeedTargetInner) {
			extraProps.className = `${
				extraProps.className || ''
			} has-inner-scroll-speed`.trim();
		}
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'mello-block-extensions/add-save-props',
	addSaveProps
);
