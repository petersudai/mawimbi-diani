import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * Apple touch icon — same three-wave mark, scaled up to 180×180.
 * Larger size allows a subtle glow on the foreground wave.
 */
export default function AppleIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
      <!-- Background — iOS clips to rounded square, but we still set bg -->
      <rect width="180" height="180" rx="38" fill="#02060A"/>

      <!-- Subtle centre glow -->
      <ellipse cx="90" cy="120" rx="72" ry="38" fill="#00E5FF" opacity="0.06"/>

      <!-- Wave 3 — distant -->
      <path
        d="M12,52 Q52,22 90,52 Q128,82 168,52"
        stroke="#00E5FF" stroke-width="12" fill="none"
        stroke-linecap="round" stroke-linejoin="round"
        opacity="0.28"
      />

      <!-- Wave 2 — mid -->
      <path
        d="M12,94 Q52,64 90,94 Q128,124 168,94"
        stroke="#00E5FF" stroke-width="13" fill="none"
        stroke-linecap="round" stroke-linejoin="round"
        opacity="0.60"
      />

      <!-- Wave 1 — foreground, full brightness -->
      <path
        d="M12,136 Q52,106 90,136 Q128,166 168,136"
        stroke="#00E5FF" stroke-width="14" fill="none"
        stroke-linecap="round" stroke-linejoin="round"
        opacity="1"
      />
    </svg>
  `

  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={dataUrl} width={180} height={180} alt="" />
    ),
    { width: 180, height: 180 }
  )
}
