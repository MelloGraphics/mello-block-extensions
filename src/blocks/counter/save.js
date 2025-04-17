import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { startingFigure, animationDuration } = attributes;

	return (
		<div
			{...useBlockProps.save({
				'data-starting-figure': startingFigure,
				'data-animation-duration': animationDuration,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
}