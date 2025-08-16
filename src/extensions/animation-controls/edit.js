import { InspectorControls } from "@wordpress/block-editor";
import {
	ComboboxControl,
	__experimentalDivider as Divider,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	TextareaControl,
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
	const unsupportedBlocks = ['core/calendar'];
	if (!settings.name || !settings.name.startsWith('core/') || unsupportedBlocks.includes(settings.name)) {
		return settings;
	}

	// Base animation attributes with defaults only where needed.
	const animationAttributes = {
		animationType: { type: "string", default: "fade-in" },
		animationDuration: { type: "number", default: 500 },
		animationDelay: { type: "number", default: 0 },
		animateSelf: { type: "boolean", default: false },
		animateChildren: { type: "boolean", default: false },
		animationTrigger: { type: "string", default: "section" },
		animationTriggerPoint: { type: "number", default: -25 },

		animationMethod: { type: "string" }, // No default, undefined unless set
		animationEasing: { type: "string" }, // No default, undefined unless set
		animationRepeat: { type: "number" }, // No default, undefined unless set
		animationRepeatType: { type: "string" }, // No default, undefined unless set
		animationRepeatDelay: { type: "number" }, // No default, undefined unless set

		childAnimationType: { type: "string", default: "fade-in" },
		childAnimationDuration: { type: "number", default: 500 },
		childAnimationStaggerDelay: { type: "number", default: 100 },
		childAnimationTrigger: { type: "string", default: "section" },
		childAnimationTriggerPoint: { type: "number", default: -25 },
		animationCustomConfig: { type: "string" },
		childAnimationCustomConfig: { type: "string" },

		childAnimationMethod: { type: "string" }, // No default, undefined unless set
		childAnimationEasing: { type: "string" }, // No default, undefined unless set
		childAnimationRepeat: { type: "number" }, // No default, undefined unless set
		childAnimationRepeatType: { type: "string" }, // No default, undefined unless set
		childAnimationRepeatDelay: { type: "number" }, // No default, undefined unless set
	};

	// Optional attributes, no defaults, so they are only saved if set.
	const optionalAttributes = {
		animationTriggerCustomSelector: { type: "string" },
		childAnimationCustomSelector: { type: "string" }
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...animationAttributes,
			...optionalAttributes
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
		const unsupportedBlocks = ['core/calendar'];
		if (!props.name || !props.name.startsWith('core/') || unsupportedBlocks.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;
		const {
			animationType,
			animationDuration,
			animationDelay,
			animateSelf,
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
			animationCustomConfig,
			childAnimationCustomConfig,
			animationMethod,
			animationEasing,
			animationRepeat,
			animationRepeatType,
			animationRepeatDelay,
			childAnimationMethod,
			childAnimationEasing,
			childAnimationRepeat,
			childAnimationRepeatType,
			childAnimationRepeatDelay,
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

		const easingOptions = [
			{ label: "Linear", value: "linear" },
			{ label: "Ease", value: "ease" },
			{ label: "Ease In", value: "easeIn" },
			{ label: "Ease Out", value: "easeOut" },
			{ label: "Ease In Out", value: "easeInOut" },
			{ label: "Circ In", value: "circIn" },
			{ label: "Circ Out", value: "circOut" },
			{ label: "Circ In Out", value: "circInOut" },
			{ label: "Back In", value: "backIn" },
			{ label: "Back Out", value: "backOut" },
			{ label: "Back In Out", value: "backInOut" },
			{ label: "Anticipate", value: "anticipate" },
			{ label: "Bounce In", value: "bounceIn" },
			{ label: "Bounce Out", value: "bounceOut" },
			{ label: "Bounce In Out", value: "bounceInOut" },
		];

		const handleAnimationTriggerChange = (value) => {
			if (value !== 'custom') {
				setAttributes({
					animationTrigger: value,
					animationTriggerCustomSelector: undefined
				});
			} else {
				setAttributes({ animationTrigger: value });
			}
		};

		const handleChildAnimationTriggerChange = (value) => {
			if (value !== 'custom') {
				setAttributes({
					childAnimationTrigger: value,
					childAnimationCustomSelector: undefined
				});
			} else {
				setAttributes({ childAnimationTrigger: value });
			}
		};

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
							label={__("Animate block", "mello-block-extensions")}
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

						{animateSelf && (
							<>
								<Divider />
								<ComboboxControl
									__next40pxDefaultSize
									label={__("Animation Preset", "mello-block-extensions")}
									value={animationType || 'fade-in'}
									options={[
										{ label: "Fade In", value: "fade-in", default: true },
										{ label: "Slide Up", value: "slide-up" },
										{ label: "Slide Down", value: "slide-down" },
										{ label: "Slide Left", value: "slide-left" },
										{ label: "Slide Right", value: "slide-right" },
										{ label: "Clip From Top", value: "clip-from-top" },
										{ label: "Clip From Bottom", value: "clip-from-bottom" },
										{ label: "Clip From Left", value: "clip-from-left" },
										{ label: "Clip From Right", value: "clip-from-right" },
										{ label: "Custom", value: "custom" },
									]}
									onChange={(value) => setAttributes({ animationType: value })}
								/>
								{animationType === "custom" && (
									<TextareaControl
										__next40pxDefaultSize
										label={__("Custom Animation Config", "mello-block-extensions")}
										help={__("Provide Motion.js animation config as JSON. E.g. { \"opacity\": [0,1], \"scale\": [0,1] }", "mello-block-extensions")}
										value={animationCustomConfig}
										onChange={(value) => setAttributes({ animationCustomConfig: value })}
										rows={10}
									/>
								)}
								<Divider />
								<RangeControl
									__next40pxDefaultSize
									label={__("Duration (ms)", "mello-block-extensions")}
									value={animationDuration}
									onChange={(value) => setAttributes({ animationDuration: value })}
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
								<Divider />
								<SelectControl
									label={__("Animation Method", "mello-block-extensions")}
									value={animationMethod ?? 'tween'}
									options={[
										{ label: "Tween", value: "tween" },
										{ label: "Spring", value: "spring" },
										{ label: "Inertia", value: "inertia" },
									]}
									onChange={(value) => {
										setAttributes({ animationMethod: value });
										if (value !== 'tween') {
											setAttributes({ animationEasing: undefined });
										}
									}}
									__next40pxDefaultSize
								/>
								{(animationMethod ?? 'tween') === "tween" && (
									<SelectControl
										label={__("Animation Easing", "mello-block-extensions")}
										value={animationEasing ?? 'circOut'}
										options={easingOptions}
										onChange={(value) => setAttributes({ animationEasing: value })}
										__next40pxDefaultSize
									/>
								)}
								<RangeControl
									__next40pxDefaultSize
									label={__("Repeat Count", "mello-block-extensions")}
									value={Number.isFinite(animationRepeat) ? animationRepeat : 0}
									onChange={(value) => {
										setAttributes({ animationRepeat: value });
										if (!Number.isFinite(value) || value === 0) {
											setAttributes({ animationRepeatType: undefined, animationRepeatDelay: undefined });
										}
									}}
									min={0}
									max={10}
									step={1}
									marks={[
										{ value: 0, label: __("0", "mello-block-extensions") },
										{ value: 10, label: __("∞", "mello-block-extensions") },
									]}
									help={__("Set to 10 for infinite repeat", "mello-block-extensions")}
								/>
								{((Number.isFinite(animationRepeat) ? animationRepeat : 0) > 0 || animationRepeatType !== undefined || animationRepeatDelay !== undefined) && (
									<>
										<SelectControl
											label={__("Repeat Type", "mello-block-extensions")}
											value={animationRepeatType}
											options={[
												{ label: "Loop", value: "loop" },
												{ label: "Reverse", value: "reverse" },
												{ label: "Mirror", value: "mirror" },
											]}
											onChange={(value) => setAttributes({ animationRepeatType: value })}
											__next40pxDefaultSize
										/>
										<RangeControl
											__next40pxDefaultSize
											label={__("Repeat Delay (ms)", "mello-block-extensions")}
											value={animationRepeatDelay}
											onChange={(value) => setAttributes({ animationRepeatDelay: value })}
											min={0}
											max={3000}
											step={50}
										/>
									</>
								)}
								<Divider />
								<SelectControl
									label={__("Animation Trigger", "mello-block-extensions")}
									value={animationTrigger}
									options={[
										{ label: "Section", value: "section" },
										{ label: "Self", value: "self" },
										{ label: "Custom", value: "custom" },
									]}
									onChange={handleAnimationTriggerChange}
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
											__next40pxDefaultSize
											label={__("Custom Trigger Selector", "mello-block-extensions")}
											value={animationTriggerCustomSelector}
											onChange={(value) => setAttributes({ animationTriggerCustomSelector: value })}
											help={__("Unique CSS selector to trigger animation", "mello-block-extensions")}
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
								<Divider />
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
										<Divider />
										<ComboboxControl
											__next40pxDefaultSize
											label={__("Child Animation Type", "mello-block-extensions")}
											value={animationType || 'fade-in'}
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
												{ label: "Custom", value: "custom" },
											]}
											onChange={(value) =>
												setAttributes({ childAnimationType: value })
											}
										/>

										{childAnimationType === "custom" && (
											<TextareaControl
												__next40pxDefaultSize
												label={__("Custom Child Animation Config", "mello-block-extensions")}
												help={__("Provide Motion.js animation config as JSON. E.g. { \"opacity\": [0,1], \"scale\": [0,1] }", "mello-block-extensions")}
												value={childAnimationCustomConfig}
												onChange={(value) => setAttributes({ childAnimationCustomConfig: value })}
												rows={10}
											/>
										)}
										<Divider />
										<RangeControl
											__next40pxDefaultSize
											label={__("Child Animation Duration (ms)", "mello-block-extensions")}
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
										<Divider />
										<SelectControl
											label={__("Child Animation Method", "mello-block-extensions")}
											value={childAnimationMethod ?? 'tween'}
											options={[
												{ label: "Tween", value: "tween" },
												{ label: "Spring", value: "spring" },
												{ label: "Inertia", value: "inertia" },
											]}
											onChange={(value) => {
												setAttributes({ childAnimationMethod: value });
												if (value !== 'tween') {
													setAttributes({ childAnimationEasing: undefined });
												}
											}}
											__next40pxDefaultSize
										/>
										{(childAnimationMethod ?? 'tween') === "tween" && (
											<SelectControl
												label={__("Child Animation Easing", "mello-block-extensions")}
												value={childAnimationEasing ?? 'circOut'}
												options={easingOptions}
												onChange={(value) => setAttributes({ childAnimationEasing: value })}
												__next40pxDefaultSize
											/>
										)}
										<RangeControl
											__next40pxDefaultSize
											label={__("Child Repeat Count", "mello-block-extensions")}
											value={Number.isFinite(childAnimationRepeat) ? childAnimationRepeat : 0}
											onChange={(value) => {
												setAttributes({ childAnimationRepeat: value });
												if (!Number.isFinite(value) || value === 0) {
													setAttributes({ childAnimationRepeatType: undefined, childAnimationRepeatDelay: undefined });
												}
											}}
											min={0}
											max={10}
											step={1}
											marks={[
												{ value: 0, label: __("0", "mello-block-extensions") },
												{ value: 10, label: __("∞", "mello-block-extensions") },
											]}
											help={__("Set to 10 for infinite repeat", "mello-block-extensions")}
										/>
										{((Number.isFinite(childAnimationRepeat) ? childAnimationRepeat : 0) > 0 || childAnimationRepeatType !== undefined || childAnimationRepeatDelay !== undefined) && (
											<>
												<SelectControl
													label={__("Child Repeat Type", "mello-block-extensions")}
													value={childAnimationRepeatType}
													options={[
														{ label: "Loop", value: "loop" },
														{ label: "Reverse", value: "reverse" },
														{ label: "Mirror", value: "mirror" },
													]}
													onChange={(value) => setAttributes({ childAnimationRepeatType: value })}
													__next40pxDefaultSize
												/>
												<RangeControl
													__next40pxDefaultSize
													label={__("Child Repeat Delay (ms)", "mello-block-extensions")}
													value={childAnimationRepeatDelay}
													onChange={(value) => setAttributes({ childAnimationRepeatDelay: value })}
													min={0}
													max={3000}
													step={50}
												/>
											</>
										)}
										<Divider />
										<SelectControl
											label={__("Child Animation Trigger", "mello-block-extensions")}
											value={childAnimationTrigger}
											options={[
												{ label: "Section", value: "section" },
												{ label: "Self", value: "self" },
												{ label: "Custom", value: "custom" },
											]}
											onChange={handleChildAnimationTriggerChange}
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
													__next40pxDefaultSize
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
		animationType,
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
		animationCustomConfig,
		childAnimationCustomConfig,
		animationMethod,
		animationEasing,
		animationRepeat,
		animationRepeatType,
		animationRepeatDelay,
		childAnimationMethod,
		childAnimationEasing,
		childAnimationRepeat,
		childAnimationRepeatType,
		childAnimationRepeatDelay,
	} = attributes;

	if (animateSelf) {
		extraProps["data-animation"] = true;
		extraProps["data-animation-type"] = animationType;
		extraProps["data-animation-trigger"] = animationTrigger;
		extraProps["data-animation-duration"] = animationDuration;
		extraProps["data-animation-delay"] = animationDelay;
		extraProps["data-animation-trigger-point"] = animationTriggerPoint;
		// Only print new v2 attributes if explicitly set
		if (animationMethod != null) {
			extraProps["data-animation-method"] = animationMethod;
		}
		if ((animationMethod ?? 'tween') === 'tween' && animationEasing != null) {
			extraProps["data-animation-easing"] = animationEasing;
		}
		if (Number.isFinite(animationRepeat) && animationRepeat > 0) {
			extraProps["data-animation-repeat"] = animationRepeat === 10 ? "Infinity" : animationRepeat;
			if (animationRepeatType != null) {
				extraProps["data-animation-repeat-type"] = animationRepeatType;
			}
			if (Number.isFinite(animationRepeatDelay) && animationRepeatDelay > 0) {
				extraProps["data-animation-repeat-delay"] = animationRepeatDelay;
			}
		}
		// Custom selector/config (existing guards)
		if (typeof animationTriggerCustomSelector === 'string' &&
			animationTriggerCustomSelector.trim() !== '' &&
			animationTrigger === 'custom') {
			extraProps["data-animation-trigger-custom-selector"] = animationTriggerCustomSelector;
		}

		if (animationType === 'custom' && animationCustomConfig) {
			try {
				let maybeJson = animationCustomConfig.trim();

				// If it starts with a quote, assume escaped string and decode it
				if (!maybeJson.startsWith('{')) {
					const decoded = JSON.parse(`"${maybeJson}"`);
					maybeJson = `{${decoded}}`;
				}

				JSON.parse(maybeJson); // validate
				extraProps["data-animation-config"] = maybeJson;
			} catch (err) {
				console.warn("Invalid custom animation config", err);
			}
		}
	} else {
		delete extraProps["data-animation"];
		delete extraProps["data-animation-type"];
		delete extraProps["data-animation-trigger"];
		delete extraProps["data-animation-duration"];
		delete extraProps["data-animation-delay"];
		delete extraProps["data-animation-trigger-point"];
		delete extraProps["data-animation-trigger-custom-selector"];
		delete extraProps["data-animation-config"];
		delete extraProps["data-animation-method"];
		delete extraProps["data-animation-easing"];
		delete extraProps["data-animation-repeat"];
		delete extraProps["data-animation-repeat-type"];
		delete extraProps["data-animation-repeat-delay"];
	}

	if (animateChildren) {
		extraProps["data-child-animation"] = true;
		extraProps["data-child-animation-type"] = childAnimationType;
		extraProps["data-child-animation-duration"] = childAnimationDuration;
		extraProps["data-child-animation-stagger-delay"] = childAnimationStaggerDelay;
		extraProps["data-child-animation-trigger"] = childAnimationTrigger;
		extraProps["data-child-animation-trigger-point"] = childAnimationTriggerPoint;
		// Only print new v2 child attributes if explicitly set
		if (childAnimationMethod != null) {
			extraProps["data-child-animation-method"] = childAnimationMethod;
		}
		if ((childAnimationMethod ?? 'tween') === 'tween' && childAnimationEasing != null) {
			extraProps["data-child-animation-easing"] = childAnimationEasing;
		}
		if (Number.isFinite(childAnimationRepeat) && childAnimationRepeat > 0) {
			extraProps["data-child-animation-repeat"] = childAnimationRepeat === 10 ? "Infinity" : childAnimationRepeat;
			if (childAnimationRepeatType != null) {
				extraProps["data-child-animation-repeat-type"] = childAnimationRepeatType;
			}
			if (Number.isFinite(childAnimationRepeatDelay) && childAnimationRepeatDelay > 0) {
				extraProps["data-child-animation-repeat-delay"] = childAnimationRepeatDelay;
			}
		}

		if (typeof childAnimationCustomSelector === 'string' &&
			childAnimationCustomSelector.trim() !== '' &&
			childAnimationTrigger === 'custom') {
			extraProps["data-child-animation-custom-selector"] = childAnimationCustomSelector;
		}

		if (childAnimationType === 'custom' && childAnimationCustomConfig) {
			try {
				let maybeJson = childAnimationCustomConfig.trim();

				// If it starts with a quote, assume escaped string and decode it
				if (!maybeJson.startsWith('{')) {
					const decoded = JSON.parse(`"${maybeJson}"`);
					maybeJson = `{${decoded}}`;
				}

				JSON.parse(maybeJson); // validate
				extraProps["data-child-animation-config"] = maybeJson;
			} catch (err) {
				console.warn("Invalid custom child animation config", err);
			}
		}
	} else {
		delete extraProps["data-child-animation"];
		delete extraProps["data-child-animation-type"];
		delete extraProps["data-child-animation-duration"];
		delete extraProps["data-child-animation-stagger-delay"];
		delete extraProps["data-child-animation-trigger"];
		delete extraProps["data-child-animation-trigger-point"];
		delete extraProps["data-child-animation-custom-selector"];
		delete extraProps["data-child-animation-config"];
		delete extraProps["data-child-animation-method"];
		delete extraProps["data-child-animation-easing"];
		delete extraProps["data-child-animation-repeat"];
		delete extraProps["data-child-animation-repeat-type"];
		delete extraProps["data-child-animation-repeat-delay"];
	}

	return extraProps;
}

addFilter(
	"blocks.getSaveContent.extraProps",
	"mello-block-extensions/add-save-props",
	addSaveProps
);