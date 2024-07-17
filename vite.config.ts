import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sentrySvelteKit({
        sourceMapsUploadOptions: {
            org: "pocketnote",
            project: "javascript-sveltekit"
        }
    }), sveltekit()],
    build: {
        rollupOptions: {
            external: ['crypto', 'stream', 'perf_hooks']
        }},
    ssr: { noExternal: ['three', 'troika-three-text'] }
});