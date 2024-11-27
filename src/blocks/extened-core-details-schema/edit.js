/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Add the FAQ schema attribute.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Modified block settings.
 */
function addFAQSchemaAttribute(settings) {
   if (settings.name !== 'core/details') {
      return settings;
   }

   const faqSchemaAttribute = {
      hasFAQSchema: {
         type: 'boolean',
         default: false,
      },
   };

   return {
      ...settings,
      attributes: {
         ...settings.attributes,
         ...faqSchemaAttribute,
      },
   };
}

addFilter(
   'blocks.registerBlockType',
   'enable-faq-schema/add-faq-attribute',
   addFAQSchemaAttribute
);

/**
 * Add the FAQ schema toggle to inspector controls.
 *
 * @param {Object} BlockEdit Original block edit component.
 * @return {Function} Modified block edit component.
 */
function addFAQSchemaInspectorControl(BlockEdit) {
   return (props) => {
      if (props.name !== 'core/details') {
         return <BlockEdit {...props} />;
      }

      const { attributes, setAttributes } = props;
      const { hasFAQSchema } = attributes;

      const onToggleChange = () => {
         setAttributes({
            hasFAQSchema: !hasFAQSchema,
         });
      };

      return (
         <>
            <BlockEdit {...props} />
            <InspectorControls>
               <PanelBody title={ __( 'FAQ Schema', 'enable-schema' ) } initialOpen={ false }>
                  <div >
                     <ToggleControl
                        label={__('Enable FAQ Schema', 'enable-faq-schema')}
                        checked={hasFAQSchema}
                        onChange={onToggleChange}
                     />
                     <p className="description">
								{ __( 'Adds FAQ schema for SEO purposes.', 'enable-schema' ) }
							</p>
                  </div>
               </PanelBody>
            </InspectorControls>
         </>
      );
   };
}

addFilter(
   'editor.BlockEdit',
   'enable-faq-schema/add-faq-inspector-control',
   addFAQSchemaInspectorControl
);

/**
 * Add custom classes in the Editor.
 *
 * @since 0.1.0
 * @param {Object} BlockListBlock
 */
function addClasses( BlockListBlock ) {
   return ( props ) => {
       const { name, attributes } = props;

       if ( 'core/details' !== name || ! attributes?.hasFAQSchema ) {
           return <BlockListBlock { ...props } />;
       }

       // Create a new class list with the custom class if the attribute is true.
       const classes = classnames( props.className, 'mello-has-faq-schema' );

       // Return the block with the new class applied.
       return <BlockListBlock { ...props } className={ classes } />;
   };
}

addFilter(
   'editor.BlockListBlock',
   'enable-faq-schema/add-classes',
   addClasses
);

/**
* Add the custom class to the front-end save function.
*
* @since 0.1.0
* @param {Object} props
* @param {Object} blockType
* @param {Object} attributes
*/
function addSaveProps( extraProps, blockType, attributes ) {
   if ( blockType.name === 'core/details' && attributes.hasFAQSchema ) {
       // Add the class on the front-end.
       extraProps.className = classnames( extraProps.className, 'mello-has-faq-schema' );
   }
   
   return extraProps;
}

addFilter(
   'blocks.getSaveContent.extraProps',
   'enable-faq-schema/add-save-props',
   addSaveProps
);
