import { InspectorControls, useBlockProps, useSetting } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, ColorPalette, Popover, __experimentalUnitControl as UnitControl } from '@wordpress/components';
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

    const containerBorderWidthVal  = parseCssUnit(attributes.containerBorderWidth, 'px');
    const containerBorderRadiusVal = parseCssUnit(attributes.containerBorderRadius, 'px');

    const blockProps = useBlockProps({
        className: "arwai-aziv-action-toolbar-wysiwyg-preview arwai-aziv-action-toolbar arwai-aziv-action-toolbar-wrap",
        style: {
            boxSizing: 'border-box',
            ...(containerBorderWidthVal ? { borderWidth: containerBorderWidthVal } : {}),
            ...(attributes.containerBorderStyle ? { borderStyle: attributes.containerBorderStyle } : {}),
            ...(attributes.containerBorderColor ? { borderColor: attributes.containerBorderColor } : {}),
            ...(containerBorderRadiusVal ? { borderRadius: containerBorderRadiusVal } : {}),
        },
        "data-target-viewer-id": attributes.targetViewerId || ''
    });

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

    const viewerOptions = [
        { label: __('Automatic (Nearest Viewer on Page)', 'arwai-azi-viewer'), value: '' }
    ];

    if (viewerBlocks && viewerBlocks.length > 0) {
        viewerBlocks.forEach((block, idx) => {
            const vId = block.attributes?.viewerId;
            const label = vId
                ? `${__('Viewer Block', 'arwai-azi-viewer')} #${idx + 1} (${vId.substring(0, 8)}…)`
                : `${__('Viewer Block', 'arwai-azi-viewer')} #${idx + 1}`;
            viewerOptions.push({
                label: label,
                value: vId || ''
            });
        });
    }

    const showAnno = false !== attributes.showAnnotationsBtn;
    const showEnlarge = false !== attributes.showEnlargeBtn;
    const showInfo = false !== attributes.showInfoBtn;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Link & Buttons Configuration', 'arwai-azi-viewer')} initialOpen={true}>
                    <SelectControl
                        label={__('Connect to Viewer Block', 'arwai-azi-viewer')}
                        value={attributes.targetViewerId || ''}
                        options={viewerOptions}
                        help={__('Select a specific Image Viewer block to control, or leave on Automatic.', 'arwai-azi-viewer')}
                        onChange={(val) => setAttributes({ targetViewerId: val })}
                    />
                    <ToggleControl
                        label={__('Show Annotations Button', 'arwai-azi-viewer')}
                        checked={showAnno}
                        onChange={(val) => setAttributes({ showAnnotationsBtn: val })}
                    />
                    <ToggleControl
                        label={__('Show Enlarge Button', 'arwai-azi-viewer')}
                        checked={showEnlarge}
                        onChange={(val) => setAttributes({ showEnlargeBtn: val })}
                    />
                    <ToggleControl
                        label={__('Show Info Button', 'arwai-azi-viewer')}
                        checked={showInfo}
                        onChange={(val) => setAttributes({ showInfoBtn: val })}
                    />
                </PanelBody>
            </InspectorControls>

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

            <div {...blockProps}>
                {showAnno && (
                    <button type="button" className="arwai-aziv-action-toolbar-btn arwai-aziv-btn-notes" style={{ color: 'inherit' }} title={__('Show Annotations', 'arwai-azi-viewer')}>
                        <svg className="arwai-aziv-icon-eye-open" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>{__('Show Annotations', 'arwai-azi-viewer')}</span>
                    </button>
                )}
                {showEnlarge && (
                    <button type="button" className="arwai-aziv-action-toolbar-btn arwai-aziv-btn-enlarge" style={{ color: 'inherit' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                        <span>{__('Enlarge', 'arwai-azi-viewer')}</span>
                    </button>
                )}
                {showInfo && (
                    <button type="button" className="arwai-aziv-action-toolbar-btn arwai-aziv-btn-info" style={{ color: 'inherit' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <span>{__('Info', 'arwai-azi-viewer')}</span>
                    </button>
                )}
            </div>
        </>
    );
}
