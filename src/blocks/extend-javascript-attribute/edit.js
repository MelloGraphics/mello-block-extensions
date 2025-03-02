import { InspectorControls } from "@wordpress/block-editor";
import { Button, Modal, TextareaControl } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { useState } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

// List of blocks to extend
const allowedBlocks = ["core/group", "core/columns", "core/cover"];

// Add custom attribute to selected blocks
const addCustomJSAttribute = (settings, name) => {
  if (!allowedBlocks.includes(name)) {
    return settings;
  }

  settings.attributes = {
    ...settings.attributes,
    customJS: {
      type: "string",
      default: "",
    },
  };

  return settings;
};
addFilter(
  "blocks.registerBlockType",
  "mello-block-extensions/custom-js-attribute",
  addCustomJSAttribute
);

// Create a fullscreen modal editor for JavaScript with Save & Close buttons
const withCustomJSControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!allowedBlocks.includes(props.name)) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes } = props;
    const [isModalOpen, setModalOpen] = useState(false);
    const [tempJS, setTempJS] = useState(attributes.customJS || ""); // Store temporary JS input

    // Save without closing
    const handleSave = () => {
      setAttributes({ customJS: tempJS });
    };

    // Save and close modal
    const handleSaveAndClose = () => {
      handleSave();
      setModalOpen(false);
    };

    return (
      <>
        <BlockEdit {...props} />
        <InspectorControls group="advanced">
          <Button isSecondary onClick={() => setModalOpen(true)}>
            {__("Edit Custom JavaScript", "mello-block-extensions")}
          </Button>
        </InspectorControls>

        {isModalOpen && (
          <Modal
            title={__("Edit Custom JavaScript", "mello-block-extensions")}
            onRequestClose={() => setModalOpen(false)}
            isFullScreen
          >
            <TextareaControl
              label={__("JavaScript Code", "mello-block-extensions")}
              value={tempJS}
              onChange={(value) => setTempJS(value)}
              rows={15} // Provides a larger editing space
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Button isPrimary onClick={handleSave}>
                {__("Save", "mello-block-extensions")}
              </Button>
              <Button isPrimary onClick={handleSaveAndClose}>
                {__("Save & Close", "mello-block-extensions")}
              </Button>
              <Button isSecondary onClick={() => setModalOpen(false)}>
                {__("Close", "mello-block-extensions")}
              </Button>
            </div>
          </Modal>
        )}
      </>
    );
  };
}, "withCustomJSControl");

addFilter(
  "editor.BlockEdit",
  "mello-block-extensions/custom-js-control",
  withCustomJSControl
);
