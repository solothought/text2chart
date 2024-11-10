# Initial Setup
Everything you need to build a Svelte library, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

Read more about creating a library [in the docs](https://kit.svelte.dev/docs/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

# Development

## Project structure
- Everything inside `src/lib` is part of library, 
- Everything inside `src/routes` can be used as a showcase or preview app.

## Local build
```bash
# start the server to test current changes
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```
This will copy the contents to `dist` folder which is referred from `package.json` so that any other package can use this as their dependency.


You can preview the production build with `npm run preview`.

## Deploy
Since Github pages config supports only root folder or "/docs" folder, we are building the static site to docs folder. 

```bash
npm run build
```

This will build static site to "docs" folder, as configured in `svelte.config.js`. This can be launched in browser.

## Publish

To publish it on npm, run `npm run package`. It'll generate all require files in `dist` folder. `files` property in `package.json` has the list of files to be published. So if you're referring any image in README.md, remember to include it in `files`.

# Testing

CJS testing
```bash
$ npm run bundle
```

This will generate `dist_/text2chart.min.js` and `text2chart.min.mjs` files. Open `_dist\index.html` in browser to test cjs module.