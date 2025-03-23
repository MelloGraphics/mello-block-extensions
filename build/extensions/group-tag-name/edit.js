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

/***/ "./src/extensions/group-tag-name/edit.js":
/*!***********************************************!*\
  !*** ./src/extensions/group-tag-name/edit.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ \"@wordpress/compose\");\n/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ \"@wordpress/element\");\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\n// Define the allowed elements with their attributes\nconst ALLOWED_GROUP_HTML_ELEMENTS = ['div', 'header', 'main', 'section', 'article', 'aside', 'footer', 'nav', 'figure', 'details', 'time', 'ul', 'li', 'cite'];\n\n// Add custom elements to the allowed tagNames\nconst addCustomElements = (settings, name) => {\n  if (name !== 'core/group') {\n    return settings;\n  }\n  return {\n    ...settings,\n    attributes: {\n      ...settings.attributes,\n      tagName: {\n        type: 'string',\n        enum: ALLOWED_GROUP_HTML_ELEMENTS,\n        default: 'div'\n      }\n    }\n  };\n};\n\n// Sanitize the tagName attribute\nconst sanitizeGroupTagName = tagName => {\n  return ALLOWED_GROUP_HTML_ELEMENTS.includes(tagName) ? tagName : 'div';\n};\n\n// Help text messages for HTML elements\nconst htmlElementMessages = {\n  div: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Default block wrapper.'),\n  header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <header> element should represent introductory content, typically a group of introductory or navigational aids.'),\n  main: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <main> element should be used for the primary content of your document only.'),\n  section: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)(\"The <section> element should represent a standalone portion of the document that can't be better represented by another element.\"),\n  article: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <article> element should represent a self-contained, syndicatable portion of the document.'),\n  aside: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)(\"The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content.\"),\n  footer: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'),\n  nav: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <nav> element represents a section of a page whose purpose is to provide navigation links.'),\n  figure: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <figure> element represents self-contained content, potentially with an optional caption.'),\n  details: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <details> element creates an interactive widget that can be opened or closed.'),\n  time: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <time> element represents a specific period in time or date.'),\n  ul: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <ul> element represents an unordered list of items, typically rendered as a bulleted list.'),\n  li: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), unordered list (<ul>), or menu (<menu>).'),\n  cite: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <cite> element is used to add a citation. This should be contained in a parent element block quote (<blockquote>).')\n};\n\n// Create higher-order component to add custom options to SelectControl\nconst withCustomElementOptions = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {\n  return props => {\n    // Only apply to group blocks\n    if (props.name !== 'core/group') {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n        ...props\n      });\n    }\n    const {\n      attributes,\n      setAttributes\n    } = props;\n    const {\n      tagName = 'div'\n    } = attributes;\n    const elementOptions = ALLOWED_GROUP_HTML_ELEMENTS.map(element => ({\n      label: element === 'div' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Default (<div>)') : `<${element}>`,\n      value: element\n    }));\n    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n      ...props\n    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {\n      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('HTML Tag'),\n      initialOpen: false\n    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {\n      __next40pxDefaultSize: true,\n      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Select HTML element'),\n      value: sanitizeGroupTagName(tagName),\n      options: elementOptions,\n      onChange: value => setAttributes({\n        tagName: sanitizeGroupTagName(value)\n      }),\n      help: htmlElementMessages[tagName]\n    }))));\n  };\n}, 'withCustomElementOptions');\n\n// Add filter for sanitizing the tagName attribute\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.getBlockAttributes', 'mello/sanitize-group-tag-name', (attributes, blockType) => {\n  if (blockType.name === 'core/group' && attributes?.tagName) {\n    return {\n      ...attributes,\n      tagName: sanitizeGroupTagName(attributes.tagName)\n    };\n  }\n  return attributes;\n});\n\n// Add our filters\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.registerBlockType', 'mello/group-custom-elements', addCustomElements);\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('editor.BlockEdit', 'mello/with-custom-element-options', withCustomElementOptions);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addCustomElements);\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/group-tag-name/edit.js?");

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

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = wp.compose;

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = wp.element;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extensions/group-tag-name/edit.js");
/******/ 	
/******/ })()
;