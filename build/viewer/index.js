/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/viewer/edit.js"
/*!****************************!*\
  !*** ./src/viewer/edit.js ***!
  \****************************/
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
            border: '1px solid #cbd5e1',
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
function Edit(props) {
  const {
    attributes,
    setAttributes,
    clientId
  } = props;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    className: attributes.imageIds?.length > 0 ? "arwai-aziv-frontend-wrap arwai-aziv-wysiwyg-preview-wrap" : ""
  });
  const isDuplicateId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    if (!attributes.viewerId) return false;
    const {
      getBlocks
    } = select('core/block-editor');
    const allViewers = (getBlocks() || []).filter(b => b.name === 'arwai/azi-viewer');
    return allViewers.filter(b => b.attributes.viewerId === attributes.viewerId && b.clientId !== clientId).length > 0;
  }, [attributes.viewerId, clientId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!attributes.viewerId || isDuplicateId) {
      setAttributes({
        viewerId: clientId
      });
    }
  }, [attributes.viewerId, isDuplicateId, clientId]);
  const previewImages = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getMedia
    } = select('core');
    return (attributes.imageIds || []).map(id => getMedia(id)).filter(Boolean);
  }, [attributes.imageIds]);
  const viewerIndex = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getBlocks
    } = select('core/block-editor');
    const allBlocks = getBlocks() || [];
    const viewers = allBlocks.filter(b => b.name === 'arwai/azi-viewer');
    return viewers.findIndex(b => b.clientId === clientId) + 1;
  }, [clientId]);
  const imageSizeOptions = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const settings = select('core/block-editor').getSettings();
    const sizes = settings?.imageSizes || [];
    const sizeMap = new Map();
    sizeMap.set('', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use Global Default Settings', 'arwai-azi-viewer'));
    sizeMap.set('full', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Full Size (Original)', 'arwai-azi-viewer'));
    sizeMap.set('2048x2048', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('2048x2048 (2x Large)', 'arwai-azi-viewer'));
    sizeMap.set('1536x1536', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('1536x1536 (2x Medium Large)', 'arwai-azi-viewer'));
    sizeMap.set('large', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Large', 'arwai-azi-viewer'));
    sizeMap.set('medium_large', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Medium Large', 'arwai-azi-viewer'));
    sizeMap.set('medium', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Medium', 'arwai-azi-viewer'));
    sizeMap.set('thumbnail', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Thumbnail', 'arwai-azi-viewer'));
    sizes.forEach(s => {
      if (s.slug) {
        sizeMap.set(s.slug, s.name || s.slug);
      }
    });
    return Array.from(sizeMap.entries()).map(([value, label]) => ({
      label,
      value
    }));
  }, []);
  const displayId = attributes.viewerId ? `Viewer Block #${viewerIndex > 0 ? viewerIndex : '?'} (${attributes.viewerId.substring(0, 8)})` : '';
  const inspectorControls = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      group: "list",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Configuration & Linking', 'arwai-azi-viewer'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Viewer ID', 'arwai-azi-viewer'),
          value: displayId,
          readOnly: true,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use this ID in an Annotation List block to link them together.', 'arwai-azi-viewer')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Info Message (Overrides default)', 'arwai-azi-viewer'),
          value: attributes.infoMessage || '',
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter a custom text message or HTML formatting to display in the info popup box. If empty, the viewer will use the default message from global settings or auto-generate metadata.', 'arwai-azi-viewer'),
          onChange: val => setAttributes({
            infoMessage: val
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Stage Dimensions & Loading', 'arwai-azi-viewer'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Stage Height', 'arwai-azi-viewer'),
          value: attributes.height || '500px',
          onChange: val => setAttributes({
            height: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Stage Width', 'arwai-azi-viewer'),
          value: attributes.width || '100%',
          onChange: val => setAttributes({
            width: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Simple Viewer Image Size', 'arwai-azi-viewer'),
          value: attributes.simpleImageSize || '',
          options: imageSizeOptions,
          onChange: val => setAttributes({
            simpleImageSize: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('OpenSeadragon Zoom Modal Image Size', 'arwai-azi-viewer'),
          value: attributes.osdImageSize || '',
          options: imageSizeOptions,
          onChange: val => setAttributes({
            osdImageSize: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image Loading Method', 'arwai-azi-viewer'),
          value: attributes.loadingMethod || '',
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use Global Default Settings', 'arwai-azi-viewer'),
            value: ''
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Lazy Loading (Deferred)', 'arwai-azi-viewer'),
            value: 'lazy'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Eager Loading (Immediate)', 'arwai-azi-viewer'),
            value: 'eager'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto / Browser Default', 'arwai-azi-viewer'),
            value: 'auto'
          }],
          onChange: val => setAttributes({
            loadingMethod: val
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      group: "styles",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Local Overrides: Annotations', 'arwai-azi-viewer'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          style: {
            fontSize: '12px',
            fontStyle: 'italic',
            marginBottom: '16px'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Leave blank to use global settings.', 'arwai-azi-viewer')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Standard State', 'arwai-azi-viewer'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Annotation Popup Fill Color', 'arwai-azi-viewer'),
            value: attributes.overrideDefaultFillColor,
            onChange: val => setAttributes({
              overrideDefaultFillColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Annotation Popup Border Color', 'arwai-azi-viewer'),
            value: attributes.overrideDefaultBorderColor,
            onChange: val => setAttributes({
              overrideDefaultBorderColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ID Badge Background Color', 'arwai-azi-viewer'),
            value: attributes.overrideBadgeBg,
            onChange: val => setAttributes({
              overrideBadgeBg: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ID Badge Text Color', 'arwai-azi-viewer'),
            value: attributes.overrideBadgeTextColor,
            onChange: val => setAttributes({
              overrideBadgeTextColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ID Badge: Shadow CSS', 'arwai-azi-viewer'),
            value: attributes.overrideBadgeShadow,
            onChange: val => setAttributes({
              overrideBadgeShadow: val
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover State', 'arwai-azi-viewer'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover: Annotation Popup Fill Color', 'arwai-azi-viewer'),
            value: attributes.overrideHoverFillColor,
            onChange: val => setAttributes({
              overrideHoverFillColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover: Annotation Popup Border Color', 'arwai-azi-viewer'),
            value: attributes.overrideHoverBorderColor,
            onChange: val => setAttributes({
              overrideHoverBorderColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover: ID Badge Shadow', 'arwai-azi-viewer'),
            value: attributes.overrideHoverBadgeShadow,
            onChange: val => setAttributes({
              overrideHoverBadgeShadow: val
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected State', 'arwai-azi-viewer'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected: Annotation Popup Fill Color', 'arwai-azi-viewer'),
            value: attributes.overrideSelectedFillColor,
            onChange: val => setAttributes({
              overrideSelectedFillColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SimpleColorControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected: Annotation Popup Border Color', 'arwai-azi-viewer'),
            value: attributes.overrideSelectedBorderColor,
            onChange: val => setAttributes({
              overrideSelectedBorderColor: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected: ID Badge Shadow CSS', 'arwai-azi-viewer'),
            value: attributes.overrideSelectedBadgeShadow,
            onChange: val => setAttributes({
              overrideSelectedBadgeShadow: val
            })
          })]
        })]
      })
    })]
  });
  if (!attributes.imageIds?.length) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
      children: [inspectorControls, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaPlaceholder, {
          icon: "format-gallery",
          labels: {
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Annotated Image Viewer', 'arwai-azi-viewer'),
            instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Upload images or select from Media Library to create an annotated gallery.', 'arwai-azi-viewer')
          },
          onSelect: media => {
            const ids = media.map(item => item.id);
            setAttributes({
              imageIds: ids
            });
          },
          accept: "image/*",
          allowedTypes: ['image'],
          multiple: true
        })
      })]
    });
  }
  const firstImage = previewImages[0];
  const hasImages = firstImage && firstImage.source_url;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [inspectorControls, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "arwai-aziv-display-stage",
        style: {
          height: attributes.height || '500px',
          width: attributes.width || '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box'
        },
        children: [hasImages ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          style: {
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
            src: firstImage.source_url,
            style: {
              maxHeight: '100%',
              maxWidth: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              margin: '0 auto',
              display: 'block'
            },
            alt: ""
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "arwai-aziv-sample-wysiwyg-annotation-box",
            style: {
              position: 'absolute',
              top: '25%',
              left: '30%',
              width: '30%',
              height: '30%',
              backgroundColor: attributes.overrideDefaultFillColor || 'rgba(0, 0, 0, 0.25)',
              border: `2px solid ${attributes.overrideDefaultBorderColor || '#2563eb'}`,
              borderRadius: '4px',
              boxSizing: 'border-box',
              pointerEvents: 'none'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              style: {
                position: 'absolute',
                top: '-12px',
                left: '-12px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: attributes.overrideBadgeBg || '#2563eb',
                color: attributes.overrideBadgeTextColor || '#ffffff',
                boxShadow: attributes.overrideBadgeShadow || '0 2px 6px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 'bold'
              },
              children: "1"
            })
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          style: {
            textAlign: 'center',
            margin: '20px 0'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            className: "dashicons dashicons-format-gallery",
            style: {
              fontSize: '40px',
              width: '40px',
              height: '40px'
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h4", {
            style: {
              margin: '8px 0 2px 0',
              color: '#ffffff'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Annotated Image Viewer Block', 'arwai-azi-viewer')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          style: {
            position: 'absolute',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 10,
            background: 'rgba(15, 23, 42, 0.85)',
            padding: '8px 16px',
            borderRadius: '30px',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.1)',
            alignItems: 'center'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            style: {
              fontSize: '12px',
              color: '#94a3b8',
              marginRight: '6px'
            },
            children: `${attributes.imageIds.length} ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('images', 'arwai-azi-viewer')}`
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
            onSelect: media => {
              const ids = media.map(item => item.id);
              setAttributes({
                imageIds: ids
              });
            },
            allowedTypes: ['image'],
            multiple: true,
            gallery: true,
            value: attributes.imageIds,
            render: obj => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
              className: "components-button is-primary",
              onClick: obj.open,
              style: {
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '12px'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Edit / Reorder', 'arwai-azi-viewer')
            })
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

/***/ "./src/viewer/block.json"
/*!*******************************!*\
  !*** ./src/viewer/block.json ***!
  \*******************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"arwai/azi-viewer","version":"0.1.1","title":"Annotated Image Viewer","category":"media","icon":"format-gallery","description":"Renders a modern annotated image viewer stage and carousel. Pair with the Sequence Toolbar and Sequence Filmstrip blocks for navigation.","keywords":["annotator","image","gallery"],"supports":{"align":["left","center","right","wide","full"],"color":{"background":true,"text":true,"gradients":true},"background":{"backgroundImage":true,"backgroundSize":true},"spacing":{"margin":true,"padding":true,"blockGap":true},"border":{"color":true,"radius":true,"style":true,"width":true,"__experimentalSkipSerialization":false},"typography":{"fontSize":true,"lineHeight":true,"fontFamily":true,"__experimentalFontFamily":true,"fontWeight":true,"fontStyle":true,"letterSpacing":true},"dimensions":{"minHeight":true,"aspectRatio":false},"shadow":true},"textdomain":"arwai-azi-viewer","editorScript":"file:./index.js","viewScript":"file:./view.js","style":"file:../../assets/css/public.css","attributes":{"align":{"type":"string","default":""},"height":{"type":"string","default":"500px"},"width":{"type":"string","default":"100%"},"simpleImageSize":{"type":"string","default":""},"osdImageSize":{"type":"string","default":""},"loadingMethod":{"type":"string","default":""},"imageIds":{"type":"array","default":[]},"viewerId":{"type":"string","default":""},"infoMessage":{"type":"string","default":""},"overrideDefaultFillColor":{"type":"string","default":""},"overrideDefaultBorderColor":{"type":"string","default":""},"overrideBadgeBg":{"type":"string","default":""},"overrideBadgeTextColor":{"type":"string","default":""},"overrideBadgeShadow":{"type":"string","default":""},"overrideHoverFillColor":{"type":"string","default":""},"overrideHoverBorderColor":{"type":"string","default":""},"overrideHoverBadgeShadow":{"type":"string","default":""},"overrideSelectedFillColor":{"type":"string","default":""},"overrideSelectedBorderColor":{"type":"string","default":""},"overrideSelectedBadgeShadow":{"type":"string","default":""}}}');

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
/*!*****************************!*\
  !*** ./src/viewer/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/viewer/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/viewer/block.json");



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: () => null
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map