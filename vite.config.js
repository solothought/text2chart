import { sveltekit } from '@sveltejs/kit/vite';
import commonjs from 'vite-plugin-commonjs';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(),commonjs()]
});
