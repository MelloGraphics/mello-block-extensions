import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function save() {
  return (
    <div
      {...useBlockProps.save({
        "data-starting-figure": attributes.startingFigure,
        "data-animation-duration": attributes.animationDuration,
      })}
    >
      {" "}
      <InnerBlocks.Content />
    </div>
  );
}
