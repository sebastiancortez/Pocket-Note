import { getOrCreateUserProfile } from '$lib/auth';
import { db } from '$lib/db';
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";

export const load = (async ({locals}) => {
    // const userProfile = await getOrCreateUserProfile(locals);

    return { 
        form: await superValidate(zod(formSchema))
        // userProfile 
    };

}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
      const form = await superValidate(event, zod(formSchema));
      if (!form.valid) {
        return fail(400, {
          form,
        });
      }
      return {
        form,
      };
    },
  };