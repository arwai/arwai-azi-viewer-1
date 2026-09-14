/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/annotation-list/edit.js"
/*!*************************************!*\
  !*** ./src/annotation-list/edit.js ***!
  \*************************************/
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
              minWidth: '300px',
              maxWidth: '400px'
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
  if (/^[0-9.]+(px|%|vh|vw|rem|em)$/i.test(str)) {
    return str;
  }
  if (!isNaN(parseFloat(str)) && isFinite(str)) {
    return `${parseFloat(str)}${defaultUnit}`;
  }
  return str;
}
function Edit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    backgroundColor,
    textColor,
    borderColor,
    fontSize,
    style
  } = attributes;
  const nativeBg = backgroundColor ? `var(--wp--preset--color--${backgroundColor})` : style?.color?.background;
  const nativeText = textColor ? `var(--wp--preset--color--${textColor})` : style?.color?.text;
  const nativeBorderColor = attributes.cardBorderColor ? attributes.cardBorderColor : borderColor ? `var(--wp--preset--color--${borderColor})` : style?.border?.color;
  const nativeBorderStyle = attributes.cardBorderStyle ? attributes.cardBorderStyle : style?.border?.style || 'solid';
  const nativeFontSize = fontSize ? `var(--wp--preset--font-size--${fontSize})` : style?.typography?.fontSize;
  const nativeFontFamily = style?.typography?.fontFamily;

  // Handle Radius (string or object)
  let nativeBorderRadius = attributes.cardBorderRadius ? parseCssUnit(attributes.cardBorderRadius, 'px') : '10px';
  if (!attributes.cardBorderRadius && style?.border?.radius) {
    const r = style.border.radius;
    if (typeof r === 'object') {
      nativeBorderRadius = `${parseCssUnit(r.topLeft, 'px') || '0px'} ${parseCssUnit(r.topRight, 'px') || '0px'} ${parseCssUnit(r.bottomRight, 'px') || '0px'} ${parseCssUnit(r.bottomLeft, 'px') || '0px'}`;
    } else {
      nativeBorderRadius = parseCssUnit(r, 'px');
    }
  }

  // Handle Width (string or object)
  let nativeBorderWidth = attributes.cardBorderWidth ? parseCssUnit(attributes.cardBorderWidth, 'px') : '';
  if (!attributes.cardBorderWidth && style?.border?.width) {
    const w = style.border.width;
    if (typeof w === 'object') {
      nativeBorderWidth = `${parseCssUnit(w.top, 'px') || '0px'} ${parseCssUnit(w.right, 'px') || '0px'} ${parseCssUnit(w.bottom, 'px') || '0px'} ${parseCssUnit(w.left, 'px') || '0px'}`;
    } else {
      nativeBorderWidth = parseCssUnit(w, 'px');
    }
  }
  if (!nativeBorderWidth) {
    nativeBorderWidth = '2px';
  }
  const rawShadow = style?.shadow || '';
  let nativeShadow = rawShadow;
  if (rawShadow.includes('var:preset|shadow|')) {
    nativeShadow = rawShadow.replace('var:preset|shadow|', 'var(--wp--preset--shadow--');
    if (!nativeShadow.endsWith(')')) {
      nativeShadow += ')';
    }
  }

  // Min height
  const nativeMinHeight = style?.dimensions?.minHeight || '0px';

  // Padding
  let nativePadding = '16px';
  const sp = style?.spacing?.padding;
  if (typeof sp === 'string') {
    nativePadding = sp.replace(/var:preset\|spacing\|([a-zA-Z0-9-]+)/g, 'var(--wp--preset--spacing--$1)');
  } else if (sp && typeof sp === 'object') {
    nativePadding = `${sp.top || '0px'} ${sp.right || '0px'} ${sp.bottom || '0px'} ${sp.left || '0px'}`;
    nativePadding = nativePadding.replace(/var:preset\|spacing\|([a-zA-Z0-9-]+)/g, 'var(--wp--preset--spacing--$1)');
  }

  // Gap
  const spGap = style?.spacing?.blockGap;
  let nativeGap = '16px';
  if (typeof spGap === 'string') {
    nativeGap = spGap.replace(/var:preset\|spacing\|([a-zA-Z0-9-]+)/g, 'var(--wp--preset--spacing--$1)');
  }

  // Text Align
  const nativeTextAlign = style?.typography?.textAlign || 'left';
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    className: "arwai-aziv-cards-wysiwyg-preview"
  });
  const viewerBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getBlocksByName,
      getBlock,
      getBlocks
    } = select('core/block-editor');
    if (typeof getBlocksByName === 'function') {
      const clientIds = getBlocksByName('arwai/azi-viewer') || [];
      return clientIds.map(id => getBlock(id)).filter(Boolean);
    }
    return (getBlocks() || []).filter(b => b.name === 'arwai/azi-viewer');
  }, []);
  const viewerOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a Simple Viewer Block...', 'arwai-azi-viewer'),
    value: ''
  }];
  if (viewerBlocks && viewerBlocks.length > 0) {
    viewerBlocks.forEach((block, idx) => {
      const label = block.attributes.viewerId ? `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Viewer Block', 'arwai-azi-viewer')} #${idx + 1} (${block.attributes.viewerId.substring(0, 8)})` : `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Viewer Block', 'arwai-azi-viewer')} #${idx + 1} (${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Uninitialized', 'arwai-azi-viewer')})`;
      viewerOptions.push({
        label: label,
        value: block.attributes.viewerId || ''
      });
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Layout, Card Sizing & Alignment', 'arwai-azi-viewer'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connect to Viewer Block', 'arwai-azi-viewer'),
          value: attributes.targetViewerId || '',
          options: viewerOptions,
          onChange: val => setAttributes({
            targetViewerId: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Grid Columns', 'arwai-azi-viewer'),
          value: attributes.columns,
          min: 1,
          max: 4,
          onChange: val => setAttributes({
            columns: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Text Truncation (...Read More)', 'arwai-azi-viewer'),
          help: attributes.enableTruncation ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Long card descriptions will truncate with a Read More button.', 'arwai-azi-viewer') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Full text descriptions will always display expanded.', 'arwai-azi-viewer'),
          checked: attributes.enableTruncation !== undefined ? attributes.enableTruncation : true,
          onChange: val => setAttributes({
            enableTruncation: val
          })
        }), attributes.enableTruncation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Max Lines Before Truncating', 'arwai-azi-viewer'),
            value: attributes.cardMaxLines || 3,
            min: 1,
            max: 10,
            onChange: val => setAttributes({
              cardMaxLines: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Read More Button Label', 'arwai-azi-viewer'),
            value: attributes.readMoreText || '...Read More',
            onChange: val => setAttributes({
              readMoreText: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Less Button Label', 'arwai-azi-viewer'),
            value: attributes.showLessText || 'Show Less',
            onChange: val => setAttributes({
              showLessText: val
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Card Minimum Width', 'arwai-azi-viewer'),
          value: attributes.cardMinWidth !== undefined ? attributes.cardMinWidth : '280px',
          onChange: val => setAttributes({
            cardMinWidth: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Card Maximum Width', 'arwai-azi-viewer'),
          value: attributes.cardMaxWidth !== undefined ? attributes.cardMaxWidth : '100%',
          onChange: val => setAttributes({
            cardMaxWidth: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Flex Horizontal Alignment (Justify Content)', 'arwai-azi-viewer'),
          value: attributes.gridJustifyContent || 'start',
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Start / Left (Default)', 'arwai-azi-viewer'),
            value: 'start'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Center', 'arwai-azi-viewer'),
            value: 'center'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('End / Right', 'arwai-azi-viewer'),
            value: 'end'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Space Between', 'arwai-azi-viewer'),
            value: 'space-between'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Space Around', 'arwai-azi-viewer'),
            value: 'space-around'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Space Evenly', 'arwai-azi-viewer'),
            value: 'space-evenly'
          }],
          onChange: val => setAttributes({
            gridJustifyContent: val
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Card Styles & Borders', 'arwai-azi-viewer'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Card Border Width', 'arwai-azi-viewer'),
          value: attributes.cardBorderWidth !== undefined ? attributes.cardBorderWidth : '',
          onChange: val => setAttributes({
            cardBorderWidth: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Card Border Style', 'arwai-azi-viewer'),
          value: attributes.cardBorderStyle || 'solid',
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Solid (Default)', 'arwai-azi-viewer'),
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
            cardBorderStyle: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Card Border Color', 'arwai-azi-viewer'),
          value: attributes.cardBorderColor || '',
          onChange: val => setAttributes({
            cardBorderColor: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Card Border Radius', 'arwai-azi-viewer'),
          value: attributes.cardBorderRadius !== undefined ? attributes.cardBorderRadius : '',
          onChange: val => setAttributes({
            cardBorderRadius: val
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Interactive State Overrides', 'arwai-azi-viewer'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover State', 'arwai-azi-viewer'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover Card Background Color', 'arwai-azi-viewer'),
            value: attributes.hoverBackgroundColor,
            onChange: val => setAttributes({
              hoverBackgroundColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover Card Text Color', 'arwai-azi-viewer'),
            value: attributes.hoverTextColor,
            onChange: val => setAttributes({
              hoverTextColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover Card Border Color', 'arwai-azi-viewer'),
            value: attributes.hoverBorderColor,
            onChange: val => setAttributes({
              hoverBorderColor: val
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected State', 'arwai-azi-viewer'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected Card Background Color', 'arwai-azi-viewer'),
            value: attributes.selectedBackgroundColor,
            onChange: val => setAttributes({
              selectedBackgroundColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected Card Text Color', 'arwai-azi-viewer'),
            value: attributes.selectedTextColor,
            onChange: val => setAttributes({
              selectedTextColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected Card Border Color', 'arwai-azi-viewer'),
            value: attributes.selectedBorderColor,
            onChange: val => setAttributes({
              selectedBorderColor: val
            })
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: `arwai-aziv-cards-grid cols-${attributes.columns || 2} arwai-aziv-cards-wysiwyg-preview`,
        style: {
          display: 'block',
          gap: nativeGap,
          justifyContent: attributes.gridJustifyContent || 'start',
          '--grid-justify-content': attributes.gridJustifyContent || 'start',
          '--card-min-width': parseCssUnit(attributes.cardMinWidth, 'px') || '280px',
          '--card-max-width': parseCssUnit(attributes.cardMaxWidth, 'px') || '100%',
          '--card-border-width': nativeBorderWidth,
          '--card-border-style': nativeBorderStyle,
          '--card-border-radius': nativeBorderRadius,
          '--card-border-color': nativeBorderColor || '#cbd5e1'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "arwai-aziv-annotation-card-item",
          style: {
            flex: `1 1 ${parseCssUnit(attributes.cardMinWidth, 'px') || '280px'}`,
            maxWidth: parseCssUnit(attributes.cardMaxWidth, 'px') || '100%',
            background: nativeBg || '#1e293b',
            color: nativeText || '#f8fafc',
            borderWidth: nativeBorderWidth,
            borderStyle: nativeBorderStyle,
            borderColor: nativeBorderColor || '#cbd5e1',
            border: `${nativeBorderWidth} ${nativeBorderStyle} ${nativeBorderColor || '#cbd5e1'}`,
            borderRadius: nativeBorderRadius,
            padding: nativePadding,
            minHeight: nativeMinHeight,
            textAlign: nativeTextAlign,
            fontSize: nativeFontSize,
            fontFamily: nativeFontFamily,
            boxShadow: nativeShadow,
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            '--card-bg': nativeBg || '#1e293b',
            '--card-text': nativeText || '#f8fafc',
            '--card-border-radius': nativeBorderRadius,
            '--card-border-width': nativeBorderWidth,
            '--card-border-style': nativeBorderStyle,
            '--card-border-color': nativeBorderColor || '#cbd5e1',
            '--card-shadow': nativeShadow
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "arwai-aziv-card-header-bar",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-card-badge-circle",
              style: {
                background: '#2563eb',
                color: '#fff'
              },
              children: "1"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            style: {
              fontSize: '1em',
              margin: '0 0 8px 0',
              opacity: 0.9,
              flexGrow: 1,
              ...(attributes.enableTruncation ? {
                WebkitLineClamp: attributes.cardMaxLines || 3,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box',
                overflow: 'hidden'
              } : {})
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Demonstrates standard background, text, border, and flex card layout.', 'arwai-azi-viewer')
          }), attributes.enableTruncation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
            type: "button",
            className: "arwai-aziv-card-expand-btn",
            style: {
              pointerEvents: 'none'
            },
            children: attributes.readMoreText || '...Read More'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "arwai-aziv-card-tags-footer",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-card-tag-badge",
              children: "#standard"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "arwai-aziv-card-author-meta",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong", {
              className: "arwai-aziv-author-name",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Standard State Card', 'arwai-azi-viewer')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-created-time",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('2 hours ago', 'arwai-azi-viewer')
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "arwai-aziv-annotation-card-item arwai-aziv-hover-active",
          style: {
            flex: `1 1 ${parseCssUnit(attributes.cardMinWidth, 'px') || '280px'}`,
            maxWidth: parseCssUnit(attributes.cardMaxWidth, 'px') || '100%',
            background: attributes.hoverBackgroundColor || nativeBg || '#334155',
            color: attributes.hoverTextColor || nativeText || '#f8fafc',
            borderWidth: nativeBorderWidth,
            borderStyle: nativeBorderStyle,
            borderColor: attributes.hoverBorderColor || nativeBorderColor || 'transparent',
            border: `${nativeBorderWidth} ${nativeBorderStyle} ${attributes.hoverBorderColor || nativeBorderColor || 'transparent'}`,
            borderRadius: nativeBorderRadius,
            padding: nativePadding,
            minHeight: nativeMinHeight,
            textAlign: nativeTextAlign,
            boxShadow: attributes.hoverShadow || nativeShadow || '0 8px 22px rgba(0, 0, 0, 0.15)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            '--card-bg': attributes.hoverBackgroundColor || nativeBg || '#334155',
            '--card-text': attributes.hoverTextColor || nativeText || '#f8fafc',
            '--card-border-radius': nativeBorderRadius,
            '--card-border-width': nativeBorderWidth,
            '--card-border-style': nativeBorderStyle,
            '--card-border-color': attributes.hoverBorderColor || nativeBorderColor || 'transparent',
            '--card-shadow': attributes.hoverShadow || nativeShadow || '0 8px 22px rgba(0, 0, 0, 0.15)'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "arwai-aziv-card-header-bar",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-card-badge-circle",
              style: {
                background: '#2563eb',
                color: '#fff'
              },
              children: "2"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            style: {
              fontSize: '12px',
              margin: '0 0 8px 0',
              opacity: 0.9,
              flexGrow: 1
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Demonstrates hover background, text, border, and shadow styles.', 'arwai-azi-viewer')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "arwai-aziv-card-tags-footer",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-card-tag-badge",
              children: "#hover"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "arwai-aziv-card-author-meta",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong", {
              className: "arwai-aziv-author-name",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover State Card', 'arwai-azi-viewer')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-created-time",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('1 hour ago', 'arwai-azi-viewer')
            })]
          })]
        }), attributes.columns >= 3 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "arwai-aziv-annotation-card-item arwai-aziv-selected-card",
          style: {
            flex: `1 1 ${parseCssUnit(attributes.cardMinWidth, 'px') || '280px'}`,
            maxWidth: parseCssUnit(attributes.cardMaxWidth, 'px') || '100%',
            background: attributes.selectedBackgroundColor || nativeBg || '#0f172a',
            color: attributes.selectedTextColor || nativeText || '#ffffff',
            borderWidth: nativeBorderWidth,
            borderStyle: nativeBorderStyle,
            borderColor: attributes.selectedBorderColor || nativeBorderColor || '#2563eb',
            border: `${nativeBorderWidth} ${nativeBorderStyle} ${attributes.selectedBorderColor || nativeBorderColor || '#2563eb'}`,
            borderRadius: nativeBorderRadius,
            padding: nativePadding,
            minHeight: nativeMinHeight,
            textAlign: nativeTextAlign,
            boxShadow: attributes.selectedShadow || nativeShadow || '0 8px 24px rgba(0, 0, 0, 0.2)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            '--card-bg': attributes.selectedBackgroundColor || nativeBg || '#0f172a',
            '--card-text': attributes.selectedTextColor || nativeText || '#ffffff',
            '--card-border-radius': nativeBorderRadius,
            '--card-border-width': nativeBorderWidth,
            '--card-border-style': nativeBorderStyle,
            '--card-border-color': attributes.selectedBorderColor || nativeBorderColor || '#2563eb',
            '--card-shadow': attributes.selectedShadow || nativeShadow || '0 8px 24px rgba(0, 0, 0, 0.2)'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "arwai-aziv-card-header-bar",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-card-badge-circle",
              style: {
                background: '#2563eb',
                color: '#fff'
              },
              children: "3"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            style: {
              fontSize: '12px',
              margin: '0 0 8px 0',
              opacity: 0.9,
              flexGrow: 1
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Demonstrates selected background, text, border, and shadow styles.', 'arwai-azi-viewer')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "arwai-aziv-card-tags-footer",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-card-tag-badge",
              children: "#selected"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "arwai-aziv-card-author-meta",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong", {
              className: "arwai-aziv-author-name",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected State Card', 'arwai-azi-viewer')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-created-time",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Just now', 'arwai-azi-viewer')
            })]
          })]
        }), attributes.columns >= 4 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "arwai-aziv-annotation-card-item",
          style: {
            flex: `1 1 ${parseCssUnit(attributes.cardMinWidth, 'px') || '280px'}`,
            maxWidth: parseCssUnit(attributes.cardMaxWidth, 'px') || '100%',
            background: nativeBg || '#1e293b',
            color: nativeText || '#f8fafc',
            borderWidth: nativeBorderWidth,
            borderStyle: nativeBorderStyle,
            borderColor: nativeBorderColor || '#cbd5e1',
            border: `${nativeBorderWidth} ${nativeBorderStyle} ${nativeBorderColor || '#cbd5e1'}`,
            borderRadius: nativeBorderRadius,
            padding: nativePadding,
            minHeight: nativeMinHeight,
            textAlign: nativeTextAlign,
            boxShadow: nativeShadow,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            '--card-bg': nativeBg || '#1e293b',
            '--card-text': nativeText || '#f8fafc',
            '--card-border-radius': nativeBorderRadius,
            '--card-border-width': nativeBorderWidth,
            '--card-border-style': nativeBorderStyle,
            '--card-border-color': nativeBorderColor || '#cbd5e1',
            '--card-shadow': nativeShadow
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "arwai-aziv-card-header-bar",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-card-badge-circle",
              style: {
                background: '#2563eb',
                color: '#fff'
              },
              children: "4"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            style: {
              fontSize: '12px',
              margin: '0 0 8px 0',
              opacity: 0.9,
              flexGrow: 1
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Grid column layout preview.', 'arwai-azi-viewer')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "arwai-aziv-card-tags-footer",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-card-tag-badge",
              children: "#preview"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "arwai-aziv-card-author-meta",
            style: {
              justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong", {
              className: "arwai-aziv-author-name",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Card Item #4', 'arwai-azi-viewer')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "arwai-aziv-created-time",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('5 mins ago', 'arwai-azi-viewer')
            })]
          })]
        })]
      })
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

/***/ "./src/annotation-list/block.json"
/*!****************************************!*\
  !*** ./src/annotation-list/block.json ***!
  \****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"arwai/azi-viewer-annotation-list","version":"0.1.1","title":"Annotation Cards List","category":"widgets","icon":"list-view","description":"Displays annotations as clean individual cards with circular ID badges, authors, dates, and tags.","keywords":["annotations","cards","list"],"supports":{"align":["left","center","right","wide","full"],"color":{"background":true,"text":true,"gradients":true,"__experimentalSkipSerialization":true},"spacing":{"margin":true,"padding":true,"blockGap":true,"__experimentalSkipSerialization":["padding"]},"border":{"color":true,"radius":true,"style":true,"width":true,"__experimentalSkipSerialization":true},"typography":{"fontSize":true,"lineHeight":true,"fontFamily":true,"__experimentalFontFamily":true,"fontWeight":true,"fontStyle":true,"letterSpacing":true,"textAlign":true},"shadow":{"__experimentalSkipSerialization":true}},"textdomain":"arwai-azi-viewer","editorScript":"file:./index.js","viewScript":"file:./view.js","style":"file:../../assets/css/public.css","attributes":{"align":{"type":"string","default":""},"enableTruncation":{"type":"boolean","default":true},"cardMaxLines":{"type":"number","default":3},"cardMinWidth":{"type":"string","default":"280px"},"cardMaxWidth":{"type":"string","default":"100%"},"gridJustifyContent":{"type":"string","default":"start"},"readMoreText":{"type":"string","default":"...Read More"},"showLessText":{"type":"string","default":"Show Less"},"postId":{"type":"number","default":0},"columns":{"type":"number","default":2},"targetViewerId":{"type":"string","default":""},"hoverBackgroundColor":{"type":"string","default":"#f8fafc"},"hoverTextColor":{"type":"string","default":""},"hoverBorderColor":{"type":"string","default":"#cbd5e1"},"selectedBackgroundColor":{"type":"string","default":"#f1f5f9"},"selectedTextColor":{"type":"string","default":"#0f172a"},"selectedBorderColor":{"type":"string","default":"#0f172a"},"cardBorderWidth":{"type":"string","default":""},"cardBorderColor":{"type":"string","default":""},"cardBorderRadius":{"type":"string","default":""},"cardBorderStyle":{"type":"string","default":"solid"}}}');

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
/*!**************************************!*\
  !*** ./src/annotation-list/index.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/annotation-list/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/annotation-list/block.json");



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: () => null
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map