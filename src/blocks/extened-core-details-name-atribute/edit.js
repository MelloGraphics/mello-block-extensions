/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
// import './editor.scss';

/**
 * Add the attribute for a name tag to the core/details block.
 *
 * @param {Object} settings Block settings.
 */
function addAttributes( settings ) {
	if ( 'core/details' !== settings.name ) {
		return settings;
	}

	// Add the attribute.
	const detailsAttributes = {
		nameTag: {
			type: 'string',
			default: '',
		},
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...detailsAttributes,
		},
	};

	return newSettings;
}

addFilter(
	'blocks.registerBlockType',
	'enable-details/add-attributes',
	addAttributes
);

/**
 * Add InspectorControls to the core/details block to set the name tag.
 *
 * @param {Object} BlockEdit Block edit component.
 */
function addInspectorControls( BlockEdit ) {
	return ( props ) => {
		if ( props.name !== 'core/details' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const { nameTag } = attributes;

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody title={ __( 'Tag Name', 'enable-details' ) } initialOpen={ false }>
						<div className="enable-details-name-tag-container">
							<TextControl
								label={ __( 'Name Tag', 'enable-details' ) }
								value={ nameTag }
								onChange={ ( value ) => setAttributes( { nameTag: value } ) }
							/>
							<p className="description">
								{ __( 'Details with the same name tag will auto close when another one opens.', 'enable-details' ) }
							</p>
						</div>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}

addFilter(
	'editor.BlockEdit',
	'enable-details/add-inspector-controls',
	addInspectorControls
);

/**
 * Add the name tag rendering to the front-end save function.
 *
 * @param {Object} extraProps Block properties.
 * @param {Object} blockType Block type.
 * @param {Object} attributes Block attributes.
 */
function addSaveProps( extraProps, blockType, attributes ) {
	if ( blockType.name === 'core/details' && attributes.nameTag ) {
		// Add the name tag rendering on the front-end.
		if ( ! extraProps.className ) {
			extraProps.className = '';
		}
		// Add the nameTag as an attribute to the <details> element.
		extraProps.name = attributes.nameTag;
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'enable-details/add-save-props',
	addSaveProps
);
