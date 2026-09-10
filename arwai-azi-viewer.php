<?php
/**
 * Plugin Name:       Annotate Zoom Image Viewer
 * Plugin URI:        https://arwai.dev
 * Description:       A modern, decoupled image annotation plugin powered by OpenSeadragon, Annotorious, and Swiper.js adhering to W3C Web Annotation standards with Gutenberg Custom Blocks.
 * Version:           1.1.1
 * Author:            Arwai
 * Text Domain:       image-annotator
 * License:           GPL-2.0+
 */

if (!defined('ABSPATH')) {
    exit;
}

// Define Plugin Constants
define('ARWAI_AZI_VIEWER_VERSION', '1.1.0');
define('ARWAI_AZI_VIEWER_FILE', __FILE__);
define('ARWAI_AZI_VIEWER_PATH', plugin_dir_path(__FILE__));
define('ARWAI_AZI_VIEWER_URL', plugin_dir_url(__FILE__));

// Require Autoloader
require_once ARWAI_AZI_VIEWER_PATH . 'includes/Autoloader.php';
Arwai\ImageAnnotator\Autoloader::register();

// Register Activation Hook
register_activation_hook(__FILE__, function() {
    Arwai\ImageAnnotator\Database::activate();
    flush_rewrite_rules();
});

// Register Deactivation Hook
register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});

// Boot Plugin Singleton
add_action('plugins_loaded', function() {
    Arwai\ImageAnnotator\Plugin::get_instance();
});
