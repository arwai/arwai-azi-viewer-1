<?php
if (!defined('ABSPATH')) {
    exit;
}

/** @var \WP_Post $post */
/** @var string $image_ids_json */
?>
<div class="arwai-azi-viewer-metabox-wrapper" id="arwai-azi-viewer-metabox">
    <input type="hidden" name="arwai_azi_viewer_image_ids" id="arwai_azi_viewer_image_ids" value="<?php echo esc_attr($image_ids_json); ?>" />

    <!-- Admin Action Bar -->
    <div class="arwai-azi-viewer-admin-toolbar">
        <div class="toolbar-left">
            <button type="button" class="button button-primary" id="arwai-azi-viewer-add-media">
                <span class="dashicons dashicons-format-gallery"></span> <?php esc_html_e('Add Images from Media Library', 'arwai-azi-viewer'); ?>
            </button>
            <span class="arwai-azi-viewer-status-badge" id="arwai-azi-viewer-status">
                <span class="status-dot"></span> <span class="status-text"><?php esc_html_e('Ready', 'arwai-azi-viewer'); ?></span>
            </span>
        </div>
        <div class="toolbar-right">
            <span class="description"><?php esc_html_e('Drag items to re-order collection. Click thumbnail to edit annotations.', 'arwai-azi-viewer'); ?></span>
        </div>
    </div>

    <!-- Legacy-Style Sortable Image List -->
    <div class="arwai-azi-viewer-legacy-collection-wrap">
        <ul class="arwai-azi-viewer-collection-list sortable-list" id="arwai-azi-viewer-collection-list">
            <!-- Dynamic sortable items rendered via admin.js -->
        </ul>
    </div>

    <!-- Admin Annotorious Deep Zoom Editor Stage -->
    <div class="arwai-azi-viewer-admin-viewer-container" id="arwai-azi-viewer-admin-viewer-wrap">
        <div id="arwai-azi-viewer-admin-osd-viewer" class="arwai-azi-viewer-osd-canvas"></div>
        <div class="arwai-azi-viewer-viewer-placeholder" id="arwai-azi-viewer-empty-notice">
            <span class="dashicons dashicons-images-alt2"></span>
            <p><?php esc_html_e('No images selected. Click "Add Images from Media Library" above.', 'arwai-azi-viewer'); ?></p>
        </div>
    </div>
</div>
