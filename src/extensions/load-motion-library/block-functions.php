<?php
/**
 * Motion Library Extension - Block Functions
 *
 * Registers and handles the Motion.js library for centralized usage across the plugin.
 */

// Immediately register the Motion.js library (bypass init hook)
error_log('→ [Mello Motion] immediate registration');
wp_register_script(
    'mello-motion-core',
    plugin_dir_url(__FILE__) . 'motion.min.js',
    [],
    '1.0.0',
    true
);
if ( wp_script_is( 'mello-motion-core', 'registered' ) ) {
    error_log( 'Mello Motion successfully registered immediately at: ' . wp_scripts()->registered['mello-motion-core']->src );
} else {
    error_log( 'Mello Motion immediate registration failed' );
}
wp_register_script(
    'mello-motion-dependency',
    '',
    [ 'mello-motion-core' ],
    '1.0.0',
    true
);

// Enqueue the Motion.js library on all frontend pages
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script('mello-motion-core');

    wp_add_inline_script(
        'mello-motion-core',
        'window.MelloMotion = window.MelloMotion || {}; 
        window.MelloMotion.isLoaded = true;
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof window.Motion !== "undefined") {
                window.MelloMotion.library = window.Motion;
                document.dispatchEvent(new CustomEvent("mello-motion-ready"));
            }
        });',
        'after'
    );
});

// // Also enqueue in admin if needed (for previews, etc.)
// add_action('admin_enqueue_scripts', function($hook) {
//     // Only on post editing screens
//     if ('post.php' !== $hook && 'post-new.php' !== $hook) {
//         return;
//     }
    
//     // Get the post type
//     $post_type = get_post_type();
//     if (!$post_type) {
//         global $pagenow;
//         if ('post-new.php' === $pagenow && isset($_GET['post_type'])) {
//             $post_type = sanitize_text_field($_GET['post_type']);
//         }
//     }
    
//     // Only enqueue for post types that support blocks
//     if ($post_type && use_block_editor_for_post_type($post_type)) {
//         wp_enqueue_script('mello-motion-core');
        
//         // Same inline script as frontend
//         wp_add_inline_script('mello-motion-core', 
//             'window.MelloMotion = window.MelloMotion || {}; 
//             window.MelloMotion.isLoaded = true;
//             document.addEventListener("DOMContentLoaded", function() {
//                 if (typeof window.Motion !== "undefined") {
//                     window.MelloMotion.library = window.Motion;
//                     document.dispatchEvent(new CustomEvent("mello-motion-ready"));
//                 }
//             });',
//             'after'
//         );
//     }
// });

add_action('wp_head', function() {
    if (wp_script_is('mello-motion-core', 'enqueued')) {
        echo '<!-- Motion.js URL: ' . wp_scripts()->registered['mello-motion-core']->src . ' -->';
        echo '<script>console.log("Motion.js URL:", "' . wp_scripts()->registered['mello-motion-core']->src . '");</script>';
    } else {
        echo '<!-- Motion.js not enqueued -->';
        echo '<script>console.log("Motion.js not enqueued");</script>';
    }
});
