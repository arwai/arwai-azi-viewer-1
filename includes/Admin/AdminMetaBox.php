<?php
namespace Arwai\ImageAnnotator\Admin;

if (!defined('ABSPATH')) {
    exit;
}

class AdminMetaBox {

    /**
     * Register hooks.
     */
    public static function init() {
        add_action('add_meta_boxes', [__CLASS__, 'add_meta_box']);
        add_action('save_post', [__CLASS__, 'save_meta_box_data']);
        add_action('admin_enqueue_scripts', [__CLASS__, 'enqueue_admin_assets']);
    }

    /**
     * Add Meta Box to configured active post types.
     */
    public static function add_meta_box() {
        $active_types = SettingsPage::get_active_post_types();

        foreach ($active_types as $post_type) {
            add_meta_box(
                'arwai_azi_viewer_media_box',
                __('Image Annotator - Image Collection & Annotorious Editor', 'arwai-azi-viewer'),
                [__CLASS__, 'render_meta_box'],
                $post_type,
                'normal',
                'high'
            );
        }
    }

    /**
     * Enqueue Admin Assets.
     *
     * @param string $hook
     */
    public static function enqueue_admin_assets($hook) {
        if (!in_array($hook, ['post.php', 'post-new.php'])) {
            return;
        }

        $screen = get_current_screen();
        $active_types = SettingsPage::get_active_post_types();

        if (!$screen || !in_array($screen->post_type, $active_types, true)) {
            return;
        }

        wp_enqueue_media();
        wp_enqueue_script('jquery-ui-sortable');

        // Vendor styles & scripts
        wp_enqueue_style(
            'annotorious-css',
            ARWAI_AZI_VIEWER_URL . 'assets/vendor/annotorious/annotorious.min.css',
            [],
            ARWAI_AZI_VIEWER_VERSION
        );

        wp_enqueue_script(
            'openseadragon-js',
            ARWAI_AZI_VIEWER_URL . 'assets/vendor/openseadragon/openseadragon.min.js',
            [],
            ARWAI_AZI_VIEWER_VERSION,
            true
        );

        wp_enqueue_script(
            'annotorious-js',
            ARWAI_AZI_VIEWER_URL . 'assets/vendor/annotorious/annotorious.min.js',
            [],
            ARWAI_AZI_VIEWER_VERSION,
            true
        );

        wp_enqueue_script(
            'openseadragon-annotorious-js',
            ARWAI_AZI_VIEWER_URL . 'assets/vendor/annotorious/openseadragon-annotorious.min.js',
            ['openseadragon-js', 'annotorious-js'],
            ARWAI_AZI_VIEWER_VERSION,
            true
        );

        // Admin CSS & JS
        wp_enqueue_style(
            'arwai-azi-viewer-admin-css',
            ARWAI_AZI_VIEWER_URL . 'assets/css/admin.css',
            ['annotorious-css'],
            ARWAI_AZI_VIEWER_VERSION
        );

        wp_enqueue_script(
            'arwai-azi-viewer-admin-js',
            ARWAI_AZI_VIEWER_URL . 'assets/js/admin.js',
            ['jquery', 'jquery-ui-sortable', 'openseadragon-js', 'openseadragon-annotorious-js'],
            ARWAI_AZI_VIEWER_VERSION,
            true
        );

        global $post;
        $current_user = wp_get_current_user();

        $image_ids = get_post_meta($post->ID, '_arwai_azi_viewer_image_ids', true);
        $attachment_data = [];

        if (!empty($image_ids)) {
            $ids = is_array($image_ids) ? $image_ids : json_decode($image_ids, true);
            if (is_array($ids)) {
                foreach ($ids as $id) {
                    $src = wp_get_attachment_image_src($id, 'full');
                    $thumb = wp_get_attachment_image_src($id, 'thumbnail');
                    if ($src) {
                        $attachment_data[] = [
                            'attachment_id' => (int) $id,
                            'full_url'      => $src[0],
                            'thumb_url'     => $thumb ? $thumb[0] : $src[0],
                            'width'         => $src[1],
                            'height'        => $src[2],
                        ];
                    }
                }
            }
        }

        wp_localize_script('arwai-azi-viewer-admin-js', 'ImageAnnotatorAdmin', [
            'rest_url'     => esc_url_raw(rest_url('image-annotator/v1/')),
            'nonce'        => wp_create_nonce('wp_rest'),
            'post_id'      => $post ? $post->ID : 0,
            'attachments'  => $attachment_data,
            'currentUser'  => [
                'id'          => $current_user->ID,
                'displayName' => $current_user->display_name,
            ],
            'i18n'         => [
                'saving'     => __('Saving...', 'arwai-azi-viewer'),
                'saved'      => __('Saved', 'arwai-azi-viewer'),
                'error'      => __('Error saving annotation', 'arwai-azi-viewer'),
                'selectMedia'=> __('Select Images for Collection', 'arwai-azi-viewer'),
                'useImages'  => __('Use Selected Images', 'arwai-azi-viewer'),
            ],
        ]);
    }

    /**
     * Render Admin Meta Box HTML.
     *
     * @param \WP_Post $post
     */
    public static function render_meta_box($post) {
        wp_nonce_field('arwai_azi_viewer_save_meta', 'arwai_azi_viewer_meta_nonce');

        $image_ids_json = get_post_meta($post->ID, '_arwai_azi_viewer_image_ids', true);
        if (empty($image_ids_json)) {
            $image_ids_json = '[]';
        }

        include ARWAI_AZI_VIEWER_PATH . 'templates/admin-metabox.php';
    }

    /**
     * Save Meta Box data.
     *
     * @param int $post_id
     */
    public static function save_meta_box_data($post_id) {
        if (!isset($_POST['arwai_azi_viewer_meta_nonce']) || !wp_verify_nonce($_POST['arwai_azi_viewer_meta_nonce'], 'arwai_azi_viewer_save_meta')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        if (isset($_POST['arwai_azi_viewer_image_ids'])) {
            $raw_ids = sanitize_text_field($_POST['arwai_azi_viewer_image_ids']);
            $decoded = json_decode($raw_ids, true);
            if (is_array($decoded)) {
                $clean_ids = array_map('intval', $decoded);
                update_post_meta($post_id, '_arwai_azi_viewer_image_ids', wp_json_encode($clean_ids));
            }
        }
    }
}
