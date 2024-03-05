import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    const user = await locals.supabase.auth.getUser();

    return {user: user.data.user};
}) satisfies PageServerLoad;