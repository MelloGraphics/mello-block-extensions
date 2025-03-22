/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Add the attribute and modify the parent block and allowedBlocks properties
 * on navigation-link blocks.
 *
 * @param {Object} settings
 */
function addAttributes(settings) {
    if (settings.name !== 'core/navigation-link') {
        return settings;
    }

    // Optionally modify the parent property to include 'core/group', 'core/columns', and 'core/column'
    const newParent = settings.parent ? [...settings.parent, 'core/group', 'core/columns', 'core/column'] : ['core/group', 'core/columns', 'core/column'];

    // Optionally modify allowedBlocks to include 'core/group', 'core/columns', and 'core/column'
    const newAllowedBlocks = settings.allowedBlocks ? [...settings.allowedBlocks, 'core/group', 'core/columns', 'core/column'] : ['core/group', 'core/columns', 'core/column'];

    // Extend supports settings with experimental background settings
    const newSupports = {
        ...settings.supports,
        __experimentalSettings: true,
        background: {
            backgroundImage: true,
            backgroundSize: true,
            __experimentalDefaultControls: {
                backgroundImage: true,
            },
        },
    };

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
        },
        parent: newParent, // Set or merge with existing parent settings
        allowedBlocks: newAllowedBlocks, // Set or merge with existing allowedBlocks settings
        supports: newSupports, // Set or merge with existing supports settings
    };
}

addFilter(
    'blocks.registerBlockType',
    'extend-navigation-link/add-media-attributes',
    addAttributes
);
