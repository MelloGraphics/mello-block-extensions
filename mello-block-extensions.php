<?php
/**
 * Plugin Name:       Mello Block Extensions
 * Plugin URI:        https://mellographics.com/
 * Description:       Custom block extensions and functionality for WordPress block themes.
 * Version:           2.1.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Ashley Pickering
 * Author URI:        https://mellographics.com
 * License:           GPL-2.0+
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mello-block-extensions
 * Domain Path:       /languages
 */

namespace Mello;
use YahnisElsts\PluginUpdateChecker\v5p5\Vcs\GitHubApi;
use YahnisElsts\PluginUpdateChecker\v5p5\Vcs\PluginUpdateChecker;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'inc/helpers.php';
require_once plugin_dir_path(__FILE__) . 'inc/enqueue-assets.php';
require_once plugin_dir_path(__FILE__) . 'inc/admin-settings.php';

// Include the Plugin Update Checker library
require __DIR__ . '/plugin-update-checker/plugin-update-checker.php';

// Set up the GitHub API client for updates
$githubApi = new GitHubApi(
    'https://github.com/MelloGraphics/mello-block-extensions/',
    '' // If private, put your personal access token here
);
$githubApi->enableReleaseAssets();

// Create the update checker instance
$updateChecker = new PluginUpdateChecker(
    $githubApi,
    __FILE__,
    'mello-block-extensions'
);

register_activation_hook(__FILE__, function () {
	if (function_exists('Mello\\mello_initialize_enabled_extensions')) {
		\Mello\mello_initialize_enabled_extensions();
	} else {
		add_action('plugins_loaded', function () {
			if (function_exists('Mello\\mello_initialize_enabled_extensions')) {
				\Mello\mello_initialize_enabled_extensions();
			}
		});
	}
});