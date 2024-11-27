import { InnerBlocks, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { summary, showContent } = attributes;

  return (
    <details open={showContent}>
      <summary>
        <RichText.Content value={summary} />
        {/* Render inner blocks here for summary */}
        <InnerBlocks.Content />
      </summary>
      {/* Render other content here if needed */}
      <InnerBlocks.Content />
    </details>
  );
};

export default Save;
