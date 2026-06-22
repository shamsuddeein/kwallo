import { cn } from '@/lib/utils'

/**
 * Kwallo brand mark: a stylised football.
 *  - "badge": green rounded tile + ball + gold accent (for cream / light backgrounds)
 *  - "ball":  the bare ball (for dark / green backgrounds like the navbar)
 */
export function KwalloMark({
  size = 32,
  variant = 'badge',
  className,
}: {
  size?: number
  variant?: 'badge' | 'ball'
  className?: string
}) {
  const pentagon = 'M24 19 L28.76 22.45 L26.94 28.05 L21.06 28.05 L19.24 22.45 Z'
  const seams = (
    <g stroke="#0D1B2A" strokeWidth="1.7" strokeLinecap="round">
      <line x1="24" y1="19" x2="24" y2="11.2" />
      <line x1="28.76" y1="22.45" x2="36.2" y2="20.1" />
      <line x1="26.94" y1="28.05" x2="31.5" y2="34.3" />
      <line x1="21.06" y1="28.05" x2="16.5" y2="34.3" />
      <line x1="19.24" y1="22.45" x2="11.8" y2="20.1" />
    </g>
  )

  if (variant === 'ball') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="14" fill="#FFFFFF" />
        <path d={pentagon} fill="#0D1B2A" />
        {seams}
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="46" height="46" rx="11" fill="#1B5E38" stroke="#0D1B2A" strokeWidth="2" />
      <circle cx="24" cy="24" r="13" fill="#FFFFFF" />
      <path d={pentagon} fill="#0D1B2A" />
      {seams}
      <circle cx="40" cy="40" r="3.5" fill="#F5A623" stroke="#0D1B2A" strokeWidth="2" />
    </svg>
  )
}

/**
 * Full lockup: mark + "Kwallo." wordmark.
 */
export function KwalloLogo({
  variant = 'badge',
  markSize = 30,
  textClassName,
  dotClassName = 'text-[#F5A623]',
  fontSize = 24,
  className,
}: {
  variant?: 'badge' | 'ball'
  markSize?: number
  textClassName?: string
  dotClassName?: string
  fontSize?: number
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <KwalloMark size={markSize} variant={variant} />
      <span
        className={cn('leading-none', textClassName)}
        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em', fontSize }}
      >
        Kwallo<span className={dotClassName}>.</span>
      </span>
    </span>
  )
}
