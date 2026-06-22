import { SiteLayout } from '@/components/site-layout'

export type LegalSection = { heading: string; body: string[] }

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <SiteLayout>
      {/* Hero */}
      <div className="max-w-[820px] mx-auto px-6 pt-10 pb-2">
        <div className="bg-[#FFF3D0] border-2 border-[#0D1B2A] rounded-2xl px-8 py-10">
          <h1 className="text-4xl md:text-5xl text-[#0D1B2A] mb-3 leading-[1.05]" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            {title}
          </h1>
          <p className="text-[#0D1B2A]/70 leading-relaxed max-w-[560px]">{intro}</p>
          <p className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider mt-5">Last updated: {updated}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[820px] mx-auto px-6 py-12 pb-24 md:pb-12">
        <div className="space-y-9">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-2xl text-[#0D1B2A] mb-3 flex items-baseline gap-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.01em' }}>
                <span className="text-[#1B5E38]" style={{ fontFamily: 'var(--font-mono)' }}>{i + 1}.</span>
                {s.heading}
              </h2>
              <div className="space-y-3 pl-7">
                {s.body.map((p, j) => (
                  <p key={j} className="text-[#0D1B2A]/75 text-[15px] leading-relaxed">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
