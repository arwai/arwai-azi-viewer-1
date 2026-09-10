<?php
if (!defined('ABSPATH')) {
    exit;
}

/** @var array $all_roles */
/** @var array $editing_roles */
/** @var array $osd_options */
/** @var array $card_styles */
/** @var array $tag_colors */

wp_enqueue_style('wp-color-picker');
wp_enqueue_script('wp-color-picker');

$size_options_map = apply_filters( 'image_size_names_choose', array(
    'full'         => __( 'Full Size (Original)', 'arwai-azi-viewer' ),
    '2048x2048'    => __( '2048x2048 (2x Large)', 'arwai-azi-viewer' ),
    '1536x1536'    => __( '1536x1536 (2x Medium Large)', 'arwai-azi-viewer' ),
    'large'        => __( 'Large', 'arwai-azi-viewer' ),
    'medium_large' => __( 'Medium Large', 'arwai-azi-viewer' ),
    'medium'       => __( 'Medium', 'arwai-azi-viewer' ),
    'thumbnail'    => __( 'Thumbnail', 'arwai-azi-viewer' ),
) );

$all_intermediate = get_intermediate_image_sizes();
foreach ( $all_intermediate as $s ) {
    if ( ! isset( $size_options_map[ $s ] ) ) {
        $size_options_map[ $s ] = ucwords( str_replace( array( '-', '_' ), ' ', $s ) );
    }
}
?>
<div class="wrap arwai-azi-viewer-settings-wrap">
    <h1 class="wp-heading-inline" style="margin-bottom:16px;"><?php esc_html_e('Annotate Zoom Image Viewer Settings', 'arwai-azi-viewer'); ?></h1>

    <h2 class="nav-tab-wrapper arwai-azi-viewer-tabs" style="margin-bottom: 24px;">
        <a href="#tab-general" class="nav-tab nav-tab-active" data-tab="tab-general">
            <span class="dashicons dashicons-admin-generic" style="vertical-align:-2px; margin-right:4px;"></span>
            <?php esc_html_e('General & Engine', 'arwai-azi-viewer'); ?>
        </a>
        <a href="#tab-overlays" class="nav-tab" data-tab="tab-overlays">
            <span class="dashicons dashicons-art" style="vertical-align:-2px; margin-right:4px;"></span>
            <?php esc_html_e('Annotation Canvas & Tags', 'arwai-azi-viewer'); ?>
        </a>
        <a href="#tab-images-cards" class="nav-tab" data-tab="tab-images-cards">
            <span class="dashicons dashicons-format-image" style="vertical-align:-2px; margin-right:4px;"></span>
            <?php esc_html_e('Image Defaults & Card Behavior', 'arwai-azi-viewer'); ?>
        </a>
    </h2>

    <form method="post" action="options.php" id="arwai-azi-viewer-settings-form">
        <?php
        settings_fields('arwai_azi_viewer_settings_group');
        do_settings_sections('arwai_azi_viewer_settings_group');
        ?>

        <!-- TAB 1: General & Engine -->
        <div id="tab-general" class="tab-content">
            <!-- Editing Permissions -->
            <div class="settings-card" style="background:#fff; padding:24px; border:1px solid #ccd0d4; border-radius:6px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,.05);">
                <h2 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:20px; font-size:1.2em;"><?php esc_html_e('Editing Permissions', 'arwai-azi-viewer'); ?></h2>
                <table class="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('User Role Editing Permissions', 'arwai-azi-viewer'); ?></label>
                                <p class="description" style="font-weight:normal; margin-top:6px;"><?php esc_html_e('Which user roles are permitted to create, edit, or delete annotations? All other users can only view them.', 'arwai-azi-viewer'); ?></p>
                            </th>
                            <td>
                                <fieldset>
                                    <?php foreach ($all_roles as $role_key => $role_name) : ?>
                                        <label style="display: inline-block; margin-right: 20px; margin-bottom: 8px;">
                                            <input type="checkbox" name="arwai_azi_viewer_editing_roles[]" value="<?php echo esc_attr($role_key); ?>" <?php checked(in_array($role_key, $editing_roles, true)); ?> />
                                            <strong><?php echo esc_html($role_name); ?></strong> <code>(<?php echo esc_html($role_key); ?>)</code>
                                        </label>
                                    <?php endforeach; ?>
                                </fieldset>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- OpenSeadragon Engine Defaults -->
            <div class="settings-card" style="background:#fff; padding:24px; border:1px solid #ccd0d4; border-radius:6px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,.05);">
                <h2 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:20px; font-size:1.2em;"><?php esc_html_e('OpenSeadragon Deep-Zoom Engine Defaults', 'arwai-azi-viewer'); ?></h2>
                <table class="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row"><label for="osd_min_zoom"><?php esc_html_e('Minimum Zoom Level', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <input type="number" step="0.1" name="arwai_azi_viewer_osd_options[minZoomLevel]" id="osd_min_zoom" value="<?php echo esc_attr($osd_options['minZoomLevel'] ?? '0.3'); ?>" class="small-text" />
                                <p class="description"><?php esc_html_e('Minimum zoom ratio allowed for OpenSeadragon viewer instances (default: 0.3).', 'arwai-azi-viewer'); ?></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="osd_max_zoom"><?php esc_html_e('Maximum Zoom Level', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <input type="number" step="0.5" name="arwai_azi_viewer_osd_options[maxZoomLevel]" id="osd_max_zoom" value="<?php echo esc_attr($osd_options['maxZoomLevel'] ?? '10'); ?>" class="small-text" />
                                <p class="description"><?php esc_html_e('Maximum zoom ratio allowed for OpenSeadragon viewer instances (default: 10).', 'arwai-azi-viewer'); ?></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="osd_anim_time"><?php esc_html_e('Animation Duration (Seconds)', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <input type="number" step="0.1" name="arwai_azi_viewer_osd_options[animationTime]" id="osd_anim_time" value="<?php echo esc_attr($osd_options['animationTime'] ?? '1.2'); ?>" class="small-text" />
                                <p class="description"><?php esc_html_e('Smooth spring animation time in seconds for zooming and panning (default: 1.2s).', 'arwai-azi-viewer'); ?></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><?php esc_html_e('Display Mini Navigator Map', 'arwai-azi-viewer'); ?></th>
                            <td>
                                <label for="osd_show_navigator">
                                    <input type="checkbox" name="arwai_azi_viewer_osd_options[showNavigator]" id="osd_show_navigator" value="1" <?php checked($osd_options['showNavigator'] ?? '0', '1'); ?> />
                                    <?php esc_html_e('Show picture-in-picture navigator map in bottom corner', 'arwai-azi-viewer'); ?>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><?php esc_html_e('Mouse Wheel Zoom Gesture', 'arwai-azi-viewer'); ?></th>
                            <td>
                                <label for="osd_gesture_mouse">
                                    <input type="checkbox" name="arwai_azi_viewer_osd_options[gestureSettingsMouse]" id="osd_gesture_mouse" value="1" <?php checked($osd_options['gestureSettingsMouse'] ?? '0', '1'); ?> />
                                    <?php esc_html_e('Enable scroll wheel zoom gesture by default', 'arwai-azi-viewer'); ?>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- TAB 2: Annotation Canvas & Tags -->
        <div id="tab-overlays" class="tab-content" style="display:none;">
            <!-- Annotation Shapes & ID Badges Styling -->
            <div class="settings-card" style="background:#fff; padding:24px; border:1px solid #ccd0d4; border-radius:6px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,.05);">
                <h2 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:8px; font-size:1.2em;"><?php esc_html_e('Annotation Shapes & ID Badges Styling', 'arwai-azi-viewer'); ?></h2>
                <p class="description" style="margin-bottom:20px;"><?php esc_html_e('Default standard, hover, and selected colors and shadows for SVG annotation boundary shapes and ID badge pills rendered inside the viewer stage.', 'arwai-azi-viewer'); ?></p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <!-- Standard State -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px;">
                        <h4 style="margin-top:0; color:#0f172a; border-bottom:1px solid #e2e8f0; padding-bottom:8px;"><?php esc_html_e('Standard State', 'arwai-azi-viewer'); ?></h4>
                        <p style="margin-bottom:6px;"><label for="default_fill_color"><strong><?php esc_html_e('Fill Color', 'arwai-azi-viewer'); ?></strong></label></p>
                        <div class="rgba-picker-wrap" style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                            <input type="hidden" name="arwai_azi_viewer_card_styles[default_fill_color]" id="default_fill_color" value="<?php echo esc_attr($card_styles['default_fill_color'] ?? 'rgba(0,0,0,0.2)'); ?>" class="rgba-hidden-input" />
                            <input type="text" value="" class="anno-color-picker hex-input" data-default-color="#000000" />
                            <label style="display:flex; align-items:center; gap:6px; font-size:12px; margin-bottom:0;">
                                Opacity: <input type="range" class="opacity-slider" min="0" max="1" step="0.01" value="1" style="width:80px;" />
                                <input type="number" class="opacity-number" min="0" max="1" step="0.01" value="1" style="width:60px; padding: 0 4px;" />
                            </label>
                        </div>
                        
                        <p style="margin-bottom:6px;"><label for="default_border_color"><strong><?php esc_html_e('Border Color', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[default_border_color]" id="default_border_color" value="<?php echo esc_attr($card_styles['default_border_color'] ?? '#2563eb'); ?>" class="anno-color-picker" /></p>
                        
                        <p style="margin-bottom:6px;"><label for="badge_bg"><strong><?php esc_html_e('ID Badge Background', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[badge_bg]" id="badge_bg" value="<?php echo esc_attr($card_styles['badge_bg'] ?? '#2563eb'); ?>" class="anno-color-picker" /></p>
                        
                        <p style="margin-bottom:6px;"><label for="badge_text_color"><strong><?php esc_html_e('ID Badge Text', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[badge_text_color]" id="badge_text_color" value="<?php echo esc_attr($card_styles['badge_text_color'] ?? '#ffffff'); ?>" class="anno-color-picker" /></p>

                        <p style="margin-bottom:6px;"><label for="default_badge_shadow"><strong><?php esc_html_e('Badge Shadow CSS', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[default_badge_shadow]" id="default_badge_shadow" value="<?php echo esc_attr($card_styles['default_badge_shadow'] ?? '0 2px 6px rgba(0, 0, 0, 0.15)'); ?>" class="regular-text" style="width: 100%;" /></p>
                    </div>

                    <!-- Hover State -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px;">
                        <h4 style="margin-top:0; color:#0f172a; border-bottom:1px solid #e2e8f0; padding-bottom:8px;"><?php esc_html_e('Hover State', 'arwai-azi-viewer'); ?></h4>
                        <p style="margin-bottom:6px;"><label for="default_hover_fill_color"><strong><?php esc_html_e('Hover Fill Color', 'arwai-azi-viewer'); ?></strong></label></p>
                        <div class="rgba-picker-wrap" style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                            <input type="hidden" name="arwai_azi_viewer_card_styles[default_hover_fill_color]" id="default_hover_fill_color" value="<?php echo esc_attr($card_styles['default_hover_fill_color'] ?? 'rgba(0,0,0,0.3)'); ?>" class="rgba-hidden-input" />
                            <input type="text" value="" class="anno-color-picker hex-input" data-default-color="#000000" />
                            <label style="display:flex; align-items:center; gap:6px; font-size:12px; margin-bottom:0;">
                                Opacity: <input type="range" class="opacity-slider" min="0" max="1" step="0.01" value="1" style="width:80px;" />
                                <input type="number" class="opacity-number" min="0" max="1" step="0.01" value="1" style="width:60px; padding: 0 4px;" />
                            </label>
                        </div>
                        
                        <p style="margin-bottom:6px;"><label for="default_hover_border_color"><strong><?php esc_html_e('Hover Border Color', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[default_hover_border_color]" id="default_hover_border_color" value="<?php echo esc_attr($card_styles['default_hover_border_color'] ?? '#3b82f6'); ?>" class="anno-color-picker" /></p>

                        <p style="margin-bottom:6px;"><label for="default_hover_badge_shadow"><strong><?php esc_html_e('Hover Badge Shadow', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[default_hover_badge_shadow]" id="default_hover_badge_shadow" value="<?php echo esc_attr($card_styles['default_hover_badge_shadow'] ?? '0 4px 12px rgba(0, 0, 0, 0.25)'); ?>" class="regular-text" style="width: 100%;" /></p>
                    </div>

                    <!-- Selected State -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px;">
                        <h4 style="margin-top:0; color:#0f172a; border-bottom:1px solid #e2e8f0; padding-bottom:8px;"><?php esc_html_e('Selected State', 'arwai-azi-viewer'); ?></h4>
                        <p style="margin-bottom:6px;"><label for="default_selected_fill_color"><strong><?php esc_html_e('Selected Fill Color', 'arwai-azi-viewer'); ?></strong></label></p>
                        <div class="rgba-picker-wrap" style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                            <input type="hidden" name="arwai_azi_viewer_card_styles[default_selected_fill_color]" id="default_selected_fill_color" value="<?php echo esc_attr($card_styles['default_selected_fill_color'] ?? 'rgba(0,0,0,0.3)'); ?>" class="rgba-hidden-input" />
                            <input type="text" value="" class="anno-color-picker hex-input" data-default-color="#000000" />
                            <label style="display:flex; align-items:center; gap:6px; font-size:12px; margin-bottom:0;">
                                Opacity: <input type="range" class="opacity-slider" min="0" max="1" step="0.01" value="1" style="width:80px;" />
                                <input type="number" class="opacity-number" min="0" max="1" step="0.01" value="1" style="width:60px; padding: 0 4px;" />
                            </label>
                        </div>
                        
                        <p style="margin-bottom:6px;"><label for="default_selected_border_color"><strong><?php esc_html_e('Selected Border Color', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[default_selected_border_color]" id="default_selected_border_color" value="<?php echo esc_attr($card_styles['default_selected_border_color'] ?? '#1d4ed8'); ?>" class="anno-color-picker" /></p>

                        <p style="margin-bottom:6px;"><label for="default_selected_badge_bg"><strong><?php esc_html_e('Selected Badge Background', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[default_selected_badge_bg]" id="default_selected_badge_bg" value="<?php echo esc_attr($card_styles['default_selected_badge_bg'] ?? '#1d4ed8'); ?>" class="anno-color-picker" /></p>

                        <p style="margin-bottom:6px;"><label for="default_selected_badge_text_color"><strong><?php esc_html_e('Selected Badge Text Color', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[default_selected_badge_text_color]" id="default_selected_badge_text_color" value="<?php echo esc_attr($card_styles['default_selected_badge_text_color'] ?? '#ffffff'); ?>" class="anno-color-picker" /></p>

                        <p style="margin-bottom:6px;"><label for="default_selected_badge_shadow"><strong><?php esc_html_e('Selected Badge Shadow CSS', 'arwai-azi-viewer'); ?></strong></label></p>
                        <p style="margin-top:0;"><input type="text" name="arwai_azi_viewer_card_styles[default_selected_badge_shadow]" id="default_selected_badge_shadow" value="<?php echo esc_attr($card_styles['default_selected_badge_shadow'] ?? '0 4px 12px rgba(0, 0, 0, 0.25)'); ?>" class="regular-text" style="width: 100%;" /></p>
                    </div>
                </div>
            </div>

            <!-- Tag / Term Custom Color Rules -->
            <div class="settings-card" style="background:#fff; padding:24px; border:1px solid #ccd0d4; border-radius:6px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,.05); overflow-x:auto;">
                <h2 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:8px; font-size:1.2em;"><?php esc_html_e('Tag / Term Custom Color Rules', 'arwai-azi-viewer'); ?></h2>
                <p class="description" style="margin-bottom:16px;"><?php esc_html_e('Map specific hashtag or taxonomy term names to custom colors globally across all viewer instances and annotation cards.', 'arwai-azi-viewer'); ?></p>

                <table class="wp-list-table widefat fixed striped" id="tag-colors-table" style="width: 100%; min-width: 600px;">
                    <thead>
                        <tr>
                            <th style="width: 20%;"><?php esc_html_e('Tag / Term Name', 'arwai-azi-viewer'); ?></th>
                            <th style="width: 20%;"><?php esc_html_e('Box Fill Color', 'arwai-azi-viewer'); ?></th>
                            <th style="width: 20%;"><?php esc_html_e('Box Border Color', 'arwai-azi-viewer'); ?></th>
                            <th style="width: 20%;"><?php esc_html_e('ID Badge Background', 'arwai-azi-viewer'); ?></th>
                            <th style="width: 20%;"><?php esc_html_e('ID Badge Text', 'arwai-azi-viewer'); ?></th>
                            <th style="width: 10%; text-align:right;"></th>
                        </tr>
                    </thead>
                    <tbody id="tag-colors-body">
                        <?php if (!empty($tag_colors)) : ?>
                            <?php foreach ($tag_colors as $idx => $rule) : ?>
                                <tr>
                                    <td><input type="text" name="arwai_azi_viewer_tag_colors[<?php echo $idx; ?>][tag]" value="<?php echo esc_attr($rule['tag']); ?>" placeholder="e.g. important" class="regular-text" style="width: 100%;" /></td>
                                    <td><div class="rgba-picker-wrap" style="display:flex; align-items:center; gap:12px;">
                                        <input type="hidden" name="arwai_azi_viewer_tag_colors[<?php echo $idx; ?>][fill_color]" value="<?php echo esc_attr($rule['fill_color'] ?? ''); ?>" class="rgba-hidden-input" />
                                        <input type="text" value="" class="anno-color-picker hex-input" data-default-color="#000000" />
                                        <label style="display:flex; align-items:center; gap:6px; font-size:12px; margin-bottom:0;">
                                            Opacity: <input type="range" class="opacity-slider" min="0" max="1" step="0.01" value="1" style="width:80px;" />
                                            <input type="number" class="opacity-number" min="0" max="1" step="0.01" value="1" style="width:60px; padding: 0 4px;" />
                                        </label>
                                    </div></td>
                                    <td><input type="text" name="arwai_azi_viewer_tag_colors[<?php echo $idx; ?>][border_color]" value="<?php echo esc_attr($rule['border_color'] ?? ''); ?>" class="anno-color-picker" /></td>
                                    <td><input type="text" name="arwai_azi_viewer_tag_colors[<?php echo $idx; ?>][badge_bg]" value="<?php echo esc_attr($rule['badge_bg'] ?? ''); ?>" class="anno-color-picker" /></td>
                                    <td><input type="text" name="arwai_azi_viewer_tag_colors[<?php echo $idx; ?>][badge_text_color]" value="<?php echo esc_attr($rule['badge_text_color'] ?? ''); ?>" class="anno-color-picker" /></td>
                                    <td style="text-align:right;"><button type="button" class="button button-link-delete remove-tag-row" style="color:#d63638; text-decoration:none;">&times; Remove</button></td>
                                </tr>
                            <?php endforeach; ?>
                        <?php else : ?>
                            <tr>
                                <td><input type="text" name="arwai_azi_viewer_tag_colors[0][tag]" value="" placeholder="e.g. important" class="regular-text" style="width: 100%;" /></td>
                                <td><input type="text" name="arwai_azi_viewer_tag_colors[0][fill_color]" value="" class="anno-color-picker" /></td>
                                <td><input type="text" name="arwai_azi_viewer_tag_colors[0][border_color]" value="#ef4444" class="anno-color-picker" /></td>
                                <td><input type="text" name="arwai_azi_viewer_tag_colors[0][badge_bg]" value="#ef4444" class="anno-color-picker" /></td>
                                <td><input type="text" name="arwai_azi_viewer_tag_colors[0][badge_text_color]" value="#ffffff" class="anno-color-picker" /></td>
                                <td style="text-align:right;"><button type="button" class="button button-link-delete remove-tag-row" style="color:#d63638; text-decoration:none;">&times; Remove</button></td>
                            </tr>
                        <?php endif; ?>
                    </tbody>
                </table>

                <p style="margin-top: 16px;">
                    <button type="button" class="button button-secondary" id="add-tag-color-row">+ <?php esc_html_e('Add Tag Color Rule', 'arwai-azi-viewer'); ?></button>
                </p>
            </div>
        </div>

        <!-- TAB 3: Image Defaults & Card Behavior -->
        <div id="tab-images-cards" class="tab-content" style="display:none;">
            <!-- Image Format & Resolution Defaults -->
            <div class="settings-card" style="background:#fff; padding:24px; border:1px solid #ccd0d4; border-radius:6px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,.05);">
                <h2 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:8px; font-size:1.2em;"><?php esc_html_e('Image Handling & Resolution Defaults', 'arwai-azi-viewer'); ?></h2>
                <p class="description" style="margin-bottom:20px;"><?php esc_html_e('Configure image resolution fallbacks, WebP preference, and loading behavior.', 'arwai-azi-viewer'); ?></p>
                <table class="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row"><label for="default_simple_size"><?php esc_html_e('Default Simple Viewer Image Size', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <select name="arwai_azi_viewer_card_styles[default_simple_size]" id="default_simple_size">
                                    <?php foreach ($size_options_map as $val => $label) : ?>
                                        <option value="<?php echo esc_attr($val); ?>" <?php selected($card_styles['default_simple_size'] ?? 'large', $val); ?>><?php echo esc_html($label); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="default_osd_size"><?php esc_html_e('Default Deep-Zoom (OSD) Image Size', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <select name="arwai_azi_viewer_card_styles[default_osd_size]" id="default_osd_size">
                                    <?php foreach ($size_options_map as $val => $label) : ?>
                                        <option value="<?php echo esc_attr($val); ?>" <?php selected($card_styles['default_osd_size'] ?? 'full', $val); ?>><?php echo esc_html($label); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="default_image_format"><?php esc_html_e('Image Format Preference', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <select name="arwai_azi_viewer_card_styles[default_image_format]" id="default_image_format">
                                    <option value="webp_prefer" <?php selected($card_styles['default_image_format'] ?? 'webp_prefer', 'webp_prefer'); ?>><?php esc_html_e('Prefer WebP (with Automatic HTML5 <picture> Fallback)', 'arwai-azi-viewer'); ?></option>
                                    <option value="original" <?php selected($card_styles['default_image_format'] ?? 'webp_prefer', 'original'); ?>><?php esc_html_e('Original Uploaded Format (Standard JPEG / PNG)', 'arwai-azi-viewer'); ?></option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="default_loading_method"><?php esc_html_e('Default Image Loading Method', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <select name="arwai_azi_viewer_card_styles[default_loading_method]" id="default_loading_method">
                                    <option value="lazy" <?php selected($card_styles['default_loading_method'] ?? 'lazy', 'lazy'); ?>><?php esc_html_e('Lazy Loading (Default)', 'arwai-azi-viewer'); ?></option>
                                    <option value="eager" <?php selected($card_styles['default_loading_method'] ?? 'lazy', 'eager'); ?>><?php esc_html_e('Eager Loading (Immediate)', 'arwai-azi-viewer'); ?></option>
                                    <option value="auto" <?php selected($card_styles['default_loading_method'] ?? 'lazy', 'auto'); ?>><?php esc_html_e('Auto / Browser Default', 'arwai-azi-viewer'); ?></option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="default_info_msg"><?php esc_html_e('Default Info Modal Message', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <textarea name="arwai_azi_viewer_card_styles[default_info_msg]" id="default_info_msg" rows="3" class="large-text"><?php echo esc_textarea($card_styles['default_info_msg'] ?? ''); ?></textarea>
                                <p class="description"><?php esc_html_e('Default HTML/text information displayed when the Info button is clicked if no custom info content is provided.', 'arwai-azi-viewer'); ?></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Annotation Cards Truncation & Behavior -->
            <div class="settings-card" style="background:#fff; padding:24px; border:1px solid #ccd0d4; border-radius:6px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,.05);">
                <h2 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:8px; font-size:1.2em;"><?php esc_html_e('Annotation Cards Content Truncation', 'arwai-azi-viewer'); ?></h2>
                <p class="description" style="margin-bottom:20px;"><?php esc_html_e('Control automatic expand/collapse rules for lengthy annotation card descriptions.', 'arwai-azi-viewer'); ?></p>
                
                <table class="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row"><?php esc_html_e('Enable Text Truncation', 'arwai-azi-viewer'); ?></th>
                            <td>
                                <label for="enable_truncation">
                                    <input type="checkbox" name="arwai_azi_viewer_card_styles[enable_truncation]" id="enable_truncation" value="1" <?php checked($card_styles['enable_truncation'] ?? 1, 1); ?> />
                                    <?php esc_html_e('Truncate long annotation card descriptions automatically', 'arwai-azi-viewer'); ?>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="read_more_text"><?php esc_html_e('Read More Label', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <input type="text" name="arwai_azi_viewer_card_styles[read_more_text]" id="read_more_text" value="<?php echo esc_attr($card_styles['read_more_text'] ?? '...Read More'); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="show_less_text"><?php esc_html_e('Show Less Label', 'arwai-azi-viewer'); ?></label></th>
                            <td>
                                <input type="text" name="arwai_azi_viewer_card_styles[show_less_text]" id="show_less_text" value="<?php echo esc_attr($card_styles['show_less_text'] ?? 'Show Less'); ?>" class="regular-text" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div style="margin-top: 30px;">
            <?php submit_button(__('Save Settings', 'arwai-azi-viewer'), 'primary', 'submit', false); ?>
        </div>
    </form>
</div>

<script>
jQuery(document).ready(function($) {
    $('.arwai-azi-viewer-tabs .nav-tab').on('click', function(e) {
        e.preventDefault();
        var targetTab = $(this).data('tab');
        $('.arwai-azi-viewer-tabs .nav-tab').removeClass('nav-tab-active');
        $(this).addClass('nav-tab-active');

        $('.tab-content').hide();
        $('#' + targetTab).show();

        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, '#' + targetTab);
        }
    });

    if (window.location.hash) {
        var hashTab = window.location.hash.substring(1);
        var $matchingTab = $('.arwai-azi-viewer-tabs .nav-tab[data-tab="' + hashTab + '"]');
        if ($matchingTab.length) {
            $matchingTab.trigger('click');
        }
    }

    $('.anno-color-picker').wpColorPicker();

    $('#add-tag-color-row').on('click', function() {
        var idx = $('#tag-colors-body tr').length;
        var rowHtml = '<tr>' +
            '<td><input type="text" name="arwai_azi_viewer_tag_colors[' + idx + '][tag]" value="" placeholder="e.g. important" class="regular-text" style="width:100%;"/></td>' +
            '<td><div class="rgba-picker-wrap" style="display:flex; align-items:center; gap:12px;">' +
                '<input type="hidden" name="arwai_azi_viewer_tag_colors[' + idx + '][fill_color]" value="" class="rgba-hidden-input" />' +
                '<input type="text" value="" class="anno-color-picker hex-input" data-default-color="#000000" />' +
                '<label style="display:flex; align-items:center; gap:6px; font-size:12px; margin-bottom:0;">Opacity: <input type="range" class="opacity-slider" min="0" max="1" step="0.01" value="1" style="width:80px;" /><input type="number" class="opacity-number" min="0" max="1" step="0.01" value="1" style="width:60px; padding: 0 4px;" /></label>' +
            '</div></td>' +
            '<td><input type="text" name="arwai_azi_viewer_tag_colors[' + idx + '][border_color]" value="#3b82f6" class="anno-color-picker"/></td>' +
            '<td><input type="text" name="arwai_azi_viewer_tag_colors[' + idx + '][badge_bg]" value="#3b82f6" class="anno-color-picker"/></td>' +
            '<td><input type="text" name="arwai_azi_viewer_tag_colors[' + idx + '][badge_text_color]" value="#ffffff" class="anno-color-picker"/></td>' +
            '<td style="text-align:right;"><button type="button" class="button button-link-delete remove-tag-row" style="color:#d63638; text-decoration:none;">&times; Remove</button></td>' +
        '</tr>';
        var $row = $(rowHtml);
        $('#tag-colors-body').append($row);
        $row.find('.anno-color-picker').wpColorPicker();
    });

    $(document).on('click', '.remove-tag-row', function() {
        $(this).closest('tr').remove();
    });

    function syncRgba($wrap) {
        var hex = $wrap.find('.anno-color-picker').val() || '#000000';
        var opacity = $wrap.find('.opacity-slider').val();
        
        var r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        }
        
        var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
        $wrap.find('.rgba-hidden-input').val(rgba);
    }

    $('.rgba-picker-wrap').each(function() {
        var $wrap = $(this);
        var initialRgba = $wrap.find('.rgba-hidden-input').val();
        var hexMatch = initialRgba ? initialRgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/) : null;
        
        if (hexMatch) {
            var r = parseInt(hexMatch[1], 10).toString(16).padStart(2, '0');
            var g = parseInt(hexMatch[2], 10).toString(16).padStart(2, '0');
            var b = parseInt(hexMatch[3], 10).toString(16).padStart(2, '0');
            var a = hexMatch[4] !== undefined ? parseFloat(hexMatch[4]) : 1;
            
            $wrap.find('.anno-color-picker').val('#' + r + g + b);
            $wrap.find('.opacity-slider').val(a);
            $wrap.find('.opacity-number').val(a);
        }

        $wrap.find('.anno-color-picker').wpColorPicker({
            change: function() {
                syncRgba($wrap);
            },
            clear: function() {
                syncRgba($wrap);
            }
        });

        $wrap.find('.opacity-slider').on('input', function() {
            $wrap.find('.opacity-number').val($(this).val());
            syncRgba($wrap);
        });

        $wrap.find('.opacity-number').on('input', function() {
            var val = parseFloat($(this).val());
            if (val < 0) val = 0;
            if (val > 1) val = 1;
            $wrap.find('.opacity-slider').val(val);
            syncRgba($wrap);
        });
    });
});
</script>
