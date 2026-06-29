export default function AdminHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-gold/15">
      <div>
        <h1 className="font-cinzel text-3xl text-cream">{title}</h1>
        {subtitle && <p className="font-cormorant text-[16px] text-cream/50 mt-1">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}
