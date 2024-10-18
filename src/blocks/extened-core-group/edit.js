import { InspectorControls } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
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
function GroupEditControls({ tagName, onSelectTagName }) {
  const htmlElementMessages = {
    header: __('The <header> element should represent introductory content, typically a group of introductory or navigational aids.'),
    main: __('The <main> element should be used for the primary content of your document only.'),
    section: __("The <section> element should represent a standalone portion of the document that can't be better represented by another element."),
    article: __('The <article> element should represent a self-contained, syndicatable portion of the document.'),
    aside: __("The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."),
    footer: __('The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'),
  };

  const newOptions = [
    { label: __('Default (<div>)'), value: 'div' },
    { label: __('Header (<header>)'), value: 'header' },
    { label: __('Main (<main>)'), value: 'main' },
    { label: __('Section (<section>)'), value: 'section' },
    { label: __('Article (<article>)'), value: 'article' },
    { label: __('Aside (<aside>)'), value: 'aside' },
    { label: __('Footer (<footer>)'), value: 'footer' },
    { label: __('Navigation (<nav>)'), value: 'nav' },
    { label: __('Figure (<figure>)'), value: 'figure' },
    { label: __('List (<ul>)'), value: 'ul' },
    { label: __('List Item (<li>)'), value: 'li' },
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

export default GroupEditControls;
