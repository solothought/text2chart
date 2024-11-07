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

This will also build static site to "build" folder that can be launched in browser. Github pages config need to set from a folder to launch it as `solothought.com/text2chart/flow`

