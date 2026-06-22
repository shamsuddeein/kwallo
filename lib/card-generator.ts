import type { Match } from './mock-data'
import { formatWAT, formatMatchDate } from './mock-data'

const INK = '#0D1B2A'
const CREAM = '#F7F5F0'
const GREEN = '#1B5E38'
const GOLD = '#F5A623'
const RED = '#DC2626'
const MUTED = '#6B7280'

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath()
    ctx.roundRect(x, y, w, h, r)
    return
  }
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawPill(ctx: CanvasRenderingContext2D, text: string, cx: number, cy: number, bg: string, fg: string) {
  ctx.font = '700 30px "Space Grotesk", sans-serif'
  const padX = 26
  const w = ctx.measureText(text).width + padX * 2
  const h = 58
  roundRectPath(ctx, cx - w / 2, cy - h / 2, w, h, h / 2)
  ctx.fillStyle = bg
  ctx.fill()
  ctx.fillStyle = fg
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, cx, cy + 1)
}

const SHIELD = 'M12 1.5L20.5 4.2V11C20.5 16 16.8 19.8 12 21.6C7.2 19.8 3.5 16 3.5 11V4.2Z'

function drawCrest(ctx: CanvasRenderingContext2D, color: string, label: string, cx: number, cy: number, sizePx: number) {
  const scale = sizePx / 24
  ctx.save()
  ctx.translate(cx - sizePx / 2, cy - sizePx / 2)
  ctx.scale(scale, scale)
  const shield = new Path2D(SHIELD)
  ctx.fillStyle = color || GREEN
  ctx.fill(shield)
  ctx.lineWidth = 1.6
  ctx.strokeStyle = INK
  ctx.lineJoin = 'round'
  ctx.stroke(shield)
  ctx.restore()

  ctx.fillStyle = '#FFFFFF'
  ctx.font = `700 ${Math.round(sizePx * 0.26)}px "Space Grotesk", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, cx, cy + sizePx * 0.01)
}

// The Kwallo brand mark (football badge), drawn at (x, y) top-left at the given size.
function drawLogoMark(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const sc = size / 48
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(sc, sc)

  // Rounded green tile
  roundRectPath(ctx, 1, 1, 46, 46, 11)
  ctx.fillStyle = GREEN
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = INK
  ctx.stroke()

  // White ball
  ctx.beginPath()
  ctx.arc(24, 24, 13, 0, Math.PI * 2)
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()

  // Centre pentagon
  const pent = new Path2D('M24 19 L28.76 22.45 L26.94 28.05 L21.06 28.05 L19.24 22.45 Z')
  ctx.fillStyle = INK
  ctx.fill(pent)

  // Seams
  ctx.strokeStyle = INK
  ctx.lineWidth = 1.7
  ctx.lineCap = 'round'
  const seams = [
    [24, 19, 24, 11.2], [28.76, 22.45, 36.2, 20.1], [26.94, 28.05, 31.5, 34.3],
    [21.06, 28.05, 16.5, 34.3], [19.24, 22.45, 11.8, 20.1],
  ]
  ctx.beginPath()
  for (const [x1, y1, x2, y2] of seams) { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2) }
  ctx.stroke()

  // Gold accent dot
  ctx.beginPath()
  ctx.arc(40, 40, 3.5, 0, Math.PI * 2)
  ctx.fillStyle = GOLD
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = INK
  ctx.stroke()

  ctx.restore()
}

function initials(name: string): string {
  return name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

// Load an image for the canvas. Resolves null on failure (or cross-origin without CORS).
function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = url
  })
}

// Circular man-of-the-match avatar: the player photo if available, else initials on green.
function drawMotmAvatar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, name: string, img: HTMLImageElement | null) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  if (img) {
    const s = Math.max((r * 2) / img.width, (r * 2) / img.height)
    const w = img.width * s, h = img.height * s
    ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h)
  } else {
    ctx.fillStyle = GREEN
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = `700 ${Math.round(r * 0.7)}px "Space Grotesk", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(initials(name), cx, cy + 2)
  }
  ctx.restore()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.lineWidth = 4
  ctx.strokeStyle = INK
  ctx.stroke()
}

async function ensureFonts() {
  try {
    const f = (document as Document & { fonts: FontFaceSet }).fonts
    await Promise.all([
      f.load('700 100px "Space Grotesk"'),
      f.load('700 100px "Space Mono"'),
      f.load('600 100px "Inter"'),
      f.ready,
    ])
  } catch {
    /* fall back to system fonts */
  }
}

/**
 * Render a 1080x1080 branded match card and download it as PNG.
 * Pre-match shows kickoff time; finished/live shows the score + scorers.
 */
export async function downloadMatchCard(match: Match): Promise<void> {
  await ensureFonts()

  const S = 1080
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const hasScore = match.homeScore !== null && match.awayScore !== null

  // Background
  ctx.fillStyle = CREAM
  ctx.fillRect(0, 0, S, S)

  // Outer border frame
  ctx.strokeStyle = INK
  ctx.lineWidth = 14
  roundRectPath(ctx, 36, 36, S - 72, S - 72, 56)
  ctx.stroke()

  // Competition
  ctx.fillStyle = MUTED
  ctx.font = '700 34px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(match.competition.name.toUpperCase(), S / 2, 150)

  // Status pill
  if (match.status === 'LIVE') {
    drawPill(ctx, `LIVE ${match.minute}'`, S / 2, 224, RED, '#FFFFFF')
  } else if (match.status === 'HT') {
    drawPill(ctx, 'HALF TIME', S / 2, 224, GOLD, INK)
  } else if (match.status === 'FT') {
    drawPill(ctx, 'FULL TIME', S / 2, 224, GREEN, '#FFFFFF')
  } else {
    drawPill(ctx, formatMatchDate(match.kickoffTime).toUpperCase(), S / 2, 224, GREEN, '#FFFFFF')
  }

  // Man of the match (finished games only)
  const motm = match.status === 'FT' && match.motm ? match.motm : null
  const motmImg = motm?.photo ? await loadImage(motm.photo) : null
  if (motm) {
    const tctx = ctx as CanvasRenderingContext2D & { letterSpacing: string }
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#9A6E12'
    ctx.font = '700 24px "Space Grotesk", sans-serif'
    tctx.letterSpacing = '4px'
    ctx.fillText('MAN OF THE MATCH', S / 2, 300)
    tctx.letterSpacing = '0px'
    drawMotmAvatar(ctx, S / 2, 392, 70, motm.name, motmImg)
    ctx.fillStyle = INK
    ctx.font = '700 40px "Space Grotesk", sans-serif'
    ctx.fillText(motm.name, S / 2, 512)
  }

  // Crests in the left / right columns, score lives in the centre gap
  const crestY = motm ? 648 : 408
  const crestSize = 158
  const homeX = 234
  const awayX = S - 234
  drawCrest(ctx, match.homeTeam.color, match.homeTeam.shortName, homeX, crestY, crestSize)
  drawCrest(ctx, match.awayTeam.color, match.awayTeam.shortName, awayX, crestY, crestSize)

  // Centre: score or kickoff time, sized to fit between the crests
  const innerGap = (awayX - crestSize / 2) - (homeX + crestSize / 2)
  ctx.fillStyle = INK
  if (hasScore) {
    const scoreText = `${match.homeScore} - ${match.awayScore}`
    let f = 130
    ctx.font = `700 ${f}px "Space Mono", monospace`
    while (ctx.measureText(scoreText).width > innerGap - 64 && f > 60) {
      f -= 4
      ctx.font = `700 ${f}px "Space Mono", monospace`
    }
    ctx.fillText(scoreText, S / 2, crestY)
  } else {
    ctx.font = '700 60px "Space Mono", monospace'
    ctx.fillText('VS', S / 2, crestY - 28)
    ctx.fillStyle = GREEN
    ctx.font = '700 40px "Space Mono", monospace'
    ctx.fillText(formatWAT(match.kickoffTime), S / 2, crestY + 34)
  }

  // Team names under crests
  ctx.fillStyle = INK
  ctx.font = '700 46px "Space Grotesk", sans-serif'
  ctx.fillText(match.homeTeam.name, homeX, crestY + 138)
  ctx.fillText(match.awayTeam.name, awayX, crestY + 138)

  // Scorers / venue
  ctx.fillStyle = MUTED
  ctx.font = '500 25px "Inter", sans-serif'
  if (hasScore) {
    const home = match.homeScorers?.join(', ') || ''
    const away = match.awayScorers?.join(', ') || ''
    if (home) { ctx.textAlign = 'left';  ctx.fillText(home, 76, crestY + 200) }
    if (away) { ctx.textAlign = 'right'; ctx.fillText(away, S - 76, crestY + 200) }
    ctx.textAlign = 'center'
  } else if (match.venue) {
    ctx.textAlign = 'center'
    ctx.fillText(match.venue, S / 2, crestY + 206)
  }

  // Footer divider
  ctx.strokeStyle = '#D9D6CF'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(110, S - 190)
  ctx.lineTo(S - 110, S - 190)
  ctx.stroke()

  // Logo mark + wordmark
  const markSize = 52
  drawLogoMark(ctx, 110, S - 146, markSize)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = GREEN
  ctx.font = '700 50px "Space Grotesk", sans-serif'
  const wordX = 110 + markSize + 16
  ctx.fillText('Kwallo', wordX, S - 119)
  const kw = ctx.measureText('Kwallo').width
  ctx.fillStyle = GOLD
  ctx.fillText('.', wordX + kw + 2, S - 119)

  // URL
  ctx.textAlign = 'right'
  ctx.fillStyle = MUTED
  ctx.font = '600 30px "Inter", sans-serif'
  ctx.fillText(`kwallo.ng/match/${match.id}`, S - 110, S - 116)

  // Export
  const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, 'image/png'))
  if (!blob) return
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `kwallo-${match.id}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
