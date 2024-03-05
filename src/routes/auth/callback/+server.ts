import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/profile';

    const user = await supabase.auth.getUser();
    console.log('user', user.data.user);

    const session = await supabase.auth.getSession();
    console.log('session', session.data.session);

    console.log(code);

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
    redirect(303, `/profile`);
    }
  }

  // return the user to an error page with instructions
  redirect(303, '/login?error=verify_error');
};