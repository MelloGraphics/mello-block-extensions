const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const glob = require('glob');

module.exports = {
    ...defaultConfig,
    entry: {
        // Combine all frontend.js files into a single entry point for frontend js, excluding 'exclude from build' folder
        'view': glob.sync('./src/blocks/**/frontend.js', {
            ignore: ['./src/blocks/exclude-from-build/**']
        }),
        // Combine all edit.js files into a single entry point for editor js, excluding 'exclude from build' folder
        'editor': glob.sync('./src/blocks/**/edit.js', {
            ignore: ['./src/blocks/exclude-from-build/**']
        }),
        // Combine all styles.scss files into a single entry point for frontend styling, excluding 'exclude from build' folder
        'frontend': glob.sync('./src/blocks/**/styles.scss', {
            ignore: ['./src/blocks/exclude-from-build/**']
        }),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
};
