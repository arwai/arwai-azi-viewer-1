import { InspectorControls, BlockControls, BlockAlignmentToolbar, useBlockProps, MediaPlaceholder, MediaUpload, MediaUploadCheck, useSetting } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, TextareaControl, TextControl, ColorPicker, ColorPalette, Popover, Button, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
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
                            border: '1px solid #cbd5e1',
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

export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;

    const blockProps = useBlockProps({
        className: attributes.imageIds?.length > 0 ? "arwai-aziv-frontend-wrap arwai-aziv-wysiwyg-preview-wrap" : "",
    });

    const isDuplicateId = useSelect((select) => {
        if (!attributes.viewerId) return false;
        const { getBlocks } = select('core/block-editor');
        const allViewers = (getBlocks() || []).filter(b => b.name === 'arwai/azi-viewer');
        return allViewers.filter(b => b.attributes.viewerId === attributes.viewerId && b.clientId !== clientId).length > 0;
    }, [attributes.viewerId, clientId]);

    useEffect(() => {
        if (!attributes.viewerId || isDuplicateId) {
            setAttributes({ viewerId: clientId });
        }
    }, [attributes.viewerId, isDuplicateId, clientId]);

    const previewImages = useSelect((select) => {
        const { getMedia } = select('core');
        return (attributes.imageIds || []).map(id => getMedia(id)).filter(Boolean);
    }, [attributes.imageIds]);

    const viewerIndex = useSelect((select) => {
        const { getBlocks } = select('core/block-editor');
        const allBlocks = getBlocks() || [];
        const viewers = allBlocks.filter(b => b.name === 'arwai/azi-viewer');
        return viewers.findIndex(b => b.clientId === clientId) + 1;
    }, [clientId]);

    const imageSizeOptions = useSelect((select) => {
        const settings = select('core/block-editor').getSettings();
        const sizes = settings?.imageSizes || [];

        const sizeMap = new Map();
        sizeMap.set('', __('Use Global Default Settings', 'arwai-azi-viewer'));
        sizeMap.set('full', __('Full Size (Original)', 'arwai-azi-viewer'));
        sizeMap.set('2048x2048', __('2048x2048 (2x Large)', 'arwai-azi-viewer'));
        sizeMap.set('1536x1536', __('1536x1536 (2x Medium Large)', 'arwai-azi-viewer'));
        sizeMap.set('large', __('Large', 'arwai-azi-viewer'));
        sizeMap.set('medium_large', __('Medium Large', 'arwai-azi-viewer'));
        sizeMap.set('medium', __('Medium', 'arwai-azi-viewer'));
        sizeMap.set('thumbnail', __('Thumbnail', 'arwai-azi-viewer'));

        sizes.forEach((s) => {
            if (s.slug) {
                sizeMap.set(s.slug, s.name || s.slug);
            }
        });

        return Array.from(sizeMap.entries()).map(([value, label]) => ({
            label,
            value,
        }));
    }, []);

    const displayId = attributes.viewerId ? `Viewer Block #${viewerIndex > 0 ? viewerIndex : '?'} (${attributes.viewerId.substring(0, 8)})` : '';


    const inspectorControls = (
        <>
            <InspectorControls group="list">
                <PanelBody title={__('Configuration & Linking', 'arwai-azi-viewer')} initialOpen={true}>
                    <TextControl
                        label={__('Viewer ID', 'arwai-azi-viewer')}
                        value={displayId}
                        readOnly={true}
                        help={__('Use this ID in an Annotation List block to link them together.', 'arwai-azi-viewer')}
                    />
                    <TextareaControl
                        label={__('Custom Info Message (Overrides default)', 'arwai-azi-viewer')}
                        value={attributes.infoMessage || ''}
                        help={__('Enter a custom text message or HTML formatting to display in the info popup box. If empty, the viewer will use the default message from global settings or auto-generate metadata.', 'arwai-azi-viewer')}
                        onChange={(val) => setAttributes({ infoMessage: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <InspectorControls>

                <PanelBody title={__('Stage Dimensions & Loading', 'arwai-azi-viewer')} initialOpen={false}>
                    <UnitControl
                        label={__('Stage Height', 'arwai-azi-viewer')}
                        value={attributes.height || '500px'}
                        onChange={(val) => setAttributes({ height: val })}
                    />
                    <UnitControl
                        label={__('Stage Width', 'arwai-azi-viewer')}
                        value={attributes.width || '100%'}
                        onChange={(val) => setAttributes({ width: val })}
                    />
                    <SelectControl
                        label={__('Simple Viewer Image Size', 'arwai-azi-viewer')}
                        value={attributes.simpleImageSize || ''}
                        options={imageSizeOptions}
                        onChange={(val) => setAttributes({ simpleImageSize: val })}
                    />
                    <SelectControl
                        label={__('OpenSeadragon Zoom Modal Image Size', 'arwai-azi-viewer')}
                        value={attributes.osdImageSize || ''}
                        options={imageSizeOptions}
                        onChange={(val) => setAttributes({ osdImageSize: val })}
                    />
                    <SelectControl
                        label={__('Image Loading Method', 'arwai-azi-viewer')}
                        value={attributes.loadingMethod || ''}
                        options={[
                            { label: __('Use Global Default Settings', 'arwai-azi-viewer'), value: '' },
                            { label: __('Lazy Loading (Deferred)', 'arwai-azi-viewer'), value: 'lazy' },
                            { label: __('Eager Loading (Immediate)', 'arwai-azi-viewer'), value: 'eager' },
                            { label: __('Auto / Browser Default', 'arwai-azi-viewer'), value: 'auto' },
                        ]}
                        onChange={(val) => setAttributes({ loadingMethod: val })}
                    />
                </PanelBody>

            </InspectorControls>

            <InspectorControls group="styles">
                <PanelBody title={__('Local Overrides: Annotations', 'arwai-azi-viewer')} initialOpen={false}>
                    <p style={{ fontSize: '12px', fontStyle: 'italic', marginBottom: '16px' }}>{__('Leave blank to use global settings.', 'arwai-azi-viewer')}</p>

                    <PanelBody title={__('Standard State', 'arwai-azi-viewer')} initialOpen={false}>
                        <SimpleColorControl
                            label={__('Annotation Popup Fill Color', 'arwai-azi-viewer')}
                            value={attributes.overrideDefaultFillColor}
                            onChange={(val) => setAttributes({ overrideDefaultFillColor: val })}
                        />
                        <SimpleColorControl
                            label={__('Annotation Popup Border Color', 'arwai-azi-viewer')}
                            value={attributes.overrideDefaultBorderColor}
                            onChange={(val) => setAttributes({ overrideDefaultBorderColor: val })}
                        />
                        <SimpleColorControl
                            label={__('ID Badge Background Color', 'arwai-azi-viewer')}
                            value={attributes.overrideBadgeBg}
                            onChange={(val) => setAttributes({ overrideBadgeBg: val })}
                        />
                        <SimpleColorControl
                            label={__('ID Badge Text Color', 'arwai-azi-viewer')}
                            value={attributes.overrideBadgeTextColor}
                            onChange={(val) => setAttributes({ overrideBadgeTextColor: val })}
                        />
                        <TextControl label={__('ID Badge: Shadow CSS', 'arwai-azi-viewer')} value={attributes.overrideBadgeShadow} onChange={(val) => setAttributes({ overrideBadgeShadow: val })} />
                    </PanelBody>

                    <PanelBody title={__('Hover State', 'arwai-azi-viewer')} initialOpen={false}>
                        <SimpleColorControl
                            label={__('Hover: Annotation Popup Fill Color', 'arwai-azi-viewer')}
                            value={attributes.overrideHoverFillColor}
                            onChange={(val) => setAttributes({ overrideHoverFillColor: val })}
                        />
                        <SimpleColorControl
                            label={__('Hover: Annotation Popup Border Color', 'arwai-azi-viewer')}
                            value={attributes.overrideHoverBorderColor}
                            onChange={(val) => setAttributes({ overrideHoverBorderColor: val })}
                        />
                        <TextControl label={__('Hover: ID Badge Shadow', 'arwai-azi-viewer')} value={attributes.overrideHoverBadgeShadow} onChange={(val) => setAttributes({ overrideHoverBadgeShadow: val })} />
                    </PanelBody>

                    <PanelBody title={__('Selected State', 'arwai-azi-viewer')} initialOpen={false}>
                        <SimpleColorControl
                            label={__('Selected: Annotation Popup Fill Color', 'arwai-azi-viewer')}
                            value={attributes.overrideSelectedFillColor}
                            onChange={(val) => setAttributes({ overrideSelectedFillColor: val })}
                        />
                        <SimpleColorControl
                            label={__('Selected: Annotation Popup Border Color', 'arwai-azi-viewer')}
                            value={attributes.overrideSelectedBorderColor}
                            onChange={(val) => setAttributes({ overrideSelectedBorderColor: val })}
                        />
                        <TextControl label={__('Selected: ID Badge Shadow CSS', 'arwai-azi-viewer')} value={attributes.overrideSelectedBadgeShadow} onChange={(val) => setAttributes({ overrideSelectedBadgeShadow: val })} />
                    </PanelBody>
                </PanelBody>
            </InspectorControls>
        </>
    );

    if (!attributes.imageIds?.length) {
        return (
            <>
                {inspectorControls}
                <div {...blockProps}>
                    <MediaPlaceholder
                        icon="format-gallery"
                        labels={{
                            title: __('Annotated Image Viewer', 'arwai-azi-viewer'),
                            instructions: __('Upload images or select from Media Library to create an annotated gallery.', 'arwai-azi-viewer'),
                        }}
                        onSelect={(media) => {
                            const ids = media.map(item => item.id);
                            setAttributes({ imageIds: ids });
                        }}
                        accept="image/*"
                        allowedTypes={['image']}
                        multiple={true}
                    />
                </div>
            </>
        );
    }

    const firstImage = previewImages[0];
    const hasImages = firstImage && firstImage.source_url;



    return (
        <>
            {inspectorControls}
            <div {...blockProps}>
                <div
                    className="arwai-aziv-display-stage"
                    style={{
                        height: attributes.height || '500px',
                        width: attributes.width || '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxSizing: 'border-box'
                    }}
                >
                    {hasImages ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src={firstImage.source_url}
                                style={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    margin: '0 auto',
                                    display: 'block'
                                }}
                                alt=""
                            />
                            {/* Live WYSIWYG Sample Annotation Box & ID Badge Overlay */}
                            <div
                                className="arwai-aziv-sample-wysiwyg-annotation-box"
                                style={{
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
                                }}
                            >
                                <span
                                    style={{
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
                                    }}
                                >
                                    1
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <span className="dashicons dashicons-format-gallery" style={{ fontSize: '40px', width: '40px', height: '40px' }}></span>
                            <h4 style={{ margin: '8px 0 2px 0', color: '#ffffff' }}>{__('Annotated Image Viewer Block', 'arwai-azi-viewer')}</h4>
                        </div>
                    )}

                    <div
                        style={{
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
                        }}
                    >
                        <span style={{ fontSize: '12px', color: '#94a3b8', marginRight: '6px' }}>{`${attributes.imageIds.length} ${__('images', 'arwai-azi-viewer')}`}</span>
                        <MediaUpload
                            onSelect={(media) => {
                                const ids = media.map(item => item.id);
                                setAttributes({ imageIds: ids });
                            }}
                            allowedTypes={['image']}
                            multiple={true}
                            gallery={true}
                            value={attributes.imageIds}
                            render={(obj) => (
                                <button
                                    className="components-button is-primary"
                                    onClick={obj.open}
                                    style={{
                                        background: '#3b82f6',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '6px 14px',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '12px'
                                    }}
                                >
                                    {__('Edit / Reorder', 'arwai-azi-viewer')}
                                </button>
                            )}
                        />
                    </div>
                </div>
                {/* Toolbar & Filmstrip are separate standalone blocks — add them outside this block in the editor */}
            </div>
        </>
    );
}
