// Helper to find the closest ancestor of a given tag
function findClosestByTag(element, tagName) {
    let current = element;
    while (current.parentElement) {
        if (current.parentElement.tagName.toLowerCase() === tagName) {
            return current.parentElement;
        }
        current = current.parentElement;
    }
    return element;
}

// Resolve a selector relative to a base element. "&" means the base element itself.
function resolveSelector(base, selector) {
    if (!selector || typeof selector !== 'string') return [];
    if (selector.trim() === '&') return [base];
    try {
        // Prefer scoping within the base element first
        const scoped = base.querySelectorAll(selector);
        if (scoped && scoped.length) return Array.from(scoped);
        // Fallback: global lookup (useful if selector targets outside like body/header)
        const global = document.querySelectorAll(selector);
        return Array.from(global);
    } catch (e) {
        console.warn('Invalid selector in animation config:', selector, e);
        return [];
    }
}

// Helper to get easing function from Motion.js
function getEasingFunction(easingName) {
    const {
        linear, ease, easeIn, easeOut, easeInOut,
        circIn, circOut, circInOut,
        backIn, backOut, backInOut,
        anticipate,
        bounceIn, bounceOut, bounceInOut
    } = window.MelloMotion;

    const easingMap = {
        linear,
        ease,
        easeIn,
        easeOut,
        easeInOut,
        circIn,
        circOut,
        circInOut,
        backIn,
        backOut,
        backInOut,
        anticipate,
        bounceIn,
        bounceOut,
        bounceInOut
    };

    return easingMap[easingName] || circOut;
}

function lerp(a, b, t) { return a + (b - a) * t; }

// Helper to create animation options with method, easing, and repeat
function createAnimationOptions(element, prefix = '') {
    const dataPrefix = prefix ? `data-${prefix}-` : 'data-animation-';

    const durationRaw = element.getAttribute(`${dataPrefix}duration`) || '500';
    const delayRaw = element.getAttribute(`${dataPrefix}delay`) || '0';

    const duration = parseFloat(durationRaw);
    const delay = parseFloat(delayRaw);

    // Validate duration and delay are finite numbers
    const validDuration = Number.isFinite(duration) ? Math.max(0, duration) / 1000 : 0.5;
    const validDelay = Number.isFinite(delay) ? Math.max(0, delay) / 1000 : 0;

    const method = element.getAttribute(`${dataPrefix}method`) || 'tween';
    const easing = element.getAttribute(`${dataPrefix}easing`) || 'circOut';
    const repeat = element.getAttribute(`${dataPrefix}repeat`) || '0';
    const repeatType = element.getAttribute(`${dataPrefix}repeat-type`) || 'loop';
    const repeatDelayRaw = element.getAttribute(`${dataPrefix}repeat-delay`) || '0';
    const repeatDelay = parseFloat(repeatDelayRaw);
    const validRepeatDelay = Number.isFinite(repeatDelay) ? Math.max(0, repeatDelay) / 1000 : 0;

    const springAmountAttr = element.getAttribute(`${dataPrefix}spring-amount`);
    const springAmount = springAmountAttr !== null ? parseFloat(springAmountAttr) : undefined;

    const options = {
        duration: validDuration,
        delay: validDelay
    };

    // Handle animation method
    if (method === 'tween') {
        options.ease = getEasingFunction(easing);
    } else if (method === 'spring') {
        const amt = Number.isFinite(springAmount) ? Math.max(0, Math.min(1, springAmount)) : 0.5;
        if (!Number.isFinite(springAmount)) {
            console.warn("No spring amount set on", element, "defaulting to 0.5");
        }
        // Map amount -> stiffness/damping (higher amount = stronger spring, less damping)
        const stiffness = Math.round(lerp(100, 800, amt));
        const damping = Math.round(lerp(30, 8, amt));
        options.type = 'spring';
        options.stiffness = stiffness;
        options.damping = damping;
    } else if (method === 'inertia') {
        options.type = 'inertia';
        options.power = 0.8;
        options.timeConstant = 750;
    }

    // Handle repeat
    if (repeat !== '0') {
        const repeatCount = repeat === 'Infinity' ? Infinity : parseInt(repeat);
        if (Number.isFinite(repeatCount) || repeatCount === Infinity) {
            options.repeat = repeatCount;
            options.repeatType = repeatType;
            if (validRepeatDelay > 0) {
                options.repeatDelay = validRepeatDelay;
            }
        }
    }

    return options;
}

const animationDefaults = {
    "fade-in": { opacity: [0, 1] },
    "slide-up": { opacity: [0, 1], y: [20, 0] },
    "slide-down": { opacity: [0, 1], y: [-20, 0] },
    "slide-left": { opacity: [0, 1], x: [20, 0] },
    "slide-right": { opacity: [0, 1], x: [-20, 0] },
    "clip-from-top": {
        opacity: [0, 1],
        clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
    },
    "clip-from-bottom": {
        opacity: [0, 1],
        clipPath: ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
    },
    "clip-from-left": {
        opacity: [0, 1],
        clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
    },
    "clip-from-right": {
        opacity: [0, 1],
        clipPath: ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
    },
};

// Track initialized elements to prevent double-initialization
const initializedElements = new WeakSet();

// Initialize individual element animation
function initializeElementAnimation(element) {
    const MM = window.MelloMotion || {};
    const { animate, inView } = MM;

    // Skip if already initialized
    if (initializedElements.has(element)) {
        return;
    }

    const animationType = element.getAttribute("data-animation-type") || "fade-in";
    const trigger = element.getAttribute("data-animation-trigger") || "section";
    const customSelector = element.getAttribute("data-animation-trigger-custom-selector");
    const triggerPointValue = element.getAttribute("data-animation-trigger-point") || "-25";
    const triggerPoint = triggerPointValue.includes("%") ? triggerPointValue : `${triggerPointValue}%`;

    // Determine trigger element
    let triggerElement = element;
    if (trigger === "section") {
        triggerElement = findClosestByTag(element, "section");
    } else if (trigger === "self") {
        triggerElement = element;
    } else if (trigger === "custom" && customSelector) {
        const found = element.closest(customSelector) || document.querySelector(customSelector);
        if (found) {
            triggerElement = found;
        }
    }

    // Get animation properties
    let animationProps;
    let isTimeline = false;
    if (animationType === "custom") {
        const configRaw = element.getAttribute("data-animation-config");
        const timelineRaw = element.getAttribute("data-animation-timeline");
        const raw = configRaw ?? timelineRaw;
        if (!raw) {
            console.warn("No data-animation-config or data-animation-timeline attribute found on element:", element);
            return;
        }
        try {
            const parsed = JSON.parse(raw);
            animationProps = parsed;
            isTimeline = Array.isArray(parsed);
        } catch (err) {
            console.error("Failed to parse custom animation:", raw, err);
            return;
        }
    } else {
        animationProps = animationDefaults[animationType];
        if (!animationProps) {
            console.warn(`Unknown animation type: ${animationType}`, element);
            return;
        }
    }

    // Create animation options with advanced settings
    const animationOptions = createAnimationOptions(element);

    // Create and setup animation
    let animation;
    if (isTimeline) {
        // Expecting an array of steps: [ selector, keyframes, stepOptions? ]
        const sequence = [];
        animationProps.forEach((step, idx) => {
            if (!Array.isArray(step) || step.length < 2) {
                console.warn('Invalid timeline step at index', idx, step);
                return;
            }
            const [selector, keyframes, stepOptions] = step;
            const targets = typeof selector === 'string' ? resolveSelector(element, selector) : [];
            if (!targets.length) return; // skip empty steps silently
            const mergedOptions = stepOptions ? { ...animationOptions, ...stepOptions } : { ...animationOptions };
            targets.forEach((t) => {
                sequence.push([t, keyframes, mergedOptions]);
            });
        });
        if (!sequence.length) return;
        animation = animate(sequence);
    } else {
        animation = animate(element, animationProps, animationOptions);
    }

    // Start paused at beginning
    animation.pause();
    animation.time = 0;

    // Trigger on scroll
    inView(triggerElement, () => {
        animation.play();
    }, {
        margin: `0% 0% ${triggerPoint} 0%`,
    });

    // Mark as initialized
    initializedElements.add(element);
}

// Initialize child animation
function initializeChildAnimation(parent) {
    const MM = window.MelloMotion || {};
    const { animate, stagger, inView } = MM;

    // Skip if already initialized
    if (initializedElements.has(parent)) {
        return;
    }

    const children = parent.querySelectorAll(":scope > *");
    if (children.length === 0) return;

    const childAnimationType = parent.getAttribute("data-child-animation-type") || "fade-in";
    const childDelayRaw = parent.getAttribute("data-child-animation-delay") || "0";
    const childStaggerRaw = parent.getAttribute("data-child-animation-stagger-delay") || "0";
    const childStaggerFrom = parent.getAttribute("data-child-animation-stagger-from") || "first";
    const childStaggerEasingName = parent.getAttribute("data-child-animation-stagger-easing") || "easeOut";
    const childStaggerEasingFn = getEasingFunction(childStaggerEasingName);

    const childDelay = parseFloat(childDelayRaw);
    const childStagger = parseFloat(childStaggerRaw);

    // Validate delays are finite numbers
    const validChildDelay = Number.isFinite(childDelay) ? Math.max(0, childDelay) / 1000 : 0;
    const validChildStagger = Number.isFinite(childStagger) ? Math.max(0, childStagger) / 1000 : 0;
    const childTrigger = parent.getAttribute("data-child-animation-trigger") || "section";
    const childTriggerPointValue = parent.getAttribute("data-child-animation-trigger-point") || "-25";
    const childTriggerPoint = childTriggerPointValue.includes("%") ? childTriggerPointValue : `${childTriggerPointValue}%`;
    const childCustomSelector = parent.getAttribute("data-child-animation-custom-selector");

    // Get child animation properties
    let childAnimationProps;
    let childIsTimeline = false;
    if (childAnimationType === 'custom') {
        const rawChildConfig = parent.getAttribute("data-child-animation-config");
        const rawChildTimeline = parent.getAttribute("data-child-animation-timeline");
        const rawChild = rawChildConfig ?? rawChildTimeline;
        if (!rawChild) {
            console.warn("No data-child-animation-config or data-child-animation-timeline attribute found on parent:", parent);
            return;
        }
        try {
            const parsedChild = JSON.parse(rawChild);
            childAnimationProps = parsedChild;
            childIsTimeline = Array.isArray(parsedChild);
        } catch (err) {
            console.error("Invalid child custom animation:", rawChild, err);
            return;
        }
    } else {
        childAnimationProps = animationDefaults[childAnimationType];
        if (!childAnimationProps) {
            console.warn(`Unknown child animation type: ${childAnimationType}`, parent);
            return;
        }
    }

    // Determine trigger element
    let triggerElement = parent;
    if (childTrigger === "section") {
        triggerElement = findClosestByTag(parent, "section");
    } else if (childTrigger === "self") {
        triggerElement = parent;
    } else if (childTrigger === "custom" && childCustomSelector) {
        const found = parent.closest(childCustomSelector) || document.querySelector(childCustomSelector);
        if (found) {
            triggerElement = found;
        }
    }

    // Create child animation options with advanced settings
    const childAnimationOptions = createAnimationOptions(parent, 'child-animation');

    let childAnimation;
    if (childIsTimeline) {
        const sequence = [];
        childAnimationProps.forEach((step, idx) => {
            if (!Array.isArray(step) || step.length < 2) {
                console.warn('Invalid child timeline step at index', idx, step);
                return;
            }
            const [selector, keyframes, stepOptions] = step;
            const targets = typeof selector === 'string' ? resolveSelector(parent, selector) : [];
            if (!targets.length) return;
            const mergedOptions = stepOptions ? { ...childAnimationOptions, ...stepOptions } : { ...childAnimationOptions };
            targets.forEach((t) => {
                sequence.push([t, keyframes, mergedOptions]);
            });
        });
        if (!sequence.length) return;
        childAnimation = animate(sequence);
    } else {
        // Handle child animation delay and stagger separately
        // Child delay applies to all children, stagger applies between children
        if (validChildStagger > 0) {
            // Build stagger options
            const staggerOptions = { from: childStaggerFrom, easing: childStaggerEasingFn };

            // Add startDelay if we have a child delay
            if (validChildDelay > 0) {
                staggerOptions.startDelay = validChildDelay;
            }

            childAnimationOptions.delay = stagger(validChildStagger, staggerOptions);
        } else if (validChildDelay > 0) {
            // Only child delay, no stagger
            const baseDelay = childAnimationOptions.delay || 0;
            const combinedDelay = Number.isFinite(baseDelay) ? baseDelay + validChildDelay : validChildDelay;
            childAnimationOptions.delay = combinedDelay;
        }

        childAnimation = animate(children, childAnimationProps, childAnimationOptions);
    }

    // Start paused at beginning
    childAnimation.pause();
    childAnimation.time = 0;

    // Trigger on scroll
    inView(triggerElement, () => {
        childAnimation.play();
    }, {
        margin: `0% 0% ${childTriggerPoint} 0%`,
    });

    // Mark as initialized
    initializedElements.add(parent);
}

// Initialize all animations in a container
function initializeAnimations(container = document) {
    // Individual element animations
    const animatedElements = container.querySelectorAll('[data-animation="true"]');
    animatedElements.forEach((element) => {
        initializeElementAnimation(element);
    });

    // Child animations with stagger
    const animatedChildren = container.querySelectorAll('[data-child-animation="true"]');
    animatedChildren.forEach((parent) => {
        initializeChildAnimation(parent);
    });
}

document.addEventListener('mello-motion-ready', () => {
    // Initialize animations on page load
    initializeAnimations();

    // Set up mutation observer to watch for dynamically added content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                // Only process element nodes
                if (node.nodeType === 1) {
                    // Check if the node itself has animation attributes
                    if (node.hasAttribute('data-animation')) {
                        initializeElementAnimation(node);
                    }
                    if (node.hasAttribute('data-child-animation')) {
                        initializeChildAnimation(node);
                    }

                    // Check for animated elements within the added node
                    initializeAnimations(node);
                }
            });
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Also listen for Search & Filter Pro specific events if available
    document.addEventListener('sf:ajaxfinish', (e) => {
        // Small delay to ensure DOM is fully updated
        setTimeout(() => {
            const targetNode = e.detail?.targetSelector ?
                document.querySelector(e.detail.targetSelector) :
                document.body;
            if (targetNode) {
                initializeAnimations(targetNode);
            }
        }, 50);
    });
});