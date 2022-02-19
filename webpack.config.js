const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
	const mode = env.mode || 'development';
	const isProd = mode === 'production';

	return {
		entry: {
			'build/bundle': [`./src/main.js`]
		},
		resolve: {
			alias: {
				svelte: path.dirname(require.resolve('svelte/package.json'))
			},
			extensions: ['.mjs', '.js', '.svelte'],
			mainFields: ['svelte', 'browser', 'module', 'main']
		},
		output: {
			path: path.join(__dirname, '/public'),
			filename: '[name].js',
			chunkFilename: '[name].[id].js'
		},
		module: {
			rules: [
				{
					test: /\.svelte$/,
					use: {
						loader: 'svelte-loader',
						options: {
							compilerOptions: {
								dev: !isProd
							},
							emitCss: isProd,
							hotReload: !isProd
						}
					}
				},
				{
					// required to prevent errors from Svelte on Webpack 5+
					test: /node_modules\/svelte\/.*\.mjs$/,
					resolve: {
						fullySpecified: false
					}
				},
				{
					test: /\.(sa|sc|c)ss$/i,
					use: [
						!isProd ? "style-loader" : MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader",
					],
				},
			]
		},
		mode,
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css'
			}),
			new webpack.DefinePlugin({
				WEBPACK_OVERRIDE_PRODUCTION: JSON.stringify(isProd)
			})
		],
		devtool: isProd ? false : 'source-map',
		devServer: {
			hot: true
		}
	};
};