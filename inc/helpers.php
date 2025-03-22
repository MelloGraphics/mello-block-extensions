<?php
namespace Mello;

function mello_get_enabled_extensions() {
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

    return $enabled_extensions;
}