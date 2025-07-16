import { BlockControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Dashicon, Popover, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useRef, useState } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

// Add a `link` attribute to the group block
const addGroupLinkAttribute = (settings, name) => {
	if (name !== 'core/group') return settings;

	return {
		...settings,
		attributes: {
			...settings.attributes,
			link: {
				type: 'object',
				default: {
					url: '',
					opensInNewTab: false
				}
			}
		}
	};
};
addFilter('blocks.registerBlockType', 'mello/group-link-attr', addGroupLinkAttribute);

// Add the link toolbar UI
const withGroupLinkToolbar = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, isSelected, attributes, setAttributes } = props;
		if (name !== 'core/group') return <BlockEdit {...props} />;

		const [isLinkUIVisible, setIsLinkUIVisible] = useState(false);
		const { link = {} } = attributes;
		const anchorRef = useRef();

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && (
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								ref={anchorRef}
								icon={<Dashicon icon="admin-links" />}
								label={link?.url ? __('Edit link') : __('Add link')}
								onClick={() => setIsLinkUIVisible(!isLinkUIVisible)}
								isPressed={isLinkUIVisible}
							/>
							{link?.url && (
								<ToolbarButton
									icon={<Dashicon icon="editor-unlink" />}
									label={__('Remove link')}
									onClick={() => {
										setAttributes({ link: { url: '', opensInNewTab: false } });
										setIsLinkUIVisible(false);
									}}
								/>
							)}
						</ToolbarGroup>
					</BlockControls>
				)}
				{isLinkUIVisible && (
					<Popover position="bottom center" anchor={anchorRef.current} onClose={() => setIsLinkUIVisible(false)}>
						<LinkControl
							searchInputPlaceholder="Search or paste URL"
							value={link}
							onChange={(nextValue) => setAttributes({ link: nextValue })}
						/>
					</Popover>
				)}
			</Fragment>
		);
	};
}, 'withGroupLinkToolbar');

addFilter('editor.BlockEdit', 'mello/group-link-toolbar', withGroupLinkToolbar);