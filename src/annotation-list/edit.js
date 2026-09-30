import { InspectorControls, useBlockProps, useSetting } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl, ColorPicker, ColorPalette, Popover, Button, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

function SimpleColorControl({ label, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const themeColors = useSetting('color.palette');

    return (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#1e293b' }}>{label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative' }}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: '2px solid #cbd5e1',
                            backgroundColor: value || 'transparent',
                            cursor: 'pointer',
                            padding: 0,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            flexShrink: 0
                        }}
                        title={__('Select color', 'arwai-azi-viewer')}
                    />
                    {isOpen && (
                        <Popover position="bottom left" onClose={() => setIsOpen(false)}>
                            <div style={{ padding: '16px', minWidth: '300px', maxWidth: '400px' }}>
                                <ColorPalette
                                    colors={themeColors}
                                    value={value}
                                    onChange={(newColor) => onChange(newColor || '')}
                                    clearable={true}
                                    enableAlpha={true}
                                />
                            </div>
                        </Popover>
                    )}
                </div>
                <input
                    type="text"
                    className="components-text-control__input"
                    value={value || ''}
                    placeholder="#000000 or rgba(...)"
                    style={{ flex: 1, height: '32px', fontSize: '12px', padding: '0 8px' }}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
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

export default function Edit(props) {
    const { attributes, setAttributes } = props;

    const { backgroundColor, textColor, borderColor, fontSize, style } = attributes;

    const nativeBg = backgroundColor ? `var(--wp--preset--color--${backgroundColor})` : style?.color?.background;
    const nativeText = textColor ? `var(--wp--preset--color--${textColor})` : style?.color?.text;
    const nativeBorderColor = attributes.cardBorderColor ? attributes.cardBorderColor : (borderColor ? `var(--wp--preset--color--${borderColor})` : style?.border?.color);
    const nativeBorderStyle = attributes.cardBorderStyle ? attributes.cardBorderStyle : (style?.border?.style || 'solid');
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

    const blockProps = useBlockProps({
        className: "arwai-aziv-cards-wysiwyg-preview"
    });

    const viewerBlocks = useSelect((select) => {
        const { getBlocksByName, getBlock, getBlocks } = select('core/block-editor');
        if (typeof getBlocksByName === 'function') {
            const clientIds = getBlocksByName('arwai/azi-viewer') || [];
            return clientIds.map(id => getBlock(id)).filter(Boolean);
        }
        return (getBlocks() || []).filter(b => b.name === 'arwai/azi-viewer');
    }, []);

    const viewerOptions = [
        { label: __('Select a Simple Viewer Block...', 'arwai-azi-viewer'), value: '' }
    ];

    if (viewerBlocks && viewerBlocks.length > 0) {
        viewerBlocks.forEach((block, idx) => {
            const label = block.attributes.viewerId
                ? `${__('Viewer Block', 'arwai-azi-viewer')} #${idx + 1} (${block.attributes.viewerId.substring(0, 8)})`
                : `${__('Viewer Block', 'arwai-azi-viewer')} #${idx + 1} (${__('Uninitialized', 'arwai-azi-viewer')})`;
            viewerOptions.push({
                label: label,
                value: block.attributes.viewerId || ''
            });
        });
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout, Card Sizing & Alignment', 'arwai-azi-viewer')} initialOpen={true}>
                    <SelectControl
                        label={__('Connect to Viewer Block', 'arwai-azi-viewer')}
                        value={attributes.targetViewerId || ''}
                        options={viewerOptions}
                        onChange={(val) => setAttributes({ targetViewerId: val })}
                    />
                    <SelectControl
                        label={__('Card Layout Mode', 'arwai-azi-viewer')}
                        value={attributes.layoutMode || 'spread'}
                        options={[
                            { label: __('Spread out Grid (Default)', 'arwai-azi-viewer'), value: 'spread' },
                            { label: __('Stacked Cards Stack', 'arwai-azi-viewer'), value: 'stacked' },
                        ]}
                        onChange={(val) => setAttributes({ layoutMode: val })}
                    />
                    <ToggleControl
                        label={__('Show Top-Right Layout Toggle Button', 'arwai-azi-viewer')}
                        help={__('Allows frontend users to toggle between Spread and Stacked views.', 'arwai-azi-viewer')}
                        checked={attributes.showLayoutToggle !== undefined ? attributes.showLayoutToggle : true}
                        onChange={(val) => setAttributes({ showLayoutToggle: val })}
                    />
                    <RangeControl
                        label={__('Grid Columns', 'arwai-azi-viewer')}
                        value={attributes.columns}
                        min={1}
                        max={4}
                        onChange={(val) => setAttributes({ columns: val })}
                    />
                    <ToggleControl
                        label={__('Enable Text Truncation (...Read More)', 'arwai-azi-viewer')}
                        help={attributes.enableTruncation ? __('Long card descriptions will truncate with a Read More button.', 'arwai-azi-viewer') : __('Full text descriptions will always display expanded.', 'arwai-azi-viewer')}
                        checked={attributes.enableTruncation !== undefined ? attributes.enableTruncation : true}
                        onChange={(val) => setAttributes({ enableTruncation: val })}
                    />
                    {attributes.enableTruncation && (
                        <>
                            <RangeControl
                                label={__('Max Lines Before Truncating', 'arwai-azi-viewer')}
                                value={attributes.cardMaxLines || 3}
                                min={1}
                                max={10}
                                onChange={(val) => setAttributes({ cardMaxLines: val })}
                            />
                            <TextControl
                                label={__('Read More Button Label', 'arwai-azi-viewer')}
                                value={attributes.readMoreText || '...Read More'}
                                onChange={(val) => setAttributes({ readMoreText: val })}
                            />
                            <TextControl
                                label={__('Show Less Button Label', 'arwai-azi-viewer')}
                                value={attributes.showLessText || 'Show Less'}
                                onChange={(val) => setAttributes({ showLessText: val })}
                            />
                        </>
                    )}
                    <UnitControl
                        label={__('Card Minimum Width', 'arwai-azi-viewer')}
                        value={attributes.cardMinWidth !== undefined ? attributes.cardMinWidth : '280px'}
                        onChange={(val) => setAttributes({ cardMinWidth: val })}
                    />
                    <UnitControl
                        label={__('Card Maximum Width', 'arwai-azi-viewer')}
                        value={attributes.cardMaxWidth !== undefined ? attributes.cardMaxWidth : '100%'}
                        onChange={(val) => setAttributes({ cardMaxWidth: val })}
                    />
                    <SelectControl
                        label={__('Flex Horizontal Alignment (Justify Content)', 'arwai-azi-viewer')}
                        value={attributes.gridJustifyContent || 'start'}
                        options={[
                            { label: __('Start / Left (Default)', 'arwai-azi-viewer'), value: 'start' },
                            { label: __('Center', 'arwai-azi-viewer'), value: 'center' },
                            { label: __('End / Right', 'arwai-azi-viewer'), value: 'end' },
                            { label: __('Space Between', 'arwai-azi-viewer'), value: 'space-between' },
                            { label: __('Space Around', 'arwai-azi-viewer'), value: 'space-around' },
                            { label: __('Space Evenly', 'arwai-azi-viewer'), value: 'space-evenly' },
                        ]}
                        onChange={(val) => setAttributes({ gridJustifyContent: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Card Styles & Borders', 'arwai-azi-viewer')} initialOpen={true}>
                    <UnitControl
                        label={__('Card Border Width', 'arwai-azi-viewer')}
                        value={attributes.cardBorderWidth !== undefined ? attributes.cardBorderWidth : ''}
                        onChange={(val) => setAttributes({ cardBorderWidth: val })}
                    />
                    <SelectControl
                        label={__('Card Border Style', 'arwai-azi-viewer')}
                        value={attributes.cardBorderStyle || 'solid'}
                        options={[
                            { label: __('Solid (Default)', 'arwai-azi-viewer'), value: 'solid' },
                            { label: __('Dashed', 'arwai-azi-viewer'), value: 'dashed' },
                            { label: __('Dotted', 'arwai-azi-viewer'), value: 'dotted' },
                            { label: __('Double', 'arwai-azi-viewer'), value: 'double' },
                            { label: __('Groove', 'arwai-azi-viewer'), value: 'groove' },
                            { label: __('Ridge', 'arwai-azi-viewer'), value: 'ridge' },
                            { label: __('Inset', 'arwai-azi-viewer'), value: 'inset' },
                            { label: __('Outset', 'arwai-azi-viewer'), value: 'outset' },
                            { label: __('None', 'arwai-azi-viewer'), value: 'none' }
                        ]}
                        onChange={(val) => setAttributes({ cardBorderStyle: val })}
                    />
                    <SimpleColorControl
                        label={__('Card Border Color', 'arwai-azi-viewer')}
                        value={attributes.cardBorderColor || ''}
                        onChange={(val) => setAttributes({ cardBorderColor: val })}
                    />
                    <UnitControl
                        label={__('Card Border Radius', 'arwai-azi-viewer')}
                        value={attributes.cardBorderRadius !== undefined ? attributes.cardBorderRadius : ''}
                        onChange={(val) => setAttributes({ cardBorderRadius: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Interactive State Overrides', 'arwai-azi-viewer')} initialOpen={false}>

                    <PanelBody title={__('Hover State', 'arwai-azi-viewer')} initialOpen={false}>
                        <SimpleColorControl
                            label={__('Hover Card Background Color', 'arwai-azi-viewer')}
                            value={attributes.hoverBackgroundColor}
                            onChange={(val) => setAttributes({ hoverBackgroundColor: val })}
                        />
                        <SimpleColorControl
                            label={__('Hover Card Text Color', 'arwai-azi-viewer')}
                            value={attributes.hoverTextColor}
                            onChange={(val) => setAttributes({ hoverTextColor: val })}
                        />
                        <SimpleColorControl
                            label={__('Hover Card Border Color', 'arwai-azi-viewer')}
                            value={attributes.hoverBorderColor}
                            onChange={(val) => setAttributes({ hoverBorderColor: val })}
                        />
                    </PanelBody>

                    <PanelBody title={__('Selected State', 'arwai-azi-viewer')} initialOpen={false}>
                        <SimpleColorControl
                            label={__('Selected Card Background Color', 'arwai-azi-viewer')}
                            value={attributes.selectedBackgroundColor}
                            onChange={(val) => setAttributes({ selectedBackgroundColor: val })}
                        />
                        <SimpleColorControl
                            label={__('Selected Card Text Color', 'arwai-azi-viewer')}
                            value={attributes.selectedTextColor}
                            onChange={(val) => setAttributes({ selectedTextColor: val })}
                        />
                        <SimpleColorControl
                            label={__('Selected Card Border Color', 'arwai-azi-viewer')}
                            value={attributes.selectedBorderColor}
                            onChange={(val) => setAttributes({ selectedBorderColor: val })}
                        />
                    </PanelBody>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div
                    className={`arwai-aziv-cards-grid cols-${attributes.columns || 2} arwai-aziv-cards-wysiwyg-preview ${attributes.layoutMode === 'stacked' ? 'arwai-aziv-cards-stacked' : ''}`}
                    style={{
                        display: 'block',
                        gap: nativeGap,
                        justifyContent: attributes.gridJustifyContent || 'start',
                        '--grid-justify-content': attributes.gridJustifyContent || 'start',
                        '--card-min-width': parseCssUnit(attributes.cardMinWidth, 'px') || '280px',
                        '--card-max-width': parseCssUnit(attributes.cardMaxWidth, 'px') || '100%',
                        '--card-border-width': nativeBorderWidth,
                        '--card-border-style': nativeBorderStyle,
                        '--card-border-radius': nativeBorderRadius,
                        '--card-border-color': nativeBorderColor || '#cbd5e1',
                    }}
                >
                    {(attributes.showLayoutToggle !== false) && (
                        <div className="arwai-aziv-cards-block-header">
                            <div className="arwai-aziv-cards-layout-toggle" role="group" aria-label={__('Card layout mode', 'arwai-azi-viewer')}>
                                <button
                                    type="button"
                                    className={`arwai-aziv-btn-spread ${(!attributes.layoutMode || attributes.layoutMode === 'spread') ? 'active' : ''}`}
                                    onClick={() => setAttributes({ layoutMode: 'spread' })}
                                    title={__('Grid View', 'arwai-azi-viewer')}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                                    <span>{__('Grid', 'arwai-azi-viewer')}</span>
                                </button>
                                <button
                                    type="button"
                                    className={`arwai-aziv-btn-stacked ${(attributes.layoutMode === 'stacked') ? 'active' : ''}`}
                                    onClick={() => setAttributes({ layoutMode: 'stacked' })}
                                    title={__('Stacked View', 'arwai-azi-viewer')}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="5" rx="1"/></svg>
                                    <span>{__('Stacked', 'arwai-azi-viewer')}</span>
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Card 1: Standard State */}
                    <div
                        className="arwai-aziv-annotation-card-item"
                        style={{
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
                            zIndex: attributes.layoutMode === 'stacked' ? 10 : undefined,
                            '--card-bg': nativeBg || '#1e293b',
                            '--card-text': nativeText || '#f8fafc',
                            '--card-border-radius': nativeBorderRadius,
                            '--card-border-width': nativeBorderWidth,
                            '--card-border-style': nativeBorderStyle,
                            '--card-border-color': nativeBorderColor || '#cbd5e1',
                            '--card-shadow': nativeShadow
                        }}
                    >
                        <div className="arwai-aziv-card-header-bar" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                            <span className="arwai-aziv-card-badge-circle" style={{ background: '#2563eb', color: '#fff' }}>1</span>
                        </div>
                        <p style={{
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
                        }}>
                            {__('Demonstrates standard background, text, border, and flex card layout.', 'arwai-azi-viewer')}
                        </p>
                        {attributes.enableTruncation && (
                            <button type="button" className="arwai-aziv-card-expand-btn" style={{ pointerEvents: 'none' }}>
                                {attributes.readMoreText || '...Read More'}
                            </button>
                        )}
                        <div className="arwai-aziv-card-tags-footer" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                            <span className="arwai-aziv-card-tag-badge">#standard</span>
                        </div>
                        <div className="arwai-aziv-card-author-meta" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                            <strong className="arwai-aziv-author-name">{__('Standard State Card', 'arwai-azi-viewer')}</strong>
                            <span className="arwai-aziv-created-time">{__('2 hours ago', 'arwai-azi-viewer')}</span>
                        </div>
                    </div>

                    {/* Card 2: Hover State */}
                    <div
                        className="arwai-aziv-annotation-card-item arwai-aziv-hover-active"
                        style={{
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
                            zIndex: attributes.layoutMode === 'stacked' ? 9 : undefined,
                            '--card-bg': attributes.hoverBackgroundColor || nativeBg || '#334155',
                            '--card-text': attributes.hoverTextColor || nativeText || '#f8fafc',
                            '--card-border-radius': nativeBorderRadius,
                            '--card-border-width': nativeBorderWidth,
                            '--card-border-style': nativeBorderStyle,
                            '--card-border-color': attributes.hoverBorderColor || nativeBorderColor || 'transparent',
                            '--card-shadow': attributes.hoverShadow || nativeShadow || '0 8px 22px rgba(0, 0, 0, 0.15)'
                        }}
                    >
                        <div className="arwai-aziv-card-header-bar" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                            <span className="arwai-aziv-card-badge-circle" style={{ background: '#2563eb', color: '#fff' }}>2</span>
                        </div>
                        <p style={{ fontSize: '12px', margin: '0 0 8px 0', opacity: 0.9, flexGrow: 1 }}>{__('Demonstrates hover background, text, border, and shadow styles.', 'arwai-azi-viewer')}</p>
                        <div className="arwai-aziv-card-tags-footer" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                            <span className="arwai-aziv-card-tag-badge">#hover</span>
                        </div>
                        <div className="arwai-aziv-card-author-meta" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                            <strong className="arwai-aziv-author-name">{__('Hover State Card', 'arwai-azi-viewer')}</strong>
                            <span className="arwai-aziv-created-time">{__('1 hour ago', 'arwai-azi-viewer')}</span>
                        </div>
                    </div>

                    {/* Card 3: Selected State (if columns >= 3) */}
                    {(attributes.columns >= 3) && (
                        <div
                            className="arwai-aziv-annotation-card-item arwai-aziv-selected-card"
                            style={{
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
                                zIndex: attributes.layoutMode === 'stacked' ? 8 : undefined,
                                '--card-bg': attributes.selectedBackgroundColor || nativeBg || '#0f172a',
                                '--card-text': attributes.selectedTextColor || nativeText || '#ffffff',
                                '--card-border-radius': nativeBorderRadius,
                                '--card-border-width': nativeBorderWidth,
                                '--card-border-style': nativeBorderStyle,
                                '--card-border-color': attributes.selectedBorderColor || nativeBorderColor || '#2563eb',
                                '--card-shadow': attributes.selectedShadow || nativeShadow || '0 8px 24px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            <div className="arwai-aziv-card-header-bar" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                                <span className="arwai-aziv-card-badge-circle" style={{ background: '#2563eb', color: '#fff' }}>3</span>
                            </div>
                            <p style={{ fontSize: '12px', margin: '0 0 8px 0', opacity: 0.9, flexGrow: 1 }}>{__('Demonstrates selected background, text, border, and shadow styles.', 'arwai-azi-viewer')}</p>
                            <div className="arwai-aziv-card-tags-footer" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                                <span className="arwai-aziv-card-tag-badge">#selected</span>
                            </div>
                            <div className="arwai-aziv-card-author-meta" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                                <strong className="arwai-aziv-author-name">{__('Selected State Card', 'arwai-azi-viewer')}</strong>
                                <span className="arwai-aziv-created-time">{__('Just now', 'arwai-azi-viewer')}</span>
                            </div>
                        </div>
                    )}

                    {/* Card 4: Additional Card (if columns >= 4) */}
                    {(attributes.columns >= 4) && (
                        <div
                            className="arwai-aziv-annotation-card-item"
                            style={{
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
                                zIndex: attributes.layoutMode === 'stacked' ? 7 : undefined,
                                '--card-bg': nativeBg || '#1e293b',
                                '--card-text': nativeText || '#f8fafc',
                                '--card-border-radius': nativeBorderRadius,
                                '--card-border-width': nativeBorderWidth,
                                '--card-border-style': nativeBorderStyle,
                                '--card-border-style': nativeBorderStyle,
                                '--card-border-color': nativeBorderColor || '#cbd5e1',
                                '--card-shadow': nativeShadow
                            }}
                        >
                            <div className="arwai-aziv-card-header-bar" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                                <span className="arwai-aziv-card-badge-circle" style={{ background: '#2563eb', color: '#fff' }}>4</span>
                            </div>
                            <p style={{ fontSize: '12px', margin: '0 0 8px 0', opacity: 0.9, flexGrow: 1 }}>{__('Grid column layout preview.', 'arwai-azi-viewer')}</p>
                            <div className="arwai-aziv-card-tags-footer" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                                <span className="arwai-aziv-card-tag-badge">#preview</span>
                            </div>
                            <div className="arwai-aziv-card-author-meta" style={{ justifyContent: nativeTextAlign === 'center' ? 'center' : nativeTextAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                                <strong className="arwai-aziv-author-name">{__('Card Item #4', 'arwai-azi-viewer')}</strong>
                                <span className="arwai-aziv-created-time">{__('5 mins ago', 'arwai-azi-viewer')}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
