import { InspectorControls, useBlockProps, useSetting } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, ColorPalette, Popover, __experimentalUnitControl as UnitControl, Spinner } from '@wordpress/components';
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
                            <div style={{ padding: '16px', minWidth: '260px', maxWidth: '300px' }}>
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
    if (/^[0-9.]+(px|%|vh|vw|rem|em)$/i.test(str)) return str;
    if (!isNaN(parseFloat(str)) && isFinite(str)) return `${parseFloat(str)}${defaultUnit}`;
    return str;
}

export default function Edit(props) {
    const { attributes, setAttributes } = props;
    const { style } = attributes;

    /* ── Resolved values ────────────────────────────────────────────── */
    const thumbRadiusVal = parseCssUnit(attributes.thumbBorderRadius, 'px') || '4px';
    const borderWidthVal = parseCssUnit(attributes.thumbBorderWidth, 'px') || '1px';
    const dimWidth       = style?.dimensions?.width ? parseCssUnit(style.dimensions.width, 'px') : '';
    const dimHeight      = style?.dimensions?.height ? parseCssUnit(style.dimensions.height, 'px') : '';
    const sizeVal        = dimWidth || dimHeight || parseCssUnit(attributes.filmstripSize, 'px') || '60px';

    const spGap = style?.spacing?.blockGap;
    let gapVal = '8px';
    if (typeof spGap === 'string') {
        gapVal = spGap.replace(/var:preset\|spacing\|([a-zA-Z0-9-]+)/g, 'var(--wp--preset--spacing--$1)');
    }

    /* ── Find all viewer blocks on the page ─────────────────────────── */
    const viewerBlocks = useSelect((select) => {
        const { getBlocksByName, getBlock, getBlocks } = select('core/block-editor');
        let blocks = [];
        if (typeof getBlocksByName === 'function') {
            const clientIds = getBlocksByName('arwai/azi-viewer') || [];
            blocks = clientIds.map(id => getBlock(id)).filter(Boolean);
        }
        if (!blocks || blocks.length === 0) {
            const findRecursive = (list) => {
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
    const linkedImageIds = useSelect((select) => {
        if (attributes.targetViewerId) {
            const linked = viewerBlocks.find(b => b.attributes?.viewerId === attributes.targetViewerId);
            if (linked) return linked.attributes?.imageIds || [];
        }
        if (viewerBlocks.length > 0) return viewerBlocks[0].attributes?.imageIds || [];
        return [];
    }, [attributes.targetViewerId, viewerBlocks]);

    /* ── Fetch WP Media objects for linked image IDs (for thumbs) ─────── */
    const mediaObjects = useSelect((select) => {
        if (!linkedImageIds || linkedImageIds.length === 0) return [];
        const { getMedia } = select('core');
        return linkedImageIds.map(id => getMedia(id)).filter(Boolean);
    }, [JSON.stringify(linkedImageIds)]);

    const isLoading = linkedImageIds.length > 0 && mediaObjects.length < linkedImageIds.length;

    /* ── Viewer selector options ─────────────────────────────────────── */
    const viewerOptions = [
        { label: __('Automatic (Nearest Viewer on Page)', 'arwai-azi-viewer'), value: '' },
        ...(viewerBlocks || []).map((block, idx) => ({
            label: block.attributes.viewerId
                ? `${__('Viewer', 'arwai-azi-viewer')} #${idx + 1} (${block.attributes.viewerId.substring(0, 8)}…)`
                : `${__('Viewer', 'arwai-azi-viewer')} #${idx + 1}`,
            value: block.attributes.viewerId || ''
        }))
    ];

    const containerBorderWidthVal  = parseCssUnit(attributes.containerBorderWidth, 'px');
    const containerBorderRadiusVal = parseCssUnit(attributes.containerBorderRadius, 'px');

    const blockProps = useBlockProps({
        className: 'arwai-aziv-sequence-filmstrip-wrap arwai-aziv-standalone-sequence-filmstrip',
        style: {
            boxSizing: 'border-box',
            width: '100%',
            ...(containerBorderWidthVal ? { borderWidth: containerBorderWidthVal } : {}),
            ...(attributes.containerBorderStyle ? { borderStyle: attributes.containerBorderStyle } : {}),
            ...(attributes.containerBorderColor ? { borderColor: attributes.containerBorderColor } : {}),
            ...(containerBorderRadiusVal ? { borderRadius: containerBorderRadiusVal } : {}),
            '--filmstrip-size': sizeVal,
            '--thumb-radius': thumbRadiusVal,
            '--thumb-border-width': borderWidthVal,
            '--thumb-border-color': attributes.thumbBorderColor || 'rgba(0,0,0,0.12)',
            '--thumb-hover-border-color': attributes.hoverBorderColor || '#3b82f6',
            '--thumb-selected-border-color': attributes.selectedBorderColor || '#2563eb',
        }
    });

    /* ── Decide what thumbnails to show ─────────────────────────────── */
    const thumbCount = linkedImageIds.length > 0 ? linkedImageIds.length : 3;
    const thumbItems = mediaObjects.length > 0
        ? mediaObjects.map((m, i) => ({
            key: m.id || i,
            src: m.media_details?.sizes?.thumbnail?.source_url || m.source_url,
            label: m.title?.rendered || `#${i + 1}`,
        }))
        : Array.from({ length: thumbCount }, (_, i) => ({ key: i, src: null, label: `#${i + 1}` }));

    return (
        <>
            {/* ── Inspector: Link ─────────────────────────────────────── */}
            <InspectorControls>
                <PanelBody title={__('Viewer Link', 'arwai-azi-viewer')} initialOpen={true}>
                    <SelectControl
                        label={__('Connect to Viewer Block', 'arwai-azi-viewer')}
                        value={attributes.targetViewerId || ''}
                        options={viewerOptions}
                        help={__('Select a specific Viewer block to control, or leave on Automatic.', 'arwai-azi-viewer')}
                        onChange={(val) => setAttributes({ targetViewerId: val })}
                    />
                    <ToggleControl
                        label={__('Hide on Mobile', 'arwai-azi-viewer')}
                        help={__('Automatically hide the filmstrip on mobile viewports (≤ 768 px).', 'arwai-azi-viewer')}
                        checked={false !== attributes.hideFilmstripMobile}
                        onChange={(val) => setAttributes({ hideFilmstripMobile: val })}
                    />
                </PanelBody>
            </InspectorControls>

            {/* ── Inspector: Styles ────────────────────────────────────── */}
            <InspectorControls group="styles">
                <PanelBody title={__('Thumbnail Styling', 'arwai-azi-viewer')} initialOpen={true}>
                    <UnitControl
                        label={__('Thumbnail Size', 'arwai-azi-viewer')}
                        value={attributes.filmstripSize || '60px'}
                        onChange={(val) => setAttributes({ filmstripSize: val })}
                    />
                    <UnitControl
                        label={__('Thumbnail Corner Radius', 'arwai-azi-viewer')}
                        value={attributes.thumbBorderRadius || '4px'}
                        onChange={(val) => setAttributes({ thumbBorderRadius: val })}
                    />
                    <UnitControl
                        label={__('Thumbnail Border Width', 'arwai-azi-viewer')}
                        value={attributes.thumbBorderWidth || '1px'}
                        onChange={(val) => setAttributes({ thumbBorderWidth: val })}
                    />
                    <SimpleColorControl
                        label={__('Default Border Color', 'arwai-azi-viewer')}
                        value={attributes.thumbBorderColor || 'rgba(0,0,0,0.12)'}
                        onChange={(val) => setAttributes({ thumbBorderColor: val })}
                    />
                    <SimpleColorControl
                        label={__('Hover Border Color', 'arwai-azi-viewer')}
                        value={attributes.hoverBorderColor || '#3b82f6'}
                        onChange={(val) => setAttributes({ hoverBorderColor: val })}
                    />
                    <SimpleColorControl
                        label={__('Active/Selected Border Color', 'arwai-azi-viewer')}
                        value={attributes.selectedBorderColor || '#2563eb'}
                        onChange={(val) => setAttributes({ selectedBorderColor: val })}
                    />
                </PanelBody>
                <PanelBody title={__('Container Border & Radius', 'arwai-azi-viewer')} initialOpen={false}>
                    <UnitControl
                        label={__('Container Border Width', 'arwai-azi-viewer')}
                        value={attributes.containerBorderWidth || ''}
                        onChange={(val) => setAttributes({ containerBorderWidth: val })}
                    />
                    <SelectControl
                        label={__('Container Border Style', 'arwai-azi-viewer')}
                        value={attributes.containerBorderStyle || ''}
                        options={[
                            { label: __('Solid', 'arwai-azi-viewer'), value: 'solid' },
                            { label: __('Dashed', 'arwai-azi-viewer'), value: 'dashed' },
                            { label: __('Dotted', 'arwai-azi-viewer'), value: 'dotted' },
                            { label: __('Double', 'arwai-azi-viewer'), value: 'double' },
                            { label: __('Groove', 'arwai-azi-viewer'), value: 'groove' },
                            { label: __('Ridge', 'arwai-azi-viewer'), value: 'ridge' },
                            { label: __('Inset', 'arwai-azi-viewer'), value: 'inset' },
                            { label: __('Outset', 'arwai-azi-viewer'), value: 'outset' },
                            { label: __('None', 'arwai-azi-viewer'), value: 'none' }
                        ]}
                        onChange={(val) => setAttributes({ containerBorderStyle: val })}
                    />
                    <SimpleColorControl
                        label={__('Container Border Color', 'arwai-azi-viewer')}
                        value={attributes.containerBorderColor || ''}
                        onChange={(val) => setAttributes({ containerBorderColor: val })}
                    />
                    <UnitControl
                        label={__('Container Border Radius', 'arwai-azi-viewer')}
                        value={attributes.containerBorderRadius || ''}
                        onChange={(val) => setAttributes({ containerBorderRadius: val })}
                    />
                </PanelBody>
            </InspectorControls>

            {/* ── WYSIWYG Canvas ──────────────────────────────────────── */}
            <div {...blockProps}>
                <button type="button" className="arwai-aziv-filmstrip-nav-btn arwai-aziv-filmstrip-nav-prev" style={{ pointerEvents: 'none' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <div className="arwai-aziv-filmstrip-fade arwai-aziv-filmstrip-fade-left"></div>
                {isLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#64748b', fontSize: '13px', padding: '12px' }}>
                        <Spinner />
                        {__('Loading thumbnails…', 'arwai-azi-viewer')}
                    </div>
                )}
                {!isLoading && (
                    <div className="arwai-aziv-filmstrip-scroll-container" style={{ display: 'flex', justifyContent: 'safe center', alignItems: 'center', gap: gapVal, overflowX: 'auto', padding: '10px 16px', boxSizing: 'border-box', width: '100%' }}>
                        {thumbItems.map((item, idx) => (
                            <div
                                key={item.key}
                                className={`arwai-aziv-filmstrip-thumb-item${idx === 0 ? ' active' : ''}`}
                                title={item.label}
                                style={{
                                    width: sizeVal,
                                    height: sizeVal,
                                    borderRadius: thumbRadiusVal,
                                    overflow: 'hidden',
                                    border: idx === 0
                                        ? `${borderWidthVal !== '0px' ? borderWidthVal : '2px'} solid ${attributes.selectedBorderColor || '#2563eb'}`
                                        : `${borderWidthVal} solid ${attributes.thumbBorderColor || 'rgba(0,0,0,0.12)'}`,
                                    opacity: idx === 0 ? 1 : 0.7,
                                    flexShrink: 0,
                                    backgroundColor: '#e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'opacity 0.15s, border-color 0.15s, transform 0.15s',
                                }}
                            >
                                {item.src
                                    ? <img src={item.src} alt={item.label}
                                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                                      />
                                    : <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600' }}>{item.label}</span>
                                }
                            </div>
                        ))}
                    </div>
                )}
                <div className="arwai-aziv-filmstrip-fade arwai-aziv-filmstrip-fade-right"></div>
                <button type="button" className="arwai-aziv-filmstrip-nav-btn arwai-aziv-filmstrip-nav-next" style={{ pointerEvents: 'none' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
        </>
    );
}
