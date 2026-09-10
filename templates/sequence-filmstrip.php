<?php
if (!defined('ABSPATH')) {
    exit;
}
$wrapper_classes = 'arwai-azi-viewer-sequence-filmstrip-wrap standalone-sequence-filmstrip ' . $align_class;
if ($hide_filmstrip_mobile) {
    $wrapper_classes .= ' hide-on-mobile';
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class'                => $wrapper_classes,
    'id'                   => $unique_id,
    'data-target-viewer-id'=> esc_attr($target_viewer_id),
]);

$border_css = '';
if (!empty($filmstrip_border_width) && $filmstrip_border_width !== '0' && $filmstrip_border_width !== '0px') {
    $border_css .= sprintf('border:%s solid %s;', esc_attr($filmstrip_border_width), esc_attr($filmstrip_border_color));
}
if (!empty($filmstrip_radius)) {
    $border_css .= sprintf('border-radius:%s;', esc_attr($filmstrip_radius));
}
if (!empty($filmstrip_bg)) {
    $border_css .= sprintf('background-color:%s;', esc_attr($filmstrip_bg));
}
$row_style = sprintf('margin-top:%s; margin-bottom:%s; %s display:flex; justify-content:center; padding:8px 0;', esc_attr($filmstrip_margin), esc_attr($filmstrip_margin), $border_css);
?>
<div <?php echo $wrapper_attributes; ?>>
    <div class="arwai-azi-viewer-filmstrip-row" style="<?php echo esc_attr($row_style); ?>">
        <div class="filmstrip-scroll-container" style="display:flex; gap:8px; overflow-x:auto;">
            <!-- Rendered dynamically by frontend view.js or target viewer data -->
        </div>
    </div>
</div>
