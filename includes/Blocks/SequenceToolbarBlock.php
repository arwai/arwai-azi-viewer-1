<?php
namespace Arwai\ImageAnnotator\Blocks;

if (!defined('ABSPATH')) {
    exit;
}

class SequenceToolbarBlock {
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
        $unique_id        = wp_unique_id('seq_toolbar_');

        ob_start();
        include ARWAI_AZI_VIEWER_PATH . 'templates/sequence-toolbar.php';
        return ob_get_clean();
    }
}
