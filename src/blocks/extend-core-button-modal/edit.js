import { InspectorControls } from "@wordpress/block-editor";
import { ToggleControl } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

// Add toggle control to Button Block settings
const addModalToggleControl = (BlockEdit) => {
  return (props) => {
    const { attributes, setAttributes, isSelected, name } = props;

    // Ensure we're working with the button block
    if (name !== "core/button") return <BlockEdit {...props} />;

    const { openInModal = false } = attributes;

    return (
      <Fragment>
        <BlockEdit {...props} />
        {isSelected && (
          <InspectorControls>
            <ToggleControl
              className="mello-additional-setting"
              label={__("Open Content in Modal", "mello-block-extensions")}
              checked={openInModal}
              onChange={(value) => setAttributes({ openInModal: value })}
            />
          </InspectorControls>
        )}
      </Fragment>
    );
  };
};

// Register the filter for block editor settings
addFilter(
  "editor.BlockEdit",
  "mello-block-extensions/button-modal-toggle",
  createHigherOrderComponent(addModalToggleControl, "withModalToggleControl")
);

// Add attributes to the button block
const addModalAttributes = (settings, name) => {
  if (name !== "core/button") return settings;

  settings.attributes = {
    ...settings.attributes,
    openInModal: {
      type: "boolean",
      default: false,
    },
  };
  return settings;
};

// Register the filter to add attributes
addFilter(
  "blocks.registerBlockType",
  "mello-block-extensions/button-modal-attributes",
  addModalAttributes
);
