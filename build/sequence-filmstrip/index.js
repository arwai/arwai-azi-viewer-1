/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sequence-filmstrip/edit.js"
/*!****************************************!*\
  !*** ./src/sequence-filmstrip/edit.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function SimpleColorControl({
  label,
  value,
  onChange
}) {
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const themeColors = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useSetting)('color.palette');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    style: {
      marginBottom: '16px'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      style: {
        marginBottom: '6px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        style: {
          fontSize: '12px',
          fontWeight: '500',
          color: '#1e293b'
        },
        children: label
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        style: {
          position: 'relative'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
          type: "button",
          onClick: () => setIsOpen(!isOpen),
          style: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid #cbd5e1',
            backgroundColor: value || 'transparent',
            cursor: 'pointer',
            padding: 0,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            flexShrink: 0
          },
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select color', 'arwai-azi-viewer')
        }), isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
          position: "bottom left",
          onClose: () => setIsOpen(false),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            style: {
              padding: '16px',
              minWidth: '260px',
              maxWidth: '300px'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
              colors: themeColors,
              value: value,
              onChange: newColor => onChange(newColor || ''),
              clearable: true,
              enableAlpha: true
            })
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
        type: "text",
        className: "components-text-control__input",
        value: value || '',
        placeholder: "#000000 or rgba(...)",
        style: {
          flex: 1,
          height: '32px',
          fontSize: '12px',
          padding: '0 8px'
        },
        onChange: e => onChange(e.target.value)
      })]
    })]
  });
}
function parseCssUnit(val, defaultUnit = 'px') {
  if (val === undefined || val === null || val === '') return '';
  const str = String(val).trim();
  if (str === 'auto') return 'auto';
  if (/^[0-9.]+(px|%|vh|vw|rem|em)$/i.test(str)) return str;
  if (!isNaN(parseFloat(str)) && isFinite(str)) return `${parseFloat(str)}${defaultUnit}`;
  return str;
}
function Edit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    style
  } = attributes;

  /* ── Resolved values ────────────────────────────────────────────── */
  const thumbRadiusVal = parseCssUnit(attributes.thumbBorderRadius, 'px') || '4px';
  const borderWidthVal = parseCssUnit(attributes.thumbBorderWidth, 'px') || '1px';
  const dimWidth = style?.dimensions?.width ? parseCssUnit(style.dimensions.width, 'px') : '';
  const dimHeight = style?.dimensions?.height ? parseCssUnit(style.dimensions.height, 'px') : '';
  const sizeVal = dimWidth || dimHeight || parseCssUnit(attributes.filmstripSize, 'px') || '60px';
  const spGap = style?.spacing?.blockGap;
  let gapVal = '8px';
  if (typeof spGap === 'string') {
    gapVal = spGap.replace(/var:preset\|spacing\|([a-zA-Z0-9-]+)/g, 'var(--wp--preset--spacing--$1)');
  }

  /* ── Find all viewer blocks on the page ─────────────────────────── */
  const viewerBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getBlocksByName,
      getBlock,
      getBlocks
    } = select('core/block-editor');
    let blocks = [];
    if (typeof getBlocksByName === 'function') {
      const clientIds = getBlocksByName('arwai/azi-viewer') || [];
      blocks = clientIds.map(id => getBlock(id)).filter(Boolean);
    }
    if (!blocks || blocks.length === 0) {
      const findRecursive = list => {
        let res = [];
        (list || []).forEach(b => {
          if (b && b.name === 'arwai/azi-viewer') res.push(b);
          if (b && b.innerBlocks && b.innerBlocks.length > 0) {
            res = res.concat(findRecursive(b.innerBlocks));
          }
        });
        return res;
      };
      blocks = findRecursive(getBlocks() || []);
    }
    return blocks;
  }, []);

  /* ── Resolve imageIds from linked/nearest viewer ─────────────────── */
  const linkedImageIds = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (attributes.targetViewerId) {
      const linked = viewerBlocks.find(b => b.attributes?.viewerId === attributes.targetViewerId);
      if (linked) return linked.attributes?.imageIds || [];
    }
    if (viewerBlocks.length > 0) return viewerBlocks[0].attributes?.imageIds || [];
    return [];
  }, [attributes.targetViewerId, viewerBlocks]);

  /* ── Fetch WP Media objects for linked image IDs (for thumbs) ─────── */
  const mediaObjects = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!linkedImageIds || linkedImageIds.length === 0) return [];
    const {
      getMedia
    } = select('core');
    return linkedImageIds.map(id => getMedia(id)).filter(Boolean);
  }, [JSON.stringify(linkedImageIds)]);
  const isLoading = linkedImageIds.length > 0 && mediaObjects.length < linkedImageIds.length;

  /* ── Viewer selector options ─────────────────────────────────────── */
  const viewerOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Automatic (Nearest Viewer on Page)', 'arwai-azi-viewer'),
    value: ''
  }, ...(viewerBlocks || []).map((block, idx) => ({
    label: block.attributes.viewerId ? `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Viewer', 'arwai-azi-viewer')} #${idx + 1} (${block.attributes.viewerId.substring(0, 8)}…)` : `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Viewer', 'arwai-azi-viewer')} #${idx + 1}`,
    value: block.attributes.viewerId || ''
  }))];
  const containerBorderWidthVal = parseCssUnit(attributes.containerBorderWidth, 'px');
  const containerBorderRadiusVal = parseCssUnit(attributes.containerBorderRadius, 'px');
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    className: 'arwai-aziv-sequence-filmstrip-wrap arwai-aziv-standalone-sequence-filmstrip',
    style: {
      boxSizing: 'border-box',
      width: '100%',
      ...(containerBorderWidthVal ? {
        borderWidth: containerBorderWidthVal
      } : {}),
      ...(attributes.containerBorderStyle ? {
        borderStyle: attributes.containerBorderStyle
      } : {}),
      ...(attributes.containerBorderColor ? {
        borderColor: attributes.containerBorderColor
      } : {}),
      ...(containerBorderRadiusVal ? {
        borderRadius: containerBorderRadiusVal
      } : {}),
      '--filmstrip-size': sizeVal,
      '--thumb-radius': thumbRadiusVal,
      '--thumb-border-width': borderWidthVal,
      '--thumb-border-color': attributes.thumbBorderColor || 'rgba(0,0,0,0.12)',
      '--thumb-hover-border-color': attributes.hoverBorderColor || '#3b82f6',
      '--thumb-selected-border-color': attributes.selectedBorderColor || '#2563eb'
    }
  });

  /* ── Decide what thumbnails to show ─────────────────────────────── */
  const thumbCount = linkedImageIds.length > 0 ? linkedImageIds.length : 3;
  const thumbItems = mediaObjects.length > 0 ? mediaObjects.map((m, i) => ({
    key: m.id || i,
    src: m.media_details?.sizes?.thumbnail?.source_url || m.source_url,
    label: m.title?.rendered || `#${i + 1}`
  })) : Array.from({
    length: thumbCount
  }, (_, i) => ({
    key: i,
    src: null,
    label: `#${i + 1}`
  }));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Viewer Link', 'arwai-azi-viewer'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connect to Viewer Block', 'arwai-azi-viewer'),
          value: attributes.targetViewerId || '',
          options: viewerOptions,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a specific Viewer block to control, or leave on Automatic.', 'arwai-azi-viewer'),
          onChange: val => setAttributes({
            targetViewerId: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hide on Mobile', 'arwai-azi-viewer'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Automatically hide the filmstrip on mobile viewports (≤ 768 px).', 'arwai-azi-viewer'),
          checked: false !== attributes.hideFilmstripMobile,
          onChange: val => setAttributes({
            hideFilmstripMobile: val
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      group: "styles",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Thumbnail Styling', 'arwai-azi-viewer'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Thumbnail Size', 'arwai-azi-viewer'),
          value: attributes.filmstripSize || '60px',
          onChange: val => setAttributes({
            filmstripSize: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Thumbnail Corner Radius', 'arwai-azi-viewer'),
          value: attributes.thumbBorderRadius || '4px',
          onChange: val => setAttributes({
            thumbBorderRadius: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Thumbnail Border Width', 'arwai-azi-viewer'),
          value: attributes.thumbBorderWidth || '1px',
          onChange: val => setAttributes({
            thumbBorderWidth: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default Border Color', 'arwai-azi-viewer'),
          value: attributes.thumbBorderColor || 'rgba(0,0,0,0.12)',
          onChange: val => setAttributes({
            thumbBorderColor: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover Border Color', 'arwai-azi-viewer'),
          value: attributes.hoverBorderColor || '#3b82f6',
          onChange: val => setAttributes({
            hoverBorderColor: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active/Selected Border Color', 'arwai-azi-viewer'),
          value: attributes.selectedBorderColor || '#2563eb',
          onChange: val => setAttributes({
            selectedBorderColor: val
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Container Border & Radius', 'arwai-azi-viewer'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Container Border Width', 'arwai-azi-viewer'),
          value: attributes.containerBorderWidth || '',
          onChange: val => setAttributes({
            containerBorderWidth: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Container Border Style', 'arwai-azi-viewer'),
          value: attributes.containerBorderStyle || '',
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Solid', 'arwai-azi-viewer'),
            value: 'solid'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Dashed', 'arwai-azi-viewer'),
            value: 'dashed'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Dotted', 'arwai-azi-viewer'),
            value: 'dotted'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Double', 'arwai-azi-viewer'),
            value: 'double'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Groove', 'arwai-azi-viewer'),
            value: 'groove'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Ridge', 'arwai-azi-viewer'),
            value: 'ridge'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inset', 'arwai-azi-viewer'),
            value: 'inset'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Outset', 'arwai-azi-viewer'),
            value: 'outset'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('None', 'arwai-azi-viewer'),
            value: 'none'
          }],
          onChange: val => setAttributes({
            containerBorderStyle: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Container Border Color', 'arwai-azi-viewer'),
          value: attributes.containerBorderColor || '',
          onChange: val => setAttributes({
            containerBorderColor: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Container Border Radius', 'arwai-azi-viewer'),
          value: attributes.containerBorderRadius || '',
          onChange: val => setAttributes({
            containerBorderRadius: val
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
        type: "button",
        className: "arwai-aziv-filmstrip-nav-btn arwai-aziv-filmstrip-nav-prev",
        style: {
          pointerEvents: 'none'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("svg", {
          viewBox: "0 0 24 24",
          width: "16",
          height: "16",
          stroke: "currentColor",
          strokeWidth: "2.5",
          fill: "none",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("polyline", {
            points: "15 18 9 12 15 6"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "arwai-aziv-filmstrip-fade arwai-aziv-filmstrip-fade-left"
      }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#64748b',
          fontSize: '13px',
          padding: '12px'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loading thumbnails…', 'arwai-azi-viewer')]
      }), !isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "arwai-aziv-filmstrip-scroll-container",
        style: {
          display: 'flex',
          justifyContent: 'safe center',
          alignItems: 'center',
          gap: gapVal,
          overflowX: 'auto',
          padding: '10px 16px',
          boxSizing: 'border-box',
          width: '100%'
        },
        children: thumbItems.map((item, idx) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: `arwai-aziv-filmstrip-thumb-item${idx === 0 ? ' active' : ''}`,
          title: item.label,
          style: {
            width: sizeVal,
            height: sizeVal,
            borderRadius: thumbRadiusVal,
            overflow: 'hidden',
            border: idx === 0 ? `${borderWidthVal !== '0px' ? borderWidthVal : '2px'} solid ${attributes.selectedBorderColor || '#2563eb'}` : `${borderWidthVal} solid ${attributes.thumbBorderColor || 'rgba(0,0,0,0.12)'}`,
            opacity: idx === 0 ? 1 : 0.7,
            flexShrink: 0,
            backgroundColor: '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'opacity 0.15s, border-color 0.15s, transform 0.15s'
          },
          children: item.src ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
            src: item.src,
            alt: item.label,
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              pointerEvents: 'none'
            }
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            style: {
              fontSize: '10px',
              color: '#94a3b8',
              fontWeight: '600'
            },
            children: item.label
          })
        }, item.key))
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "arwai-aziv-filmstrip-fade arwai-aziv-filmstrip-fade-right"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
        type: "button",
        className: "arwai-aziv-filmstrip-nav-btn arwai-aziv-filmstrip-nav-next",
        style: {
          pointerEvents: 'none'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("svg", {
          viewBox: "0 0 24 24",
          width: "16",
          height: "16",
          stroke: "currentColor",
          strokeWidth: "2.5",
          fill: "none",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("polyline", {
            points: "9 18 15 12 9 6"
          })
        })
      })]
    })]
  });
}

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/sequence-filmstrip/block.json"
/*!*******************************************!*\
  !*** ./src/sequence-filmstrip/block.json ***!
  \*******************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"arwai/azi-viewer-sequence-filmstrip","version":"0.1.1","title":"Image Sequence Filmstrip","category":"widgets","icon":"format-gallery","description":"Displays a horizontal thumbnail filmstrip row linked to an Annotated Image Viewer block.","keywords":["sequence","filmstrip","thumbnails","gallery","carousel"],"supports":{"align":["left","center","right","wide","full"],"color":{"background":true,"text":true,"gradients":true},"spacing":{"margin":true,"padding":true,"blockGap":true},"border":{"color":true,"radius":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"radius":true,"style":true,"width":true}},"shadow":{"__experimentalDefaultControls":{"shadow":true}}},"textdomain":"arwai-azi-viewer","editorScript":"file:./index.js","style":"file:../../assets/css/public.css","attributes":{"align":{"type":"string","default":""},"targetViewerId":{"type":"string","default":""},"showFilmstrip":{"type":"boolean","default":true},"hideFilmstripMobile":{"type":"boolean","default":true},"filmstripSize":{"type":"string","default":"60px"},"thumbBorderRadius":{"type":"string","default":"4px"},"thumbBorderWidth":{"type":"string","default":"1px"},"thumbBorderColor":{"type":"string","default":"rgba(0,0,0,0.12)"},"hoverBorderColor":{"type":"string","default":"#3b82f6"},"selectedBorderColor":{"type":"string","default":"#2563eb"},"containerBorderWidth":{"type":"string","default":""},"containerBorderStyle":{"type":"string","default":""},"containerBorderColor":{"type":"string","default":""},"containerBorderRadius":{"type":"string","default":""}}}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./src/sequence-filmstrip/index.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/sequence-filmstrip/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/sequence-filmstrip/block.json");



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: () => null
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map