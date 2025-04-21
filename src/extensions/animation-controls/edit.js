import { InspectorControls } from "@wordpress/block-editor";
import {
	ComboboxControl,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl
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
			animationDuration: { type: "number", default: 500 },
			animationDelay: { type: "number", default: 0 },
			animateSelf: { type: "boolean", default: false }, // New attribute
			animateChildren: { type: "boolean", default: false },
			animationTrigger: { type: "string", default: "section" },
			animationTriggerCustomSelector: { type: "string", default: "" },
			animationTriggerPoint: { type: "number", default: -25 },
			childAnimationType: { type: "string", default: "fade-in" },
			childAnimationDuration: { type: "number", default: 500 },
			childAnimationStaggerDelay: { type: "number", default: 100 },
			childAnimationTrigger: { type: "string", default: "section" },
			childAnimationCustomSelector: { type: "string", default: "" },
			childAnimationTriggerPoint: { type: "number", default: -25 },
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
			animationDuration,
			animationDelay,
			animateSelf, // New attribute
			animationTrigger, // New attribute
			animationTriggerCustomSelector, // New attribute
			animationTriggerPoint, // New attribute
			animateChildren,
			childAnimationType,
			childAnimationDuration,
			childAnimationStaggerDelay,
			childAnimationTrigger, // New attribute
			childAnimationCustomSelector, // New attribute
			childAnimationTriggerPoint, // New attribute
		} = attributes;

		const allowedParentBlockTypes = [
			'core/group',
			'core/columns',
			'core/column',
			'core/cover',
			'core/buttons',
			'core/list',
			'core/post-template',
		];

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
										animationDuration: 600,
										animationDelay: 0,
									});
								}
							}}
						/>
						{animateSelf && ( // Wrap current controls in conditional
							<>
								<ComboboxControl
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
								<RangeControl
									__next40pxDefaultSize
									label={__(
										"Duration (ms)",
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
									label={__("Delay (ms)", "mello-block-extensions")}
									value={animationDelay}
									onChange={(value) => setAttributes({ animationDelay: value })}
									min={0}
									max={3000}
									step={50}
								/>
								<SelectControl
									label={__("Animation Trigger", "mello-block-extensions")}
									value={animationTrigger}
									options={[
										{ label: "Section", value: "section" },
										{ label: "Self", value: "self" },
										{ label: "Custom", value: "custom" },
									]}
									onChange={(value) => setAttributes({ animationTrigger: value })}
									__next40pxDefaultSize
								/>
								{animationTrigger === "self" && (
									<RangeControl
										__next40pxDefaultSize
										label={__("Trigger Point (Self)", "mello-block-extensions")}
										value={animationTriggerPoint}
										onChange={(value) => setAttributes({ animationTriggerPoint: value })}
										min={-100}
										max={0}
										step={5}
										marks={[
											{ value: -50, label: __("Center", "mello-block-extensions") },
											{ value: -100, label: __("Top", "mello-block-extensions") },
											{ value: 0, label: __("Bottom", "mello-block-extensions") },
										]}
									/>
								)}
								{animationTrigger === "custom" && (
									<>
										<TextControl
											label={__("Custom Trigger Selector", "mello-block-extensions")}
											value={animationTriggerCustomSelector}
											onChange={(value) => setAttributes({ animationTriggerCustomSelector: value })}
											help={__("CSS selector for custom trigger element", "mello-block-extensions")}
										/>
										<RangeControl
											__next40pxDefaultSize
											label={__("Trigger Point (Custom)", "mello-block-extensions")}
											value={animationTriggerPoint}
											onChange={(value) => setAttributes({ animationTriggerPoint: value })}
											min={-100}
											max={0}
											step={5}
											marks={[
												{ value: -50, label: __("Center", "mello-block-extensions") },
												{ value: -100, label: __("Top", "mello-block-extensions") },
												{ value: 0, label: __("Bottom", "mello-block-extensions") },
											]}
										/>
									</>
								)}
							</>
						)}
						{allowedParentBlockTypes.includes(props.name) && (
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
										<ComboboxControl
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
										<SelectControl
											label={__("Child Animation Trigger", "mello-block-extensions")}
											value={childAnimationTrigger}
											options={[
												{ label: "Section", value: "section" },
												{ label: "Self", value: "self" },
												{ label: "Custom", value: "custom" },
											]}
											onChange={(value) => setAttributes({ childAnimationTrigger: value })}
											__next40pxDefaultSize
										/>
										{childAnimationTrigger === "self" && (
											<RangeControl
												__next40pxDefaultSize
												label={__("Child Trigger Point (Self)", "mello-block-extensions")}
												value={childAnimationTriggerPoint}
												onChange={(value) => setAttributes({ childAnimationTriggerPoint: value })}
												min={-100}
												max={0}
												step={5}
												marks={[
													{ value: -50, label: __("Center", "mello-block-extensions") },
													{ value: -100, label: __("Top", "mello-block-extensions") },
													{ value: 0, label: __("Bottom", "mello-block-extensions") },
												]}
											/>
										)}
										{childAnimationTrigger === "custom" && (
											<>
												<TextControl
													label={__("Custom Child Trigger Selector", "mello-block-extensions")}
													value={childAnimationCustomSelector}
													onChange={(value) => setAttributes({ childAnimationCustomSelector: value })}
													help={__("CSS selector for custom child trigger", "mello-block-extensions")}
												/>
												<RangeControl
													__next40pxDefaultSize
													label={__("Child Trigger Point (Custom)", "mello-block-extensions")}
													value={childAnimationTriggerPoint}
													onChange={(value) => setAttributes({ childAnimationTriggerPoint: value })}
													min={-100}
													max={0}
													step={5}
													marks={[
														{ value: -50, label: __("Center", "mello-block-extensions") },
														{ value: -100, label: __("Top", "mello-block-extensions") },
														{ value: 0, label: __("Bottom", "mello-block-extensions") },
													]}
												/>
											</>
										)}
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
		animationDuration,
		animationDelay,
		animationTrigger,
		animationTriggerCustomSelector,
		animationTriggerPoint,
		animateChildren,
		childAnimationType,
		childAnimationDuration,
		childAnimationStaggerDelay,
		childAnimationTrigger,
		childAnimationCustomSelector,
		childAnimationTriggerPoint,
	} = attributes;

	if (animateSelf) {
		extraProps["data-animation"] = true;
		extraProps["data-animation-type"] = attributes.animationType;
		extraProps["data-animation-trigger"] = animationTrigger;
		extraProps["data-animation-duration"] = animationDuration;
		extraProps["data-animation-delay"] = animationDelay;
		extraProps["data-animation-trigger-point"] = animationTriggerPoint;
		extraProps["data-animation-trigger-custom-selector"] = animationTriggerCustomSelector;
	}

	if (animateChildren) {
		extraProps["data-child-animation"] = true;
		extraProps["data-child-animation-type"] = childAnimationType;
		extraProps["data-child-animation-duration"] = childAnimationDuration;
		extraProps["data-child-animation-stagger-delay"] = childAnimationStaggerDelay;
		extraProps["data-child-animation-trigger"] = childAnimationTrigger;
		extraProps["data-child-animation-trigger-point"] = childAnimationTriggerPoint;
		extraProps["data-child-animation-custom-selector"] = childAnimationCustomSelector;
	}

	return extraProps;
}

addFilter(
	"blocks.getSaveContent.extraProps",
	"mello-block-extensions/add-save-props",
	addSaveProps
);
