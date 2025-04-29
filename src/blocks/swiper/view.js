// Import Swiper core
import Swiper from 'swiper';

// Import Swiper core CSS
import 'swiper/css';

// We'll import module CSS and the modules themselves dynamically based on attributes

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
    
    // Import required modules and CSS dynamically
    const modulesToLoad = [];
    
    if (needsNavigation) {
        await import('swiper/css/navigation');
        const { Navigation } = await import('swiper/modules');
        modulesToLoad.push({ module: Navigation, name: 'Navigation' });
    }
    
    if (needsPagination) {
        await import('swiper/css/pagination');
        const { Pagination } = await import('swiper/modules');
        modulesToLoad.push({ module: Pagination, name: 'Pagination' });
    }
    
    if (needsScrollbar) {
        await import('swiper/css/scrollbar');
        const { Scrollbar } = await import('swiper/modules');
        modulesToLoad.push({ module: Scrollbar, name: 'Scrollbar' });
    }
    
    if (needsMousewheel) {
        await import('swiper/css/mousewheel');
        const { Mousewheel } = await import('swiper/modules');
        modulesToLoad.push({ module: Mousewheel, name: 'Mousewheel' });
    }
    
    if (needsAutoplay) {
        await import('swiper/css/autoplay');
        const { Autoplay } = await import('swiper/modules');
        modulesToLoad.push({ module: Autoplay, name: 'Autoplay' });
    }
    
    if (needsEffectFade) {
        await import('swiper/css/effect-fade');
        const { EffectFade } = await import('swiper/modules');
        modulesToLoad.push({ module: EffectFade, name: 'EffectFade' });
    }
    
    if (needsFreeMode) {
        await import('swiper/css/free-mode');
        // Free Mode is a parameter, not a module
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

        // Add only the modules that this specific swiper needs
        // Using the pre-loaded modules from our dynamic imports
        modulesToLoad.forEach(moduleInfo => {
            if (
                (moduleInfo.name === 'Navigation' && hasNavigation) ||
                (moduleInfo.name === 'Pagination' && hasPagination) ||
                (moduleInfo.name === 'Scrollbar' && hasScrollbar) ||
                (moduleInfo.name === 'Mousewheel' && hasMousewheel) ||
                (moduleInfo.name === 'Autoplay' && hasAutoplay) ||
                (moduleInfo.name === 'EffectFade' && hasEffectFade)
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
        }
        
        if (hasEffectFade) {
            options.effect = 'fade';
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
                case 'autoplayDelay':
                    if (options.autoplay) options.autoplay.delay = value;
                    break;
                case 'autoplayDisableOnInteraction':
                    if (options.autoplay) options.autoplay.disableOnInteraction = value;
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
                // Skip the main module flags we already processed
                case 'navigation':
                case 'pagination':
                case 'scrollbar':
                case 'mousewheel':
                case 'autoplay':
                    // Already handled above
                    break;
                default:
                    options[key] = value;
                    break;
            }
        });

        // Initialize Swiper with configured options
        new Swiper(swiperElement, options);
    });
    // End of forEach loop
});