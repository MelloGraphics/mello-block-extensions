const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins,
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../src/blocks/**/block-functions.php'),
					to({ context, absoluteFilename }) {
						const relativePath = path.relative(
							path.resolve(__dirname, '../src/blocks'),
							absoluteFilename
						);
						return path.resolve(__dirname, '../build/blocks', relativePath);
					},
				},
			],
		}),
	],
};