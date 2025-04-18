import { animate, inView } from 'motion';

const animationDefaults = {
    'fade-in': { opacity: [ 0 , 1 ] },
    'slide-up': { opacity: [ 0 , 1 ], y: [ 10 , 0 ] }
};

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animate="true"]');
    
    animatedElements.forEach(element => {
        const animationType = element.getAttribute('data-animation-type') || 'fade-in';
        const duration = element.getAttribute('data-animate-duration') || 0.5;
        const delay = element.getAttribute('data-animate-delay') || 0;
        const trigger = element.getAttribute('data-animate-trigger') || 'enter';

        inView(element, () => {
            animate(element, animationDefaults[animationType], {
                duration: parseFloat(duration) / 1000,
                delay: parseFloat(delay) / 1000,
            });
        }, {
            once: trigger === 'enter'
        });
    });
});
