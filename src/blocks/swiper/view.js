// Import Swiper core
import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', async () => {
    // Collect all swiper elements first
    const swiperElements = document.querySelectorAll('.wp-block-mello-block-swiper[data-swiper]');

    // Early exit if no swiper elements found
    if (swiperElements.length === 0) return;

    // Determine which modules to load across all swipers
    const needsNavigation = Array.from(swiperElements).some(el =>
        el.hasAttribute('data-swiper-navigation') && el.getAttribute('data-swiper-navigation') === 'true');
    const needsPagination = Array.from(swiperElements).some(el =>
        el.hasAttribute('data-swiper-pagination') && el.getAttribute('data-swiper-pagination') === 'true');
    const needsScrollbar = Array.from(swiperElements).some(el =>
        el.hasAttribute('data-swiper-scrollbar') && el.getAttribute('data-swiper-scrollbar') === 'true');
    const needsMousewheel = Array.from(swiperElements).some(el =>
        el.hasAttribute('data-swiper-mousewheel') && el.getAttribute('data-swiper-mousewheel') === 'true');
    const needsAutoplay = Array.from(swiperElements).some(el =>
        el.hasAttribute('data-swiper-autoplay') &&
        (el.getAttribute('data-swiper-autoplay') === 'true' || !isNaN(el.getAttribute('data-swiper-autoplay'))));
    const needsEffectFade = Array.from(swiperElements).some(el =>
        el.hasAttribute('data-swiper-effect') && el.getAttribute('data-swiper-effect') === 'fade');
    const needsFreeMode = Array.from(swiperElements).some(el =>
        el.hasAttribute('data-swiper-free-mode') && el.getAttribute('data-swiper-free-mode') === 'true');
    const needsThumbs = Array.from(swiperElements).some(el =>
        el.hasAttribute('data-swiper-enable-thumbs') && el.getAttribute('data-swiper-enable-thumbs') === 'true'
    );

    // Import required modules and CSS dynamically
    const modulesToLoad = [];

    if (needsNavigation) {
        const { Navigation } = await import('swiper/modules');
        modulesToLoad.push({ module: Navigation, name: 'Navigation' });
    }

    if (needsPagination) {
        const { Pagination } = await import('swiper/modules');
        modulesToLoad.push({ module: Pagination, name: 'Pagination' });
    }

    if (needsScrollbar) {
        const { Scrollbar } = await import('swiper/modules');
        modulesToLoad.push({ module: Scrollbar, name: 'Scrollbar' });
    }

    if (needsMousewheel) {
        const { Mousewheel } = await import('swiper/modules');
        modulesToLoad.push({ module: Mousewheel, name: 'Mousewheel' });
    }

    if (needsAutoplay) {
        const { Autoplay } = await import('swiper/modules');
        modulesToLoad.push({ module: Autoplay, name: 'Autoplay' });
    }

    if (needsEffectFade) {
        const { EffectFade } = await import('swiper/modules');
        modulesToLoad.push({ module: EffectFade, name: 'EffectFade' });
    }

    if (needsFreeMode) {
        const { FreeMode } = await import('swiper/modules');
        modulesToLoad.push({ module: FreeMode, name: 'FreeMode' });
    }

    if (needsThumbs) {
        const { Thumbs } = await import('swiper/modules');
        modulesToLoad.push({ module: Thumbs, name: 'Thumbs' });
    }

    // Now initialize each swiper with its specific configuration
    swiperElements.forEach((swiperElement) => {
        // Add `swiper-slide` class to each child
        const wrapper = swiperElement.querySelector('.swiper-wrapper');
        if (wrapper) {
            wrapper.querySelectorAll(':scope > *').forEach((child) => {
                if (!child.classList.contains('swiper-slide')) {
                    child.classList.add('swiper-slide');
                }
            });
        }

        // Initialize base options and active modules array
        const options = {};
        const activeModules = [];

        // Enable observer to watch for container size changes
        options.observer = true;
        options.observeParents = true;

        // Read all data attributes and build configuration
        const dataAttributes = Array.from(swiperElement.attributes)
            .filter(attr => attr.name.startsWith('data-swiper-'));

        // First check which modules need to be activated for this specific swiper
        const hasNavigation = dataAttributes.some(attr => attr.name === 'data-swiper-navigation' && attr.value === 'true');
        const hasPagination = dataAttributes.some(attr => attr.name === 'data-swiper-pagination' && attr.value === 'true');
        const hasScrollbar = dataAttributes.some(attr => attr.name === 'data-swiper-scrollbar' && attr.value === 'true');
        const hasMousewheel = dataAttributes.some(attr => attr.name === 'data-swiper-mousewheel' && attr.value === 'true');
        const hasAutoplay = dataAttributes.some(attr =>
            attr.name === 'data-swiper-autoplay' && (attr.value === 'true' || !isNaN(attr.value))
        );
        const hasEffectFade = dataAttributes.some(attr => attr.name === 'data-swiper-effect' && attr.value === 'fade');
        const hasFreeMode = dataAttributes.some(attr => attr.name === 'data-swiper-free-mode' && attr.value === 'true');
        const hasThumbs = dataAttributes.some(attr => attr.name === 'data-swiper-enable-thumbs' && attr.value === 'true');
        const thumbsTargetSelector = swiperElement.getAttribute('data-swiper-thumbs-target');
        const hasThumbsTarget = typeof thumbsTargetSelector === 'string' && thumbsTargetSelector.trim() !== '';

        // Check for slidesPerViewAuto mode
        const hasSlidesPerViewAuto = dataAttributes.some(attr =>
            attr.name === 'data-swiper-slides-per-view-auto' && attr.value === 'true');

        // Add only the modules that this specific swiper needs
        modulesToLoad.forEach(moduleInfo => {
            if (
                (moduleInfo.name === 'Navigation' && hasNavigation) ||
                (moduleInfo.name === 'Pagination' && hasPagination) ||
                (moduleInfo.name === 'Scrollbar' && hasScrollbar) ||
                (moduleInfo.name === 'Mousewheel' && hasMousewheel) ||
                (moduleInfo.name === 'Autoplay' && hasAutoplay) ||
                (moduleInfo.name === 'EffectFade' && hasEffectFade) ||
                (moduleInfo.name === 'FreeMode' && hasFreeMode) ||
                (moduleInfo.name === 'Thumbs' && hasThumbs)
            ) {
                activeModules.push(moduleInfo.module);
            }
        });

        // Configure the options based on active modules
        if (hasNavigation) {
            options.navigation = {
                enabled: true,
                nextEl: swiperElement.querySelector('.swiper-button-next'),
                prevEl: swiperElement.querySelector('.swiper-button-prev')
            };
        }

        if (hasPagination) {
            options.pagination = {
                enabled: true,
                el: swiperElement.querySelector('.swiper-pagination')
            };
        }

        if (hasScrollbar) {
            options.scrollbar = {
                enabled: true,
                el: swiperElement.querySelector('.swiper-scrollbar')
            };
        }

        if (hasMousewheel) {
            options.mousewheel = { enabled: true };
        }

        if (hasAutoplay) {
            options.autoplay = { delay: 3000, disableOnInteraction: false };

            // Check for autoplay reverse direction
            if (swiperElement.hasAttribute('data-swiper-autoplay-reverse-direction') &&
                swiperElement.getAttribute('data-swiper-autoplay-reverse-direction') === 'true') {
                options.autoplay.reverseDirection = true;
            }
        }

        if (hasEffectFade) {
            options.effect = 'fade';
        }

        // Initialize Free Mode configuration
        if (hasFreeMode) {
            options.freeMode = {
                enabled: true
            };
        }

        // Set modules to options
        options.modules = activeModules;

        // Now process all other attributes
        dataAttributes.forEach((attr) => {
            const key = attr.name.replace('data-swiper-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            let value = attr.value;

            if (value === 'true') value = true;
            else if (value === 'false') value = false;
            else if (!isNaN(value)) value = Number(value);

            switch (key) {
                case 'paginationClickable':
                    if (options.pagination) options.pagination.clickable = value;
                    break;
                case 'paginationType':
                    if (options.pagination) options.pagination.type = value;
                    break;
                case 'scrollbarHide':
                    if (options.scrollbar) options.scrollbar.hide = value;
                    break;
                case 'scrollbarDraggable':
                    if (options.scrollbar) options.scrollbar.draggable = value;
                    break;
                case 'autoplayDelay':
                    if (options.autoplay) options.autoplay.delay = value;
                    break;
                case 'autoplayDisableOnInteraction':
                    if (options.autoplay) options.autoplay.disableOnInteraction = value;
                    break;
                case 'autoHeight':
                    options.autoHeight = value;
                    break;
                case 'mousewheelForceToAxis':
                    if (options.mousewheel) options.mousewheel.forceToAxis = value;
                    break;
                case 'mousewheelInvert':
                    if (options.mousewheel) options.mousewheel.invert = value;
                    break;
                case 'mousewheelReleaseOnEdges':
                    if (options.mousewheel) options.mousewheel.releaseOnEdges = value;
                    break;
                case 'mousewheelSensitivity':
                    if (options.mousewheel) options.mousewheel.sensitivity = value;
                    break;
                case 'mousewheelEventsTarget':
                    if (options.mousewheel) options.mousewheel.eventsTarget = value;
                    break;
                case 'autoplayReverseDirection':
                    if (options.autoplay) options.autoplay.reverseDirection = value;
                    break;
                // Free Mode specific options
                case 'freeModeMomentum':
                    if (options.freeMode) options.freeMode.momentum = value;
                    break;
                case 'freeModeMomentumRatio':
                    if (options.freeMode) options.freeMode.momentumRatio = value;
                    break;
                case 'freeModeMomentumVelocityRatio':
                    if (options.freeMode) options.freeMode.momentumVelocityRatio = value;
                    break;
                case 'freeModeSticky':
                    if (options.freeMode) options.freeMode.sticky = value;
                    break;
                case 'allowTouchMove':
                    options.allowTouchMove = value;
                    break;
                // Skip the main module flags we already processed
                case 'navigation':
                case 'pagination':
                case 'scrollbar':
                case 'mousewheel':
                case 'autoplay':
                case 'slidesPerViewAuto':
                case 'freeMode':
                    // Already handled above or will be handled separately
                    break;
                default:
                    options[key] = value;
                    break;
            }
        });

        // Handle slidesPerViewAuto if enabled
        if (hasSlidesPerViewAuto) {
            options.slidesPerView = 'auto';

            const spaceBetween = options.spaceBetween || 0;
            const spaceBetweenMobile = swiperElement.hasAttribute('data-swiper-space-between-mobile')
                ? Number(swiperElement.getAttribute('data-swiper-space-between-mobile'))
                : spaceBetween;
            const spaceBetweenTablet = swiperElement.hasAttribute('data-swiper-space-between-tablet')
                ? Number(swiperElement.getAttribute('data-swiper-space-between-tablet'))
                : spaceBetweenMobile;
            const spaceBetweenXLarge = swiperElement.hasAttribute('data-swiper-space-between-xlarge')
                ? Number(swiperElement.getAttribute('data-swiper-space-between-xlarge'))
                : spaceBetween;

            options.breakpoints = {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: spaceBetweenMobile
                },
                782: {
                    slidesPerView: 'auto',
                    spaceBetween: spaceBetweenTablet
                },
                1200: {
                    slidesPerView: 'auto',
                    spaceBetween: spaceBetween
                },
                1700: {
                    slidesPerView: 'auto',
                    spaceBetween: spaceBetweenXLarge
                }
            };
        } else {
            const slidesPerView = options.slidesPerView || 1;
            const spaceBetween = options.spaceBetween || 0;
            
            // Get XLarge values - if not set, fall back to desktop values
            const slidesPerViewXLarge = swiperElement.hasAttribute('data-swiper-slides-per-view-xlarge')
                ? Number(swiperElement.getAttribute('data-swiper-slides-per-view-xlarge'))
                : slidesPerView;
            
            const spaceBetweenXLarge = swiperElement.hasAttribute('data-swiper-space-between-xlarge')
                ? Number(swiperElement.getAttribute('data-swiper-space-between-xlarge'))
                : spaceBetween;
            
            const slidesPerViewMobile = swiperElement.hasAttribute('data-swiper-slides-per-view-mobile')
                ? Number(swiperElement.getAttribute('data-swiper-slides-per-view-mobile'))
                : slidesPerView;
            const spaceBetweenMobile = swiperElement.hasAttribute('data-swiper-space-between-mobile')
                ? Number(swiperElement.getAttribute('data-swiper-space-between-mobile'))
                : spaceBetween;
            const slidesPerViewTablet = swiperElement.hasAttribute('data-swiper-slides-per-view-tablet')
                ? Number(swiperElement.getAttribute('data-swiper-slides-per-view-tablet'))
                : slidesPerViewMobile;
            const spaceBetweenTablet = swiperElement.hasAttribute('data-swiper-space-between-tablet')
                ? Number(swiperElement.getAttribute('data-swiper-space-between-tablet'))
                : spaceBetweenMobile;

            // Set base options that will be used below the first breakpoint
            options.slidesPerView = slidesPerViewMobile;
            options.spaceBetween = spaceBetweenMobile;
            
            options.breakpoints = {
                782: {
                    slidesPerView: slidesPerViewTablet,
                    spaceBetween: spaceBetweenTablet
                },
                1200: {
                    slidesPerView: slidesPerView,
                    spaceBetween: spaceBetween
                },
                1700: {
                    slidesPerView: slidesPerViewXLarge,
                    spaceBetween: spaceBetweenXLarge
                }
            };
        }

        // Handle thumbs integration if enabled
        if (hasThumbs && hasThumbsTarget) {
            const thumbsEl = document.querySelector(thumbsTargetSelector);
            if (thumbsEl) {
                const thumbModuleInfo = modulesToLoad.find(m => m.name === 'Thumbs');
                if (thumbModuleInfo) {
                    const thumbsOptions = {
                        modules: [thumbModuleInfo.module],
                        watchSlidesProgress: true,
                        slideToClickedSlide: true,
                    };

                    const thumbsWrapper = thumbsEl.querySelector('.swiper-wrapper');
                    if (thumbsWrapper) {
                        thumbsWrapper.querySelectorAll(':scope > *').forEach((child) => {
                            if (!child.classList.contains('swiper-slide')) {
                                child.classList.add('swiper-slide');
                            }
                        });
                    }

                    const thumbsDataAttributes = Array.from(thumbsEl.attributes)
                        .filter(attr => attr.name.startsWith('data-swiper-'));

                    const thumbsHasSlidesPerViewAuto = thumbsDataAttributes.some(attr =>
                        attr.name === 'data-swiper-slides-per-view-auto' && attr.value === 'true');

                    thumbsDataAttributes.forEach((attr) => {
                        const key = attr.name.replace('data-swiper-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                        let value = attr.value;

                        if (value === 'true') value = true;
                        else if (value === 'false') value = false;
                        else if (!isNaN(value)) value = Number(value);

                        if (['navigation', 'pagination', 'scrollbar', 'mousewheel', 'autoplay', 'slidesPerViewAuto', 'freeMode'].includes(key)) {
                            return;
                        }

                        thumbsOptions[key] = value;
                    });

                    if (thumbsHasSlidesPerViewAuto) {
                        thumbsOptions.slidesPerView = 'auto';

                        const spaceBetween = thumbsOptions.spaceBetween || 0;
                        const spaceBetweenMobile = thumbsEl.hasAttribute('data-swiper-space-between-mobile')
                            ? Number(thumbsEl.getAttribute('data-swiper-space-between-mobile'))
                            : spaceBetween;
                        const spaceBetweenTablet = thumbsEl.hasAttribute('data-swiper-space-between-tablet')
                            ? Number(thumbsEl.getAttribute('data-swiper-space-between-tablet'))
                            : spaceBetweenMobile;
                        const spaceBetweenXLarge = thumbsEl.hasAttribute('data-swiper-space-between-xlarge')
                            ? Number(thumbsEl.getAttribute('data-swiper-space-between-xlarge'))
                            : spaceBetween;

                        thumbsOptions.breakpoints = {
                            0: {
                                slidesPerView: 'auto',
                                spaceBetween: spaceBetweenMobile
                            },
                            782: {
                                slidesPerView: 'auto',
                                spaceBetween: spaceBetweenTablet
                            },
                            1200: {
                                slidesPerView: 'auto',
                                spaceBetween: spaceBetween
                            },
                            1700: {
                                slidesPerView: 'auto',
                                spaceBetween: spaceBetweenXLarge
                            }
                        };
                    } else {
                        const slidesPerView = thumbsOptions.slidesPerView || 1;
                        const spaceBetween = thumbsOptions.spaceBetween || 0;
                        
                        // Get XLarge values - if not set, fall back to desktop values
                        const slidesPerViewXLarge = thumbsEl.hasAttribute('data-swiper-slides-per-view-xlarge')
                            ? Number(thumbsEl.getAttribute('data-swiper-slides-per-view-xlarge'))
                            : slidesPerView;
                        
                        const spaceBetweenXLarge = thumbsEl.hasAttribute('data-swiper-space-between-xlarge')
                            ? Number(thumbsEl.getAttribute('data-swiper-space-between-xlarge'))
                            : spaceBetween;
                        
                        const slidesPerViewMobile = thumbsEl.hasAttribute('data-swiper-slides-per-view-mobile')
                            ? Number(thumbsEl.getAttribute('data-swiper-slides-per-view-mobile'))
                            : slidesPerView;
                        const spaceBetweenMobile = thumbsEl.hasAttribute('data-swiper-space-between-mobile')
                            ? Number(thumbsEl.getAttribute('data-swiper-space-between-mobile'))
                            : spaceBetween;
                        const slidesPerViewTablet = thumbsEl.hasAttribute('data-swiper-slides-per-view-tablet')
                            ? Number(thumbsEl.getAttribute('data-swiper-slides-per-view-tablet'))
                            : slidesPerViewMobile;
                        const spaceBetweenTablet = thumbsEl.hasAttribute('data-swiper-space-between-tablet')
                            ? Number(thumbsEl.getAttribute('data-swiper-space-between-tablet'))
                            : spaceBetweenMobile;

                        // Set base options that will be used below the first breakpoint
                        thumbsOptions.slidesPerView = slidesPerViewMobile;
                        thumbsOptions.spaceBetween = spaceBetweenMobile;
                        
                        thumbsOptions.breakpoints = {
                            782: {
                                slidesPerView: slidesPerViewTablet,
                                spaceBetween: spaceBetweenTablet
                            },
                            1200: {
                                slidesPerView: slidesPerView,
                                spaceBetween: spaceBetween
                            },
                            1700: {
                                slidesPerView: slidesPerViewXLarge,
                                spaceBetween: spaceBetweenXLarge
                            }
                        };
                    }

                    if (thumbsEl.hasAttribute('data-swiper-direction')) {
                        thumbsOptions.direction = thumbsEl.getAttribute('data-swiper-direction');
                    }

                    const thumbsSwiper = new Swiper(thumbsEl, thumbsOptions);
                    options.thumbs = { swiper: thumbsSwiper };
                }
            } else {
                console.warn(`Thumbs target "${thumbsTargetSelector}" not found for swiper`, swiperElement);
            }
        }

        if (swiperElement.hasAttribute('data-swiper-direction')) {
            options.direction = swiperElement.getAttribute('data-swiper-direction');
        }

        // Initialize Swiper with configured options
        new Swiper(swiperElement, options);
    });
});