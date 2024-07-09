import { getProfile } from '$lib/auth/index.js';

export const load = (async ({locals}) => {
    const { user } = await locals.safeGetSession();
    const userProfile = await getProfile(locals);

    return {
        userProfile
    };
})