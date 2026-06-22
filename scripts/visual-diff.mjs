// Pixel-diff live screenshots against your reference images.
// 1. Put reference PNGs in screenshots/reference/ using the SAME filenames
//    that screenshots.mjs produces (e.g. login-mobile.png, register-desktop.png).
// 2. pnpm add -D pixelmatch pngjs
// 3. node scripts/visual-diff.mjs
//
// Prints per-image mismatch counts/percentages and writes highlighted diffs
// to screenshots/diff/. Exit code 1 if anything differs.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const REF = 'screenshots/reference'
const LIVE = 'screenshots/live'
const DIFF = 'screenshots/diff'

if (!existsSync(LIVE)) {
  console.error(`No live screenshots found. Run: node scripts/screenshots.mjs`)
  process.exit(1)
}
if (!existsSync(REF)) {
  console.error(`No reference images. Put your reference PNGs in ${REF}/ (same filenames as ${LIVE}/).`)
  process.exit(1)
}
mkdirSync(DIFF, { recursive: true })

const files = readdirSync(LIVE).filter((f) => f.endsWith('.png'))
let mismatches = 0

for (const f of files) {
  const refPath = `${REF}/${f}`
  if (!existsSync(refPath)) {
    console.log(`SKIP   ${f}  (no matching reference in ${REF}/)`)
    continue
  }
  const ref = PNG.sync.read(readFileSync(refPath))
  const live = PNG.sync.read(readFileSync(`${LIVE}/${f}`))

  if (ref.width !== live.width || ref.height !== live.height) {
    console.log(`SIZE   ${f}  reference ${ref.width}x${ref.height} vs live ${live.width}x${live.height}`)
    mismatches++
    continue
  }

  const { width, height } = ref
  const diff = new PNG({ width, height })
  const n = pixelmatch(ref.data, live.data, diff.data, width, height, { threshold: 0.1 })
  const pct = ((n / (width * height)) * 100).toFixed(2)
  writeFileSync(`${DIFF}/${f}`, PNG.sync.write(diff))

  if (n === 0) {
    console.log(`MATCH  ${f}  (0 px)`)
  } else {
    console.log(`DIFF   ${f}  ${n} px (${pct}%)  ->  ${DIFF}/${f}`)
    mismatches++
  }
}

console.log(`\n${mismatches === 0 ? 'All images match.' : mismatches + ' image(s) differ. See ' + DIFF + '/.'}`)
process.exit(mismatches === 0 ? 0 : 1)
