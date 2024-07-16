import { getProfile, getProfileByUsername } from '$lib/auth';
import { message } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { eq, sql } from 'drizzle-orm';
import { messages } from '$lib/db/schema';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
    const { profile } = params;
    const userProfile = await getProfile(locals); // Get the current user's profile

    if (!userProfile || userProfile.username !== profile) {
        error(403, 'Forbidden');
    }

    const randomMessage = await db.query.messages.findFirst({
        where: eq(messages.recipientUserId, userProfile.id),
        orderBy: sql`RANDOM()`,
    });

    

    return {
        userProfile,
        randomMessage
    };
});