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
    const { animate, easeOut, inView, stagger } = window.MelloMotion;
    const animatedElements = document.querySelectorAll('[data-animation="true"]');

    animatedElements.forEach((element) => {
        const animationType = element.getAttribute("data-animation-type") || "fade-in";
        const duration = element.getAttribute("data-animation-duration") || 0.5;
        const delay = element.getAttribute("data-animation-delay") || 0;
        const trigger = element.getAttribute("data-animation-trigger") || "section";
        const customSelector = element.getAttribute("data-animation-trigger-custom-selector");
        const triggerPointValue = element.getAttribute("data-animation-trigger-point") || "-25";
        const triggerPoint = triggerPointValue.includes("%") ? triggerPointValue : `${triggerPointValue}%`;
        let triggerElement = element;

        // Determine trigger element
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

        let animationTimeline;
        let animationProps = animationDefaults[animationType];

        // Set initial styles for non-custom animations
        if (animationType !== "custom") {
            element.style.opacity = animationProps.opacity ? animationProps.opacity[0] : 0;
            if (animationProps.x) element.style.transform = `translateX(${animationProps.x[0]})`;
            if (animationProps.y) element.style.transform = `translateY(${animationProps.y[0]})`;
            if (animationProps.clipPath) element.style.clipPath = animationProps.clipPath[0];
        }

        if (animationType === "custom") {
            const configRaw = element.getAttribute("data-animation-config");

            if (!configRaw) {
                console.warn("No data-animation-config attribute found on element:", element);
                return;
            }

            try {
                const config = JSON.parse(configRaw);
                animationProps = config;

                // Set initial styles for custom animation
                if (config.opacity) element.style.opacity = config.opacity[0];
                if (config.x) element.style.transform = `translateX(${config.x[0]})`;
                if (config.y) element.style.transform = `translateY(${config.y[0]})`;
                if (config.scale) element.style.transform = `scale(${config.scale[0]})`;
                if (config.clipPath) element.style.clipPath = config.clipPath[0];

                animationTimeline = animate(
                    element,
                    config,
                    {
                        duration: parseFloat(duration) / 1000,
                        delay: parseFloat(delay) / 1000,
                        ease: easeOut,
                    }
                );
            } catch (err) {
                console.error("Failed to parse data-animation-config:", configRaw, err);
                return;
            }
        } else {
            animationTimeline = animate(
                element,
                animationProps,
                {
                    duration: parseFloat(duration) / 1000,
                    delay: parseFloat(delay) / 1000,
                    ease: easeOut,
                }
            );
        }

        animationTimeline.pause();
        animationTimeline.time = 0;

        inView(
            triggerElement,
            () => {
                animationTimeline.play();
            },
            {
                margin: `0% 0% ${triggerPoint} 0%`,
            }
        );
    });

    // Child animations (unchanged for brevity)
    const animatedChildren = document.querySelectorAll('[data-child-animation="true"]');
    animatedChildren.forEach((parent) => {
        const children = parent.querySelectorAll(":scope > *");
        const childAnimationType = parent.getAttribute("data-child-animation-type") || "fade-in";
        const childDuration = parseFloat(parent.getAttribute("data-child-animation-duration") || 0.5) / 1000;
        const childStagger = parseFloat(parent.getAttribute("data-child-animation-stagger-delay") || 0) / 1000;
        const childTrigger = parent.getAttribute("data-child-animation-trigger") || "section";
        const childTriggerPointValue = parent.getAttribute("data-child-animation-trigger-point") || "-25";
        const childTriggerPoint = childTriggerPointValue.includes("%") ? childTriggerPointValue : `${childTriggerPointValue}%`;
        const childCustomSelector = parent.getAttribute("data-child-animation-custom-selector");

        let childAnimationProps = animationDefaults[childAnimationType];

        if (childAnimationType === 'custom') {
            const rawChildConfig = parent.getAttribute("data-child-animation-config");
            try {
                const parsedChildConfig = JSON.parse(rawChildConfig);
                childAnimationProps = parsedChildConfig;
            } catch (err) {
                console.error("Invalid data-child-animation-config:", rawChildConfig, err);
                return;
            }
        }

        const childAnimationTimeline = animate(
            children,
            childAnimationProps,
            {
                duration: childDuration,
                delay: stagger(childStagger),
                ease: easeOut,
            }
        );
        childAnimationTimeline.pause();
        childAnimationTimeline.time = 0;

        let triggerElement = parent;
        if (childTrigger === "section") {
            triggerElement = findClosestByTag(parent, "section");
        } else if (childTrigger === "self") {
            triggerElement = parent;
        } else if (childTrigger === "custom" && childCustomSelector) {
            const foundChild = parent.closest(childCustomSelector) || document.querySelector(childCustomSelector);
            if (foundChild) {
                triggerElement = foundChild;
            }
        }

        inView(
            triggerElement,
            () => {
                childAnimationTimeline.play();
            },
            {
                margin: `0% 0% ${childTriggerPoint} 0%`,
            }
        );
    });
});