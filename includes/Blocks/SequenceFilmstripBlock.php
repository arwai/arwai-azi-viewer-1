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
        $card_styles           = SettingsPage::get_card_styles();

        $show_filmstrip        = isset($attributes['showFilmstrip']) ? (bool) $attributes['showFilmstrip'] : true;
        $hide_filmstrip_mobile = isset($attributes['hideFilmstripMobile']) ? (bool) $attributes['hideFilmstripMobile'] : true;
        $filmstrip_size        = isset($attributes['filmstripSize']) ? self::parse_unit($attributes['filmstripSize']) : '60px';
        $filmstrip_margin      = isset($attributes['filmstripMargin']) ? self::parse_unit($attributes['filmstripMargin']) : '10px';
        $filmstrip_bg          = !empty($attributes['filmstripBgColor']) ? sanitize_text_field($attributes['filmstripBgColor']) : (!empty($card_styles['default_stage_bg_color']) ? $card_styles['default_stage_bg_color'] : 'rgba(0,0,0,0.2)');
        $filmstrip_border_color= !empty($attributes['filmstripBorderColor']) ? sanitize_text_field($attributes['filmstripBorderColor']) : 'transparent';
        $filmstrip_border_width= isset($attributes['filmstripBorderWidth']) ? self::parse_unit($attributes['filmstripBorderWidth']) : '0px';
        $filmstrip_radius      = isset($attributes['filmstripBorderRadius']) ? self::parse_unit($attributes['filmstripBorderRadius']) : '6px';
        $filmstrip_thumb_radius= isset($attributes['filmstripThumbRadius']) ? self::parse_unit($attributes['filmstripThumbRadius']) : '4px';

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
