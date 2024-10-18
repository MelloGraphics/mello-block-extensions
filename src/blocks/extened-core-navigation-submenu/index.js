/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Add allowedBlocks property to the core/navigation-submenu block.
 *
 * @param {Object} settings - The block settings.
 * @returns {Object} The modified block settings.
 */
function addAllowedBlocks(settings) {
    if (settings.name !== 'core/navigation-submenu') {
        return settings;
    }

    const newAllowedBlocks = ['core/navigation-link', 'core/navigation-submenu', 'core/page-list', 'core/list-item'];

    const modifiedSettings = {
        ...settings,
        allowedBlocks: newAllowedBlocks,
    };

    // Log modified settings for debugging purposes.
    console.log('Modified settings for core/navigation-submenu (allowedBlocks):', modifiedSettings);

    return modifiedSettings;
}

/**
 * Add supports.inserter property to the core/navigation-submenu block.
 *
 * @param {Object} settings - The block settings.
 * @returns {Object} The modified block settings.
 */
function addSupportsInserter(settings) {
    if (settings.name !== 'core/navigation-submenu') {
        return settings;
    }

    const modifiedSettings = {
        ...settings,
        supports: {
            ...settings.supports,
            inserter: true,
        },
    };

    // Log modified settings for debugging purposes.
    console.log('Modified settings for core/navigation-submenu (supports):', modifiedSettings);

    return modifiedSettings;
}

// Add filters to modify block settings
addFilter(
    'blocks.registerBlockType',
    'extend-navigation-submenu/add-allowed-blocks',
    addAllowedBlocks,
    10
);

addFilter(
    'blocks.registerBlockType',
    'extend-navigation-submenu/add-supports-inserter',
    addSupportsInserter,
    10
);
