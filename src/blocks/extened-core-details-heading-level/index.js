import { InspectorControls } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import './editor.scss'; // Import custom styles

const addHeadingLevelControl = ( BlockEdit ) => ( props ) => {
	if ( props.name !== 'core/details' ) {
		return <BlockEdit {...props} />;
	}

	const { attributes, setAttributes } = props;
	const { level } = attributes;

	const onLevelChange = ( newLevel ) => {
		setAttributes( { level: newLevel } );
	};

	return (
		<>
			<BlockEdit {...props} />
			<InspectorControls>
				<SelectControl
					label={__('Heading Level', 'heading-level')}
					value={level}
					options={[
						{ label: __('Unset', 'heading-level'), value: 'Unset' },
						{ label: __('H2', 'heading-level'), value: '2' },
						{ label: __('H3', 'heading-level'), value: '3' },
						{ label: __('H4', 'heading-level'), value: '4' },
						{ label: __('H5', 'heading-level'), value: '5' },
						{ label: __('H6', 'heading-level'), value: '6' },
					]}
					onChange={onLevelChange}
				/>
			</InspectorControls>
		</>
	);
};

addFilter( 'editor.BlockEdit', 'heading-level/inspector-controls', addHeadingLevelControl );
