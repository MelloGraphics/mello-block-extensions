// Intelligent video autoplay based on viewport visibility
document.addEventListener('DOMContentLoaded', function () {
    // Target ONLY videos with the mello-featured-video class
    const videos = document.querySelectorAll('video.mello-featured-video[data-autoplay-on-scroll]');

    if (!videos.length) return;

    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth <= 768;

    // Intersection Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Video must be 50% visible
    };

    // Track currently playing videos (only used on mobile)
    let currentlyPlaying = new Set();
    const MAX_CONCURRENT_VIDEOS = 2; // Limit for mobile performance only

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                if (isMobile) {
                    // Mobile: Limit concurrent videos
                    if (currentlyPlaying.size < MAX_CONCURRENT_VIDEOS) {
                        video.play().then(() => {
                            currentlyPlaying.add(video);
                        }).catch(err => {
                            console.log('Video play prevented:', err);
                        });
                    }
                } else {
                    // Desktop: Play all visible videos
                    video.play().catch(err => {
                        console.log('Video play prevented:', err);
                    });
                }
            } else {
                // Pause when out of view (both mobile and desktop)
                video.pause();
                if (isMobile) {
                    currentlyPlaying.delete(video);
                }
            }
        });
    }, observerOptions);

    // Observe all videos
    videos.forEach(video => {
        observer.observe(video);
    });
});