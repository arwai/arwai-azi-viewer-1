<?php
if (!defined('ABSPATH')) {
    exit;
}

/** @var string $unique_id */
/** @var string $target_viewer_id */
/** @var bool $show_annotations_btn */
/** @var bool $show_enlarge_btn */
/** @var bool $show_info_btn */

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'arwai-aziv-action-toolbar arwai-aziv-action-toolbar-wrap',
    'id'    => $unique_id,
    'data-target-viewer-id' => esc_attr($target_viewer_id),
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <?php if ($show_annotations_btn) : ?>
        <button type="button" class="arwai-aziv-action-toolbar-btn arwai-aziv-btn-notes" id="<?php echo esc_attr($unique_id); ?>-btn-notes" style="color:inherit;" title="<?php esc_attr_e('Show Annotations', 'arwai-azi-viewer'); ?>" aria-label="<?php esc_attr_e('Toggle Annotations', 'arwai-azi-viewer'); ?>" aria-pressed="false">
            <svg class="arwai-aziv-icon-eye-open" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" style="display: none;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="arwai-aziv-icon-eye-off" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            <span><?php esc_html_e('Annotations', 'arwai-azi-viewer'); ?></span>
        </button>
    <?php endif; ?>

    <?php if ($show_enlarge_btn) : ?>
        <button type="button" class="arwai-aziv-action-toolbar-btn arwai-aziv-btn-enlarge" id="<?php echo esc_attr($unique_id); ?>-btn-enlarge" style="color:inherit;" aria-label="<?php esc_attr_e('Enlarge Image', 'arwai-azi-viewer'); ?>">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            <span><?php esc_html_e('Enlarge', 'arwai-azi-viewer'); ?></span>
        </button>
    <?php endif; ?>

    <?php if ($show_info_btn) : ?>
        <button type="button" class="arwai-aziv-action-toolbar-btn arwai-aziv-btn-info" id="<?php echo esc_attr($unique_id); ?>-btn-info" style="color:inherit;" aria-label="<?php esc_attr_e('Show Information', 'arwai-azi-viewer'); ?>">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span><?php esc_html_e('Info', 'arwai-azi-viewer'); ?></span>
        </button>
    <?php endif; ?>
</div>
