const addSaveContent = (element, blockType, attributes) => {
    if (blockType.name !== 'core/cover') {
        return element;
    }

    const { videoUrl } = attributes;

    if (videoUrl) {
        let embedUrl;

        // Check if it's a YouTube or Vimeo URL and add autoplay/muted/loop/background params
        if (videoUrl.includes('youtube.com')) {
            embedUrl = videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&playlist=' + videoUrl.split('v=')[1] + '&controls=0';
        } else if (videoUrl.includes('vimeo.com')) {
            const vimeoId = videoUrl.split('.com/')[1];
            embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1`;
        } else {
            embedUrl = videoUrl; // Fallback for other video URLs if needed
        }

        // Ensure children are always an array
        const childrenArray = Array.isArray(element.props.children)
            ? element.props.children
            : [element.props.children];

        // Create a new array of children, including the existing children
        const newChildren = [
            ...childrenArray, // Preserve all existing children
            <div className="wp-block-cover__video-background__external">
                <iframe
                    src={embedUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '100%' }}
                ></iframe>
            </div>
        ];

        // Return the element with the iframe injected in the correct place
        return React.cloneElement(element, element.props, newChildren);
    }

    return element;
};

export default addSaveContent;
