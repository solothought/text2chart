// rollup.config.js
const css = require('rollup-plugin-css-only');
const resolve = require('@rollup/plugin-node-resolve');
// const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');

module.exports = [
  {
    input: 'main.js',
    output: [ { file: 'dist/bundle.mjs', format: 'es', sourcemap: true  } ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'), // Replace with production environment
        preventAssignment: true // Required to avoid certain warnings
      }),
      css({ output: 'bundle.css' }), // Output collected CSS into a single file
      resolve({
        // browser: true, // Ensure that dependencies can be resolved for the browser
      }),
      // commonjs(),
    ]
  }
];
