import * as Sentry from '@sentry/sveltekit';
import { sequence } from "@sveltejs/kit/hooks";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'

Sentry.init({
    dsn: "https://8239a842d7e0a69b7ecbaa33f8562f3b@o4506707514949632.ingest.sentry.io/4506707517702144",
    tracesSampleRate: 1
})

const supabaseAuth: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      /**
       * Note: You have to add the `path` variable to the
       * set and remove method due to sveltekit's cookie API
       * requiring this to be set, setting the path to an empty string
       * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
       */
      set: (key, value, options) => {
        event.cookies.set(key, value, { ...options, path: '/' })
      },
      remove: (key, options) => {
        event.cookies.delete(key, { ...options, path: '/' })
      },
    },
  })

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
// export const handle = sequence(sentryHandle(), supabaseAuth);

export const handle = sequence(Sentry.sentryHandle(), supabaseAuth);

// // If you have a custom error handler, pass it to `handleErrorWithSentry`

export const handleError = Sentry.handleErrorWithSentry();