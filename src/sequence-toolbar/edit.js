import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
    /* ── Find all viewer blocks in the page ─────────────────────────── */
    const viewerBlocks = useSelect((select) => {
        const { getBlocksByName, getBlock, getBlocks } = select('core/block-editor');
        if (typeof getBlocksByName === 'function') {
            return (getBlocksByName('arwai/azi-viewer') || []).map(id => getBlock(id)).filter(Boolean);
        }
        return (getBlocks() || []).filter(b => b.name === 'arwai/azi-viewer');
    }, []);

    /* ── Resolve image count from linked/nearest viewer ─────────────── */
    const imageCount = useSelect((select) => {
        const { getBlocksByName, getBlock, getBlocks } = select('core/block-editor');

        let blocks = [];
        if (typeof getBlocksByName === 'function') {
            blocks = (getBlocksByName('arwai/azi-viewer') || []).map(id => getBlock(id)).filter(Boolean);
        } else {
            blocks = (getBlocks() || []).filter(b => b.name === 'arwai/azi-viewer');
        }

        if (attributes.targetViewerId) {
            const linked = blocks.find(b => b.attributes.viewerId === attributes.targetViewerId);
            if (linked) return (linked.attributes.imageIds || []).length || 1;
        }
        // Nearest (first) viewer
        if (blocks.length > 0) return (blocks[0].attributes.imageIds || []).length || 1;
        return 1;
    }, [attributes.targetViewerId]);

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

    const toolbarWrapStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '8px 0',
    };

    const toolbarStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        userSelect: 'none',
    };

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

    const blockProps = useBlockProps({
        className: 'arwai-aziv-toolbar arwai-aziv-toolbar-wrap arwai-aziv-sequence-toolbar-wrap arwai-aziv-standalone-sequence-toolbar arwai-aziv-action-toolbar-wysiwyg-preview',
        style: { boxSizing: 'border-box' },
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
