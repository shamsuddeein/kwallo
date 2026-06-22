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

  // Crests in the left / right columns, score lives in the centre gap
  const crestY = 408
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
  ctx.font = '500 28px "Inter", sans-serif'
  if (hasScore) {
    const home = match.homeScorers?.join(', ') || ''
    const away = match.awayScorers?.join(', ') || ''
    if (home) ctx.fillText(home, homeX, crestY + 200)
    if (away) ctx.fillText(away, awayX, crestY + 200)
  } else if (match.venue) {
    ctx.fillText(match.venue, S / 2, crestY + 206)
  }

  // Footer divider
  ctx.strokeStyle = '#D9D6CF'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(110, S - 190)
  ctx.lineTo(S - 110, S - 190)
  ctx.stroke()

  // Wordmark
  ctx.textAlign = 'left'
  ctx.fillStyle = GREEN
  ctx.font = '700 56px "Space Grotesk", sans-serif'
  ctx.fillText('Kwallo', 110, S - 120)
  const kw = ctx.measureText('Kwallo').width
  ctx.fillStyle = GOLD
  ctx.fillText('.', 110 + kw + 2, S - 120)

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
