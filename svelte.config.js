import adapter from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapterStatic({
			strict: false, //to ignore prerender static route error
			// Default options to output static files in the "build" folder
      // pages: 'build',
      pages: 'docs',
      assets: 'docs',
      fallback: null  // Use this if you want to configure a fallback page (e.g., for SPA behavior)
		}),
		paths:{
			base:"/text2chart"
		}
	}
};

export default config;
