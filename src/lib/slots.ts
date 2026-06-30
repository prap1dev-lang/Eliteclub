import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin'
import { FREE_SLOT_LIMIT, FEES } from '@/lib/constants'

/**
 * Launch-offer slot accounting for influencer registrations.
 *
 * The first {@link FREE_SLOT_LIMIT} influencer registrations are free (₹0).
 * After that, the normal influencer registration fee applies.
 *
 * The count of existing influencer registrations is the single source of
 * truth and is read from the database; everything else is derived from it.
 */

export type SlotInfo = {
  /** Total free slots in the launch offer (e.g. 100). */
  limit: number
  /** Influencer registrations recorded so far. */
  used: number
  /** Free slots still available (never negative). */
  remaining: number
  /** Whether the next influencer registration would still be free. */
  free: boolean
  /** Fee (INR) the next influencer registration should be charged. */
  nextFee: number
}

/** Number of influencer registrations already in the database. */
export async function countInfluencerRegistrations(): Promise<number> {
  const supabase = createAdminClient()
  const { count, error } = await supabase
    .from('registrations')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'influencer')

  if (error) {
    console.error('[slots] count error:', error)
    throw error
  }
  return count ?? 0
}

/** Derive slot info from a known "used" count. */
export function deriveSlotInfo(used: number): SlotInfo {
  const remaining = Math.max(0, FREE_SLOT_LIMIT - used)
  const free = remaining > 0
  return {
    limit: FREE_SLOT_LIMIT,
    used,
    remaining,
    free,
    nextFee: free ? 0 : FEES.influencerRegistration,
  }
}

/**
 * Live slot info, read from the database.
 * If Supabase isn't configured, assume slots are still open so the UI can
 * still render the launch offer in development.
 */
export async function getSlotInfo(): Promise<SlotInfo> {
  if (!isSupabaseConfigured()) {
    return deriveSlotInfo(0)
  }
  try {
    const used = await countInfluencerRegistrations()
    return deriveSlotInfo(used)
  } catch {
    // On any DB error, fail open to the free offer (display only).
    return deriveSlotInfo(0)
  }
}
