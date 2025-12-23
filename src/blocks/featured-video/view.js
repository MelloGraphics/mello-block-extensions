// Frontend script for Post Featured Video block
// The video is already rendered by render.php, so this is just for optional enhancements

document.addEventListener('DOMContentLoaded', function() {
	const blocks = document.querySelectorAll('.wp-block-mello-block-featured-video');
	
	blocks.forEach(block => {
		const video = block.querySelector('video');
		if (!video) return;

		// Optional: Add a class when video is ready to play
		video.addEventListener('canplay', function() {
			block.classList.add('video-ready');
		});

		// Optional: Add error handling
		video.addEventListener('error', function() {
			console.error('Error loading featured video');
			block.classList.add('video-error');
		});
	});
});