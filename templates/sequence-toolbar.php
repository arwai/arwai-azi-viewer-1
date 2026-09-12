<?php
if (!defined('ABSPATH')) {
    exit;
}

$style_vars = '';
if (!empty($container_border_width)) {
    $style_vars .= 'border-width:' . esc_attr($container_border_width) . ';';
}
if (!empty($container_border_style)) {
    $style_vars .= 'border-style:' . esc_attr($container_border_style) . ';';
}
if (!empty($container_border_color)) {
    $style_vars .= 'border-color:' . esc_attr($container_border_color) . ';';
}
if (!empty($container_border_radius)) {
    $style_vars .= 'border-radius:' . esc_attr($container_border_radius) . ';';
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class'                => 'arwai-aziv-toolbar arwai-aziv-toolbar-wrap arwai-aziv-sequence-toolbar-wrap arwai-aziv-standalone-sequence-toolbar',
    'id'                   => $unique_id,
    'data-target-viewer-id'=> esc_attr($target_viewer_id),
    'style'                => $style_vars,
]);
?>
<div <?php echo $wrapper_attributes; ?>>
    <button type="button" class="arwai-aziv-toolbar-nav-btn arwai-aziv-btn-prev" style="color: inherit;" title="<?php esc_attr_e('Previous Image', 'arwai-azi-viewer'); ?>" aria-label="<?php esc_attr_e('Previous Image', 'arwai-azi-viewer'); ?>">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    </button>
    <span class="arwai-aziv-toolbar-counter" aria-live="polite">1 / 1</span>
    <button type="button" class="arwai-aziv-toolbar-nav-btn arwai-aziv-btn-next" style="color: inherit;" title="<?php esc_attr_e('Next Image', 'arwai-azi-viewer'); ?>" aria-label="<?php esc_attr_e('Next Image', 'arwai-azi-viewer'); ?>">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    </button>
</div>
