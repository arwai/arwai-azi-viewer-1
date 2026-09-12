import { InspectorControls, useBlockProps, useSetting } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ColorPalette, Popover, __experimentalUnitControl as UnitControl } from '@wordpress/components';
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
    /* ── Find all viewer blocks in the page ─────────────────────────── */
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

    /* ── Resolve image count from linked/nearest viewer ─────────────── */
    const imageCount = useSelect((select) => {
        if (attributes.targetViewerId) {
            const linked = viewerBlocks.find(b => b.attributes?.viewerId === attributes.targetViewerId);
            if (linked) return (linked.attributes?.imageIds || []).length || 1;
        }
        if (viewerBlocks.length > 0) return (viewerBlocks[0].attributes?.imageIds || []).length || 1;
        return 1;
    }, [attributes.targetViewerId, viewerBlocks]);

    /* ── Viewer selector options ─────────────────────────────────────── */
    const viewerOptions = [
        { label: __('Automatic (Nearest Viewer on Page)', 'arwai-azi-viewer'), value: '' },
        ...(viewerBlocks || []).map((block, idx) => ({
            label: block.attributes?.viewerId
                ? `${__('Viewer', 'arwai-azi-viewer')} #${idx + 1} (${block.attributes.viewerId.substring(0, 8)}…)`
                : `${__('Viewer', 'arwai-azi-viewer')} #${idx + 1}`,
            value: block.attributes?.viewerId || ''
        }))
    ];

    const btnStyle = {
        background: 'none',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        borderRadius: '4px',
        lineHeight: 1,
    };

    const containerBorderWidthVal  = parseCssUnit(attributes.containerBorderWidth, 'px');
    const containerBorderRadiusVal = parseCssUnit(attributes.containerBorderRadius, 'px');

    const blockProps = useBlockProps({
        className: 'arwai-aziv-toolbar arwai-aziv-toolbar-wrap arwai-aziv-sequence-toolbar-wrap arwai-aziv-standalone-sequence-toolbar arwai-aziv-action-toolbar-wysiwyg-preview',
        style: {
            boxSizing: 'border-box',
            ...(containerBorderWidthVal ? { borderWidth: containerBorderWidthVal } : {}),
            ...(attributes.containerBorderStyle ? { borderStyle: attributes.containerBorderStyle } : {}),
            ...(attributes.containerBorderColor ? { borderColor: attributes.containerBorderColor } : {}),
            ...(containerBorderRadiusVal ? { borderRadius: containerBorderRadiusVal } : {}),
        },
        "data-target-viewer-id": attributes.targetViewerId || ''
    });

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
                </PanelBody>
            </InspectorControls>

            {/* ── Inspector: Styles ────────────────────────────────────── */}
            <InspectorControls group="styles">
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
                <button type="button" style={{ ...btnStyle, opacity: 0.35, cursor: 'not-allowed' }} title={__('Previous', 'arwai-azi-viewer')}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: '3ch', textAlign: 'center' }}>
                    1 / {imageCount}
                </span>
                <button type="button" style={btnStyle} title={__('Next', 'arwai-azi-viewer')}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </>
    );
}
