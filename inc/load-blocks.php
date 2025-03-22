<?php

namespace Mello;

$enabled_extensions = get_option('mello_enabled_extensions');

if (empty($enabled_extensions)) {
    $enabled_extensions = [];
    $base_dir = plugin_dir_path(__FILE__) . '/../build/';
    foreach (scandir($base_dir) as $item) {
        if ($item === '.' || $item === '..') continue;
        if (is_dir($base_dir . $item)) {
            $enabled_extensions[$item] = true;
        }
    }
    update_option('mello_enabled_extensions', $enabled_extensions);
}

foreach ($enabled_extensions as $slug => $enabled) {
    if ($enabled) {
        $functions_file = plugin_dir_path(__FILE__) . '/../build/' . $slug . '/block-functions.php';
        if (file_exists($functions_file)) {
            require_once $functions_file;
        }
    }
}