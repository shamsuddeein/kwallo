// Capture /login and /register at mobile / tablet / desktop into screenshots/live/.
// Usage:
//   pnpm dev                      (in another terminal)
//   pnpm add -D playwright && npx playwright install chromium
//   node scripts/screenshots.mjs
//   BASE_URL=http://localhost:3001 node scripts/screenshots.mjs   (custom port)

import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL || 'http://localhost:3000'
const OUT = 'screenshots/live'
const ROUTES = ['login', 'register']
const VIEWPORTS = [
  { name: 'mobile',  width: 390,  height: 844 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
]

mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()
  for (const route of ROUTES) {
    await page.goto(`${BASE}/${route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500) // let fonts settle
    const path = `${OUT}/${route}-${vp.name}.png`
    await page.screenshot({ path, fullPage: true })
    console.log('saved', path)
  }
  await ctx.close()
}

await browser.close()
console.log('\nDone. Live screenshots are in', OUT)
