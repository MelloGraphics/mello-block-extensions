import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		slidesPerView,
		loop,
		autoplay,
		autoplayDelay,
		autoplayDisableOnInteraction,
		spaceBetween,
		speed,
		navigation,
		pagination,
		paginationClickable,
		scrollbar,
		effect,
		mousewheel,
		centeredSlides,
		freeMode
	} = attributes;

	const blockProps = useBlockProps.save({
		'data-swiper': true,
		...(slidesPerView !== undefined && { 'data-swiper-slides-per-view': slidesPerView }),
		...(loop !== undefined && { 'data-swiper-loop': loop }),
		...(autoplay !== undefined && { 'data-swiper-autoplay': autoplay }),
		...(autoplayDelay !== undefined && { 'data-swiper-autoplay-delay': autoplayDelay }),
		...(autoplayDisableOnInteraction !== undefined && { 'data-swiper-autoplay-disable-on-interaction': autoplayDisableOnInteraction }),
		...(spaceBetween !== undefined && { 'data-swiper-space-between': spaceBetween }),
		...(speed !== undefined && { 'data-swiper-speed': speed }),
		...(navigation !== undefined && { 'data-swiper-navigation': navigation }),
		...(pagination !== undefined && { 'data-swiper-pagination': pagination }),
		...(paginationClickable !== undefined && { 'data-swiper-pagination-clickable': paginationClickable }),
		...(scrollbar !== undefined && { 'data-swiper-scrollbar': scrollbar }),
		...(effect !== undefined && { 'data-swiper-effect': effect }),
		...(mousewheel !== undefined && { 'data-swiper-mousewheel': mousewheel }),
		...(centeredSlides !== undefined && { 'data-swiper-centered-slides': centeredSlides }),
		...(freeMode !== undefined && { 'data-swiper-free-mode': freeMode }),
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
