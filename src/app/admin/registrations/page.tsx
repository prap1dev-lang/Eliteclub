import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin'
import AdminHeader from '@/components/admin/AdminHeader'
import NotConfigured from '@/components/admin/NotConfigured'
import FilterBar from '@/components/admin/FilterBar'
import RegistrationRow from '@/components/admin/RegistrationRow'

export const dynamic = 'force-dynamic'

export default async function RegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; status?: string; verified?: string }>
}) {
  const sp = await searchParams
  const configured = isSupabaseConfigured()

  let rows: any[] = []
  if (configured) {
    const supabase = createAdminClient()
    let q = supabase.from('registrations').select('*').order('created_at', { ascending: false }).limit(500)
    if (sp.role) q = q.eq('role', sp.role)
    if (sp.status) q = q.eq('status', sp.status)
    if (sp.verified === '1') q = q.eq('is_verified', true)
    const { data } = await q
    rows = data ?? []
  }

  return (
    <div className="p-6 sm:p-10">
      <AdminHeader
        title="Registrations"
        subtitle={configured ? `${rows.length} record${rows.length === 1 ? '' : 's'}` : 'Manage talent submissions'}
      />

      {!configured && <NotConfigured />}

      {configured && (
        <FilterBar
          filters={[
            {
              param: 'role',
              label: 'Role',
              options: [
                { value: 'influencer', label: 'Influencer' },
                { value: 'photographer', label: 'Photographer' },
                { value: 'videographer', label: 'Videographer' },
              ],
            },
            {
              param: 'status',
              label: 'Status',
              options: [
                { value: 'submitted', label: 'Submitted' },
                { value: 'under_review', label: 'Under Review' },
                { value: 'verified', label: 'Verified' },
                { value: 'rejected', label: 'Rejected' },
              ],
            },
            {
              param: 'verified',
              label: 'Verified Only',
              options: [{ value: '1', label: 'Yes' }],
            },
          ]}
        />
      )}

      {configured && rows.length === 0 ? (
        <p className="font-cormorant text-[17px] text-cream/45 py-10 text-center">
          No registrations match these filters yet.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <RegistrationRow key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  )
}
