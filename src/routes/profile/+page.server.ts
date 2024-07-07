export const load = (async ({locals}) => {
    const { user } = await locals.safeGetSession();

    return user;
})