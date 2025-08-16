/****
 * frontend.js
 *
 * Simple Motion.js loader - import the library, expose it globally,
 * and fire an event when ready.
 */

// Import the Motion.js library bundle
import * as motion from "motion";

// Expose the global Motion API under a plugin namespace
window.MelloMotion = motion;

// Notify subscribers that Motion is ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.MelloMotion) {
        console.log('MelloMotion is ready');
        document.dispatchEvent(new CustomEvent('mello-motion-ready'));
    } else {
        console.warn('MelloMotion failed to load');
    }
});


/****
 *
 * Testing what motion.js animation features are loaded
 */

// document.addEventListener('mello-motion-ready', () => {
//     console.log('=== MelloMotion Debug Info ===');
//     console.log('Full MelloMotion object:', window.MelloMotion);

//     // Test for core animation functions
//     const coreFeatures = [
//         'animate',
//         'stagger'
//     ];

//     // Test for observers and utilities
//     const observerFeatures = [
//         'inView',
//         'scroll',
//         'resize'
//     ];

//     // Test for easing functions
//     const easingFeatures = [
//         'easeIn',
//         'easeOut',
//         'easeInOut',
//         'spring',
//         'anticipate',
//         'backIn',
//         'backOut',
//         'backInOut',
//         'circIn',
//         'circOut',
//         'circInOut',
//         'linear',
//         'steps',
//         'cubicBezier',
//         'reverseEasing',
//         'mirrorEasing'
//     ];

//     // Test for utility functions
//     const utilityFeatures = [
//         'transform',
//         'interpolate',
//         'mix',
//         'progress',
//         'distance',
//         'wrap',
//         'clamp',
//         'pipe'
//     ];

//     // Test for frame control
//     const frameFeatures = [
//         'frame',
//         'cancelFrame'
//     ];

//     function checkFeatures(features, category) {
//         console.log(`\n--- ${category} Features ---`);
//         const available = [];
//         const missing = [];

//         features.forEach(feature => {
//             if (typeof window.MelloMotion[feature] === 'function') {
//                 available.push(feature);
//                 console.log(`✅ ${feature}:`, typeof window.MelloMotion[feature]);
//             } else if (window.MelloMotion[feature] !== undefined) {
//                 available.push(feature);
//                 console.log(`ℹ️  ${feature}:`, typeof window.MelloMotion[feature], window.MelloMotion[feature]);
//             } else {
//                 missing.push(feature);
//                 console.log(`❌ ${feature}: not available`);
//             }
//         });

//         return { available, missing };
//     }

//     // Check all feature categories
//     const coreResults = checkFeatures(coreFeatures, 'Core Animation');
//     const observerResults = checkFeatures(observerFeatures, 'Observers & Events');
//     const easingResults = checkFeatures(easingFeatures, 'Easing Functions');
//     const utilityResults = checkFeatures(utilityFeatures, 'Utility Functions');
//     const frameResults = checkFeatures(frameFeatures, 'Frame Control');

//     // Summary
//     console.log('\n=== SUMMARY ===');
//     console.log('Core Features Available:', coreResults.available.length, '/', coreFeatures.length);
//     console.log('Observer Features Available:', observerResults.available.length, '/', observerFeatures.length);
//     console.log('Easing Functions Available:', easingResults.available.length, '/', easingFeatures.length);
//     console.log('Utility Functions Available:', utilityResults.available.length, '/', utilityFeatures.length);
//     console.log('Frame Control Available:', frameResults.available.length, '/', frameFeatures.length);

//     // Show all available properties
//     console.log('\n--- All Available Properties/Methods ---');
//     Object.keys(window.MelloMotion).forEach(key => {
//         console.log(`${key}: ${typeof window.MelloMotion[key]}`);
//     });

//     // Version info if available
//     if (window.MelloMotion.version) {
//         console.log('\nMotion.js Version:', window.MelloMotion.version);
//     }

//     console.log('=== End MelloMotion Debug ===\n');
// });