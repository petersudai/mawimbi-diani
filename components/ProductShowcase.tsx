'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Flavour = {
  name: string
  origin: string
  note: string
  colour: string
}

const flavours: Flavour[] = [
  { name: 'Marine Minerals', origin: 'Indian Ocean', note: 'Electrolytes from the ocean. Clean energy, wave after wave.', colour: '#7FB5C4' },
  { name: 'Green Tea', origin: 'Kenyan Highlands', note: 'Natural focus. A gentle lift from the misty highlands.', colour: '#A7B98A' },
  { name: 'Baobab', origin: 'Kenyan Savanna', note: 'Rich in Vitamin C. Pure fuel from the savanna.', colour: '#C9A977' },
  { name: 'Hibiscus', origin: 'East Africa', note: 'Bold, vibrant, refreshing. Inspired by East Africa.', colour: '#C98E94' },
  { name: 'Coconut Water', origin: 'Diani Palms', note: 'Hydrating and natural. Pure coastal refreshment.', colour: '#8FB1B6' },
  { name: 'Ginger Root', origin: 'Coastal Kenya', note: 'A spicy kick of natural energy, rooted in the coast.', colour: '#D8BA8B' },
]

export default function ProductShowcase() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const [active, setActive] = useState(0)
  const current = flavours[active]

  return (
    <section
      id="flavours"
      ref={ref}
      className="relative bg-deep py-28 lg:py-44 overflow-hidden"
    >
      {/* Reactive background tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 55% 45% at 50% 40%, ${current.colour}1c 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Section index */}
      <div className="hidden lg:flex absolute left-6 top-32 z-10 flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ocean/70 [writing-mode:vertical-rl]">
          [ 03 / FLAVOURS ]
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-ocean/50 to-transparent" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-14">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-5"
            >
              <div className="w-10 h-px bg-coral" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral">
                The Collection
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-[clamp(44px,8vw,128px)] leading-[0.86] uppercase text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Six
              <br />
              <span className="gradient-text">Tides.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="max-w-xs text-white/45 text-sm leading-relaxed lg:text-right font-light"
          >
            Six cans. Six coastal botanicals. Each one a different current of
            the same ocean. Find the one that moves you.
          </motion.p>
        </div>

        {/* Lineup image */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10"
        >
          <Image
            src="/photos/flavours-lineup.png"
            alt="The six Mawimbi flavours: Marine Minerals, Green Tea, Baobab, Hibiscus, Coconut Water and Ginger Root"
            fill
            sizes="(max-width: 1024px) 100vw, 92vw"
            quality={92}
            className="object-cover"
          />
        </motion.figure>

        {/* Flavour selector row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {flavours.map((f, i) => (
            <button
              key={f.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group bg-deep px-5 py-7 text-left transition-colors duration-300 hover:bg-abyss focus:bg-abyss focus:outline-none"
            >
              <motion.span
                className="block w-8 h-8 rounded-full mb-4"
                style={{ background: f.colour }}
                animate={{
                  scale: active === i ? 1.15 : 1,
                  boxShadow: active === i ? `0 0 24px ${f.colour}88` : `0 0 0 ${f.colour}00`,
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 block mb-1">
                0{i + 1} / {f.origin}
              </span>
              <span
                className="font-display text-xl uppercase leading-tight block transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: active === i ? f.colour : '#ffffff',
                }}
              >
                {f.name}
              </span>
            </button>
          ))}
        </div>

        {/* Active flavour detail */}
        <div className="mt-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <motion.p
            key={current.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-md text-white/65 text-base leading-relaxed"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase mr-3" style={{ color: current.colour }}>
              {current.name}
            </span>
            {current.note}
          </motion.p>

          <a
            href="#order"
            className="btn-primary glow-ocean bg-ocean text-abyss px-8 py-3.5 rounded-full font-mono font-bold text-xs tracking-[0.18em] uppercase whitespace-nowrap hover:bg-white transition-colors duration-300 self-start lg:self-auto"
          >
            Order The Full Set →
          </a>
        </div>
      </div>
    </section>
  )
}
