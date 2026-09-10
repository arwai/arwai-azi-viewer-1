<?php
if (!defined('ABSPATH')) {
    exit;
}
$wrapper_classes = 'arwai-aziv-sequence-filmstrip-wrap arwai-aziv-standalone-sequence-filmstrip ' . $align_class;
if ($hide_filmstrip_mobile) {
    $wrapper_classes .= ' hide-on-mobile';
}

$style_vars = sprintf(
    '--filmstrip-size:%s; --filmstrip-gap:%s; --thumb-radius:%s; --thumb-border-width:%s; --thumb-border-color:%s; --thumb-hover-border-color:%s; --thumb-selected-border-color:%s;',
    esc_attr($filmstrip_size),
    esc_attr($filmstrip_gap),
    esc_attr($thumb_radius),
    esc_attr($thumb_border_width),
    esc_attr($thumb_border_color),
    esc_attr($hover_border_color),
    esc_attr($selected_border_color)
);
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
    'class'                 => $wrapper_classes,
    'id'                    => $unique_id,
    'data-target-viewer-id' => esc_attr($target_viewer_id),
    'style'                 => $style_vars,
]);
?>
<div <?php echo $wrapper_attributes; ?>>
    <button type="button" class="arwai-aziv-filmstrip-nav-btn arwai-aziv-filmstrip-nav-prev" aria-label="<?php esc_attr_e('Previous thumbnails', 'arwai-azi-viewer'); ?>">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <div class="arwai-aziv-filmstrip-fade arwai-aziv-filmstrip-fade-left"></div>
    <div class="arwai-aziv-filmstrip-scroll-container">
        <!-- Rendered dynamically by frontend view.js or target viewer data -->
    </div>
    <div class="arwai-aziv-filmstrip-fade arwai-aziv-filmstrip-fade-right"></div>
    <button type="button" class="arwai-aziv-filmstrip-nav-btn arwai-aziv-filmstrip-nav-next" aria-label="<?php esc_attr_e('Next thumbnails', 'arwai-azi-viewer'); ?>">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
</div>
