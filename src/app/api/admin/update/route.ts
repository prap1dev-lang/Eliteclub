import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/admin-auth'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const TABLES = {
  registrations: {
    table: 'registrations',
    fields: ['status', 'payment_status', 'is_verified', 'admin_notes'],
  },
  business_posts: {
    table: 'business_posts',
    fields: ['status', 'payment_status', 'is_verified', 'admin_notes'],
  },
  enquiries: {
    table: 'enquiries',
    fields: ['status'],
  },
} as const

type Entity = keyof typeof TABLES

export async function POST(req: Request) {
  // auth guard (middleware also protects /admin pages, but APIs need their own check)
  const store = await cookies()
  if (!verifySessionToken(store.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: { entity?: string; id?: string; updates?: Record<string, any> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const entity = body.entity as Entity
  if (!entity || !(entity in TABLES)) {
    return NextResponse.json({ error: 'Invalid entity.' }, { status: 400 })
  }
  if (!body.id) {
    return NextResponse.json({ error: 'Missing id.' }, { status: 400 })
  }

  const allowed = TABLES[entity].fields as readonly string[]
  const updates: Record<string, any> = {}
  for (const [k, v] of Object.entries(body.updates ?? {})) {
    if (allowed.includes(k)) updates[k] = v
  }
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update.' }, { status: 400 })
  }

  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from(TABLES[entity].table).update(updates).eq('id', body.id)
    if (error) {
      console.error('[admin/update] error:', error)
      return NextResponse.json({ error: 'Update failed.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[admin/update] unexpected:', e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
