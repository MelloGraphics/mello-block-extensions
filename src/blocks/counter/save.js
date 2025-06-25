import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { startingFigure, counterDuration, showDecimals } = attributes;

	return (
		<div
			{...useBlockProps.save({
				'data-starting-figure': showDecimals ? startingFigure : Math.floor(startingFigure),
				'data-counter-duration': counterDuration,
				'data-show-decimals': showDecimals,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
}