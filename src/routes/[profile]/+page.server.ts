import { getProfileByUsername, getProfile } from '$lib/auth/index.js';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
    const { profile } = params;
    const currentUserProfile = await getProfile(locals); // Get the current user's profile

    if (!currentUserProfile || currentUserProfile.username !== profile) {
        error(403, 'Forbidden');
    }

    const userProfile = await getProfileByUsername(profile);

    return {
        userProfile
    };
});