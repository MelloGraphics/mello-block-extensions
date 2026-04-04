<?php

namespace Mello;

class Block_Extensions
{

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
    public function __construct()
    {

        // Define script/style handles using a consistent identifier.
        $this->editor_script_handle = 'mello-block-editor-script';
        $this->editor_style_handle = 'mello-block-editor-style';
        $this->public_style_handle = 'mello-block-style';
        $this->public_script_handle = 'mello-block-frontend-script'; // New handle for frontend script

        // Register the hooks to enqueue block assets.
        $this->register_hooks();
    }

    /**
     * Register the hooks for enqueuing assets and registering blocks.
     */
    public function register_hooks()
    {
        // Hook for including extension functions early.
        add_action('init', [$this, 'include_extension_functions']);
        // Hook for editor-only assets.
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_block_editor_assets']);
        // Hook for editor styles — must use enqueue_block_assets to load inside the iframe.
        add_action('enqueue_block_assets', [$this, 'enqueue_block_editor_styles']);
        // Hook for frontend-only assets.
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
        // Hook to register blocks on init
        add_action('init', [$this, 'register_blocks']);
    }

    /**
     * Include block-functions.php for enabled extensions early in the lifecycle.
     */
    public function include_extension_functions()
    {
        $enabled = \Mello\mello_get_enabled_extensions();

        // Load block-level and extension-level PHP logic
        $function_dirs = ['extensions', 'blocks'];

        foreach ($enabled as $slug => $active) {
            if (!$active) {
                continue;
            }

            foreach ($function_dirs as $base) {
                $functions_file = plugin_dir_path(__FILE__) . "../build/$base/$slug/block-functions.php";

                if (file_exists($functions_file)) {
                    include_once $functions_file;
                }
            }
        }
    }

    /**
     * Enqueue editor-specific assets.
     */
    public function enqueue_block_editor_assets()
    {
        $enabled = \Mello\mello_get_enabled_extensions();

        foreach ($enabled as $slug => $active) {
            if (!$active)
                continue;

            $asset_dirs = ['extensions', 'blocks'];

            foreach ($asset_dirs as $base) {
                $editor_js = plugin_dir_path(__FILE__) . "../build/$base/$slug/edit.js";
                $editor_css = plugin_dir_path(__FILE__) . "../build/$base/$slug/editor-style.css";

                if (file_exists($editor_js)) {
                    $asset_file = plugin_dir_path(__FILE__) . "../build/$base/$slug/edit.asset.php";
                    $asset = file_exists($asset_file) ? require $asset_file : ['dependencies' => [], 'version' => false];

                    wp_enqueue_script(
                        "mello-editor-$slug",
                        plugin_dir_url(__FILE__) . "../build/$base/$slug/edit.js",
                        $asset['dependencies'],
                        $asset['version'],
                        true
                    );
                }

            }
        }
    }

    /**
     * Enqueue editor styles inside the block editor iframe.
     */
    public function enqueue_block_editor_styles()
    {
        if (!is_admin()) return;

        $enabled = \Mello\mello_get_enabled_extensions();

        foreach ($enabled as $slug => $active) {
            if (!$active) continue;

            foreach (['extensions', 'blocks'] as $base) {
                $editor_css = plugin_dir_path(__FILE__) . "../build/$base/$slug/editor-style.css";

                if (file_exists($editor_css)) {
                    wp_enqueue_style(
                        "mello-editor-style-$slug",
                        plugin_dir_url(__FILE__) . "../build/$base/$slug/editor-style.css",
                        [],
                        filemtime($editor_css)
                    );
                }
            }
        }
    }

    /**
     * Enqueue frontend-specific assets.
     */
    public function enqueue_frontend_assets()
    {
        $enabled = \Mello\mello_get_enabled_extensions();

        foreach ($enabled as $slug => $active) {
            if (!$active)
                continue;

            $asset_dirs = ['extensions', 'blocks'];

            foreach ($asset_dirs as $base) {
                $frontend_js = plugin_dir_path(__FILE__) . "../build/$base/$slug/frontend.js";
                $frontend_css = plugin_dir_path(__FILE__) . "../build/$base/$slug/styles.css";

                if (file_exists($frontend_css)) {
                    wp_enqueue_style(
                        "mello-style-$slug",
                        plugin_dir_url(__FILE__) . "../build/$base/$slug/styles.css",
                        [],
                        filemtime($frontend_css)
                    );
                }

                if (file_exists($frontend_js)) {
                    wp_enqueue_script(
                        "mello-frontend-$slug",
                        plugin_dir_url(__FILE__) . "../build/$base/$slug/frontend.js",
                        ['jquery'], // Ensure jQuery loads first
                        filemtime($frontend_js),
                        true
                    );

                    // Localise global data for frontend use
                    wp_localize_script(
                        "mello-frontend-$slug",
                        'melloGlobals',
                        $this->get_localize_script_data()
                    );
                }
            }
        }
    }

    /**
     * Register blocks from the build/blocks folder.
     * Scans each directory in build/blocks and, if a block.json file exists and the toggle is enabled, registers the block.
     */
    public function register_blocks()
    {
        // Get the enabled extensions/settings.
        $enabled = \Mello\mello_get_enabled_extensions();

        $blocks_dir = plugin_dir_path(__FILE__) . "../build/blocks/";

        if (!file_exists($blocks_dir)) {
            return;
        }

        // Get all directories in the build/blocks folder
        $directories = glob($blocks_dir . '*', GLOB_ONLYDIR);

        if (!$directories) {
            return;
        }

        foreach ($directories as $dir) {
            // The block slug is the directory name.
            $slug = basename($dir);
            // Only register if the toggle for this block is enabled.
            if (empty($enabled[$slug]) || !$enabled[$slug]) {
                continue;
            }
            $block_json = trailingslashit($dir) . 'block.json';
            if (file_exists($block_json)) {
                // Register the block using the directory path.
                register_block_type($dir);
            }
        }


    }

    /**
     * Prepare localized script data to pass to JavaScript.
     * This can be useful for things like REST API URLs, nonces, or any dynamic data.
     */
    public function get_localize_script_data()
    {
        return [
            'site_url' => get_site_url(),
            'nonce' => wp_create_nonce('wp_rest'), // Nonce for security in AJAX requests.
        ];
    }
}

// Initialise the class
new Block_Extensions();