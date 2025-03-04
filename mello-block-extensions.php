<?php
/**
 * Plugin Name: Mello Block Extensions
 * Description: Custom block extensions for WordPress.
 * Version: 1.0.0
 * Author: Ashley Pickering
 * License: GPL-2.0+
 */

namespace Mello;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Check if the class already exists to avoid conflicts.
if ( ! class_exists( 'Mello\Block_Extensions' ) ) {

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
         * Enqueue frontend-specific CSS and JS assets.
         */
        public function enqueue_frontend_assets() {
            // Enqueue the public-facing styles for the blocks.
            wp_enqueue_style(
                $this->public_style_handle,
                plugin_dir_url( __FILE__ ) . 'build/frontend.css',
                array(),
                filemtime( plugin_dir_path( __FILE__ ) . 'build/frontend.css' ) // Cache-busting using file modification time.
            );

            // Enqueue the public-facing script (frontend.js).
            wp_enqueue_script(
                $this->public_script_handle,
                plugin_dir_url( __FILE__ ) . 'build/view.js', // Adjust the path to your frontend.js file
                array(), // Add dependencies if needed
                filemtime( plugin_dir_path( __FILE__ ) . 'build/view.js' ), // Cache-busting using file modification time.
                true // Load in footer
            );
        }

        /**
         * Enqueue editor-specific JS and CSS assets.
         */
        public function enqueue_block_editor_assets() {
            // Path to asset file created by Webpack, which contains dependencies and version info.
            $script_asset_path = plugin_dir_path( __FILE__ ) . 'build/editor.asset.php';

            // Check if the index.asset.php file exists.
            if ( ! file_exists( $script_asset_path ) ) {
                throw new \Error(
                    'Run `npm run build` to generate the required files. Could not find index.asset.php.'
                );
            }

            // Load the asset file for script dependencies and version.
            $script_asset = require( $script_asset_path );

            // Enqueue the block editor script (editor.js).
            wp_enqueue_script(
                $this->editor_script_handle,
                plugin_dir_url( __FILE__ ) . 'build/editor.js',
                $script_asset['dependencies'], // Dependencies such as React, WP packages, etc.
                $script_asset['version'], // Version from the asset file.
                true // Load in footer
            );

            // Enqueue the block editor styles (editor.css).
            wp_enqueue_style(
                $this->editor_style_handle,
                plugin_dir_url( __FILE__ ) . 'build/editor.css',
                array(),
                filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.css' ) // Cache-busting.
            );

            // Pass data from PHP to JS (optional, only if needed).
            wp_localize_script( $this->editor_script_handle, 'Mello', $this->get_localize_script_data() );
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

    // Initialize the Block Extensions class to hook it into WordPress.
    new Block_Extensions();

    // Include PHP functions from block folders
    foreach (glob(plugin_dir_path(__FILE__) . 'build/**/block-functions.php') as $file) {
        require_once $file;
        error_log("Loaded: " . $file);  // Debug to check which files are being loaded
    }
    
}
