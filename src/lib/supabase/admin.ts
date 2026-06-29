import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client. SERVER-ONLY.
 * Bypasses Row Level Security — use only inside server routes / server code.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase env missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
    )
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/** True only when the Supabase service-role env vars look real (not placeholders). */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  return (
    url.startsWith('https://') &&
    !url.includes('YOUR-PROJECT') &&
    key.length > 20 &&
    !key.includes('YOUR_')
  )
}
