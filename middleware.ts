import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)
  
  const pathname = request.nextUrl.pathname
  
  // Get the user session from the response/request
  const authToken = request.cookies.get('sb-auth-token')?.value ||
    request.cookies.get('sb-access-token')?.value
  
  const isAuthenticated = !!authToken
  
  // Redirect unauthenticated users from root to login
  if (pathname === '/' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
