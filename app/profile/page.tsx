'use client'

import Link from 'next/link'
import { Settings, Trophy, Target, Flame, BarChart2, ExternalLink, Share2, LogOut } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { MOCK_LEADERBOARD } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const MOCK_USER = {
  name:        'Yusuf Ibrahim',
  club:        'Man City',
  joinedDate:  'March 2026',
  rank:        3,
  points:      58,
  predictions: 45,
  correct:     22,
  streak:      4,
  badges:      ['Early Adopter', 'Prediction Machine', 'NPFL Fan'],
}

const PREDICTION_HISTORY = [
  { match: 'Arsenal vs Chelsea',       comp: 'EPL',  pred: '2-1', result: '2-1', points: 3, date: 'Jun 20', status: 'exact'  as const },
  { match: 'Super Eagles vs Ghana',    comp: 'NGA',  pred: '2-0', result: '3-1', points: 1, date: 'Jun 19', status: 'winner' as const },
  { match: 'Enyimba vs Rangers',       comp: 'NPFL', pred: '1-0', result: '0-0', points: 0, date: 'Jun 18', status: 'wrong'  as const },
  { match: 'Man City vs Liverpool',    comp: 'EPL',  pred: '2-2', result: '1-0', points: 0, date: 'Jun 17', status: 'wrong'  as const },
  { match: 'Kano Pillars vs Heartland',comp: 'NPFL', pred: '2-1', result: '2-1', points: 3, date: 'Jun 16', status: 'exact'  as const },
]

const STATUS_CONFIG = {
  exact:  { label: 'Exact',  bg: '#D4F0E0', text: '#1B5E38' },
  winner: { label: 'Winner', bg: '#FFF3D0', text: '#0D1B2A' },
  wrong:  { label: 'Wrong',  bg: '#F7F5F0', text: '#9CA3AF' },
}

const STAT_CARDS = [
  { label: 'Rank',         icon: Trophy,   bg: '#FFF3D0', value: (u: typeof MOCK_USER) => `#${u.rank}`       },
  { label: 'Total Points', icon: BarChart2, bg: '#D4F0E0', value: (u: typeof MOCK_USER) => String(u.points)   },
  { label: 'Accuracy',     icon: Target,   bg: '#E8F0FF', value: (u: typeof MOCK_USER) => `${Math.round((u.correct / u.predictions) * 100)}%` },
  { label: 'Streak',       icon: Flame,    bg: '#FFE8D6', value: (u: typeof MOCK_USER) => `${u.streak}W`     },
]

export default function ProfilePage() {
  return (
    <SiteLayout>

      {/*  Profile hero - cream, no navy  */}
      <div className="max-w-[900px] mx-auto px-6 pt-10 pb-4">
        <div className="bg-[#E8F0FF] border-2 border-[#0D1B2A] rounded-2xl card-shadow px-8 py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full border-2 border-[#0D1B2A] card-shadow-sm flex items-center justify-center text-white text-2xl font-extrabold shrink-0"
                style={{ backgroundColor: '#1B5E38', fontFamily: 'var(--font-display)' }}
              >
                {MOCK_USER.name.slice(0, 1)}
              </div>
              <div>
                <h1
                  className="text-2xl font-extrabold text-[#0D1B2A] mb-0.5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {MOCK_USER.name}
                </h1>
                <div className="flex items-center gap-2 flex-wrap text-sm text-[#6B7280]">
                  <span>{MOCK_USER.club} fan</span>
                  <span>, </span>
                  <span>Joined {MOCK_USER.joinedDate}</span>
                </div>
              </div>
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border-2 border-[#0D1B2A] text-[#0D1B2A] text-xs font-bold transition-all hover:card-shadow-sm shrink-0"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <Settings size={13} />
              Settings
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-6 pb-24 md:pb-8">

        {/*  Stats row  */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {STAT_CARDS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="border-2 border-[#0D1B2A] rounded-2xl card-shadow p-4"
                style={{ backgroundColor: stat.bg }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#6B7280] text-xs font-semibold">{stat.label}</span>
                  <Icon size={14} className="text-[#0D1B2A]" />
                </div>
                <div
                  className="text-2xl font-extrabold text-[#0D1B2A]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {stat.value(MOCK_USER)}
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/*  Prediction history  */}
          <div className="md:col-span-2">
            <h2
              className="text-lg font-bold text-[#0D1B2A] mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Prediction History
            </h2>
            <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow overflow-hidden">
              {PREDICTION_HISTORY.map((pred, i) => {
                const cfg = STATUS_CONFIG[pred.status]
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-4 border-b border-[#D4D9D0] last:border-0 hover:bg-[#F7F5F0] transition-colors"
                  >
                    {/* Points badge */}
                    <div
                      className="w-9 h-9 rounded-full border-2 border-[#0D1B2A] flex items-center justify-center text-xs font-extrabold shrink-0"
                      style={{
                        backgroundColor: cfg.bg,
                        color: cfg.text,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {pred.points > 0 ? `+${pred.points}` : '0'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                        <span
                          className="font-bold text-[#0D1B2A] text-sm truncate"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {pred.match}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full bg-[#F7F5F0] border border-[#D4D9D0] text-[#9CA3AF] text-[10px] font-bold shrink-0">
                          {pred.comp}
                        </span>
                      </div>
                      <div className="text-[#9CA3AF] text-xs">
                        Predicted:{' '}
                        <span className="font-bold text-[#0D1B2A]" style={{ fontFamily: 'var(--font-mono)' }}>
                          {pred.pred}
                        </span>
                        {', '}
                        Result:{' '}
                        <span className="font-bold text-[#0D1B2A]" style={{ fontFamily: 'var(--font-mono)' }}>
                          {pred.result}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className="px-2.5 py-0.5 rounded-full border border-[#D4D9D0] text-xs font-bold mb-1"
                        style={{ backgroundColor: cfg.bg, color: cfg.text }}
                      >
                        {cfg.label}
                      </div>
                      <div className="text-[#9CA3AF] text-xs">{pred.date}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-3 text-center">
              <Link
                href="/predictions"
                className="inline-flex items-center gap-1 text-sm text-[#1B5E38] font-bold hover:underline"
              >
                Make new predictions <ExternalLink size={12} />
              </Link>
            </div>
          </div>

          {/*  Sidebar  */}
          <div className="space-y-5">

            {/* Badges */}
            <div>
              <h2
                className="text-lg font-bold text-[#0D1B2A] mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Badges
              </h2>
              <div className="space-y-2">
                {MOCK_USER.badges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-3 bg-white border-2 border-[#0D1B2A] rounded-xl px-3 py-2.5 card-shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#FFF3D0] border border-[#F5A623] flex items-center justify-center shrink-0">
                      <Trophy size={12} className="text-[#F5A623]" />
                    </div>
                    <span
                      className="text-sm font-bold text-[#0D1B2A]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard position */}
            <div>
              <h2
                className="text-lg font-bold text-[#0D1B2A] mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Leaderboard
              </h2>
              <div className="bg-[#FFF3D0] border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5 text-center">
                <div
                  className="text-4xl font-extrabold text-[#0D1B2A] mb-1"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  #{MOCK_USER.rank}
                </div>
                <p className="text-[#9CA3AF] text-xs mb-3">out of 1,204 predictors</p>
                <Link
                  href="/leaderboard"
                  className="inline-flex items-center gap-1 text-[#1B5E38] text-sm font-bold hover:underline"
                >
                  View leaderboard <ExternalLink size={12} />
                </Link>
              </div>
            </div>

            {/* Share */}
            <button
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#0D1B2A] rounded-xl card-shadow-sm text-[#0D1B2A] py-3 text-sm font-bold transition-all hover:translate-y-[-1px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <Share2 size={14} />
              Share My Stats
            </button>

            {/* Sign out */}
            <button
              className="w-full flex items-center justify-center gap-2 text-sm text-[#EF4444] font-semibold hover:underline transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
