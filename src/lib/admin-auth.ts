import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Lightweight admin session token, signed with ADMIN_SESSION_SECRET.
 * Format: base64url(payloadJSON).hexHmac
 * No external deps; verified in middleware (Node runtime) and routes.
 */

export const ADMIN_COOKIE = 'elite_admin'
const MAX_AGE_SECONDS = 60 * 60 * 12 // 12 hours

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'insecure-dev-secret-change-me'
}

function b64url(input: string): string {
  return Buffer.from(input).toString('base64url')
}

export function createSessionToken(): string {
  const payload = JSON.stringify({ role: 'admin', exp: Date.now() + MAX_AGE_SECONDS * 1000 })
  const body = b64url(payload)
  const sig = createHmac('sha256', secret()).update(body).digest('hex')
  return `${body}.${sig}`
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !token.includes('.')) return false
  const [body, sig] = token.split('.')
  if (!body || !sig) return false

  const expected = createHmac('sha256', secret()).update(body).digest('hex')
  // constant-time compare
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
    if (payload.role !== 'admin') return false
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return false
    return true
  } catch {
    return false
  }
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS

/** Constant-time password check against ADMIN_PASSWORD. */
export function checkAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || ''
  if (!expected) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
