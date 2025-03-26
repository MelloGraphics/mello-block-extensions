const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Build entries for extensions: gather both JS and SCSS files
const buildExtensionEntries = () => {
    const entries = {};

    // Collect JavaScript entries (e.g., edit.js, frontend.js, styles.js)
    const jsFiles = glob.sync(path.resolve(__dirname, '../src/extensions/**/+(edit.js|frontend.js|styles.js)'));
    jsFiles.forEach(file => {
        const baseDir = path.resolve(__dirname, '../src/extensions');
        const relativePath = path.relative(baseDir, file);
        const parsed = path.parse(relativePath);
        const entryName = path.join(parsed.dir, parsed.name);
        entries[entryName] = file;
    });

    // Collect SCSS entries (styles.scss and editor.scss), renaming editor.scss to edit.css
    const styleFiles = glob.sync(path.resolve(__dirname, '../src/extensions/**/+(styles.scss|editor.scss)'));
    styleFiles.forEach(file => {
        const baseDir = path.resolve(__dirname, '../src/extensions');
        const relativePath = path.relative(baseDir, file);
        const parsed = path.parse(relativePath);
        let outputName = parsed.name;
        if (parsed.name === 'editor') {
            outputName = 'edit';
        }
        const entryName = path.join(path.dirname(relativePath), outputName);
        entries[entryName] = file;
    });

    return entries;
};

module.exports = {
    mode: 'development',
    entry: buildExtensionEntries(),
    output: {
        path: path.resolve(__dirname, '../build/extensions'),
        filename: '[name].js',
        clean: true,
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/extensions/**/*.{php,json}'),
                    to({ context, absoluteFilename }) {
                        const baseDir = path.resolve(__dirname, '../src/extensions');
                        const relativePath = path.relative(baseDir, absoluteFilename);
                        return path.resolve(__dirname, '../build/extensions', relativePath);
                    },
                },
            ],
        }),
    ],
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
};