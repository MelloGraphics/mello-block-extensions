// for mega-menu block

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
	const { anchor, mobileBreakpoint } = attributes;

	const blockProps = useBlockProps({
		className: 'mello-mega-menu',
	});

	// No need to define allowedBlocks here - it's in block.json
	const TEMPLATE = [];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Mega Menu Settings', 'mega-menu')}>
					<RangeControl
						label={__('Mobile Breakpoint (px)', 'mega-menu')}
						value={mobileBreakpoint || 768}
						onChange={(value) => setAttributes({ mobileBreakpoint: value })}
						min={320}
						max={1200}
						help={__('Screen width where mobile menu activates', 'mega-menu')}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="mello-mega-menu__wrapper">
					<div className="mello-mega-menu__header">
						<span className="mello-mega-menu__label">
							📋 {__('Mega Menu', 'mega-menu')}
						</span>
					</div>
					<div className="mello-mega-menu__content">
						<InnerBlocks
							template={TEMPLATE}
							templateLock={false}
							renderAppender={InnerBlocks.DefaultBlockAppender}
						/>
					</div>
				</div>
			</div>
		</>
	);
}