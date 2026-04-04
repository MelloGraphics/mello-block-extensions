import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        slidesPerView,
        slidesPerViewXLarge,
        slidesPerViewTablet,
        slidesPerViewMobile,
        slidesPerViewAuto,
        autoHeight,
        loop,
        loopAdditionalSlides,
        autoplay,
        autoplayDelay,
        autoplayDisableOnInteraction,
        autoplayReverseDirection,
        spaceBetween,
        spaceBetweenXLarge,
        spaceBetweenTablet,
        spaceBetweenMobile,
        speed,
        direction,
        navigation,
        navigationIcon,
        pagination,
        paginationType,
        paginationClickable,
        scrollbar,
        scrollbarHide,
        scrollbarDraggable,
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
        overflowHidden,
        allowTouchMove,
        creativeEffectPrevTranslateX,
        creativeEffectPrevTranslateY,
        creativeEffectPrevTranslateZ,
        creativeEffectPrevOpacity,
        creativeEffectPrevScale,
        creativeEffectPrevRotateZ,
        creativeEffectPrevShadow,
        creativeEffectPrevOrigin,
        creativeEffectNextTranslateX,
        creativeEffectNextTranslateY,
        creativeEffectNextTranslateZ,
        creativeEffectNextOpacity,
        creativeEffectNextScale,
        creativeEffectNextRotateZ,
        creativeEffectNextShadow,
        creativeEffectNextOrigin,
        creativeEffectLimitProgress,
        creativeEffectPrevFilter,
        creativeEffectNextFilter,
    } = attributes;

    const parseTranslateVal = (v) => {
        if (v === undefined || v === '') return 0;
        const n = Number(v);
        return isNaN(n) ? v : n;
    };

    const creativeEffectData = effect === 'creative' ? JSON.stringify({
        prev: {
            translate: [
                parseTranslateVal(creativeEffectPrevTranslateX ?? '-100%'),
                parseTranslateVal(creativeEffectPrevTranslateY ?? '0'),
                creativeEffectPrevTranslateZ ?? 0,
            ],
            ...(creativeEffectPrevOpacity !== undefined && { opacity: creativeEffectPrevOpacity }),
            ...(creativeEffectPrevScale !== undefined && { scale: creativeEffectPrevScale }),
            ...(creativeEffectPrevRotateZ !== undefined && { rotate: [0, 0, creativeEffectPrevRotateZ] }),
            ...(creativeEffectPrevShadow && { shadow: true }),
            ...(creativeEffectPrevOrigin && { origin: creativeEffectPrevOrigin }),
        },
        next: {
            translate: [
                parseTranslateVal(creativeEffectNextTranslateX ?? '100%'),
                parseTranslateVal(creativeEffectNextTranslateY ?? '0'),
                creativeEffectNextTranslateZ ?? 0,
            ],
            ...(creativeEffectNextOpacity !== undefined && { opacity: creativeEffectNextOpacity }),
            ...(creativeEffectNextScale !== undefined && { scale: creativeEffectNextScale }),
            ...(creativeEffectNextRotateZ !== undefined && { rotate: [0, 0, creativeEffectNextRotateZ] }),
            ...(creativeEffectNextShadow && { shadow: true }),
            ...(creativeEffectNextOrigin && { origin: creativeEffectNextOrigin }),
        },
        limitProgress: creativeEffectLimitProgress ?? 1,
    }) : undefined;

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
        style: {
            ...(effect === 'creative' && creativeEffectPrevFilter
                ? { '--swiper-creative-prev-filter': creativeEffectPrevFilter }
                : {}),
            ...(effect === 'creative' && creativeEffectNextFilter
                ? { '--swiper-creative-next-filter': creativeEffectNextFilter }
                : {}),
        },
        'data-swiper': true,
        ...(slidesPerViewAuto
            ? addAttributeIfTruthy('slides-per-view-auto', true)
            : {
                ...(slidesPerViewXLarge !== undefined ? addAttributeIfTruthy('slides-per-view-xlarge', slidesPerViewXLarge) : {}),
                ...addAttributeIfTruthy('slides-per-view', slidesPerView),
                ...addAttributeIfTruthy('slides-per-view-tablet', slidesPerViewTablet !== undefined ? slidesPerViewTablet : 2),
                ...addAttributeIfTruthy('slides-per-view-mobile', slidesPerViewMobile !== undefined ? slidesPerViewMobile : 1),
            }),
        ...addAttributeIfTruthy('auto-height', autoHeight),
        ...addAttributeIfTruthy('loop', loop),
        ...(loop && loopAdditionalSlides !== undefined ? addAttributeIfTruthy('loop-additional-slides', loopAdditionalSlides) : {}),
        ...addAttributeIfTruthy('autoplay', autoplay),
        // Only add autoplay-related attributes if autoplay is true
        ...(autoplay === true ? addAttributeIfTruthy('autoplay-delay', autoplayDelay) : {}),
        ...(autoplay === true ? addAttributeIfTruthy('autoplay-disable-on-interaction', autoplayDisableOnInteraction) : {}),
        ...(autoplay === true ? addAttributeIfTruthy('autoplay-reverse-direction', autoplayReverseDirection) : {}),
        ...addAttributeIfTruthy('space-between', spaceBetween),
        ...(spaceBetweenXLarge !== undefined ? addAttributeIfTruthy('space-between-xlarge', spaceBetweenXLarge) : {}),
        ...addAttributeIfTruthy('space-between-tablet', spaceBetweenTablet !== undefined ? spaceBetweenTablet : 50),
        ...addAttributeIfTruthy('space-between-mobile', spaceBetweenMobile !== undefined ? spaceBetweenMobile : 50),
        ...addAttributeIfTruthy('speed', speed),
        ...addAttributeIfTruthy('direction', direction),
        ...addAttributeIfTruthy('navigation', navigation),
        ...(navigationIcon ? { 'data-swiper-navigation-icon': true } : {}),
        ...addAttributeIfTruthy('pagination', pagination),
        // Only add pagination-related attributes if pagination is true
        ...(pagination === true ? addAttributeIfTruthy('pagination-type', paginationType) : {}),
        ...(pagination === true ? addAttributeIfTruthy('pagination-clickable', paginationClickable) : {}),
        ...addAttributeIfTruthy('scrollbar', scrollbar),
        // Only add scrollbar-related attributes if scrollbar is true
        ...(scrollbar === true ? addAttributeIfTruthy('scrollbar-hide', scrollbarHide) : {}),
        ...(scrollbar === true ? addAttributeIfTruthy('scrollbar-draggable', scrollbarDraggable) : {}),
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
        ...(allowTouchMove === false ? { 'data-swiper-allow-touch-move': false } : {}),
        ...(creativeEffectData !== undefined ? { 'data-swiper-creative-effect': creativeEffectData } : {}),
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}