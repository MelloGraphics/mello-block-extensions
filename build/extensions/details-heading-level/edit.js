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

/***/ "./src/extensions/details-heading-level/edit.js":
/*!******************************************************!*\
  !*** ./src/extensions/details-heading-level/edit.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n/**\n * Add the heading level attribute.\n *\n * @param {Object} settings Original block settings.\n * @return {Object} Modified block settings.\n */\nfunction addHeadingLevelAttribute(settings) {\n  if (settings.name !== 'core/details') {\n    return settings;\n  }\n  const headingLevelAttribute = {\n    level: {\n      type: 'string',\n      default: 'Unset'\n    }\n  };\n  return {\n    ...settings,\n    attributes: {\n      ...settings.attributes,\n      ...headingLevelAttribute\n    }\n  };\n}\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)('blocks.registerBlockType', 'heading-level/add-heading-level-attribute', addHeadingLevelAttribute);\n\n/**\n * Add the heading level select control to inspector controls.\n *\n * @param {Object} BlockEdit Original block edit component.\n * @return {Function} Modified block edit component.\n */\nfunction addHeadingLevelInspectorControl(BlockEdit) {\n  return props => {\n    if (props.name !== 'core/details') {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n        ...props\n      });\n    }\n    const {\n      attributes,\n      setAttributes\n    } = props;\n    const {\n      level\n    } = attributes;\n    const onLevelChange = newLevel => {\n      setAttributes({\n        level: newLevel\n      });\n    };\n    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n      ...props\n    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorAdvancedControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {\n      __next40pxDefaultSize: true,\n      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Heading Level', 'heading-level'),\n      value: level,\n      options: [{\n        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Unset', 'heading-level'),\n        value: 'Unset'\n      }, {\n        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('H2', 'heading-level'),\n        value: '2'\n      }, {\n        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('H3', 'heading-level'),\n        value: '3'\n      }, {\n        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('H4', 'heading-level'),\n        value: '4'\n      }, {\n        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('H5', 'heading-level'),\n        value: '5'\n      }, {\n        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('H6', 'heading-level'),\n        value: '6'\n      }],\n      onChange: onLevelChange\n    })));\n  };\n}\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)('editor.BlockEdit', 'heading-level/add-heading-level-inspector-control', addHeadingLevelInspectorControl);\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/details-heading-level/edit.js?");

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = wp.blockEditor;

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = wp.components;

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = wp.hooks;

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = wp.i18n;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = React;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extensions/details-heading-level/edit.js");
/******/ 	
/******/ })()
;