'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Repeat2, Heart, MessageSquare, Search, User, Settings, LogOut, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Repeat2, label: 'Feed', href: '/feed' },
  { icon: Heart, label: 'Matches', href: '/matches' },
  { icon: MessageSquare, label: 'Mensagens', href: '/messages', badge: 2 },
  { icon: Search, label: 'Explorar', href: '/explore' },
  { icon: User, label: 'Perfil', href: '/profile' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#111111] border-r border-[#1E1E1E] min-h-screen fixed left-0 top-0 z-40">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#1E1E1E]">
          <Link href="/feed" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#2350E8] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-lg shadow-[#2350E8]/30">
              S
            </div>
            <span className="font-bold text-lg">
              <span className="text-[#F5F5F5]">soci</span>
              <span className="text-[#2350E8]">US</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative',
                  active
                    ? 'bg-[#2350E8]/12 text-[#4169FF]'
                    : 'text-[#888888] hover:bg-white/4 hover:text-[#F5F5F5]'
                )}
              >
                <Icon size={18} />
                {item.label}
                {item.badge && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-[#2350E8] text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-[#1E1E1E] space-y-0.5">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#888888] hover:bg-white/4 hover:text-[#F5F5F5] transition-all"
          >
            <Settings size={18} />
            Configurações
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#888888] hover:bg-white/4 hover:text-[#EF4444] transition-all">
            <LogOut size={18} />
            Sair
          </button>

          {/* User mini card */}
          <div className="mt-3 pt-3 border-t border-[#1E1E1E]">
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-[#2350E8]/20 flex items-center justify-center text-[#4169FF] font-bold text-xs flex-shrink-0">
                EU
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#F5F5F5] truncate">Você</p>
                <p className="text-[10px] text-[#888888]">Plano Gratuito</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111111] border-t border-[#1E1E1E] flex">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-medium transition-colors relative',
                active ? 'text-[#2350E8]' : 'text-[#555555]'
              )}
            >
              <Icon size={20} />
              {item.label}
              {item.badge && (
                <span className="absolute top-2 left-1/2 ml-2 w-4 h-4 rounded-full bg-[#2350E8] text-white text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
