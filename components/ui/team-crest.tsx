'use client'

import type { Team } from '@/lib/mock-data'
import { useApp } from '@/lib/lang-context'

/**
 * A crest-style team badge: a shield in the club colour with the club
 * monogram on top. License-safe stand-in for real club logos.
 * Respects data-light mode (flat, no colour fill).
 */
export function TeamCrest({ team, size = 32 }: { team: Team; size?: number }) {
  const { dataLight } = useApp()
  const fill = dataLight ? '#FFFFFF' : team.color
  const txt  = dataLight ? '#0D1B2A' : '#FFFFFF'

  return (
    <span
      className="kw-crest relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="absolute inset-0">
        <path
          d="M12 1.5L20.5 4.2V11C20.5 16 16.8 19.8 12 21.6C7.2 19.8 3.5 16 3.5 11V4.2Z"
          fill={fill}
          stroke="#0D1B2A"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="relative leading-none"
        style={{
          color: txt,
          fontSize: Math.round(size * 0.3),
          fontWeight: 700,
          letterSpacing: '-0.04em',
          fontFamily: 'var(--font-display)',
          marginTop: -size * 0.04,
        }}
      >
        {team.shortName}
      </span>
    </span>
  )
}
