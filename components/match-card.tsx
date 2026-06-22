'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Download, Share2, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Match } from '@/lib/mock-data'
import { formatWAT } from '@/lib/mock-data'
import { TeamCrest } from '@/components/ui/team-crest'
import { downloadMatchCard } from '@/lib/card-generator'
import { showToast } from '@/lib/toast'
import { useApp } from '@/lib/lang-context'

interface MatchCardProps {
  match: Match
  compact?: boolean
  className?: string
}

const LIVE = '#DC2626'
const SCHEDULED = '#2563EB'
const NEUTRAL = '#CBC9C1'
const INK = '#0D1B2A'
const MUTED = '#9CA3AF'

function surface(status: Match['status'], dataLight: boolean) {
  if (dataLight) return { bg: '#FFFFFF', border: 'border-[#E7E5DF]', accent: 'transparent' }
  if (status === 'LIVE' || status === 'HT') return { bg: '#FEF6F6', border: 'border-[#F6C6C6]', accent: LIVE }
  if (status === 'SCHEDULED') return { bg: '#F5F8FF', border: 'border-[#D8E2F4]', accent: SCHEDULED }
  return { bg: '#FFFFFF', border: 'border-[#E7E5DF]', accent: NEUTRAL }
}

function Status({ match }: { match: Match }) {
  if (match.status === 'SCHEDULED') {
    return (
      <span className="text-[#2563EB] text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }} suppressHydrationWarning>
        {formatWAT(match.kickoffTime)}
      </span>
    )
  }
  if (match.status === 'LIVE') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[#DC2626] text-[11px] font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
        {match.minute}&apos;
      </span>
    )
  }
  return (
    <span className="text-[#9CA3AF] text-[11px] font-bold uppercase tracking-wider">
      {match.status === 'HT' ? 'HT' : 'FT'}
    </span>
  )
}

function TeamRow({ team, score, hasScore, winner, dim, compact }: {
  team: Match['homeTeam']; score: number | null; hasScore: boolean; winner: boolean; dim: boolean; compact: boolean
}) {
  return (
    <div className="flex items-center gap-2.5">
      <TeamCrest team={team} size={compact ? 20 : 22} />
      <span
        className={cn('flex-1 min-w-0 truncate', dim ? 'text-[#9CA3AF]' : 'text-[#0D1B2A]')}
        style={{ fontFamily: 'var(--font-display)', fontWeight: winner ? 700 : 600, fontSize: compact ? 14 : 15 }}
      >
        {compact ? team.shortName : team.name}
      </span>
      {hasScore && (
        <span
          className="shrink-0 tabular-nums"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: compact ? 20 : 26, color: dim ? MUTED : INK }}
        >
          {score}
        </span>
      )}
    </div>
  )
}

export function MatchCard({ match, compact = false, className }: MatchCardProps) {
  const { dataLight } = useApp()
  const hasScore = match.homeScore !== null && match.awayScore !== null
  const homeWin = hasScore && (match.homeScore as number) > (match.awayScore as number)
  const awayWin = hasScore && (match.awayScore as number) > (match.homeScore as number)
  const [saving, setSaving] = useState(false)
  const s = surface(match.status, dataLight)

  async function handleDownload(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (saving) return
    setSaving(true)
    try {
      await downloadMatchCard(match)
      showToast('Card downloaded. Share it on WhatsApp.')
    } catch {
      showToast('Could not generate the card. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  function handleShare(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const text = hasScore
      ? `${match.homeTeam.name} ${match.homeScore}-${match.awayScore} ${match.awayTeam.name} | kwallo.ng/match/${match.id} via Kwallo`
      : `${match.homeTeam.name} vs ${match.awayTeam.name} - ${formatWAT(match.kickoffTime)} | kwallo.ng/match/${match.id} via Kwallo`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <Link href={`/match/${match.id}`} className={cn('block group', className)}>
      <div
        className={cn(
          'relative rounded-xl border overflow-hidden transition-all duration-150',
          'group-hover:-translate-y-0.5 group-hover:border-[#0D1B2A] group-hover:shadow-[0_10px_26px_-14px_rgba(13,27,42,0.30)]',
          s.border
        )}
        style={{ backgroundColor: s.bg }}
      >
        {/* State accent bar */}
        {!dataLight && (
          <span className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: s.accent }} aria-hidden />
        )}

        {/* Header: competition chip + status (status swaps to actions on hover) */}
        <div className="flex items-center justify-between pl-4 pr-3 pt-2.5 pb-2">
          <span className="inline-block bg-black/[0.04] text-[#6B7280] text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded">
            {match.competition.shortName}
          </span>

          <div className="relative flex items-center justify-end min-w-[56px] h-5">
            <span className={cn(!compact && 'group-hover:opacity-0 transition-opacity')}>
              <Status match={match} />
            </span>
            {!compact && (
              <div className="absolute right-0 inset-y-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleDownload}
                  disabled={saving}
                  aria-label="Download match card"
                  title="Download match card"
                  className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#6B7280] hover:text-[#1B5E38] hover:bg-black/[0.05] transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} strokeWidth={2.4} />}
                </button>
                <button
                  onClick={handleShare}
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                  className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#6B7280] hover:text-[#1B5E38] hover:bg-black/[0.05] transition-colors"
                >
                  <Share2 size={14} strokeWidth={2.4} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Teams (stacked scoreboard) */}
        <div className="pl-4 pr-3 pb-3 flex flex-col gap-2">
          <TeamRow team={match.homeTeam} score={match.homeScore} hasScore={hasScore} winner={homeWin} dim={awayWin} compact={compact} />
          <TeamRow team={match.awayTeam} score={match.awayScore} hasScore={hasScore} winner={awayWin} dim={homeWin} compact={compact} />
        </div>
      </div>
    </Link>
  )
}
