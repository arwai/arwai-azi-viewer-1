<?php
if (!defined('ABSPATH')) {
    exit;
}

/** @var string $unique_id */
/** @var array $all_annotations */
/** @var int $columns */
/** @var array $card_styles */
/** @var array $tag_colors */

$bg_color       = !empty($card_styles['card_bg']) ? $card_styles['card_bg'] : '#1e293b';
$text_color     = !empty($card_styles['text_color']) ? $card_styles['text_color'] : '#f8fafc';
$border_radius  = (!empty($card_styles['border_radius'])) ? esc_attr($card_styles['border_radius']) : '10px';
if (is_numeric($border_radius)) { $border_radius .= 'px'; }
$border_color   = !empty($card_styles['card_border_color']) ? $card_styles['card_border_color'] : '#cbd5e1';
$border_width   = (!empty($card_styles['border_width']) || (isset($card_styles['border_width']) && $card_styles['border_width'] === '0')) ? esc_attr($card_styles['border_width']) : '2px';
if (is_numeric($border_width)) { $border_width .= 'px'; }
$border_style   = !empty($card_styles['border_style']) ? esc_attr($card_styles['border_style']) : 'solid';
$card_shadow    = !empty($card_styles['card_shadow']) ? $card_styles['card_shadow'] : '0 4px 14px rgba(0, 0, 0, 0.08)';

$hover_bg       = !empty($card_styles['card_hover_bg']) ? $card_styles['card_hover_bg'] : '#334155';
$hover_text     = !empty($card_styles['card_hover_text']) ? $card_styles['card_hover_text'] : '#f8fafc';
$hover_border   = !empty($card_styles['card_hover_border']) ? $card_styles['card_hover_border'] : 'transparent';
$hover_shadow   = !empty($card_styles['card_hover_shadow']) ? $card_styles['card_hover_shadow'] : '0 8px 22px rgba(0, 0, 0, 0.15)';

$selected_bg     = !empty($card_styles['card_selected_bg']) ? $card_styles['card_selected_bg'] : '#0f172a';
$selected_text   = !empty($card_styles['card_selected_text']) ? $card_styles['card_selected_text'] : '#ffffff';
$selected_border = !empty($card_styles['card_selected_border']) ? $card_styles['card_selected_border'] : '#2563eb';
$selected_shadow = !empty($card_styles['card_selected_shadow']) ? $card_styles['card_selected_shadow'] : '0 8px 24px rgba(0, 0, 0, 0.2)';

$base_badge_bg  = !empty($card_styles['badge_bg']) ? $card_styles['badge_bg'] : '#2563eb';
$badge_text_col = !empty($card_styles['badge_text_color']) ? $card_styles['badge_text_color'] : '#ffffff';

$card_inner_padding = !empty($card_styles['card_inner_padding']) ? $card_styles['card_inner_padding'] : '16px';
$card_min_height    = !empty($card_styles['card_min_height']) ? $card_styles['card_min_height'] : '0px';
$card_gap           = !empty($card_styles['card_gap']) ? $card_styles['card_gap'] : '16px';
$card_text_align    = !empty($card_styles['card_text_alignment']) ? $card_styles['card_text_alignment'] : 'left';

// Build lookup map for tag colors
$tag_map = [];
if (!empty($tag_colors)) {
    foreach ($tag_colors as $rule) {
        if (!empty($rule['tag'])) {
            $tag_map[strtolower(trim($rule['tag']))] = $rule;
        }
    }
}
?>

<div <?php echo isset($wrapper_attributes) ? $wrapper_attributes : 'class="arwai-azi-viewer-cards-grid cols-' . (int) $columns . ' ' . esc_attr($align_class) . '" id="' . esc_attr($unique_id) . '" data-post-id="' . esc_attr($post_id) . '" data-card-inner-padding="' . esc_attr($card_inner_padding) . '" data-card-min-height="' . esc_attr($card_min_height) . '" data-card-gap="' . esc_attr($card_gap) . '" data-card-text-alignment="' . esc_attr($card_text_align) . '"'; ?> <?php if (!empty($target_viewer_id)) : ?>data-target-viewer-id="<?php echo esc_attr($target_viewer_id); ?>"<?php endif; ?>
     data-override-card-bg="<?php echo esc_attr($card_styles['card_bg'] ?? ''); ?>"
     data-override-card-text-color="<?php echo esc_attr($card_styles['text_color'] ?? ''); ?>"
     data-override-card-border-color="<?php echo esc_attr($card_styles['card_border_color'] ?? ''); ?>"
     data-override-border-radius="<?php echo esc_attr($card_styles['border_radius'] ?? ''); ?>"
     data-override-border-width="<?php echo esc_attr($card_styles['border_width'] ?? ''); ?>"
     data-override-border-style="<?php echo esc_attr($card_styles['border_style'] ?? ''); ?>"
     data-override-card-shadow="<?php echo esc_attr($card_styles['card_shadow'] ?? ''); ?>"
     data-override-card-hover-bg="<?php echo esc_attr($card_styles['card_hover_bg'] ?? ''); ?>"
     data-override-card-hover-text-color="<?php echo esc_attr($card_styles['card_hover_text'] ?? ''); ?>"
     data-override-card-hover-border-color="<?php echo esc_attr($card_styles['card_hover_border'] ?? ''); ?>"
     data-override-card-hover-shadow="<?php echo esc_attr($card_styles['card_hover_shadow'] ?? ''); ?>"
     data-override-card-selected-bg="<?php echo esc_attr($card_styles['card_selected_bg'] ?? ''); ?>"
     data-override-card-selected-text-color="<?php echo esc_attr($card_styles['card_selected_text'] ?? ''); ?>"
     data-override-card-selected-border-color="<?php echo esc_attr($card_styles['card_selected_border'] ?? ''); ?>"
     data-override-card-selected-shadow="<?php echo esc_attr($card_styles['card_selected_shadow'] ?? ''); ?>"
     style="gap:<?php echo esc_attr($card_styles['card_gap'] ?? '16px'); ?>; --grid-justify-content:<?php echo esc_attr($card_styles['grid_justify_content'] ?? 'start'); ?>; --card-min-width:<?php echo esc_attr($card_styles['card_min_width'] ?? '280px'); ?>; --card-max-width:<?php echo esc_attr($card_styles['card_max_width'] ?? '100%'); ?>; --card-max-height:<?php echo esc_attr($card_styles['card_max_height'] ?? '180px'); ?>;">
    <?php if (empty($all_annotations)) : ?>
        <div class="arwai-azi-viewer-empty-cards">
            <p><?php esc_html_e('No annotations found for this post.', 'arwai-azi-viewer'); ?></p>
        </div>
    <?php else : ?>
        <?php foreach ($all_annotations as $index => $anno) : 
            $anno_id    = isset($anno['id']) ? $anno['id'] : 'anno-' . ($index + 1);
            $att_id     = isset($anno['_attachment_id']) ? (int) $anno['_attachment_id'] : 0;
            $badge_num  = isset($anno['db_id']) ? (int) $anno['db_id'] : ($index + 1);

            $comments   = [];
            $tags       = [];
            $creator    = 'arwai';
            $user_login = 'arwai';
            $full_name  = 'arwai';
            $created    = '';

            if (isset($anno['body']) && is_array($anno['body'])) {
                foreach ($anno['body'] as $body) {
                    if (isset($body['purpose'])) {
                        if (($body['purpose'] === 'commenting' || $body['purpose'] === 'replying') && !empty($body['value'])) {
                            $comments[] = $body['value'];
                        } elseif ($body['purpose'] === 'tagging' && !empty($body['value'])) {
                            $tags[] = $body['value'];
                        }
                    } elseif (!empty($body['value'])) {
                        $comments[] = $body['value'];
                    }

                    if (isset($body['creator'])) {
                        if (is_array($body['creator'])) {
                            if (!empty($body['creator']['name'])) {
                                $creator = $body['creator']['name'];
                            }
                            if (!empty($body['creator']['id'])) {
                                $u_obj = get_userdata((int) $body['creator']['id']);
                                if ($u_obj) {
                                    $user_login = $u_obj->user_login;
                                    $fn = trim($u_obj->first_name . ' ' . $u_obj->last_name);
                                    $full_name = !empty($fn) ? $fn : $u_obj->display_name;
                                    $creator   = $u_obj->display_name;
                                }
                            }
                        }
                    }

                    if (empty($created) && !empty($body['created'])) {
                        $time = strtotime($body['created']);
                        $created = $time ? human_time_diff($time, current_time('timestamp')) . ' ' . __('ago', 'arwai-azi-viewer') : '';
                    }
                }
            }

            if (empty($created) && !empty($anno['created'])) {
                $time = strtotime($anno['created']);
                $created = $time ? human_time_diff($time, current_time('timestamp')) . ' ' . __('ago', 'arwai-azi-viewer') : '';
            }

            // Determine tag-correlated color
            $matched_border = '';
            $matched_badge  = $base_badge_bg;

            foreach ($tags as $tag_val) {
                $t_lower = strtolower(trim($tag_val));
                if (isset($tag_map[$t_lower])) {
                    $matched_border = $tag_map[$t_lower]['border_color'];
                    $matched_badge  = $tag_map[$t_lower]['badge_bg'];
                    break;
                }
            }

            $card_style_attr = sprintf(
                '--card-bg:%s; --card-text:%s; --card-border-radius:%s; --card-border-color:%s; --card-border-width:%s; --card-border-style:%s; --card-shadow:%s; --card-hover-bg:%s; --card-hover-text:%s; --card-hover-border:%s; --card-hover-shadow:%s; --card-selected-bg:%s; --card-selected-text:%s; --card-selected-border:%s; --card-selected-shadow:%s; padding:%s; min-height:%s; %s',
                esc_attr($bg_color),
                esc_attr($text_color),
                esc_attr($border_radius),
                esc_attr($border_color),
                esc_attr($border_width),
                esc_attr($border_style),
                esc_attr($card_shadow),
                esc_attr($hover_bg),
                esc_attr($hover_text),
                esc_attr($hover_border),
                esc_attr($hover_shadow),
                esc_attr($selected_bg),
                esc_attr($selected_text),
                esc_attr($selected_border),
                esc_attr($selected_shadow),
                esc_attr($card_inner_padding),
                esc_attr($card_min_height),
                $matched_border ? 'border-top: 4px solid ' . esc_attr($matched_border) . ';' : ''
            );

            $badge_style_attr = sprintf(
                'background-color:%s; color:%s;',
                esc_attr($matched_badge),
                esc_attr($badge_text_col)
            );
        ?>
            <div class="annotation-card-item" 
                 data-annotation-id="<?php echo esc_attr($anno_id); ?>" 
                 data-attachment-id="<?php echo esc_attr($att_id); ?>" 
                 style="<?php echo $card_style_attr; ?>">
                <div class="card-header-bar">
                    <span class="card-badge-circle" style="<?php echo esc_attr($badge_style_attr); ?>"><?php echo (int) $badge_num; ?></span>
                    <div class="card-author-meta">
                        <strong class="author-name anno-user-name" data-display="<?php echo esc_attr($creator); ?>" data-login="<?php echo esc_attr($user_login); ?>" data-fullname="<?php echo esc_attr($full_name); ?>" style="cursor: pointer;"><?php echo esc_html($creator); ?></strong>
                        <?php if ($created) : ?>
                            <span class="created-time"><?php echo esc_html($created); ?></span>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="card-body-text">
                    <?php if (!empty($comments)) : ?>
                        <?php foreach ($comments as $comment) : ?>
                            <p><?php echo wp_kses_post($comment); ?></p>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <p class="empty-comment"><em><?php esc_html_e('No comment text', 'arwai-azi-viewer'); ?></em></p>
                    <?php endif; ?>
                </div>

                <?php if (!empty($tags)) : ?>
                    <div class="card-tags-footer">
                        <?php foreach ($tags as $tag_val) : ?>
                            <span class="card-tag-badge">#<?php echo esc_html($tag_val); ?></span>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>
