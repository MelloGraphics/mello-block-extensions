// Import Swiper and modules
import Swiper from 'swiper';
import { Autoplay, EffectFade, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.wp-block-mello-block-swiper[data-swiper]').forEach((swiperElement) => {
        // Add `swiper-slide` class to each child
        const wrapper = swiperElement.querySelector('.swiper-wrapper');
        if (wrapper) {
            wrapper.querySelectorAll(':scope > *').forEach((child) => {
                if (!child.classList.contains('swiper-slide')) {
                    child.classList.add('swiper-slide');
                }
            });
        }

        const options = {
            modules: [Navigation, Mousewheel, Autoplay, Pagination, Scrollbar, EffectFade],
            navigation: {},
            pagination: {},
            scrollbar: {},
            mousewheel: {},
        };

        Array.from(swiperElement.attributes).forEach((attr) => {
            if (attr.name.startsWith('data-swiper-')) {
                const key = attr.name.replace('data-swiper-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                let value = attr.value;

                if (value === 'true') value = true;
                else if (value === 'false') value = false;
                else if (!isNaN(value)) value = Number(value);

                switch (key) {
                    case 'navigation':
                        options.navigation.enabled = value;
                        options.navigation.nextEl = swiperElement.querySelector('.swiper-button-next');
                        options.navigation.prevEl = swiperElement.querySelector('.swiper-button-prev');
                        break;
                    case 'pagination':
                        options.pagination.enabled = value;
                        options.pagination.el = swiperElement.querySelector('.swiper-pagination');
                        break;
                    case 'paginationClickable':
                        options.pagination.clickable = value;
                        break;
                    case 'paginationType':
                        options.pagination.type = value;
                        break;
                    case 'scrollbar':
                        options.scrollbar.enabled = value;
                        options.scrollbar.el = swiperElement.querySelector('.swiper-scrollbar');
                        break;
                    case 'scrollbarHide':
                        options.scrollbar.hide = value;
                        break;
                    case 'grabCursor':
                        options.grabCursor = value;
                        break;
                    case 'slideToClickedSlide':
                        options.slideToClickedSlide = value;
                        break;
                    case 'freeModeMomentum':
                        options.freeModeMomentum = value;
                        break;
                    case 'freeModeMomentumRatio':
                        options.freeModeMomentumRatio = value;
                        break;
                    case 'freeModeMomentumVelocityRatio':
                        options.freeModeMomentumVelocityRatio = value;
                        break;
                    case 'freeModeSticky':
                        options.freeModeSticky = value;
                        break;
                    case 'autoplay':
                        if (value === true) {
                            options.autoplay = { delay: 3000, disableOnInteraction: false };
                        } else {
                            options.autoplay = false;
                        }
                        break;
                    case 'autoplayDelay':
                        if (!options.autoplay || typeof options.autoplay !== 'object') {
                            options.autoplay = { delay: value };
                        } else {
                            options.autoplay.delay = value;
                        }
                        break;
                    case 'autoplayDisableOnInteraction':
                        if (!options.autoplay || typeof options.autoplay !== 'object') {
                            options.autoplay = { disableOnInteraction: value };
                        } else {
                            options.autoplay.disableOnInteraction = value;
                        }
                        break;
                    case 'mousewheel':
                        options.mousewheel.enabled = value;
                        break;
                    case 'mousewheelForceToAxis':
                        options.mousewheel.forceToAxis = value;
                        break;
                    case 'mousewheelInvert':
                        options.mousewheel.invert = value;
                        break;
                    case 'mousewheelReleaseOnEdges':
                        options.mousewheel.releaseOnEdges = value;
                        break;
                    case 'mousewheelSensitivity':
                        options.mousewheel.sensitivity = value;
                        break;
                    case 'mousewheelEventsTarget':
                        options.mousewheel.eventsTarget = value;
                        break;
                    default:
                        options[key] = value;
                        break;
                }
            }
        });

        new Swiper(swiperElement, options);
    });
});