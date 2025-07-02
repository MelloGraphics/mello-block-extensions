import Lenis from 'lenis';

// Store references
let lenis = null;
let isInitialized = false;

/**
 * Initialize the smooth scrolling functionality
 * @param {Function} scrollFunction - The scroll function from the motion library
 */
function initSmoothScroll(scrollFunction) {
    // Prevent double initialization
    if (isInitialized) return;
    isInitialized = true;

    // Initialize Lenis with the same settings as your theme version
    lenis = new Lenis({
        duration: 0.75,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        autoResize: true,
        prevent: (node) => node.closest('.mello-modal') !== null,
    });

    // Make lenis available globally
    window.lenis = lenis;

    // Set up the animation frame loop - CRITICAL for smooth performance
    function raf(time) {
        // Only update if modal is NOT open
        if (!document.documentElement.classList.contains('has-modal-open')) {
            lenis.raf(time);
        }
        requestAnimationFrame(raf);
    }

    // Start the animation loop immediately
    requestAnimationFrame(raf);

    // Initialize scroll speed elements
    initScrollSpeedElements(scrollFunction);

    // Set up event listeners and observers
    setupEventListeners(scrollFunction);
    setupObservers(scrollFunction);
}

/**
 * Initialize elements with scroll speed data attributes
 * @param {Function} scrollFunction - The scroll function from the motion library
 */
function initScrollSpeedElements(scrollFunction) {
    // Handle standard [data-scroll-speed] elements
    document.querySelectorAll('[data-scroll-speed]').forEach((el) => {
        if (el.classList.contains('has-inner-scroll-speed')) return;
        const speed = parseFloat(el.dataset.scrollSpeed) || 0;

        scrollFunction(
            (progress) => {
                const offset = speed * 4;
                const translateY = offset * (1 - 2 * progress);
                el.style.transform = `translateY(${translateY}vmin)`;
            },
            {
                target: el,
                offset: ['start end', 'end start'],
            }
        );
    });

    // Handle blocks with `.has-inner-scroll-speed` class
    document.querySelectorAll('.has-inner-scroll-speed').forEach((wrapper) => {
        let target = null;
        let speed = parseFloat(wrapper.dataset.scrollSpeed) || 0;

        // Detect inner element based on block type or structure
        if (wrapper.classList.contains('wp-block-image')) {
            target = wrapper.querySelector('img');
        } else if (wrapper.classList.contains('wp-block-cover')) {
            target = wrapper.querySelector('img, video');
        } else if (wrapper.classList.contains('wp-block-post-featured-image')) {
            target = wrapper.querySelector('img');
        }

        if (!speed) {
            const innerWithSpeed = wrapper.querySelector('[data-scroll-speed]');
            if (innerWithSpeed) {
                speed = parseFloat(innerWithSpeed.dataset.scrollSpeed) || 0;
                target = innerWithSpeed;
            }
        }

        if (target) {
            scrollFunction(
                (progress) => {
                    const offset = speed * 4;
                    const translateY = offset * (1 - 2 * progress);
                    target.style.transform = `translateY(${translateY}vmin)`;
                },
                {
                    target: wrapper,
                    offset: ['start end', 'end start'],
                }
            );
        }
    });
}

/**
 * Set up all event listeners
 * @param {Function} scrollFunction - The scroll function from the motion library
 */
function setupEventListeners(scrollFunction) {
    // Handle details elements toggling
    document.querySelectorAll('details').forEach((el) => {
        el.addEventListener('toggle', () => {
            setTimeout(() => lenis.resize(), 300);
        });
    });

    // Handle window resizing
    window.addEventListener('resize', () => {
        lenis.resize();
    });

    // jQuery AJAX complete handler
    if (window.jQuery) {
        jQuery(document).ajaxComplete(() => {
            lenis?.resize();
            initScrollSpeedElements(scrollFunction);
        });
    }
}

/**
 * Set up observers for dynamic content
 * @param {Function} scrollFunction - The scroll function from the motion library
 */
function setupObservers(scrollFunction) {
    // Override fetch to detect AJAX content loading
    const origFetch = window.fetch;
    window.fetch = function (...args) {
        return origFetch.apply(this, args).then((res) => {
            res.clone().text().then(() => {
                lenis?.resize();
                initScrollSpeedElements(scrollFunction);
            });
            return res;
        });
    };

    // Debounce helper to limit invocation frequency
    function debounce(fn, delay = 1000) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    // Observe additions of elements with [data-scroll-speed] and debounce reactions
    const debouncedInit = debounce(() => {
        lenis?.resize();
        initScrollSpeedElements(scrollFunction);
    }, 1000);

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(node => {
                if (
                    node.nodeType === 1 &&
                    (node.matches('[data-scroll-speed]') || node.querySelector('[data-scroll-speed]'))
                ) {
                    debouncedInit();
                }
            });
        }
    });

    // Scope observation to body (or a specific container if known)
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

// Wait for both DOM and MelloMotion library to be ready
let domReady = document.readyState !== 'loading';

// Function to check if MelloMotion is available and initialize if it is
function checkMelloMotion() {
    if (window.MelloMotion && window.MelloMotion.scroll) {
        const { scroll } = window.MelloMotion;
        // Now we have the shared scroll function, we can initialize
        initSmoothScroll(scroll);
        return true;
    }
    return false;
}

// If DOM is already ready, check for MelloMotion
if (domReady) {
    // Try to initialize immediately if MelloMotion is already available
    if (!checkMelloMotion()) {
        // If MelloMotion isn't available yet, wait for the event
        document.addEventListener('mello-motion-ready', () => {
            checkMelloMotion();
        });
    }
} else {
    // Wait for DOM content to be loaded first
    document.addEventListener('DOMContentLoaded', () => {
        domReady = true;
        if (!checkMelloMotion()) {
            // If MelloMotion isn't available yet, wait for the event
            document.addEventListener('mello-motion-ready', () => {
                checkMelloMotion();
            });
        }
    });
}

// Fallback in case the event never fires (5 second timeout)
setTimeout(() => {
    if (!isInitialized) {
        console.warn('Trying to initialize Lenis as fallback');
        checkMelloMotion();
    }
}, 5000);