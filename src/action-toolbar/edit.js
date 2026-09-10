import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

export default function Edit(props) {
    const { attributes, setAttributes } = props;

    const blockProps = useBlockProps({
        className: "arwai-azi-viewer-action-toolbar-wysiwyg-preview arwai-azi-viewer-action-toolbar arwai-azi-viewer-action-toolbar-wrap",
        "data-target-viewer-id": attributes.targetViewerId || ''
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
        { label: __('Automatic (Nearest Viewer on Page)', 'arwai-azi-viewer'), value: '' }
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

            <div {...blockProps}>
                {showAnno && (
                    <button type="button" className="action-toolbar-btn btn-notes" style={{ color: 'inherit' }} title={__('Show Annotations', 'arwai-azi-viewer')}>
                        <svg className="icon-eye-off" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                        <span>{__('Annotations', 'arwai-azi-viewer')}</span>
                    </button>
                )}
                {showEnlarge && (
                    <button type="button" className="action-toolbar-btn btn-enlarge" style={{ color: 'inherit' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                        <span>{__('Enlarge', 'arwai-azi-viewer')}</span>
                    </button>
                )}
                {showInfo && (
                    <button type="button" className="action-toolbar-btn btn-info" style={{ color: 'inherit' }}>
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
