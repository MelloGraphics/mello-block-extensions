import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { aspectRatio, autoplay, loop, muted, controls, playsInline, useFeaturedImagePoster } = attributes;
	
	const blockProps = useBlockProps.save({
		'data-aspect-ratio': aspectRatio,
		'data-autoplay': autoplay,
		'data-loop': loop,
		'data-muted': muted,
		'data-controls': controls,
		'data-plays-inline': playsInline,
		'data-use-poster': useFeaturedImagePoster,
	});

	return <div {...blockProps}></div>;
}