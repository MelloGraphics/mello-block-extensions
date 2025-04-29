import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';
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
            ['core/group', { metadata: { name: 'Swiper Slide' }, layout: { type: 'constrained' } }, [['core/paragraph', { placeholder: __('Add content to your slide.', 'mellobase') }]]],
            ['core/group', { metadata: { name: 'Swiper Slide' }, layout: { type: 'constrained' } }, [['core/paragraph', { placeholder: __('Add content to your slide.', 'mellobase') }]]],
            ['core/group', { metadata: { name: 'Swiper Slide' }, layout: { type: 'constrained' } }, [['core/paragraph', { placeholder: __('Add content to your slide.', 'mellobase') }]]],
        ],
    ],
    ['core/group', { lock: { remove: true }, metadata: { name: 'Pagination Wrapper' }, className: 'swiper-pagination', layout: { type: 'constrained' } }],
    ['core/group', { lock: { remove: true }, metadata: { name: 'Scrollbar Wrapper' }, className: 'swiper-scrollbar', layout: { type: 'constrained' } }],
    [
        'core/buttons',
        { lock: { remove: true }, metadata: { name: 'Prev / Next Buttons' }, style: { spacing: { blockGap: { left: 'var:preset|spacing|small' } } } },
        [
            ['core/button', { className: 'swiper-button-prev', text: __('prev', 'mellobase') }],
            ['core/button', { className: 'swiper-button-next', text: __('next', 'mellobase') }],
        ],
    ],
];

export default function Edit({ attributes, setAttributes }) {
    const {
        slidesPerView,
        loop,
        centeredSlides,
        autoplay,
        autoplayDelay,
        autoplayDisableOnInteraction,
        spaceBetween,
        speed,
        navigation,
        pagination,
        paginationType,
        paginationClickable,
        scrollbar,
        scrollbarHide,
        effect,
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
    } = attributes;

    const blockProps = useBlockProps({
        style: {
            ...(spaceBetween !== undefined
                ? { '--swiper-space-between': `${spaceBetween}px` }
                : {}),
            ...(slidesPerView !== undefined
                ? { '--swiper-spv': slidesPerView }
                : {}),
        },
        'data-swiper': true,
        'data-swiper-slides-per-view': slidesPerView,
        'data-swiper-loop': loop,
        'data-swiper-centered-slides': centeredSlides,
        'data-swiper-autoplay': autoplay,
        ...(autoplayDelay !== undefined && { 'data-swiper-autoplay-delay': autoplayDelay }),
        ...(autoplayDisableOnInteraction !== undefined && { 'data-swiper-autoplay-disable-on-interaction': autoplayDisableOnInteraction }),
        ...(spaceBetween !== undefined && { 'data-swiper-space-between': spaceBetween }),
        ...(speed !== undefined && { 'data-swiper-speed': speed }),
        ...(navigation !== undefined && { 'data-swiper-navigation': navigation }),
        ...(pagination !== undefined && { 'data-swiper-pagination': pagination }),
        ...(paginationType !== undefined && { 'data-swiper-pagination-type': paginationType }),
        ...(paginationClickable !== undefined && { 'data-swiper-pagination-clickable': paginationClickable }),
        ...(scrollbar !== undefined && { 'data-swiper-scrollbar': scrollbar }),
        ...(scrollbarHide !== undefined && { 'data-swiper-scrollbar-hide': scrollbarHide }),
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
    });

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Slide Settings', 'mellobase')} initialOpen={false}>
                    <RangeControl
                        label={__('Slides Per View', 'mellobase')}
                        value={slidesPerView !== undefined ? slidesPerView : 3}
                        onChange={(value) => setAttributes({ slidesPerView: value !== undefined ? value : undefined })}
                        min={1}
                        max={6}
                        step={0.25}
                    />
                    <ToggleControl
                        label={__('Loop Slides', 'mellobase')}
                        checked={loop}
                        onChange={(value) => setAttributes({ loop: value !== undefined ? value : undefined })}
                    />
                    <ToggleControl
                        label={__('Center Slides', 'mellobase')}
                        checked={centeredSlides}
                        onChange={(value) => setAttributes({ centeredSlides	: value !== undefined ? value : undefined })}
                    />
                    <RangeControl
                        label={__('Space Between Slides (px)', 'mellobase')}
                        value={spaceBetween}
                        onChange={(value) => setAttributes({ spaceBetween: value !== undefined ? value : undefined })}
                        min={0}
                        max={200}
                        step={1}
                    />
                    <RangeControl
                        label={__('Speed (ms)', 'mellobase')}
                        value={speed}
                        onChange={(value) => setAttributes({ speed: value !== undefined ? value : undefined })}
                        min={100}
                        max={5000}
                        step={100}
                    />
                </PanelBody>

                <PanelBody title={__('Behaviour', 'mellobase')} initialOpen={false}>
                    <ToggleControl
                        label={__('Grab Cursor', 'mellobase')}
                        checked={grabCursor}
                        onChange={(value) => setAttributes({ grabCursor: value !== undefined ? value : undefined })}
                    />
                    <ToggleControl
                        label={__('Slide to Clicked Slide', 'mellobase')}
                        checked={slideToClickedSlide}
                        onChange={(value) => setAttributes({ slideToClickedSlide: value !== undefined ? value : undefined })}
                    />
                    <ToggleControl
                        label={__('Autoplay', 'mellobase')}
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
                                label={__('Autoplay Delay (ms)', 'mellobase')}
                                value={autoplayDelay}
                                onChange={(value) => setAttributes({ autoplayDelay: value !== undefined ? value : undefined })}
                                min={100}
                                max={10000}
                                step={100}
                                defaultValue={3000}
                            />
                            <ToggleControl
                                label={__('Disable on Interaction', 'mellobase')}
                                checked={autoplayDisableOnInteraction}
                                onChange={(value) => setAttributes({ autoplayDisableOnInteraction: value !== undefined ? value : undefined })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Navigation', 'mellobase')} initialOpen={false}>
                    {/* Navigation Toggle */}
                    <ToggleControl
                        label={__('Enable Navigation', 'mellobase')}
                        checked={navigation}
                        onChange={(value) => setAttributes({ navigation: value !== undefined ? value : undefined })}
                    />
                    {/* Pagination Toggle and controls */}
                    <ToggleControl
                        label={__('Enable Pagination', 'mellobase')}
                        checked={pagination}
                        onChange={(value) => setAttributes({ pagination: value !== undefined ? value : undefined })}
                    />
                    {pagination && (
                        <>
                            <SelectControl
                                label={__('Pagination Type', 'mellobase')}
                                value={paginationType || 'bullets'}
                                options={[
                                    { label: __('Bullets', 'mellobase'), value: 'bullets' },
                                    { label: __('Fraction', 'mellobase'), value: 'fraction' },
                                    { label: __('Progressbar', 'mellobase'), value: 'progressbar' },
                                ]}
                                onChange={(value) => setAttributes({ paginationType: value !== undefined ? value : undefined })}
                            />
                            {paginationType === 'bullets' && (
                                <ToggleControl
                                    label={__('Clickable', 'mellobase')}
                                    checked={paginationClickable}
                                    onChange={(value) => setAttributes({ paginationClickable: value !== undefined ? value : undefined })}
                                />
                            )}
                        </>
                    )}
                    {/* Scrollbar Toggle and controls */}
                    <ToggleControl
                        label={__('Enable Scrollbar', 'mellobase')}
                        checked={scrollbar}
                        onChange={(value) => setAttributes({ scrollbar: value !== undefined ? value : undefined })}
                    />
                    {scrollbar && (
                        <ToggleControl
                            label={__('Hide Scrollbar', 'mellobase')}
                            checked={scrollbarHide}
                            onChange={(value) => setAttributes({ scrollbarHide: value !== undefined ? value : undefined })}
                        />
                    )}
                </PanelBody>

                <PanelBody title={__('Effects', 'mellobase')} initialOpen={false}>
                    <SelectControl
                        label={__('Effect', 'mellobase')}
                        value={effect || 'slide'}
                        options={[
                            { label: __('Slide', 'mellobase'), value: 'slide' },
                            { label: __('Fade', 'mellobase'), value: 'fade' },
                        ]}
                        onChange={(value) => setAttributes({ effect: value !== undefined ? value : undefined })}
                    />
                </PanelBody>

                <PanelBody title={__('Mousewheel', 'mellobase')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable Mousewheel', 'mellobase')}
                        checked={mousewheel}
                        onChange={(value) => setAttributes({ mousewheel: value !== undefined ? value : undefined })}
                    />
                    {mousewheel && (
                        <>
                            <ToggleControl
                                label={__('Force To Axis', 'mellobase')}
                                checked={mousewheelForceToAxis}
                                onChange={(value) => setAttributes({ mousewheelForceToAxis: value !== undefined ? value : undefined })}
                            />
                            <ToggleControl
                                label={__('Invert', 'mellobase')}
                                checked={mousewheelInvert}
                                onChange={(value) => setAttributes({ mousewheelInvert: value !== undefined ? value : undefined })}
                            />
                            <ToggleControl
                                label={__('Release On Edges', 'mellobase')}
                                checked={mousewheelReleaseOnEdges}
                                onChange={(value) => setAttributes({ mousewheelReleaseOnEdges: value !== undefined ? value : undefined })}
                            />
                            <RangeControl
                                label={__('Sensitivity', 'mellobase')}
                                value={mousewheelSensitivity}
                                onChange={(value) => setAttributes({ mousewheelSensitivity: value !== undefined ? value : undefined })}
                                min={0.1}
                                max={10}
                                step={0.1}
                            />
                            <SelectControl
                                label={__('Events Target', 'mellobase')}
                                value={mousewheelEventsTarget || 'container'}
                                options={[
                                    { label: __('Container', 'mellobase'), value: 'container' },
                                    { label: __('Wrapper', 'mellobase'), value: 'wrapper' },
                                ]}
                                onChange={(value) => setAttributes({ mousewheelEventsTarget: value !== undefined ? value : undefined })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Advanced', 'mellobase')} initialOpen={false}>
                    <ToggleControl
                        label={__('Free Mode', 'mellobase')}
                        checked={freeMode}
                        onChange={(value) => setAttributes({ freeMode: value !== undefined ? value : undefined })}
                    />
                    {freeMode && (
                        <>
                            <ToggleControl
                                label={__('Momentum', 'mellobase')}
                                checked={freeModeMomentum}
                                onChange={(value) => setAttributes({ freeModeMomentum: value !== undefined ? value : undefined })}
                            />
                            <RangeControl
                                label={__('Momentum Ratio', 'mellobase')}
                                value={freeModeMomentumRatio}
                                onChange={(value) => setAttributes({ freeModeMomentumRatio: value !== undefined ? value : undefined })}
                                min={0}
                                max={10}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Momentum Velocity Ratio', 'mellobase')}
                                value={freeModeMomentumVelocityRatio}
                                onChange={(value) => setAttributes({ freeModeMomentumVelocityRatio: value !== undefined ? value : undefined })}
                                min={0}
                                max={10}
                                step={0.1}
                            />
                            <ToggleControl
                                label={__('Sticky', 'mellobase')}
                                checked={freeModeSticky}
                                onChange={(value) => setAttributes({ freeModeSticky: value !== undefined ? value : undefined })}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>
            <InnerBlocks template={TEMPLATE} templateLock={false} />
        </div>
    );
}