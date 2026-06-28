import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Sidebar />
      <main className="lg:pl-60 pb-20 lg:pb-0 min-h-screen">
        {children}
      </main>
    </div>
  )
}
