<?php
/**
 * Mega Menu Block Template
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 */

// Get attributes
$anchor = $attributes['anchor'] ?? '';
$mobile_breakpoint = $attributes['mobileBreakpoint'] ?? 768;

// Build CSS classes
$classes = ['mello-mega-menu'];
if (!empty($attributes['className'])) {
    $classes[] = $attributes['className'];
}

// Build wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', $classes),
    'id' => $anchor ? $anchor : null,
    'data-mobile-breakpoint' => $mobile_breakpoint,
    'role' => 'navigation',
    'aria-label' => esc_attr__( 'Main menu', 'mega-menu' ),
]);

?>
<nav <?php echo $wrapper_attributes; ?>>
    <button
        class="mello-mega-menu__toggle"
        aria-expanded="false"
        aria-controls="<?php echo esc_attr( $anchor ? $anchor . '-list' : 'mello-mega-menu-list' ); ?>"
        aria-label="<?php esc_attr_e( 'Toggle menu', 'mega-menu' ); ?>"
    >
        <span class="mello-mega-menu__toggle-text"><?php esc_html_e('Menu', 'mega-menu'); ?></span>
        <span class="mello-mega-menu__toggle-icon">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </span>
    </button>
    <ul
      id="<?php echo esc_attr( $anchor ? $anchor . '-list' : 'mello-mega-menu-list' ); ?>"
      class="mello-mega-menu__list"
      role="menubar"
      data-mobile-breakpoint="<?php echo esc_attr( $mobile_breakpoint ); ?>"
    >
      <?php echo $content; ?>
    </ul>
</nav>