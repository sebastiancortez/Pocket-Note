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
    optimizeDeps: {
        include: ['perf_hooks', 'crypto', 'stream', 'fs', 'net', 'tls']
    }
});