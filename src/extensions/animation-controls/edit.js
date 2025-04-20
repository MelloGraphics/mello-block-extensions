import { InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

/**
 * Add the attribute for custom data attributes to specified blocks.
 *
 * @param {Object} settings Block settings.
 */
function addAttributes(settings) {
	

	// Add the attributes.
		const customAttributes = {
			animationType: { type: "string", default: "fade-in" },
			animationTriggerSelf: { type: "boolean", default: false },
			animationDuration: { type: "number", default: 500 },
			animationDelay: { type: "number", default: 0 },
			animateSelf: { type: "boolean", default: false }, // New attribute
			animationTriggerPoint: { type: "number", default: -25 },
			animateChildren: { type: "boolean", default: false },
			childAnimationType: { type: "string", default: "fade-in" },
			childAnimationDuration: { type: "number", default: 500 },
			childAnimationStaggerDelay: { type: "number", default: 100 },
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

		const { attributes, setAttributes } = props;
		const {
			animationType,
			animationTriggerSelf,
			animationDuration,
			animationDelay,
			animationTriggerPoint,
			animateChildren,
			childAnimationType,
			childAnimationDuration,
			childAnimationStaggerDelay,
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
							label={__("Animate block", "mello-block-extensions")} // New ToggleControl
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
										{ label: "Fade In", value: "fade-in" },
										{ label: "Slide Up", value: "slide-up" },
										{ label: "Slide Down", value: "slide-down" },
										{ label: "Slide Left", value: "slide-left" },
										{ label: "Slide Right", value: "slide-right" },
										{ label: "Clip From Top", value: "clip-from-top" },
										{ label: "Clip From Bottom", value: "clip-from-bottom" },
										{ label: "Clip From Left", value: "clip-from-left" },
										{ label: "Clip From Right", value: "clip-from-right" },
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
									help={
										"By default the animation is triggerd by the parent <section>"
									}
								/>
								<RangeControl
									__next40pxDefaultSize
									label={__(
										"Animation Duration (ms)",
										"mello-block-extensions"
									)}
									value={animationDuration}
									onChange={(value) =>
										setAttributes({ animationDuration: value })
									}
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
								<RangeControl
									__next40pxDefaultSize
									label={__("Trigger Point (%)", "mello-block-extensions")}
									value={animationTriggerPoint}
									onChange={(value) => setAttributes({ animationTriggerPoint: value })}
									min={-100}
									max={0}
									step={1}
									marks={[
										{ value: -50, label: __("Center", "mello-block-extensions") },
									]}
									help={"Zero is the bottom, -100 is the top"}
									className="mello-hide-range-input"
								/>
							</>
						)}
						{[
							"core/group",
							"core/columns",
							"core/column",
							"core/cover",
							"core/buttons",
							"core/list",
							"core/post-template",
							"core/query",
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
													{ label: "Slide Down", value: "slide-down" },
													{ label: "Slide Left", value: "slide-left" },
													{ label: "Slide Right", value: "slide-right" },
													{ label: "Clip From Top", value: "clip-from-top" },
													{ label: "Clip From Bottom", value: "clip-from-bottom" },
													{ label: "Clip From Left", value: "clip-from-left" },
													{ label: "Clip From Right", value: "clip-from-right" },
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
												value={childAnimationStaggerDelay}
												onChange={(value) =>
													setAttributes({ childAnimationStaggerDelay: value })
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
	const {
		animateSelf,
		animationTriggerSelf,
		animationDuration,
		animationDelay,
		animationTriggerPoint,
		animateChildren,
		childAnimationType,
		childAnimationDuration,
		childAnimationStaggerDelay,
	} = attributes;

	if (animateSelf) {
		extraProps["data-animation"] = true;
		extraProps["data-animation-type"] = attributes.animationType;
		extraProps["data-animation-trigger"] = animationTriggerSelf
			? "self"
			: "parent";
		extraProps["data-animation-duration"] = animationDuration;
		extraProps["data-animation-delay"] = animationDelay;
		extraProps["data-animation-trigger-point"] = animationTriggerPoint;
	}

	if (animateChildren) {
		extraProps["data-child-animation"] = true;
		extraProps["data-animation-trigger"] = "parent";
		extraProps["data-child-animation-type"] = childAnimationType;
		extraProps["data-child-animation-duration"] = childAnimationDuration;
		extraProps["data-child-animation-stagger-delay"] =
			childAnimationStaggerDelay;
	}

	return extraProps;
}

addFilter(
	"blocks.getSaveContent.extraProps",
	"mello-block-extensions/add-save-props",
	addSaveProps
);
