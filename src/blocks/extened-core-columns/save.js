// Apply the custom class if the toggle is enabled
export const addSaveProps = (extraProps, blockType, attributes) => {
    if (blockType.name !== 'core/columns') {
        return extraProps;
    }
    if (attributes.isPhoneReversed) {
        extraProps.className = `${extraProps.className} mello-columns-reverse-on-phone`;
    }
    return extraProps;
};