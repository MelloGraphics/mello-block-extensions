const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const glob = require('glob');

module.exports = {
    ...defaultConfig,
    entry: {
        'view': glob.sync(path.resolve(__dirname, 'src/blocks/**/frontend.js'), {
            ignore: [path.resolve(__dirname, 'src/blocks/exclude-from-build/**')]
        }),
        'editor': glob.sync(path.resolve(__dirname, 'src/blocks/**/edit.js'), {
            ignore: [path.resolve(__dirname, 'src/blocks/exclude-from-build/**')]
        }),
        'frontend': glob.sync(path.resolve(__dirname, 'src/blocks/**/styles.scss'), {
            ignore: [path.resolve(__dirname, 'src/blocks/exclude-from-build/**')]
        }),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
};
