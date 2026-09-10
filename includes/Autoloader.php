<?php
namespace Arwai\ImageAnnotator;

if (!defined('ABSPATH')) {
    exit;
}

class Autoloader {
    /**
     * Register autoloader for ImageAnnotator namespace.
     */
    public static function register() {
        spl_autoload_register([__CLASS__, 'autoload']);
    }

    /**
     * Autoload callback.
     *
     * @param string $class
     */
    public static function autoload($class) {
        $prefix = 'Arwai\ImageAnnotator\\';
        $base_dir = plugin_dir_path(__DIR__) . 'includes/';

        $len = strlen($prefix);
        if (strncmp($prefix, $class, $len) !== 0) {
            return;
        }

        $relative_class = substr($class, $len);
        $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

        if (file_exists($file)) {
            require_once $file;
        }
    }
}
