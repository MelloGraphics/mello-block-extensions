<?php

// Clean up plugin options (single and multisite)
if ( is_multisite() ) {
	$sites = get_sites();
	foreach ( $sites as $site ) {
		switch_to_blog( $site->blog_id );
		delete_option( 'mello_block_extensions_settings' );
		restore_current_blog();
	}
} else {
	delete_option( 'mello_block_extensions_settings' );
}

// Clean up any custom post meta added by the plugin
global $wpdb;
$wpdb->query( "DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE '_mello_%'" );
