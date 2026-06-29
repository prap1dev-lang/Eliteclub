import { NextResponse } from 'next/server'
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

function clean(v: unknown): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim()
  return t.length ? t : null
}

export async function POST(req: Request) {
  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const kind = clean(body.kind) ?? 'contact'
  const name = clean(body.name)
  const email = clean(body.email)

  if (!name || !email) {
    return NextResponse.json({ error: 'Please provide your name and email.' }, { status: 400 })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const record = {
    kind: ['contact', 'partner', 'sponsor'].includes(kind) ? kind : 'contact',
    name,
    email,
    mobile: clean(body.mobile),
    company: clean(body.company),
    message: clean(body.message),
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase is not configured yet. Add your keys to .env.local.', code: 'NOT_CONFIGURED' },
      { status: 503 }
    )
  }

  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('enquiries').insert(record)
    if (error) {
      console.error('[enquiry] insert error:', error)
      return NextResponse.json({ error: 'Could not send. Please try again.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true, message: 'Thank you! We will be in touch shortly.' })
  } catch (e) {
    console.error('[enquiry] unexpected:', e)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
