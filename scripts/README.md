# Visual screenshot + diff tooling

Captures `/login` and `/register` at mobile (390x844), tablet (768x1024) and
desktop (1280x800), and pixel-diffs them against your reference images.

These are not wired into the build; they run on demand.

## One-time setup

```bash
pnpm add -D playwright pixelmatch pngjs
npx playwright install chromium
```

## Capture live screenshots

Run the dev server in one terminal, then:

```bash
node scripts/screenshots.mjs
# custom port:
BASE_URL=http://localhost:3001 node scripts/screenshots.mjs
```

Output: `screenshots/live/{login,register}-{mobile,tablet,desktop}.png`

## Diff against references

1. Drop your reference designs in `screenshots/reference/` using the SAME
   filenames as the live output (e.g. `login-mobile.png`).
2. Run:

```bash
node scripts/visual-diff.mjs
```

It prints per-image mismatch counts/percentages and writes highlighted diff
images to `screenshots/diff/`. Exit code is non-zero if anything differs.

## Side-by-side

Open the matching files from `screenshots/reference/` and `screenshots/live/`
next to each other, with `screenshots/diff/` showing exactly which pixels moved.
