'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function FilterBar({
  filters,
}: {
  filters: { param: string; label: string; options: { value: string; label: string }[] }[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  function setParam(param: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(param, value)
    else next.delete(param)
    router.push(`${pathname}?${next.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map((f) => (
        <div key={f.param}>
          <label className="field-label">{f.label}</label>
          <select
            value={params.get(f.param) ?? ''}
            onChange={(e) => setParam(f.param, e.target.value)}
            className="field !py-2 !text-[14px] !w-auto"
          >
            <option value="">All</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}
