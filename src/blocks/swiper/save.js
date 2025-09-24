import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        slidesPerView,
        slidesPerViewTablet,
        slidesPerViewMobile,
        slidesPerViewAuto,
        autoHeight,
        loop,
        autoplay,
        autoplayDelay,
        autoplayDisableOnInteraction,
        autoplayReverseDirection,
        spaceBetween,
        spaceBetweenTablet,
        spaceBetweenMobile,
        speed,
        direction,
        navigation,
        pagination,
        paginationType,
        paginationClickable,
        scrollbar,
        scrollbarHide,
        scrollbarDraggable, // Add this line
        effect,
        mousewheel,
        mousewheelForceToAxis,
        mousewheelInvert,
        mousewheelReleaseOnEdges,
        mousewheelSensitivity,
        mousewheelEventsTarget,
        grabCursor,
        slideToClickedSlide,
        centeredSlides,
        freeMode,
        freeModeMomentum,
        freeModeMomentumRatio,
        freeModeMomentumVelocityRatio,
        freeModeSticky,
        enableThumbs,
        thumbsTarget,
        overflowHidden
    } = attributes;

    // Helper function to add attribute only if it has a valid and truthy value
    const addAttributeIfTruthy = (attributeName, value) => {
        // Skip attributes with falsy values (false, 0, undefined, null, '')
        // except preserve 0 as a valid value
        if (!value && value !== 0) {
            return {};
        }

        // Only add attributes with truthy values
        return { [`data-swiper-${attributeName}`]: value };
    };

    const blockProps = useBlockProps.save({
        'data-swiper': true,
        ...(slidesPerViewAuto
            ? addAttributeIfTruthy('slides-per-view-auto', true)
            : {
                ...addAttributeIfTruthy('slides-per-view', slidesPerView),
                ...addAttributeIfTruthy('slides-per-view-tablet', slidesPerViewTablet !== undefined ? slidesPerViewTablet : 2),
                ...addAttributeIfTruthy('slides-per-view-mobile', slidesPerViewMobile !== undefined ? slidesPerViewMobile : 1),
            }),
        ...addAttributeIfTruthy('auto-height', autoHeight),
        ...addAttributeIfTruthy('loop', loop),
        ...addAttributeIfTruthy('autoplay', autoplay),
        // Only add autoplay-related attributes if autoplay is true
        ...(autoplay === true ? addAttributeIfTruthy('autoplay-delay', autoplayDelay) : {}),
        ...(autoplay === true ? addAttributeIfTruthy('autoplay-disable-on-interaction', autoplayDisableOnInteraction) : {}),
        ...(autoplay === true ? addAttributeIfTruthy('autoplay-reverse-direction', autoplayReverseDirection) : {}),
        ...addAttributeIfTruthy('space-between', spaceBetween),
        ...addAttributeIfTruthy('space-between-tablet', spaceBetweenTablet !== undefined ? spaceBetweenTablet : 50),
        ...addAttributeIfTruthy('space-between-mobile', spaceBetweenMobile !== undefined ? spaceBetweenMobile : 50),
        ...addAttributeIfTruthy('speed', speed),
        ...addAttributeIfTruthy('direction', direction),
        ...addAttributeIfTruthy('navigation', navigation),
        ...addAttributeIfTruthy('pagination', pagination),
        // Only add pagination-related attributes if pagination is true
        ...(pagination === true ? addAttributeIfTruthy('pagination-type', paginationType) : {}),
        ...(pagination === true ? addAttributeIfTruthy('pagination-clickable', paginationClickable) : {}),
        ...addAttributeIfTruthy('scrollbar', scrollbar),
        // Only add scrollbar-related attributes if scrollbar is true
        ...(scrollbar === true ? addAttributeIfTruthy('scrollbar-hide', scrollbarHide) : {}),
        ...(scrollbar === true ? addAttributeIfTruthy('scrollbar-draggable', scrollbarDraggable) : {}), // Add this line
        ...addAttributeIfTruthy('effect', effect),
        ...addAttributeIfTruthy('mousewheel', mousewheel),
        // Only add mousewheel-related attributes if mousewheel is true
        ...(mousewheel === true ? addAttributeIfTruthy('mousewheel-force-to-axis', mousewheelForceToAxis) : {}),
        ...(mousewheel === true ? addAttributeIfTruthy('mousewheel-invert', mousewheelInvert) : {}),
        ...(mousewheel === true ? addAttributeIfTruthy('mousewheel-release-on-edges', mousewheelReleaseOnEdges) : {}),
        ...(mousewheel === true ? addAttributeIfTruthy('mousewheel-sensitivity', mousewheelSensitivity) : {}),
        ...(mousewheel === true ? addAttributeIfTruthy('mousewheel-events-target', mousewheelEventsTarget) : {}),
        ...addAttributeIfTruthy('grab-cursor', grabCursor),
        ...addAttributeIfTruthy('slide-to-clicked-slide', slideToClickedSlide),
        ...addAttributeIfTruthy('centered-slides', centeredSlides),
        ...addAttributeIfTruthy('free-mode', freeMode),
        // Only add free-mode-related attributes if freeMode is true
        ...(freeMode === true ? addAttributeIfTruthy('free-mode-momentum', freeModeMomentum) : {}),
        ...(freeMode === true ? addAttributeIfTruthy('free-mode-momentum-ratio', freeModeMomentumRatio) : {}),
        ...(freeMode === true ? addAttributeIfTruthy('free-mode-momentum-velocity-ratio', freeModeMomentumVelocityRatio) : {}),
        ...(freeMode === true ? addAttributeIfTruthy('free-mode-sticky', freeModeSticky) : {}),
        ...addAttributeIfTruthy('enable-thumbs', enableThumbs),
        ...(enableThumbs === true ? addAttributeIfTruthy('thumbs-target', thumbsTarget) : {}),
        ...(overflowHidden === true ? addAttributeIfTruthy('overflow-hidden', overflowHidden) : {}),
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}