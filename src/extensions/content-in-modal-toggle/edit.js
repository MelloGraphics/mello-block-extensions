import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

// Higher order component to add the toggle control and input field to selected blocks
const addModalToggleControl = (BlockEdit) => {
  return (props) => {
    const { attributes, setAttributes, isSelected, name } = props;

    // Only target specific blocks: post-title, post featured image, read more, button
    if (
      ![
        "core/post-title",
        "core/post-featured-image",
        "core/read-more",
        "core/button",
      ].includes(name)
    ) {
      return <BlockEdit {...props} />;
    }

    const { openInModal = false, modalContentSelector = ".entry-content" } =
      attributes;

    return (
      <Fragment>
        <BlockEdit {...props} />
        {isSelected && (
          <InspectorControls>
            <PanelBody
              title={__("Modal Settings", "mello-block-extensions")}
              initialOpen={false}
            >
              <ToggleControl
                __next40pxDefaultSize
                label={__("Open in Modal", "mello-block-extensions")}
                checked={openInModal}
                onChange={(value) => setAttributes({ openInModal: value })}
              />
              {openInModal && (
                <TextControl
                  __next40pxDefaultSize
                  label={__("Modal Content Selector", "mello-block-extensions")}
                  help={__(
                    "Enter a CSS class selector to identify the content to pull in. Defaults to .entry-content.",
                    "mello-block-extensions"
                  )}
                  value={modalContentSelector}
                  onChange={(value) =>
                    setAttributes({ modalContentSelector: value })
                  }
                />
              )}
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  };
};

// Register the filter to apply the higher order component
addFilter(
  "editor.BlockEdit",
  "mello-block-extensions/modal-toggle",
  createHigherOrderComponent(addModalToggleControl, "withModalToggleControl")
);

// Add custom attributes to the selected blocks
const addModalAttributes = (settings, name) => {
  if (
    ![
      "core/post-title",
      "core/post-featured-image",
      "core/read-more",
      "core/button",
    ].includes(name)
  ) {
    return settings;
  }

  settings.attributes = {
    ...settings.attributes,
    openInModal: {
      type: "boolean",
      default: false,
    },
    modalContentSelector: {
      type: "string",
      default: ".entry-content",
    },
  };
  return settings;
};

// Register the filter to add attributes
addFilter(
  "blocks.registerBlockType",
  "mello-block-extensions/modal-attributes",
  addModalAttributes
);
