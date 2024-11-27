import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';

registerBlockType('your-namespace/extended-core-details', {
  apiVersion: 2,
  title: 'Extended Core Details',
  category: 'common',
  icon: 'visibility',
  supports: {
    // Add any support options you need here
  },
  edit: Edit,
  save: Save,
});
