```
$ npx sv create
Need to install the following packages:
sv@0.6.1
Ok to proceed? (y) 
┌  Welcome to the Svelte CLI! (v0.6.1)
│
◇  Where would you like your project to be created?
│  ./
│
◇  Which template would you like?
│  Svelte library
│
◇  Add type checking with Typescript?
│  Yes, using Javascript with JSDoc comments
│
◆  Project created
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  none
│
◇  Which package manager do you want to install dependencies with?
│  npm
│
◐  Installing dependencies.

◇  Successfully installed dependencies
│
◇  Project next steps ─────────────────────────────────────────────────────╮
│                                                                          │
│  1: git init && git add -A && git commit -m "Initial commit" (optional)  │
│  2: npm run dev -- --open                                                │
│                                                                          │
│  To close the dev server, hit Ctrl-C                                     │
│                                                                          │
│  Stuck? Visit us at https://svelte.dev/chat                              │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────╯
│
└  You're all set!

```

You'll get the following project structure
```
project
├── src
│   ├── lib
│   │   └── index.js
│   └── routes
│       └── +page.svelte
├── static
├── svelte.config.js
└── vite.config.js
```