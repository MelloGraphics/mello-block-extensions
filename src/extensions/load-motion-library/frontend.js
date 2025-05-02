/**
 * Motion.js Library Manager
 * 
 * Initializes and manages the Motion.js library for use across the plugin.
 * This script helps make sure the Motion library is properly initialized
 * and provides a consistent API for other blocks to access it.
 */

(function () {
	// Initialize Motion handling
	function initMotion() {
		// Check if Motion library exists in global scope
		if (typeof window.Motion !== 'undefined') {
			// Store reference in our namespace
			window.MelloMotion = window.MelloMotion || {};
			window.MelloMotion.isLoaded = true;
			window.MelloMotion.library = window.Motion;

			// Log successful initialization
			console.log('Motion.js library initialized successfully');

			// Dispatch custom event to notify other scripts
			document.dispatchEvent(new CustomEvent('mello-motion-ready'));

			return true;
		}

		// Motion not available
		console.warn('Motion.js library not loaded or not found. Some animations may not work.');
		return false;
	}

	// Create API methods for other blocks to use
	function setupMotionAPI() {
		window.MelloMotion = window.MelloMotion || {};

		// Helper to safely access Motion features
		window.MelloMotion.getMotion = function () {
			return window.MelloMotion.library || null;
		};

		// Check if Motion is available
		window.MelloMotion.isAvailable = function () {
			return window.MelloMotion.isLoaded === true &&
				window.MelloMotion.library !== undefined;
		};

		// Safe animation function with fallback
		window.MelloMotion.animate = function (element, keyframes, options) {
			if (window.MelloMotion.isAvailable()) {
				return window.MelloMotion.library.animate(element, keyframes, options);
			}

			// Simple CSS fallback
			const target = typeof element === 'string' ?
				document.querySelector(element) : element;

			if (!target) return null;

			// Apply simple CSS transition as fallback
			if (keyframes && keyframes.opacity !== undefined) {
				target.style.transition = `opacity ${(options?.duration || 0.3)}s ease`;
				target.style.opacity = Array.isArray(keyframes.opacity) ?
					keyframes.opacity[keyframes.opacity.length - 1] : keyframes.opacity;
			}

			if (keyframes && keyframes.transform !== undefined) {
				target.style.transition = `${target.style.transition}, transform ${(options?.duration || 0.3)}s ease`;
				target.style.transform = Array.isArray(keyframes.transform) ?
					keyframes.transform[keyframes.transform.length - 1] : keyframes.transform;
			}

			return null; // No Animation instance to return
		};
	}

	// Initialize on DOMContentLoaded or immediately if already loaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () {
			setupMotionAPI();
			initMotion();
		});
	} else {
		setupMotionAPI();
		initMotion();
	}

	// Listen for future motion library loads (in case it loads after this script)
	if (!initMotion()) {
		document.addEventListener('mello-motion-ready', function () {
			console.log('Motion.js library became available');
		}, { once: true });
	}
})();