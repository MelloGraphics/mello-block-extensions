import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import './editor.scss'; // Import custom styles

const addFAQSchemaControl = ( BlockEdit ) => ( props ) => {
	if ( props.name !== 'core/details' ) {
		return <BlockEdit {...props} />;
	}

	const { attributes, setAttributes } = props;
	const { hasFAQSchema } = attributes;

	const onToggleChange = () => {
		setAttributes( { hasFAQSchema: !hasFAQSchema } );
	};

	return (
		<>
			<BlockEdit {...props} />
			<InspectorControls>
			<div class="enable-faq-schema-container">
				<ToggleControl
					label={__('Enable FAQ Schema', 'enable-faq-schema')}
					checked={hasFAQSchema}
					onChange={onToggleChange}
				/>
			</div>
			</InspectorControls>
		</>
	);
};

addFilter( 'editor.BlockEdit', 'enable-faq-schema/inspector-controls', addFAQSchemaControl );
