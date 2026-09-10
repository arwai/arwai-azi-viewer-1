<?php
namespace Arwai\ImageAnnotator\Blocks;

use Arwai\ImageAnnotator\Database;
use Arwai\ImageAnnotator\Admin\SettingsPage;

if (!defined('ABSPATH')) {
    exit;
}

class AnnotationListBlock {
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
        register_block_type(ARWAI_AZI_VIEWER_PATH . 'build/annotation-list', [
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
        $post_id = isset($attributes['postId']) && $attributes['postId'] > 0 ? (int) $attributes['postId'] : get_the_ID();
        $columns = isset($attributes['columns']) ? (int) $attributes['columns'] : 2;
        $target_viewer_id = isset($attributes['targetViewerId']) ? sanitize_text_field($attributes['targetViewerId']) : '';

        $image_ids = get_post_meta($post_id, '_arwai_azi_viewer_image_ids', true);
        $all_annotations = [];

        if (!empty($image_ids)) {
            $ids = is_array($image_ids) ? $image_ids : json_decode($image_ids, true);
            if (is_array($ids)) {
                foreach ($ids as $att_id) {
                    $annos = Database::get_annotations_by_attachment((int) $att_id);
                    foreach ($annos as $anno) {
                        $anno['_attachment_id'] = (int) $att_id;
                        $all_annotations[] = $anno;
                    }
                }
            }
        }

        if (empty($all_annotations) && has_post_thumbnail($post_id)) {
            $thumb_id = get_post_thumbnail_id($post_id);
            $annos = Database::get_annotations_by_attachment($thumb_id);
            foreach ($annos as $anno) {
                $anno['_attachment_id'] = (int) $thumb_id;
                $all_annotations[] = $anno;
            }
        }

        ViewerBlock::enqueue_frontend_assets();

        $unique_id   = wp_unique_id('anno_cards_');
        $card_styles = SettingsPage::get_card_styles();
        
        $native_bg = !empty($attributes['backgroundColor']) ? 'var(--wp--preset--color--' . $attributes['backgroundColor'] . ')' : ($attributes['style']['color']['background'] ?? '');
        $native_text = !empty($attributes['textColor']) ? 'var(--wp--preset--color--' . $attributes['textColor'] . ')' : ($attributes['style']['color']['text'] ?? '');
        $native_border_color = !empty($attributes['borderColor']) ? 'var(--wp--preset--color--' . $attributes['borderColor'] . ')' : ($attributes['style']['border']['color'] ?? '');
        $native_border_style = !empty($attributes['cardBorderStyle']) ? $attributes['cardBorderStyle'] : (!empty($attributes['style']['border']['style']) ? $attributes['style']['border']['style'] : 'solid');
        
        // Handle Border Radius (string or object)
        $native_border_radius = '';
        if (!empty($attributes['cardBorderRadius'])) {
            $native_border_radius = self::parse_unit($attributes['cardBorderRadius']);
        } elseif (!empty($attributes['style']['border']['radius'])) {
            $r = $attributes['style']['border']['radius'];
            if (is_array($r)) {
                $tl = self::parse_unit($r['topLeft'] ?? '0px');
                $tr = self::parse_unit($r['topRight'] ?? '0px');
                $br = self::parse_unit($r['bottomRight'] ?? '0px');
                $bl = self::parse_unit($r['bottomLeft'] ?? '0px');
                $native_border_radius = "$tl $tr $br $bl";
            } else {
                $native_border_radius = self::parse_unit($r);
            }
        }

        // Handle Border Width (string or object)
        $native_border_width = '';
        if (!empty($attributes['cardBorderWidth'])) {
            $native_border_width = self::parse_unit($attributes['cardBorderWidth']);
        } elseif (!empty($attributes['style']['border']['width'])) {
            $w = $attributes['style']['border']['width'];
            if (is_array($w)) {
                $wt = self::parse_unit($w['top'] ?? '0px');
                $wr = self::parse_unit($w['right'] ?? '0px');
                $wb = self::parse_unit($w['bottom'] ?? '0px');
                $wl = self::parse_unit($w['left'] ?? '0px');
                $native_border_width = "$wt $wr $wb $wl";
            } else {
                $native_border_width = self::parse_unit($w);
            }
        }
        
        $native_shadow = '';
        if (!empty($attributes['style']['shadow'])) {
            $s = $attributes['style']['shadow'];
            $native_shadow = str_replace('var:preset|shadow|', 'var(--wp--preset--shadow--', $s);
            if (strpos($native_shadow, 'var(') !== false && substr($native_shadow, -1) !== ')') {
                $native_shadow .= ')';
            }
        }

        $card_border_color_override = !empty($attributes['cardBorderColor']) ? $attributes['cardBorderColor'] : '';

        $card_styles['card_bg']            = !empty($native_bg) ? $native_bg : (!empty($card_styles['card_bg']) ? $card_styles['card_bg'] : '#ffffff');
        $card_styles['text_color']         = !empty($native_text) ? $native_text : (!empty($card_styles['text_color']) ? $card_styles['text_color'] : '#334155');
        $card_styles['card_border_color']  = !empty($card_border_color_override) ? $card_border_color_override : (!empty($native_border_color) ? $native_border_color : (!empty($card_styles['card_border_color']) ? $card_styles['card_border_color'] : '#cbd5e1'));
        $card_styles['border_style']       = !empty($native_border_style) ? $native_border_style : (!empty($card_styles['border_style']) ? $card_styles['border_style'] : 'solid');
        $card_styles['border_radius']      = !empty($native_border_radius) ? $native_border_radius : (!empty($card_styles['border_radius']) ? $card_styles['border_radius'] : '10px');
        $card_styles['border_width']       = !empty($native_border_width) ? $native_border_width : (!empty($card_styles['border_width']) ? $card_styles['border_width'] : '2px');
        $card_styles['card_shadow']        = !empty($native_shadow) ? $native_shadow : (!empty($card_styles['card_shadow']) ? $card_styles['card_shadow'] : '0 4px 14px rgba(0, 0, 0, 0.08)');
        
        $card_styles['card_hover_bg']      = !empty($attributes['hoverBackgroundColor']) ? $attributes['hoverBackgroundColor'] : ($card_styles['card_hover_bg'] ?? '#f8fafc');
        $card_styles['card_hover_text']    = !empty($attributes['hoverTextColor']) ? $attributes['hoverTextColor'] : ($card_styles['card_hover_text'] ?? '#334155');
        $card_styles['card_hover_border']  = !empty($attributes['hoverBorderColor']) ? $attributes['hoverBorderColor'] : ($card_styles['card_hover_border'] ?? '#cbd5e1');
        $card_styles['card_hover_shadow']  = $card_styles['card_shadow'];

        $native_padding = '';
        if (!empty($attributes['style']['spacing']['padding'])) {
            $p = $attributes['style']['spacing']['padding'];
            if (is_string($p)) {
                $native_padding = preg_replace('/var:preset\|spacing\|([a-zA-Z0-9-]+)/', 'var(--wp--preset--spacing--$1)', $p);
            } elseif (is_array($p)) {
                $top = $p['top'] ?? '0px';
                $right = $p['right'] ?? '0px';
                $bottom = $p['bottom'] ?? '0px';
                $left = $p['left'] ?? '0px';
                $native_padding = trim("$top $right $bottom $left");
                $native_padding = preg_replace('/var:preset\|spacing\|([a-zA-Z0-9-]+)/', 'var(--wp--preset--spacing--$1)', $native_padding);
            }
        }

        $card_styles['card_selected_bg']     = !empty($attributes['selectedBackgroundColor']) ? $attributes['selectedBackgroundColor'] : ($card_styles['card_selected_bg'] ?? '#f1f5f9');
        $card_styles['card_selected_text']   = !empty($attributes['selectedTextColor']) ? $attributes['selectedTextColor'] : ($card_styles['card_selected_text'] ?? '#0f172a');
        $card_styles['card_selected_border'] = !empty($attributes['selectedBorderColor']) ? $attributes['selectedBorderColor'] : ($card_styles['card_selected_border'] ?? '#0f172a');
        $card_styles['card_selected_shadow'] = $card_styles['card_shadow'];
        $card_styles['card_inner_padding']  = !empty($native_padding) ? $native_padding : '16px';
        $card_styles['card_min_height']     = !empty($attributes['style']['dimensions']['minHeight']) ? self::parse_unit($attributes['style']['dimensions']['minHeight']) : '0px';
        $card_styles['enable_truncation']   = isset($attributes['enableTruncation']) ? (bool)$attributes['enableTruncation'] : (bool)($card_styles['enable_truncation'] ?? true);
        $card_styles['card_max_lines']      = !empty($attributes['cardMaxLines']) ? (int) $attributes['cardMaxLines'] : (int) ($card_styles['card_max_lines'] ?? 3);
        $card_styles['card_min_width']      = !empty($attributes['cardMinWidth']) ? self::parse_unit($attributes['cardMinWidth']) : ($card_styles['card_min_width'] ?? '280px');
        $card_styles['card_max_width']      = !empty($attributes['cardMaxWidth']) ? self::parse_unit($attributes['cardMaxWidth']) : ($card_styles['card_max_width'] ?? '100%');
        $card_styles['grid_justify_content'] = !empty($attributes['gridJustifyContent']) ? $attributes['gridJustifyContent'] : ($card_styles['grid_justify_content'] ?? 'start');
        $card_styles['read_more_text']      = !empty($attributes['readMoreText']) ? $attributes['readMoreText'] : ($card_styles['read_more_text'] ?? '...Read More');
        $card_styles['show_less_text']      = !empty($attributes['showLessText']) ? $attributes['showLessText'] : ($card_styles['show_less_text'] ?? 'Show Less');

        $align       = !empty($attributes['align']) ? sanitize_html_class($attributes['align']) : '';
        $align_class = !empty($align) ? 'align' . $align : '';

        $native_gap = '16px';
        if (!empty($attributes['style']['spacing']['blockGap'])) {
            $g = $attributes['style']['spacing']['blockGap'];
            if (is_string($g)) {
                $native_gap = preg_replace('/var:preset\|spacing\|([a-zA-Z0-9-]+)/', 'var(--wp--preset--spacing--$1)', $g);
            }
        }

        $wrapper_attributes = get_block_wrapper_attributes([
            'class'                     => 'arwai-aziv-cards-grid cols-' . (int) $columns . ' ' . $align_class,
            'id'                        => $unique_id,
            'data-post-id'              => $post_id,
            'data-enable-truncation'     => $card_styles['enable_truncation'] ? '1' : '0',
            'data-card-max-lines'        => (int) $card_styles['card_max_lines'],
            'data-read-more-text'        => $card_styles['read_more_text'],
            'data-show-less-text'        => $card_styles['show_less_text'],
            'style'                      => sprintf(
                '--card-min-width:%s; --card-max-width:%s; --card-max-lines:%d; --grid-justify-content:%s; --card-gap:%s; column-gap:%s;',
                esc_attr($card_styles['card_min_width']),
                esc_attr($card_styles['card_max_width']),
                (int) $card_styles['card_max_lines'],
                esc_attr($card_styles['grid_justify_content']),
                esc_attr($native_gap),
                esc_attr($native_gap)
            )
        ]);

        $tag_colors  = SettingsPage::get_tag_colors();

        ob_start();
        include ARWAI_AZI_VIEWER_PATH . 'templates/annotation-cards-list.php';
        return ob_get_clean();
    }
}
