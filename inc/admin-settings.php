<?php
    add_action('admin_menu', 'mello_add_settings_page');
    function mello_add_settings_page() {
        add_options_page(
            'Mello Block Extensions',
            'Mello Block Extensions',
            'manage_options',
            'mello-block-extensions',
            'mello_render_settings_page'
        );
    }
    
    function mello_render_settings_page() {
        ?>
        <style>
            .mello-switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }

            .mello-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .mello-slider {
                position: absolute;
                cursor: pointer;
                top: 0; left: 0;
                right: 0; bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 24px;
            }

            .mello-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }

            .mello-switch input:checked + .mello-slider {
                background-color: #2271b1;
            }

            .mello-switch input:checked + .mello-slider:before {
                transform: translateX(26px);
            }
        </style>
        <div class="wrap">
            <h1>Mello Block Extensions</h1>
            <form method="post" action="options.php">
                <?php
                    settings_fields('mello_block_extensions_group');
                    do_settings_sections('mello-block-extensions');
                    submit_button();
                ?>
            </form>
        </div>
        <?php
    }
    
    add_action('admin_init', 'mello_register_settings');
    function mello_register_settings() {
        register_setting('mello_block_extensions_group', 'mello_enabled_extensions');
    
        add_settings_section(
            'mello_extensions_section',
            'Toggle Block Extensions',
            function () {
                echo '<p>Enable or disable specific block extensions based on your theme requirements.</p>';
            },
            'mello-block-extensions'
        );
    
        $extensions = mello_get_available_extensions();
    
        foreach ($extensions as $extension_slug => $extension_label) {
            add_settings_field(
                $extension_slug,
                $extension_label,
                function () use ($extension_slug) {
                    $options = get_option('mello_enabled_extensions', []);
                    $checked = isset($options[$extension_slug]) && $options[$extension_slug] ? 'checked' : '';
                    echo "<label class='mello-switch'>
                            <input type='checkbox' name='mello_enabled_extensions[$extension_slug]' value='1' $checked>
                            <span class='mello-slider'></span>
                        </label>";
                },
                'mello-block-extensions',
                'mello_extensions_section'
            );
        }
    }
    
    function mello_get_available_extensions() {
        $extensions_dir = plugin_dir_path(__FILE__) . '../src/blocks/';
        $extensions = [];
    
        foreach (scandir($extensions_dir) as $item) {
            if ($item === '.' || $item === '..' || !is_dir($extensions_dir . $item)) continue;
            $extensions[$item] = ucwords(str_replace('-', ' ', $item));
        }
    
        return $extensions;
    }