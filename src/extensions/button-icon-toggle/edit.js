import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck
} from "@wordpress/block-editor";
import {
    Button,
    PanelBody,
    SelectControl,
    TextControl,
    ToggleControl,
} from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment, useMemo } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

const ICON_TYPES = [
    { label: __("Font Awesome Icon", "mello-block-extensions"), value: "fa" },
    { label: __("Image", "mello-block-extensions"), value: "image" },
];

const addIconControls = (BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, isSelected, name, clientId } = props;

        if (name !== "core/button") return <BlockEdit {...props} />;

        const {
            iconEnabled = false,
            iconType = "none",
            iconGlyph = "",
            iconImageID,
            iconImageURL,
            iconPosition = "before",
        } = attributes;

        const editorPreviewStyle = useMemo(() => {
            if (!iconEnabled || iconType === 'none') return null;

            const pseudo = iconPosition === 'after' ? 'after' : 'before';
            const selector = `[data-block="${clientId}"] .wp-block-button__link`;
            let css = `${selector} { display: inline-flex; align-items: center; gap: 0.5em; }`;

            if (iconType === 'fa' && iconGlyph) {
                css += `${selector}::${pseudo} { content: "${iconGlyph}"; font-family: var(--wp--preset--font-family--icon); speak: none; flex-shrink: 0; }`;
            } else if (iconType === 'image' && iconImageURL) {
                css += `${selector}::${pseudo} { content: ''; display: inline-block; width: 1em; height: 1em; background-image: url(${iconImageURL}); background-size: contain; background-repeat: no-repeat; background-position: center; flex-shrink: 0; }`;
            }

            return css;
        }, [iconEnabled, iconType, iconGlyph, iconImageURL, iconPosition, clientId]);

        return (
            <Fragment>
                {editorPreviewStyle && <style>{editorPreviewStyle}</style>}
                <BlockEdit {...props} />
                {isSelected && (
                    <InspectorControls>
                        <PanelBody title={__("Icon", "mello-block-extensions")} initialOpen={false}>
                            <ToggleControl
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                                label={__("Enable Icon", "mello-block-extensions")}
                                checked={iconEnabled}
                                onChange={(value) => setAttributes({
                                iconEnabled: value,
                                iconType: value ? "fa" : "none",
                            })}
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

                                    <ToggleControl
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                        label={__("Icon After Text", "mello-block-extensions")}
                                        checked={iconPosition === "after"}
                                        onChange={(value) => setAttributes({ iconPosition: value ? "after" : "before" })}
                                    />

                                    {iconType === "fa" && (
                                        <TextControl
                                            className="mello-font-awesome-input"
                                            __next40pxDefaultSize
                                            __nextHasNoMarginBottom
                                            label={__("Font Awesome Glyph", "mello-block-extensions")}
                                            value={iconGlyph}
                                            onChange={(value) => setAttributes({ iconGlyph: value })}
                                            help={__("Enter the glyph (e.g. \\f238) or paste the icon glyph. FA Font must be active in the theme.", "mello-block-extensions")}
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
                        </PanelBody>
                    </InspectorControls>
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
        iconPosition: {
            type: "string",
            default: "before",
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