'use client'

import { useEffect, useState } from 'react'
import type { SlotInfo } from '@/lib/slots'
import { FREE_SLOT_LIMIT } from '@/lib/constants'

/**
 * Client hook that fetches the launch-offer slot status from /api/slots.
 * Falls back to "all slots open" while loading or on error so the offer
 * always renders.
 */
export function useSlots(): { slots: SlotInfo; loading: boolean } {
  const [slots, setSlots] = useState<SlotInfo>({
    limit: FREE_SLOT_LIMIT,
    used: 0,
    remaining: FREE_SLOT_LIMIT,
    free: true,
    nextFee: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch('/api/slots', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: SlotInfo) => {
        if (active && data && typeof data.remaining === 'number') setSlots(data)
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return { slots, loading }
}
