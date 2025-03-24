import { useBlockProps } from '@wordpress/block-editor';

const Edit = ({ context }) => {
    const postType = context?.postType || 'Unknown';

    return (
        <p {...useBlockProps()}>{postType}</p>
    );
};

export default Edit;