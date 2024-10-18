import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// Create a higher-order component to add the toggle control in the inspector
export const withInspectorControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { name, attributes, setAttributes } = props;
        const { level, isPhoneReversed } = attributes;

        if (name !== 'core/columns' ) {
            return <BlockEdit {...props} />;
        }

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <div className="enable-reverse-direction-container">
                    <ToggleControl
                        label={__('Reverse layout on phone', 'text-domain')}
                        checked={isPhoneReversed}
                        onChange={(value) => setAttributes({ isPhoneReversed: value })}
                    />
                    </div>
                </InspectorControls>

            </Fragment>
        );
    };
}, 'withInspectorControl');
