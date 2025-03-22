const path = require('path');
const glob = require('glob');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Utility to build entries per block
const buildEntries = () => {
    const entries = {};

    const files = glob.sync(path.resolve(__dirname, 'src/blocks/**/+(edit.js|frontend.js|styles.scss)'), {
        ignore: [path.resolve(__dirname, 'src/blocks/exclude-from-build/**')]
    });

    files.forEach(file => {
        const relativePath = path.relative(path.resolve(__dirname, 'src/blocks'), file);
        const parsed = path.parse(relativePath);

        // e.g. extend-core-cover-ext-video/edit
        const entryName = path.join(parsed.dir, parsed.name);
        entries[entryName] = file;
    });

    return entries;
};

module.exports = {
    ...defaultConfig,
    entry: buildEntries(),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        library: ['melloBlocks', '[name]'],
        libraryTarget: 'window',
        iife: true,
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        '@wordpress/blocks': ['wp', 'blocks'],
        '@wordpress/i18n': ['wp', 'i18n'],
        '@wordpress/element': ['wp', 'element'],
        '@wordpress/components': ['wp', 'components'],
        '@wordpress/block-editor': ['wp', 'blockEditor'],
        '@wordpress/compose': ['wp', 'compose'],
        '@wordpress/hooks': ['wp', 'hooks'],
        '@wordpress/data': ['wp', 'data'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [require.resolve('@wordpress/babel-preset-default')],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
};
