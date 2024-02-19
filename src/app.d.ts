// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient } from "@supabase/supabase-js";
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient,
			getSession: () => Promise<Session | null>
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}
declare module '@supabase/ssr';
declare module '@sentry/sveltekit';

export {};
