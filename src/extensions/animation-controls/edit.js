import { InspectorControls } from "@wordpress/block-editor";
import {
	ComboboxControl,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	TextareaControl,
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
	if (!settings.name || !settings.name.startsWith('core/')) {
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
		childAnimationType: { type: "string", default: "fade-in" },
		childAnimationDuration: { type: "number", default: 500 },
		childAnimationStaggerDelay: { type: "number", default: 100 },
		childAnimationTrigger: { type: "string", default: "section" },
		childAnimationTriggerPoint: { type: "number", default: -25 },
		animationCustomConfig: { type: "string" },
		childAnimationCustomConfig: { type: "string" }
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
		if (!props.name || !props.name.startsWith('core/')) {
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
								<ComboboxControl
									__next40pxDefaultSize
									label={__("Animation Preset", "mello-block-extensions")}
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
											label={__("Child Animation Type", "mello-block-extensions")}
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
	} = attributes;

	if (animateSelf) {
		extraProps["data-animation"] = true;
		extraProps["data-animation-type"] = animationType;
		extraProps["data-animation-trigger"] = animationTrigger;
		extraProps["data-animation-duration"] = animationDuration;
		extraProps["data-animation-delay"] = animationDelay;
		extraProps["data-animation-trigger-point"] = animationTriggerPoint;

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
	}

	if (animateChildren) {
		extraProps["data-child-animation"] = true;
		extraProps["data-child-animation-type"] = childAnimationType;
		extraProps["data-child-animation-duration"] = childAnimationDuration;
		extraProps["data-child-animation-stagger-delay"] = childAnimationStaggerDelay;
		extraProps["data-child-animation-trigger"] = childAnimationTrigger;
		extraProps["data-child-animation-trigger-point"] = childAnimationTriggerPoint;

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
	}

	return extraProps;
}

addFilter(
	"blocks.getSaveContent.extraProps",
	"mello-block-extensions/add-save-props",
	addSaveProps
);