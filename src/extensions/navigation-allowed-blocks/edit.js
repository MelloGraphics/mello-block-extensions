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
    const targetBlocks = ['core/navigation-submenu', 'core/navigation-link'];

    if (!targetBlocks.includes(settings.name)) {
        return settings;
    }

    const newAllowedBlocks = ['core/paragraph', 'core/heading', 'core/group', 'core/columns'];

    return {
        ...settings,
        allowedBlocks: newAllowedBlocks,
    };
}

/**
 * Add supports.inserter property to the core/navigation-submenu block.
 *
 * @param {Object} settings - The block settings.
 * @returns {Object} The modified block settings.
 */
function addSupportsInserter(settings) {
    const targetBlocks = ['core/navigation-submenu', 'core/navigation-link'];

    if (!targetBlocks.includes(settings.name)) {
        return settings;
    }

    return {
        ...settings,
        supports: {
            ...settings.supports,
            inserter: true,
        },
    };
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