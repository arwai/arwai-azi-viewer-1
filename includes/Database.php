<?php
namespace Arwai\ImageAnnotator;

if (!defined('ABSPATH')) {
    exit;
}

class Database {
    const DB_VERSION = '1.0.0';

    /**
     * Initialize DB hooks.
     */
    public static function init() {
        add_action('delete_attachment', [__CLASS__, 'on_delete_attachment']);
    }

    /**
     * Create or update custom database tables using dbDelta.
     */
    public static function activate() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $annotations_table = $wpdb->prefix . 'image_annotations';
        $history_table     = $wpdb->prefix . 'image_annotations_history';

        $sql_annotations = "CREATE TABLE {$annotations_table} (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            attachment_id bigint(20) UNSIGNED NOT NULL,
            post_id bigint(20) UNSIGNED NOT NULL DEFAULT 0,
            annotation_id varchar(255) NOT NULL,
            annotation_data longtext NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY  (id),
            KEY attachment_id (attachment_id),
            KEY post_id (post_id),
            KEY annotation_id (annotation_id)
        ) {$charset_collate};";

        $sql_history = "CREATE TABLE {$history_table} (
            history_id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            annotation_id varchar(255) NOT NULL,
            attachment_id bigint(20) UNSIGNED NOT NULL,
            post_id bigint(20) UNSIGNED NOT NULL DEFAULT 0,
            action_type varchar(255) NOT NULL,
            annotation_data longtext NOT NULL,
            user_id bigint(20) UNSIGNED NOT NULL,
            timestamp datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY  (history_id),
            KEY annotation_id (annotation_id),
            KEY attachment_id (attachment_id)
        ) {$charset_collate};";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql_annotations);
        dbDelta($sql_history);

        add_option('arwai_azi_viewer_db_version', self::DB_VERSION);
    }

    /**
     * Fetch all annotations for a specific attachment ID, attaching DB primary key ID.
     *
     * @param int $attachment_id
     * @return array
     */
    public static function get_annotations_by_attachment($attachment_id) {
        global $wpdb;

        $table = $wpdb->prefix . 'image_annotations';
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT id, annotation_id, annotation_data FROM {$table} WHERE attachment_id = %d ORDER BY id ASC", $attachment_id),
            ARRAY_A
        );

        $annotations = [];
        if ($results) {
            foreach ($results as $row) {
                $decoded = json_decode($row['annotation_data'], true);
                if (is_array($decoded)) {
                    $decoded['db_id'] = (int) $row['id'];
                    $annotations[] = $decoded;
                }
            }
        }

        return $annotations;
    }

    /**
     * Upsert (Create or Update) an annotation, injecting creator object {id, name} and purpose = 'arwai-annotation-id'.
     *
     * @param int $attachment_id
     * @param int $post_id
     * @param string $annotation_id
     * @param array $annotation_data
     * @param int $user_id
     * @return bool
     */
    public static function save_annotation($attachment_id, $post_id, $annotation_id, array $annotation_data, $user_id = 0) {
        global $wpdb;

        $annotations_table = $wpdb->prefix . 'image_annotations';
        $history_table     = $wpdb->prefix . 'image_annotations_history';

        if (empty($user_id)) {
            $user_id = get_current_user_id();
        }

        $user_info    = get_userdata($user_id);
        $display_name = $user_info ? $user_info->display_name : 'arwai';

        $trimmed_id = ltrim($annotation_id, '#');
        $with_hash  = '#' . $trimmed_id;

        $target_db_id = 0;
        if (isset($annotation_data['db_id'])) {
            $target_db_id = (int) $annotation_data['db_id'];
        }
        if (!$target_db_id && isset($annotation_data['body']) && is_array($annotation_data['body'])) {
            foreach ($annotation_data['body'] as $b) {
                if (isset($b['purpose']) && in_array($b['purpose'], ['arwai-annotation-id', 'arwai-AnnotationID', 'arwai-azi-viewer-ID'], true) && !empty($b['value'])) {
                    $target_db_id = (int) $b['value'];
                    break;
                }
            }
        }

        $existing = null;
        if ($target_db_id > 0) {
            $existing = $wpdb->get_row(
                $wpdb->prepare("SELECT id, annotation_id, annotation_data FROM {$annotations_table} WHERE id = %d", $target_db_id),
                ARRAY_A
            );
        }

        if (!$existing) {
            $existing = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT id, annotation_id, annotation_data FROM {$annotations_table} WHERE attachment_id = %d AND (annotation_id = %s OR annotation_id = %s OR annotation_id = %s)",
                    $attachment_id,
                    $annotation_id,
                    $trimmed_id,
                    $with_hash
                ),
                ARRAY_A
            );
        }

        $now = current_time('mysql');
        $iso_date = gmdate('Y-m-d\TH:i:s.v\Z');

        if ($existing) {
            $db_id = (int) $existing['id'];
            $old_data = json_decode($existing['annotation_data'], true);
            $diff_messages = self::compute_annotation_diff($old_data, $annotation_data);
            $action_label  = !empty($diff_messages) ? implode(' | ', $diff_messages) : 'Updated geometry/position.';
        } else {
            $first_comment = '';
            if (isset($annotation_data['body']) && is_array($annotation_data['body'])) {
                foreach ($annotation_data['body'] as $b) {
                    if (isset($b['value']) && (!isset($b['purpose']) || $b['purpose'] === 'commenting')) {
                        $first_comment = $b['value'];
                        break;
                    }
                }
            }
            $action_label = $first_comment ? "Added comment: \"{$first_comment}\"" : 'Added comment';
        }

        // Inject creator {id, name} & created ISO timestamps into bodies matching Screenshot 1 schema
        $annotation_data = self::ensure_body_creators($annotation_data, $user_id, $display_name, $iso_date);

        // Inject purpose = 'arwai-annotation-id' body item for DB primary key ID badge matching legacy repo
        $annotation_data = self::ensure_id_body_item($annotation_data, isset($db_id) ? $db_id : 0);
        $json_payload    = wp_json_encode($annotation_data);

        if ($existing) {
            $wpdb->update(
                $annotations_table,
                [
                    'post_id'         => $post_id,
                    'annotation_data' => $json_payload,
                    'updated_at'      => $now,
                ],
                [
                    'id' => (int) $existing['id'],
                ],
                ['%d', '%s', '%s'],
                ['%d']
            );
        } else {
            $wpdb->insert(
                $annotations_table,
                [
                    'attachment_id'   => $attachment_id,
                    'post_id'         => $post_id,
                    'annotation_id'   => $annotation_id,
                    'annotation_data' => $json_payload,
                    'created_at'      => $now,
                    'updated_at'      => $now,
                ],
                ['%d', '%d', '%s', '%s', '%s', '%s']
            );
            $db_id = $wpdb->insert_id;

            $annotation_data = self::ensure_id_body_item($annotation_data, $db_id);
            $json_payload    = wp_json_encode($annotation_data);

            $wpdb->update(
                $annotations_table,
                ['annotation_data' => $json_payload],
                ['id' => $db_id],
                ['%s'],
                ['%d']
            );
        }

        // Insert audit log in history table
        $wpdb->insert(
            $history_table,
            [
                'annotation_id'   => $annotation_id,
                'attachment_id'   => $attachment_id,
                'post_id'         => $post_id,
                'action_type'     => $action_label,
                'annotation_data' => $json_payload,
                'user_id'         => $user_id,
                'timestamp'       => $now,
            ],
            ['%s', '%d', '%d', '%s', '%s', '%d', '%s']
        );

        return true;
    }

    /**
     * Inject creator {id, name} & created ISO timestamps into body items (matching Screenshot 1 schema).
     *
     * @param array $annotation
     * @param int $user_id
     * @param string $display_name
     * @param string $iso_date
     * @return array
     */
    protected static function ensure_body_creators(array $annotation, $user_id, $display_name, $iso_date) {
        if (!isset($annotation['body']) || !is_array($annotation['body'])) {
            $annotation['body'] = [];
        }

        foreach ($annotation['body'] as $idx => $b) {
            $purpose = isset($b['purpose']) ? $b['purpose'] : '';

            if (in_array($purpose, ['commenting', 'replying', 'tagging', ''], true)) {
                if (!isset($b['creator']) || !is_array($b['creator'])) {
                    $annotation['body'][$idx]['creator'] = [
                        'id'   => (int) $user_id,
                        'name' => (string) $display_name,
                    ];
                }
                if (!isset($b['created'])) {
                    $annotation['body'][$idx]['created'] = $iso_date;
                }
            }
        }

        return $annotation;
    }

    /**
     * Ensure purpose = 'arwai-annotation-id' textual body item exists in annotation payload.
     *
     * @param array $annotation
     * @param int $db_id
     * @return array
     */
    protected static function ensure_id_body_item(array $annotation, $db_id = 0) {
        if (!isset($annotation['body']) || !is_array($annotation['body'])) {
            $annotation['body'] = [];
        }

        $id_str = $db_id > 0 ? (string) $db_id : (isset($annotation['db_id']) ? (string) $annotation['db_id'] : '1');

        $found = false;
        foreach ($annotation['body'] as $idx => $b) {
            if (isset($b['purpose']) && in_array($b['purpose'], ['arwai-annotation-id', 'arwai-AnnotationID', 'arwai-azi-viewer-ID'], true)) {
                $annotation['body'][$idx]['value']   = $id_str;
                $annotation['body'][$idx]['purpose'] = 'arwai-annotation-id';
                $found = true;
                break;
            }
        }

        if (!$found) {
            $annotation['body'][] = [
                'type'    => 'TextualBody',
                'purpose' => 'arwai-annotation-id',
                'value'   => $id_str,
            ];
        }

        return $annotation;
    }

    /**
     * Delete an annotation and log deletion to history.
     *
     * @param int $attachment_id
     * @param string $annotation_id
     * @param array|null $annotation_data
     * @param int $user_id
     * @return bool
     */
    public static function delete_annotation($attachment_id, $annotation_id, $annotation_data = null, $user_id = 0) {
        global $wpdb;

        $annotations_table = $wpdb->prefix . 'image_annotations';
        $history_table     = $wpdb->prefix . 'image_annotations_history';

        if (empty($user_id)) {
            $user_id = get_current_user_id();
        }

        if (empty($annotation_data)) {
            $existing_data = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT annotation_data FROM {$annotations_table} WHERE annotation_id_from_annotorious = %s AND attachment_id = %d",
                    $annotation_id,
                    $attachment_id
                )
            );
            $annotation_data = $existing_data ? json_decode($existing_data, true) : [];
        }

        $deleted_comment = '';
        if (is_array($annotation_data) && isset($annotation_data['body'])) {
            foreach ($annotation_data['body'] as $b) {
                if (isset($b['value']) && (!isset($b['purpose']) || $b['purpose'] === 'commenting')) {
                    $deleted_comment = $b['value'];
                    break;
                }
            }
        }

        $action_label = $deleted_comment ? "Deleted reply: \"{$deleted_comment}\"" : 'Deleted annotation';
        $json_payload = wp_json_encode($annotation_data);
        $now = current_time('mysql');

        $wpdb->insert(
            $history_table,
            [
                'annotation_id'   => $annotation_id,
                'attachment_id'   => $attachment_id,
                'post_id'         => 0,
                'action_type'     => $action_label,
                'annotation_data' => $json_payload,
                'user_id'         => $user_id,
                'timestamp'       => $now,
            ],
            ['%s', '%d', '%d', '%s', '%s', '%d', '%s']
        );

        $wpdb->delete(
            $annotations_table,
            [
                'attachment_id' => $attachment_id,
                'annotation_id' => $annotation_id,
            ],
            ['%d', '%s']
        );

        return true;
    }

    /**
     * Compute detailed granular diff messages between old and new annotation payloads.
     * Distinguishes original first comment vs subsequent replies matching Screenshot 1 & 2.
     *
     * @param array $old
     * @param array $new
     * @return array
     */
    protected static function compute_annotation_diff($old, $new) {
        $diffs = [];
        $old_bodies = isset($old['body']) && is_array($old['body']) ? $old['body'] : [];
        $new_bodies = isset($new['body']) && is_array($new['body']) ? $new['body'] : [];

        $old_comments = [];
        $old_tags     = [];
        foreach ($old_bodies as $b) {
            $val = isset($b['value']) ? trim($b['value']) : '';
            if (!$val) continue;
            if (isset($b['purpose']) && $b['purpose'] === 'tagging') {
                $old_tags[] = $val;
            } elseif (!isset($b['purpose']) || $b['purpose'] === 'commenting' || $b['purpose'] === 'replying') {
                $old_comments[] = $val;
            }
        }

        $new_comments = [];
        $new_tags     = [];
        foreach ($new_bodies as $b) {
            $val = isset($b['value']) ? trim($b['value']) : '';
            if (!$val) continue;
            if (isset($b['purpose']) && $b['purpose'] === 'tagging') {
                $new_tags[] = $val;
            } elseif (!isset($b['purpose']) || $b['purpose'] === 'commenting' || $b['purpose'] === 'replying') {
                $new_comments[] = $val;
            }
        }

        // Target / Geometry diff
        $old_target = isset($old['target']) ? wp_json_encode($old['target']) : '';
        $new_target = isset($new['target']) ? wp_json_encode($new['target']) : '';
        if ($old_target !== $new_target) {
            $diffs[] = 'Updated geometry/position.';
        }

        // Comment & Reply diffs
        if ($old_comments !== $new_comments) {
            $old_count = count($old_comments);
            $new_count = count($new_comments);

            if ($new_count > $old_count) {
                $added_val = $new_comments[$new_count - 1];
                if ($new_count === 1) {
                    $diffs[] = "Added comment: \"{$added_val}\"";
                } else {
                    $diffs[] = "Added reply: \"{$added_val}\"";
                }
            } elseif ($new_count < $old_count) {
                $removed_diff = array_values(array_diff($old_comments, $new_comments));
                $deleted_val  = !empty($removed_diff) ? $removed_diff[0] : (isset($old_comments[0]) ? $old_comments[0] : '');
                if ($old_count === 1) {
                    $diffs[] = "Deleted comment: \"{$deleted_val}\"";
                } else {
                    $diffs[] = "Deleted reply: \"{$deleted_val}\"";
                }
            } else {
                for ($i = 0; $i < min($old_count, $new_count); $i++) {
                    if ($old_comments[$i] !== $new_comments[$i]) {
                        $updated_val = $new_comments[$i];
                        if ($i === 0) {
                            $diffs[] = "Updated comment to: \"{$updated_val}\"";
                        } else {
                            $diffs[] = "Updated reply to: \"{$updated_val}\"";
                        }
                    }
                }
            }
        }

        // Tag diffs
        $added_tags   = array_diff($new_tags, $old_tags);
        $deleted_tags = array_diff($old_tags, $new_tags);

        foreach ($added_tags as $tag) {
            $diffs[] = "Added tag: \"{$tag}\"";
        }
        foreach ($deleted_tags as $tag) {
            $diffs[] = "Deleted tag: \"{$tag}\"";
        }

        return $diffs;
    }

    /**
     * Fetch audit history for an annotation ID, supplying WP user profile info.
     *
     * @param string $annotation_id
     * @return array
     */
    public static function get_annotation_history($annotation_id) {
        global $wpdb;

        $history_table = $wpdb->prefix . 'image_annotations_history';
        $trimmed_id    = ltrim($annotation_id, '#');
        $with_hash     = '#' . $trimmed_id;

        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT history_id, annotation_id, attachment_id, action_type, annotation_data, user_id, timestamp 
                 FROM {$history_table} 
                 WHERE annotation_id = %s OR annotation_id = %s OR annotation_id = %s 
                 ORDER BY history_id DESC",
                $annotation_id,
                $trimmed_id,
                $with_hash
            ),
            ARRAY_A
        );

        $history = [];
        if ($results) {
            foreach ($results as $row) {
                $user_info  = get_userdata($row['user_id']);
                $first_name = $user_info ? $user_info->first_name : '';
                $last_name  = $user_info ? $user_info->last_name : '';
                $full_name  = trim($first_name . ' ' . $last_name);

                $row['user_name']  = $user_info ? $user_info->display_name : 'arwai';
                $row['user_login'] = $user_info ? $user_info->user_login : 'arwai';
                $row['full_name']  = !empty($full_name) ? $full_name : $row['user_name'];
                $row['data']       = json_decode($row['annotation_data'], true);
                $history[] = $row;
            }
        }

        return $history;
    }

    /**
     * Purge annotations when an attachment is permanently deleted.
     *
     * @param int $post_id
     */
    public static function on_delete_attachment($post_id) {
        global $wpdb;

        $annotations_table = $wpdb->prefix . 'image_annotations';
        $history_table     = $wpdb->prefix . 'image_annotations_history';

        $wpdb->delete($annotations_table, ['attachment_id' => $post_id], ['%d']);
        $wpdb->delete($history_table, ['attachment_id' => $post_id], ['%d']);
    }
}
