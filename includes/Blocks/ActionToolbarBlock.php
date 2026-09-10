<?php
namespace Arwai\ImageAnnotator\Blocks;

if (!defined('ABSPATH')) {
    exit;
}

class ActionToolbarBlock {
    /**
     * Register Block Type.
     */
    public static function register() {
        register_block_type(ARWAI_AZI_VIEWER_PATH . 'build/action-toolbar', [
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

        $show_annotations_btn = isset($attributes['showAnnotationsBtn']) ? (bool) $attributes['showAnnotationsBtn'] : true;
        $show_enlarge_btn     = isset($attributes['showEnlargeBtn']) ? (bool) $attributes['showEnlargeBtn'] : true;
        $show_info_btn        = isset($attributes['showInfoBtn']) ? (bool) $attributes['showInfoBtn'] : true;

        $unique_id = wp_unique_id('action_toolbar_');

        ob_start();
        include ARWAI_AZI_VIEWER_PATH . 'templates/action-toolbar.php';
        return ob_get_clean();
    }
}
