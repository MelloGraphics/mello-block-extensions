/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************************************!*\
  !*** ./src/blocks/extend-core-group/edit.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);








// Define the allowed elements with their attributes
const ALLOWED_GROUP_HTML_ELEMENTS = ['div', 'header', 'main', 'section', 'article', 'aside', 'footer', 'nav', 'figure', 'details', 'time', 'ul', 'li', 'cite'];

// Add custom elements to the allowed tagNames
const addCustomElements = (settings, name) => {
  if (name !== 'core/group') {
    return settings;
  }
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      tagName: {
        type: 'string',
        enum: ALLOWED_GROUP_HTML_ELEMENTS,
        default: 'div'
      }
    }
  };
};

// Sanitize the tagName attribute
const sanitizeGroupTagName = tagName => {
  return ALLOWED_GROUP_HTML_ELEMENTS.includes(tagName) ? tagName : 'div';
};

// Help text messages for HTML elements
const htmlElementMessages = {
  div: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Default block wrapper.'),
  header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <header> element should represent introductory content, typically a group of introductory or navigational aids.'),
  main: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <main> element should be used for the primary content of your document only.'),
  section: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)("The <section> element should represent a standalone portion of the document that can't be better represented by another element."),
  article: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <article> element should represent a self-contained, syndicatable portion of the document.'),
  aside: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)("The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."),
  footer: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'),
  nav: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <nav> element represents a section of a page whose purpose is to provide navigation links.'),
  figure: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <figure> element represents self-contained content, potentially with an optional caption.'),
  details: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <details> element creates an interactive widget that can be opened or closed.'),
  time: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <time> element represents a specific period in time or date.'),
  ul: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <ul> element represents an unordered list of items, typically rendered as a bulleted list.'),
  li: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), unordered list (<ul>), or menu (<menu>).'),
  cite: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The <cite> element is used to add a citation. This should be contained in a parent element block quote (<blockquote>).')
};

// Create higher-order component to add custom options to SelectControl
const withCustomElementOptions = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    // Only apply to group blocks
    if (props.name !== 'core/group') {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      tagName = 'div'
    } = attributes;
    const elementOptions = ALLOWED_GROUP_HTML_ELEMENTS.map(element => ({
      label: element === 'div' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Default (<div>)') : `<${element}>`,
      value: element
    }));
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('HTML Tag'),
      initialOpen: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      __next40pxDefaultSize: true,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Select HTML element'),
      value: sanitizeGroupTagName(tagName),
      options: elementOptions,
      onChange: value => setAttributes({
        tagName: sanitizeGroupTagName(value)
      }),
      help: htmlElementMessages[tagName]
    }))));
  };
}, 'withCustomElementOptions');

// Add filter for sanitizing the tagName attribute
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.getBlockAttributes', 'mello/sanitize-group-tag-name', (attributes, blockType) => {
  if (blockType.name === 'core/group' && attributes?.tagName) {
    return {
      ...attributes,
      tagName: sanitizeGroupTagName(attributes.tagName)
    };
  }
  return attributes;
});

// Add our filters
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.registerBlockType', 'mello/group-custom-elements', addCustomElements);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('editor.BlockEdit', 'mello/with-custom-element-options', withCustomElementOptions);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addCustomElements);
})();

(window.melloBlocks = window.melloBlocks || {})["extend-core-group/edit"] = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=edit.js.map