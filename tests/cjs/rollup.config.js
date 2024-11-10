// rollup.config.js
const css = require('rollup-plugin-css-only');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');

module.exports = [
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/main.min.js',
        format: 'iife',  // IIFE format exposes to global scope
        name: 'Text2Chart', // This will expose your component globally as 'FlowChartLib'
        // globals: {
        //   'svelte': 'Svelte' // if you use Svelte as a dependency
        // }, 
        sourcemap: true
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'), // Replace with production environment
        preventAssignment: true // Required to avoid certain warnings
      }),
      // svelte(),
      css({ output: 'bundle.css' }), // Output collected CSS into a single file
      resolve({
        browser: true, // Ensure that dependencies can be resolved for the browser
      }),
      commonjs(),
    ]
  }
];
