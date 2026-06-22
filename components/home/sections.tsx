'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PlayCircle, Star, Download, Flag, Globe, Radio, Target } from 'lucide-react'
import { useApp } from '@/lib/lang-context'
import { t, MOCK_TODAY_MATCHES, MOCK_HOT_TAKES, MOCK_NPFL_STANDINGS, MOCK_LIVE_MATCHES } from '@/lib/mock-data'
import { MatchCard } from '@/components/match-card'
import { TeamCrest } from '@/components/ui/team-crest'
import { cn } from '@/lib/utils'

const display = (weight = 700) => ({ fontFamily: 'var(--font-display)', fontWeight: weight, letterSpacing: '-0.02em' })

//  Live LIVE pill 

function LivePill() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border-2 border-[#DC2626] text-[#DC2626] text-[10px] font-bold uppercase tracking-wider">
      <span className="live-dot-sm" />
      Live
    </span>
  )
}

//  Section header 

function SectionHeader({ title, link, linkLabel }: { title: string; link?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <h2 className="text-4xl md:text-5xl leading-[0.95] text-[#0D1B2A]" style={display()}>
        {title}
      </h2>
      {link && linkLabel && (
        <Link href={link} className="shrink-0 text-sm font-semibold text-[#1B5E38] hover:underline ml-4">
          {linkLabel}
        </Link>
      )}
    </div>
  )
}

//  Competition filter tabs 

const COMP_TABS = ['All', 'Premier League', 'NPFL', 'Champions League', 'La Liga', 'Super Eagles']

function CompTabs({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
      {COMP_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            'shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-full border-2 whitespace-nowrap',
            active === tab
              ? 'bg-[#1B5E38] border-[#1B5E38] text-white'
              : 'bg-white border-[#D9D6CF] text-[#0D1B2A] hover:border-[#0D1B2A]'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

//  Live Scores Strip 

export function LiveScoresStrip() {
  const { lang } = useApp()
  if (MOCK_LIVE_MATCHES.length === 0) return null

  return (
    <section className="bg-white border-y-2 border-[#0D1B2A] py-10">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#6B7280]">{t('live_now', lang)}</span>
          <LivePill />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {MOCK_LIVE_MATCHES.map((match) => (
            <MatchCard key={match.id} match={match} compact className="min-w-[280px]" />
          ))}
        </div>
      </div>
    </section>
  )
}

//  Today's Matches 

export function TodaysMatches() {
  const { lang } = useApp()
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All'
    ? MOCK_TODAY_MATCHES
    : MOCK_TODAY_MATCHES.filter((m) => {
        if (activeTab === 'Premier League')   return m.competition.id === 'epl'
        if (activeTab === 'NPFL')             return m.competition.id === 'npfl'
        if (activeTab === 'Champions League') return m.competition.id === 'ucl'
        if (activeTab === 'La Liga')          return m.competition.id === 'laliga'
        if (activeTab === 'Super Eagles')     return m.competition.id === 'superEagles'
        return true
      })

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <SectionHeader title={t('todays_matches', lang)} link="/fixtures" linkLabel={t('all_fixtures', lang)} />
      <CompTabs active={activeTab} onChange={setActiveTab} />

      {filtered.length === 0 ? (
        <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl p-12 text-center">
          <p className="text-[#0D1B2A]" style={{ ...display(), fontSize: '28px' }}>No matches today</p>
          <p className="text-[#6B7280] text-sm mt-2 font-medium">Try a different filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </section>
  )
}

//  How Kwallo Works 

const HOW_STEPS = [
  { num: '01', bg: '#D4F0E0', Icon: Radio,    titleKey: 'how_t1', descKey: 'how_1' },
  { num: '02', bg: '#FFF3D0', Icon: Target,   titleKey: 'how_t2', descKey: 'how_2' },
  { num: '03', bg: '#FFE8EC', Icon: Download, titleKey: 'how_t3', descKey: 'how_3' },
]

export function HowItWorks() {
  const { lang, dataLight } = useApp()
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h2 className="text-4xl md:text-5xl text-[#0D1B2A] mb-10" style={display(700)}>
        {t('how_title', lang)}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {HOW_STEPS.map(({ num, bg, Icon, titleKey, descKey }) => (
          <div
            key={num}
            className="p-8 flex flex-col gap-5 border-2 border-[#0D1B2A] rounded-2xl"
            style={{ backgroundColor: dataLight ? '#FFFFFF' : bg }}
          >
            <div className="flex items-center justify-between">
              <span
                className="w-11 h-11 rounded-full bg-[#0D1B2A] text-white flex items-center justify-center text-sm"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}
              >
                {num}
              </span>
              <Icon size={24} strokeWidth={2} className="text-[#0D1B2A]/70" />
            </div>
            <h3 className="text-2xl text-[#0D1B2A] leading-tight" style={display(600)}>{t(titleKey, lang)}</h3>
            <p className="text-[#0D1B2A]/70 text-sm leading-relaxed">{t(descKey, lang)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

//  Feature Cards 

const FEATURE_CARDS = [
  { bg: '#D4F0E0', Icon: PlayCircle, titleKey: 'f_scores_t',  descKey: 'f_scores_d'  },
  { bg: '#FFF3D0', Icon: Star,       titleKey: 'f_predict_t', descKey: 'f_predict_d' },
  { bg: '#FFE8EC', Icon: Download,   titleKey: 'f_cards_t',   descKey: 'f_cards_d'   },
  { bg: '#E8F0FF', Icon: Flag,       titleKey: 'f_npfl_t',    descKey: 'f_npfl_d'    },
  { bg: '#FFE8D6', Icon: Globe,      titleKey: 'f_hausa_t',   descKey: 'f_hausa_d'   },
]

export function FeatureCards() {
  const { lang, dataLight } = useApp()
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h2 className="text-center text-4xl md:text-5xl text-[#0D1B2A] mb-12" style={display(700)}>
        {t('features_title', lang)}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURE_CARDS.map(({ bg, Icon, titleKey, descKey }) => (
          <div
            key={titleKey}
            className="p-8 flex flex-col gap-4 border-2 border-[#0D1B2A] rounded-2xl"
            style={{ backgroundColor: dataLight ? '#FFFFFF' : bg }}
          >
            <Icon size={26} strokeWidth={2} className="text-[#0D1B2A]" />
            <h3 className="text-2xl text-[#0D1B2A] leading-tight" style={display(600)}>{t(titleKey, lang)}</h3>
            <p className="text-[#0D1B2A]/70 text-sm leading-relaxed">{t(descKey, lang)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

//  NPFL Section 

export function NPFLSpotlight() {
  const { lang } = useApp()
  return (
    <section className="bg-white border-y-2 border-[#0D1B2A] py-16">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <h2 className="text-4xl md:text-5xl text-[#0D1B2A] mb-4" style={display(700)}>{t('npfl_title', lang)}</h2>
          <p className="text-[#6B7280] text-lg leading-relaxed mb-6 max-w-[440px]">
            {t('npfl_sub', lang)}
          </p>
          <Link href="/npfl" className="text-sm font-semibold text-[#1B5E38] hover:underline">{t('see_npfl_hub', lang)}</Link>
        </div>

        {/* Right: standings card */}
        <div className="border-2 border-[#0D1B2A] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-[#D4F0E0] border-b-2 border-[#0D1B2A]">
            <span className="text-sm font-bold uppercase tracking-wider text-[#0D1B2A]" style={display(700)}>{t('npfl_standings', lang)}</span>
            <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'var(--font-mono)' }}>2025/26</span>
          </div>
          {MOCK_NPFL_STANDINGS.map((row, i) => (
            <div
              key={row.position}
              className={cn(
                'flex items-center gap-3 px-5 py-3 text-sm border-b border-[#0D1B2A]/10 last:border-0',
                i % 2 === 1 ? 'bg-[#F7F5F0]' : 'bg-white'
              )}
            >
              <span className="w-5 text-[#6B7280] font-bold text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{row.position}</span>
              <TeamCrest team={row.team} size={24} />
              <span className="flex-1 font-semibold text-[#0D1B2A]">{row.team.name}</span>
              <span className="font-bold text-[#0D1B2A]" style={{ fontFamily: 'var(--font-mono)' }}>{row.points}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

//  Download CTA Block 

const CTA_PREVIEWS = [
  { label: 'Pre-Match', text: 'ARS vs CHE, 18:00 WAT' },
  { label: 'Scorecard', text: 'ARS 2 - 1 CHE, 67\'' },
  { label: 'I Called It', text: 'Predicted 2 - 1, +3 pts' },
]

export function DownloadCTA() {
  const { lang } = useApp()
  return (
    <section className="px-4 py-16">
      <div className="relative max-w-[900px] mx-auto bg-[#D4F0E0] border-2 border-[#0D1B2A] rounded-3xl px-8 py-14 md:px-14 text-center overflow-hidden">
        {/* Decorative shapes */}
        <div className="kw-decor hidden sm:block absolute -top-8 -left-8 w-24 h-24 rounded-full bg-white border-2 border-[#0D1B2A]" />
        <div className="kw-decor hidden sm:block absolute -bottom-8 -right-8 w-24 h-24 rounded-2xl bg-[#FFF3D0] border-2 border-[#0D1B2A] rotate-[15deg]" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-[48px] leading-[1.05] text-[#0D1B2A] mb-4" style={display(700)}>
            {t('cta_title', lang)}
          </h2>
          <p className="text-[#0D1B2A]/70 text-lg leading-relaxed max-w-[520px] mx-auto mb-8">
            {t('cta_sub', lang)}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link href="/fixtures" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1B5E38] text-white font-semibold text-sm rounded-full border-2 border-[#1B5E38] btn-press">
              <Download size={16} strokeWidth={2.5} />
              {t('download_a_card', lang)}
            </Link>
            <Link href="/live" className="px-7 py-3.5 bg-white text-[#0D1B2A] font-semibold text-sm rounded-full border-2 border-[#0D1B2A] btn-press">
              {t('see_how', lang)}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[560px] mx-auto">
            {CTA_PREVIEWS.map((card) => (
              <div key={card.label} className="bg-white border-2 border-[#0D1B2A] rounded-xl px-4 py-3 text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#1B5E38] mb-1">{card.label}</p>
                <p className="text-xs text-[#0D1B2A] font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

//  Hot Takes Preview 

export function HotTakesPreview() {
  const { lang } = useApp()

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <SectionHeader title={t('fan_hot_takes', lang)} link="/hot-takes" linkLabel={t('see_all', lang)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {MOCK_HOT_TAKES.slice(0, 3).map((take) => {
          const total        = take.agreeCount + take.disagreeCount
          const agreePercent = total > 0 ? Math.round((take.agreeCount / total) * 100) : 0
          return (
            <div key={take.id} className="bg-white border-2 border-[#0D1B2A] rounded-2xl flex flex-col gap-5 p-6">
              {take.trending && (
                <span className="self-start bg-[#FFF3D0] text-[#0D1B2A] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                  {t('trending', lang)}
                </span>
              )}

              <p className="text-base text-[#0D1B2A] leading-relaxed flex-1 font-semibold">
                {take.content.length > 130 ? take.content.slice(0, 130) + '...' : take.content}
              </p>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">{take.userName}, {take.userClub}</div>
                <div className="h-2.5 rounded-full border-2 border-[#0D1B2A] overflow-hidden flex">
                  <div className="h-full bg-[#1B5E38]" style={{ width: `${agreePercent}%` }} />
                  <div className="h-full bg-[#DC2626] flex-1" />
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mt-1.5">
                  <span className="text-[#1B5E38]">{agreePercent}% Agree</span>
                  <span className="text-[#DC2626]">{100 - agreePercent}% No</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-[#1B5E38] text-white text-xs font-bold uppercase tracking-wider rounded-full border-2 border-[#1B5E38] btn-press">
                  {t('agree', lang)}
                </button>
                <button className="flex-1 py-2.5 bg-white text-[#DC2626] text-xs font-bold uppercase tracking-wider rounded-full border-2 border-[#DC2626] btn-press">
                  {t('disagree', lang)}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
