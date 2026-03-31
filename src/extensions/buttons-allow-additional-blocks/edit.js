/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Additional blocks to allow inside the core/buttons block.
 * Add or remove block names from this array to control what can be inserted.
 */
const additionalAllowedBlocks = [
    'core/paragraph',
];

/**
 * Extend core/buttons to allow additional blocks alongside core/button.
 *
 * @param {Object} settings - The block settings.
 * @returns {Object} The modified block settings.
 */
function addAllowedBlocks(settings) {
    if (settings.name !== 'core/buttons') {
        return settings;
    }

    const existingAllowed = settings.allowedBlocks || ['core/button'];

    return {
        ...settings,
        allowedBlocks: [
            ...existingAllowed,
            ...additionalAllowedBlocks.filter((block) => !existingAllowed.includes(block)),
        ],
    };
}

addFilter(
    'blocks.registerBlockType',
    'mello/buttons-allow-additional-blocks',
    addAllowedBlocks,
    10
);
