import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

// Define the allowed elements with their attributes
const ALLOWED_GROUP_HTML_ELEMENTS = [
    'div',
    'header',
    'main',
    'section',
    'article',
    'aside',
    'footer',
    'nav',
    'figure',
    'details',
    'time',
    'ul',
    'li',
    'cite'
];

// Add custom elements to the allowed tagNames
const addCustomElements = (settings, name) => {
    if (name !== 'core/group') {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            tagName: {
                type: 'string',
                enum: ALLOWED_GROUP_HTML_ELEMENTS,
                default: 'div'
            }
        }
    };
};

// Sanitize the tagName attribute
const sanitizeGroupTagName = (tagName) => {
    return ALLOWED_GROUP_HTML_ELEMENTS.includes(tagName) ? tagName : 'div';
};

// Help text messages for HTML elements
const htmlElementMessages = {
    div: __('Default block wrapper.'),
    header: __('The <header> element should represent introductory content, typically a group of introductory or navigational aids.'),
    main: __('The <main> element should be used for the primary content of your document only.'),
    section: __("The <section> element should represent a standalone portion of the document that can't be better represented by another element."),
    article: __('The <article> element should represent a self-contained, syndicatable portion of the document.'),
    aside: __("The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."),
    footer: __('The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'),
    nav: __('The <nav> element represents a section of a page whose purpose is to provide navigation links.'),
    figure: __('The <figure> element represents self-contained content, potentially with an optional caption.'),
    details: __('The <details> element creates an interactive widget that can be opened or closed.'),
    time: __('The <time> element represents a specific period in time or date.'),
    ul: __('The <ul> element represents an unordered list of items, typically rendered as a bulleted list.'),
    li: __('The <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), unordered list (<ul>), or menu (<menu>).'),
    cite: __('The <cite> element is used to add a citation. This should be contained in a parent element block quote (<blockquote>).')
};

// Create higher-order component to add custom options to SelectControl
const withCustomElementOptions = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        // Only apply to group blocks
        if (props.name !== 'core/group') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { tagName = 'div' } = attributes;

        const elementOptions = ALLOWED_GROUP_HTML_ELEMENTS.map(element => ({
            label: element === 'div' ? __('Default (<div>)') : `<${element}>`,
            value: element
        }));

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title={__('HTML Tag')}
                        initialOpen={false}
                    >
                        <SelectControl
                            __next40pxDefaultSize
                            label={__('Select HTML element')}
                            value={sanitizeGroupTagName(tagName)}
                            options={elementOptions}
                            onChange={(value) => setAttributes({ tagName: sanitizeGroupTagName(value) })}
                            help={htmlElementMessages[tagName]}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withCustomElementOptions');

// Add filter for sanitizing the tagName attribute
addFilter(
    'blocks.getBlockAttributes',
    'mello/sanitize-group-tag-name',
    (attributes, blockType) => {
        if (blockType.name === 'core/group' && attributes?.tagName) {
            return {
                ...attributes,
                tagName: sanitizeGroupTagName(attributes.tagName)
            };
        }
        return attributes;
    }
);

// Add our filters
addFilter('blocks.registerBlockType', 'mello/group-custom-elements', addCustomElements);
addFilter('editor.BlockEdit', 'mello/with-custom-element-options', withCustomElementOptions);

export default addCustomElements;