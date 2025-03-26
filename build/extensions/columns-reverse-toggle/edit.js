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

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!\n\tCopyright (c) 2018 Jed Watson.\n\tLicensed under the MIT License (MIT), see\n\thttp://jedwatson.github.io/classnames\n*/\n/* global define */\n\n(function () {\n\t'use strict';\n\n\tvar hasOwn = {}.hasOwnProperty;\n\n\tfunction classNames () {\n\t\tvar classes = '';\n\n\t\tfor (var i = 0; i < arguments.length; i++) {\n\t\t\tvar arg = arguments[i];\n\t\t\tif (arg) {\n\t\t\t\tclasses = appendClass(classes, parseValue(arg));\n\t\t\t}\n\t\t}\n\n\t\treturn classes;\n\t}\n\n\tfunction parseValue (arg) {\n\t\tif (typeof arg === 'string' || typeof arg === 'number') {\n\t\t\treturn arg;\n\t\t}\n\n\t\tif (typeof arg !== 'object') {\n\t\t\treturn '';\n\t\t}\n\n\t\tif (Array.isArray(arg)) {\n\t\t\treturn classNames.apply(null, arg);\n\t\t}\n\n\t\tif (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {\n\t\t\treturn arg.toString();\n\t\t}\n\n\t\tvar classes = '';\n\n\t\tfor (var key in arg) {\n\t\t\tif (hasOwn.call(arg, key) && arg[key]) {\n\t\t\t\tclasses = appendClass(classes, key);\n\t\t\t}\n\t\t}\n\n\t\treturn classes;\n\t}\n\n\tfunction appendClass (value, newClass) {\n\t\tif (!newClass) {\n\t\t\treturn value;\n\t\t}\n\t\n\t\tif (value) {\n\t\t\treturn value + ' ' + newClass;\n\t\t}\n\t\n\t\treturn value + newClass;\n\t}\n\n\tif ( true && module.exports) {\n\t\tclassNames.default = classNames;\n\t\tmodule.exports = classNames;\n\t} else if (true) {\n\t\t// register as 'classnames', consistent with npm package name\n\t\t!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n\t\t\treturn classNames;\n\t\t}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n}());\n\n\n//# sourceURL=webpack://mello-block-extensions/./node_modules/classnames/index.js?");

/***/ }),

/***/ "./src/extensions/columns-reverse-toggle/edit.js":
/*!*******************************************************!*\
  !*** ./src/extensions/columns-reverse-toggle/edit.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ \"./src/extensions/columns-reverse-toggle/editor.scss\");\n\n/**\n * External dependencies\n */\n\n\n/**\n * WordPress dependencies\n */\n\n\n\n\n\n\n/**\n * Add the attribute needed for reversing column direction on mobile.\n *\n * @since 0.1.0\n * @param {Object} settings\n */\nfunction addAttributes(settings) {\n  if (\"core/columns\" !== settings.name) {\n    return settings;\n  }\n\n  // Add the attribute.\n  const columnsAttributes = {\n    isReversedDirectionOnMobile: {\n      type: \"boolean\",\n      default: false\n    }\n  };\n  const newSettings = {\n    ...settings,\n    attributes: {\n      ...settings.attributes,\n      ...columnsAttributes\n    }\n  };\n  return newSettings;\n}\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)(\"blocks.registerBlockType\", \"enable-column-direction/add-attributes\", addAttributes);\n\n/**\n * Filter the BlockEdit object and add icon inspector controls to button blocks.\n *\n * @since 0.1.0\n * @param {Object} BlockEdit\n */\nfunction addInspectorControls(BlockEdit) {\n  return props => {\n    if (props.name !== \"core/columns\") {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n        ...props\n      });\n    }\n    const {\n      attributes,\n      setAttributes\n    } = props;\n    const {\n      isReversedDirectionOnMobile\n    } = attributes;\n    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n      ...props\n    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {\n      className: \"mello-additional-setting\",\n      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)(\"Reverse direction on mobile\", \"enable-column-direction\"),\n      checked: isReversedDirectionOnMobile,\n      onChange: () => {\n        setAttributes({\n          isReversedDirectionOnMobile: !isReversedDirectionOnMobile\n        });\n      }\n    })));\n  };\n}\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)(\"editor.BlockEdit\", \"enable-column-direction/add-inspector-controls\", addInspectorControls);\n\n/**\n * Add custom classes in the Editor.\n *\n * @since 0.1.0\n * @param {Object} BlockListBlock\n */\nfunction addClasses(BlockListBlock) {\n  return props => {\n    const {\n      name,\n      attributes\n    } = props;\n    if (\"core/columns\" !== name || !attributes?.isReversedDirectionOnMobile) {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {\n        ...props\n      });\n    }\n\n    // Create a new class list with the custom class if the attribute is true.\n    const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()(props.className, \"mello-columns-reverse-on-phone\");\n\n    // Return the block with the new class applied.\n    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {\n      ...props,\n      className: classes\n    });\n  };\n}\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)(\"editor.BlockListBlock\", \"enable-column-direction/add-classes\", addClasses);\n\n/**\n * Add the custom class to the front-end save function.\n *\n * @since 0.1.0\n * @param {Object} props\n * @param {Object} blockType\n * @param {Object} attributes\n */\nfunction addSaveProps(extraProps, blockType, attributes) {\n  if (blockType.name === \"core/columns\" && attributes.isReversedDirectionOnMobile) {\n    // Add the class on the front-end.\n    extraProps.className = classnames__WEBPACK_IMPORTED_MODULE_1___default()(extraProps.className, \"mello-columns-reverse-on-phone\");\n    console.log(\"Adding class for reversed direction on front-end.\");\n  }\n  return extraProps;\n}\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)(\"blocks.getSaveContent.extraProps\", \"enable-column-direction/add-save-props\", addSaveProps);\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/columns-reverse-toggle/edit.js?");

/***/ }),

/***/ "./src/extensions/columns-reverse-toggle/editor.scss":
/*!***********************************************************!*\
  !*** ./src/extensions/columns-reverse-toggle/editor.scss ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/columns-reverse-toggle/editor.scss?");

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = wp.blockEditor;

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = wp.components;

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = wp.hooks;

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = wp.i18n;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extensions/columns-reverse-toggle/edit.js");
/******/ 	
/******/ })()
;