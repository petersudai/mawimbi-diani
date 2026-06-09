'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const reveal = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.12 },
  }),
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 + i * 0.12 },
  }),
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Nudge autoplay — some browsers (and unfocused tabs) won't honour the
  // autoPlay attribute alone. Respect users who prefer reduced motion.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // React doesn't always reflect the `muted` JSX prop to the DOM property,
    // which can cause browsers to block autoplay. Force it on before playing.
    v.muted = true
    const tryPlay = () => v.play().catch(() => {})
    if (v.readyState >= 2) tryPlay()
    v.addEventListener('canplay', tryPlay)
    return () => v.removeEventListener('canplay', tryPlay)
  }, [])

  return (
    <section
      className="relative w-full h-[100svh] min-h-[680px] overflow-hidden bg-abyss"
      style={{
        backgroundImage: 'url(/video/diani-hero-poster.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Looping Diani waves — base layer. Fades in once it can play.
          Hidden for users who prefer reduced motion (poster image remains). */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/video/diani-hero-poster.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/video/diani-hero.mp4" type="video/mp4" />
      </video>

      {/* WebGL particle layer (drifting light motes) */}
      <HeroCanvas />

      {/* ── Cinematic treatment ──────────────────────────────────────────
          Even darkening across the whole frame deepens the footage for a
          premium feel and masks phone-video softness uniformly. Subtle
          grounding gradients keep the text legible. */}
      {/* Even overall darken — uniform, stronger to mask phone-video softness */}
      <div className="absolute inset-0 z-[2] bg-abyss/65 pointer-events-none" />
      {/* Bottom grounding — anchors text, fades into the next section */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-abyss/85 via-abyss/10 to-transparent pointer-events-none" />
      {/* Left — headline + body legibility */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
      {/* Top — nav legibility */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />


      {/* Concentric halo rings */}
      <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none overflow-hidden">
        {[420, 640, 880, 1160].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-white/[0.07]"
            style={{ width: size, height: size }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{
              opacity: { duration: 1.4, delay: 0.3 + i * 0.15 },
              scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.15 },
              rotate: { duration: 120 + i * 40, repeat: Infinity, ease: 'linear' },
            }}
          />
        ))}
      </div>

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocean/30 to-transparent z-[3] pointer-events-none"
        animate={{ top: ['25%', '78%', '25%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Left vertical index */}
      <motion.div
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.3em] text-ocean [writing-mode:vertical-rl]"
          style={{ textShadow: '0 0 16px rgba(0,0,0,1)' }}
        >
          [ 01 / INTRO ]
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-ocean/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 lg:px-14 flex flex-col justify-between pt-28 pb-10">
        {/* Top eyebrow */}
        <motion.div
          className="flex items-start justify-between"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            className="font-mono text-[10px] lg:text-[11px] tracking-[0.28em] uppercase text-white leading-relaxed"
            style={{ textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}
          >
            Mawimbi<span className="text-ocean">®</span> Energy
            <br />
            <span className="text-white/90">Coastal Hydration. Est. Diani</span>
          </div>
          <div
            className="hidden md:block text-right font-mono text-[10px] tracking-[0.28em] uppercase text-white/90 leading-relaxed"
            style={{ textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}
          >
            Indian Ocean
            <br />
            4°S 39°E
          </div>
        </motion.div>

        {/* Headline block */}
        <div className="flex flex-col items-start max-w-5xl">
          <motion.div
            className="overflow-hidden mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              custom={0}
              variants={fade}
              initial="hidden"
              animate="visible"
              className="font-mono text-[11px] tracking-[0.32em] uppercase text-ocean"
              style={{ textShadow: '0 0 16px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8)' }}
            >
              Born from the tide
            </motion.p>
          </motion.div>

          {['Unleash', 'The Tide', 'Within.'].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                custom={i}
                variants={reveal}
                initial="hidden"
                animate="visible"
                className="font-display text-[clamp(68px,13vw,210px)] leading-[0.85] tracking-[-0.005em] uppercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {line === 'The Tide' ? (
                  <>
                    <span className="text-white">The </span>
                    <span className="gradient-text">Tide</span>
                  </>
                ) : (
                  <span className="text-white">{line}</span>
                )}
              </motion.h1>
            </div>
          ))}

          <motion.p
            custom={1}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-md text-white/90 text-sm lg:text-base leading-relaxed font-light tracking-wide"
          >
            An energy drink crafted at the edge of the Indian Ocean, in Diani
            Beach, Kenya. Marine minerals, baobab, zero sugar. The relentless
            rhythm of the coast, in a can.
          </motion.p>

          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#order"
              className="btn-primary glow-ocean bg-ocean text-abyss px-8 py-3.5 rounded-full font-mono font-bold text-xs tracking-[0.18em] uppercase flex items-center gap-2 hover:bg-white transition-colors duration-300"
            >
              Ride The Wave
              <span aria-hidden>→</span>
            </a>
            <a
              href="#story"
              className="px-8 py-3.5 rounded-full border border-white/60 bg-black/25 backdrop-blur-sm font-mono text-xs tracking-[0.18em] uppercase text-white hover:border-ocean/70 hover:text-ocean transition-all duration-300"
            >
              The Origin
            </a>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          className="flex items-end justify-end"
          custom={3}
          variants={fade}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center gap-3">
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/90"
              style={{ textShadow: '0 0 16px rgba(0,0,0,0.95)' }}
            >
              Scroll
            </span>
            <motion.div
              className="w-px h-14 bg-gradient-to-b from-ocean to-transparent"
              animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ transformOrigin: 'top' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
