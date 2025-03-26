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

/***/ "./src/extensions/cover-ext-video/edit.js":
/*!************************************************!*\
  !*** ./src/extensions/cover-ext-video/edit.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ \"@wordpress/compose\");\n/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ \"@wordpress/element\");\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ \"./src/extensions/cover-ext-video/editor.scss\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./styles.scss */ \"./src/extensions/cover-ext-video/styles.scss\");\n\n// Import necessary WordPress packages\n\n\n\n\n\n\n\n\n\n// Extend attributes to include Vimeo/YouTube URL\nconst addAttributes = (settings, name) => {\n  if (name !== 'core/cover') {\n    return settings;\n  }\n  settings.attributes = {\n    ...settings.attributes,\n    videoUrl: {\n      type: 'string',\n      default: ''\n    }\n  };\n  return settings;\n};\n\n// Create higher-order component to add InspectorControls\nconst addInspectorControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {\n  return props => {\n    if (props.name !== 'core/cover') {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n        ...props\n      });\n    }\n    const {\n      attributes,\n      setAttributes\n    } = props;\n    const {\n      videoUrl\n    } = attributes;\n\n    // Function to clear the video URL\n    const clearVideoUrl = () => {\n      setAttributes({\n        videoUrl: ''\n      });\n    };\n    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n      ...props\n    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {\n      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Background Video URL', 'your-text-domain')\n    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {\n      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Vimeo / YouTube URL', 'your-text-domain'),\n      value: videoUrl,\n      onChange: url => setAttributes({\n        videoUrl: url\n      }),\n      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Enter Vimeo or YouTube URL', 'your-text-domain')\n    }), videoUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n      className: \"video-preview\"\n    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"p\", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Preview:', 'your-text-domain')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"iframe\", {\n      src: videoUrl.includes('youtube.com') ? videoUrl.replace('watch?v=', 'embed/') + '?autoplay=0&controls=0' : `https://player.vimeo.com/video/${videoUrl.split('.com/')[1]}?autoplay=0`,\n      frameBorder: \"0\",\n      allow: \"autoplay; fullscreen; picture-in-picture\",\n      allowFullScreen: true,\n      style: {\n        width: '100%',\n        height: '140px'\n      }\n    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n      className: \"components-panel__row\"\n    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"button\", {\n      type: \"button\",\n      className: \"components-button block-library-cover__reset-button is-secondary is-small\",\n      onClick: clearVideoUrl\n    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Clear Video', 'your-text-domain')))))));\n  };\n}, 'withInspectorControl');\n\n// Add filter to integrate InspectorControls into core/cover block\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('editor.BlockEdit', 'mello/with-inspector-control', addInspectorControl);\n\n// Add attributes to the core/cover block\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.registerBlockType', 'mello/add-cover-video-attributes', addAttributes);\nconst addSaveContent = (element, blockType, attributes) => {\n  if (blockType.name !== 'core/cover') {\n    return element;\n  }\n  const {\n    videoUrl\n  } = attributes;\n  if (videoUrl) {\n    let embedUrl;\n\n    // Check if it's a YouTube or Vimeo URL and add autoplay/muted/loop/background params\n    if (videoUrl.includes('youtube.com')) {\n      embedUrl = videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&playlist=' + videoUrl.split('v=')[1] + '&controls=0';\n    } else if (videoUrl.includes('vimeo.com')) {\n      const vimeoId = videoUrl.split('.com/')[1];\n      embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1`;\n    } else {\n      embedUrl = videoUrl; // Fallback for other video URLs if needed\n    }\n\n    // Ensure children are always an array\n    const childrenArray = Array.isArray(element.props.children) ? element.props.children : [element.props.children];\n\n    // Create a new array of children, including the existing children\n    const newChildren = [...childrenArray,\n    // Preserve all existing children\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n      className: \"wp-block-cover__video-background__external\"\n    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"iframe\", {\n      src: embedUrl,\n      frameBorder: \"0\",\n      allow: \"autoplay; fullscreen; picture-in-picture\",\n      allowFullScreen: true,\n      style: {\n        width: '100%',\n        height: '100%'\n      }\n    }))];\n\n    // Return the element with the iframe injected in the correct place\n    return React.cloneElement(element, element.props, newChildren);\n  }\n  return element;\n};\n\n// Add filter to modify the save content of the core/cover block\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('blocks.getSaveElement', 'mello/modify-cover-save-content', addSaveContent);\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/cover-ext-video/edit.js?");

/***/ }),

/***/ "./src/extensions/cover-ext-video/editor.scss":
/*!****************************************************!*\
  !*** ./src/extensions/cover-ext-video/editor.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/cover-ext-video/editor.scss?");

/***/ }),

/***/ "./src/extensions/cover-ext-video/styles.scss":
/*!****************************************************!*\
  !*** ./src/extensions/cover-ext-video/styles.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mello-block-extensions/./src/extensions/cover-ext-video/styles.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extensions/cover-ext-video/edit.js");
/******/ 	
/******/ })()
;