<?php
/**
 * Render template for Post Featured Video Block
 * Variables available: $attributes, $content, $block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// 1) Get the post ID (supports Query Loop context)
$post_id = 0;

if ( isset( $block ) && isset( $block->context ) && isset( $block->context['postId'] ) ) {
	$post_id = (int) $block->context['postId'];
} else {
	$post_id = (int) get_the_ID();
}

if ( ! $post_id ) {
	return;
}

// 2) Normalise attributes (with defaults)
$aspect_ratio              = ! empty( $attributes['aspectRatio'] ) ? (string) $attributes['aspectRatio'] : '16/9';
$autoplay                  = ! empty( $attributes['autoplay'] );
$loop                      = ! empty( $attributes['loop'] );
$muted                     = ! empty( $attributes['muted'] );
$controls                  = ! empty( $attributes['controls'] );
$plays_inline              = ! empty( $attributes['playsInline'] );
$use_featured_image_poster = array_key_exists( 'useFeaturedImagePoster', $attributes ) ? (bool) $attributes['useFeaturedImagePoster'] : true;

// 3) Get video URL (ACF first if available, otherwise fallback to post meta)
$video_url = '';

if ( function_exists( 'get_field' ) ) {
	$acf_value = get_field( 'featured_video', $post_id );

	// ACF field could be configured to return URL, ID, or array
	if ( is_string( $acf_value ) ) {
		$video_url = $acf_value;
	} elseif ( is_numeric( $acf_value ) ) {
		$video_url = wp_get_attachment_url( (int) $acf_value ) ?: '';
	} elseif ( is_array( $acf_value ) ) {
		// Common keys for file fields
		if ( ! empty( $acf_value['url'] ) ) {
			$video_url = (string) $acf_value['url'];
		} elseif ( ! empty( $acf_value['ID'] ) ) {
			$video_url = wp_get_attachment_url( (int) $acf_value['ID'] ) ?: '';
		}
	}
}

if ( ! $video_url ) {
	$meta_value = get_post_meta( $post_id, 'featured_video', true );
	if ( is_string( $meta_value ) ) {
		$video_url = $meta_value;
	}
}

// 4) Resolve poster from featured image (if enabled)
$poster_url = '';

if ( $use_featured_image_poster ) {
	$thumb_id = get_post_thumbnail_id( $post_id );
	if ( $thumb_id ) {
		$poster_url = wp_get_attachment_image_url( $thumb_id, 'full' ) ?: '';
	}
}

// 5) If we have neither video nor poster, render nothing (optional behaviour)
if ( ! $video_url && ! $poster_url ) {
	return;
}

// 6) Wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-mello-block-featured-video',
		'style' => 'aspect-ratio:' . esc_attr( $aspect_ratio ) . ';',
	)
);
?>

<div <?php echo $wrapper_attributes; ?>>
		<?php if ( $video_url ) : ?>
			<video
				src="<?php echo esc_url( $video_url ); ?>"
				<?php if ( $poster_url ) : ?>
					poster="<?php echo esc_url( $poster_url ); ?>"
				<?php endif; ?>
				style="width:100%;height:100%;object-fit:cover;"
				<?php echo $autoplay ? 'autoplay' : ''; ?>
				<?php echo $loop ? 'loop' : ''; ?>
				<?php echo $muted ? 'muted' : ''; ?>
				<?php echo $controls ? 'controls' : ''; ?>
				<?php echo $plays_inline ? 'playsinline' : ''; ?>
			></video>
		<?php else : ?>
			<img
				src="<?php echo esc_url( $poster_url ); ?>"
				alt="<?php echo esc_attr( get_the_title( $post_id ) ); ?>"
				loading="lazy"
				style="width:100%;height:100%;object-fit:cover;"
			/>
		<?php endif; ?>
</div>