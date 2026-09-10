<?php
namespace Arwai\ImageAnnotator\Blocks;

use Arwai\ImageAnnotator\Admin\SettingsPage;

if (!defined('ABSPATH')) {
    exit;
}

class ViewerBlock {
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
        register_block_type(ARWAI_AZI_VIEWER_PATH . 'build/viewer', [
            'render_callback' => [__CLASS__, 'render'],
        ]);
        add_action('enqueue_block_editor_assets', function() {
            wp_enqueue_style(
                'arwai-azi-viewer-public-css',
                ARWAI_AZI_VIEWER_URL . 'assets/css/public.css',
                [],
                ARWAI_AZI_VIEWER_VERSION
            );
        });
    }

    /**
     * Server-side Render Callback.
     *
     * @param array $attributes
     * @param string $content
     * @return string
     */
    public static function render($attributes, $content = '') {
        $post_id          = isset($attributes['postId']) && $attributes['postId'] > 0 ? (int) $attributes['postId'] : get_the_ID();
        $width            = isset($attributes['width']) ? self::parse_unit($attributes['width']) : '100%';
        $card_styles          = SettingsPage::get_card_styles();
        $default_stage_height = !empty($card_styles['default_stage_height']) ? self::parse_unit($card_styles['default_stage_height']) : '500px';
        $height               = (isset($attributes['height']) && $attributes['height'] !== 'auto' && $attributes['height'] !== '') ? self::parse_unit($attributes['height']) : $default_stage_height;
        // Check for native WP supports to avoid overriding them with fallbacks
        $simple_size          = !empty($attributes['simpleImageSize']) ? sanitize_key($attributes['simpleImageSize']) : (!empty($card_styles['default_simple_size']) ? sanitize_key($card_styles['default_simple_size']) : 'large');
        $osd_size             = !empty($attributes['osdImageSize']) ? sanitize_key($attributes['osdImageSize']) : (!empty($card_styles['default_osd_size']) ? sanitize_key($card_styles['default_osd_size']) : 'full');
        $loading_method       = !empty($attributes['loadingMethod']) ? sanitize_key($attributes['loadingMethod']) : (!empty($card_styles['default_loading_method']) ? sanitize_key($card_styles['default_loading_method']) : 'lazy');
        $viewer_id            = !empty($attributes['viewerId']) ? sanitize_text_field($attributes['viewerId']) : wp_unique_id('viewer_');

        $image_format         = !empty($card_styles['default_image_format']) ? sanitize_key($card_styles['default_image_format']) : 'webp_prefer';
        $info_message         = !empty($attributes['infoMessage']) ? wp_kses_post($attributes['infoMessage']) : (!empty($card_styles['default_info_msg']) ? wp_kses_post($card_styles['default_info_msg']) : '');

        $images = [];
        $ids = isset($attributes['imageIds']) ? $attributes['imageIds'] : [];

        if (empty($ids)) {
            $image_ids = get_post_meta($post_id, '_arwai_azi_viewer_image_ids', true);
            if (!empty($image_ids)) {
                $ids = is_array($image_ids) ? $image_ids : json_decode($image_ids, true);
            }
        }

        if (!empty($ids) && is_array($ids)) {
            foreach ($ids as $id) {
                $src = wp_get_attachment_image_src($id, $simple_size);
                $osd_src = wp_get_attachment_image_src($id, $osd_size);
                $thumb = wp_get_attachment_image_src($id, 'thumbnail');
                if ($src) {
                    $webp_url = ($image_format === 'webp_prefer') ? self::get_webp_url($id, $src[0]) : '';
                    $images[] = [
                        'attachment_id' => (int) $id,
                        'full_url'      => $osd_src ? $osd_src[0] : $src[0],
                        'simple_url'    => $src[0],
                        'webp_url'      => $webp_url,
                        'thumb_url'     => $thumb ? $thumb[0] : $src[0],
                        'width'         => $src[1],
                        'height'        => $src[2],
                    ];
                }
            }
        }

        if (empty($images) && has_post_thumbnail($post_id)) {
            $thumb_id = get_post_thumbnail_id($post_id);
            $src = wp_get_attachment_image_src($thumb_id, $simple_size);
            $osd_src = wp_get_attachment_image_src($thumb_id, $osd_size);
            $thumb = wp_get_attachment_image_src($thumb_id, 'thumbnail');
            if ($src) {
                $webp_url = ($image_format === 'webp_prefer') ? self::get_webp_url($thumb_id, $src[0]) : '';
                $images[] = [
                    'attachment_id' => (int) $thumb_id,
                    'full_url'      => $osd_src ? $osd_src[0] : $src[0],
                    'simple_url'    => $src[0],
                    'webp_url'      => $webp_url,
                    'thumb_url'     => $thumb ? $thumb[0] : $src[0],
                    'width'         => $src[1],
                    'height'        => $src[2],
                ];
            }
        }

        if (empty($images)) {
            return '<div class="arwai-aziv-error" style="padding: 16px; background: #fef2f2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 6px; text-align: center;">' . esc_html__('No annotated images found for this post.', 'arwai-azi-viewer') . '</div>';
        }

        self::enqueue_frontend_assets();

        $unique_id   = wp_unique_id('anno_view_');
        $osd_options = SettingsPage::get_osd_options();
        $tag_colors  = SettingsPage::get_tag_colors();

        $data_attributes = '';
        $viewer_override_attrs = [
            'overrideDefaultFillColor', 'overrideDefaultBorderColor', 'overrideBadgeBg', 'overrideBadgeTextColor', 'overrideBadgeShadow',
            'overrideHoverFillColor', 'overrideHoverBorderColor', 'overrideHoverBadgeShadow',
            'overrideSelectedFillColor', 'overrideSelectedBorderColor', 'overrideSelectedBadgeShadow'
        ];
        foreach ($viewer_override_attrs as $attr) {
            if (!empty($attributes[$attr])) {
                $data_attr_name = strtolower(preg_replace('/([A-Z])/', '-$1', $attr));
                $data_attributes .= ' data-' . $data_attr_name . '="' . esc_attr($attributes[$attr]) . '"';
            }
        }

        $align       = !empty($attributes['align']) ? sanitize_html_class($attributes['align']) : '';
        $align_class = !empty($align) ? 'align' . $align : '';

        $wrapper_attributes = get_block_wrapper_attributes([
            'class'           => 'arwai-aziv-frontend-wrap ' . $align_class,
            'id'              => $unique_id,
            'data-images'     => wp_json_encode($images),
            'data-post-id'    => $post_id,
            'data-viewer-id'  => $viewer_id,
            'style'           => sprintf('height:%s; width:%s; --stage-height-limit:%s;', esc_attr($height), esc_attr($width), esc_attr($height)),
        ]);

        ob_start();
        include ARWAI_AZI_VIEWER_PATH . 'templates/frontend-viewer.php';
        return ob_get_clean();
    }

    /**
     * Enqueue public frontend scripts and styles.
     */
    public static function enqueue_frontend_assets() {
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

        wp_enqueue_style(
            'arwai-azi-viewer-public-css',
            ARWAI_AZI_VIEWER_URL . 'assets/css/public.css',
            ['annotorious-css'],
            ARWAI_AZI_VIEWER_VERSION
        );

        $user = wp_get_current_user();
        $allowed_roles = SettingsPage::get_editing_roles();
        $can_edit = false;
        if (is_user_logged_in() && !empty($user->roles)) {
            foreach ($user->roles as $r) {
                if (in_array($r, $allowed_roles, true)) {
                    $can_edit = true;
                    break;
                }
            }
        }
        if (current_user_can('manage_options')) {
            $can_edit = true;
        }

        wp_localize_script('openseadragon-annotorious-js', 'ArwaiAziViewerConfig', [
            'rest_url'      => esc_url_raw(rest_url('arwai-azi-viewer/v1/')),
            'nonce'         => wp_create_nonce('wp_rest'),
            'user_can_edit' => $can_edit,
            'osd_options'   => SettingsPage::get_osd_options(),
            'card_styles'   => SettingsPage::get_card_styles(),
            'tag_colors'    => SettingsPage::get_tag_colors(),
        ]);
    }

    /**
     * Locate WebP variant for a given attachment ID and original image URL.
     *
     * @param int $attachment_id
     * @param string $src_url
     * @return string
     */
    private static function get_webp_url($attachment_id, $src_url) {
        if (empty($src_url)) {
            return '';
        }

        // 1. If original image is already webp
        if (substr(strtolower($src_url), -5) === '.webp') {
            return $src_url;
        }

        // 2. Check if attachment mime type is image/webp
        $mime = get_post_mime_type($attachment_id);
        if ($mime === 'image/webp') {
            return $src_url;
        }

        // 3. Check physical uploads directory for webp file
        $upload_dir = wp_upload_dir();
        $base_url   = $upload_dir['baseurl'];
        $base_dir   = $upload_dir['basedir'];

        if (strpos($src_url, $base_url) === 0) {
            $relative_path = substr($src_url, strlen($base_url));
            $file_path     = $base_dir . $relative_path;

            // Direct appended .webp extension (common in WP optimization plugins: e.g. file.jpg.webp)
            if (file_exists($file_path . '.webp')) {
                return $src_url . '.webp';
            }

            // Replaced extension (e.g. file.webp)
            $replaced_path = preg_replace('/\.(jpe?g|png|gif)$/i', '.webp', $file_path);
            if ($replaced_path !== $file_path && file_exists($replaced_path)) {
                return preg_replace('/\.(jpe?g|png|gif)$/i', '.webp', $src_url);
            }
        }

        return '';
    }
}
