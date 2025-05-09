<?php
/**
 * Plugin Name:       Mello Block Extensions
 * Plugin URI:        https://mellographics.com/
 * Description:       Custom block extensions and functionality for WordPress block themes.
 * Version: 2.1.3
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

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'inc/helpers.php';
require_once plugin_dir_path(__FILE__) . 'inc/enqueue-assets.php';
require_once plugin_dir_path(__FILE__) . 'inc/admin-settings.php';

// Include the Plugin Update Checker library
require_once __DIR__ . '/plugin-update-checker/plugin-update-checker.php';

// Set up the update checker
use YahnisElsts\PluginUpdateChecker\v5p5\PucFactory;

$myUpdateChecker = PucFactory::buildUpdateChecker(
    'https://github.com/MelloGraphics/mello-block-extensions/',
    __FILE__,
    'mello-block-extensions'
);

// Set the branch that contains the stable release
$myUpdateChecker->setBranch('main');

// Optional: Add a GitHub access token for private repositories or to increase API rate limit
$myUpdateChecker->setAuthentication('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');

// Optional: If you're using release assets instead of the source code
$myUpdateChecker->getVcsApi()->enableReleaseAssets();

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