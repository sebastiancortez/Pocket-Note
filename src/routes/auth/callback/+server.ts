import { redirect } from '@sveltejs/kit';
import { getProfile } from '$lib/auth';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/profile';
	if (code) {
		const { data, error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error && data?.session) {
			const user = data.session.user;
			const userProfile = await getProfile(event.locals);
			if (userProfile && userProfile.username) {
				redirect(303, '/profile');
			} else {
				redirect(303, '/login/username');
			}
		} else {
			redirect(303, '/auth/login?error=verify_error');
		}
	}

	// return the user to an error page with instructions
	redirect(303, '/auth/login');
};