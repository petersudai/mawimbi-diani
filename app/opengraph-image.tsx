import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = 'MAWIMBI Energy — Unleash The Tide Within'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  // Read assets from disk — reliable in both dev and prod
  const photoData = fs.readFileSync(
    path.join(process.cwd(), 'public', 'photos', 'diani-hero.jpg')
  )
  const photoSrc = `data:image/jpeg;base64,${photoData.toString('base64')}`

  // Load fonts from local files (TTF — required by Satori / next/og)
  const bebasFont = fs.readFileSync(
    path.join(process.cwd(), 'public', 'fonts', 'BebasNeue-Regular.ttf')
  )
  const monoFont = fs.readFileSync(
    path.join(process.cwd(), 'public', 'fonts', 'SpaceMono-Regular.ttf')
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          position: 'relative',
          backgroundColor: '#02060A',
          overflow: 'hidden',
        }}
      >
        {/* Full-bleed beach photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />

        {/* Dark gradient — heavy left, fades right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, rgba(2,6,10,0.94) 0%, rgba(2,6,10,0.78) 42%, rgba(2,6,10,0.22) 100%)',
            display: 'flex',
          }}
        />

        {/* Bottom vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(2,6,10,0.55) 0%, transparent 45%)',
            display: 'flex',
          }}
        />

        {/* Ocean accent bar — left edge */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 3,
            height: '100%',
            background: 'linear-gradient(to bottom, transparent, #00E5FF, transparent)',
          }}
        />

        {/* Content layer */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 72px',
            width: '100%',
            height: '100%',
          }}
        >
          {/* ── Top row: logo + coordinates ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Logo mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Circle icon */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '2px solid #00E5FF',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    backgroundColor: '#00E5FF',
                    opacity: 0.55,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'Bebas',
                  fontSize: 28,
                  letterSpacing: '0.28em',
                  color: '#ffffff',
                }}
              >
                MAWIMBI
              </span>
            </div>

            {/* Coordinates */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: 'Mono',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase',
                }}
              >
                Indian Ocean
              </span>
              <span
                style={{
                  fontFamily: 'Mono',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: '#00E5FF',
                  opacity: 0.8,
                }}
              >
                4°S 39°E
              </span>
            </div>
          </div>

          {/* ── Centre: headline ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div style={{ width: 32, height: 1, backgroundColor: '#00E5FF' }} />
              <span
                style={{
                  fontFamily: 'Mono',
                  fontSize: 11,
                  letterSpacing: '0.32em',
                  color: '#00E5FF',
                  textTransform: 'uppercase',
                }}
              >
                Born from the tide
              </span>
            </div>

            {/* UNLEASH */}
            <span
              style={{
                fontFamily: 'Bebas',
                fontSize: 148,
                lineHeight: 0.88,
                color: '#ffffff',
                letterSpacing: '-0.005em',
              }}
            >
              UNLEASH
            </span>

            {/* THE TIDE */}
            <div style={{ display: 'flex', gap: 0, lineHeight: 0.88 }}>
              <span
                style={{
                  fontFamily: 'Bebas',
                  fontSize: 148,
                  lineHeight: 0.88,
                  color: '#ffffff',
                  letterSpacing: '-0.005em',
                }}
              >
                THE&nbsp;
              </span>
              <span
                style={{
                  fontFamily: 'Bebas',
                  fontSize: 148,
                  lineHeight: 0.88,
                  color: '#00E5FF',
                  letterSpacing: '-0.005em',
                }}
              >
                TIDE
              </span>
            </div>

            {/* WITHIN. */}
            <span
              style={{
                fontFamily: 'Bebas',
                fontSize: 148,
                lineHeight: 0.88,
                color: '#ffffff',
                letterSpacing: '-0.005em',
              }}
            >
              WITHIN.
            </span>
          </div>

          {/* ── Bottom row ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <span
              style={{
                fontFamily: 'Mono',
                fontSize: 12,
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
              }}
            >
              Marine minerals · Baobab · Zero sugar · Diani Beach, Kenya
            </span>
            <span
              style={{
                fontFamily: 'Mono',
                fontSize: 13,
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              mawimbi.energy
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Bebas', data: bebasFont, style: 'normal', weight: 400 },
        { name: 'Mono', data: monoFont, style: 'normal', weight: 400 },
      ],
    }
  )
}
