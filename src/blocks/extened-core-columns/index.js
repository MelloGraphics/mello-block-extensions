import { addFilter } from '@wordpress/hooks';
import { withInspectorControl } from './edit';
import { addSaveProps } from './save';
// Add isDraggable attribute to core/button block
const addAttributes = (settings, name) => {
    if (name !== 'core/columns') {
        return settings;
    }

    const newAttributes = {
        isPhoneReversed: {
            type: 'boolean',
            default: false,
        }
    };

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            ...newAttributes,
        },
    };
};

addFilter('blocks.registerBlockType', 'mello/add-save-props/add-attributes', addAttributes, 10);

// Apply the custom class if the toggle is enabled
addFilter('blocks.getSaveContent.extraProps', 'mello/add-save-props/add-save-props', addSaveProps, 10);

// Add inspector controls for draggable button
addFilter('editor.BlockEdit', 'mello/add-save-props/with-inspector-control', withInspectorControl, 10);

import './editor.scss';
import './styles.scss';

