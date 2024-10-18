import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import GroupEditControls from './edit';

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
