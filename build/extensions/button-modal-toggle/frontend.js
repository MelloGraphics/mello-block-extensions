/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/extensions/button-modal-toggle/frontend.js":
/*!********************************************************!*\
  !*** ./src/extensions/button-modal-toggle/frontend.js ***!
  \********************************************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function () {\n  const modalClass = 'open-modal';\n\n  // Function to create a simple modal\n  const createModal = url => {\n    const modal = document.createElement('div');\n    modal.classList.add('modal-overlay');\n    modal.setAttribute('role', 'dialog');\n    modal.setAttribute('aria-modal', 'true');\n    modal.innerHTML = `\n            <div class=\"modal-content\" tabindex=\"0\">\n                <iframe src=\"${url}\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>\n                <button class=\"modal-close\" aria-label=\"Close Modal\">Close</button>\n            </div>\n        `;\n    document.body.appendChild(modal);\n\n    // Add the 'is-active' class to display the modal\n    setTimeout(() => {\n      modal.classList.add('is-active');\n    }, 10); // Small delay for transition to apply\n\n    // Focus management\n    const modalContent = modal.querySelector('.modal-content');\n    modalContent.focus();\n\n    // Trap focus inside modal\n    const trapFocus = e => {\n      if (e.key === 'Tab') {\n        const focusableElements = modal.querySelectorAll('button, iframe');\n        const firstElement = focusableElements[0];\n        const lastElement = focusableElements[focusableElements.length - 1];\n        if (e.shiftKey) {\n          // shift + tab\n          if (document.activeElement === firstElement) {\n            e.preventDefault();\n            lastElement.focus();\n          }\n        } else {\n          // tab\n          if (document.activeElement === lastElement) {\n            e.preventDefault();\n            firstElement.focus();\n          }\n        }\n      }\n    };\n    document.addEventListener('keydown', trapFocus);\n\n    // Close modal on click of close button\n    modal.querySelector('.modal-close').addEventListener('click', () => {\n      modal.classList.remove('is-active');\n      setTimeout(() => modal.remove(), 300); // Delay for smooth removal after transition\n      document.removeEventListener('keydown', trapFocus);\n    });\n\n    // Close modal on outside click\n    modal.addEventListener('click', e => {\n      if (e.target === modal) {\n        modal.classList.remove('is-active');\n        setTimeout(() => modal.remove(), 300);\n        document.removeEventListener('keydown', trapFocus);\n      }\n    });\n\n    // Close modal on 'Escape' key press\n    document.addEventListener('keydown', e => {\n      if (e.key === 'Escape') {\n        modal.classList.remove('is-active');\n        setTimeout(() => modal.remove(), 300);\n        document.removeEventListener('keydown', trapFocus);\n      }\n    });\n  };\n\n  // Handle button click for opening modals\n  document.querySelectorAll(`.${modalClass}`).forEach(button => {\n    button.addEventListener('click', event => {\n      event.preventDefault();\n      const url = button.href;\n      createModal(url);\n    });\n  });\n});\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/button-modal-toggle/frontend.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/extensions/button-modal-toggle/frontend.js"]();
/******/ 	
/******/ })()
;