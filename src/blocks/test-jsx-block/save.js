// Import the translation function from WordPress i18n package
import { __ } from '@wordpress/i18n';

// Import the useBlockProps hook from WordPress block editor package
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props - The properties passed to the save function.
 * @param {Object} props.attributes - The attributes of the block.
 * @param {string} props.className - The class name to be applied to the block.
 * 
 * @return {WPElement} Element to render.
 */
export default function Save({attributes, className}) {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps} className='mello-message-block'>
            <div className={className}>{__(attributes.message, 'text-domain')}</div>
        </div>
    );
}