/**
 * External dependencies
 */
const path = require( 'path' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );
const MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' );

/**
 * WordPress dependencies.
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const cwd = process.cwd();

module.exports = {
	...defaultConfig,
	entry: {
		// Scripts.
		index: path.resolve( cwd, 'assets/js/src', 'index.js' ),

		// Styles.
		'index-style': path.resolve( cwd, 'assets/css/src', 'style.scss' ),
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( process.cwd(), 'assets/js/build' ),
	},
	plugins: [
		...defaultConfig.plugins,
		new FixStyleOnlyEntriesPlugin(),
		new MiniCSSExtractPlugin( {
			esModule: false,
			moduleFilename: ( chunk ) =>
				path.resolve(
					cwd,
					`assets/css/${ chunk.name.replace( '-style', '' ) }.css`
				),
		} ),
	],
};
