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

export default function Edit({ attributes, setAttributes }) {
    /* ── Resolved values ────────────────────────────────────────────── */
    const marginVal      = parseCssUnit(attributes.filmstripMargin, 'px') || '10px';
    const borderWidthVal = parseCssUnit(attributes.filmstripBorderWidth, 'px') || '0px';
    const borderRadiusVal = parseCssUnit(attributes.filmstripBorderRadius, 'px') || '6px';
    const thumbRadiusVal = parseCssUnit(attributes.filmstripThumbRadius, 'px') || '4px';
    const sizeVal        = parseCssUnit(attributes.filmstripSize, 'px') || '60px';

    /* ── Find all viewer blocks on the page ─────────────────────────── */
    const viewerBlocks = useSelect((select) => {
        const { getBlocksByName, getBlock, getBlocks } = select('core/block-editor');
        if (typeof getBlocksByName === 'function') {
            return (getBlocksByName('arwai/azi-viewer') || []).map(id => getBlock(id)).filter(Boolean);
        }
        return (getBlocks() || []).filter(b => b.name === 'arwai/azi-viewer');
    }, []);

    /* ── Resolve imageIds from linked/nearest viewer ─────────────────── */
    const linkedImageIds = useSelect((select) => {
        const { getBlocksByName, getBlock, getBlocks } = select('core/block-editor');
        let blocks = [];
        if (typeof getBlocksByName === 'function') {
            blocks = (getBlocksByName('arwai/azi-viewer') || []).map(id => getBlock(id)).filter(Boolean);
        } else {
            blocks = (getBlocks() || []).filter(b => b.name === 'arwai/azi-viewer');
        }
        if (attributes.targetViewerId) {
            const linked = blocks.find(b => b.attributes.viewerId === attributes.targetViewerId);
            if (linked) return linked.attributes.imageIds || [];
        }
        if (blocks.length > 0) return blocks[0].attributes.imageIds || [];
        return [];
    }, [attributes.targetViewerId]);

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

    /* ── Build filmstrip row inline style ───────────────────────────── */
    const rowStyle = {
        marginTop: marginVal,
        marginBottom: marginVal,
        backgroundColor: attributes.filmstripBgColor || undefined,
        border: borderWidthVal !== '0px' ? `${borderWidthVal} solid ${attributes.filmstripBorderColor || 'transparent'}` : undefined,
        borderRadius: borderRadiusVal,
        display: 'flex',
        justifyContent: 'center',
        padding: '8px 0',
    };

    const blockProps = useBlockProps({
        style: { boxSizing: 'border-box' }
    });

    /* ── Decide what thumbnails to show ─────────────────────────────── */
    // Build list: use real media objects if available, fallback to placeholder slots
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
                <PanelBody title={__('Filmstrip Styling', 'arwai-azi-viewer')} initialOpen={true}>
                    <UnitControl
                        label={__('Thumbnail Size', 'arwai-azi-viewer')}
                        value={attributes.filmstripSize || '60px'}
                        onChange={(val) => setAttributes({ filmstripSize: val })}
                    />
                    <UnitControl
                        label={__('Thumbnail Corner Radius', 'arwai-azi-viewer')}
                        value={attributes.filmstripThumbRadius || '4px'}
                        onChange={(val) => setAttributes({ filmstripThumbRadius: val })}
                    />
                    <UnitControl
                        label={__('Vertical Margin', 'arwai-azi-viewer')}
                        value={attributes.filmstripMargin || '10px'}
                        onChange={(val) => setAttributes({ filmstripMargin: val })}
                    />
                    <UnitControl
                        label={__('Border Width', 'arwai-azi-viewer')}
                        value={attributes.filmstripBorderWidth || '0px'}
                        onChange={(val) => setAttributes({ filmstripBorderWidth: val })}
                    />
                    <UnitControl
                        label={__('Border Radius', 'arwai-azi-viewer')}
                        value={attributes.filmstripBorderRadius || '6px'}
                        onChange={(val) => setAttributes({ filmstripBorderRadius: val })}
                    />
                    <SimpleColorControl
                        label={__('Background Color', 'arwai-azi-viewer')}
                        value={attributes.filmstripBgColor}
                        onChange={(val) => setAttributes({ filmstripBgColor: val })}
                    />
                    <SimpleColorControl
                        label={__('Border Color', 'arwai-azi-viewer')}
                        value={attributes.filmstripBorderColor}
                        onChange={(val) => setAttributes({ filmstripBorderColor: val })}
                    />
                </PanelBody>
            </InspectorControls>

            {/* ── WYSIWYG Canvas ──────────────────────────────────────── */}
            <div {...blockProps}>
                <div className="arwai-azi-viewer-filmstrip-row" style={rowStyle}>
                    {isLoading && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
                            <Spinner />
                            {__('Loading thumbnails…', 'arwai-azi-viewer')}
                        </div>
                    )}
                    {!isLoading && (
                        <div className="filmstrip-scroll-container" style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 4px' }}>
                            {thumbItems.map((item, idx) => (
                                <div
                                    key={item.key}
                                    className={`filmstrip-thumb-item${idx === 0 ? ' active' : ''}`}
                                    title={item.label}
                                    style={{
                                        width: sizeVal,
                                        height: sizeVal,
                                        borderRadius: thumbRadiusVal,
                                        overflow: 'hidden',
                                        border: idx === 0 ? '2px solid #3b82f6' : '1px solid rgba(0,0,0,0.12)',
                                        opacity: idx === 0 ? 1 : 0.6,
                                        flexShrink: 0,
                                        backgroundColor: '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'opacity 0.15s, border-color 0.15s',
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
                </div>
            </div>
        </>
    );
}
