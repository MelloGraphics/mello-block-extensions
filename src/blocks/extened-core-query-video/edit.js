// edit.js
import { useBlockProps } from '@wordpress/block-editor';

const Edit = () => {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <p>Edit your Extended Core Query Video block.</p>
        </div>
    );
};

export default Edit;
