import type { PageServerLoad } from './$types';

// export const load = (async () => {
//     return {};
// }) satisfies PageServerLoad;

export const load =async ({locals: { supabase } }) => {
    const userFetch = await supabase.auth.getUser();

    return {
        user: userFetch.data.user
    }
}