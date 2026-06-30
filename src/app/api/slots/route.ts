import { NextResponse } from 'next/server'
import { getSlotInfo } from '@/lib/slots'

export const runtime = 'nodejs'
// Always reflect the live count — never cache.
export const dynamic = 'force-dynamic'

/**
 * Public endpoint exposing the launch-offer slot status so the UI can show
 * how many free influencer registrations remain.
 */
export async function GET() {
  const info = await getSlotInfo()
  return NextResponse.json(info, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
