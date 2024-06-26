import { redirect } from '@sveltejs/kit'

type EmailOtpType = 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change' | 'email'

const emailOTPTypes: EmailOtpType[] = ['signup', 'invite', 'magiclink', 'recovery', 'email_change', 'email']

const isEmailOTPType = (type: unknown): type is EmailOtpType => emailOTPTypes.includes(type as EmailOtpType)

export const GET = async (event) => {
  const {
    url,
    locals: { supabase },
  } = event
  const token_hash = url.searchParams.get('token_hash') as string
  const type = url.searchParams.get('type') as string
  const next = url.searchParams.get('next') ?? '/profile'

  if (token_hash && isEmailOTPType(type)) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (!error) {
        redirect(303, `/${next.slice(1)}`)
    } else {
        redirect(303, '/auth/login?error=verify_error')
    }
  }

  // return the user to an error page with some instructions
redirect(303, '/auth/login')
}