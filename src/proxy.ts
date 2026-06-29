import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/admin-auth'

/**
 * Protects /admin/** (except /admin/login). Redirects unauthenticated users
 * to the login page. Runs on the Node runtime so it can use `crypto`.
 *
 * (Next.js 16 renamed the `middleware` convention to `proxy`.)
 */
export const config = {
  matcher: ['/admin/:path*'],
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // allow the login page itself
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (verifySessionToken(token)) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = '/admin/login'
  url.searchParams.set('next', pathname)
  return NextResponse.redirect(url)
}
