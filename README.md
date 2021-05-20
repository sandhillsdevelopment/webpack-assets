# webpack Asset Handling Example

Utilize [webpack](https://webpack.js.org/), [`@wordpress/scripts`](https://www.npmjs.com/package/@wordpress/scripts), and [wp-cli](https://wp-cli.org/) to manage WordPress assets.

## Available Scripts

### `build`

Transforms your code according the configuration provided so it’s ready for production and optimized for the best performance. The output generated will be written to `assets/build`. This script exits after producing a single build. For incremental builds, better suited for development, see the [`start`](#start) script.

### `format`

It helps to enforce coding style guidelines for your files (JavaScript, YAML) by formatting source code in a consistent way.

### `i18n`

Generates a `.pot` translation file.

### `lint:js`

Helps enforce coding style guidelines for your JavaScript files.

### `lint:pkg-json`

Helps enforce standards for your `package.json` files.

### `lint:style`

Helps enforce coding style guidelines for your style files.

### `start`

Transforms your code according the configuration provided so it’s ready for development. The script will automatically rebuild if you make changes to the code, and you will see the build errors in the console. The output generated will be writen to `assets/build`. For single builds, better suited for production, see the [`build`](#build) script.

## Assumptions

### wp-cli

The [`i18n`](#i18n) script requires [wp-cli](https://wp-cli.org) and the [`wp-cli/i18n-command](https://github.com/wp-cli/i18n-command) to be available in the current environment.

### WordPress < 5.0 Support

The [`build`](#build) and [`start`](#start) execute with [`--webpack-no-externals`](https://github.com/WordPress/gutenberg/tree/trunk/packages/scripts#build) to ensure `@wordpress/*` packages are included within the bundle as they are not available to enqueue via `wp-` script handles in WordPress < 5.0.

Remove `--webpack-no-externals` from [`build`](#build) and [`start`](#start) to generate script asset files to manage `@wordpress/*` dependencies and exclude them from the bundle.

### Style-only Entry Points

To align with current practices of separate JavaScript and CSS webpack is set up to process entry points that contain only CSS. Style-only entry point names must be prefixed with `style-` to ensure additional/unused `.js` files are not emitted for the entry point.

### Single Build Directory

To help reduce complexity within `webpack.config.js` all emitted assets are output in a single `assets/build` directory.

Existing plugins should have assets managed via `wp_register_script()` or `wp_enqueue_script()` so the location of the asset can be changed freely.

### Untracked Build Directory

Because [`build`](#build) and [`start`](#start) generate different versions of files and emit different file sets the `assets/build` directory is ignored and untracked. A direct clone of this repository requires users to run either `npm run build` or `npm run start`.

If asset tracking is required it is recommended to update the [`start`](#start) script to run in production mode to reduce the likely hood of merge conflicts (which will still happen frequently with tracked assets). This can be achieved with [`cross-env`](https://www.npmjs.com/package/cross-env); i.e `cross-env NODE_ENV=production wp-scripts start`

---

This project was created by (and is managed by) <a href="https://sandhillsdev.com">Sandhills Development, LLC</a>, where we aim to craft superior experiences through ingenuity, with <a href="https://sandhillsdev.com/commitments/">deep commitment</a> to (and appreciation for) the human element.
