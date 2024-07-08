import { getOrCreateUserProfile } from '$lib/auth';
import { db } from '$lib/db';
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";

export const load = (async ({locals}) => {
    return { 
        form: await superValidate(zod(formSchema))
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
      const form = await superValidate(event, zod(formSchema));
      if (!form.valid) {
        console.log("Form validation failed:", form);
        return fail(400, {
          form,
        });
      }

      console.log("Form validation succeeded:", form);

      const userProfile = await getOrCreateUserProfile(event.locals, form.data.username);

      console.log("User profile:", userProfile);

      return {
        form,
        userProfile
      };
    },
};