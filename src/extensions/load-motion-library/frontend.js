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