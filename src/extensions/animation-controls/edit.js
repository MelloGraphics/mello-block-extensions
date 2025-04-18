import { InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

// Define allowed blocks
const allowedBlocks = [
	"core/paragraph",
	"core/heading",
	"core/post-title",
	"core/query-title",
	"core/image",
	"core/group",
	"core/columns",
	"core/column",
	"core/cover",
	"core/button",
	"core/buttons",
	"core/list",
];

/**
 * Add the attribute for custom data attributes to specified blocks.
 *
 * @param {Object} settings Block settings.
 */
function addAttributes(settings) {
	if (!allowedBlocks.includes(settings.name)) {
		return settings;
	}

	// Add the attributes.
	const customAttributes = {
		animationType: { type: "string", default: "" },
		animationTriggerSelf: { type: "boolean", default: false },
		animationDuration: { type: "number", default: 600 },
		animationDelay: { type: "number", default: 0 },
		animateChildren: { type: "boolean", default: false },
		childAnimationType: { type: "string", default: "" },
		childAnimationDuration: { type: "number", default: 600 },
		childAnimationStagger: { type: "number", default: 100 },
		animateSelf: { type: "boolean", default: false }, // New attribute
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...customAttributes,
		},
	};

	return newSettings;
}

addFilter(
	"blocks.registerBlockType",
	"mello-block-extensions/add-attributes",
	addAttributes
);

/**
 * Add InspectorControls to specified blocks to set custom data attributes.
 *
 * @param {Object} BlockEdit Block edit component.
 */
function addInspectorControls(BlockEdit) {
	return (props) => {
		if (!allowedBlocks.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;
		const {
			animationType,
			animationTriggerSelf,
			animationDuration,
			animationDelay,
			animateChildren,
			childAnimationType,
			childAnimationDuration,
			childAnimationStagger,
			animateSelf, // New attribute
		} = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__("Animation Controls", "mello-block-extensions")}
						initialOpen={false}
					>
						<ToggleControl
							__next40pxDefaultSize
							label={__("Animate Self", "mello-block-extensions")} // New ToggleControl
							checked={!!animateSelf}
							onChange={(value) => {
								setAttributes({ animateSelf: value });
								if (!value) {
									setAttributes({
										animationType: "",
										animationTriggerSelf: false,
										animationDuration: 600,
										animationDelay: 0,
									});
								}
							}}
						/>
						{animateSelf && ( // Wrap current controls in conditional
							<>
								<SelectControl
									__next40pxDefaultSize
									label={__("Animation Type", "mello-block-extensions")}
									value={animationType}
									options={[
										{ label: "None", value: "" },
										{ label: "Fade In", value: "fade-in" },
										{ label: "Slide Up", value: "slide-up" },
									]}
									onChange={(value) => setAttributes({ animationType: value })}
								/>
								<ToggleControl
									__next40pxDefaultSize
									label={__("Trigger on self?", "mello-block-extensions")}
									checked={!!animationTriggerSelf}
									onChange={(value) =>
										setAttributes({ animationTriggerSelf: value })
									}
									help={"By default the animation is triggerd by the parent <section>"}
								/>
								<RangeControl
									__next40pxDefaultSize
									label={__("Animation Duration (ms)", "mello-block-extensions")}
									value={animationDuration}
									onChange={(value) => setAttributes({ animationDuration: value })}
									min={100}
									max={3000}
									step={50}
								/>
								<RangeControl
									__next40pxDefaultSize
									label={__("Animation Delay (ms)", "mello-block-extensions")}
									value={animationDelay}
									onChange={(value) => setAttributes({ animationDelay: value })}
									min={0}
									max={3000}
									step={50}
									help={"Adjust delays to chain a timeline style animation"}
								/>
							</>
						)}
						{[
							"core/group",
							"core/columns",
							"core/cover",
							"core/buttons",
							"core/list",
						].includes(props.name) && (
								<>
									<ToggleControl
										__next40pxDefaultSize
										label={__("Animate Children", "mello-block-extensions")}
										checked={!!animateChildren}
										onChange={(value) =>
											setAttributes({ animateChildren: value })
										}
									/>
									{animateChildren && (
										<>
											<SelectControl
												__next40pxDefaultSize
												label={__(
													"Child Animation Type",
													"mello-block-extensions"
												)}
												value={childAnimationType}
												options={[
													{ label: "Fade In", value: "fade-in" },
													{ label: "Slide Up", value: "slide-up" },
												]}
												onChange={(value) =>
													setAttributes({ childAnimationType: value })
												}
											/>
											<RangeControl
												__next40pxDefaultSize
												label={__(
													"Child Animation Duration (ms)",
													"mello-block-extensions"
												)}
												value={childAnimationDuration}
												onChange={(value) =>
													setAttributes({ childAnimationDuration: value })
												}
												min={100}
												max={3000}
												step={50}
											/>
											<RangeControl
												__next40pxDefaultSize
												label={__("Stagger Delay (ms)", "mello-block-extensions")}
												value={childAnimationStagger}
												onChange={(value) =>
													setAttributes({ childAnimationStagger: value })
												}
												min={0}
												max={1000}
												step={50}
											/>
										</>
									)}
								</>
							)}
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}

addFilter(
	"editor.BlockEdit",
	"mello-block-extensions/add-inspector-controls",
	addInspectorControls
);

/**
 * Add the custom data attributes to the front-end save function.
 *
 * @param {Object} extraProps Block properties.
 * @param {Object} blockType Block type.
 * @param {Object} attributes Block attributes.
 */
function addSaveProps(extraProps, blockType, attributes) {
	const { animateSelf, animationTriggerSelf, animationDuration, animationDelay, animateChildren, childAnimationType, childAnimationDuration, childAnimationStagger } = attributes;

	if (animateSelf) {
		extraProps["data-animate"] = true;
		extraProps["data-animation-type"] = attributes.animationType;
		extraProps["data-animate-trigger"] = animationTriggerSelf ? "self" : "parent";
		extraProps["data-animate-duration"] = animationDuration;
		extraProps["data-animate-delay"] = animationDelay;
	}

	if (animateChildren) {
		extraProps["data-animate-children"] = true;
		extraProps["data-child-animate"] = childAnimationType;
		extraProps["data-child-duration"] = childAnimationDuration;
		extraProps["data-child-stagger"] = childAnimationStagger;
	}

	return extraProps;
}

addFilter(
	"blocks.getSaveContent.extraProps",
	"mello-block-extensions/add-save-props",
	addSaveProps
);
