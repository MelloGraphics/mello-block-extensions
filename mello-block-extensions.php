<?php
/**
 * Plugin Name:       Mello Block Extensions
 * Plugin URI:        https://mellographics.com/
 * Description:       Custom block extensions and functionality for WordPress block themes.
 * Version:           2.0.1
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

register_activation_hook(__FILE__, 'Mello\\mello_initialize_enabled_extensions');