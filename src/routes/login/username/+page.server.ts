import { getProfile, createProfile } from '$lib/auth';
import { db } from '$lib/db';
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, Actions } from "./$types.js";
import { fail, redirect } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
  const userProfile = await getProfile(locals);

  if (userProfile && userProfile.username) {
    return {
      hasUsername: true,
      form: await superValidate(zod(formSchema)),
      userProfile
    };
  }

  return {
    hasUsername: false,
    form: await superValidate(zod(formSchema)),
    userProfile
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

    const userProfile = await createProfile(event.locals, form.data.username);

    if (userProfile) {

      throw redirect(303, `/${userProfile.username}`);
    } else {

      return fail(500, {
        form,
        error: "Failed to create user profile"
      });
    }
  },
};