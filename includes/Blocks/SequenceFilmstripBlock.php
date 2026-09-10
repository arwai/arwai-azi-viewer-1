<?php
namespace Arwai\ImageAnnotator\Blocks;

use Arwai\ImageAnnotator\Admin\SettingsPage;

if (!defined('ABSPATH')) {
    exit;
}

class SequenceFilmstripBlock {
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
        register_block_type(ARWAI_AZI_VIEWER_PATH . 'build/sequence-filmstrip', [
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

        $target_viewer_id      = !empty($attributes['targetViewerId']) ? sanitize_text_field($attributes['targetViewerId']) : '';

        $show_filmstrip        = isset($attributes['showFilmstrip']) ? (bool) $attributes['showFilmstrip'] : true;
        $hide_filmstrip_mobile = isset($attributes['hideFilmstripMobile']) ? (bool) $attributes['hideFilmstripMobile'] : true;

        // Dimensions (Width/Height) set on block map to thumbnail size (default 60px)
        $filmstrip_size        = isset($attributes['filmstripSize']) ? self::parse_unit($attributes['filmstripSize']) : '60px';
        if (!empty($attributes['style']['dimensions']['width'])) {
            $filmstrip_size    = self::parse_unit($attributes['style']['dimensions']['width']);
        } elseif (!empty($attributes['style']['dimensions']['height'])) {
            $filmstrip_size    = self::parse_unit($attributes['style']['dimensions']['height']);
        }

        // Block spacing (blockGap) maps to space between thumbnails (default 8px)
        $filmstrip_gap         = '8px';
        if (!empty($attributes['style']['spacing']['blockGap'])) {
            $g = $attributes['style']['spacing']['blockGap'];
            if (is_string($g)) {
                $filmstrip_gap = preg_replace('/var:preset\|spacing\|([a-zA-Z0-9-]+)/', 'var(--wp--preset--spacing--$1)', $g);
            }
        }

        $thumb_radius          = !empty($attributes['thumbBorderRadius']) ? self::parse_unit($attributes['thumbBorderRadius']) : '4px';
        $thumb_border_width    = !empty($attributes['thumbBorderWidth']) ? self::parse_unit($attributes['thumbBorderWidth']) : '1px';
        $thumb_border_color    = !empty($attributes['thumbBorderColor']) ? sanitize_text_field($attributes['thumbBorderColor']) : 'rgba(0,0,0,0.12)';
        $hover_border_color    = !empty($attributes['hoverBorderColor']) ? sanitize_text_field($attributes['hoverBorderColor']) : '#3b82f6';
        $selected_border_color = !empty($attributes['selectedBorderColor']) ? sanitize_text_field($attributes['selectedBorderColor']) : '#2563eb';

        $container_border_width  = !empty($attributes['containerBorderWidth']) ? self::parse_unit($attributes['containerBorderWidth']) : (!empty($attributes['style']['border']['width']) ? self::parse_unit($attributes['style']['border']['width']) : '');
        $container_border_style  = !empty($attributes['containerBorderStyle']) ? sanitize_text_field($attributes['containerBorderStyle']) : (!empty($attributes['style']['border']['style']) ? sanitize_text_field($attributes['style']['border']['style']) : '');
        $container_border_color  = !empty($attributes['containerBorderColor']) ? sanitize_text_field($attributes['containerBorderColor']) : (!empty($attributes['style']['border']['color']) ? sanitize_text_field($attributes['style']['border']['color']) : '');
        $container_border_radius = !empty($attributes['containerBorderRadius']) ? self::parse_unit($attributes['containerBorderRadius']) : (!empty($attributes['style']['border']['radius']) ? self::parse_unit($attributes['style']['border']['radius']) : '');

        $align       = !empty($attributes['align']) ? sanitize_html_class($attributes['align']) : '';
        $align_class = !empty($align) ? 'align' . $align : '';
        $unique_id   = wp_unique_id('seq_filmstrip_');

        if (!$show_filmstrip) {
            return '';
        }

        ob_start();
        include ARWAI_AZI_VIEWER_PATH . 'templates/sequence-filmstrip.php';
        return ob_get_clean();
    }
}
