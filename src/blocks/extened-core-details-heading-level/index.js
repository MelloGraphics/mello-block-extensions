import { InspectorControls } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import './editor.scss';

/**
 * Add the heading level attribute.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Modified block settings.
 */
function addHeadingLevelAttribute(settings) {
   if (settings.name !== 'core/details') {
      return settings;
   }

   const headingLevelAttribute = {
      level: {
         type: 'string',
         default: 'Unset',
      },
   };

   return {
      ...settings,
      attributes: {
         ...settings.attributes,
         ...headingLevelAttribute,
      },
   };
}

addFilter(
   'blocks.registerBlockType',
   'heading-level/add-heading-level-attribute',
   addHeadingLevelAttribute
);

/**
 * Add the heading level select control to inspector controls.
 *
 * @param {Object} BlockEdit Original block edit component.
 * @return {Function} Modified block edit component.
 */
function addHeadingLevelInspectorControl(BlockEdit) {
   return (props) => {
      if (props.name !== 'core/details') {
         return <BlockEdit {...props} />;
      }

      const { attributes, setAttributes } = props;
      const { level } = attributes;

      const onLevelChange = (newLevel) => {
         setAttributes({ level: newLevel });
      };

      return (
         <>
				<BlockEdit {...props} />
				<InspectorControls>
					<div class="enable-faq-schema-container">
					<SelectControl
						label={__('Heading Level', 'heading-level')}
						value={level}
						options={[
							{ label: __('Unset', 'heading-level'), value: 'Unset' },
							{ label: __('H2', 'heading-level'), value: '2' },
							{ label: __('H3', 'heading-level'), value: '3' },
							{ label: __('H4', 'heading-level'), value: '4' },
							{ label: __('H5', 'heading-level'), value: '5' },
							{ label: __('H6', 'heading-level'), value: '6' },
						]}
						onChange={onLevelChange}
					/>
			   </div>
            </InspectorControls>
         </>
      );
   };
}

addFilter(
   'editor.BlockEdit',
   'heading-level/add-heading-level-inspector-control',
   addHeadingLevelInspectorControl
);
