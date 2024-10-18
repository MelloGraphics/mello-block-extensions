import { InspectorControls } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Render inspector controls for the Group block.
 *
 * @param {Object}   props                 Component props.
 * @param {string}   props.tagName         The HTML tag name.
 * @param {Function} props.onSelectTagName onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The control group.
 */
function GroupEditControls({
  tagName,
  onSelectTagName,
}) {
  const htmlElementMessages = {
    header: __('The <header> element should represent introductory content, typically a group of introductory or navigational aids.'),
    main: __('The <main> element should be used for the primary content of your document only.'),
    section: __("The <section> element should represent a standalone portion of the document that can't be better represented by another element."),
    article: __('The <article> element should represent a self-contained, syndicatable portion of the document.'),
    aside: __("The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."),
    footer: __('The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'),
  };

  // Create the new options
  const newOptions = [
    { label: __('Default (<div>)'), value: 'div' },
    { label: __('Header (<header>)'), value: 'header' },
    { label: __('Main (<main>)'), value: 'main' },
    { label: __('Section (<section>)'), value: 'section' },
    { label: __('Article (<article>)'), value: 'article' },
    { label: __('Aside (<aside>)'), value: 'aside' },
    { label: __('Footer (<footer>)'), value: 'footer' },
    { label: __('Navigation (<nav>)'), value: 'nav' }, // New option
    { label: __('Figure (<figure>)'), value: 'figure' }, // New option
    { label: __('List (<ul>)'), value: 'ul' }, // New option
    { label: __('List Item (<li>)'), value: 'li' }, // New option
  ];

  return (
    <InspectorControls group="advanced">
      <SelectControl
        label={__('HTML element')}
        options={newOptions}
        value={tagName}
        onChange={onSelectTagName}
        help={htmlElementMessages[tagName]}
      />
    </InspectorControls>
  );
}

/**
 * Higher-order component to extend the Group block with custom controls.
 */
const extendGroupBlockOptions = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    // Check if the current block is a Group block
    if (props.name !== 'core/group') {
      return <BlockEdit {...props} />;
    }

    // Extract the necessary props for the custom inspector controls
    const { attributes, setAttributes } = props;
    const { tagName } = attributes;

    // Define the handler for tag name selection
    const onSelectTagName = (newTag) => {
      setAttributes({ tagName: newTag });
    };

    // Render the new InspectorControls and the original BlockEdit component
    return (
      <>
        <GroupEditControls
          tagName={tagName}
          onSelectTagName={onSelectTagName}
        />
        <BlockEdit {...props} />
      </>
    );
  };
}, 'extendGroupBlockOptions');

// Apply the filter to the BlockEdit
addFilter(
  'editor.BlockEdit',
  'extend-group-block/modify-inspector-controls',
  extendGroupBlockOptions
);
