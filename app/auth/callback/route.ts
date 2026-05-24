import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Handle errors from OAuth provider
  if (error || errorDescription) {
    return NextResponse.redirect(
      new URL(
        `/auth/error?error=${encodeURIComponent(errorDescription || error || 'Unknown error')}`,
        request.url
      )
    )
  }

  // Handle successful OAuth callback
  if (code) {
    const supabase = await createClient()

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      return NextResponse.redirect(
        new URL(
          `/auth/error?error=${encodeURIComponent(exchangeError.message)}`,
          request.url
        )
      )
    }

    // Successfully authenticated, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // No code or error, redirect to login
  return NextResponse.redirect(new URL('/auth/login', request.url))
}
