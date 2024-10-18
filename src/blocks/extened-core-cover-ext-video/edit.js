// Import necessary WordPress packages
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

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

// Export the addAttributes function for use in the block registration
export default addAttributes;
