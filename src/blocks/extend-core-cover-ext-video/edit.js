// Import necessary WordPress packages
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import './styles.scss';

// Extend attributes to include Vimeo/YouTube URL
const addAttributes = (settings, name) => {
    if (name !== 'core/cover') {
        return settings;
    }

    settings.attributes = {
        ...settings.attributes,
        videoUrl: {
            type: 'string',
            default: ''
        }
    };

    return settings;
};

// Create higher-order component to add InspectorControls
const addInspectorControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/cover') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { videoUrl } = attributes;

        // Function to clear the video URL
        const clearVideoUrl = () => {
            setAttributes({ videoUrl: '' });
        };

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title={__('Background Video URL', 'your-text-domain')}>
                        <TextControl
                            label={__('Vimeo / YouTube URL', 'your-text-domain')}
                            value={videoUrl}
                            onChange={(url) => setAttributes({ videoUrl: url })}
                            placeholder={__('Enter Vimeo or YouTube URL', 'your-text-domain')}
                        />
                        {videoUrl && (
                            <Fragment>
                                <div className="video-preview">
                                    <p>{__('Preview:', 'your-text-domain')}</p>
                                    <iframe
                                        src={videoUrl.includes('youtube.com') 
                                            ? videoUrl.replace('watch?v=', 'embed/') + '?autoplay=0&controls=0'
                                            : `https://player.vimeo.com/video/${videoUrl.split('.com/')[1]}?autoplay=0`}
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        style={{ width: '100%', height: '140px' }}
                                    ></iframe>
                                </div>
                                <div className="components-panel__row">
                                    <button
                                        type="button"
                                        className="components-button block-library-cover__reset-button is-secondary is-small"
                                        onClick={clearVideoUrl}
                                    >
                                        {__('Clear Video', 'your-text-domain')}
                                    </button>
                                </div>
                            </Fragment>
                        )}
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withInspectorControl');

// Add filter to integrate InspectorControls into core/cover block
addFilter('editor.BlockEdit', 'mello/with-inspector-control', addInspectorControl);

// Add attributes to the core/cover block
addFilter('blocks.registerBlockType', 'mello/add-cover-video-attributes', addAttributes);

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

// Add filter to modify the save content of the core/cover block
addFilter('blocks.getSaveElement', 'mello/modify-cover-save-content', addSaveContent);

