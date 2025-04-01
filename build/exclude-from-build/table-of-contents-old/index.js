/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/table-of-contents.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/table-of-contents.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const tableOfContents = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M20 9.484h-8.889v-1.5H20v1.5Zm0 7h-4.889v-1.5H20v1.5Zm-14 .032a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 15.516a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 8.484a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tableOfContents);
//# sourceMappingURL=table-of-contents.js.map

/***/ }),

/***/ "./node_modules/fast-deep-equal/es6/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fast-deep-equal/es6/index.js ***!
  \***************************************************/
/***/ ((module) => {



// do not edit .js files directly - edit src/index.jst


  var envHasBigInt64Array = typeof BigInt64Array !== 'undefined';


module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/block.json":
/*!*****************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/block.json ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"__experimental":true,"name":"mello-block/table-of-contents-old","title":"Table of Contents","category":"design","description":"Summarize your post with a list of headings. Add HTML anchors to Heading blocks to link them here.","keywords":["document outline","summary"],"textdomain":"default","icon":"book-alt","attributes":{"headings":{"type":"array","items":{"type":"object"},"default":[]},"onlyIncludeCurrentPage":{"type":"boolean","default":false}},"supports":{"html":false,"color":{"text":true,"background":true,"gradients":true,"link":true},"spacing":{"margin":true,"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"interactivity":{"clientNavigation":true},"__experimentalBorder":{"radius":true,"color":true,"width":true,"style":true,"__experimentalDefaultControls":{"radius":true,"color":true,"width":true,"style":true}}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/edit.js":
/*!**************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/edit.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TableOfContentsEdit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/table-of-contents.js");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hooks */ "./src/exclude-from-build/table-of-contents-old/hooks.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./list */ "./src/exclude-from-build/table-of-contents-old/list.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils */ "./src/exclude-from-build/table-of-contents-old/utils.ts");
/* harmony import */ var _utils_hooks__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/hooks */ "./src/exclude-from-build/table-of-contents-old/utils/hooks.js");

/**
 * WordPress dependencies
 */










/**
 * Internal dependencies
 */





/** @typedef {import('./utils').HeadingData} HeadingData */

/**
 * Table of Contents block edit component.
 *
 * @param {Object}                       props                                   The props.
 * @param {Object}                       props.attributes                        The block attributes.
 * @param {HeadingData[]}                props.attributes.headings               A list of data for each heading in the post.
 * @param {boolean}                      props.attributes.onlyIncludeCurrentPage Whether to only include headings from the current page (if the post is paginated).
 * @param {string}                       props.clientId
 * @param {(attributes: Object) => void} props.setAttributes
 *
 * @return {Component} The component.
 */
function TableOfContentsEdit({
  attributes: {
    headings = [],
    onlyIncludeCurrentPage
  },
  clientId,
  setAttributes
}) {
  (0,_hooks__WEBPACK_IMPORTED_MODULE_9__.useObserveHeadings)(clientId);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useInstanceId)(TableOfContentsEdit, 'table-of-contents');

  // If a user clicks to a link prevent redirection and show a warning.
  const {
    createWarningNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_8__.store);
  const showRedirectionPreventedNotice = event => {
    event.preventDefault();
    createWarningNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Links are disabled in the editor.'), {
      id: `block-library/core/table-of-contents/redirection-prevented/${instanceId}`,
      type: 'snackbar'
    });
  };
  const canInsertList = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => {
    const {
      getBlockRootClientId,
      canInsertBlockType
    } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.store);
    const rootClientId = getBlockRootClientId(clientId);
    return canInsertBlockType('core/list', rootClientId);
  }, [clientId]);
  const {
    replaceBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.store);
  const dropdownMenuProps = (0,_utils_hooks__WEBPACK_IMPORTED_MODULE_12__.useToolsPanelDropdownMenuProps)();
  const headingTree = (0,_utils__WEBPACK_IMPORTED_MODULE_11__.linearToNestedHeadingList)(headings);
  const toolbarControls = canInsertList && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    onClick: () => replaceBlocks(clientId, (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.createBlock)('core/list', {
      ordered: true,
      values: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.renderToString)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_list__WEBPACK_IMPORTED_MODULE_10__["default"], {
        nestedHeadingList: headingTree
      }))
    }))
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Convert to static list'))));
  const inspectorControls = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToolsPanel, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Settings'),
    resetAll: () => {
      setAttributes({
        onlyIncludeCurrentPage: false
      });
    },
    dropdownMenuProps: dropdownMenuProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToolsPanelItem, {
    hasValue: () => !!onlyIncludeCurrentPage,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Only include current page'),
    onDeselect: () => setAttributes({
      onlyIncludeCurrentPage: false
    }),
    isShownByDefault: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Only include current page'),
    checked: onlyIncludeCurrentPage,
    onChange: value => setAttributes({
      onlyIncludeCurrentPage: value
    }),
    help: onlyIncludeCurrentPage ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Only including headings from the current page (if the post is paginated).') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Include headings from all pages (if the post is paginated).')
  }))));

  // If there are no headings or the only heading is empty.
  // Note that the toolbar controls are intentionally omitted since the
  // "Convert to static list" option is useless to the placeholder state.
  if (headings.length === 0) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockIcon, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"]
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Table of Contents'),
      instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Start adding Heading blocks to create a table of contents. Headings with HTML anchors will be linked here.')
    })), inspectorControls);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_list__WEBPACK_IMPORTED_MODULE_10__["default"], {
    nestedHeadingList: headingTree,
    disableLinkActivation: true,
    onClick: showRedirectionPreventedNotice
  }))), toolbarControls, inspectorControls);
}

/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/hooks.js":
/*!***************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/hooks.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useObserveHeadings: () => (/* binding */ useObserveHeadings)
/* harmony export */ });
/* harmony import */ var fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-deep-equal/es6 */ "./node_modules/fast-deep-equal/es6/index.js");
/* harmony import */ var fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom */ "@wordpress/dom");
/* harmony import */ var _wordpress_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */





function getLatestHeadings(select, clientId) {
  var _select$getPermalink, _getBlockAttributes;
  const {
    getBlockAttributes,
    getBlockName,
    getBlocksByName,
    getClientIdsOfDescendants
  } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.store);

  // FIXME: @wordpress/block-library should not depend on @wordpress/editor.
  // Blocks can be loaded into a *non-post* block editor, so to avoid
  // declaring @wordpress/editor as a dependency, we must access its
  // store by string. When the store is not available, editorSelectors
  // will be null, and the block's saved markup will lack permalinks.
  // eslint-disable-next-line @wordpress/data-no-store-string-literals
  const permalink = (_select$getPermalink = select('core/editor').getPermalink()) !== null && _select$getPermalink !== void 0 ? _select$getPermalink : null;
  const isPaginated = getBlocksByName('core/nextpage').length !== 0;
  const {
    onlyIncludeCurrentPage
  } = (_getBlockAttributes = getBlockAttributes(clientId)) !== null && _getBlockAttributes !== void 0 ? _getBlockAttributes : {};

  // Get post-content block client ID.
  const [postContentClientId = ''] = getBlocksByName('core/post-content');

  // Get the client ids of all blocks in the editor.
  const allBlockClientIds = getClientIdsOfDescendants(postContentClientId);

  // If onlyIncludeCurrentPage is true, calculate the page (of a paginated post) this block is part of, so we know which headings to include; otherwise, skip the calculation.
  let tocPage = 1;
  if (isPaginated && onlyIncludeCurrentPage) {
    // We can't use getBlockIndex because it only returns the index
    // relative to sibling blocks.
    const tocIndex = allBlockClientIds.indexOf(clientId);
    for (const [blockIndex, blockClientId] of allBlockClientIds.entries()) {
      // If we've reached blocks after the Table of Contents, we've
      // finished calculating which page the block is on.
      if (blockIndex >= tocIndex) {
        break;
      }
      if (getBlockName(blockClientId) === 'core/nextpage') {
        tocPage++;
      }
    }
  }
  const latestHeadings = [];

  /** The page (of a paginated post) a heading will be part of. */
  let headingPage = 1;
  let headingPageLink = null;

  // If the core/editor store is available, we can add permalinks to the
  // generated table of contents.
  if (typeof permalink === 'string') {
    headingPageLink = isPaginated ? (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(permalink, {
      page: headingPage
    }) : permalink;
  }
  for (const blockClientId of allBlockClientIds) {
    const blockName = getBlockName(blockClientId);
    if (blockName === 'core/nextpage') {
      headingPage++;

      // If we're only including headings from the current page (of
      // a paginated post), then exit the loop if we've reached the
      // pages after the one with the Table of Contents block.
      if (onlyIncludeCurrentPage && headingPage > tocPage) {
        break;
      }
      if (typeof permalink === 'string') {
        headingPageLink = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.removeQueryArgs)(permalink, ['page']), {
          page: headingPage
        });
      }
    }
    // If we're including all headings or we've reached headings on
    // the same page as the Table of Contents block, add them to the
    // list.
    else if (!onlyIncludeCurrentPage || headingPage === tocPage) {
      if (blockName === 'core/heading') {
        const headingAttributes = getBlockAttributes(blockClientId);
        const canBeLinked = typeof headingPageLink === 'string' && typeof headingAttributes.anchor === 'string' && headingAttributes.anchor !== '';
        latestHeadings.push({
          // Convert line breaks to spaces, and get rid of HTML tags in the headings.
          content: (0,_wordpress_dom__WEBPACK_IMPORTED_MODULE_2__.__unstableStripHTML)(headingAttributes.content.replace(/(<br *\/?>)+/g, ' ')),
          level: headingAttributes.level,
          link: canBeLinked ? `${headingPageLink}#${headingAttributes.anchor}` : null
        });
      }
    }
  }
  return latestHeadings;
}
function observeCallback(select, dispatch, clientId) {
  const {
    getBlockAttributes
  } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.store);
  const {
    updateBlockAttributes,
    __unstableMarkNextChangeAsNotPersistent
  } = dispatch(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.store);

  /**
   * If the block no longer exists in the store, skip the update.
   * The "undo" action recreates the block and provides a new `clientId`.
   * The hook still might be observing the changes while the old block unmounts.
   */
  const attributes = getBlockAttributes(clientId);
  if (attributes === null) {
    return;
  }
  const headings = getLatestHeadings(select, clientId);
  if (!fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_0___default()(headings, attributes.headings)) {
    __unstableMarkNextChangeAsNotPersistent();
    updateBlockAttributes(clientId, {
      headings
    });
  }
}
function useObserveHeadings(clientId) {
  const registry = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useRegistry)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    // Todo: Limit subscription to block editor store when data no longer depends on `getPermalink`.
    // See: https://github.com/WordPress/gutenberg/pull/45513
    return registry.subscribe(() => observeCallback(registry.select, registry.dispatch, clientId));
  }, [registry, clientId]);
}

/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/index.js":
/*!***************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   metadata: () => (/* reexport default export from named module */ _block_json__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   name: () => (/* binding */ name),
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/table-of-contents.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/exclude-from-build/table-of-contents-old/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/exclude-from-build/table-of-contents-old/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/exclude-from-build/table-of-contents-old/save.js");
/* harmony import */ var _utils_init_block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/init-block */ "./src/exclude-from-build/table-of-contents-old/utils/init-block.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/exclude-from-build/table-of-contents-old/style.scss");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_6__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */







/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_6__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});
const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_1__;

const settings = {
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"],
  example: {
    innerBlocks: [{
      name: 'core/heading',
      attributes: {
        level: 2,
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Heading')
      }
    }, {
      name: 'core/heading',
      attributes: {
        level: 3,
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Subheading')
      }
    }, {
      name: 'core/heading',
      attributes: {
        level: 2,
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Heading')
      }
    }, {
      name: 'core/heading',
      attributes: {
        level: 3,
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Subheading')
      }
    }],
    attributes: {
      headings: [{
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Heading'),
        level: 2
      }, {
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Subheading'),
        level: 3
      }, {
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Heading'),
        level: 2
      }, {
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Subheading'),
        level: 3
      }]
    }
  }
};
const init = () => (0,_utils_init_block__WEBPACK_IMPORTED_MODULE_4__["default"])({
  name,
  metadata: _block_json__WEBPACK_IMPORTED_MODULE_1__,
  settings
});

/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/list.tsx":
/*!***************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/list.tsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TableOfContentsList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * External dependencies
 */

 // <-- Added to resolve the TS error about React global

/**
 * Internal dependencies
 */

const ENTRY_CLASS_NAME = 'mello-block-table-of-contents__entry';

/**
 * TableOfContentsList component
 *
 * This component accepts a list of nested headings and renders them as a table of contents.
 * Each heading is rendered as either an anchor (<a>) if a link is provided, or a span otherwise.
 * If a heading node contains children, it recursively renders another TableOfContentsList inside an ordered list (<ol>).
 *
 * Props:
 * - nestedHeadingList: An array of heading data, which includes the text content and link (if any).
 * - disableLinkActivation (optional): A flag that, when true, disables link activation via the aria-disabled attribute.
 * - onClick (optional): A click handler for the anchor elements, used when link activation is disabled.
 */
function TableOfContentsList({
  nestedHeadingList,
  disableLinkActivation,
  onClick
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, nestedHeadingList.map((node, index) => {
    const {
      content,
      link
    } = node.heading;

    // Conditionally render an anchor or a span based on whether a link exists
    const entry = link ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: ENTRY_CLASS_NAME,
      href: link,
      "aria-disabled": disableLinkActivation || undefined,
      onClick: disableLinkActivation && 'function' === typeof onClick ? onClick : undefined
    }, content) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: ENTRY_CLASS_NAME
    }, content);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: index
    }, entry, node.children ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableOfContentsList, {
      nestedHeadingList: node.children,
      disableLinkActivation: disableLinkActivation,
      onClick: disableLinkActivation && 'function' === typeof onClick ? onClick : undefined
    })) : null);
  }));
}

/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/save.js":
/*!**************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/save.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list */ "./src/exclude-from-build/table-of-contents-old/list.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/exclude-from-build/table-of-contents-old/utils.ts");

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


function save({
  attributes: {
    headings = []
  }
}) {
  if (headings.length === 0) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_list__WEBPACK_IMPORTED_MODULE_2__["default"], {
    nestedHeadingList: (0,_utils__WEBPACK_IMPORTED_MODULE_3__.linearToNestedHeadingList)(headings)
  })));
}

/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/style.scss":
/*!*****************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/style.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/utils.ts":
/*!***************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/utils.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   linearToNestedHeadingList: () => (/* binding */ linearToNestedHeadingList)
/* harmony export */ });
/**
 * Takes a flat list of heading parameters and nests them based on each header's
 * immediate parent's level.
 *
 * @param headingList The flat list of headings to nest.
 *
 * @return The nested list of headings.
 */
function linearToNestedHeadingList(headingList) {
  const nestedHeadingList = [];
  headingList.forEach((heading, key) => {
    if (heading.content === '') {
      return;
    }

    // Make sure we are only working with the same level as the first iteration in our set.
    if (heading.level === headingList[0].level) {
      // Check that the next iteration will return a value.
      // If it does and the next level is greater than the current level,
      // the next iteration becomes a child of the current iteration.
      if (headingList[key + 1]?.level > heading.level) {
        // We must calculate the last index before the next iteration that
        // has the same level (siblings). We then use this index to slice
        // the array for use in recursion. This prevents duplicate nodes.
        let endOfSlice = headingList.length;
        for (let i = key + 1; i < headingList.length; i++) {
          if (headingList[i].level === heading.level) {
            endOfSlice = i;
            break;
          }
        }

        // We found a child node: Push a new node onto the return array
        // with children.
        nestedHeadingList.push({
          heading,
          children: linearToNestedHeadingList(headingList.slice(key + 1, endOfSlice))
        });
      } else {
        // No child node: Push a new node onto the return array.
        nestedHeadingList.push({
          heading,
          children: null
        });
      }
    }
  });
  return nestedHeadingList;
}

/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/utils/hooks.js":
/*!*********************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/utils/hooks.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCanEditEntity: () => (/* binding */ useCanEditEntity),
/* harmony export */   useToolsPanelDropdownMenuProps: () => (/* binding */ useToolsPanelDropdownMenuProps),
/* harmony export */   useUploadMediaFromBlobURL: () => (/* binding */ useUploadMediaFromBlobURL)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blob */ "@wordpress/blob");
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/**
 * WordPress dependencies
 */







/**
 * Returns whether the current user can edit the given entity.
 *
 * @param {string} kind     Entity kind.
 * @param {string} name     Entity name.
 * @param {string} recordId Record's id.
 */
function useCanEditEntity(kind, name, recordId) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store).canUser('update', {
    kind,
    name,
    id: recordId
  }), [kind, name, recordId]);
}

/**
 * Handles uploading a media file from a blob URL on mount.
 *
 * @param {Object}   args              Upload media arguments.
 * @param {string}   args.url          Blob URL.
 * @param {?Array}   args.allowedTypes Array of allowed media types.
 * @param {Function} args.onChange     Function called when the media is uploaded.
 * @param {Function} args.onError      Function called when an error happens.
 */
function useUploadMediaFromBlobURL(args = {}) {
  const latestArgsRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(args);
  const hasUploadStartedRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  const {
    getSettings
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    latestArgsRef.current = args;
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Uploading is a special effect that can't be canceled via the cleanup method.
    // The extra check avoids duplicate uploads in development mode (React.StrictMode).
    if (hasUploadStartedRef.current) {
      return;
    }
    if (!latestArgsRef.current.url || !(0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__.isBlobURL)(latestArgsRef.current.url)) {
      return;
    }
    const file = (0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__.getBlobByURL)(latestArgsRef.current.url);
    if (!file) {
      return;
    }
    const {
      url,
      allowedTypes,
      onChange,
      onError
    } = latestArgsRef.current;
    const {
      mediaUpload
    } = getSettings();
    hasUploadStartedRef.current = true;
    mediaUpload({
      filesList: [file],
      allowedTypes,
      onFileChange: ([media]) => {
        if ((0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__.isBlobURL)(media?.url)) {
          return;
        }
        (0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__.revokeBlobURL)(url);
        onChange(media);
        hasUploadStartedRef.current = false;
      },
      onError: message => {
        (0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__.revokeBlobURL)(url);
        onError(message);
        hasUploadStartedRef.current = false;
      }
    });
  }, [getSettings]);
}
function useToolsPanelDropdownMenuProps() {
  const isMobile = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.useViewportMatch)('medium', '<');
  return !isMobile ? {
    popoverProps: {
      placement: 'left-start',
      // For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
      offset: 259
    }
  } : {};
}

/***/ }),

/***/ "./src/exclude-from-build/table-of-contents-old/utils/init-block.js":
/*!**************************************************************************!*\
  !*** ./src/exclude-from-build/table-of-contents-old/utils/init-block.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initBlock)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 * @return {WPBlockType | undefined} The block, if it has been successfully registered;
 *                        otherwise `undefined`.
 */
function initBlock(block) {
  if (!block) {
    return;
  }
  const {
    metadata,
    settings,
    name
  } = block;
  return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)({
    name,
    ...metadata
  }, settings);
}

/***/ }),

/***/ "@wordpress/blob":
/*!******************************!*\
  !*** external ["wp","blob"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["blob"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

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

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom":
/*!*****************************!*\
  !*** external ["wp","dom"] ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["wp"]["dom"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["notices"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["wp"]["url"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"exclude-from-build/table-of-contents-old/index": 0,
/******/ 			"exclude-from-build/table-of-contents-old/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkmello_block_extensions"] = globalThis["webpackChunkmello_block_extensions"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["exclude-from-build/table-of-contents-old/style-index"], () => (__webpack_require__("./src/exclude-from-build/table-of-contents-old/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map