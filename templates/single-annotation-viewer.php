<?php
if (!defined('ABSPATH')) {
    exit;
}

/** @var string $unique_id */
/** @var array $images */
/** @var array $atts */
/** @var int $post_id */

$container_style = 'width:' . esc_attr($atts['width']) . ';';
$viewer_style    = 'height:' . esc_attr($atts['height']) . ';';
$show_controls   = filter_var($atts['controls'], FILTER_VALIDATE_BOOLEAN);
$show_zoom       = filter_var($atts['zoom'], FILTER_VALIDATE_BOOLEAN);
?>

<div class="arwai-azi-viewer-frontend-container" id="<?php echo esc_attr($unique_id); ?>" style="<?php echo esc_attr($container_style); ?>" data-images="<?php echo esc_attr(wp_json_encode($images)); ?>" data-post-id="<?php echo esc_attr($post_id); ?>">

    <!-- Top Section: Interactive Deep Zoom Viewer -->
    <div class="arwai-azi-viewer-viewer-wrapper" style="<?php echo esc_attr($viewer_style); ?>">
        <div id="<?php echo esc_attr($unique_id); ?>-osd" class="arwai-azi-viewer-osd-instance"></div>

        <?php if ($show_controls) : ?>
            <!-- Custom Navigation Toolbar -->
            <div class="arwai-azi-viewer-controls-bar">
                <?php if ($show_zoom) : ?>
                    <button type="button" class="anno-control-btn btn-zoom-in" id="<?php echo esc_attr($unique_id); ?>-zoom-in" title="<?php esc_attr_e('Zoom In', 'arwai-azi-viewer'); ?>">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </button>
                    <button type="button" class="anno-control-btn btn-zoom-out" id="<?php echo esc_attr($unique_id); ?>-zoom-out" title="<?php esc_attr_e('Zoom Out', 'arwai-azi-viewer'); ?>">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </button>
                    <button type="button" class="anno-control-btn btn-home" id="<?php echo esc_attr($unique_id); ?>-home" title="<?php esc_attr_e('Reset View', 'arwai-azi-viewer'); ?>">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </button>
                <?php endif; ?>

                <button type="button" class="anno-control-btn btn-toggle-annotations" id="<?php echo esc_attr($unique_id); ?>-toggle-anno" title="<?php esc_attr_e('Toggle Annotations', 'arwai-azi-viewer'); ?>">
                    <svg class="icon-eye-on" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button type="button" class="anno-control-btn btn-fullscreen" id="<?php echo esc_attr($unique_id); ?>-fullscreen" title="<?php esc_attr_e('Toggle Fullscreen', 'arwai-azi-viewer'); ?>">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                </button>
            </div>
        <?php endif; ?>

        <!-- Active Annotation Detail Card / Popup -->
        <div class="arwai-azi-viewer-active-card" id="<?php echo esc_attr($unique_id); ?>-card" style="display: none;">
            <button type="button" class="card-close-btn">&times;</button>
            <div class="card-content-body"></div>
        </div>
    </div>

    <!-- Bottom Section: Swipeable Thumbnail Filmstrip (Swiper.js) -->
    <div class="arwai-azi-viewer-filmstrip-swiper swiper" id="<?php echo esc_attr($unique_id); ?>-filmstrip">
        <div class="swiper-wrapper">
            <?php foreach ($images as $index => $img) : ?>
                <div class="swiper-slide <?php echo $index === 0 ? 'swiper-slide-thumb-active' : ''; ?>" data-index="<?php echo esc_attr($index); ?>" data-attachment-id="<?php echo esc_attr($img['attachment_id']); ?>">
                    <img src="<?php echo esc_url($img['thumb_url']); ?>" alt="<?php esc_attr_e('Thumbnail', 'arwai-azi-viewer'); ?>" loading="lazy" />
                    <span class="slide-badge"><?php echo (int) ($index + 1); ?></span>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>

</div>
