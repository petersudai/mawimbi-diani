'use client'

import dynamic from 'next/dynamic'
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
  return (
    <section
      className="relative w-full h-[100svh] min-h-[680px] overflow-hidden bg-abyss"
      style={{
        backgroundImage: 'url(/photos/diani-hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* WebGL photo layer */}
      <HeroCanvas />

      {/* Legibility gradients */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-abyss via-abyss/20 to-abyss/40 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-abyss/70 via-transparent to-transparent pointer-events-none" />

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
        <span className="font-mono text-[10px] tracking-[0.3em] text-ocean/70 [writing-mode:vertical-rl]">
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
          <div className="font-mono text-[10px] lg:text-[11px] tracking-[0.28em] uppercase text-white/70 leading-relaxed">
            Mawimbi<span className="text-ocean">®</span> Energy
            <br />
            <span className="text-white/40">Coastal Hydration. Est. Diani</span>
          </div>
          <div className="hidden md:block text-right font-mono text-[10px] tracking-[0.28em] uppercase text-white/40 leading-relaxed">
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
            className="mt-8 max-w-md text-white/65 text-sm lg:text-base leading-relaxed font-light"
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
              className="px-8 py-3.5 rounded-full border border-white/25 font-mono text-xs tracking-[0.18em] uppercase text-white/80 hover:border-ocean/70 hover:text-ocean transition-all duration-300"
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
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50">
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
