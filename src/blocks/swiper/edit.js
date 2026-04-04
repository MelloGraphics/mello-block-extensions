import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __experimentalDivider as Divider, Notice, PanelBody, RangeControl, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import './style.scss';

const TEMPLATE = [
    [
        'core/group',
        {
            lock: { move: true, remove: true },
            metadata: { name: 'Swiper Wrapper' },
            className: 'swiper-wrapper',
            layout: { type: 'flex', flexWrap: 'nowrap' },
            style: { spacing: { blockGap: 'var:preset|spacing|none' } },
        },
        [
            ['core/group', { metadata: { name: 'Swiper Slide' }, layout: { type: 'constrained' } }, [['core/paragraph', { placeholder: __('Add content to your slide.', 'mello-block') }]]],
            ['core/group', { metadata: { name: 'Swiper Slide' }, layout: { type: 'constrained' } }, [['core/paragraph', { placeholder: __('Add content to your slide.', 'mello-block') }]]],
            ['core/group', { metadata: { name: 'Swiper Slide' }, layout: { type: 'constrained' } }, [['core/paragraph', { placeholder: __('Add content to your slide.', 'mello-block') }]]],
        ],
    ],
    ['core/group', { lock: { remove: true }, metadata: { name: 'Pagination Wrapper' }, className: 'swiper-pagination', layout: { type: 'constrained' } }],
    ['core/group', { lock: { remove: true }, metadata: { name: 'Scrollbar Wrapper' }, className: 'swiper-scrollbar', layout: { type: 'constrained' } }],
    [
        'core/buttons',
        { lock: { remove: true }, className: 'swiper-navigation', metadata: { name: 'Prev / Next Buttons' }, style: { spacing: { blockGap: { left: 'var:preset|spacing|small' } } } },
        [
            ['core/button', { className: 'swiper-button-prev', "lock": { "move": true, "remove": true }, text: __('prev', 'mello-block'), tagName: 'button' }],
            ['core/button', { className: 'swiper-button-next', "lock": { "move": true, "remove": true }, text: __('next', 'mello-block'), tagName: 'button' }],
        ],
    ],
];

export default function Edit({ attributes, setAttributes, clientId }) {
    const {
        slidesPerView,
        slidesPerViewXLarge,
        slidesPerViewTablet,
        slidesPerViewMobile,
        slidesPerViewAuto,
        autoHeight,
        loop,
        loopAdditionalSlides,
        centeredSlides,
        autoplay,
        autoplayDelay,
        autoplayDisableOnInteraction,
        autoplayReverseDirection,
        spaceBetween,
        spaceBetweenXLarge,
        spaceBetweenTablet,
        spaceBetweenMobile,
        speed,
        navigation,
        navigationIcon,
        pagination,
        paginationType,
        paginationClickable,
        scrollbar,
        scrollbarHide,
        scrollbarDraggable,
        enableThumbs,
        thumbsTarget,
        effect,
        direction,
        mousewheel,
        mousewheelForceToAxis,
        mousewheelInvert,
        mousewheelReleaseOnEdges,
        mousewheelSensitivity,
        mousewheelEventsTarget,
        grabCursor,
        slideToClickedSlide,
        freeMode,
        freeModeMomentum,
        freeModeMomentumRatio,
        freeModeMomentumVelocityRatio,
        freeModeSticky,
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

    // Convert a translate string like "100%" to string, or "0"/"-400" to number
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

    const innerBlocks = useSelect((select) => select('core/block-editor').getBlocks(clientId), [clientId]);
    const { updateBlockAttributes } = useDispatch('core/block-editor');
    const initialised = useRef(false);

    const setInnerBlockVisibility = (metadataName, visible) => {
        const block = innerBlocks.find((b) => b.attributes?.metadata?.name === metadataName);
        if (!block) return;
        const currentMetadata = block.attributes.metadata || {};
        if (visible) {
            const { blockVisibility, ...rest } = currentMetadata;
            updateBlockAttributes(block.clientId, { metadata: rest });
        } else {
            updateBlockAttributes(block.clientId, { metadata: { ...currentMetadata, blockVisibility: false } });
        }
    };

    // On first load, sync blockVisibility for all three inner blocks with saved attribute state.
    useEffect(() => {
        if (initialised.current || innerBlocks.length === 0) return;
        initialised.current = true;
        [
            { name: 'Prev / Next Buttons', value: navigation },
            { name: 'Pagination Wrapper', value: pagination },
            { name: 'Scrollbar Wrapper', value: scrollbar },
        ].forEach(({ name, value }) => setInnerBlockVisibility(name, !!value));
    }, [innerBlocks.length]); // eslint-disable-line react-hooks/exhaustive-deps

    const blockProps = useBlockProps({
        style: {
            ...(spaceBetween !== undefined
                ? { '--swiper-space-between': `${spaceBetween}px` }
                : {}),
            ...(spaceBetweenXLarge !== undefined
                ? { '--swiper-space-between-xlarge': `${spaceBetweenXLarge}px` }
                : {}),
            ...(spaceBetweenTablet !== undefined
                ? { '--swiper-space-between-tablet': `${spaceBetweenTablet}px` }
                : {}),
            ...(spaceBetweenMobile !== undefined
                ? { '--swiper-space-between-mobile': `${spaceBetweenMobile}px` }
                : {}),
            ...(!slidesPerViewAuto && slidesPerViewXLarge !== undefined
                ? { '--swiper-spv-xlarge': slidesPerViewXLarge }
                : {}),
            ...(!slidesPerViewAuto && slidesPerView !== undefined
                ? { '--swiper-spv': slidesPerView }
                : {}),
            ...(!slidesPerViewAuto && slidesPerViewTablet !== undefined
                ? { '--swiper-spv-tablet': slidesPerViewTablet }
                : {}),
            ...(!slidesPerViewAuto && slidesPerViewMobile !== undefined
                ? { '--swiper-spv-mobile': slidesPerViewMobile }
                : {}),
            ...(effect === 'creative' && creativeEffectPrevFilter
                ? { '--swiper-creative-prev-filter': creativeEffectPrevFilter }
                : {}),
            ...(effect === 'creative' && creativeEffectNextFilter
                ? { '--swiper-creative-next-filter': creativeEffectNextFilter }
                : {}),
        },
        'data-swiper': true,
        ...(slidesPerViewAuto
            ? { 'data-swiper-slides-per-view-auto': true }
            : {
                ...(slidesPerViewXLarge !== undefined && { 'data-swiper-slides-per-view-xlarge': slidesPerViewXLarge }),
                'data-swiper-slides-per-view': slidesPerView,
                'data-swiper-slides-per-view-tablet': slidesPerViewTablet !== undefined ? slidesPerViewTablet : 2,
                'data-swiper-slides-per-view-mobile': slidesPerViewMobile !== undefined ? slidesPerViewMobile : 1,
            }),
        'data-swiper-loop': loop,
        ...(loop && loopAdditionalSlides !== undefined && { 'data-swiper-loop-additional-slides': loopAdditionalSlides }),
        'data-swiper-centered-slides': centeredSlides,
        'data-swiper-autoplay': autoplay,
        ...(autoHeight !== undefined && { 'data-swiper-auto-height': autoHeight }),
        ...(autoplayDelay !== undefined && { 'data-swiper-autoplay-delay': autoplayDelay }),
        ...(autoplayDisableOnInteraction !== undefined && { 'data-swiper-autoplay-disable-on-interaction': autoplayDisableOnInteraction }),
        ...(autoplayReverseDirection !== undefined && { 'data-swiper-autoplay-reverse-direction': autoplayReverseDirection }),
        ...(spaceBetween !== undefined && { 'data-swiper-space-between': spaceBetween }),
        ...(spaceBetweenXLarge !== undefined && { 'data-swiper-space-between-xlarge': spaceBetweenXLarge }),
        ...(spaceBetweenTablet !== undefined && { 'data-swiper-space-between-tablet': spaceBetweenTablet }),
        ...(spaceBetweenMobile !== undefined && { 'data-swiper-space-between-mobile': spaceBetweenMobile }),
        ...(speed !== undefined && { 'data-swiper-speed': speed }),
        ...(direction !== undefined && { 'data-swiper-direction': direction }),
        ...(navigation !== undefined && { 'data-swiper-navigation': navigation }),
        ...(navigationIcon && { 'data-swiper-navigation-icon': true }),
        ...(pagination !== undefined && { 'data-swiper-pagination': pagination }),
        ...(paginationType !== undefined && { 'data-swiper-pagination-type': paginationType }),
        ...(paginationClickable !== undefined && { 'data-swiper-pagination-clickable': paginationClickable }),
        ...(scrollbar !== undefined && { 'data-swiper-scrollbar': scrollbar }),
        ...(scrollbarHide !== undefined && { 'data-swiper-scrollbar-hide': scrollbarHide }),
        ...(scrollbarDraggable !== undefined && { 'data-swiper-scrollbar-draggable': scrollbarDraggable }),
        ...(effect !== undefined && { 'data-swiper-effect': effect }),
        ...(mousewheel !== undefined && { 'data-swiper-mousewheel': mousewheel }),
        ...(mousewheelForceToAxis !== undefined && { 'data-swiper-mousewheel-force-to-axis': mousewheelForceToAxis }),
        ...(mousewheelInvert !== undefined && { 'data-swiper-mousewheel-invert': mousewheelInvert }),
        ...(mousewheelReleaseOnEdges !== undefined && { 'data-swiper-mousewheel-release-on-edges': mousewheelReleaseOnEdges }),
        ...(mousewheelSensitivity !== undefined && { 'data-swiper-mousewheel-sensitivity': mousewheelSensitivity }),
        ...(mousewheelEventsTarget !== undefined && { 'data-swiper-mousewheel-events-target': mousewheelEventsTarget }),
        ...(grabCursor !== undefined && { 'data-swiper-grab-cursor': grabCursor }),
        ...(slideToClickedSlide !== undefined && { 'data-swiper-slide-to-clicked-slide': slideToClickedSlide }),
        ...(freeMode !== undefined && { 'data-swiper-free-mode': freeMode }),
        ...(freeModeMomentum !== undefined && { 'data-swiper-free-mode-momentum': freeModeMomentum }),
        ...(freeModeMomentumRatio !== undefined && { 'data-swiper-free-mode-momentum-ratio': freeModeMomentumRatio }),
        ...(freeModeMomentumVelocityRatio !== undefined && { 'data-swiper-free-mode-momentum-velocity-ratio': freeModeMomentumVelocityRatio }),
        ...(freeModeSticky !== undefined && { 'data-swiper-free-mode-sticky': freeModeSticky }),
        ...(enableThumbs !== undefined && { 'data-swiper-enable-thumbs': enableThumbs }),
        ...(thumbsTarget !== undefined && { 'data-swiper-thumbs-target': thumbsTarget }),
        ...(overflowHidden !== undefined && { 'data-swiper-overflow-hidden': overflowHidden }),
        ...(allowTouchMove !== undefined && { 'data-swiper-allow-touch-move': allowTouchMove }),
        ...(creativeEffectData !== undefined && { 'data-swiper-creative-effect': creativeEffectData }),
    });

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Slide Settings', 'mello-block')} initialOpen={false}>
                    <SelectControl
                        __next40pxDefaultSize
                        label={__('Direction', 'mello-block')}
                        value={direction || 'horizontal'}
                        options={[
                            { label: __('Horizontal', 'mello-block'), value: 'horizontal' },
                            { label: __('Vertical', 'mello-block'), value: 'vertical' },
                        ]}
                        onChange={(value) => setAttributes({ direction: value })}

                    />
                    <Divider />
                    <ToggleControl
                        label={__('Loop Slides', 'mello-block')}
                        checked={loop}
                        onChange={(value) => setAttributes({ loop: value !== undefined ? value : undefined })}
                    />
                    {loop && (
                        <RangeControl
                            label={__('Loop Additional Slides', 'mello-block')}
                            value={loopAdditionalSlides}
                            onChange={(value) => setAttributes({ loopAdditionalSlides: value !== undefined ? value : undefined })}
                            min={0}
                            max={20}
                            step={1}
                            help={__('Extra cloned slides added on each side — helps prevent gaps with effects or auto-width slides.', 'mello-block')}
                        />
                    )}
                    <ToggleControl
                        label={__('Center Slides', 'mello-block')}
                        checked={centeredSlides}
                        onChange={(value) => setAttributes({ centeredSlides: value !== undefined ? value : undefined })}
                    />
                    <ToggleControl
                        label={__('Auto Fit Slides', 'mello-block')}
                        checked={slidesPerViewAuto}
                        onChange={(value) => setAttributes({ slidesPerViewAuto: value !== undefined ? value : undefined })}
                        disabled={effect === 'creative'}
                    />
                    <ToggleControl
                        label={__('Auto Height Slider', 'mello-block')}
                        checked={autoHeight}
                        onChange={(value) => setAttributes({ autoHeight: value !== undefined ? value : undefined })}
                    />
                    <ToggleControl
                        label={__('Overflow Hidden', 'mello-block')}
                        checked={overflowHidden}
                        onChange={(value) => setAttributes({ overflowHidden: value !== undefined ? value : undefined })}
                    />
                    <Divider />
                    {!slidesPerViewAuto && (
                        <>
                            <RangeControl
                                label={__('Slides Per View (> 1700px)', 'mello-block')}
                                value={slidesPerViewXLarge !== undefined ? slidesPerViewXLarge : slidesPerView}
                                onChange={(value) => setAttributes({ slidesPerViewXLarge: value !== undefined ? value : undefined })}
                                min={1}
                                max={12}
                                step={0.25}
                                disabled={effect === 'creative'}
                            />
                            <RangeControl
                                label={__('Slides Per View (> 1200px)', 'mello-block')}
                                value={slidesPerView !== undefined ? slidesPerView : 3}
                                onChange={(value) => setAttributes({ slidesPerView: value !== undefined ? value : undefined })}
                                min={1}
                                max={12}
                                step={0.25}
                                disabled={effect === 'creative'}
                            />
                            <RangeControl
                                label={__('Slides Per View (> 782px)', 'mello-block')}
                                value={slidesPerViewTablet !== undefined ? slidesPerViewTablet : 2}
                                onChange={(value) => setAttributes({ slidesPerViewTablet: value !== undefined ? value : undefined })}
                                min={1}
                                max={12}
                                disabled={effect === 'creative'}
                                step={0.25}
                            />
                            <RangeControl
                                label={__('Slides Per View (Mobile)', 'mello-block')}
                                value={slidesPerViewMobile !== undefined ? slidesPerViewMobile : 1}
                                onChange={(value) => setAttributes({ slidesPerViewMobile: value !== undefined ? value : undefined })}
                                min={1}
                                max={12}
                                step={0.25}
                                disabled={effect === 'creative'}
                            />
                            <Divider />
                        </>
                    )}
                    <RangeControl
                        label={__('Speed (ms)', 'mello-block')}
                        value={speed}
                        onChange={(value) => setAttributes({ speed: value !== undefined ? value : undefined })}
                        min={0}
                        max={50000}
                        step={250}
                    />
                </PanelBody>
                <PanelBody title={__('Slide Spacing', 'mello-block')} initialOpen={false}>
                    <RangeControl
                        label={__('Space Between Slides (> 1700px)', 'mello-block')}
                        value={spaceBetweenXLarge !== undefined ? spaceBetweenXLarge : spaceBetween}
                        onChange={(value) => setAttributes({ spaceBetweenXLarge: value !== undefined ? value : undefined })}
                        min={0}
                        max={200}
                        step={1}
                        disabled={effect === 'creative'}
                    />
                    <RangeControl
                        label={__('Space Between Slides (> 1200px)', 'mello-block')}
                        value={spaceBetween !== undefined ? spaceBetween : 75}
                        onChange={(value) => setAttributes({ spaceBetween: value !== undefined ? value : undefined })}
                        min={0}
                        max={200}
                        step={1}
                        disabled={effect === 'creative'}
                    />
                    <RangeControl
                        label={__('Space Between Slides (> 782px)', 'mello-block')}
                        value={spaceBetweenTablet !== undefined ? spaceBetweenTablet : 50}
                        onChange={(value) => setAttributes({ spaceBetweenTablet: value !== undefined ? value : undefined })}
                        min={0}
                        max={200}
                        step={1}
                        disabled={effect === 'creative'}
                    />
                    <RangeControl
                        label={__('Space Between Slides (Mobile)', 'mello-block')}
                        value={spaceBetweenMobile !== undefined ? spaceBetweenMobile : 25}
                        onChange={(value) => setAttributes({ spaceBetweenMobile: value !== undefined ? value : undefined })}
                        min={0}
                        max={200}
                        step={1}
                        disabled={effect === 'creative'}
                    />
                </PanelBody>

                <PanelBody title={__('Behaviour', 'mello-block')} initialOpen={false}>
                    <ToggleControl
                        label={__('Allow Touch/Drag', 'mello-block')}
                        checked={allowTouchMove !== false}
                        onChange={(value) => {
                            const updates = { allowTouchMove: value };
                            // Disable related options when touch/drag is disabled
                            if (value === false) {
                                updates.grabCursor = undefined;
                                updates.freeMode = undefined;
                                updates.freeModeMomentum = undefined;
                                updates.freeModeMomentumRatio = undefined;
                                updates.freeModeMomentumVelocityRatio = undefined;
                                updates.freeModeSticky = undefined;
                            }
                            setAttributes(updates);
                        }}
                        help={__('Disable to prevent swiping/dragging (useful for thumbs)', 'mello-block')}
                    />
                    {allowTouchMove !== false && (
                        <>
                            <ToggleControl
                                label={__('Grab Cursor', 'mello-block')}
                                checked={grabCursor}
                                onChange={(value) => setAttributes({ grabCursor: value !== undefined ? value : undefined })}
                            />
                        </>
                    )}
                    <ToggleControl
                        label={__('Slide to Clicked Slide', 'mello-block')}
                        checked={slideToClickedSlide}
                        onChange={(value) => setAttributes({ slideToClickedSlide: value !== undefined ? value : undefined })}
                    />
                    <Divider />
                    <ToggleControl
                        label={__('Autoplay', 'mello-block')}
                        checked={autoplay}
                        onChange={(value) => {
                            setAttributes({
                                autoplay: value !== undefined ? value : undefined,
                                autoplayDelay: value === true && autoplayDelay === undefined ? 3000 : autoplayDelay,
                            });
                        }}
                    />
                    {autoplay && (
                        <>
                            <RangeControl
                                label={__('Autoplay Delay (ms)', 'mello-block')}
                                value={autoplayDelay}
                                onChange={(value) => setAttributes({ autoplayDelay: value !== undefined ? value : undefined })}
                                min={0}
                                max={10000}
                                step={100}
                                defaultValue={3000}
                            />
                            <ToggleControl
                                label={__('Disable on Interaction', 'mello-block')}
                                checked={autoplayDisableOnInteraction}
                                onChange={(value) => setAttributes({ autoplayDisableOnInteraction: value !== undefined ? value : undefined })}
                            />
                            <ToggleControl
                                label={__('Reverse Direction', 'mello-block')}
                                checked={autoplayReverseDirection}
                                onChange={(value) => setAttributes({ autoplayReverseDirection: value !== undefined ? value : undefined })}
                            />
                        </>
                    )}

                    {allowTouchMove !== false && (

                        <>
                            <Divider />
                            <ToggleControl
                                label={__('Free Mode', 'mello-block')}
                                checked={freeMode}
                                onChange={(value) => setAttributes({ freeMode: value !== undefined ? value : undefined })}
                            />
                            {freeMode && (
                                <>
                                    <ToggleControl
                                        label={__('Momentum', 'mello-block')}
                                        checked={freeModeMomentum}
                                        onChange={(value) => setAttributes({ freeModeMomentum: value !== undefined ? value : undefined })}
                                    />
                                    <RangeControl
                                        label={__('Momentum Ratio', 'mello-block')}
                                        value={freeModeMomentumRatio}
                                        onChange={(value) => setAttributes({ freeModeMomentumRatio: value !== undefined ? value : undefined })}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                    />
                                    <RangeControl
                                        label={__('Momentum Velocity Ratio', 'mello-block')}
                                        value={freeModeMomentumVelocityRatio}
                                        onChange={(value) => setAttributes({ freeModeMomentumVelocityRatio: value !== undefined ? value : undefined })}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                    />
                                    <ToggleControl
                                        label={__('Sticky', 'mello-block')}
                                        checked={freeModeSticky}
                                        onChange={(value) => setAttributes({ freeModeSticky: value !== undefined ? value : undefined })}
                                    />
                                </>
                            )}
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Navigation', 'mello-block')} initialOpen={false}>
                    {/* Navigation Toggle */}
                    <ToggleControl
                        label={__('Enable Navigation', 'mello-block')}
                        checked={navigation}
                        onChange={(value) => {
                            setAttributes({ navigation: value !== undefined ? value : undefined });
                            setInnerBlockVisibility('Prev / Next Buttons', value);
                        }}
                    />
                    {navigation && (
                        <ToggleControl
                            label={__('Use Swiper Icon', 'mello-block')}
                            checked={!!navigationIcon}
                            onChange={(value) => setAttributes({ navigationIcon: value || undefined })}
                            help={__('Show the default Swiper arrow icon injected by Swiper v12+', 'mello-block')}
                        />
                    )}
                    <Divider />
                    {/* Pagination Toggle and controls */}
                    <ToggleControl
                        label={__('Enable Pagination', 'mello-block')}
                        checked={pagination}
                        onChange={(value) => {
                            setAttributes({ pagination: value !== undefined ? value : undefined });
                            setInnerBlockVisibility('Pagination Wrapper', value);
                        }}
                    />
                    {pagination && (
                        <>
                            <SelectControl
                                __next40pxDefaultSize
                                label={__('Pagination Type', 'mello-block')}
                                value={paginationType || 'bullets'}
                                options={[
                                    { label: __('Bullets', 'mello-block'), value: 'bullets' },
                                    { label: __('Fraction', 'mello-block'), value: 'fraction' },
                                    { label: __('Progressbar', 'mello-block'), value: 'progressbar' },
                                ]}
                                onChange={(value) => setAttributes({ paginationType: value !== undefined ? value : undefined })}
                            />
                            {paginationType === 'bullets' && (
                                <ToggleControl
                                    label={__('Clickable', 'mello-block')}
                                    checked={paginationClickable}
                                    onChange={(value) => setAttributes({ paginationClickable: value !== undefined ? value : undefined })}
                                />
                            )}
                        </>
                    )}
                    <Divider />
                    <ToggleControl
                        label={__('Enable Scrollbar', 'mello-block')}
                        checked={scrollbar}
                        onChange={(value) => {
                            setAttributes({ scrollbar: value !== undefined ? value : undefined });
                            setInnerBlockVisibility('Scrollbar Wrapper', value);
                        }}
                    />
                    {scrollbar && (
                        <>
                            <ToggleControl
                                label={__('Hide Scrollbar', 'mello-block')}
                                checked={scrollbarHide}
                                onChange={(value) => setAttributes({ scrollbarHide: value !== undefined ? value : undefined })}
                            />
                            <ToggleControl
                                label={__('Draggable', 'mello-block')}
                                checked={scrollbarDraggable}
                                onChange={(value) => setAttributes({ scrollbarDraggable: value !== undefined ? value : undefined })}
                            />
                        </>
                    )}
                    <Divider />
                    <ToggleControl
                        label={__('Enable Thumbs', 'mello-block')}
                        checked={!!enableThumbs}
                        onChange={(value) =>
                            setAttributes({
                                enableThumbs: value !== undefined ? value : undefined,
                            })
                        }
                    />
                    {enableThumbs && (
                        <TextControl
                            __next40pxDefaultSize
                            label={__('Thumbs Target', 'mello-block')}
                            value={thumbsTarget || ''}
                            onChange={(value) => setAttributes({ thumbsTarget: value !== '' ? value : undefined })}
                            placeholder={__('CSS selector or ID of thumbs container', 'mello-block')}
                        />
                    )}
                    <Divider />
                    <ToggleControl
                        label={__('Enable Mousewheel', 'mello-block')}
                        checked={mousewheel}
                        onChange={(value) => setAttributes({ mousewheel: value !== undefined ? value : undefined })}
                    />
                    {mousewheel && (
                        <>
                            <ToggleControl
                                label={__('Force To Axis', 'mello-block')}
                                checked={mousewheelForceToAxis}
                                onChange={(value) => setAttributes({ mousewheelForceToAxis: value !== undefined ? value : undefined })}
                            />
                            <ToggleControl
                                label={__('Invert', 'mello-block')}
                                checked={mousewheelInvert}
                                onChange={(value) => setAttributes({ mousewheelInvert: value !== undefined ? value : undefined })}
                            />
                            <ToggleControl
                                label={__('Release On Edges', 'mello-block')}
                                checked={mousewheelReleaseOnEdges}
                                onChange={(value) => setAttributes({ mousewheelReleaseOnEdges: value !== undefined ? value : undefined })}
                            />
                            <RangeControl
                                label={__('Sensitivity', 'mello-block')}
                                value={mousewheelSensitivity}
                                onChange={(value) => setAttributes({ mousewheelSensitivity: value !== undefined ? value : undefined })}
                                min={0.1}
                                max={10}
                                step={0.1}
                            />
                            <SelectControl
                                __next40pxDefaultSize
                                label={__('Events Target', 'mello-block')}
                                value={mousewheelEventsTarget || 'container'}
                                options={[
                                    { label: __('Container', 'mello-block'), value: 'container' },
                                    { label: __('Wrapper', 'mello-block'), value: 'wrapper' },
                                ]}
                                onChange={(value) => setAttributes({ mousewheelEventsTarget: value !== undefined ? value : undefined })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Effects', 'mello-block')} initialOpen={false}>
                    <SelectControl
                        __next40pxDefaultSize
                        label={__('Effect', 'mello-block')}
                        value={effect || 'slide'}
                        options={[
                            { label: __('Slide', 'mello-block'), value: 'slide' },
                            { label: __('Fade', 'mello-block'), value: 'fade' },
                            { label: __('Creative', 'mello-block'), value: 'creative' },
                        ]}
                        onChange={(value) => {
                            const updates = { effect: value !== undefined ? value : undefined };
                            if (value === 'creative') {
                                updates.slidesPerView = 1;
                                updates.slidesPerViewXLarge = 1;
                                updates.slidesPerViewTablet = 1;
                                updates.slidesPerViewMobile = 1;
                                updates.slidesPerViewAuto = false;
                                updates.spaceBetween = 0;
                                updates.spaceBetweenXLarge = 0;
                                updates.spaceBetweenTablet = 0;
                                updates.spaceBetweenMobile = 0;
                            }
                            setAttributes(updates);
                        }}
                    />
                    {effect === 'creative' && (
                        <>
                            <Notice status="warning" isDismissible={false}>
                                {__('Creative effect requires Slides Per View set to 1 on all breakpoints.', 'mello-block')}
                            </Notice>
                            <Divider />
                            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>{__('Previous Slide', 'mello-block')}</p>
                            <TextControl
                                __next40pxDefaultSize
                                label={__('Translate X', 'mello-block')}
                                value={creativeEffectPrevTranslateX ?? '-100%'}
                                onChange={(value) => setAttributes({ creativeEffectPrevTranslateX: value })}
                                help={__('Use % (e.g. -100%) or px (e.g. -400)', 'mello-block')}
                            />
                            <TextControl
                                __next40pxDefaultSize
                                label={__('Translate Y', 'mello-block')}
                                value={creativeEffectPrevTranslateY ?? '0'}
                                onChange={(value) => setAttributes({ creativeEffectPrevTranslateY: value })}
                                help={__('Use % (e.g. -100%) or px (e.g. -200)', 'mello-block')}
                            />
                            <RangeControl
                                label={__('Translate Z (px)', 'mello-block')}
                                value={creativeEffectPrevTranslateZ ?? 0}
                                onChange={(value) => setAttributes({ creativeEffectPrevTranslateZ: value ?? 0 })}
                                min={-1200}
                                max={0}
                                step={10}
                            />
                            <RangeControl
                                label={__('Opacity', 'mello-block')}
                                value={creativeEffectPrevOpacity}
                                onChange={(value) => setAttributes({ creativeEffectPrevOpacity: value })}
                                min={0}
                                max={1}
                                step={0.01}
                            />
                            <RangeControl
                                label={__('Scale', 'mello-block')}
                                value={creativeEffectPrevScale}
                                onChange={(value) => setAttributes({ creativeEffectPrevScale: value })}
                                min={0}
                                max={2}
                                step={0.01}
                            />
                            <RangeControl
                                label={__('Rotate Z (deg)', 'mello-block')}
                                value={creativeEffectPrevRotateZ}
                                onChange={(value) => setAttributes({ creativeEffectPrevRotateZ: value })}
                                min={-180}
                                max={180}
                                step={1}
                            />
                            <ToggleControl
                                label={__('Shadow', 'mello-block')}
                                checked={!!creativeEffectPrevShadow}
                                onChange={(value) => setAttributes({ creativeEffectPrevShadow: value || undefined })}
                            />
                            <SelectControl
                                __next40pxDefaultSize
                                label={__('Transform Origin', 'mello-block')}
                                value={creativeEffectPrevOrigin || ''}
                                options={[
                                    { label: __('Default', 'mello-block'), value: '' },
                                    { label: __('Center Center', 'mello-block'), value: 'center center' },
                                    { label: __('Left Center', 'mello-block'), value: 'left center' },
                                    { label: __('Right Center', 'mello-block'), value: 'right center' },
                                    { label: __('Center Top', 'mello-block'), value: 'center top' },
                                    { label: __('Center Bottom', 'mello-block'), value: 'center bottom' },
                                    { label: __('Left Top', 'mello-block'), value: 'left top' },
                                    { label: __('Left Bottom', 'mello-block'), value: 'left bottom' },
                                    { label: __('Right Top', 'mello-block'), value: 'right top' },
                                    { label: __('Right Bottom', 'mello-block'), value: 'right bottom' },
                                ]}
                                onChange={(value) => setAttributes({ creativeEffectPrevOrigin: value || undefined })}
                            />
                            <Divider />
                            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>{__('Next Slide', 'mello-block')}</p>
                            <TextControl
                                __next40pxDefaultSize
                                label={__('Translate X', 'mello-block')}
                                value={creativeEffectNextTranslateX ?? '100%'}
                                onChange={(value) => setAttributes({ creativeEffectNextTranslateX: value })}
                                help={__('Use % (e.g. 100%) or px (e.g. 400)', 'mello-block')}
                            />
                            <TextControl
                                __next40pxDefaultSize
                                label={__('Translate Y', 'mello-block')}
                                value={creativeEffectNextTranslateY ?? '0'}
                                onChange={(value) => setAttributes({ creativeEffectNextTranslateY: value })}
                                help={__('Use % (e.g. 100%) or px (e.g. 200)', 'mello-block')}
                            />
                            <RangeControl
                                label={__('Translate Z (px)', 'mello-block')}
                                value={creativeEffectNextTranslateZ ?? 0}
                                onChange={(value) => setAttributes({ creativeEffectNextTranslateZ: value ?? 0 })}
                                min={-1200}
                                max={0}
                                step={10}
                            />
                            <RangeControl
                                label={__('Opacity', 'mello-block')}
                                value={creativeEffectNextOpacity}
                                onChange={(value) => setAttributes({ creativeEffectNextOpacity: value })}
                                min={0}
                                max={1}
                                step={0.01}
                            />
                            <RangeControl
                                label={__('Scale', 'mello-block')}
                                value={creativeEffectNextScale}
                                onChange={(value) => setAttributes({ creativeEffectNextScale: value })}
                                min={0}
                                max={2}
                                step={0.01}
                            />
                            <RangeControl
                                label={__('Rotate Z (deg)', 'mello-block')}
                                value={creativeEffectNextRotateZ}
                                onChange={(value) => setAttributes({ creativeEffectNextRotateZ: value })}
                                min={-180}
                                max={180}
                                step={1}
                            />
                            <ToggleControl
                                label={__('Shadow', 'mello-block')}
                                checked={!!creativeEffectNextShadow}
                                onChange={(value) => setAttributes({ creativeEffectNextShadow: value || undefined })}
                            />
                            <SelectControl
                                __next40pxDefaultSize
                                label={__('Transform Origin', 'mello-block')}
                                value={creativeEffectNextOrigin || ''}
                                options={[
                                    { label: __('Default', 'mello-block'), value: '' },
                                    { label: __('Center Center', 'mello-block'), value: 'center center' },
                                    { label: __('Left Center', 'mello-block'), value: 'left center' },
                                    { label: __('Right Center', 'mello-block'), value: 'right center' },
                                    { label: __('Center Top', 'mello-block'), value: 'center top' },
                                    { label: __('Center Bottom', 'mello-block'), value: 'center bottom' },
                                    { label: __('Left Top', 'mello-block'), value: 'left top' },
                                    { label: __('Left Bottom', 'mello-block'), value: 'left bottom' },
                                    { label: __('Right Top', 'mello-block'), value: 'right top' },
                                    { label: __('Right Bottom', 'mello-block'), value: 'right bottom' },
                                ]}
                                onChange={(value) => setAttributes({ creativeEffectNextOrigin: value || undefined })}
                            />
                            <Divider />
                            <RangeControl
                                label={__('Limit Progress', 'mello-block')}
                                value={creativeEffectLimitProgress ?? 1}
                                onChange={(value) => setAttributes({ creativeEffectLimitProgress: value ?? 1 })}
                                min={1}
                                max={20}
                                step={0.5}
                                help={__('How many slides beyond the adjacent slide are transformed', 'mello-block')}
                            />
                            <Divider />
                            <TextControl
                                __next40pxDefaultSize
                                label={__('Prev Slide Filter', 'mello-block')}
                                value={creativeEffectPrevFilter || ''}
                                onChange={(value) => setAttributes({ creativeEffectPrevFilter: value || undefined })}
                                placeholder="blur(10px) brightness(0.8)"
                                help={__('CSS filter applied to the previous slide, e.g. blur(8px) brightness(0.9)', 'mello-block')}
                            />
                            <TextControl
                                __next40pxDefaultSize
                                label={__('Next Slide Filter', 'mello-block')}
                                value={creativeEffectNextFilter || ''}
                                onChange={(value) => setAttributes({ creativeEffectNextFilter: value || undefined })}
                                placeholder="blur(10px) brightness(0.8)"
                                help={__('CSS filter applied to the next slide, e.g. blur(8px) brightness(0.9)', 'mello-block')}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>
            <InnerBlocks template={TEMPLATE} templateLock={false} />
        </div>
    );
}