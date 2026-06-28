'use client'

import { useState } from 'react'
import { Filter, SlidersHorizontal } from 'lucide-react'
import SwipeDeck from '@/components/swipe/SwipeDeck'
import { MOCK_PROFILES } from '@/lib/mock-data'
import type { Profile } from '@/lib/types'

export default function FeedPage() {
  const [matches, setMatches] = useState<Profile[]>([])
  const [showMatchModal, setShowMatchModal] = useState<Profile | null>(null)

  const handleLike = (profile: Profile) => {
    // Simula 40% de chance de match mútuo
    if (Math.random() > 0.6) {
      setShowMatchModal(profile)
      setMatches((m) => [...m, profile])
    }
  }

  const handlePass = (_profile: Profile) => {
    // Register pass in DB
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-[#1E1E1E]">
        <div>
          <h1 className="text-lg font-black text-[#F5F5F5]">Descobrir</h1>
          <p className="text-xs text-[#888888]">{MOCK_PROFILES.length} perfis compatíveis</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-[#888888] hover:text-white hover:border-[#3A3A3A] transition-all">
            <Filter size={16} />
          </button>
          <button className="p-2.5 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-[#888888] hover:text-white hover:border-[#3A3A3A] transition-all">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Swipe area */}
      <div className="flex-1 relative px-4 py-4 max-w-sm mx-auto w-full">
        <SwipeDeck
          profiles={MOCK_PROFILES}
          onLike={handleLike}
          onPass={handlePass}
        />
      </div>

      {/* Tip */}
      <div className="px-4 pb-4 flex items-center justify-center gap-6 text-xs text-[#555555]">
        <span>← Passar</span>
        <span>Arraste o card ou use os botões</span>
        <span>Curtir →</span>
      </div>

      {/* Match Modal */}
      {showMatchModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] rounded-3xl p-8 max-w-sm w-full text-center border border-[#2A2A2A] shadow-2xl">
            {/* Confetti effect */}
            <div className="text-5xl mb-4 animate-bounce">🎉</div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10BE72]/10 border border-[#10BE72]/20 text-[#10BE72] text-sm font-bold mb-4">
              ♥ Match!
            </div>

            <h2 className="text-2xl font-black text-[#F5F5F5] mb-2">
              Você e {showMatchModal.full_name} fizeram match!
            </h2>
            <p className="text-[#888888] text-sm mb-6">
              Agora você pode trocar mensagens e começar a construir algo incrível juntos.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowMatchModal(null)}
                className="flex-1 py-3 rounded-xl border border-[#2A2A2A] text-[#888888] hover:text-white font-semibold text-sm transition-colors"
              >
                Continuar
              </button>
              <button
                onClick={() => {
                  setShowMatchModal(null)
                  window.location.href = '/messages'
                }}
                className="flex-1 py-3 rounded-xl bg-[#2350E8] text-white font-semibold text-sm hover:bg-[#1A3DB5] transition-colors"
              >
                Enviar mensagem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
