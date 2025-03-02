/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/extened-core-columns/editor.scss":
/*!*****************************************************!*\
  !*** ./src/blocks/extened-core-columns/editor.scss ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/extened-core-cover-ext-video/editor.scss":
/*!*************************************************************!*\
  !*** ./src/blocks/extened-core-cover-ext-video/editor.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/extened-core-cover-ext-video/styles.scss":
/*!*************************************************************!*\
  !*** ./src/blocks/extened-core-cover-ext-video/styles.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./src/blocks/extend-javascript-attribute/edit.js ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







// List of blocks to extend

const allowedBlocks = ["core/group", "core/columns", "core/cover"];

// Add custom attribute to selected blocks
const addCustomJSAttribute = (settings, name) => {
  if (!allowedBlocks.includes(name)) {
    return settings;
  }
  settings.attributes = {
    ...settings.attributes,
    customJS: {
      type: "string",
      default: ""
    }
  };
  return settings;
};
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)("blocks.registerBlockType", "mello-block-extensions/custom-js-attribute", addCustomJSAttribute);

// Create a fullscreen modal editor for JavaScript with Save & Close buttons
const withCustomJSControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    if (!allowedBlocks.includes(props.name)) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const [isModalOpen, setModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [tempJS, setTempJS] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(attributes.customJS || ""); // Store temporary JS input

    // Save without closing
    const handleSave = () => {
      setAttributes({
        customJS: tempJS
      });
    };

    // Save and close modal
    const handleSaveAndClose = () => {
      handleSave();
      setModalOpen(false);
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorAdvancedControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
          label: "Inline Javascript",
          help: "Add inline JS and render in inline with the the block.",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            variant: "secondary",
            __next40pxDefaultSize: true,
            onClick: () => setModalOpen(true),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Edit Custom JavaScript", "mello-block-extensions")
          })
        })
      }), isModalOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Edit Custom JavaScript", "mello-block-extensions"),
        onRequestClose: () => setModalOpen(false),
        isFullScreen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("JavaScript Code", "mello-block-extensions"),
          value: tempJS,
          onChange: value => setTempJS(value),
          rows: 15 // Provides a larger editing space
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          style: {
            display: "flex",
            gap: "10px",
            marginTop: "10px"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            variant: "primary",
            onClick: handleSave,
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Save", "mello-block-extensions")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            variant: "primary",
            onClick: handleSaveAndClose,
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Save & Close", "mello-block-extensions")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            variant: "secondary",
            onClick: () => setModalOpen(false),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Close", "mello-block-extensions")
          })]
        })]
      })]
    });
  };
}, "withCustomJSControl");
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)("editor.BlockEdit", "mello-block-extensions/custom-js-control", withCustomJSControl);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!******************************************************!*\
  !*** ./src/blocks/extened-core-button-modal/edit.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







// Add toggle control to Button Block settings

const addModalToggleControl = BlockEdit => {
  return props => {
    const {
      attributes,
      setAttributes,
      isSelected,
      name
    } = props;

    // Ensure we're working with the button block
    if (name !== "core/button") return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
      ...props
    });
    const {
      openInModal = false
    } = attributes;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
        ...props
      }), isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          className: "mello-additional-setting",
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Open Content in Modal", "mello-block-extensions"),
          checked: openInModal,
          onChange: value => setAttributes({
            openInModal: value
          })
        })
      })]
    });
  };
};

// Register the filter for block editor settings
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)("editor.BlockEdit", "mello-block-extensions/button-modal-toggle", (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(addModalToggleControl, "withModalToggleControl"));

// Add attributes to the button block
const addModalAttributes = (settings, name) => {
  if (name !== "core/button") return settings;
  settings.attributes = {
    ...settings.attributes,
    openInModal: {
      type: "boolean",
      default: false
    }
  };
  return settings;
};

// Register the filter to add attributes
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)("blocks.registerBlockType", "mello-block-extensions/button-modal-attributes", addModalAttributes);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*************************************************!*\
  !*** ./src/blocks/extened-core-columns/edit.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/extened-core-columns/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */






/**
 * Add the attribute needed for reversing column direction on mobile.
 *
 * @since 0.1.0
 * @param {Object} settings
 */

function addAttributes(settings) {
  if ("core/columns" !== settings.name) {
    return settings;
  }

  // Add the attribute.
  const columnsAttributes = {
    isReversedDirectionOnMobile: {
      type: "boolean",
      default: false
    }
  };
  const newSettings = {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...columnsAttributes
    }
  };
  return newSettings;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)("blocks.registerBlockType", "enable-column-direction/add-attributes", addAttributes);

/**
 * Filter the BlockEdit object and add icon inspector controls to button blocks.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function addInspectorControls(BlockEdit) {
  return props => {
    if (props.name !== "core/columns") {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      isReversedDirectionOnMobile
    } = attributes;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          className: "mello-additional-setting",
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Reverse direction on mobile", "enable-column-direction"),
          checked: isReversedDirectionOnMobile,
          onChange: () => {
            setAttributes({
              isReversedDirectionOnMobile: !isReversedDirectionOnMobile
            });
          }
        })
      })]
    });
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)("editor.BlockEdit", "enable-column-direction/add-inspector-controls", addInspectorControls);

/**
 * Add custom classes in the Editor.
 *
 * @since 0.1.0
 * @param {Object} BlockListBlock
 */
function addClasses(BlockListBlock) {
  return props => {
    const {
      name,
      attributes
    } = props;
    if ("core/columns" !== name || !attributes?.isReversedDirectionOnMobile) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockListBlock, {
        ...props
      });
    }

    // Create a new class list with the custom class if the attribute is true.
    const classes = classnames__WEBPACK_IMPORTED_MODULE_0___default()(props.className, "mello-columns-reverse-on-phone");

    // Return the block with the new class applied.
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockListBlock, {
      ...props,
      className: classes
    });
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)("editor.BlockListBlock", "enable-column-direction/add-classes", addClasses);

/**
 * Add the custom class to the front-end save function.
 *
 * @since 0.1.0
 * @param {Object} props
 * @param {Object} blockType
 * @param {Object} attributes
 */
function addSaveProps(extraProps, blockType, attributes) {
  if (blockType.name === "core/columns" && attributes.isReversedDirectionOnMobile) {
    // Add the class on the front-end.
    extraProps.className = classnames__WEBPACK_IMPORTED_MODULE_0___default()(extraProps.className, "mello-columns-reverse-on-phone");
    console.log("Adding class for reversed direction on front-end.");
  }
  return extraProps;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)("blocks.getSaveContent.extraProps", "enable-column-direction/add-save-props", addSaveProps);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*********************************************************!*\
  !*** ./src/blocks/extened-core-cover-ext-video/edit.js ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/extened-core-cover-ext-video/editor.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles.scss */ "./src/blocks/extened-core-cover-ext-video/styles.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
// Import necessary WordPress packages









// Extend attributes to include Vimeo/YouTube URL

const addAttributes = (settings, name) => {
  if (name !== 'core/cover') {
    return settings;
  }
  settings.attributes = {
    ...settings.attributes,
    videoUrl: {
      type: 'string',
      default: ''
    }
  };
  return settings;
};

// Create higher-order component to add InspectorControls
const addInspectorControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    if (props.name !== 'core/cover') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      videoUrl
    } = attributes;

    // Function to clear the video URL
    const clearVideoUrl = () => {
      setAttributes({
        videoUrl: ''
      });
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Background Video URL', 'your-text-domain'),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Vimeo / YouTube URL', 'your-text-domain'),
            value: videoUrl,
            onChange: url => setAttributes({
              videoUrl: url
            }),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Enter Vimeo or YouTube URL', 'your-text-domain')
          }), videoUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "video-preview",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Preview:', 'your-text-domain')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("iframe", {
                src: videoUrl.includes('youtube.com') ? videoUrl.replace('watch?v=', 'embed/') + '?autoplay=0&controls=0' : `https://player.vimeo.com/video/${videoUrl.split('.com/')[1]}?autoplay=0`,
                frameBorder: "0",
                allow: "autoplay; fullscreen; picture-in-picture",
                allowFullScreen: true,
                style: {
                  width: '100%',
                  height: '140px'
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "components-panel__row",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                type: "button",
                className: "components-button block-library-cover__reset-button is-secondary is-small",
                onClick: clearVideoUrl,
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Clear Video', 'your-text-domain')
              })
            })]
          })]
        })
      })]
    });
  };
}, 'withInspectorControl');

// Add filter to integrate InspectorControls into core/cover block
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('editor.BlockEdit', 'mello/with-inspector-control', addInspectorControl);

// Add attributes to the core/cover block
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('blocks.registerBlockType', 'mello/add-cover-video-attributes', addAttributes);
const addSaveContent = (element, blockType, attributes) => {
  if (blockType.name !== 'core/cover') {
    return element;
  }
  const {
    videoUrl
  } = attributes;
  if (videoUrl) {
    let embedUrl;

    // Check if it's a YouTube or Vimeo URL and add autoplay/muted/loop/background params
    if (videoUrl.includes('youtube.com')) {
      embedUrl = videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&playlist=' + videoUrl.split('v=')[1] + '&controls=0';
    } else if (videoUrl.includes('vimeo.com')) {
      const vimeoId = videoUrl.split('.com/')[1];
      embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1`;
    } else {
      embedUrl = videoUrl; // Fallback for other video URLs if needed
    }

    // Ensure children are always an array
    const childrenArray = Array.isArray(element.props.children) ? element.props.children : [element.props.children];

    // Create a new array of children, including the existing children
    const newChildren = [...childrenArray,
    /*#__PURE__*/
    // Preserve all existing children
    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "wp-block-cover__video-background__external",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("iframe", {
        src: embedUrl,
        frameBorder: "0",
        allow: "autoplay; fullscreen; picture-in-picture",
        allowFullScreen: true,
        style: {
          width: '100%',
          height: '100%'
        }
      })
    })];

    // Return the element with the iframe injected in the correct place
    return React.cloneElement(element, element.props, newChildren);
  }
  return element;
};

// Add filter to modify the save content of the core/cover block
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('blocks.getSaveElement', 'mello/modify-cover-save-content', addSaveContent);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!***************************************************************!*\
  !*** ./src/blocks/extened-core-details-heading-level/edit.js ***!
  \***************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





/**
 * Add the heading level attribute.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Modified block settings.
 */

function addHeadingLevelAttribute(settings) {
  if (settings.name !== 'core/details') {
    return settings;
  }
  const headingLevelAttribute = {
    level: {
      type: 'string',
      default: 'Unset'
    }
  };
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...headingLevelAttribute
    }
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.registerBlockType', 'heading-level/add-heading-level-attribute', addHeadingLevelAttribute);

/**
 * Add the heading level select control to inspector controls.
 *
 * @param {Object} BlockEdit Original block edit component.
 * @return {Function} Modified block edit component.
 */
function addHeadingLevelInspectorControl(BlockEdit) {
  return props => {
    if (props.name !== 'core/details') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      level
    } = attributes;
    const onLevelChange = newLevel => {
      setAttributes({
        level: newLevel
      });
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorAdvancedControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Heading Level', 'heading-level'),
          value: level,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Unset', 'heading-level'),
            value: 'Unset'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('H2', 'heading-level'),
            value: '2'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('H3', 'heading-level'),
            value: '3'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('H4', 'heading-level'),
            value: '4'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('H5', 'heading-level'),
            value: '5'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('H6', 'heading-level'),
            value: '6'
          }],
          onChange: onLevelChange
        })
      })]
    });
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockEdit', 'heading-level/add-heading-level-inspector-control', addHeadingLevelInspectorControl);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!***************************************************************!*\
  !*** ./src/blocks/extened-core-details-name-atribute/edit.js ***!
  \***************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */




// import './editor.scss';

/**
 * Add the attribute for a name tag to the core/details block.
 *
 * @param {Object} settings Block settings.
 */

function addAttributes(settings) {
  if ("core/details" !== settings.name) {
    return settings;
  }

  // Add the attribute.
  const detailsAttributes = {
    nameTag: {
      type: "string",
      default: ""
    }
  };
  const newSettings = {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...detailsAttributes
    }
  };
  return newSettings;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)("blocks.registerBlockType", "enable-details/add-attributes", addAttributes);

/**
 * Add InspectorControls to the core/details block to set the name tag.
 *
 * @param {Object} BlockEdit Block edit component.
 */
function addInspectorControls(BlockEdit) {
  return props => {
    if (props.name !== "core/details") {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      nameTag
    } = attributes;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorAdvancedControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Name Tag", "enable-details"),
          value: nameTag,
          onChange: value => setAttributes({
            nameTag: value
          }),
          help: "Details with the same name tag will auto close when another one opens."
        })
      })]
    });
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)("editor.BlockEdit", "enable-details/add-inspector-controls", addInspectorControls);

/**
 * Add the name tag rendering to the front-end save function.
 *
 * @param {Object} extraProps Block properties.
 * @param {Object} blockType Block type.
 * @param {Object} attributes Block attributes.
 */
function addSaveProps(extraProps, blockType, attributes) {
  if (blockType.name === "core/details" && attributes.nameTag) {
    // Add the name tag rendering on the front-end.
    if (!extraProps.className) {
      extraProps.className = "";
    }
    // Add the nameTag as an attribute to the <details> element.
    extraProps.name = attributes.nameTag;
  }
  return extraProps;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)("blocks.getSaveContent.extraProps", "enable-details/add-save-props", addSaveProps);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./src/blocks/extened-core-details-schema/edit.js ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * External dependencies
 */






/**
 * Add the FAQ schema attribute.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Modified block settings.
 */

function addFAQSchemaAttribute(settings) {
  if (settings.name !== "core/details") {
    return settings;
  }
  const faqSchemaAttribute = {
    hasFAQSchema: {
      type: "boolean",
      default: false
    }
  };
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...faqSchemaAttribute
    }
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)("blocks.registerBlockType", "enable-faq-schema/add-faq-attribute", addFAQSchemaAttribute);

/**
 * Add the FAQ schema toggle to inspector controls.
 *
 * @param {Object} BlockEdit Original block edit component.
 * @return {Function} Modified block edit component.
 */
function addFAQSchemaInspectorControl(BlockEdit) {
  return props => {
    if (props.name !== "core/details") {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      hasFAQSchema
    } = attributes;
    const onToggleChange = () => {
      setAttributes({
        hasFAQSchema: !hasFAQSchema
      });
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorAdvancedControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Enable FAQ Schema", "enable-faq-schema"),
          checked: hasFAQSchema,
          onChange: onToggleChange,
          help: "Adds FAQ schema for SEO purposes."
        })
      })]
    });
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)("editor.BlockEdit", "enable-faq-schema/add-faq-inspector-control", addFAQSchemaInspectorControl);

/**
 * Add custom classes in the Editor.
 *
 * @since 0.1.0
 * @param {Object} BlockListBlock
 */
function addClasses(BlockListBlock) {
  return props => {
    const {
      name,
      attributes
    } = props;
    if ("core/details" !== name || !attributes?.hasFAQSchema) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockListBlock, {
        ...props
      });
    }

    // Create a new class list with the custom class if the attribute is true.
    const classes = classnames__WEBPACK_IMPORTED_MODULE_4___default()(props.className, "mello-has-faq-schema");

    // Return the block with the new class applied.
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockListBlock, {
      ...props,
      className: classes
    });
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)("editor.BlockListBlock", "enable-faq-schema/add-classes", addClasses);

/**
 * Add the custom class to the front-end save function.
 *
 * @since 0.1.0
 * @param {Object} props
 * @param {Object} blockType
 * @param {Object} attributes
 */
function addSaveProps(extraProps, blockType, attributes) {
  if (blockType.name === "core/details" && attributes.hasFAQSchema) {
    // Add the class on the front-end.
    extraProps.className = classnames__WEBPACK_IMPORTED_MODULE_4___default()(extraProps.className, "mello-has-faq-schema");
  }
  return extraProps;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)("blocks.getSaveContent.extraProps", "enable-faq-schema/add-save-props", addSaveProps);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./src/blocks/extened-core-group/edit.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







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
  div: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Default block wrapper.'),
  header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <header> element should represent introductory content, typically a group of introductory or navigational aids.'),
  main: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <main> element should be used for the primary content of your document only.'),
  section: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("The <section> element should represent a standalone portion of the document that can't be better represented by another element."),
  article: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <article> element should represent a self-contained, syndicatable portion of the document.'),
  aside: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."),
  footer: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'),
  nav: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <nav> element represents a section of a page whose purpose is to provide navigation links.'),
  figure: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <figure> element represents self-contained content, potentially with an optional caption.'),
  details: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <details> element creates an interactive widget that can be opened or closed.'),
  time: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <time> element represents a specific period in time or date.'),
  ul: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <ul> element represents an unordered list of items, typically rendered as a bulleted list.'),
  li: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), unordered list (<ul>), or menu (<menu>).'),
  cite: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('The <cite> element is used to add a citation. This should be contained in a parent element block quote (<blockquote>).')
};

// Create higher-order component to add custom options to SelectControl
const withCustomElementOptions = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    // Only apply to group blocks
    if (props.name !== 'core/group') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
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
      label: element === 'div' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Default (<div>)') : `<${element}>`,
      value: element
    }));
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('HTML Tag'),
          initialOpen: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            __next40pxDefaultSize: true,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Select HTML element'),
            value: sanitizeGroupTagName(tagName),
            options: elementOptions,
            onChange: value => setAttributes({
              tagName: sanitizeGroupTagName(value)
            }),
            help: htmlElementMessages[tagName]
          })
        })
      })]
    });
  };
}, 'withCustomElementOptions');

// Add filter for sanitizing the tagName attribute
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('blocks.getBlockAttributes', 'mello/sanitize-group-tag-name', (attributes, blockType) => {
  if (blockType.name === 'core/group' && attributes?.tagName) {
    return {
      ...attributes,
      tagName: sanitizeGroupTagName(attributes.tagName)
    };
  }
  return attributes;
});

// Add our filters
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('blocks.registerBlockType', 'mello/group-custom-elements', addCustomElements);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('editor.BlockEdit', 'mello/with-custom-element-options', withCustomElementOptions);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addCustomElements);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*********************************************************!*\
  !*** ./src/blocks/extened-core-navigation-link/edit.js ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Add the attribute and modify the parent block and allowedBlocks properties
 * on navigation-link blocks.
 *
 * @param {Object} settings
 */
function addAttributes(settings) {
  if (settings.name !== 'core/navigation-link') {
    return settings;
  }

  // Optionally modify the parent property to include 'core/group', 'core/columns', and 'core/column'
  const newParent = settings.parent ? [...settings.parent, 'core/group', 'core/columns', 'core/column'] : ['core/group', 'core/columns', 'core/column'];

  // Optionally modify allowedBlocks to include 'core/group', 'core/columns', and 'core/column'
  const newAllowedBlocks = settings.allowedBlocks ? [...settings.allowedBlocks, 'core/group', 'core/columns', 'core/column'] : ['core/group', 'core/columns', 'core/column'];

  // Extend supports settings with experimental background settings
  const newSupports = {
    ...settings.supports,
    __experimentalSettings: true,
    background: {
      backgroundImage: true,
      backgroundSize: true,
      __experimentalDefaultControls: {
        backgroundImage: true
      }
    }
  };
  return {
    ...settings,
    attributes: {
      ...settings.attributes
    },
    parent: newParent,
    // Set or merge with existing parent settings
    allowedBlocks: newAllowedBlocks,
    // Set or merge with existing allowedBlocks settings
    supports: newSupports // Set or merge with existing supports settings
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'extend-navigation-link/add-media-attributes', addAttributes);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./src/blocks/extened-core-navigation-submenu/edit.js ***!
  \************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Add allowedBlocks property to the core/navigation-submenu block.
 *
 * @param {Object} settings - The block settings.
 * @returns {Object} The modified block settings.
 */
function addAllowedBlocks(settings) {
  if (settings.name !== 'core/navigation-submenu') {
    return settings;
  }
  const newAllowedBlocks = ['core/navigation-link', 'core/navigation-submenu', 'core/page-list', 'core/list-item'];
  const modifiedSettings = {
    ...settings,
    allowedBlocks: newAllowedBlocks
  };

  // Log modified settings for debugging purposes.
  // console.log('Modified settings for core/navigation-submenu (allowedBlocks):', modifiedSettings);

  return modifiedSettings;
}

/**
 * Add supports.inserter property to the core/navigation-submenu block.
 *
 * @param {Object} settings - The block settings.
 * @returns {Object} The modified block settings.
 */
function addSupportsInserter(settings) {
  if (settings.name !== 'core/navigation-submenu') {
    return settings;
  }
  const modifiedSettings = {
    ...settings,
    supports: {
      ...settings.supports,
      inserter: true
    }
  };

  // Log modified settings for debugging purposes.
  // console.log('Modified settings for core/navigation-submenu (supports):', modifiedSettings);

  return modifiedSettings;
}

// Add filters to modify block settings
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'extend-navigation-submenu/add-allowed-blocks', addAllowedBlocks, 10);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'extend-navigation-submenu/add-supports-inserter', addSupportsInserter, 10);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./src/blocks/extened-core-navigation/edit.js ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Add the attribute and modify the allowedBlocks properties
 * on navigation blocks.
 *
 * @param {Object} settings
 */
function addAttributes(settings) {
  if (settings.name !== 'core/navigation') {
    return settings;
  }

  // Optionally modify allowedBlocks to include 'core/group', 'core/columns', and 'core/column'
  const newAllowedBlocks = settings.allowedBlocks ? [...settings.allowedBlocks, 'core/paragraph', 'core/heading', 'core/group', 'core/columns', 'core/column'] : ['core/group', 'core/columns', 'core/column'];
  return {
    ...settings,
    attributes: {
      ...settings.attributes
    },
    allowedBlocks: newAllowedBlocks // Set or merge with existing allowedBlocks settings
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'extend-navigation-/add-media-attributes', addAttributes);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*******************************************************!*\
  !*** ./src/blocks/extened-core-query-exclude/edit.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





/**
 * Add the attribute needed for the block.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Modified block settings.
 */

function addAttributes(settings) {
  if ('core/query' !== settings.name) {
    return settings;
  }
  const queryAttributes = {
    excludeCurrentPost: {
      type: 'boolean',
      default: false
    }
  };
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...queryAttributes
    }
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.registerBlockType', 'extend-query-block/add-attributes', addAttributes);

/**
 * Add the toggle control to the block's inspector controls.
 *
 * @param {Object} BlockEdit Original block edit component.
 * @return {Function} Modified block edit component.
 */
function addInspectorControls(BlockEdit) {
  return props => {
    if (props.name !== 'core/query') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      excludeCurrentPost
    } = attributes;
    const onToggleChange = () => {
      const newExcludeCurrentPostState = !excludeCurrentPost;
      setAttributes({
        excludeCurrentPost: newExcludeCurrentPostState
      });
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exclude Posts', 'extend-query-block'),
          initialOpen: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "exclude-current-post-container",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exclude Current Post', 'extend-query-block'),
              checked: excludeCurrentPost,
              onChange: onToggleChange
            })
          })
        })
      })]
    });
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockEdit', 'extend-query-block/add-inspector-controls', addInspectorControls);
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************************************!*\
  !*** ./src/blocks/extened-data-attributes/edit.js ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





// Define allowed blocks

const allowedBlocks = ['core/paragraph', 'core/heading', 'core/image', 'core/group', 'core/columns', 'core/column'];

/**
 * Add the attribute for custom data attributes to specified blocks.
 *
 * @param {Object} settings Block settings.
 */
function addAttributes(settings) {
  if (!allowedBlocks.includes(settings.name)) {
    return settings;
  }

  // Add the attribute.
  const customAttributes = {
    dataAttributes: {
      type: 'string',
      default: ''
    }
  };
  const newSettings = {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...customAttributes
    }
  };
  return newSettings;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.registerBlockType', 'mello-block-extensions/add-attributes', addAttributes);

/**
 * Add InspectorControls to specified blocks to set custom data attributes.
 *
 * @param {Object} BlockEdit Block edit component.
 */
function addInspectorControls(BlockEdit) {
  return props => {
    if (!allowedBlocks.includes(props.name)) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      dataAttributes
    } = attributes;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorAdvancedControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Data Attributes', 'mello-block-extensions'),
          value: dataAttributes,
          onChange: value => setAttributes({
            dataAttributes: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter attributes in key=value format, separated by spaces.', 'mello-block-extensions')
        })
      })]
    });
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockEdit', 'mello-block-extensions/add-inspector-controls', addInspectorControls);

/**
 * Add the custom data attributes to the front-end save function.
 *
 * @param {Object} extraProps Block properties.
 * @param {Object} blockType Block type.
 * @param {Object} attributes Block attributes.
 */
function addSaveProps(extraProps, blockType, attributes) {
  if (attributes.dataAttributes) {
    const attributePairs = attributes.dataAttributes.match(/([^\s=]+)(?:="([^"]*)")?/g) || [];
    attributePairs.forEach(attribute => {
      const match = attribute.match(/([^=]+)(?:="([^"]*)")?/);
      if (match) {
        const key = match[1];
        const value = match[2] ? match[2].replace(/"/g, '') : '';
        extraProps[key] = value !== '' ? value : true;
      }
    });
  }
  return extraProps;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.getSaveContent.extraProps', 'mello-block-extensions/add-save-props', addSaveProps);
})();

/******/ })()
;
//# sourceMappingURL=editor.js.map