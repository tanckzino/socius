import Link from 'next/link'
import { MOCK_CONVERSATIONS } from '@/lib/mock-data'
import { getInitials, getAvatarColor, timeAgo } from '@/lib/utils'
import { ROLE_COLORS } from '@/lib/types'

export default function MessagesPage() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#1E1E1E]">
        <h1 className="text-xl font-black text-[#F5F5F5]">Mensagens</h1>
        <p className="text-sm text-[#888888]">{MOCK_CONVERSATIONS.length} conversas</p>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {MOCK_CONVERSATIONS.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Nenhuma conversa ainda</h3>
            <p className="text-[#888888] mb-6">Faça matches para começar a conversar!</p>
            <Link href="/feed" className="px-6 py-3 bg-[#2350E8] text-white font-semibold rounded-xl">
              Ir para o Feed
            </Link>
          </div>
        ) : (
          <div>
            {MOCK_CONVERSATIONS.map((conv) => {
              const user = conv.other_user
              if (!user) return null
              const initials = getInitials(user.full_name)
              const color = ROLE_COLORS[user.role]
              const isUnread = conv.unread_count > 0

              return (
                <Link
                  key={conv.id}
                  href={`/messages/${conv.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 border-b border-[#1A1A1A] transition-colors"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: `${color}20`, color }}
                    >
                      {initials}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10BE72] border-2 border-[#0D0D0D]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className={`font-semibold text-sm truncate ${isUnread ? 'text-[#F5F5F5]' : 'text-[#888888]'}`}>
                        {user.full_name}
                      </p>
                      <span className="text-[11px] text-[#555555] flex-shrink-0">
                        {conv.last_message ? timeAgo(conv.last_message.created_at) : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={`text-xs truncate ${isUnread ? 'text-[#F5F5F5]' : 'text-[#555555]'}`}>
                        {conv.last_message?.content}
                      </p>
                      {isUnread && (
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2350E8] text-white text-[10px] font-bold flex items-center justify-center">
                          {conv.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
