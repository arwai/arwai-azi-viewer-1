<?php
namespace Arwai\ImageAnnotator\Rest;

use Arwai\ImageAnnotator\Database;
use Arwai\ImageAnnotator\Admin\SettingsPage;
use WP_REST_Controller;
use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

if (!defined('ABSPATH')) {
    exit;
}

class AnnotationController extends WP_REST_Controller {
    protected $namespace = 'arwai-image-annotator/v1';

    /**
     * Register REST API routes.
     */
    public function register_routes() {
        $namespaces = [$this->namespace, 'image-annotator/v1'];

        foreach ($namespaces as $ns) {
            register_rest_route($ns, '/annotations/attachment/(?P<attachment_id>\d+)', [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get_annotations'],
                    'permission_callback' => '__return_true',
                ],
                [
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'save_annotation'],
                    'permission_callback' => [$this, 'check_edit_permission'],
                ],
            ]);

            register_rest_route($ns, '/annotations/attachment/(?P<attachment_id>\d+)/(?P<annotation_id>[^/]+)', [
                [
                    'methods'             => WP_REST_Server::DELETABLE,
                    'callback'            => [$this, 'delete_annotation'],
                    'permission_callback' => [$this, 'check_edit_permission'],
                ],
            ]);

            register_rest_route($ns, '/annotations/history/(?P<annotation_id>[^/]+)', [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get_history'],
                    'permission_callback' => '__return_true',
                ],
            ]);

            register_rest_route($ns, '/tags', [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get_wp_tags'],
                    'permission_callback' => '__return_true',
                ],
            ]);
        }
    }

    /**
     * Permission callback for write operations based on Admin configured roles.
     *
     * @param WP_REST_Request $request
     * @return bool|WP_Error
     */
    public function check_edit_permission(WP_REST_Request $request) {
        if (!is_user_logged_in()) {
            return new WP_Error('rest_forbidden', __('You must be logged in to edit annotations.', 'arwai-azi-viewer'), ['status' => 401]);
        }

        $user = wp_get_current_user();
        $allowed_roles = SettingsPage::get_editing_roles();

        $user_has_role = false;
        if (!empty($user->roles)) {
            foreach ($user->roles as $role) {
                if (in_array($role, $allowed_roles, true)) {
                    $user_has_role = true;
                    break;
                }
            }
        }

        if ($user_has_role || current_user_can('manage_options')) {
            return true;
        }

        return new WP_Error('rest_forbidden', __('Your user role is not authorized to edit annotations.', 'arwai-azi-viewer'), ['status' => 403]);
    }

    /**
     * Get annotations for attachment.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function get_annotations(WP_REST_Request $request) {
        $attachment_id = (int) $request->get_param('attachment_id');
        if (empty($attachment_id)) {
            return new WP_REST_Response([], 200);
        }

        $annotations = Database::get_annotations_by_attachment($attachment_id);
        return new WP_REST_Response($annotations, 200);
    }

    /**
     * Save/Update an annotation and sync tags with WP post_tag taxonomy.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function save_annotation(WP_REST_Request $request) {
        $attachment_id = (int) $request->get_param('attachment_id');
        $post_id       = (int) $request->get_param('post_id');
        $json_raw      = $request->get_param('annotation');

        if (empty($json_raw)) {
            $json_raw = $request->get_body();
        }

        $data = is_array($json_raw) ? $json_raw : json_decode($json_raw, true);

        if (empty($data) || !isset($data['id'])) {
            return new WP_Error('invalid_annotation', __('Invalid annotation payload.', 'arwai-azi-viewer'), ['status' => 400]);
        }

        $sanitized_data = $this->sanitize_annotation_payload($data);
        $annotation_id  = sanitize_text_field($sanitized_data['id']);

        if (isset($sanitized_data['body']) && is_array($sanitized_data['body'])) {
            $tags_to_sync = [];
            foreach ($sanitized_data['body'] as $b) {
                if (isset($b['purpose']) && $b['purpose'] === 'tagging' && !empty($b['value'])) {
                    $tags_to_sync[] = sanitize_text_field($b['value']);
                }
            }
            if (!empty($tags_to_sync)) {
                if ($post_id > 0) {
                    wp_set_post_terms($post_id, $tags_to_sync, 'post_tag', true);
                }
                wp_set_post_terms($attachment_id, $tags_to_sync, 'post_tag', true);
            }
        }

        Database::save_annotation($attachment_id, $post_id, $annotation_id, $sanitized_data);

        return new WP_REST_Response([
            'success'    => true,
            'annotation' => $sanitized_data,
        ], 200);
    }

    /**
     * Delete an annotation.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function delete_annotation(WP_REST_Request $request) {
        $attachment_id = (int) $request->get_param('attachment_id');
        $annotation_id = sanitize_text_field(urldecode($request->get_param('annotation_id')));

        if (empty($attachment_id) || empty($annotation_id)) {
            return new WP_Error('invalid_params', __('Missing attachment or annotation ID.', 'arwai-azi-viewer'), ['status' => 400]);
        }

        $json_raw = $request->get_param('annotation');
        $data     = is_array($json_raw) ? $json_raw : json_decode($json_raw, true);

        Database::delete_annotation($attachment_id, $annotation_id, $data);

        return new WP_REST_Response([
            'success' => true,
            'id'      => $annotation_id,
        ], 200);
    }

    /**
     * Get annotation change history.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function get_history(WP_REST_Request $request) {
        $annotation_id = sanitize_text_field(urldecode($request->get_param('annotation_id')));
        if (empty($annotation_id)) {
            return new WP_REST_Response(['history' => []], 200);
        }

        $history = Database::get_annotation_history($annotation_id);
        return new WP_REST_Response(['history' => $history], 200);
    }

    /**
     * Get WordPress post_tag terms for Annotorious tag autocomplete.
     *
     * @return WP_REST_Response
     */
    public function get_wp_tags() {
        $terms = get_terms([
            'taxonomy'   => 'post_tag',
            'hide_empty' => false,
        ]);

        $tags = [];
        if (!is_wp_error($terms) && is_array($terms)) {
            foreach ($terms as $t) {
                $tags[] = $t->name;
            }
        }

        return new WP_REST_Response(['tags' => $tags], 200);
    }

    /**
     * Recursively sanitize W3C annotation payload strings.
     *
     * @param array $data
     * @return array
     */
    protected static function sanitize_annotation_payload(array $data) {
        if (isset($data['body']) && is_array($data['body'])) {
            foreach ($data['body'] as $index => $body) {
                if (isset($body['value']) && is_string($body['value'])) {
                    if (isset($body['purpose']) && ($body['purpose'] === 'commenting' || $body['purpose'] === 'replying')) {
                        $data['body'][$index]['value'] = wp_kses_post($body['value']);
                    } else {
                        $data['body'][$index]['value'] = sanitize_text_field($body['value']);
                    }
                }
            }
        }
        return $data;
    }
}
