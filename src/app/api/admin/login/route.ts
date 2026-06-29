import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, checkAdminPassword, createSessionToken, SESSION_MAX_AGE } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Admin password is not set. Add ADMIN_PASSWORD to .env.local.' },
      { status: 503 }
    )
  }

  if (!body.password || !checkAdminPassword(body.password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
