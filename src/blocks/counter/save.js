import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { startingFigure, counterDuration, showDecimals, counterTriggerPoint } = attributes;

	return (
		<div
			{...useBlockProps.save({
				'data-starting-figure': showDecimals ? startingFigure : Math.floor(startingFigure),
				'data-counter-duration': counterDuration,
				'data-show-decimals': showDecimals,
				'data-trigger-point': counterTriggerPoint,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
}