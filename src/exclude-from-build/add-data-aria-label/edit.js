function addSupports(settings, name) {
	if (!name.startsWith('core/') || typeof settings.save !== 'function') {
		return settings;
	}

	return {
		...settings,
		supports: {
			...settings.supports,
			ariaLabel: true,
		},
	};
}

addFilter(
	'blocks.registerBlockType',
	'mello-block-extensions/add-aria-support',
	addSupports
);

import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Add InspectorControls to all blocks to set custom aria-label.
 *
 * @param {Object} BlockEdit Block edit component.
 */
function addInspectorControls(BlockEdit) {
	return (props) => {
		const { name, attributes, setAttributes } = props;
		const blockType = wp.blocks.getBlockType(name);
		if (!blockType?.supports?.ariaLabel) {
			return <BlockEdit {...props} />;
		}
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
