import { animate, inView, stagger } from 'motion';

const animationDefaults = {
    'fade-in': { opacity: [ 0 , 1 ] },
    'slide-up': { opacity: [ 0 , 1 ], y: [ 10 , 0 ] },
    'slide-down': { opacity: [ 0 , 1 ], y: [ -10 , 0 ] },
    'slide-left': { opacity: [ 0 , 1 ], x: [ 10 , 0 ] },
    'slide-right': { opacity: [ 0 , 1 ], x: [ -10 , 0 ] },
    'rotate': { opacity: [ 0 , 1 ], rotate: [ '360deg' , 0 ] }
};

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animation="true"]');
    
    animatedElements.forEach(element => {
        const animationType = element.getAttribute('data-animation-type') || 'fade-in';
        const duration = element.getAttribute('data-animation-duration') || 0.5;
        const delay = element.getAttribute('data-animation-delay') || 0;
        const trigger = element.getAttribute('data-animation-trigger') || 'enter';

        inView(element, () => {
            console.log(`In view: ${element}, applying animation: ${animationType}, duration: ${duration}, delay: ${delay}`);
            animate(element, animationDefaults[animationType], {
                duration: parseFloat(duration) / 1000,
                delay: parseFloat(delay) / 1000,
            });
        }, {
            once: trigger === 'enter'
        });
    });

    const animatedChildren = document.querySelectorAll('[data-child-animation="true"]');
    
    animatedChildren.forEach(parent => {
        console.log(`Parent found: ${parent}`);
        const children = parent.querySelectorAll(':scope > *');
        console.log(`Children targeted: ${children}`);
        const childAnimationType = parent.getAttribute('data-child-animation-type') || 'fade-in';
        const childDuration = parseFloat(parent.getAttribute('data-child-animation-duration') || 0.5) / 1000;
        const childStagger = parseFloat(parent.getAttribute('data-child-animation-stagger-delay') || 0) / 1000;

        inView(parent, () => {
            console.log(`In view: ${parent}, number of children: ${children.length}, child selector: ${Array.from(children)}, applying child animation: ${childAnimationType}, confirming timeline is playing.`);
            animate(children, animationDefaults[childAnimationType], {
                duration: childDuration,
                delay: stagger(childStagger),
            }).play();
        }, {
            once: true
        });
    });
});
