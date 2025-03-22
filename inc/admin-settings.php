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
        $image_melloScript = '';
        $image_path = plugin_dir_path( __DIR__ ) . 'assets/images/mello-script.svg';

        if ( file_exists( $image_path ) ) {
            $image_melloScript = plugin_dir_url( __DIR__ ) . 'assets/images/mello-script.svg';
        }
        ?>

        <div class="wrap">
            <div class="mello-header-wrapper">
                <div class="mello-header-content-wrapper">
                    <h1 class="mello-heading">Mello Block Extensions</h1>
                    <p class="mello-intro">Toggle individual block extensions on or off depending on your project needs. Press save to see changes apply immediately across the theme.</p>
                </div>
                <?php if ( $image_melloScript ) : ?>
                    <img src="<?php echo esc_url( $image_melloScript ); ?>" alt="Section Icon" class="mello-script" />
                <?php endif; ?>
            </div>
            <form method="post" action="options.php">
                <?php
                    settings_fields('mello_block_extensions_group');
                ?>
                <div class="mello-extension-sections">
                    <?php
                        do_settings_sections('mello-block-extensions');
                    ?>
                </div>
                <?php
                    submit_button();
                ?>
            </form>
        </div>
        <?php
    }
    
    add_action('admin_init', 'mello_register_settings');
    function mello_register_settings() {
        register_setting('mello_block_extensions_group', 'mello_enabled_extensions');

        $extensions = mello_get_available_extensions();
        
        $titles = [
            'button-modal-toggle'                  => 'Button: Modal Toggle',
            'columns-reverse-on-mobile-toggle'     => 'Columns: Reverse on Mobile',
            'cover-external-video-input'           => 'Cover: External Video Input',
            'details-heading-level-select'         => 'Details: Heading Level Select',
            'details-name-atribute-input'          => 'Details: Name Attribute Input',
            'details-faq-schema-toggle'            => 'Details: FAQ Schema Toggle',
            'group-additional-html-tags'           => 'Group: Additional HTML Tags',
            'navigation-extend-allowed-blocks'     => 'Navigation: Extend Allowed Blocks',
            'navigation-link-background-image'     => 'Navigation Link: Background Image',
            'navigation-submenu-extend-allowed-blocks' => 'Navigation Submenu: Extended Blocks',
            'query-exclude-current-post-toggle'    => 'Query: Exclude Current Post',
            'query-render-featured-video'          => 'Query: Featured Video',
            'data-attributes-input'                => 'Global: Data Attributes Input',
        ];

        $descriptions = [
            'button-modal-toggle'                  => 'Adds a modal toggle option to the Button block.',
            'columns-reverse-on-mobile-toggle'     => 'Adds reverse order support on small screens.',
            'cover-external-video-input'           => 'Allows video URLs (YouTube/Vimeo) as background for the Cover block.',
            'details-heading-level-select'         => 'Adds a heading level selector to the Details block summary.',
            'details-name-atribute-input'          => 'Adds a name attribute to the Details block.',
            'details-faq-schema-toggle'            => 'Enables schema markup for the Details block.',
            'group-additional-html-tags'           => 'Extends Group block with additional HTML tag options.',
            'navigation-extend-allowed-blocks'     => 'Customises allowed blocks inside the Navigation block.',
            'navigation-link-background-image'     => 'Adds a background image field to Navigation Link blocks.',
            'navigation-submenu-extend-allowed-blocks' => 'Extends submenu behaviour and allowed inner blocks.',
            'query-exclude-current-post-toggle'    => 'Adds a toggle to exclude the current post in Query loop.',
            'query-render-featured-video'          => 'Displays ACF video fields in the Query block loop.',
            'data-attributes-input'                => 'Adds a data attribute input to all blocks.',
        ];

        foreach ($extensions as $extension_slug => $extension_label) {
            // Use the slug as a unique section ID
            $section_id = 'section_' . $extension_slug;

            add_settings_section(
                $section_id,
                '',
                function () use ($extension_slug, $titles, $extensions, $descriptions) {
                    $options = get_option('mello_enabled_extensions', []);
                    $checked = isset($options[$extension_slug]) && $options[$extension_slug] ? 'checked' : '';

                    $extension_label = isset( $titles[ $extension_slug ] ) ? $titles[ $extension_slug ] : $extensions[ $extension_slug ];
                    $description = isset( $descriptions[ $extension_slug ] )
                        ? $descriptions[ $extension_slug ]
                        : ucwords( str_replace( '-', ' ', $extension_slug ) ) . ' extension.';

                    echo "<div class='mello-extension-section'>";
                    echo "<div class='mello-extension-header'>";
                    echo "<h2 class='mello-extension-title'>" . esc_html($extension_label) . "</h2>";
                    echo "<label class='mello-switch'>
                            <input type='checkbox' name='mello_enabled_extensions[$extension_slug]' value='1' $checked>
                            <span class='mello-slider'></span>
                          </label>";
                    echo "</div>";
                    echo "<p class='mello-extension-description'>" . esc_html( $description ) . "</p>";
                    echo "</div>";
                },
                'mello-block-extensions'
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

    add_action( 'admin_enqueue_scripts', function( $hook ) {
    if ( $hook !== 'settings_page_mello-block-extensions' ) return;
    
        wp_enqueue_style(
            'mello-admin-settings-style',
            plugins_url( '/admin-style.css', __FILE__ ),
            [],
            '1.0'
        );
    } );