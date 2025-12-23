import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Placeholder, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes, context }) {
	const { aspectRatio, autoplay, loop, muted, controls, playsInline, useFeaturedImagePoster } = attributes;
	const { postId, postType } = context;
	
	// Get ACF field value (returns URL string)
	const { videoUrl, posterUrl } = useSelect(
		(select) => {
			const { getEditedEntityRecord } = select('core');
			const { getMedia } = select('core');
			const post = postId ? getEditedEntityRecord('postType', postType, postId) : null;
			
			// Get video URL from ACF
			const video = post?.meta?.featured_video || post?.acf?.featured_video || null;
			
			// Get featured image as poster
			let poster = null;
			if (useFeaturedImagePoster && post?.featured_media) {
				const media = getMedia(post.featured_media);
				poster = media?.source_url || null;
			}
			
			return {
				videoUrl: video,
				posterUrl: poster
			};
		},
		[postId, postType, useFeaturedImagePoster]
	);

	const blockProps = useBlockProps({
		className: 'wp-block-mello-block-featured-video'
	});

	// Show placeholder if no video and no poster
	const hasContent = videoUrl || posterUrl;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Video Settings', 'featured-video')}>
					<SelectControl
						label={__('Aspect Ratio', 'featured-video')}
						value={aspectRatio}
						options={[
							{ label: '16:9', value: '16/9' },
							{ label: '4:3', value: '4/3' },
							{ label: '1:1', value: '1/1' },
							{ label: '21:9', value: '21/9' },
							{ label: '9:16', value: '9/16' },
						]}
						onChange={(value) => setAttributes({ aspectRatio: value })}
					/>
					<ToggleControl
						label={__('Use Featured Image as Poster', 'featured-video')}
						checked={useFeaturedImagePoster}
						onChange={(value) => setAttributes({ useFeaturedImagePoster: value })}
						help={__('Show featured image while video loads, or as fallback if no video', 'featured-video')}
					/>
					<ToggleControl
						label={__('Autoplay', 'featured-video')}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
					/>
					<ToggleControl
						label={__('Loop', 'featured-video')}
						checked={loop}
						onChange={(value) => setAttributes({ loop: value })}
					/>
					<ToggleControl
						label={__('Muted', 'featured-video')}
						checked={muted}
						onChange={(value) => setAttributes({ muted: value })}
						help={__('Required for autoplay in most browsers', 'featured-video')}
					/>
					<ToggleControl
						label={__('Show Controls', 'featured-video')}
						checked={controls}
						onChange={(value) => setAttributes({ controls: value })}
					/>
					<ToggleControl
						label={__('Plays Inline', 'featured-video')}
						checked={playsInline}
						onChange={(value) => setAttributes({ playsInline: value })}
						help={__('Play inline on mobile devices', 'featured-video')}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{!hasContent && (
					<Placeholder
						icon="video-alt3"
						label={__('Featured Video', 'featured-video')}
						instructions={__('Set a featured video in the "Post Fields" panel, or enable "Use Featured Image as Poster" to show the featured image.', 'featured-video')}
					/>
				)}

				{hasContent && (
					<div className="featured-video-wrapper">
						{videoUrl ? (
							<video
								src={videoUrl}
								poster={useFeaturedImagePoster ? posterUrl : undefined}
								style={{ aspectRatio }}
								autoPlay={autoplay}
								loop={loop}
								muted={muted}
								controls={controls}
								playsInline={playsInline}
							/>
						) : (
							<img
								src={posterUrl}
								alt={__('Featured Image', 'featured-video')}
								style={{ aspectRatio, width: '100%', height: 'auto', objectFit: 'cover' }}
							/>
						)}
					</div>
				)}
			</div>
		</>
	);
}