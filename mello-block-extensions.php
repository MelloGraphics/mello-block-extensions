<?php
/**
 * Plugin Name: Mello Block Extensions
 * Description: Custom block extensions and functionality for WordPress.
 * Version: 2.0.0
 * Author: Ashley Pickering
 * License: GPL-2.0+
 */

namespace Mello;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'inc/helpers.php';
require_once plugin_dir_path(__FILE__) . 'inc/load-blocks.php';
require_once plugin_dir_path(__FILE__) . 'inc/enqueue-assets.php';
require_once plugin_dir_path(__FILE__) . 'inc/admin-settings.php';