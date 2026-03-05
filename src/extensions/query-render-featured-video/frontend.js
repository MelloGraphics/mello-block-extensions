// Ultra-conservative video loading for mobile with abort protection
(function() {
    let videoObserver;
    let sourceObserver;
    const videoStates = new WeakMap(); // Track state per video
    const loadQueue = []; // Queue for sequential loading
    let isLoadingVideo = false; // Track if we're currently loading a video

    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                     || window.innerWidth <= 768;
    
    // Mobile-specific limits
    const MAX_LOADED_VIDEOS_MOBILE = 3;
    const MAX_PLAYING_VIDEOS_MOBILE = 2;
    const LOAD_DISTANCE_MOBILE = '100px';
    const LOAD_DISTANCE_DESKTOP = '300px';
    const MAX_CONCURRENT_LOADS = isMobile ? 1 : 3; // Load 1 at a time on mobile, 3 on desktop

    console.log('[VIDEO] Device detected as:', isMobile ? 'MOBILE' : 'DESKTOP');

    // Get or initialize state for a video
    function getVideoState(video) {
        if (!videoStates.has(video)) {
            videoStates.set(video, {
                loaded: false,
                loading: false,
                playing: false,
                playPromise: null,
                shouldPlay: false
            });
        }
        return videoStates.get(video);
    }

    // Safe play - handles abort errors
    function safePlay(video) {
        const state = getVideoState(video);
        
        // Mark that we want to play
        state.shouldPlay = true;
        
        // If already playing or a play is in progress, don't start another
        if (state.playing || state.playPromise) {
            return;
        }
        
        // If not loaded yet, don't try to play
        if (!state.loaded) {
            console.log('[VIDEO] Waiting for video to load before playing');
            return;
        }
        
        // Check if ready
        if (video.readyState < 3) {
            // Not ready yet, wait for canplay
            video.addEventListener('canplay', function handleCanPlay() {
                video.removeEventListener('canplay', handleCanPlay);
                // Only play if we still want to (user hasn't scrolled away)
                if (state.shouldPlay) {
                    safePlay(video);
                }
            }, { once: true });
            return;
        }
        
        // Start play (video-loaded class already added in loadVideo)
        state.playPromise = video.play()
            .then(() => {
                state.playing = true;
                state.playPromise = null;
                console.log('[VIDEO] Playing:', video.dataset.src);
            })
            .catch(err => {
                state.playPromise = null;
                // Only log if it's not an abort (abort is expected when scrolling fast)
                if (err.name !== 'AbortError') {
                    console.warn('[VIDEO] Play failed:', err.name, err.message);
                }
            });
    }

    // Safe pause - handles abort errors
    function safePause(video) {
        const state = getVideoState(video);
        
        // Mark that we don't want to play
        state.shouldPlay = false;
        
        // If a play promise is pending, wait for it to complete before pausing
        if (state.playPromise) {
            state.playPromise
                .then(() => {
                    if (!state.shouldPlay) { // Still don't want to play?
                        video.pause();
                        state.playing = false;
                    }
                })
                .catch(() => {
                    // Play was aborted, nothing to pause
                    state.playing = false;
                });
            state.playPromise = null;
        } else if (!video.paused) {
            video.pause();
            state.playing = false;
        }
    }

    // Unload video safely
    function unloadVideo(video) {
        const state = getVideoState(video);
        
        console.log('[VIDEO] Unloading:', video.dataset.src);
        
        safePause(video);
        
        if (video.src) {
            // Remove fade class when unloading
            video.classList.remove('video-loaded');
            video.removeAttribute('src');
            video.load(); // Clear buffer
            state.loaded = false;
            state.loading = false;
        }
    }

    // Load video source
    function loadVideo(video) {
        const state = getVideoState(video);
        
        if (state.loaded || video.src) {
            return Promise.resolve(); // Already loaded
        }
        
        if (!video.dataset.src) {
            return Promise.resolve(); // No source to load
        }
        
        // Add to queue and process
        return new Promise((resolve) => {
            loadQueue.push({ video, resolve });
            processLoadQueue();
        });
    }
    
    // Process the load queue sequentially
    function processLoadQueue() {
        // Count currently loading videos
        const currentlyLoading = Array.from(document.querySelectorAll('video.mello-featured-video[data-autoplay-on-scroll]'))
            .filter(v => {
                const state = getVideoState(v);
                return state.loading;
            }).length;
        
        // If we're at capacity, wait
        if (currentlyLoading >= MAX_CONCURRENT_LOADS) {
            return;
        }
        
        // If queue is empty, nothing to do
        if (loadQueue.length === 0) {
            return;
        }
        
        // Get next video from queue
        const { video, resolve } = loadQueue.shift();
        const state = getVideoState(video);
        
        // Check if still needed (might have scrolled away)
        if (!state.shouldPlay && isMobile) {
            resolve();
            processLoadQueue(); // Process next in queue
            return;
        }
        
        console.log('[VIDEO] Loading source:', video.dataset.src);
        state.loading = true;
        
        try {
            video.src = video.dataset.src;
            
            // Wait for video to be loaded enough to play
            const handleCanPlay = () => {
                state.loaded = true;
                state.loading = false;
                video.classList.add('video-loaded'); // Fade in now that it's ready
                console.log('[VIDEO] Video ready:', video.dataset.src);
                resolve();
                
                // Process next video in queue
                processLoadQueue();
            };
            
            const handleError = () => {
                state.loading = false;
                console.error('[VIDEO] Error loading video:', video.dataset.src);
                resolve();
                
                // Process next video in queue
                processLoadQueue();
            };
            
            // Listen for when video is ready
            video.addEventListener('canplaythrough', handleCanPlay, { once: true });
            video.addEventListener('error', handleError, { once: true });
            
            // Start loading
            video.load();
            
        } catch (error) {
            console.error('[VIDEO] Error loading video:', error);
            state.loading = false;
            resolve();
            processLoadQueue();
        }
    }

    // Get all playing videos
    function getPlayingVideos() {
        const allVideos = Array.from(document.querySelectorAll('video.mello-featured-video[data-autoplay-on-scroll]'));
        return allVideos.filter(v => {
            const state = getVideoState(v);
            return state.playing || state.playPromise;
        });
    }

    // Get all loaded videos
    function getLoadedVideos() {
        const allVideos = Array.from(document.querySelectorAll('video.mello-featured-video[data-autoplay-on-scroll]'));
        return allVideos.filter(v => v.src);
    }

    // Enforce mobile limits
    function enforceVideoLimits() {
        if (!isMobile) return;

        const loadedVideos = getLoadedVideos();
        
        // If too many loaded, unload furthest from viewport
        if (loadedVideos.length > MAX_LOADED_VIDEOS_MOBILE) {
            const videosWithDistance = loadedVideos.map(video => {
                const rect = video.getBoundingClientRect();
                const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
                return { video, distance };
            });
            
            videosWithDistance.sort((a, b) => b.distance - a.distance);
            
            const toUnload = videosWithDistance.slice(MAX_LOADED_VIDEOS_MOBILE);
            toUnload.forEach(({ video }) => {
                const state = getVideoState(video);
                if (!state.playing && !state.playPromise) {
                    unloadVideo(video);
                }
            });
        }
        
        // Enforce playing limit
        const playing = getPlayingVideos();
        if (playing.length > MAX_PLAYING_VIDEOS_MOBILE) {
            playing.slice(MAX_PLAYING_VIDEOS_MOBILE).forEach(video => {
                safePause(video);
            });
        }
    }

    // Observer for loading video sources
    function initializeSourceObserver() {
        const sourceObserverOptions = {
            root: null,
            rootMargin: isMobile ? LOAD_DISTANCE_MOBILE : LOAD_DISTANCE_DESKTOP,
            threshold: 0
        };

        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    
                    if (isMobile) {
                        enforceVideoLimits();
                    }
                    
                    loadVideo(video);
                }
            });
        }, sourceObserverOptions);
    }

    // Observer for playing videos
    function initializeVideoObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                
                if (entry.isIntersecting) {
                    // Ensure loaded
                    loadVideo(video).then(() => {
                        // Check mobile limits
                        if (isMobile) {
                            const playing = getPlayingVideos();
                            if (playing.length >= MAX_PLAYING_VIDEOS_MOBILE) {
                                console.log('[VIDEO] Max playing limit reached');
                                return;
                            }
                        }
                        
                        // Play once loaded
                        safePlay(video);
                    });
                } else {
                    // Pause when out of view
                    safePause(video);
                    
                    // On mobile, unload after pausing
                    if (isMobile) {
                        setTimeout(() => {
                            const state = getVideoState(video);
                            if (!state.shouldPlay) {
                                unloadVideo(video);
                            }
                        }, 500); // Small delay to avoid unloading if scrolling back quickly
                    }
                }
            });
        }, observerOptions);
    }

    function observeVideos() {
        const videos = document.querySelectorAll('video.mello-featured-video[data-autoplay-on-scroll]');
        
        console.log('[VIDEO] Observing', videos.length, 'videos');
        
        if (!videos.length) return;

        if (!sourceObserver) {
            sourceObserver = initializeSourceObserver();
        }
        if (!videoObserver) {
            videoObserver = initializeVideoObserver();
        }

        videos.forEach(video => {
            sourceObserver.observe(video);
            videoObserver.observe(video);
        });
    }

    // Regular cleanup on mobile
    if (isMobile) {
        setInterval(enforceVideoLimits, 1000);
    }

    // Initial load
    document.addEventListener('DOMContentLoaded', observeVideos);

    // Re-observe after Search & Filter Pro updates
    document.addEventListener('sf:ajaxfinish', function(e) {
        console.log('[VIDEO] Search filter finished, re-observing');
        setTimeout(observeVideos, 100);
    });

    jQuery(document).on('sf:ajaxfinish', function() {
        setTimeout(observeVideos, 100);
    });

    // MutationObserver
    const targetNode = document.querySelector('body');
    if (targetNode) {
        const mutationObserver = new MutationObserver(function(mutations) {
            let shouldReobserve = false;
            
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        if (node.querySelector && node.querySelector('video.mello-featured-video[data-autoplay-on-scroll]')) {
                            shouldReobserve = true;
                        }
                    }
                });
            });
            
            if (shouldReobserve) {
                console.log('[VIDEO] New videos detected in DOM');
                observeVideos();
            }
        });

        mutationObserver.observe(targetNode, {
            childList: true,
            subtree: true
        });
    }
})();