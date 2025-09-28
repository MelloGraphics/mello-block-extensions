// Namespaces and deny-list for enabling animation controls
const ALLOW_NAMESPACES = [ 'core', 'mellobase' ];
const DENY_BLOCKS = [
    'core/calendar',
	'core/archives',
	'core/latest-comments',
	'core/rss',
	'core/tag-cloud'
];

function shouldEnableFor( name ) {
    if ( ! name || typeof name !== 'string' ) return false;
    if ( DENY_BLOCKS.includes( name ) ) return false;
    const ns = name.split('/')[0];
    return ALLOW_NAMESPACES.includes( ns );
}
import { InspectorControls } from "@wordpress/block-editor";
import {
	Button,
	ComboboxControl,
	__experimentalDivider as Divider,
	Icon,
	Modal,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	Tooltip,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { check, help } from "@wordpress/icons";

/**
 * Helper functions for animation config validation
 */
function isValidAnimationConfig(config) {
	if (!config || !config.trim()) return false;

	try {
		const parsed = JSON.parse(config);

		// Check if it's a timeline array
		if (Array.isArray(parsed)) {
			return parsed.every(item =>
				Array.isArray(item) &&
				item.length >= 2 &&
				typeof item[0] === 'string' &&
				typeof item[1] === 'object'
			);
		}

		// Check if it's a single animation object
		if (typeof parsed === 'object' && parsed !== null) {
			return true;
		}

		return false;
	} catch {
		return false;
	}
}

function getAnimationConfigType(config) {
	try {
		const parsed = JSON.parse(config);
		return Array.isArray(parsed) ? 'timeline' : 'single';
	} catch {
		return 'invalid';
	}
}

/**
 * Add the attribute for custom data attributes to specified blocks.
 *
 * @param {Object} settings Block settings.
 * @param {string} name Block name.
 */
function addAttributes(settings, name) {
    if ( ! shouldEnableFor( name ) ) {
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
		animationSpringAmount: { type: "number" }, // No default, undefined unless set

		childAnimationType: { type: "string", default: "fade-in" },
		childAnimationDuration: { type: "number", default: 500 },
		childAnimationDelay: { type: "number" }, // No default, undefined unless set
		childAnimationStaggerDelay: { type: "number", default: 100 },
		childAnimationStaggerFrom: { type: "string" }, // No default, undefined unless set
		childAnimationStaggerEasing: { type: "string" }, // No default, undefined unless set
		childAnimationTrigger: { type: "string", default: "section" },
		childAnimationTriggerPoint: { type: "number", default: -25 },
		animationCustomConfig: { type: "string" },
		childAnimationCustomConfig: { type: "string" },

		childAnimationMethod: { type: "string" }, // No default, undefined unless set
		childAnimationEasing: { type: "string" }, // No default, undefined unless set
		childAnimationRepeat: { type: "number" }, // No default, undefined unless set
		childAnimationRepeatType: { type: "string" }, // No default, undefined unless set
		childAnimationRepeatDelay: { type: "number" }, // No default, undefined unless set
		childAnimationSpringAmount: { type: "number" }, // No default, undefined unless set
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
        if ( ! shouldEnableFor( props.name ) ) {
            return <BlockEdit { ...props } />;
        }

		// State for help popovers and temp values
		const [showAnimationHelp, setShowAnimationHelp] = useState(false);
		const [showChildAnimationHelp, setShowChildAnimationHelp] = useState(false);
		const [tempAnimationConfig, setTempAnimationConfig] = useState('');
		const [tempChildAnimationConfig, setTempChildAnimationConfig] = useState('');

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
			childAnimationDelay,
			childAnimationStaggerDelay,
			childAnimationStaggerFrom,
			childAnimationStaggerEasing,
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
			animationSpringAmount,
			childAnimationMethod,
			childAnimationEasing,
			childAnimationRepeat,
			childAnimationRepeatType,
			childAnimationRepeatDelay,
			childAnimationSpringAmount,
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
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={
								<>
									{__("Animate block", "mello-block-extensions")}{" "}
									<Tooltip
										text={__("Choose from a set of preset animations or add a custom motion.js timeline to your block", "mello-block-extensions")}
										placement="top"
									>
										<span className="mello-help-icon" tabIndex={0} aria-label={__("More info", "mello-block-extensions")}>
											<Icon icon={help} />
										</span>
									</Tooltip>
								</>
							}
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
									<>
										<Button
											variant="secondary"
											onClick={() => {
												setTempAnimationConfig(animationCustomConfig || '');
												setShowAnimationHelp(true);
											}}
											className="mello-animation-config-button"
										>
											{__("Edit Custom Animation", "mello-block-extensions")}
										</Button>

										{showAnimationHelp && (
											<Modal
												className="mello-animation-config-modal mello-modal-fullscreen"
												title={__("Custom Animation Configuration", "mello-block-extensions")}
												isFullScreen
												onRequestClose={() => {
													setShowAnimationHelp(false);
													setTempAnimationConfig('');
												}}
											>
												<div className="mello-animation-config-inner">
													<div className="mello-animation-config-header" />
													<div className="mello-animation-config-body">
														{/* Help Column */}
														<div className="mello-animation-config-help">
															<div className="mello-animation-help-section">
																<h4 className="mello-animation-help-section-title">
																	{__("Animation Types", "mello-block-extensions")}
																</h4>
																<div className="mello-animation-help-section-content">
																	<div><strong>Single Element:</strong></div>
																	<div className="mello-animation-help-examples">
																		{`{ "opacity": [0,1], "y": [-20,0] }`}
																	</div>
																	<div><strong>Timeline (Multiple Elements):</strong></div>
																	<div className="mello-animation-help-examples">
																		{`[
  [".title", { "opacity": [0,1] }],
  [".subtitle", { "opacity": [0,1] }, { "at": 0.3 }]
]`}
																	</div>
																</div>
															</div>

															<div className="mello-animation-help-section">
																<h4 className="mello-animation-help-section-title">
																	{__("Selectors", "mello-block-extensions")}
																</h4>
																<div className="mello-animation-help-section-content">
																	<div>• <code>"&"</code> - Block itself</div>
																	<div>• <code>".class"</code> - Elements with class</div>
																	<div>• <code>"p"</code> - Paragraph elements</div>
																	<div>• <code>"[data-attr]"</code> - Data attributes</div>
																</div>
															</div>

															<div className="mello-animation-help-section">
																<h4 className="mello-animation-help-section-title">
																	{__("Timeline Options", "mello-block-extensions")}
																</h4>
																<div className="mello-animation-help-section-content">
																	<div>• <code>"at": 0.5</code> - Start time</div>
																	<div>• <code>"duration": 0.8</code> - Duration (seconds)</div>
																	<div>• <code>"stagger": 0.1</code> - Element delay</div>
																	<div>• <code>"ease": "easeOut"</code> - Easing function</div>
																</div>
															</div>

															<div className="mello-animation-help-section">
																<h4 className="mello-animation-help-section-title">
																	{__("Properties", "mello-block-extensions")}
																</h4>
																<div className="mello-animation-help-section-content">
																	<div>• <code>"opacity": [0,1]</code> - Fade</div>
																	<div>• <code>"x": [-50,0]</code> - Horizontal</div>
																	<div>• <code>"y": [-20,0]</code> - Vertical</div>
																	<div>• <code>"scale": [0.8,1]</code> - Size</div>
																	<div>• <code>"rotate": [0,360]</code> - Rotation</div>
																</div>
															</div>
														</div>

														{/* Editor Column */}
														<div className="mello-animation-config-editor">
															<TextareaControl
																label={__("Animation Configuration", "mello-block-extensions")}
																value={tempAnimationConfig}
																onChange={(value) => setTempAnimationConfig(value)}
																rows={20}
																placeholder={`Single element:
{ "opacity": [0,1], "y": [-20,0] }

Timeline (multiple elements):
[
  [".title", { "opacity": [0,1], "y": [-30,0] }],
  [".subtitle", { "opacity": [0,1] }, { "at": 0.3 }],
  ["&", { "scale": [0.98,1] }, { "duration": 1 }]
]`}
															/>

															{/* Validation indicator */}
															{tempAnimationConfig && (
																<div className="mello-animation-validation">
																	{isValidAnimationConfig(tempAnimationConfig) ? (
																		<div className="mello-animation-validation-success">
																			✓ {getAnimationConfigType(tempAnimationConfig) === 'timeline'
																				? __("Valid timeline animation", "mello-block-extensions")
																				: __("Valid single element animation", "mello-block-extensions")
																			}
																		</div>
																	) : (
																		<div className="mello-animation-validation-error">
																			✗ {__("Invalid JSON format", "mello-block-extensions")}
																		</div>
																	)}
																</div>
															)}
														</div>
													</div>

													<div className="mello-animation-config-footer">
														<Button
															variant="secondary"
															onClick={() => {
																setShowAnimationHelp(false);
																setTempAnimationConfig('');
															}}
														>
															{__("Cancel", "mello-block-extensions")}
														</Button>
														<Button
															variant="primary"
															onClick={() => {
																setAttributes({ animationCustomConfig: tempAnimationConfig });
																setShowAnimationHelp(false);
																setTempAnimationConfig('');
															}}
															disabled={tempAnimationConfig && !isValidAnimationConfig(tempAnimationConfig)}
														>
															{__("Save & Close", "mello-block-extensions")}
														</Button>
													</div>
												</div>
											</Modal>
										)}

										{/* Show current config summary */}
										{animationCustomConfig && (
											<div className="mello-animation-config-summary">
												<Icon icon={check} size={20} />{" "}
												{getAnimationConfigType(animationCustomConfig) === 'timeline'
													? __("Custom timeline animation added", "mello-block-extensions")
													: __("Custom single animation added", "mello-block-extensions")}
											</div>
										)}
									</>
								)}
								<Divider />
								<RangeControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									label={__("Duration (ms)", "mello-block-extensions")}
									value={animationDuration}
									onChange={(value) => setAttributes({ animationDuration: value })}
									min={100}
									max={3000}
									step={50}

								/>
								<RangeControl
									__nextHasNoMarginBottom
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
										if (value !== 'spring') {
											setAttributes({ animationSpringAmount: undefined });
										}
									}}
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>
								{(animationMethod ?? 'tween') === "tween" && (
									<SelectControl
										label={__("Animation Easing", "mello-block-extensions")}
										value={animationEasing ?? 'circOut'}
										options={easingOptions}
										onChange={(value) => setAttributes({ animationEasing: value })}
										__next40pxDefaultSize
										__nextHasNoMarginBottom
									/>
								)}
								{(animationMethod ?? 'tween') === 'spring' && (
									<RangeControl
										__nextHasNoMarginBottom
										__next40pxDefaultSize
										label={__("Spring Amount", "mello-block-extensions")}
										value={Number.isFinite(animationSpringAmount) ? animationSpringAmount : 0.5}
										onChange={(value) => setAttributes({ animationSpringAmount: value })}
										min={0}
										max={1}
										step={0.05}
										help={__("Higher = more bouncy", "mello-block-extensions")}
									/>
								)}
								<RangeControl
									__nextHasNoMarginBottom
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
											__nextHasNoMarginBottom
										/>
										<RangeControl
											__nextHasNoMarginBottom
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
									__nextHasNoMarginBottom
								/>
								{animationTrigger === "self" && (
									<RangeControl
										__nextHasNoMarginBottom
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
											__nextHasNoMarginBottom
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
									__nextHasNoMarginBottom
									label={
										<>
											{__("Animate Children", "mello-block-exgleConts")}{" "}
											<Tooltip
												text={__("Add sequential animation to direct child elements", "mello-block-extensions")}
												placement="top"
											>
												<span className="mello-help-icon" tabIndex={0} aria-label={__("More info", "mello-block-extensions")}>
													<Icon icon={help} />
												</span>
											</Tooltip>
										</>
									}
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
											value={childAnimationType || 'fade-in'}
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
											<>
												<Button
													variant="secondary"
													onClick={() => {
														setTempChildAnimationConfig(childAnimationCustomConfig || '');
														setShowChildAnimationHelp(true);
													}}
													className="mello-animation-config-button"
												>
													{__("Edit Child Animation", "mello-block-extensions")}
												</Button>

												{showChildAnimationHelp && (
													<Modal
														className="mello-animation-config-modal mello-modal-fullscreen"
														title={__("Custom Child Animation Configuration", "mello-block-extensions")}
														isFullScreen
														onRequestClose={() => {
															setShowChildAnimationHelp(false);
															setTempChildAnimationConfig('');
														}}
													>
														<div className="mello-animation-config-inner">
															<div className="mello-animation-config-header" />
															<div className="mello-animation-config-body">
																{/* Help Column */}
																<div className="mello-animation-config-help">
																	<div className="mello-animation-help-section">
																		<h4 className="mello-animation-help-section-title">
																			{__("Child Animations", "mello-block-extensions")}
																		</h4>
																		<div className="mello-animation-help-section-content">
																			<div>Uses the same format as main animations but targets child elements within the block.</div>
																		</div>
																	</div>
																	<div className="mello-animation-help-section">
																		<h4 className="mello-animation-help-section-title">
																			{__("Examples", "mello-block-extensions")}
																		</h4>
																		<div className="mello-animation-help-section-content">
																			<div><strong>Single Child:</strong></div>
																			<div className="mello-animation-help-examples">
																				{`{ "opacity": [0,1], "stagger": 0.1 }`}
																			</div>
																			<div><strong>Multiple Children:</strong></div>
																			<div className="mello-animation-help-examples">
																				{`[
  [".child-item", { "opacity": [0,1] }],
  [".child-icon", { "rotate": [0,360] }, { "at": 0.2 }]
]`}
																			</div>
																		</div>
																	</div>
																</div>

																{/* Editor Column */}
																<div className="mello-animation-config-editor">
																	<TextareaControl
																		label={__("Child Animation Configuration", "mello-block-extensions")}
																		value={tempChildAnimationConfig}
																		onChange={(value) => setTempChildAnimationConfig(value)}
																		rows={20}
																		placeholder={`Single element:
{ "opacity": [0,1], "scale": [0.8,1] }

Timeline (multiple children):
[
  [".child-item", { "opacity": [0,1], "stagger": 0.1 }],
  [".child-icon", { "rotate": [0,360] }, { "at": 0.3 }]
]`}
																	/>

																	{/* Validation indicator */}
																	{tempChildAnimationConfig && (
																		<div className="mello-animation-validation">
																			{isValidAnimationConfig(tempChildAnimationConfig) ? (
																				<div className="mello-animation-validation-success">
																					✓ {getAnimationConfigType(tempChildAnimationConfig) === 'timeline'
																						? __("Valid timeline animation", "mello-block-extensions")
																						: __("Valid single element animation", "mello-block-extensions")
																					}
																				</div>
																			) : (
																				<div className="mello-animation-validation-error">
																					✗ {__("Invalid JSON format", "mello-block-extensions")}
																				</div>
																			)}
																		</div>
																	)}
																</div>
															</div>

															<div className="mello-animation-config-footer">
																<Button
																	variant="secondary"
																	onClick={() => {
																		setShowChildAnimationHelp(false);
																		setTempChildAnimationConfig('');
																	}}
																>
																	{__("Cancel", "mello-block-extensions")}
																</Button>
																<Button
																	variant="primary"
																	onClick={() => {
																		setAttributes({ childAnimationCustomConfig: tempChildAnimationConfig });
																		setShowChildAnimationHelp(false);
																		setTempChildAnimationConfig('');
																	}}
																	disabled={tempChildAnimationConfig && !isValidAnimationConfig(tempChildAnimationConfig)}
																>
																	{__("Save & Close", "mello-block-extensions")}
																</Button>
															</div>
														</div>
													</Modal>
												)}

												{/* Show current config summary */}
												{childAnimationCustomConfig && (
													<div className="mello-animation-config-summary">
														<Icon icon={check} size={20} />{" "}
														{getAnimationConfigType(childAnimationCustomConfig) === 'timeline'
															? __("Child timeline animation added", "mello-block-extensions")
															: __("Child single animation added", "mello-block-extensions")}
													</div>
												)}
											</>
										)}
										<Divider />
										<RangeControl
											__nextHasNoMarginBottom
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
											__nextHasNoMarginBottom
											__next40pxDefaultSize
											label={__("Child Animation Delay (ms)", "mello-block-extensions")}
											value={childAnimationDelay ?? 0}
											onChange={(value) =>
												setAttributes({ childAnimationDelay: value })
											}
											min={0}
											max={3000}
											step={50}
										/>
										<RangeControl
											__nextHasNoMarginBottom
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
											label={__("Stagger From", "mello-block-extensions")}
											value={childAnimationStaggerFrom ?? 'first'}
											options={[
												{ label: "First", value: "first" },
												{ label: "Last", value: "last" },
												{ label: "Center", value: "center" },
											]}
											onChange={(value) => setAttributes({ childAnimationStaggerFrom: value })}
											__next40pxDefaultSize
											__nextHasNoMarginBottom
										/>
										<SelectControl
											label={__("Stagger Easing", "mello-block-extensions")}
											value={childAnimationStaggerEasing ?? 'easeOut'}
											options={easingOptions}
											onChange={(value) => setAttributes({ childAnimationStaggerEasing: value })}
											__next40pxDefaultSize
											__nextHasNoMarginBottom
											help={__("Used when staggering child elements; defaults to easeOut on the front end when unset.", "mello-block-extensions")}
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
												if (value !== 'spring') {
													setAttributes({ childAnimationSpringAmount: undefined });
												}
											}}
											__next40pxDefaultSize
											__nextHasNoMarginBottom
										/>
										{(childAnimationMethod ?? 'tween') === "tween" && (
											<SelectControl
												label={__("Child Animation Easing", "mello-block-extensions")}
												value={childAnimationEasing ?? 'circOut'}
												options={easingOptions}
												onChange={(value) => setAttributes({ childAnimationEasing: value })}
												__next40pxDefaultSize
												__nextHasNoMarginBottom
											/>
										)}
										{(childAnimationMethod ?? 'tween') === 'spring' && (
											<RangeControl
												__nextHasNoMarginBottom
												__next40pxDefaultSize
												label={__("Child Spring Amount", "mello-block-extensions")}
												value={Number.isFinite(childAnimationSpringAmount) ? childAnimationSpringAmount : 0.5}
												onChange={(value) => setAttributes({ childAnimationSpringAmount: value })}
												min={0}
												max={1}
												step={0.05}
												help={__("Higher = stronger spring (maps to Motion spring settings)", "mello-block-extensions")}
											/>
										)}
										<RangeControl
											__nextHasNoMarginBottom
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
													__nextHasNoMarginBottom
												/>
												<RangeControl
													__next40pxDefaultSize
													__nextHasNoMarginBottom
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
											__nextHasNoMarginBottom
										/>
										{childAnimationTrigger === "self" && (
											<RangeControl
												__nextHasNoMarginBottom
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
													__nextHasNoMarginBottom
													label={__("Custom Child Trigger Selector", "mello-block-extensions")}
													value={childAnimationCustomSelector}
													onChange={(value) => setAttributes({ childAnimationCustomSelector: value })}
													help={__("CSS selector for custom child trigger", "mello-block-extensions")}
												/>
												<RangeControl
													__nextHasNoMarginBottom
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
    if ( ! shouldEnableFor( blockType?.name ) ) {
        return extraProps;
    }
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
		childAnimationDelay,
		childAnimationStaggerDelay,
		childAnimationStaggerFrom,
		childAnimationStaggerEasing,
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
		animationSpringAmount,
		childAnimationMethod,
		childAnimationEasing,
		childAnimationRepeat,
		childAnimationRepeatType,
		childAnimationRepeatDelay,
		childAnimationSpringAmount,
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
		if ((animationMethod ?? 'tween') === 'spring' && Number.isFinite(animationSpringAmount)) {
			extraProps["data-animation-spring-amount"] = String(animationSpringAmount);
		}
		// Custom selector/config (existing guards)
		if (typeof animationTriggerCustomSelector === 'string' &&
			animationTriggerCustomSelector.trim() !== '' &&
			animationTrigger === 'custom') {
			extraProps["data-animation-trigger-custom-selector"] = animationTriggerCustomSelector;
		}

		if (animationType === 'custom' && animationCustomConfig) {
			try {
				let configToValidate = animationCustomConfig.trim();
				// Handle escaped strings for backwards compatibility
				if (!configToValidate.startsWith('{') && !configToValidate.startsWith('[')) {
					const decoded = JSON.parse(`"${configToValidate}"`);
					configToValidate = decoded.startsWith('{') || decoded.startsWith('[') ? decoded : `{${decoded}}`;
				}
				const parsed = JSON.parse(configToValidate);
				if (Array.isArray(parsed)) {
					// Timeline animation
					extraProps["data-animation-timeline"] = configToValidate;
					// Remove single-mode attribute if previously present
					delete extraProps["data-animation-config"];
				} else {
					// Single element animation
					extraProps["data-animation-config"] = configToValidate;
					// Remove timeline attribute if previously present
					delete extraProps["data-animation-timeline"];
				}
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
		delete extraProps["data-animation-timeline"];
		delete extraProps["data-animation-method"];
		delete extraProps["data-animation-easing"];
		delete extraProps["data-animation-repeat"];
		delete extraProps["data-animation-repeat-type"];
		delete extraProps["data-animation-repeat-delay"];
		delete extraProps["data-animation-spring-amount"];
	}

	if (animateChildren) {
		extraProps["data-child-animation"] = true;
		extraProps["data-child-animation-type"] = childAnimationType;
		extraProps["data-child-animation-duration"] = childAnimationDuration;
		extraProps["data-child-animation-delay"] = childAnimationDelay;
		extraProps["data-child-animation-stagger-delay"] = childAnimationStaggerDelay;
		if (typeof childAnimationStaggerFrom === 'string' && childAnimationStaggerFrom.trim() !== '') {
			extraProps["data-child-animation-stagger-from"] = childAnimationStaggerFrom;
		}
		if (typeof childAnimationStaggerEasing === 'string' && childAnimationStaggerEasing.trim() !== '') {
			extraProps["data-child-animation-stagger-easing"] = childAnimationStaggerEasing;
		}
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
		if ((childAnimationMethod ?? 'tween') === 'spring' && Number.isFinite(childAnimationSpringAmount)) {
			extraProps["data-child-animation-spring-amount"] = String(childAnimationSpringAmount);
		}

		if (typeof childAnimationCustomSelector === 'string' &&
			childAnimationCustomSelector.trim() !== '' &&
			childAnimationTrigger === 'custom') {
			extraProps["data-child-animation-custom-selector"] = childAnimationCustomSelector;
		}

		if (childAnimationType === 'custom' && childAnimationCustomConfig) {
			try {
				let configToValidate = childAnimationCustomConfig.trim();
				// Handle escaped strings for backwards compatibility
				if (!configToValidate.startsWith('{') && !configToValidate.startsWith('[')) {
					const decoded = JSON.parse(`"${configToValidate}"`);
					configToValidate = decoded.startsWith('{') || decoded.startsWith('[') ? decoded : `{${decoded}}`;
				}
				const parsed = JSON.parse(configToValidate);
				if (Array.isArray(parsed)) {
					// Timeline animation for children
					extraProps["data-child-animation-timeline"] = configToValidate;
					// Remove single-mode attribute if previously present
					delete extraProps["data-child-animation-config"];
				} else {
					// Single element animation for children
					extraProps["data-child-animation-config"] = configToValidate;
					// Remove timeline attribute if previously present
					delete extraProps["data-child-animation-timeline"];
				}
			} catch (err) {
				console.warn("Invalid custom child animation config", err);
			}
		}
	} else {
		delete extraProps["data-child-animation"];
		delete extraProps["data-child-animation-type"];
		delete extraProps["data-child-animation-duration"];
		delete extraProps["data-child-animation-delay"];
		delete extraProps["data-child-animation-stagger-delay"];
		delete extraProps["data-child-animation-stagger-from"];
		delete extraProps["data-child-animation-stagger-easing"];
		delete extraProps["data-child-animation-trigger"];
		delete extraProps["data-child-animation-trigger-point"];
		delete extraProps["data-child-animation-custom-selector"];
		delete extraProps["data-child-animation-config"];
		delete extraProps["data-child-animation-timeline"];
		delete extraProps["data-child-animation-method"];
		delete extraProps["data-child-animation-easing"];
		delete extraProps["data-child-animation-repeat"];
		delete extraProps["data-child-animation-repeat-type"];
		delete extraProps["data-child-animation-repeat-delay"];
		delete extraProps["data-child-animation-spring-amount"];
	}

	return extraProps;
}

addFilter(
	"blocks.getSaveContent.extraProps",
	"mello-block-extensions/add-save-props",
	addSaveProps
);