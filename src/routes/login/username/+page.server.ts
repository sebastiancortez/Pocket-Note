import { getOrCreateUserProfile } from '$lib/auth';
import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    const userProfile = await getOrCreateUserProfile(locals);

    return { userProfile };

}) satisfies PageServerLoad;