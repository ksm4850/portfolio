const GA_ID = import.meta.env.VITE_GA_ID
const enabled = import.meta.env.PROD && Boolean(GA_ID)

export function initAnalytics() {
  if (!enabled) return
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

export function track(name, params) {
  if (!enabled) return
  window.gtag('event', name, params)
}
