/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/extensions/navigation-submenu-allowed-blocks/edit.js":
/*!******************************************************************!*\
  !*** ./src/extensions/navigation-submenu-allowed-blocks/edit.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);\n/**\n * WordPress dependencies\n */\n\n\n/**\n * Add allowedBlocks property to the core/navigation-submenu block.\n *\n * @param {Object} settings - The block settings.\n * @returns {Object} The modified block settings.\n */\nfunction addAllowedBlocks(settings) {\n  if (settings.name !== 'core/navigation-submenu') {\n    return settings;\n  }\n  const newAllowedBlocks = ['core/navigation-link', 'core/navigation-submenu', 'core/page-list', 'core/list-item'];\n  const modifiedSettings = {\n    ...settings,\n    allowedBlocks: newAllowedBlocks\n  };\n\n  // Log modified settings for debugging purposes.\n  // console.log('Modified settings for core/navigation-submenu (allowedBlocks):', modifiedSettings);\n\n  return modifiedSettings;\n}\n\n/**\n * Add supports.inserter property to the core/navigation-submenu block.\n *\n * @param {Object} settings - The block settings.\n * @returns {Object} The modified block settings.\n */\nfunction addSupportsInserter(settings) {\n  if (settings.name !== 'core/navigation-submenu') {\n    return settings;\n  }\n  const modifiedSettings = {\n    ...settings,\n    supports: {\n      ...settings.supports,\n      inserter: true\n    }\n  };\n\n  // Log modified settings for debugging purposes.\n  // console.log('Modified settings for core/navigation-submenu (supports):', modifiedSettings);\n\n  return modifiedSettings;\n}\n\n// Add filters to modify block settings\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'extend-navigation-submenu/add-allowed-blocks', addAllowedBlocks, 10);\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'extend-navigation-submenu/add-supports-inserter', addSupportsInserter, 10);\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/navigation-submenu-allowed-blocks/edit.js?");

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = wp.hooks;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extensions/navigation-submenu-allowed-blocks/edit.js");
/******/ 	
/******/ })()
;