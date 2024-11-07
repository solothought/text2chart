import adapter from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		appDir: 'app', //// default is _app. Github doesn't support "_"
		adapter: adapterStatic({
			strict: false, //to ignore prerender static route error
      pages: 'docs', //default 'build. But Github launch pages from / or /docs
      assets: 'docs',
      fallback: null  // Use this if you want to configure a fallback page (e.g., for SPA behavior)
		}),
		paths:{
			base:"/text2chart", //repository name (sub-directory in solothought.com/text2chart)
			// assets: ''
		}
	}
};

export default config;
