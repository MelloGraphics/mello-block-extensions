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

    const duration = parseFloat(element.getAttribute(`${dataPrefix}duration`) || 0.5) / 1000;
    const delay = parseFloat(element.getAttribute(`${dataPrefix}delay`) || 0) / 1000;
    const method = element.getAttribute(`${dataPrefix}method`) || 'tween';
    const easing = element.getAttribute(`${dataPrefix}easing`) || 'circOut';
    const repeat = element.getAttribute(`${dataPrefix}repeat`) || '0';
    const repeatType = element.getAttribute(`${dataPrefix}repeat-type`) || 'loop';
    const repeatDelay = parseFloat(element.getAttribute(`${dataPrefix}repeat-delay`) || 0) / 1000;
    const springAmountAttr = element.getAttribute(`${dataPrefix}spring-amount`);
    const springAmount = springAmountAttr !== null ? parseFloat(springAmountAttr) : undefined;

    const options = {
        duration,
        delay
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
        options.repeat = repeatCount;
        options.repeatType = repeatType;
        if (repeatDelay > 0) {
            options.repeatDelay = repeatDelay;
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

document.addEventListener('mello-motion-ready', () => {
    const { animate, stagger, inView } = window.MelloMotion;

    // Individual element animations
    const animatedElements = document.querySelectorAll('[data-animation="true"]');
    animatedElements.forEach((element) => {
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
        if (animationType === "custom") {
            const configRaw = element.getAttribute("data-animation-config");
            if (!configRaw) {
                console.warn("No data-animation-config attribute found on element:", element);
                return;
            }

            try {
                animationProps = JSON.parse(configRaw);
            } catch (err) {
                console.error("Failed to parse data-animation-config:", configRaw, err);
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
        const animation = animate(element, animationProps, animationOptions);

        // Start paused at beginning
        animation.pause();
        animation.time = 0;

        // Trigger on scroll
        inView(triggerElement, () => {
            animation.play();
        }, {
            margin: `0% 0% ${triggerPoint} 0%`,
        });
    });

    // Child animations with stagger
    const animatedChildren = document.querySelectorAll('[data-child-animation="true"]');
    animatedChildren.forEach((parent) => {
        const children = parent.querySelectorAll(":scope > *");
        if (children.length === 0) return;

        const childAnimationType = parent.getAttribute("data-child-animation-type") || "fade-in";
        const childStagger = parseFloat(parent.getAttribute("data-child-animation-stagger-delay") || 0) / 1000;
        const childTrigger = parent.getAttribute("data-child-animation-trigger") || "section";
        const childTriggerPointValue = parent.getAttribute("data-child-animation-trigger-point") || "-25";
        const childTriggerPoint = childTriggerPointValue.includes("%") ? childTriggerPointValue : `${childTriggerPointValue}%`;
        const childCustomSelector = parent.getAttribute("data-child-animation-custom-selector");

        // Get child animation properties
        let childAnimationProps;
        if (childAnimationType === 'custom') {
            const rawChildConfig = parent.getAttribute("data-child-animation-config");
            if (!rawChildConfig) {
                console.warn("No data-child-animation-config attribute found on parent:", parent);
                return;
            }

            try {
                childAnimationProps = JSON.parse(rawChildConfig);
            } catch (err) {
                console.error("Invalid data-child-animation-config:", rawChildConfig, err);
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

        // Add stagger to delay
        if (childAnimationOptions.delay) {
            childAnimationOptions.delay = [childAnimationOptions.delay, stagger(childStagger)];
        } else {
            childAnimationOptions.delay = stagger(childStagger);
        }

        // Create staggered child animation
        const childAnimation = animate(children, childAnimationProps, childAnimationOptions);

        // Start paused at beginning
        childAnimation.pause();
        childAnimation.time = 0;

        // Trigger on scroll
        inView(triggerElement, () => {
            childAnimation.play();
        }, {
            margin: `0% 0% ${childTriggerPoint} 0%`,
        });
    });
});