import Lenis from 'lenis';
import { scroll } from 'motion';

document.addEventListener('DOMContentLoaded', () => {
	// Initialize Lenis for smooth scrolling
	const lenis = new Lenis({
		duration: 0.75,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		smoothTouch: false,
		autoResize: true,
		prevent: (node) => node.closest('.mello-modal') !== null,
	});
	window.lenis = lenis;

	// Recalculate Lenis scroll bounds when any <details> element toggles
	document.querySelectorAll('details').forEach((el) => {
		el.addEventListener('toggle', () => {
			// Wait for animation (if any), then resize
			setTimeout(() => {
				lenis.resize();
			}, 300); // adjust if your open/close duration is different
		});
	});

	// Function to handle the animation frame
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	function initScrollSpeedElements() {
		document.querySelectorAll('[data-scroll-speed]').forEach((el) => {
			const speed = parseFloat(el.dataset.scrollSpeed) || 0;

			scroll(
				(progress) => {
					const offset = speed * 4;
					const translateY = offset * (1 - 2 * progress);
					el.style.transform = `translateY(${translateY}vmin)`;
				},
				{
					target: el,
					offset: ['start end', 'end start'],
				}
			);
		});
	}

	initScrollSpeedElements();

	// Hook into native fetch to catch AJAX content loading
	const origFetch = window.fetch;
	window.fetch = function (...args) {
		return origFetch.apply(this, args).then((res) => {
			res.clone().text().then(() => {
				window.lenis?.resize();
				initScrollSpeedElements();
			});
			return res;
		});
	};

	// Observe DOM changes to catch any content inserted by plugins
	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.addedNodes.length) {
				window.lenis?.resize();
				initScrollSpeedElements();
			}
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});

	// Update Lenis on window resize
	window.addEventListener('resize', () => {
		lenis.resize();
	});

	if (window.jQuery) {
		jQuery(document).ajaxComplete(function () {
			window.lenis?.resize();
			initScrollSpeedElements();
		});
	}
});
