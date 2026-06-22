import Link from 'next/link'
import { Radio, Trophy, Zap, Image as ImageIcon, Target, Globe } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'

const PROBLEMS = [
  { bg: '#FFE8EC', Icon: Globe,     title: 'No Hausa football content', desc: 'No major platform covers football in Hausa. Kwallo runs every page in English and Hausa.' },
  { bg: '#D4F0E0', Icon: Trophy,    title: 'The NPFL is ignored',       desc: 'The local league is almost invisible online. We cover NPFL scores, tables and previews daily.' },
  { bg: '#FFF3D0', Icon: Zap,       title: 'Heavy, costly pages',       desc: 'Most sites load slowly on limited data. Data-light mode strips images and loads text only.' },
  { bg: '#E8F0FF', Icon: ImageIcon, title: 'Hard to share results',      desc: 'There is no easy way to share a result. Kwallo makes a clean match card for WhatsApp.' },
  { bg: '#FFE8D6', Icon: Target,    title: 'No local prediction game',  desc: 'A free prediction leaderboard, built for Nigerian fans. Bragging rights only, never betting.' },
]

const OFFERINGS = [
  { Icon: Radio,  title: 'Live scores',  desc: 'EPL, NPFL, UCL and the Super Eagles, always in West Africa Time.' },
  { Icon: Target, title: 'Predictions',  desc: 'Predict scorelines before kickoff, earn points, climb the monthly leaderboard.' },
  { Icon: Trophy, title: 'NPFL first',   desc: 'Full coverage of the Nigerian league: scores, standings and stats.' },
]

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-4">
        <div className="bg-[#D4F0E0] border-2 border-[#0D1B2A] rounded-2xl px-8 py-12 md:px-12">
          <span className="inline-block bg-[#1B5E38] text-white text-xs font-bold uppercase tracking-[0.08em] px-4 py-1.5 rounded-full mb-5">
            About Kwallo
          </span>
          <h1 className="text-4xl md:text-5xl text-[#0D1B2A] mb-4 leading-[1.05]" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Nigeria&apos;s football home.
          </h1>
          <p className="text-[#0D1B2A]/70 text-lg leading-relaxed max-w-[640px]">
            Kwallo is a football platform built for Nigerian fans, with a special focus on the
            Northern Nigerian and Hausa-speaking audience. Live scores, a free prediction game,
            shareable match cards, and full NPFL coverage, in English and Hausa.
          </p>
        </div>
      </div>

      {/* Problem we solve */}
      <section className="max-w-[1100px] mx-auto px-6 py-14">
        <h2 className="text-3xl md:text-4xl text-[#0D1B2A] mb-8" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          The problem we are solving
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map(({ bg, Icon, title, desc }) => (
            <div key={title} className="p-7 flex flex-col gap-3 border-2 border-[#0D1B2A] rounded-2xl" style={{ backgroundColor: bg }}>
              <Icon size={26} strokeWidth={2} className="text-[#0D1B2A]" />
              <h3 className="text-xl text-[#0D1B2A] leading-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{title}</h3>
              <p className="text-[#0D1B2A]/70 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-white border-y-2 border-[#0D1B2A] py-14">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl text-[#0D1B2A] mb-8" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            What Kwallo offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OFFERINGS.map(({ Icon, title, desc }) => (
              <div key={title} className="p-7 flex flex-col gap-3 border-2 border-[#0D1B2A] rounded-2xl bg-[#F7F5F0]">
                <Icon size={26} strokeWidth={2} className="text-[#1B5E38]" />
                <h3 className="text-xl text-[#0D1B2A] leading-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{title}</h3>
                <p className="text-[#0D1B2A]/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="max-w-[800px] mx-auto bg-[#1B5E38] rounded-3xl px-8 py-12 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Join the prediction game
          </h2>
          <p className="text-white/70 leading-relaxed max-w-[440px] mx-auto mb-8">
            Free to play, no betting. Pick scorelines, earn points, and see how your predictions stack up.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/register" className="px-7 py-3.5 bg-[#F5A623] text-[#0D1B2A] font-semibold text-sm rounded-full border-2 border-[#0D1B2A] btn-press">
              Create an account
            </Link>
            <Link href="/live" className="px-7 py-3.5 bg-transparent text-white font-semibold text-sm rounded-full border-2 border-white/40 hover:bg-white/10 transition-colors">
              See live scores
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
