<?php
if (!defined('ABSPATH')) {
    exit;
}

/** @var string $unique_id */
/** @var array $images */
/** @var int $post_id */
/** @var string $width */
/** @var string $height */
/** @var string $bg_color */
/** @var string $bg_image_url */
/** @var string $bg_size */
/** @var string $border_color */
/** @var int $border_width */
/** @var int $border_radius */
/** @var int $padding */
/** @var int $margin */

$total_images = count($images);
$first_image  = $images[0];

$stage_height_limit = !empty($height) ? $height : '500px';

// Nav toolbar CSS vars are now the responsibility of the standalone sequence-toolbar block.

$default_selected_border = !empty($card_styles['default_selected_border_color']) ? $card_styles['default_selected_border_color'] : '#1d4ed8';
$default_hover_border    = !empty($card_styles['default_hover_border_color']) ? $card_styles['default_hover_border_color'] : '#3b82f6';
?>

<div <?php echo isset($wrapper_attributes) ? $wrapper_attributes : 'class="arwai-aziv-frontend-wrap ' . esc_attr($align_class) . '" id="' . esc_attr($unique_id) . '"'; ?> <?php echo $data_attributes; ?>>

    <!-- 1. Main Display Stage (Instagram-Style Smooth Sliding Carousel) -->
    <div class="arwai-aziv-display-stage" style="--stage-height-limit:<?php echo esc_attr($stage_height_limit); ?>; height: <?php echo esc_attr($stage_height_limit); ?>;">
        
        <!-- Loading Animation -->
        <div class="arwai-aziv-loader-wrapper" id="<?php echo esc_attr($unique_id); ?>-loader">
            <div class="arwai-aziv-loader"></div>
        </div>

        <div class="arwai-aziv-carousel-track-wrapper" id="<?php echo esc_attr($unique_id); ?>-track-wrapper">
            <div class="arwai-aziv-carousel-track" id="<?php echo esc_attr($unique_id); ?>-track">
                <?php foreach ($images as $idx => $img) : ?>
                    <div class="arwai-aziv-carousel-slide <?php echo $idx === 0 ? 'active' : ''; ?>" data-index="<?php echo esc_attr($idx); ?>">
                        <?php if (!empty($img['webp_url'])) : ?>
                            <picture class="arwai-aziv-target-picture" style="width:100%; height:100%; max-width:100%; max-height:100%; display:flex; align-items:center; justify-content:center;">
                                <source srcset="<?php echo esc_url($img['webp_url']); ?>" type="image/webp" />
                                <img id="<?php echo $idx === 0 ? esc_attr($unique_id . '-active-img') : ''; ?>" class="arwai-aziv-target-img <?php echo $idx === 0 ? 'arwai-aziv-active-target-img' : ''; ?>" src="<?php echo esc_url($img['simple_url']); ?>" data-attachment-id="<?php echo esc_attr($img['attachment_id']); ?>" alt="<?php esc_attr_e('Annotated Image', 'arwai-azi-viewer'); ?>" loading="<?php echo esc_attr($loading_method); ?>" draggable="false" style="width:100%; height:100%; max-width:100%; max-height:100%; object-fit:contain;" />
                            </picture>
                        <?php else : ?>
                            <img id="<?php echo $idx === 0 ? esc_attr($unique_id . '-active-img') : ''; ?>" class="arwai-aziv-target-img <?php echo $idx === 0 ? 'arwai-aziv-active-target-img' : ''; ?>" src="<?php echo esc_url($img['simple_url']); ?>" data-attachment-id="<?php echo esc_attr($img['attachment_id']); ?>" alt="<?php esc_attr_e('Annotated Image', 'arwai-azi-viewer'); ?>" loading="<?php echo esc_attr($loading_method); ?>" draggable="false" style="width:100%; height:100%; max-width:100%; max-height:100%; object-fit:contain;" />
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Toolbar & Filmstrip are standalone blocks (arwai/azi-viewer-sequence-toolbar, arwai/azi-viewer-sequence-filmstrip).
         Place them outside this block in the editor and link via targetViewerId. -->

    <!-- Info Popup Modal -->
    <div class="arwai-aziv-info-popup" id="<?php echo esc_attr($unique_id); ?>-info-popup" style="display: none;">
        <div class="arwai-aziv-info-popup-content">
            <button type="button" class="arwai-aziv-info-close-btn">&times;</button>
            <h3><?php esc_html_e('Image Information', 'arwai-azi-viewer'); ?></h3>
            <?php if (!empty($info_message)) : ?>
                <div class="arwai-aziv-info-custom-message" style="margin-top:10px; font-size:14px; line-height:1.5;">
                    <?php echo wp_kses_post($info_message); ?>
                </div>
            <?php else : ?>
                <p><strong><?php esc_html_e('Post Title:', 'arwai-azi-viewer'); ?></strong> <?php echo esc_html(get_the_title($post_id)); ?></p>
                <p><strong><?php esc_html_e('Image Resolution:', 'arwai-azi-viewer'); ?></strong> <span class="arwai-aziv-info-res"><?php echo (int) $first_image['width']; ?> &times; <?php echo (int) $first_image['height']; ?> px</span></p>
                <p><strong><?php esc_html_e('Attachment ID:', 'arwai-azi-viewer'); ?></strong> <span class="arwai-aziv-info-att-id"><?php echo (int) $first_image['attachment_id']; ?></span></p>
            <?php endif; ?>
        </div>
    </div>

    <!-- OpenSeadragon Fullscreen Enlarge Modal -->
    <div class="arwai-aziv-osd-modal" id="<?php echo esc_attr($unique_id); ?>-osd-modal" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e('Full Screen Image Viewer', 'arwai-azi-viewer'); ?>" style="display: none;">
        <div class="arwai-aziv-osd-modal-backdrop"></div>
        <div class="visually-hidden arwai-aziv-osd-a11y-status" id="<?php echo esc_attr($unique_id); ?>-osd-status" aria-live="polite" aria-atomic="true"></div>
        
        <!-- Loading Animation -->
        <div class="arwai-aziv-loader-wrapper" id="<?php echo esc_attr($unique_id); ?>-osd-loader">
            <div class="arwai-aziv-loader"></div>
        </div>

        <div class="arwai-aziv-osd-modal-stage">

            <!-- OSD Floating Navigation Toolbar (Top Center) -->
            <div class="arwai-aziv-osd-toolbar-top-center" role="toolbar" aria-label="<?php esc_attr_e('Image viewer navigation toolbar', 'arwai-azi-viewer'); ?>">
                <button type="button" class="arwai-aziv-osd-tool-item" id="<?php echo esc_attr($unique_id); ?>-osd-notes" aria-label="<?php esc_attr_e('Toggle Annotations', 'arwai-azi-viewer'); ?>" aria-pressed="true" title="<?php esc_attr_e('Show/Hide Annotations', 'arwai-azi-viewer'); ?>">
                    <svg class="arwai-aziv-icon-eye-open" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" style="display: none;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg class="arwai-aziv-icon-eye-off" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    <span><?php esc_html_e('Annotations', 'arwai-azi-viewer'); ?></span>
                </button>
                <button type="button" class="arwai-aziv-osd-tool-item" id="<?php echo esc_attr($unique_id); ?>-osd-prev" aria-label="<?php esc_attr_e('Previous Image', 'arwai-azi-viewer'); ?>" title="<?php esc_attr_e('Previous Image', 'arwai-azi-viewer'); ?>">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    <span><?php esc_html_e('Previous', 'arwai-azi-viewer'); ?></span>
                </button>
                <button type="button" class="arwai-aziv-osd-tool-item" id="<?php echo esc_attr($unique_id); ?>-osd-home" aria-label="<?php esc_attr_e('Reset Image View', 'arwai-azi-viewer'); ?>" title="<?php esc_attr_e('Reset View', 'arwai-azi-viewer'); ?>">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    <span><?php esc_html_e('Home', 'arwai-azi-viewer'); ?></span>
                </button>
                <button type="button" class="arwai-aziv-osd-tool-item" id="<?php echo esc_attr($unique_id); ?>-osd-next" aria-label="<?php esc_attr_e('Next Image', 'arwai-azi-viewer'); ?>" title="<?php esc_attr_e('Next Image', 'arwai-azi-viewer'); ?>">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    <span><?php esc_html_e('Next', 'arwai-azi-viewer'); ?></span>
                </button>
                <button type="button" class="arwai-aziv-osd-tool-item arwai-aziv-btn-osd-close" id="<?php echo esc_attr($unique_id); ?>-osd-close" aria-label="<?php esc_attr_e('Close Full Screen Viewer', 'arwai-azi-viewer'); ?>" title="<?php esc_attr_e('Close Viewer', 'arwai-azi-viewer'); ?>">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    <span><?php esc_html_e('Close', 'arwai-azi-viewer'); ?></span>
                </button>
            </div>

            <!-- OSD Floating View Toolbar (Top Right) -->
            <div class="arwai-aziv-osd-toolbar-top-right" role="toolbar" aria-label="<?php esc_attr_e('Zoom and rotation controls', 'arwai-azi-viewer'); ?>">
                <div class="arwai-aziv-osd-tool-group">
                    <button type="button" class="arwai-aziv-osd-icon-btn" id="<?php echo esc_attr($unique_id); ?>-osd-zoomin" aria-label="<?php esc_attr_e('Zoom In', 'arwai-azi-viewer'); ?>" title="<?php esc_attr_e('Zoom In', 'arwai-azi-viewer'); ?>">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </button>
                    <button type="button" class="arwai-aziv-osd-icon-btn" id="<?php echo esc_attr($unique_id); ?>-osd-zoomout" aria-label="<?php esc_attr_e('Zoom Out', 'arwai-azi-viewer'); ?>" title="<?php esc_attr_e('Zoom Out', 'arwai-azi-viewer'); ?>">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </button>
                </div>
                <div class="arwai-aziv-osd-tool-divider"></div>
                <div class="arwai-aziv-osd-tool-group">
                    <button type="button" class="arwai-aziv-osd-icon-btn" id="<?php echo esc_attr($unique_id); ?>-osd-rotleft" aria-label="<?php esc_attr_e('Rotate Left', 'arwai-azi-viewer'); ?>" title="<?php esc_attr_e('Rotate Left', 'arwai-azi-viewer'); ?>">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M2.5 2v6h6"/><path d="M2.66 15.57a10 10 0 1 0 .57-8.38l-6.73 6.73"/></svg>
                    </button>
                    <button type="button" class="arwai-aziv-osd-icon-btn" id="<?php echo esc_attr($unique_id); ?>-osd-rotright" aria-label="<?php esc_attr_e('Rotate Right', 'arwai-azi-viewer'); ?>" title="<?php esc_attr_e('Rotate Right', 'arwai-azi-viewer'); ?>">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l6.73 6.73"/></svg>
                    </button>
                </div>
            </div>

            <!-- Deep Zoom Canvas Container -->
            <div id="<?php echo esc_attr($unique_id); ?>-osd-canvas" class="arwai-aziv-osd-canvas-element" tabindex="0" role="region" aria-label="<?php esc_attr_e('Interactive image viewer. Use arrow keys to pan, plus and minus keys to zoom, home key to reset view, page up and page down to switch images.', 'arwai-azi-viewer'); ?>"></div>

        </div>
    </div>

</div>

