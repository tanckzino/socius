'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Paperclip, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { MOCK_MESSAGES, MOCK_CONVERSATIONS } from '@/lib/mock-data'
import { getInitials, timeAgo } from '@/lib/utils'
import { ROLE_COLORS } from '@/lib/types'

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const conv = MOCK_CONVERSATIONS.find((c) => c.id === params.id) ?? MOCK_CONVERSATIONS[0]
  const user = conv?.other_user

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const msg = {
      id: `msg-${Date.now()}`,
      conversation_id: params.id,
      sender_id: 'me',
      content: input.trim(),
      status: 'sent' as const,
      created_at: new Date().toISOString(),
    }
    setMessages((m) => [...m, msg])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!user) return null

  const color = ROLE_COLORS[user.role]
  const initials = getInitials(user.full_name)

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-[#1E1E1E] flex items-center gap-3">
        <Link
          href="/messages"
          className="p-2 rounded-xl hover:bg-white/5 text-[#888888] hover:text-white transition-all lg:hidden"
        >
          <ArrowLeft size={18} />
        </Link>

        {/* Avatar */}
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: `${color}20`, color }}
          >
            {initials}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10BE72] border-2 border-[#0D0D0D]" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#F5F5F5] text-sm">{user.full_name}</p>
          <p className="text-xs text-[#10BE72]">Online agora</p>
        </div>

        <button className="p-2 rounded-xl hover:bg-white/5 text-[#888888] hover:text-white transition-all">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.sender_id === 'me'
          return (
            <div key={msg.id} className={`flex items-end gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}>
              {/* Avatar (only for other person) */}
              {!isMe && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mb-0.5"
                  style={{ background: `${color}20`, color }}
                >
                  {initials}
                </div>
              )}

              {/* Bubble */}
              <div className={`max-w-[75%] group relative`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? 'bg-[#2350E8] text-white rounded-br-sm'
                      : 'bg-[#1A1A1A] text-[#F5F5F5] border border-[#2A2A2A] rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
                <p className={`text-[10px] text-[#555555] mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                  {timeAgo(msg.created_at)}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-[#1E1E1E]">
        <div className="flex items-end gap-2.5">
          <button className="p-2.5 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-[#888888] hover:text-white hover:border-[#3A3A3A] transition-all flex-shrink-0">
            <Paperclip size={16} />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escreva uma mensagem..."
              rows={1}
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[#F5F5F5] placeholder:text-[#555555] px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#2350E8] focus:ring-1 focus:ring-[#2350E8] transition-all max-h-32"
              style={{ lineHeight: '1.5' }}
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="p-3 rounded-xl bg-[#2350E8] text-white hover:bg-[#1A3DB5] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-[#555555] mt-2 text-center">
          Enter para enviar · Shift+Enter para nova linha
        </p>
      </div>
    </div>
  )
}
