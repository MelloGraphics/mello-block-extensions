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

eval("document.addEventListener('DOMContentLoaded', function () {\n  const modalClass = 'is-open-in-modal';\n\n  // Function to create a simple modal\n  const createModal = url => {\n    const modal = document.createElement('div');\n    modal.classList.add('mello-modal__overlay');\n    modal.setAttribute('role', 'dialog');\n    modal.setAttribute('aria-modal', 'true');\n    modal.innerHTML = `\n            <div class=\"mello-modal__content\" tabindex=\"0\">\n                <iframe src=\"${url}\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>\n                <button class=\"mello-modal__close\" aria-label=\"Close Modal\">\n                  <svg viewBox=\"0 0 11 11\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" focusable=\"false\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.54289 5.25L0.146423 9.64641L0.853534 10.3535L5.25 5.9571L9.64647 10.3535L10.3536 9.64641L5.95711 5.25L10.3536 0.853586L9.64647 0.146484L5.25 4.5429L0.853534 0.146484L0.146424 0.853586L4.54289 5.25Z\" fill=\"currentColor\" />\n                  </svg>\n                </button>\n            </div>\n        `;\n    document.body.appendChild(modal);\n\n    // Add the 'is-active' class to display the modal\n    setTimeout(() => {\n      modal.classList.add('mello-modal--active');\n    }, 10); // Small delay for transition to apply\n\n    // Focus management\n    const modalContent = modal.querySelector('.mello-modal__content');\n    if (modalContent) {\n      modalContent.focus();\n    }\n\n    // Trap focus inside modal\n    const trapFocus = e => {\n      if (e.key === 'Tab') {\n        const focusableElements = modal.querySelectorAll('button, iframe');\n        const firstElement = focusableElements[0];\n        const lastElement = focusableElements[focusableElements.length - 1];\n        if (e.shiftKey) {\n          // shift + tab\n          if (document.activeElement === firstElement) {\n            e.preventDefault();\n            lastElement.focus();\n          }\n        } else {\n          // tab\n          if (document.activeElement === lastElement) {\n            e.preventDefault();\n            firstElement.focus();\n          }\n        }\n      }\n    };\n    document.addEventListener('keydown', trapFocus);\n\n    // Close modal on click of close button\n    modal.querySelector('.mello-modal__close').addEventListener('click', () => {\n      modal.classList.remove('mello-modal--active');\n      setTimeout(() => modal.remove(), 300);\n      document.removeEventListener('keydown', trapFocus);\n    });\n\n    // Close modal on outside click\n    modal.addEventListener('click', e => {\n      if (e.target === modal) {\n        modal.classList.remove('mello-modal--active');\n        setTimeout(() => modal.remove(), 300);\n        document.removeEventListener('keydown', trapFocus);\n      }\n    });\n\n    // Close modal on 'Escape' key press\n    document.addEventListener('keydown', e => {\n      if (e.key === 'Escape') {\n        modal.classList.remove('mello-modal--active');\n        setTimeout(() => modal.remove(), 300);\n        document.removeEventListener('keydown', trapFocus);\n      }\n    });\n  };\n\n  // Handle button click for opening modals\n  document.querySelectorAll(`.${modalClass}`).forEach(button => {\n    button.addEventListener('click', event => {\n      event.preventDefault();\n      const url = button.href;\n      createModal(url);\n    });\n  });\n});\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/button-modal-toggle/frontend.js?");

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