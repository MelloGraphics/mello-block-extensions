import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import './editor.scss';


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
				<div class="enable-faq-schema-container">
				<ToggleControl
					label={__('Enable FAQ Schema', 'enable-faq-schema')}
					checked={hasFAQSchema}
					onChange={onToggleChange}
				/>
				</div>
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
