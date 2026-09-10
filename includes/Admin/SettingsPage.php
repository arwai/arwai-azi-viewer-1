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
            'card_bg'                     => '#1e293b',
            'text_color'                  => '#f8fafc',
            'border_radius'               => '10',
            'badge_bg'                    => '#2563eb',
            'badge_text_color'            => '#ffffff',
            'default_simple_size'         => 'large',
            'default_osd_size'            => 'full',
            'default_loading_method'      => 'lazy',
            'default_image_format'        => 'webp_prefer',
            'default_stage_height'        => '500px',
            'default_stage_margin'        => '24px',
            'default_stage_padding'       => '0px',
            'default_stage_border_radius' => '6px',
            'default_stage_border_width'  => '2px',
            'default_stage_border_color'  => '#e2e8f0',
            'default_stage_bg_color'      => '#f8fafc',
            'default_stage_bg_image'      => '',
            'default_stage_bg_size'       => 'repeat auto',
            'default_font_family'         => 'inherit',
            'default_info_msg'            => '',
            
            // Default shape/badge states (treated like a default tag)
            'default_fill_color'          => 'rgba(0,0,0,0.2)',
            'default_border_color'        => '#2563eb',
            'default_badge_shadow'        => '0 2px 6px rgba(0, 0, 0, 0.15)',
            
            'default_hover_fill_color'    => 'rgba(0,0,0,0.3)',
            'default_hover_border_color'  => '#3b82f6',
            'default_hover_badge_shadow'  => '0 4px 12px rgba(0, 0, 0, 0.25)',
            
            'default_selected_fill_color'  => 'rgba(0,0,0,0.3)',
            'default_selected_border_color'=> '#1d4ed8',
            'default_selected_badge_shadow'=> '0 4px 12px rgba(0, 0, 0, 0.25)',

            // Default card states & layout
            'card_inner_padding'          => '16px',
            'card_min_height'             => '0px',
            'card_gap'                    => '16px',
            'card_text_alignment'         => 'left',
            'enable_truncation'           => 1,
            'card_max_height'             => '180px',
            'card_max_lines'              => 3,
            'card_min_width'              => '280px',
            'card_max_width'              => '100%',
            'grid_justify_content'        => 'start',
            'read_more_text'              => '...Read More',
            'show_less_text'              => 'Show Less',
            'card_border_color'           => '#cbd5e1',
            'border_width'                => '0px',
            'border_style'                => 'solid',
            'border_radius'               => '10px',
            'card_shadow'                 => '0 4px 14px rgba(0, 0, 0, 0.08)',
            'card_hover_bg'               => '#334155',
            'card_hover_text'             => '#f8fafc',
            'card_hover_border'           => 'transparent',
            'card_hover_shadow'           => '0 8px 22px rgba(0, 0, 0, 0.15)',
            'card_selected_bg'            => '#0f172a',
            'card_selected_text'          => '#ffffff',
            'card_selected_border'        => '#2563eb',
            'card_selected_shadow'        => '0 8px 24px rgba(0, 0, 0, 0.2)',
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
            'card_bg'                     => isset($input['card_bg']) ? sanitize_text_field($input['card_bg']) : '#1e293b',
            'text_color'                  => isset($input['text_color']) ? sanitize_text_field($input['text_color']) : '#f8fafc',
            'border_radius'               => isset($input['border_radius']) ? (string) intval($input['border_radius']) : '10',
            'badge_bg'                    => isset($input['badge_bg']) ? sanitize_text_field($input['badge_bg']) : '#2563eb',
            'badge_text_color'            => isset($input['badge_text_color']) ? sanitize_text_field($input['badge_text_color']) : '#ffffff',
            'default_simple_size'         => isset($input['default_simple_size']) ? sanitize_key($input['default_simple_size']) : 'large',
            'default_osd_size'            => isset($input['default_osd_size']) ? sanitize_key($input['default_osd_size']) : 'full',
            'default_loading_method'      => isset($input['default_loading_method']) ? sanitize_key($input['default_loading_method']) : 'lazy',
            'default_image_format'        => isset($input['default_image_format']) ? sanitize_key($input['default_image_format']) : 'webp_prefer',
            'default_stage_height'        => isset($input['default_stage_height']) ? sanitize_text_field($input['default_stage_height']) : '500px',
            'default_stage_margin'        => isset($input['default_stage_margin']) ? sanitize_text_field($input['default_stage_margin']) : '24px',
            'default_stage_padding'       => isset($input['default_stage_padding']) ? sanitize_text_field($input['default_stage_padding']) : '0px',
            'default_stage_border_radius' => isset($input['default_stage_border_radius']) ? sanitize_text_field($input['default_stage_border_radius']) : '6px',
            'default_stage_border_width'  => isset($input['default_stage_border_width']) ? sanitize_text_field($input['default_stage_border_width']) : '2px',
            'default_stage_border_color'  => isset($input['default_stage_border_color']) ? sanitize_text_field($input['default_stage_border_color']) : '#e2e8f0',
            'default_stage_bg_color'      => isset($input['default_stage_bg_color']) ? sanitize_text_field($input['default_stage_bg_color']) : '#f8fafc',
            'default_stage_bg_image'      => isset($input['default_stage_bg_image']) ? sanitize_url($input['default_stage_bg_image']) : '',
            'default_stage_bg_size'       => isset($input['default_stage_bg_size']) ? sanitize_text_field($input['default_stage_bg_size']) : 'repeat auto',
            'default_font_family'         => isset($input['default_font_family']) ? sanitize_text_field($input['default_font_family']) : 'inherit',
            'default_info_msg'            => isset($input['default_info_msg']) ? wp_kses_post($input['default_info_msg']) : '',
            
            'default_fill_color'          => isset($input['default_fill_color']) ? sanitize_text_field($input['default_fill_color']) : 'rgba(0,0,0,0.2)',
            'default_border_color'        => isset($input['default_border_color']) ? sanitize_text_field($input['default_border_color']) : '#2563eb',
            'default_badge_shadow'        => isset($input['default_badge_shadow']) ? sanitize_text_field($input['default_badge_shadow']) : '0 2px 6px rgba(0, 0, 0, 0.15)',
            
            'default_hover_fill_color'    => isset($input['default_hover_fill_color']) ? sanitize_text_field($input['default_hover_fill_color']) : 'rgba(0,0,0,0.3)',
            'default_hover_border_color'  => isset($input['default_hover_border_color']) ? sanitize_text_field($input['default_hover_border_color']) : '#3b82f6',
            'default_hover_badge_shadow'  => isset($input['default_hover_badge_shadow']) ? sanitize_text_field($input['default_hover_badge_shadow']) : '0 4px 12px rgba(0, 0, 0, 0.25)',
            
            'default_selected_fill_color'  => isset($input['default_selected_fill_color']) ? sanitize_text_field($input['default_selected_fill_color']) : 'rgba(0,0,0,0.3)',
            'default_selected_border_color'=> isset($input['default_selected_border_color']) ? sanitize_text_field($input['default_selected_border_color']) : '#1d4ed8',
            'default_selected_badge_bg'   => isset($input['default_selected_badge_bg']) ? sanitize_text_field($input['default_selected_badge_bg']) : '#1d4ed8',
            'default_selected_badge_text_color'=> isset($input['default_selected_badge_text_color']) ? sanitize_text_field($input['default_selected_badge_text_color']) : '#ffffff',
            'default_selected_badge_shadow'=> isset($input['default_selected_badge_shadow']) ? sanitize_text_field($input['default_selected_badge_shadow']) : '0 4px 12px rgba(0, 0, 0, 0.25)',

            'card_border_color'           => isset($input['card_border_color']) ? sanitize_text_field($input['card_border_color']) : '#cbd5e1',
            'card_shadow'                 => isset($input['card_shadow']) ? sanitize_text_field($input['card_shadow']) : '0 4px 14px rgba(0, 0, 0, 0.08)',
            'card_hover_bg'               => isset($input['card_hover_bg']) ? sanitize_text_field($input['card_hover_bg']) : '#334155',
            'card_hover_text'             => isset($input['card_hover_text']) ? sanitize_text_field($input['card_hover_text']) : '#f8fafc',
            'card_hover_border'           => isset($input['card_hover_border']) ? sanitize_text_field($input['card_hover_border']) : 'transparent',
            'card_hover_shadow'           => isset($input['card_hover_shadow']) ? sanitize_text_field($input['card_hover_shadow']) : '0 8px 22px rgba(0, 0, 0, 0.15)',
            
            'card_selected_bg'            => isset($input['card_selected_bg']) ? sanitize_text_field($input['card_selected_bg']) : '#0f172a',
            'card_selected_text'          => isset($input['card_selected_text']) ? sanitize_text_field($input['card_selected_text']) : '#ffffff',
            'card_selected_border'        => isset($input['card_selected_border']) ? sanitize_text_field($input['card_selected_border']) : '#2563eb',
            'card_selected_shadow'        => isset($input['card_selected_shadow']) ? sanitize_text_field($input['card_selected_shadow']) : '0 8px 24px rgba(0, 0, 0, 0.2)',

            'seq_toolbar_bg'                 => isset($input['seq_toolbar_bg']) ? sanitize_text_field($input['seq_toolbar_bg']) : 'rgba(255,255,255,0.05)',
            'seq_toolbar_text_color'         => isset($input['seq_toolbar_text_color']) ? sanitize_text_field($input['seq_toolbar_text_color']) : '',
            'seq_toolbar_border_color'       => isset($input['seq_toolbar_border_color']) ? sanitize_text_field($input['seq_toolbar_border_color']) : 'transparent',
            'seq_toolbar_border_width'       => isset($input['seq_toolbar_border_width']) ? sanitize_text_field($input['seq_toolbar_border_width']) : '0px',
            'seq_toolbar_border_radius'      => isset($input['seq_toolbar_border_radius']) ? sanitize_text_field($input['seq_toolbar_border_radius']) : '6px',
            'seq_toolbar_font_size'          => isset($input['seq_toolbar_font_size']) ? sanitize_text_field($input['seq_toolbar_font_size']) : '14px',
            'seq_toolbar_font_family'        => isset($input['seq_toolbar_font_family']) ? sanitize_text_field($input['seq_toolbar_font_family']) : 'inherit',
            'seq_toolbar_hover_bg'           => isset($input['seq_toolbar_hover_bg']) ? sanitize_text_field($input['seq_toolbar_hover_bg']) : 'rgba(255,255,255,0.15)',
            'seq_toolbar_hover_color'        => isset($input['seq_toolbar_hover_color']) ? sanitize_text_field($input['seq_toolbar_hover_color']) : '#ffffff',

            'action_toolbar_bg'              => isset($input['action_toolbar_bg']) ? sanitize_text_field($input['action_toolbar_bg']) : 'rgba(255,255,255,0.05)',
            'action_toolbar_text_color'      => isset($input['action_toolbar_text_color']) ? sanitize_text_field($input['action_toolbar_text_color']) : '',
            'action_toolbar_border_color'    => isset($input['action_toolbar_border_color']) ? sanitize_text_field($input['action_toolbar_border_color']) : 'transparent',
            'action_toolbar_border_width'    => isset($input['action_toolbar_border_width']) ? sanitize_text_field($input['action_toolbar_border_width']) : '0px',
            'action_toolbar_border_radius'   => isset($input['action_toolbar_border_radius']) ? sanitize_text_field($input['action_toolbar_border_radius']) : '6px',
            'action_toolbar_font_size'       => isset($input['action_toolbar_font_size']) ? sanitize_text_field($input['action_toolbar_font_size']) : '14px',
            'action_toolbar_font_family'     => isset($input['action_toolbar_font_family']) ? sanitize_text_field($input['action_toolbar_font_family']) : 'inherit',
            'action_toolbar_hover_bg'        => isset($input['action_toolbar_hover_bg']) ? sanitize_text_field($input['action_toolbar_hover_bg']) : 'rgba(255,255,255,0.15)',
            'action_toolbar_hover_color'     => isset($input['action_toolbar_hover_color']) ? sanitize_text_field($input['action_toolbar_hover_color']) : '#ffffff',

            'toolbar_bg'                     => isset($input['toolbar_bg']) ? sanitize_text_field($input['toolbar_bg']) : 'rgba(255,255,255,0.05)',
            'toolbar_text_color'             => isset($input['toolbar_text_color']) ? sanitize_text_field($input['toolbar_text_color']) : '',
            'toolbar_border_color'           => isset($input['toolbar_border_color']) ? sanitize_text_field($input['toolbar_border_color']) : 'transparent',
            'toolbar_border_width'           => isset($input['toolbar_border_width']) ? sanitize_text_field($input['toolbar_border_width']) : '0px',
            'toolbar_border_radius'          => isset($input['toolbar_border_radius']) ? sanitize_text_field($input['toolbar_border_radius']) : '6px',
            'toolbar_font_size'              => isset($input['toolbar_font_size']) ? sanitize_text_field($input['toolbar_font_size']) : '14px',
            'toolbar_font_family'            => isset($input['toolbar_font_family']) ? sanitize_text_field($input['toolbar_font_family']) : 'inherit',
            'toolbar_hover_bg'               => isset($input['toolbar_hover_bg']) ? sanitize_text_field($input['toolbar_hover_bg']) : 'rgba(255,255,255,0.15)',
            'toolbar_hover_color'            => isset($input['toolbar_hover_color']) ? sanitize_text_field($input['toolbar_hover_color']) : '#ffffff',
            'toolbar_hover_opacity'          => isset($input['toolbar_hover_opacity']) ? sanitize_text_field($input['toolbar_hover_opacity']) : '1',
            'toolbar_hover_scale'            => isset($input['toolbar_hover_scale']) ? sanitize_text_field($input['toolbar_hover_scale']) : '1.05',
            'toolbar_hover_shadow'           => isset($input['toolbar_hover_shadow']) ? sanitize_text_field($input['toolbar_hover_shadow']) : '0 4px 12px rgba(0,0,0,0.1)',
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
                    'tag'                   => $tag_name,
                    'fill_color'            => $fill,
                    'border_color'          => $border,
                    'badge_bg'              => $badge,
                    'badge_text_color'      => $badge_tc,
                    'badge_shadow'          => $badge_sh,
                    
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

        $editing_roles     = self::get_editing_roles();
        $osd_options       = self::get_osd_options();
        $card_styles       = self::get_card_styles();
        $tag_colors        = self::get_tag_colors();

        global $wp_roles;
        $all_roles = $wp_roles ? $wp_roles->get_names() : [];

        include ARWAI_AZI_VIEWER_PATH . 'templates/admin-settings.php';
    }
}
