import {
    InspectorAdvancedControls,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";
import {
    Button,
    SelectControl,
    TextControl,
    ToggleControl,
} from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

const ICON_TYPES = [
    { label: __("None", "mello-block-extensions"), value: "none" },
    { label: __("Font Awesome Icon", "mello-block-extensions"), value: "fa" },
    { label: __("Image", "mello-block-extensions"), value: "image" },
];

const addIconControls = (BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, isSelected, name } = props;

        if (name !== "core/button") return <BlockEdit {...props} />;

        const {
            iconEnabled = false,
            iconType = "none",
            iconGlyph = "",
            iconImageID,
            iconImageURL,
        } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                {isSelected && (
                    <InspectorAdvancedControls>
                        <ToggleControl
                            __next40pxDefaultSize
                            label={__("Enable Icon", "mello-block-extensions")}
                            checked={iconEnabled}
                            onChange={(value) => setAttributes({ iconEnabled: value })}
                        />
                        {iconEnabled && (
                            <>
                                <SelectControl
                                    __next40pxDefaultSize
                                    label={__("Icon Type", "mello-block-extensions")}
                                    value={iconType}
                                    options={ICON_TYPES}
                                    onChange={(value) => setAttributes({ iconType: value })}
                                />

                                {iconType === "fa" && (
                                    <TextControl
                                        className="mello-font-awesome-input"
                                        __next40pxDefaultSize
                                        label={__("Font Awesome Glyph", "mello-block-extensions")}
                                        value={iconGlyph}
                                        onChange={(value) => setAttributes({ iconGlyph: value })}
                                        help={__("Enter the glyph (e.g. \\f238) or paste the icon glyph", "mello-block-extensions")}
                                    />
                                )}

                                {iconType === "image" && (
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) =>
                                                setAttributes({
                                                    iconImageID: media.id,
                                                    iconImageURL: media.url,
                                                })
                                            }
                                            allowedTypes={["image"]}
                                            value={iconImageID}
                                            render={({ open }) => (
                                                <Button onClick={open} isSecondary>
                                                    {iconImageURL
                                                        ? __("Replace image", "mello-block-extensions")
                                                        : __("Select image", "mello-block-extensions")}
                                                </Button>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                )}
                            </>
                        )}
                    </InspectorAdvancedControls>
                )}
            </Fragment>
        );
    };
};

addFilter(
    "editor.BlockEdit",
    "mello-block-extensions/button-icon-controls",
    createHigherOrderComponent(addIconControls, "withIconControls")
);

const addIconAttributes = (settings, name) => {
    if (name !== "core/button") return settings;

    settings.attributes = {
        ...settings.attributes,
        iconEnabled: {
            type: "boolean",
            default: false,
        },
        iconType: {
            type: "string",
            default: "none",
        },
        iconGlyph: {
            type: "string",
            default: "",
        },
        iconImageID: {
            type: "number",
            default: null,
        },
        iconImageURL: {
            type: "string",
            default: "",
        },
    };
    return settings;
};

addFilter(
    "blocks.registerBlockType",
    "mello-block-extensions/button-icon-attributes",
    addIconAttributes
);

// Add custom class to button wrapper when icon is enabled
const addIconClass = (extraProps, blockType, attributes) => {
    if (blockType.name !== "core/button") return extraProps;

    const { iconEnabled } = attributes;

    if (iconEnabled) {
        extraProps.className = extraProps.className 
            ? `${extraProps.className} has-custom-icon`
            : "has-custom-icon";
    }

    return extraProps;
};

addFilter(
    "blocks.getSaveContent.extraProps",
    "mello-block-extensions/button-icon-class",
    addIconClass
);