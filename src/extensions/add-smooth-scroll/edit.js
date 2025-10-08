import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

// Namespaces and deny-list for enabling smooth scroll controls
const ALLOW_NAMESPACES = [ 'core', 'mellobase' ];
const DENY_BLOCKS = [
	'core/calendar',
	'core/archives',
	'core/latest-comments',
	'core/rss',
	'core/tag-cloud'
];

const getNamespace = (name) =>
	typeof name === 'string' && name.includes('/') ? name.split('/')[0] : '';

const isAllowedBlock = (name) =>
	ALLOW_NAMESPACES.includes(getNamespace(name)) && !DENY_BLOCKS.includes(name);

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
	if (!isAllowedBlock(settings.name)) {
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
		if (!isAllowedBlock(props.name)) {
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
