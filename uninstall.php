<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

global $wpdb;

$annotations_table = $wpdb->prefix . 'arwai_azi_viewer_annotations';
$history_table     = $wpdb->prefix . 'arwai_azi_viewer_annotations_history';

// Drop Custom Tables
$wpdb->query("DROP TABLE IF EXISTS {$annotations_table}");
$wpdb->query("DROP TABLE IF EXISTS {$history_table}");

// Delete Options
delete_option('arwai_azi_viewer_db_version');
