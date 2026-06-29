import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin'
import AdminHeader from '@/components/admin/AdminHeader'
import NotConfigured from '@/components/admin/NotConfigured'
import FilterBar from '@/components/admin/FilterBar'
import BusinessRow from '@/components/admin/BusinessRow'

export const dynamic = 'force-dynamic'

export default async function BusinessesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const sp = await searchParams
  const configured = isSupabaseConfigured()

  let rows: any[] = []
  if (configured) {
    const supabase = createAdminClient()
    let q = supabase.from('business_posts').select('*').order('created_at', { ascending: false }).limit(500)
    if (sp.status) q = q.eq('status', sp.status)
    const { data } = await q
    rows = data ?? []
  }

  return (
    <div className="p-6 sm:p-10">
      <AdminHeader
        title="Business Posts"
        subtitle={configured ? `${rows.length} requirement${rows.length === 1 ? '' : 's'}` : 'Manage hiring requirements'}
      />

      {!configured && <NotConfigured />}

      {configured && (
        <FilterBar
          filters={[
            {
              param: 'status',
              label: 'Status',
              options: [
                { value: 'submitted', label: 'Submitted' },
                { value: 'under_review', label: 'Under Review' },
                { value: 'approved', label: 'Approved' },
                { value: 'fulfilled', label: 'Fulfilled' },
                { value: 'rejected', label: 'Rejected' },
              ],
            },
          ]}
        />
      )}

      {configured && rows.length === 0 ? (
        <p className="font-cormorant text-[17px] text-cream/45 py-10 text-center">
          No business requirements yet.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <BusinessRow key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  )
}
