import AdminSidebar from '@/components/admin/AdminSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-carve-smoke">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
