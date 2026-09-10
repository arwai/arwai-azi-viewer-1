<?php
if (!defined('ABSPATH')) {
    exit;
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class'                => 'arwai-azi-viewer-toolbar arwai-azi-viewer-toolbar-wrap arwai-azi-viewer-sequence-toolbar-wrap standalone-sequence-toolbar',
    'id'                   => $unique_id,
    'data-target-viewer-id'=> esc_attr($target_viewer_id),
]);
?>
<div <?php echo $wrapper_attributes; ?>>
    <button type="button" class="toolbar-nav-btn btn-prev" style="color: inherit;" title="<?php esc_attr_e('Previous Image', 'arwai-azi-viewer'); ?>" aria-label="<?php esc_attr_e('Previous Image', 'arwai-azi-viewer'); ?>">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    </button>
    <span class="toolbar-counter" aria-live="polite">1 / 1</span>
    <button type="button" class="toolbar-nav-btn btn-next" style="color: inherit;" title="<?php esc_attr_e('Next Image', 'arwai-azi-viewer'); ?>" aria-label="<?php esc_attr_e('Next Image', 'arwai-azi-viewer'); ?>">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    </button>
</div>
