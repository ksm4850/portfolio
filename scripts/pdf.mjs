// dist를 미리보기 서버로 띄우고, 헤드리스 크롬으로 ?print=1 페이지를 A4 PDF로 저장한다.
// 사용: pnpm pdf  (내부적으로 vite build → 이 스크립트)
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const PORT = 4188
const URL = `http://localhost:${PORT}/?print=1`
const OUT = '포트폴리오.pdf'

const waitForServer = async (url, timeoutMs = 20000) => {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      // 서버가 아직 안 떴을 뿐 — 재시도
    }
    await new Promise((r) => setTimeout(r, 300))
  }
  throw new Error(`preview 서버가 ${timeoutMs}ms 안에 뜨지 않았습니다: ${url}`)
}

const preview = spawn(
  'pnpm',
  ['preview', '--port', String(PORT), '--strictPort'],
  { stdio: 'ignore' },
)

try {
  await waitForServer(`http://localhost:${PORT}/`)

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.pdf({
    path: OUT,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  })
  await browser.close()
  console.log(`✅ PDF 생성 완료: ${OUT}`)
} finally {
  preview.kill()
}
