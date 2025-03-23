// import { animate, frame } from "motion";
// import Splitting from "splitting";
// // import "splitting/dist/splitting-cells.css";
// import "splitting/dist/splitting.css";

// document.addEventListener('DOMContentLoaded', () => {
//     const cursor = document.querySelector('.wp-block-block-theme-cursor .cursor-location');
//     const cursorDecoration = document.querySelector('.wp-block-block-theme-cursor .cursor-decoration');
//     const cursorText = document.querySelector('.wp-block-block-theme-cursor .cursor-text');

//     if (!cursor) {
//         console.warn('No cursor element found.');
//         return;
//     }

//     const splitCursor = Splitting({ target: cursor, by: 'chars', whitespace: true });

//     //
//     // Motion based cursor
//     //

//     function updateCursorPosition() {
//         initialX = window.innerWidth / 2;
//         initialY = window.innerHeight / 2;
//     }

//     let initialX, initialY;
//     updateCursorPosition(); // Initial calculation

//     let pointerX = 0
//     let pointerY = 0

//     function springToPointer() {
//         animate(
//             cursor,
//             {
//                 x: pointerX - initialX,
//                 y: pointerY - initialY,
//             },
//             { type: "spring", stiffness: 100, damping: 15 }
//         )
//     }

//     document.addEventListener("pointermove", (e) => {
//         pointerX = e.clientX
//         pointerY = e.clientY
//         /**
//          * By using `frame.postRender`, we achieve two things:
//          * 1. The animation will be triggered at the end of the animation loop, giving
//          *    any existing spring animations a chance to run for a frame and render.
//          * 2. Debounce the animation to prevent a new one being triggered every pointer
//          *    move, which could be more regular than the animation loop.
//          */
//         frame.postRender(springToPointer)
//     })

//     // Update cursor position when window resizes
//     window.addEventListener("resize", updateCursorPosition);

//     // Function to add the click class when clicking
//     document.addEventListener('mousedown', () => {
//         cursor.classList.add('cursor__click');
//     });
    
//     document.addEventListener('mouseup', () => {
//         cursor.classList.remove('cursor__click');
//     });

//     // Function to add the active class when hovering
//     const activeStyle = (element) => {
//         element.addEventListener('mouseover', () => {
//             cursor.classList.add('cursor__active');
//         });
//         element.addEventListener('mouseleave', () => {
//             cursor.classList.remove('cursor__active');
//         });
//     };

//     // Function to add the hover class when hovering
//     const hoverStyle = (element) => {
//         element.addEventListener('mouseover', () => {
//             cursor.classList.add('cursor__hover');
//         });
//         element.addEventListener('mouseleave', () => {
//             cursor.classList.remove('cursor__hover');
//         });
//     };

//     // Apply active style to targeted elements
//     const activeTargets = [
//         'is-pattern-clients .wp-block-cover'
//     ];

//     activeTargets.forEach(selector => {
//         const elements = document.querySelectorAll(`.${selector}`);
//         if (elements.length > 0) {
//             elements.forEach(element => activeStyle(element));
//         } else {
//             console.warn(`No elements found for selector: .${selector}`);
//         }
//     });

//     // Apply hover style to all links
//     const links = document.querySelectorAll('a');
//     if (links.length > 0) {
//         links.forEach(link => hoverStyle(link));
//     } else {
//         console.warn('No links found to apply hover style.');
//     }

//     // Apply hover style to additional targets
//     const hoverTargets = [
//         'wp-block-navigation__responsive-container-close',
//         'wp-block-navigation__responsive-container-open',
//         'wp-block-details summary',
//         'wp-block-navigation-item__label',
//         'button'
//     ];

//     hoverTargets.forEach(selector => {
//         const elements = document.querySelectorAll(`.${selector}`);
//         if (elements.length > 0) {
//             elements.forEach(element => hoverStyle(element));
//         } else {
//             console.warn(`No elements found for selector: .${selector}`);
//         }
//     });

// });
