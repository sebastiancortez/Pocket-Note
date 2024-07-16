import { getProfile } from '$lib/auth/index.js';

export const load = (async ({locals}) => {
    const userProfile = await getProfile(locals);

    return {
        userProfile
    };
})