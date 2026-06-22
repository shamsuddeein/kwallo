'use client'

import { useState } from 'react'
import { Flame, TrendingUp, ThumbsUp, ThumbsDown, Send } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { MOCK_HOT_TAKES, type HotTake, t } from '@/lib/mock-data'
import { useApp } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type FilterKind = 'trending' | 'new' | 'all'

const AVATAR_BG = [
  '#1B5E38', '#F5A623', '#0D1B2A', '#EF4444', '#3B82F6', '#8B5CF6',
]

export default function HotTakesPage() {
  const { lang }    = useApp()
  const [filter, setFilter]       = useState<FilterKind>('trending')
  const [newTake, setNewTake]     = useState('')
  const [votes, setVotes]         = useState<Record<string, 'agree' | 'disagree' | null>>({})
  const [localTakes, setLocalTakes] = useState<HotTake[]>(MOCK_HOT_TAKES)
  const [submitted, setSubmitted] = useState(false)

  const displayed = filter === 'trending'
    ? localTakes.filter((tk) => tk.trending)
    : filter === 'new'
    ? [...localTakes].reverse()
    : localTakes

  function handleVote(id: string, side: 'agree' | 'disagree') {
    const current = votes[id]
    setVotes((v) => ({ ...v, [id]: current === side ? null : side }))
  }

  function handleSubmit() {
    if (!newTake.trim()) return
    const take: HotTake = {
      id:            `ht-user-${Date.now()}`,
      userId:        'current-user',
      userName:      'You',
      userClub:      'Fan',
      content:       newTake.trim(),
      agreeCount:    0,
      disagreeCount: 0,
      createdAt:     new Date().toISOString(),
      trending:      false,
    }
    setLocalTakes((prev) => [take, ...prev])
    setNewTake('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <SiteLayout>
      {/*  Cream hero banner  */}
      <div className="max-w-[820px] mx-auto px-6 pt-10 pb-4">
        <div className="bg-[#FFE8D6] border-2 border-[#0D1B2A] rounded-2xl card-shadow px-8 py-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl border-2 border-[#0D1B2A] bg-white flex items-center justify-center shrink-0">
            <Flame size={28} className="text-[#F5A623]" />
          </div>
          <div>
            <h1
              className="text-3xl font-extrabold text-[#0D1B2A]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('hot_takes', lang)}
            </h1>
            <p className="text-[#6B7280] text-sm mt-0.5">
              Drop your hottest football opinions. Nigerian fans only. No fear.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[820px] mx-auto px-6 py-8 pb-24 md:pb-8">

        {/*  Post a take  */}
        <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5 mb-8">
          <h2
            className="font-bold text-[#0D1B2A] mb-3 text-sm uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Drop Your Take
          </h2>
          <textarea
            value={newTake}
            onChange={(e) => setNewTake(e.target.value.slice(0, 280))}
            placeholder="Arsenal go win the league. I said what I said..."
            rows={4}
            aria-label="Write your hot take"
            className="w-full text-sm text-[#0D1B2A] placeholder-[#9CA3AF] resize-none outline-none leading-relaxed mb-3 bg-transparent"
          />
          <div className="flex items-center justify-between border-t border-[#D4D9D0] pt-3">
            <span
              className={cn(
                'text-xs font-medium',
                newTake.length > 240 ? 'text-[#EF4444]' : 'text-[#9CA3AF]'
              )}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {newTake.length}/280
            </span>
            <button
              onClick={handleSubmit}
              disabled={!newTake.trim()}
              className={cn(
                'flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border-2 transition-all',
                submitted
                  ? 'bg-[#D4F0E0] text-[#1B5E38] border-[#1B5E38]'
                  : newTake.trim()
                  ? 'bg-[#1B5E38] text-white border-[#0D1B2A] card-shadow-sm hover:translate-y-[-1px]'
                  : 'bg-white text-[#9CA3AF] border-[#D4D9D0] cursor-not-allowed'
              )}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <Send size={13} />
              {submitted ? 'Posted!' : 'Post Take'}
            </button>
          </div>
        </div>

        {/*  Filter row  */}
        <div className="flex items-center gap-2 mb-6">
          {([
            { key: 'trending', label: 'Trending' },
            { key: 'new',      label: 'Newest'   },
            { key: 'all',      label: 'All'       },
          ] as { key: FilterKind; label: string }[]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all',
                filter === f.key
                  ? 'bg-[#1B5E38] text-white border-[#0D1B2A] card-shadow-sm'
                  : 'bg-white text-[#6B7280] border-[#D4D9D0] hover:border-[#0D1B2A]'
              )}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/*  Takes feed  */}
        <div className="space-y-4">
          {displayed.map((take, idx) => {
            const userVote     = votes[take.id]
            const agreeCount   = take.agreeCount    + (userVote === 'agree'    ? 1 : 0)
            const disagreeCount = take.disagreeCount + (userVote === 'disagree' ? 1 : 0)
            const total        = agreeCount + disagreeCount
            const agreePercent = total > 0 ? Math.round((agreeCount / total) * 100) : 50
            const avatarBg     = AVATAR_BG[idx % AVATAR_BG.length]

            return (
              <article
                key={take.id}
                className={cn(
                  'bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5',
                  take.trending && 'border-[#F5A623]'
                )}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-full border-2 border-[#0D1B2A] flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ backgroundColor: avatarBg }}
                    >
                      {take.userName.slice(0, 1)}
                    </div>
                    <div>
                      <span
                        className="text-sm font-bold text-[#0D1B2A]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {take.userName}
                      </span>
                      <span className="text-xs text-[#9CA3AF] ml-1.5">, {take.userClub}</span>
                    </div>
                  </div>
                  {take.trending && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF3D0] border border-[#F5A623] text-[#F5A623] text-xs font-bold shrink-0">
                      <TrendingUp size={11} />
                      Trending
                    </span>
                  )}
                </div>

                {/* Content */}
                <p className="text-[#0D1B2A] text-sm leading-relaxed mb-4 font-medium">
                  {take.content}
                </p>

                {/* Agree/disagree bar */}
                <div className="h-2 rounded-full bg-[#FFE8EC] overflow-hidden mb-3 border border-[#D4D9D0]">
                  <div
                    className="h-full bg-[#1B5E38] rounded-full transition-all duration-300"
                    style={{ width: `${agreePercent}%` }}
                  />
                </div>

                {/* Vote buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote(take.id, 'agree')}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all',
                        userVote === 'agree'
                          ? 'bg-[#D4F0E0] text-[#1B5E38] border-[#1B5E38]'
                          : 'bg-white text-[#6B7280] border-[#D4D9D0] hover:border-[#1B5E38]'
                      )}
                    >
                      <ThumbsUp size={12} />
                      Agree
                      <span>{agreeCount.toLocaleString()}</span>
                    </button>
                    <button
                      onClick={() => handleVote(take.id, 'disagree')}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all',
                        userVote === 'disagree'
                          ? 'bg-[#FFE8EC] text-[#EF4444] border-[#EF4444]'
                          : 'bg-white text-[#6B7280] border-[#D4D9D0] hover:border-[#EF4444]'
                      )}
                    >
                      <ThumbsDown size={12} />
                      Disagree
                      <span>{disagreeCount.toLocaleString()}</span>
                    </button>
                  </div>
                  <span
                    className="text-xs text-[#9CA3AF]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {agreePercent}% agree
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        {displayed.length === 0 && (
          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-12 text-center">
            <Flame size={32} className="text-[#D4D9D0] mx-auto mb-3" />
            <p
              className="font-bold text-[#0D1B2A] mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              No takes here yet
            </p>
            <p className="text-[#6B7280] text-sm">Be the first to drop a hot take.</p>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
