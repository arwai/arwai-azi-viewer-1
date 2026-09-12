<?php
namespace Arwai\ImageAnnotator\Blocks;

if (!defined('ABSPATH')) {
    exit;
}

class SequenceToolbarBlock {
    private static function parse_unit($val, $default_unit = 'px') {
        if (is_numeric($val)) {
            return $val . $default_unit;
        }
        return sanitize_text_field($val);
    }

    /**
     * Register Block Type.
     */
    public static function register() {
        register_block_type(ARWAI_AZI_VIEWER_PATH . 'build/sequence-toolbar', [
            'render_callback' => [__CLASS__, 'render'],
        ]);
    }

    /**
     * Server-side Render Callback.
     *
     * @param array $attributes
     * @param string $content
     * @return string
     */
    public static function render($attributes, $content = '') {
        ViewerBlock::enqueue_frontend_assets();

        $target_viewer_id = !empty($attributes['targetViewerId']) ? sanitize_text_field($attributes['targetViewerId']) : '';

        $container_border_width  = !empty($attributes['containerBorderWidth']) ? self::parse_unit($attributes['containerBorderWidth']) : (!empty($attributes['style']['border']['width']) ? self::parse_unit($attributes['style']['border']['width']) : '');
        $container_border_style  = !empty($attributes['containerBorderStyle']) ? sanitize_text_field($attributes['containerBorderStyle']) : (!empty($attributes['style']['border']['style']) ? sanitize_text_field($attributes['style']['border']['style']) : '');
        $container_border_color  = !empty($attributes['containerBorderColor']) ? sanitize_text_field($attributes['containerBorderColor']) : (!empty($attributes['style']['border']['color']) ? sanitize_text_field($attributes['style']['border']['color']) : '');
        $container_border_radius = !empty($attributes['containerBorderRadius']) ? self::parse_unit($attributes['containerBorderRadius']) : (!empty($attributes['style']['border']['radius']) ? self::parse_unit($attributes['style']['border']['radius']) : '');

        $unique_id        = wp_unique_id('seq_toolbar_');

        ob_start();
        include ARWAI_AZI_VIEWER_PATH . 'templates/sequence-toolbar.php';
        return ob_get_clean();
    }
}
