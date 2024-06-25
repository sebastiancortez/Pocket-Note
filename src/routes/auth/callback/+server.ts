import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/profile';

    // Log received code and next URL
    console.log('Received code:', code);
    console.log('Next URL:', next);

    if (code) {
        try {
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
                console.error('Error exchanging code for session:', error);
                return new Response(JSON.stringify({ error: 'verify_error', details: error }), { status: 303 });
            }

            // Fetch the session again to ensure it's established
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error('Error fetching session:', sessionError);
                return new Response(JSON.stringify({ error: 'session_fetch_error', details: sessionError }), { status: 303 });
            }

            console.log('New session:', session);

            if (session) {
                return redirect(303, `/${next.slice(1)}`);
            } else {
                console.error('Session not established after code exchange');
                return new Response(JSON.stringify({ error: 'session_not_established' }), { status: 303 });
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            return new Response(JSON.stringify({ error: 'unexpected_error', details: err }), { status: 303 });
        }
    }

    // return the user to an error page with instructions
    return new Response(JSON.stringify({ error: 'verify_error' }), { status: 303 });
};