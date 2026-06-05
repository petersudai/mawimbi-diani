import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/**
 * Favicon — three stacked wave arcs in brand ocean blue on abyss dark.
 * Mawimbi = "waves" in Swahili, so the mark is the name.
 * Bottom wave is fullest and brightest (foreground), upper waves fade (distance).
 */
export default function Icon() {
  // Build the SVG as a data URL — Satori renders it pixel-perfect
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
      <!-- Dark rounded square background -->
      <rect width="32" height="32" rx="7" fill="#02060A"/>

      <!-- Wave 3 — distant, faintest -->
      <path
        d="M2,9 Q9,4 16,9 Q23,14 30,9"
        stroke="#00E5FF" stroke-width="2.2" fill="none"
        stroke-linecap="round" stroke-linejoin="round"
        opacity="0.32"
      />

      <!-- Wave 2 — mid-distance -->
      <path
        d="M2,16 Q9,11 16,16 Q23,21 30,16"
        stroke="#00E5FF" stroke-width="2.4" fill="none"
        stroke-linecap="round" stroke-linejoin="round"
        opacity="0.62"
      />

      <!-- Wave 1 — foreground, full brightness, slightly thicker -->
      <path
        d="M2,23 Q9,18 16,23 Q23,28 30,23"
        stroke="#00E5FF" stroke-width="2.6" fill="none"
        stroke-linecap="round" stroke-linejoin="round"
        opacity="1"
      />
    </svg>
  `

  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={dataUrl} width={32} height={32} alt="" />
    ),
    { width: 32, height: 32 }
  )
}
