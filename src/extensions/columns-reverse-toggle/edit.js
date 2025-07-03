/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { InspectorAdvancedControls } from "@wordpress/block-editor";
import { ToggleControl } from "@wordpress/components";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

/**
 * Add the attribute needed for reversing column direction on mobile.
 *
 * @since 0.1.0
 * @param {Object} settings
 */
function addAttributes(settings) {
  if ("core/columns" !== settings.name) {
    return settings;
  }

  // Add the attribute.
  const columnsAttributes = {
    isReversedDirectionOnMobile: {
      type: "boolean",
      default: false,
    },
  };

  const newSettings = {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...columnsAttributes,
    },
  };

  return newSettings;
}

addFilter(
  "blocks.registerBlockType",
  "enable-column-direction/add-attributes",
  addAttributes
);

/**
 * Filter the BlockEdit object and add icon inspector controls to button blocks.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function addInspectorControls(BlockEdit) {
  return (props) => {
    if (props.name !== "core/columns") {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes } = props;
    const { isReversedDirectionOnMobile } = attributes;

    return (
      <>
        <BlockEdit {...props} />
        <InspectorAdvancedControls>
          <ToggleControl
            className="mello-additional-setting"
            label={__("Reverse direction on mobile", "enable-column-direction")}
            checked={isReversedDirectionOnMobile}
            onChange={() => {
              setAttributes({
                isReversedDirectionOnMobile: !isReversedDirectionOnMobile,
              });
            }}
          />
        </InspectorAdvancedControls>
      </>
    );
  };
}

addFilter(
  "editor.BlockEdit",
  "enable-column-direction/add-inspector-controls",
  addInspectorControls
);

/**
 * Add custom classes in the Editor.
 *
 * @since 0.1.0
 * @param {Object} BlockListBlock
 */
function addClasses(BlockListBlock) {
  return (props) => {
    const { name, attributes } = props;

    if ("core/columns" !== name || !attributes?.isReversedDirectionOnMobile) {
      return <BlockListBlock {...props} />;
    }

    // Create a new class list with the custom class if the attribute is true.
    const classes = classnames(
      props.className,
      "mello-columns-reverse-on-phone"
    );

    // Return the block with the new class applied.
    return <BlockListBlock {...props} className={classes} />;
  };
}

addFilter(
  "editor.BlockListBlock",
  "enable-column-direction/add-classes",
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
function addSaveProps(extraProps, blockType, attributes) {
  if (
    blockType.name === "core/columns" &&
    attributes.isReversedDirectionOnMobile
  ) {
    // Add the class on the front-end.
    extraProps.className = classnames(
      extraProps.className,
      "mello-columns-reverse-on-phone"
    );
    console.log("Adding class for reversed direction on front-end.");
  }

  return extraProps;
}

addFilter(
  "blocks.getSaveContent.extraProps",
  "enable-column-direction/add-save-props",
  addSaveProps
);
