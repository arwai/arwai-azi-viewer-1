<?php
namespace Arwai\ImageAnnotator;

use Arwai\ImageAnnotator\Admin\AdminMetaBox;
use Arwai\ImageAnnotator\Admin\SettingsPage;
use Arwai\ImageAnnotator\Blocks\ViewerBlock;
use Arwai\ImageAnnotator\Blocks\AnnotationListBlock;
use Arwai\ImageAnnotator\Blocks\ActionToolbarBlock;
use Arwai\ImageAnnotator\Blocks\SequenceToolbarBlock;
use Arwai\ImageAnnotator\Blocks\SequenceFilmstripBlock;
use Arwai\ImageAnnotator\Rest\AnnotationController;

if (!defined('ABSPATH')) {
    exit;
}

final class Plugin {
    /**
     * Singleton instance.
     * @var Plugin|null
     */
    private static $instance = null;

    /**
     * Get singleton instance.
     *
     * @return Plugin
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Private constructor.
     */
    private function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize WordPress hooks.
     */
    private function init_hooks() {
        // Init Database hooks
        Database::init();

        // Register REST API Controller
        add_action('rest_api_init', function() {
            $controller = new AnnotationController();
            $controller->register_routes();
        });

        // Initialize Admin components
        if (is_admin()) {
            SettingsPage::init();
        }

        // Enable Block Editor Border Supports
        add_action('after_setup_theme', function() {
            add_theme_support('border');
        });

        // Register Gutenberg Custom Blocks
        add_action('init', [ViewerBlock::class, 'register']);
        add_action('init', [AnnotationListBlock::class, 'register']);
        add_action('init', [ActionToolbarBlock::class, 'register']);
        add_action('init', [SequenceToolbarBlock::class, 'register']);
        add_action('init', [SequenceFilmstripBlock::class, 'register']);

        // Register Block Patterns
        add_action('init', function() {
            if (function_exists('register_block_pattern_category')) {
                register_block_pattern_category(
                    'arwai-azi-viewer',
                    ['label' => __('Annotate Zoom Viewer', 'arwai-azi-viewer')]
                );
            }
            if (function_exists('register_block_pattern')) {
                register_block_pattern(
                    'arwai-azi-viewer/annotation-cards-group',
                    [
                        'title'       => __('Annotation Cards (in Group Container)', 'arwai-azi-viewer'),
                        'description' => __('An Annotation Cards List wrapped inside a native WordPress Group block for complete background, padding, and border control.', 'arwai-azi-viewer'),
                        'categories'  => ['arwai-azi-viewer', 'widgets'],
                        'content'     => '<!-- wp:group {"style":{"spacing":{"padding":{"top":"24px","right":"24px","bottom":"24px","left":"24px"}},"border":{"radius":"12px"}},"backgroundColor":"light-gray","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-light-gray-background-color has-background" style="border-radius:12px;padding-top:24px;padding-right:24px;padding-bottom:24px;padding-left:24px"><!-- wp:arwai/azi-viewer-annotation-list /--></div>
<!-- /wp:group -->',
                    ]
                );
            }
        });

        // Expose native WordPress image sizes to selection UI
        add_filter('image_size_names_choose', function($sizes) {
            return array_merge($sizes, [
                'medium_large' => __('Medium Large (768px)', 'arwai-azi-viewer'),
                '1536x1536'    => __('1536x1536 (2x Medium Large)', 'arwai-azi-viewer'),
                '2048x2048'    => __('2048x2048 (2x Large)', 'arwai-azi-viewer'),
            ]);
        });
    }
}
