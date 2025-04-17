import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { startingFigure, animationDuration, showDecimals } = attributes;

	return (
		<div
			{...useBlockProps.save({
				'data-starting-figure': showDecimals ? startingFigure : Math.floor(startingFigure),
				'data-animation-duration': animationDuration,
				'data-show-decimals': showDecimals,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
}