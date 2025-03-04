/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Add the attribute and modify the allowedBlocks properties
 * on navigation blocks.
 *
 * @param {Object} settings
 */
function addAttributes(settings) {
    if (settings.name !== 'core/navigation') {
        return settings;
    }

    // Optionally modify allowedBlocks to include 'core/group', 'core/columns', and 'core/column'
    const newAllowedBlocks = settings.allowedBlocks ? [...settings.allowedBlocks, 'core/paragraph', 'core/heading', 'core/group', 'core/columns', 'core/column'] : ['core/group', 'core/columns', 'core/column'];

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
        },
        allowedBlocks: newAllowedBlocks, // Set or merge with existing allowedBlocks settings
    };
}

addFilter(
    'blocks.registerBlockType',
    'extend-navigation-/add-media-attributes',
    addAttributes
);
