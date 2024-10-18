import { addFilter } from '@wordpress/hooks';
import addAttributes from './edit';
import './editor.scss';
import addSaveContent from './save';
import './styles.scss';

// Extend the block to add new attributes
addFilter(
    'blocks.registerBlockType',
    'mello/extend-cover-block',
    addAttributes
);

// Add save logic to handle front-end rendering
addFilter(
    'blocks.getSaveElement',
    'mello/add-save-content',
    addSaveContent
);
