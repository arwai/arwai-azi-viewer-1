<?php
namespace Arwai\ImageAnnotator\Admin;

if (!defined('ABSPATH')) {
    exit;
}

class SettingsPage {
    const OPTION_OSD_OPTIONS   = 'arwai_azi_viewer_osd_options';
    const OPTION_CARD_STYLES   = 'arwai_azi_viewer_card_styles';
    const OPTION_TAG_COLORS    = 'arwai_azi_viewer_tag_colors';
    const OPTION_EDITING_ROLES = 'arwai_azi_viewer_editing_roles';

    /**
     * Initialize settings hooks.
     */
    public static function init() {
        add_action('admin_menu', [__CLASS__, 'add_settings_menu']);
        add_action('admin_init', [__CLASS__, 'register_settings']);
    }

    /**
     * Add top-level menu page directly below Settings in the WordPress dashboard sidebar.
     */
    public static function add_settings_menu() {
        add_menu_page(
            __('Annotate Zoom Image Viewer Settings', 'arwai-azi-viewer'),
            __('Annotate Zoom Image Viewer', 'arwai-azi-viewer'),
            'manage_options',
            'arwai-azi-viewer-settings',
            [__CLASS__, 'render_settings_page'],
            'dashicons-tag',
            81
        );
    }

    /**
     * Register Plugin Settings.
     */
    public static function register_settings() {

        register_setting('arwai_azi_viewer_settings_group', self::OPTION_OSD_OPTIONS, [
            'type'              => 'array',
            'sanitize_callback' => [__CLASS__, 'sanitize_osd_options'],
            'default'           => self::get_default_osd_options(),
        ]);

        register_setting('arwai_azi_viewer_settings_group', self::OPTION_CARD_STYLES, [
            'type'              => 'array',
            'sanitize_callback' => [__CLASS__, 'sanitize_card_styles'],
            'default'           => self::get_default_card_styles(),
        ]);

        register_setting('arwai_azi_viewer_settings_group', self::OPTION_TAG_COLORS, [
            'type'              => 'array',
            'sanitize_callback' => [__CLASS__, 'sanitize_tag_colors'],
            'default'           => [],
        ]);

        register_setting('arwai_azi_viewer_settings_group', self::OPTION_EDITING_ROLES, [
            'type'              => 'array',
            'sanitize_callback' => [__CLASS__, 'sanitize_editing_roles'],
            'default'           => ['administrator'],
        ]);
    }

    public static function get_default_osd_options() {
        return [
            'minZoomLevel'         => '0.3',
            'maxZoomLevel'         => '10',
            'showNavigator'        => '0',
            'animationTime'        => '1.2',
            'gestureSettingsMouse' => '0',
        ];
    }

    public static function get_default_card_styles() {
        return [
            // Default image fallback options
            'default_simple_size'          => 'large',
            'default_osd_size'             => 'full',
            'default_loading_method'       => 'lazy',
            'default_image_format'         => 'webp_prefer',
            'default_info_msg'             => '',
            
            // Annotation shapes & ID badges default canvas styling
            'badge_bg'                     => '#2563eb',
            'badge_text_color'             => '#ffffff',
            'default_fill_color'           => 'rgba(0,0,0,0.2)',
            'default_border_color'         => '#2563eb',
            'default_badge_shadow'         => '0 2px 6px rgba(0, 0, 0, 0.15)',
            
            'default_hover_fill_color'     => 'rgba(0,0,0,0.3)',
            'default_hover_border_color'   => '#3b82f6',
            'default_hover_badge_shadow'   => '0 4px 12px rgba(0, 0, 0, 0.25)',
            
            'default_selected_fill_color'   => 'rgba(0,0,0,0.3)',
            'default_selected_border_color' => '#1d4ed8',
            'default_selected_badge_bg'    => '#1d4ed8',
            'default_selected_badge_text_color' => '#ffffff',
            'default_selected_badge_shadow' => '0 4px 12px rgba(0, 0, 0, 0.25)',

            // Card content truncation behavior
            'enable_truncation'            => 1,
            'card_max_lines'               => 3,
            'read_more_text'               => '...Read More',
            'show_less_text'               => 'Show Less',
        ];
    }

    public static function sanitize_editing_roles($input) {
        if (!is_array($input)) return ['administrator'];
        global $wp_roles;
        $all_roles = $wp_roles ? $wp_roles->get_names() : [];
        $clean = [];
        foreach ($input as $role) {
            $r_clean = sanitize_key($role);
            if (isset($all_roles[$r_clean])) {
                $clean[] = $r_clean;
            }
        }
        return !empty($clean) ? $clean : ['administrator'];
    }

    public static function sanitize_osd_options($input) {
        if (!is_array($input)) return self::get_default_osd_options();
        return [
            'minZoomLevel'         => isset($input['minZoomLevel']) ? (string) floatval($input['minZoomLevel']) : '0.3',
            'maxZoomLevel'         => isset($input['maxZoomLevel']) ? (string) floatval($input['maxZoomLevel']) : '10',
            'showNavigator'        => !empty($input['showNavigator']) ? '1' : '0',
            'animationTime'        => isset($input['animationTime']) ? (string) floatval($input['animationTime']) : '1.2',
            'gestureSettingsMouse' => !empty($input['gestureSettingsMouse']) ? '1' : '0',
        ];
    }

    public static function sanitize_card_styles($input) {
        if (!is_array($input)) return self::get_default_card_styles();
        return [
            'default_simple_size'          => isset($input['default_simple_size']) ? sanitize_key($input['default_simple_size']) : 'large',
            'default_osd_size'             => isset($input['default_osd_size']) ? sanitize_key($input['default_osd_size']) : 'full',
            'default_loading_method'       => isset($input['default_loading_method']) ? sanitize_key($input['default_loading_method']) : 'lazy',
            'default_image_format'         => isset($input['default_image_format']) ? sanitize_key($input['default_image_format']) : 'webp_prefer',
            'default_info_msg'             => isset($input['default_info_msg']) ? wp_kses_post($input['default_info_msg']) : '',
            
            'badge_bg'                     => isset($input['badge_bg']) ? sanitize_text_field($input['badge_bg']) : '#2563eb',
            'badge_text_color'             => isset($input['badge_text_color']) ? sanitize_text_field($input['badge_text_color']) : '#ffffff',
            'default_fill_color'           => isset($input['default_fill_color']) ? sanitize_text_field($input['default_fill_color']) : 'rgba(0,0,0,0.2)',
            'default_border_color'         => isset($input['default_border_color']) ? sanitize_text_field($input['default_border_color']) : '#2563eb',
            'default_badge_shadow'         => isset($input['default_badge_shadow']) ? sanitize_text_field($input['default_badge_shadow']) : '0 2px 6px rgba(0, 0, 0, 0.15)',
            
            'default_hover_fill_color'     => isset($input['default_hover_fill_color']) ? sanitize_text_field($input['default_hover_fill_color']) : 'rgba(0,0,0,0.3)',
            'default_hover_border_color'   => isset($input['default_hover_border_color']) ? sanitize_text_field($input['default_hover_border_color']) : '#3b82f6',
            'default_hover_badge_shadow'   => isset($input['default_hover_badge_shadow']) ? sanitize_text_field($input['default_hover_badge_shadow']) : '0 4px 12px rgba(0, 0, 0, 0.25)',
            
            'default_selected_fill_color'   => isset($input['default_selected_fill_color']) ? sanitize_text_field($input['default_selected_fill_color']) : 'rgba(0,0,0,0.3)',
            'default_selected_border_color' => isset($input['default_selected_border_color']) ? sanitize_text_field($input['default_selected_border_color']) : '#1d4ed8',
            'default_selected_badge_bg'    => isset($input['default_selected_badge_bg']) ? sanitize_text_field($input['default_selected_badge_bg']) : '#1d4ed8',
            'default_selected_badge_text_color' => isset($input['default_selected_badge_text_color']) ? sanitize_text_field($input['default_selected_badge_text_color']) : '#ffffff',
            'default_selected_badge_shadow' => isset($input['default_selected_badge_shadow']) ? sanitize_text_field($input['default_selected_badge_shadow']) : '0 4px 12px rgba(0, 0, 0, 0.25)',

            'enable_truncation'            => !empty($input['enable_truncation']) ? 1 : 0,
            'card_max_lines'               => isset($input['card_max_lines']) ? intval($input['card_max_lines']) : 3,
            'read_more_text'               => isset($input['read_more_text']) ? sanitize_text_field($input['read_more_text']) : '...Read More',
            'show_less_text'               => isset($input['show_less_text']) ? sanitize_text_field($input['show_less_text']) : 'Show Less',
        ];
    }

    public static function sanitize_tag_colors($input) {
        if (!is_array($input)) return [];
        $clean = [];
        foreach ($input as $rule) {
            if (!empty($rule['tag'])) {
                $tag_name = sanitize_text_field(strtolower(trim($rule['tag'])));
                $fill     = !empty($rule['fill_color']) ? sanitize_text_field($rule['fill_color']) : '';
                $border   = !empty($rule['border_color']) ? sanitize_text_field($rule['border_color']) : '#2563eb';
                $badge    = !empty($rule['badge_bg']) ? sanitize_text_field($rule['badge_bg']) : '#2563eb';
                $badge_tc = !empty($rule['badge_text_color']) ? sanitize_text_field($rule['badge_text_color']) : '#ffffff';
                $badge_sh = !empty($rule['badge_shadow']) ? sanitize_text_field($rule['badge_shadow']) : '';
                
                $clean[]  = [
                    'tag'              => $tag_name,
                    'fill_color'       => $fill,
                    'border_color'     => $border,
                    'badge_bg'         => $badge,
                    'badge_text_color' => $badge_tc,
                    'badge_shadow'     => $badge_sh,
                ];
            }
        }
        return $clean;
    }

    public static function get_editing_roles() {
        $roles = get_option(self::OPTION_EDITING_ROLES, ['administrator']);
        return is_array($roles) ? $roles : ['administrator'];
    }

    public static function get_osd_options() {
        return wp_parse_args(get_option(self::OPTION_OSD_OPTIONS, []), self::get_default_osd_options());
    }

    public static function get_card_styles() {
        return wp_parse_args(get_option(self::OPTION_CARD_STYLES, []), self::get_default_card_styles());
    }

    public static function get_tag_colors() {
        $colors = get_option(self::OPTION_TAG_COLORS, []);
        return is_array($colors) ? $colors : [];
    }

    public static function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $editing_roles = self::get_editing_roles();
        $osd_options   = self::get_osd_options();
        $card_styles   = self::get_card_styles();
        $tag_colors    = self::get_tag_colors();

        global $wp_roles;
        $all_roles = $wp_roles ? $wp_roles->get_names() : [];

        include ARWAI_AZI_VIEWER_PATH . 'templates/admin-settings.php';
    }
}
