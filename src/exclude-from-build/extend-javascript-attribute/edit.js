import { InspectorAdvancedControls } from "@wordpress/block-editor";
import {
    BaseControl,
    Button,
    Modal,
    TextareaControl
} from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { dispatch } from "@wordpress/data";
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
    const [isSaving, setIsSaving] = useState(false); // Track saving state

    // Save without closing and trigger save
    const handleSave = () => {
      setIsSaving(true);
      setAttributes({ customJS: tempJS });
      dispatch("core/editor")
        .savePost()
        .then(() => setIsSaving(false));
    };

    // Save and close modal
    const handleSaveAndClose = () => {
      handleSave();
      setModalOpen(false);
    };

    return (
      <>
        <BlockEdit {...props} />
        <InspectorAdvancedControls>
          <BaseControl
            label="Inline Javascript"
            help="Add inline JS and render in inline with the block."
          >
            <Button
              variant="secondary"
              __next40pxDefaultSize
              onClick={() => setModalOpen(true)}
            >
              {__("Edit Custom JavaScript", "mello-block-extensions")}
            </Button>
          </BaseControl>
        </InspectorAdvancedControls>

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
              rows={25} // Provides a larger editing space
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Button variant="primary" onClick={handleSave} isBusy={isSaving}>
                {isSaving
                  ? __("Saving…", "mello-block-extensions")
                  : __("Save", "mello-block-extensions")}
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveAndClose}
                isBusy={isSaving}
              >
                {isSaving
                  ? __("Saving…", "mello-block-extensions")
                  : __("Save & Close", "mello-block-extensions")}
              </Button>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
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
