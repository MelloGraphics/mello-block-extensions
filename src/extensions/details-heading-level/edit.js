import { BlockControls, HeadingLevelDropdown } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

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
         default: '0',
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
				<BlockControls>
					<HeadingLevelDropdown
						label={__('Heading Level', 'heading-level')}
						value={level}
						onChange={(newLevel) => setAttributes({ level: newLevel })}
						allowedLevels={[0, 1, 2, 3, 4, 5, 6]}
						isToolbar
                  isClearable
					/>
				</BlockControls>
         </>
      );
   };
}

addFilter(
   'editor.BlockEdit',
   'heading-level/add-heading-level-inspector-control',
   addHeadingLevelInspectorControl
);
