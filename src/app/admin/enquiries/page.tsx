import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin'
import AdminHeader from '@/components/admin/AdminHeader'
import NotConfigured from '@/components/admin/NotConfigured'
import { SelectAction } from '@/components/admin/StatusControls'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const KIND_BADGE: Record<string, string> = {
  contact: 'text-cream/60',
  partner: 'text-gold-light',
  sponsor: 'text-violet-300',
}

export default async function EnquiriesPage() {
  const configured = isSupabaseConfigured()

  let rows: any[] = []
  if (configured) {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)
    rows = data ?? []
  }

  return (
    <div className="p-6 sm:p-10">
      <AdminHeader
        title="Enquiries"
        subtitle={configured ? `${rows.length} message${rows.length === 1 ? '' : 's'}` : 'Partner & contact messages'}
      />

      {!configured && <NotConfigured />}

      {configured && rows.length === 0 ? (
        <p className="font-cormorant text-[17px] text-cream/45 py-10 text-center">No enquiries yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="lux-card p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-cinzel text-cream text-[17px]">{r.name}</span>
                    <span className={`font-montserrat text-[10px] uppercase tracking-wide ${KIND_BADGE[r.kind] ?? ''}`}>{r.kind}</span>
                  </div>
                  <p className="font-cormorant text-[14px] text-cream/45 mt-0.5">
                    {r.email}{r.mobile ? ` · ${r.mobile}` : ''}{r.company ? ` · ${r.company}` : ''} · {formatDate(r.created_at)}
                  </p>
                </div>
                <SelectAction entity="enquiries" id={r.id} field="status" value={r.status}
                  options={[
                    { value: 'new', label: 'New' },
                    { value: 'read', label: 'Read' },
                    { value: 'closed', label: 'Closed' },
                  ]} />
              </div>
              {r.message && (
                <p className="font-cormorant text-[16px] text-cream/80 leading-relaxed mt-3 whitespace-pre-wrap">{r.message}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
