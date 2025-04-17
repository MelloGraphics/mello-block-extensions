import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, TextControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const { startingFigure, animationDuration, showDecimals } = attributes;

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Settings", "counter")}>
          <TextControl
            label={__("Starting Figure", "counter")}
            type="number"
            value={startingFigure}
            onChange={(val) =>
              setAttributes({ startingFigure: parseFloat(val) })
            }
          />
          <RangeControl
            label={__("Animation Duration (s)", "counter")}
            min={0.5}
            max={10}
            step={0.1}
            value={animationDuration}
            onChange={(val) => setAttributes({ animationDuration: val })}
          />
          <ToggleControl
            label={__("Show Decimals", "counter")}
            checked={showDecimals}
            onChange={(val) => setAttributes({ showDecimals: val })}
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
