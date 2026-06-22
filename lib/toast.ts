// Lightweight, dependency-free toast. Plain text only (no emoji), on-brand styling.

export function showToast(message: string) {
  if (typeof document === 'undefined') return

  let host = document.getElementById('kw-toast-host')
  if (!host) {
    host = document.createElement('div')
    host.id = 'kw-toast-host'
    host.style.cssText =
      'position:fixed;left:0;right:0;bottom:88px;display:flex;flex-direction:column;align-items:center;gap:8px;z-index:9999;pointer-events:none;padding:0 16px'
    document.body.appendChild(host)
  }

  const el = document.createElement('div')
  el.textContent = message
  el.style.cssText =
    'background:#0D1B2A;color:#fff;font-family:var(--font-inter),Inter,sans-serif;font-weight:600;font-size:14px;' +
    'padding:12px 22px;border-radius:9999px;border:2px solid #0D1B2A;max-width:90vw;text-align:center;' +
    'opacity:0;transform:translateY(8px);transition:opacity .2s ease,transform .2s ease;pointer-events:auto'
  host.appendChild(el)

  requestAnimationFrame(() => {
    el.style.opacity = '1'
    el.style.transform = 'translateY(0)'
  })

  setTimeout(() => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(8px)'
    setTimeout(() => el.remove(), 220)
  }, 2600)
}
