Help Rollup

Install basic dependencies
```bash
$ npm install -D rollup-plugin-svelte rollup-plugin-terser @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript
```

Install CSS dependencies
```bash
$ npm install --save-dev rollup-plugin-css-only rollup-plugin-postcss
```

Install another plugin to replace non-browser specific APIs. Eg `process` in `process.env.NODE_ENV` 
```
npm install @rollup/plugin-replace --save-dev
```



```js
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
      { file: 'dist_/index.mjs', format: 'es',, sourcemap: true },
      //file must be saved as cjs because the package.json of this project has set package type to "module".
      // So Common js packages can't import it until it is cjs file
      { file: 'dist_/index.cjs', format: 'cjs', sourcemap: true } 
      {
        file: 'dist_/index.js',
        format: 'iife',  // IIFE format exposes to global scope
        name: 'Text2Chart', // This will expose your component globally as 'FlowChartLib'
        globals: {
          'svelte': 'Svelte' // if you use Svelte as a dependency
        }
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
      typescript({ outDir: 'dist_' }),
      terser()
    ]
  }
];
```

Run `npx rollup -c` or `npm run bundle` to create output bundle in `_dist` folder.


---

Use `postcss` for advance CSS use

```js
// rollup.config.js
//...
import postcss from 'rollup-plugin-postcss';

export default {
  //...
  plugins: [
    svelte(),
    postcss({
      extract: true,             // Extracts CSS into a separate file
      minimize: true,            // Minifies the CSS for production
      sourceMap: true            // Adds a source map for easier debugging
    }),
    //...
  ]
};

```