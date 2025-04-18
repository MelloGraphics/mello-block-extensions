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

function mello_initialize_enabled_extensions() {
    if (get_option('mello_enabled_extensions') !== false) {
        return; // Already set, no need to overwrite
    }

    $enabled_extensions = [];
    $base_dir = plugin_dir_path(__FILE__) . '/../build/extensions/';
    foreach (scandir($base_dir) as $item) {
        if ($item === '.' || $item === '..') continue;
        if (is_dir($base_dir . $item)) {
            $enabled_extensions[$item] = true;
        }
    }

    update_option('mello_enabled_extensions', $enabled_extensions);
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
                <h1 class="mello-heading">
                    Mello Block Extensions
                </h1>
                <p class="mello-intro">Toggle individual block extensions on or off depending on your project needs. Press save to see changes apply across the theme.</p>
                <?php
                    $plugin_data = get_plugin_data( plugin_dir_path( __DIR__ ) . 'mello-block-extensions.php' );
                ?>
                <div class="mello-meta-block">
                    <p>
                        <strong>Version:</strong>
                        <span class="mello-plugin-version">
                            <?php echo esc_html( $plugin_data['Version'] ); ?>
                        </span>
                    </p>
                    <p>
                        <strong>Author:</strong>
                        <?php echo wp_kses_post( $plugin_data['Author'] ); ?>
                    </p>
                    <p>
                        <strong>Website:</strong>
                        <a href="<?php echo esc_url( $plugin_data['PluginURI'] ); ?>" target="_blank">
                            <?php echo esc_html( $plugin_data['PluginURI'] ); ?>
                        </a>
                    </p>
                </div>
            </div>
            <?php if ( $image_melloScript ) : ?>
                <img src="<?php echo esc_url( $image_melloScript ); ?>" alt="Section Icon" class="mello-script" />
            <?php endif; ?>
        </div>
        <form method="post" action="options.php">
            <?php settings_fields('mello_block_extensions_group'); ?>
            <div class="mello-extension-sections">
                <?php do_settings_sections('mello-block-extensions'); ?>
            </div>
            <?php submit_button(); ?>
        </form>
    </div>

    <!-- Inline JavaScript for the filter functionality -->
    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('#mello-extension-filter .mello-filter');
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons and add it to the clicked button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const filter = button.getAttribute('data-filter');
                    // Get all extension sections in the Core Block Extensions
                    const sections = document.querySelectorAll('.mello-extension-section');
                    sections.forEach(section => {
                        // Show all if filter is 'all' or show only matching sections
                        if (filter === 'all' || section.getAttribute('data-group') === filter) {
                            section.style.display = '';
                        } else {
                            section.style.display = 'none';
                        }
                    });
                });
            });
        });
    </script>
    <?php
}

add_action('admin_init', 'mello_register_settings');
function mello_register_settings() {
    $titles = [
        'button-modal-toggle'       => 'Button: Show link in modal',
        'content-in-modal-toggle'   => 'Query: Show content in a modal',
        'columns-reverse-toggle'    => 'Columns: Reverse order on mobile',
        'cover-ext-video'           => 'Cover: Render external video URL',
        'details-faq-schema'        => 'Details: Add FAQ schema',
        'details-heading-level'     => 'Details: Add heading level to summary',
        'details-name-attribute'    => 'Details: Add name attribute',
        'add-data-attributes'       => 'Global: Add data attributes',
        'add-smooth-scroll'           => 'Global: Smooth Scrolling',
        'group-tag-name'            => 'Group: Additional HTML tag options',
        'group-link-wrapper'        => 'Group: Add group link',
        'navigation-allowed-blocks' => 'Navigation: Extend allowed blocks',
        'navigation-link-render-image' => 'Navigation Link: Render image in link',
        'navigation-submenu-allowed-blocks' => 'Navigation Submenu: Extend allowed blocks',
        'query-exclude-current-post' => 'Query: Exclude current post',
        'query-render-featured-video' => 'Query: Render a featured video',
    ];
    $descriptions = [
        'button-modal-toggle'       => 'Adds a toggle to buttons for opening link content in an iframe modal.',
        'content-in-modal-toggle'   => 'Adds a toggle to various query blocks to open the linked content in a modal.',
        'columns-reverse-toggle'    => 'Allows reversing the order of columns on mobile devices.',
        'cover-ext-video'           => 'Adds an input for embedding external video URLs into the Cover block.',
        'details-faq-schema'        => 'Outputs FAQ schema markup in frontend for Details blocks.',
        'details-heading-level'     => 'Choose the heading level for Details block summary.',
        'details-name-attribute'    => 'Adds a custom name attribute to Details block',
        'add-data-attributes'       => 'Input field for adding custom data-* attributes to a block.',
        'add-smooth-scroll'           => 'Adds smooth scrolling and a slider to change a blocks scroll speed creating a parallax effect.',
        'group-tag-name'            => 'Choose the HTML tag used for the Group block wrapper.',
        'group-link-wrapper'        => 'Add a link URL within the group block that wraps the whole content',
        'navigation-allowed-blocks' => 'Allows additional blocks inside Navigation block.',
        'navigation-link-render-image' => 'Adds image field support to Navigation Link block.',
        'navigation-submenu-allowed-blocks' => 'Allows blocks inside Navigation Submenu items.',
        'query-exclude-current-post' => 'Toggle to exclude the current post from Query block results.',
        'query-render-featured-video' => 'Renders featured video from custom field in the Query block.',
        'read-time'                 => 'Display the read time of the current page.',
        'post-type'                 => 'Display the post type for the page, or in a query.',
        'counter'                 => 'Display stats and figures animated in on scroll.'
    ];
    
    // New array to manually define data attributes for each extension.
    $data_attributes = [
        'button-modal-toggle'       => 'button',
        'content-in-modal-toggle'   => 'query',
        'columns-reverse-toggle'    => 'columns',
        'cover-ext-video'           => 'cover',
        'details-faq-schema'        => 'details',
        'details-heading-level'     => 'details',
        'details-name-attribute'    => 'details',
        'add-data-attributes'       => 'mixed',
        'add-smooth-scroll'           => 'mixed',
        'group-tag-name'            => 'group',
        'group-link-wrapper'        => 'group',
        'navigation-allowed-blocks' => 'navigation',
        'navigation-link-render-image' => 'navigation',
        'navigation-submenu-allowed-blocks' => 'navigation',
        'query-exclude-current-post' => 'query',
        'query-render-featured-video' => 'query',
    ];
    
    register_setting('mello_block_extensions_group', 'mello_enabled_extensions');

    $extensions = mello_get_available_extensions();
    
    $grouped = [
        'extensions' => [],
        'blocks'     => [],
    ];

    foreach ($extensions as $slug => $meta) {
        $grouped[$meta['type']][$slug] = $meta['label'];
    }

    // We add two groups: "Core Block Extensions" (extensions) and "MelloBlocks" (blocks)
    foreach (['extensions' => 'Core Block Extensions', 'blocks' => 'MelloBlocks'] as $type => $heading) {
        add_settings_section(
            "heading_$type",
            '',
            function () use ( $heading, $type ) {
                $descriptions = [
                    'extensions' => 'Enhance core blocks with added functionality tailored for better editorial experience.',
                    'blocks'     => 'Add custom MelloBlocks designed for layout, interaction and storytelling.'
                ];

                echo "<div class='mello-extension-group'>";
                echo "<div class='title-wrapper'>";
                echo "<h2 class='mello-extension-type-heading'>" . esc_html( $heading ) . "</h2>";
                echo "<p class='mello-extension-type-description'>" . esc_html( $descriptions[ $type ] ) . "</p>";
                echo "</div>";
                // Add filter UI only for Core Block Extensions
                if ( $type === 'extensions' ) {
                    echo "<div id='mello-extension-filter'>";
                    echo "<span>Filter: </span>";
                    echo "<button type='button' data-filter='all' class='mello-filter active'>All</button>";
                    echo "<button type='button' data-filter='query' class='mello-filter'>Query</button>";
                    echo "<button type='button' data-filter='button' class='mello-filter'>Button</button>";
                    echo "<button type='button' data-filter='navigation' class='mello-filter'>Navigation</button>";
                    echo "<button type='button' data-filter='group' class='mello-filter'>Group</button>";
                    echo "<button type='button' data-filter='mixed' class='mello-filter'>Mixed</button>";
                    echo "</div>";
                }
                echo "</div>";
            },
            'mello-block-extensions'
        );

        foreach ($grouped[$type] as $extension_slug => $extension_label) {
            // Use the manual data attributes array for the 'extensions' type.
            $data_attribute = '';
            if ( $type === 'extensions' ) {
                if ( isset($data_attributes[$extension_slug]) ) {
                    $group = $data_attributes[$extension_slug];
                } else {
                    $group = 'another';
                }
                $data_attribute = "data-group='" . esc_attr($group) . "'";
            }

            $section_id = 'section_' . $extension_slug;

            add_settings_section(
                $section_id,
                '',
                function () use ($extension_slug, $titles, $grouped, $descriptions, $type, $data_attribute) {
                    $options = get_option('mello_enabled_extensions', []);
                    $checked = isset($options[$extension_slug]) && $options[$extension_slug] ? 'checked' : '';

                    $extension_label = isset( $titles[ $extension_slug ] ) ? $titles[ $extension_slug ] : $grouped[$type][$extension_slug];
                    $description = isset( $descriptions[ $extension_slug ] )
                        ? $descriptions[ $extension_slug ]
                        : ucwords( str_replace( '-', ' ', $extension_slug ) ) . ' extension.';

                    // Wrap the extension section in a div with the manually defined data attribute.
                    echo "<div class='mello-extension-section' $data_attribute>";
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
}

function mello_get_available_extensions() {
    $base_dir = plugin_dir_path(__FILE__) . '../';
    $extension_paths = [
        'extensions' => is_dir($base_dir . 'src/extensions/') ? $base_dir . 'src/extensions/' : $base_dir . 'build/extensions/',
        'blocks'     => is_dir($base_dir . 'src/blocks/') ? $base_dir . 'src/blocks/' : $base_dir . 'build/blocks/',
    ];

    $all_extensions = [];

    foreach ($extension_paths as $type => $dir) {
        if (!is_dir($dir)) continue;

        foreach (scandir($dir) as $item) {
            if ($item === '.' || $item === '..' || !is_dir($dir . $item)) continue;
            $all_extensions[$item] = [
                'label' => ucwords(str_replace('-', ' ', $item)),
                'type'  => $type,
            ];
        }
    }

    return $all_extensions;
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
?>