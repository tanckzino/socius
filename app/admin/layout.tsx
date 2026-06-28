import Link from 'next/link'
import { LayoutDashboard, Users, Heart, MessageSquare, Shield, BarChart3, Settings, LogOut } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Users, label: 'Usuários', href: '/admin/users' },
  { icon: Heart, label: 'Matches', href: '/admin/matches' },
  { icon: MessageSquare, label: 'Mensagens', href: '/admin/messages' },
  { icon: Shield, label: 'Moderação', href: '/admin/moderation' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Configurações', href: '/admin/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111111] border-r border-[#1E1E1E] min-h-screen flex flex-col">
        <div className="px-4 py-5 border-b border-[#1E1E1E]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#2350E8] rounded-lg flex items-center justify-center font-black text-white text-sm">S</div>
            <div>
              <p className="font-bold text-sm"><span className="text-[#F5F5F5]">soci</span><span className="text-[#2350E8]">US</span></p>
              <p className="text-[10px] text-[#888888]">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#888888] hover:bg-white/4 hover:text-[#F5F5F5] transition-all"
              >
                <Icon size={15} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[#1E1E1E]">
          <Link href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#888888] hover:bg-white/4 hover:text-white transition-all">
            <LogOut size={15} />
            Sair do admin
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
