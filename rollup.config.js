// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: 'src/lib/index.js',
    output: [
      { file: 'dist_/index.mjs', format: 'es', sourcemap: true },
      { file: 'dist_/index.cjs', format: 'cjs', sourcemap: true },
      {
        file: 'dist_/text2chart.min.js',
        format: 'iife',  // IIFE format exposes to global scope
        name: 'Text2Chart', // This will expose your component globally as 'Text2Chart'
        globals: {
          'svelte': 'Svelte' // if you use Svelte as a dependency
        },
        sourcemap: true
      },{
        file: 'static/cdn/text2chart.min.js', //for iframe purpose
        format: 'iife',  // IIFE format exposes to global scope
        name: 'Text2Chart', // This will expose your component globally as 'Text2Chart'
        globals: {
          'svelte': 'Svelte' // if you use Svelte as a dependency
        },
        sourcemap: true
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'), // Replace with production environment
        preventAssignment: true // Required to avoid certain warnings
      }),
      svelte(),
      css({ output: 'bundle.css' }), // Output collected CSS into a single file
      resolve({
        browser: true, // Ensure that dependencies can be resolved for the browser
        dedupe: ['svelte'] // Avoid duplicate Svelte instances
      }),
      commonjs(),
      // typescript({ outDir: 'dist_' }),
      terser()
    ]
  }
];
