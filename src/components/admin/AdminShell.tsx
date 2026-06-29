'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

/** Renders the sidebar chrome on all admin pages except the login screen. */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === '/admin/login'

  if (isLogin) return <>{children}</>

  return (
    <div className="min-h-screen bg-ink flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
    </div>
  )
}
