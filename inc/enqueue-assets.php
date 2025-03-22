<?php

namespace Mello;

class Block_Extensions {

    /**
     * @var string $editor_script_handle the editor script handle id
     */
    private $editor_script_handle;

    /**
     * @var string $editor_style_handle the editor style handle id
     */
    private $editor_style_handle;

    /**
     * @var string $public_style_handle the public style handle id
     */
    private $public_style_handle;

    /**
     * @var string $public_script_handle the public script handle id
     */
    private $public_script_handle;

    /**
     * Constructor for setting up handles and hooks.
     */
    public function __construct() {

        // Define script/style handles using a consistent identifier.
        $this->editor_script_handle = 'mello-block-editor-script';
        $this->editor_style_handle  = 'mello-block-editor-style';
        $this->public_style_handle  = 'mello-block-style';
        $this->public_script_handle  = 'mello-block-frontend-script'; // New handle for frontend script

        // Register the hooks to enqueue block assets.
        $this->register_hooks();
    }

    /**
     * Register the hooks for enqueuing assets.
     */
    public function register_hooks() {
        // Hook for editor-only assets.
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
        // Hook for frontend-only assets.
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_assets' ] );
    }

    /**
     * Enqueue editor-specific JS and CSS assets.
     */
    public function enqueue_block_editor_assets() {
        $enabled = \Mello\mello_get_enabled_extensions();

        foreach ($enabled as $slug => $active) {
            if (! $active) continue;

            $editor_js = plugin_dir_path(__FILE__) . "../build/$slug/edit.js";
            $editor_css = plugin_dir_path(__FILE__) . "../build/$slug/styles.css";

            if (file_exists($editor_js)) {
                $asset_file = plugin_dir_path(__FILE__) . "../build/$slug/edit.asset.php";
                $asset = file_exists($asset_file) ? require $asset_file : [ 'dependencies' => [], 'version' => false ];

                wp_enqueue_script(
                    "mello-editor-$slug",
                    plugin_dir_url(__FILE__) . "../build/$slug/edit.js",
                    $asset['dependencies'],
                    $asset['version'],
                    true
                );
            }

            if (file_exists($editor_css)) {
                wp_enqueue_style(
                    "mello-editor-style-$slug",
                    plugin_dir_url(__FILE__) . "../build/$slug/styles.css",
                    [],
                    filemtime($editor_css)
                );
            }
        }
    }

    /**
     * Enqueue frontend-specific CSS and JS assets.
     */
    public function enqueue_frontend_assets() {
        $enabled = \Mello\mello_get_enabled_extensions();

        foreach ($enabled as $slug => $active) {
            if (! $active) continue;

            $frontend_js = plugin_dir_path(__FILE__) . "../build/$slug/frontend.js";
            $frontend_css = plugin_dir_path(__FILE__) . "../build/$slug/styles.css";

            if (file_exists($frontend_css)) {
                wp_enqueue_style(
                    "mello-style-$slug",
                    plugin_dir_url(__FILE__) . "../build/$slug/styles.css",
                    [],
                    filemtime($frontend_css)
                );
            }

            if (file_exists($frontend_js)) {
                wp_enqueue_script(
                    "mello-frontend-$slug",
                    plugin_dir_url(__FILE__) . "../build/$slug/frontend.js",
                    [],
                    filemtime($frontend_js),
                    true
                );
            }
        }
    }

    /**
     * Prepare localized script data to pass to JavaScript.
     * This can be useful for things like REST API URLs, nonces, or any dynamic data.
     */
    public function get_localize_script_data() {
        return [
            'site_url' => get_site_url(),
            'nonce'    => wp_create_nonce( 'wp_rest' ), // Nonce for security in AJAX requests.
        ];
    }
}

// Initialise the class
new Block_Extensions();