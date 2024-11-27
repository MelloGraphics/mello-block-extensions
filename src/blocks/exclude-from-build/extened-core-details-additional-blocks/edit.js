import { InnerBlocks, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const details_edit_TEMPLATE = [['core/paragraph', {
  placeholder: __('Type / to add a hidden block')
}]];

const DetailsEdit = ({ attributes, setAttributes, clientId }) => {
  const { showContent, summary } = attributes;

  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    template: details_edit_TEMPLATE,
    __experimentalCaptureToolbars: true,
  });

  const hasSelection = useSelect((select) => {
    const { isBlockSelected, hasSelectedInnerBlock } = select('core/block-editor');
    return hasSelectedInnerBlock(clientId, true) || isBlockSelected(clientId);
  }, [clientId]);

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Settings')}>
          <ToggleControl
            label={__('Open by default')}
            checked={showContent}
            onChange={() => setAttributes({ showContent: !showContent })}
          />
        </PanelBody>
      </InspectorControls>

      <details {...innerBlocksProps} open={hasSelection || showContent}>
        <summary>
          {/* Use RichText for summary, allow adding inner blocks */}
          <RichText
            identifier="summary"
            aria-label={__('Write summary')}
            placeholder={__('Write summary…')}
            allowedFormats={[]}
            withoutInteractiveFormatting={true}
            value={summary}
            onChange={(newSummary) => setAttributes({ summary: newSummary })}
          />
          {/* Render InnerBlocks inside the summary */}
          <InnerBlocks allowedBlocks={['core/paragraph', 'core/heading']} />
        </summary>
        <InnerBlocks.Content />
      </details>
    </>
  );
};

export default DetailsEdit;
