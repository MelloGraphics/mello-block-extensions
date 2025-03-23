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

/***/ "./src/extensions/extend-data-attributes/edit.js":
/*!*******************************************************!*\
  !*** ./src/extensions/extend-data-attributes/edit.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n// Define allowed blocks\nconst allowedBlocks = ['core/paragraph', 'core/heading', 'core/post-title', 'core/query-title', 'core/image', 'core/group', 'core/columns', 'core/column'];\n\n/**\n * Add the attribute for custom data attributes to specified blocks.\n *\n * @param {Object} settings Block settings.\n */\nfunction addAttributes(settings) {\n  if (!allowedBlocks.includes(settings.name)) {\n    return settings;\n  }\n\n  // Add the attribute.\n  const customAttributes = {\n    dataAttributes: {\n      type: 'string',\n      default: ''\n    }\n  };\n  const newSettings = {\n    ...settings,\n    attributes: {\n      ...settings.attributes,\n      ...customAttributes\n    }\n  };\n  return newSettings;\n}\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)('blocks.registerBlockType', 'mello-block-extensions/add-attributes', addAttributes);\n\n/**\n * Add InspectorControls to specified blocks to set custom data attributes.\n *\n * @param {Object} BlockEdit Block edit component.\n */\nfunction addInspectorControls(BlockEdit) {\n  return props => {\n    if (!allowedBlocks.includes(props.name)) {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n        ...props\n      });\n    }\n    const {\n      attributes,\n      setAttributes\n    } = props;\n    const {\n      dataAttributes\n    } = attributes;\n    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n      ...props\n    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorAdvancedControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {\n      __nextHasNoMarginBottom: true,\n      __next40pxDefaultSize: true,\n      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Data Attributes', 'mello-block-extensions'),\n      value: dataAttributes,\n      onChange: value => setAttributes({\n        dataAttributes: value\n      }),\n      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enter attributes in key=value format, separated by spaces.', 'mello-block-extensions')\n    })));\n  };\n}\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)('editor.BlockEdit', 'mello-block-extensions/add-inspector-controls', addInspectorControls);\n\n/**\n * Add the custom data attributes to the front-end save function.\n *\n * @param {Object} extraProps Block properties.\n * @param {Object} blockType Block type.\n * @param {Object} attributes Block attributes.\n */\nfunction addSaveProps(extraProps, blockType, attributes) {\n  if (attributes.dataAttributes) {\n    const attributePairs = attributes.dataAttributes.match(/([^\\s=]+)(?:=\"([^\"]*)\")?/g) || [];\n    attributePairs.forEach(attribute => {\n      const match = attribute.match(/([^=]+)(?:=\"([^\"]*)\")?/);\n      if (match) {\n        const key = match[1];\n        const value = match[2] ? match[2].replace(/\"/g, '') : '';\n        extraProps[key] = value !== '' ? value : true;\n      }\n    });\n  }\n  return extraProps;\n}\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)('blocks.getSaveContent.extraProps', 'mello-block-extensions/add-save-props', addSaveProps);\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/extend-data-attributes/edit.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extensions/extend-data-attributes/edit.js");
/******/ 	
/******/ })()
;