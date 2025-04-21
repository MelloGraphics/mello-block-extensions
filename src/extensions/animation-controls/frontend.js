import { animate, easeOut, inView, stagger } from 'motion';

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
    'fade-in': { opacity: [ 0 , 1 ] },
    'slide-up': { opacity: [ 0 , 1 ], y: [ 10 , 0 ] },
    'slide-down': { opacity: [ 0 , 1 ], y: [ -10 , 0 ] },
    'slide-left': { opacity: [ 0 , 1 ], x: [ 10 , 0 ] },
    'slide-right': { opacity: [ 0 , 1 ], x: [ -10 , 0 ] },
    'clip-from-top': { opacity: [ 0 , 1 ], clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'] },
    'clip-from-bottom': { opacity: [ 0 , 1 ], clipPath: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'] },
    'clip-from-left': { opacity: [ 0 , 1 ], clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'] },
    'clip-from-right': { opacity: [ 0 , 1 ], clipPath: ['inset(0 0 0 100%)', 'inset(0 0 0 0)'] },
};

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animation="true"]');
    
    animatedElements.forEach(element => {
        const animationType = element.getAttribute('data-animation-type') || 'fade-in';
        const duration = element.getAttribute('data-animation-duration') || 0.5;
        const delay = element.getAttribute('data-animation-delay') || 0;
        const trigger = element.getAttribute('data-animation-trigger') || 'section';
        const customSelector = element.getAttribute('data-animation-trigger-custom-selector');
        const triggerPointValue = element.getAttribute('data-animation-trigger-point') || '-25';
        const triggerPoint = triggerPointValue.includes('%') ? triggerPointValue : `${triggerPointValue}%`;
        let triggerElement = element;
        if (trigger === 'section') {
            triggerElement = findClosestByTag(element, 'section');
        } else if (trigger === 'self') {
            triggerElement = element;
        } else if (trigger === 'custom' && customSelector) {
            const found = element.closest(customSelector) || document.querySelector(customSelector);
            if (found) {
                triggerElement = found;
            }
        }
        triggerElement.style.outline = '2px dashed lime';

        const animationTimeline = animate(element, animationDefaults[animationType], {
            duration: parseFloat(duration) / 1000,
            delay: parseFloat(delay) / 1000,
            ease: easeOut
        });
        animationTimeline.pause();
        animationTimeline.time = 0;

        inView(triggerElement, () => {
            animationTimeline.play();
        }, {
            margin: `0% 0% ${triggerPoint} 0%`,
        });
    });

    const animatedChildren = document.querySelectorAll('[data-child-animation="true"]');
    
    animatedChildren.forEach(parent => {
        const children = parent.querySelectorAll(':scope > *');
        const childAnimationType = parent.getAttribute('data-child-animation-type') || 'fade-in';
        const childDuration = parseFloat(parent.getAttribute('data-child-animation-duration') || 0.5) / 1000;
        const childStagger = parseFloat(parent.getAttribute('data-child-animation-stagger-delay') || 0) / 1000;
        const childTrigger = parent.getAttribute('data-child-animation-trigger') || 'section';
        const childTriggerPointValue = parent.getAttribute('data-child-animation-trigger-point') || '-25';
        const childTriggerPoint = childTriggerPointValue.includes('%') ? childTriggerPointValue : `${childTriggerPointValue}%`;
        const childCustomSelector = parent.getAttribute('data-child-animation-custom-selector');

        const childAnimationTimeline = animate(children, animationDefaults[childAnimationType], {
            duration: childDuration,
            delay: stagger(childStagger),
            ease: easeOut
        });
        childAnimationTimeline.pause();
        childAnimationTimeline.time = 0;

        let triggerElement = parent;
        if (childTrigger === 'section') {
            triggerElement = findClosestByTag(parent, 'section');
        } else if (childTrigger === 'self') {
            triggerElement = parent;
        } else if (childTrigger === 'custom' && childCustomSelector) {
            const foundChild = parent.closest(childCustomSelector) || document.querySelector(childCustomSelector);
            if (foundChild) {
                triggerElement = foundChild;
            }
        }

        inView(triggerElement, () => {
            childAnimationTimeline.play();
        }, {
            margin: `0% 0% ${childTriggerPoint} 0%`,
        });
    });
});
