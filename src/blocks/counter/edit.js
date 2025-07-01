import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, TextControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const { startingFigure, counterDuration, showDecimals, counterTriggerPoint } = attributes;

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Settings", "counter")}>
          <TextControl
            __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
            label={__("Starting Figure", "counter")}
            type="number"
            value={startingFigure}
            onChange={(val) =>
              setAttributes({ startingFigure: parseFloat(val) })
            }
          />
          <ToggleControl
          __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
            label={__("Show Decimals", "counter")}
            checked={showDecimals}
            onChange={(val) => setAttributes({ showDecimals: val })}
          />
          <RangeControl
          __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
            label={__("Animation Duration (s)", "counter")}
            min={0.5}
            max={10}
            step={0.1}
            value={counterDuration}
            onChange={(val) => setAttributes({ counterDuration: val })}
          />
          <RangeControl
          __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
            label={__("Trigger Point", "counter")}
            value={counterTriggerPoint}
            onChange={(value) => setAttributes({ counterTriggerPoint: value })}
            min={-100}
            max={0}
            step={5}
            marks={[
              { value: -50, label: __("Center", "counter") },
              { value: -100, label: __("Top", "counter") },
              { value: 0, label: __("Bottom", "counter") },
            ]}
          />
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps()}>
        <InnerBlocks
          allowedBlocks={['core/paragraph', 'core/group', 'core/image']}
          template={[
            [
              'core/group',
              {
                className: 'wp-block-mello-block-counter__figure-wrapper',
                layout: { type: 'flex', flexWrap: 'nowrap', verticalAlignment: 'top' },
                metadata: { name: 'figure wrapper' },
              },
              [
                [
                  'core/paragraph',
                  {
                    placeholder: '123',
                    className: 'wp-block-mello-block-counter__figure',
                    lock: { move: false, remove: true },
                    metadata: { name: 'figure' },
                  },
                ],
                [
                  'core/paragraph',
                  {
                    placeholder: 'unit',
                    className: 'wp-block-mello-block-counter__metric',
                    lock: { move: false, remove: true },
                    metadata: { name: 'metric' },
                  },
                ],
              ],
            ],
            [
              'core/paragraph',
              {
                placeholder: 'Descriptive text goes here',
                className: 'wp-block-mello-block-counter__description',
                lock: { move: false, remove: true },
                metadata: { name: 'description' },
              },
            ],
          ]}
          templateLock={false}
        />
      </div>
    </>
  );
}
