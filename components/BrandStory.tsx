'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const line = 'Where the Indian Ocean meets the Kenyan coast, where the tide never surrenders, that is where Mawimbi was born.'
const words = line.split(' ')

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section id="story" className="relative bg-abyss py-28 lg:py-44 overflow-hidden">
      {/* Section index */}
      <div className="hidden lg:flex absolute left-6 top-32 z-10 flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ocean/70 [writing-mode:vertical-rl]">
          [ 04 / ORIGIN ]
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-ocean/50 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-10 h-px bg-ocean" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ocean">
            The Origin Story
          </span>
        </motion.div>

        {/* Word-by-word statement */}
        <div ref={ref} className="mb-24 lg:mb-32">
          <p className="font-display text-[clamp(34px,5.4vw,84px)] leading-[1.04] tracking-[-0.005em] max-w-6xl uppercase">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className={`inline-block mr-[0.22em] ${
                  ['Indian', 'Ocean'].includes(w.replace(/[^A-Za-z]/g, ''))
                    ? 'gradient-text'
                    : w.replace(/[^A-Za-z]/g, '') === 'Mawimbi'
                    ? 'gradient-text-coral'
                    : 'text-white/85'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0.12 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0.12 }}
                transition={{ duration: 0.4, delay: i * 0.045 }}
              >
                {w}
              </motion.span>
            ))}
          </p>
        </div>

        {/* Editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[16/13] overflow-hidden rounded-2xl"
          >
            <Image
              src="/photos/diani-wide.jpg"
              alt="The Indian Ocean shoreline at Diani Beach, Kenya"
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              quality={90}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-abyss/10" />

            {/* Corner brackets */}
            <div className="absolute top-6 left-6 w-9 h-9 border-t border-l border-ocean/50" />
            <div className="absolute bottom-6 right-6 w-9 h-9 border-b border-r border-ocean/50" />

            {/* Caption */}
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ocean/90 mb-1">
                  Diani Beach, Coast Province
                </p>
                <p className="text-white/70 text-sm">White coral sand. Relentless tides.</p>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">
                001 / KEN
              </span>
            </div>
          </motion.div>

          {/* Copy */}
          <div className="lg:col-span-5 flex flex-col pt-2">
            <motion.p
              className="text-white/75 text-lg leading-[1.85] mb-7 font-light"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white font-normal">Mawimbi</span>, Swahili for{' '}
              <span className="text-ocean italic">waves</span>, is more than an
              energy drink. It is the East African coastline distilled: raw,
              luminous, unstoppable.
            </motion.p>

            <motion.p
              className="text-white/50 text-base leading-[1.85] mb-10 font-light"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12 }}
            >
              Every can carries marine minerals, baobab from the savanna, and
              the unyielding spirit of Kenya's most iconic shore. Formulated for
              those who move at the speed of the tide.
            </motion.p>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {['Baobab', 'Marine Minerals', 'Natural Caffeine', 'Zero Sugar', 'Electrolytes'].map(
                (t, i) => (
                  <motion.span
                    key={t}
                    className="tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                  >
                    {t}
                  </motion.span>
                )
              )}
            </div>

            <div className="divider mb-8" />

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.25 }}
              className="border-l-2 border-ocean/50 pl-6"
            >
              <p
                className="font-display text-2xl lg:text-3xl text-white/85 mb-2 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                "The tide never asks for permission."
              </p>
              <cite className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40 not-italic">
                Founding principle, Mawimbi Energy
              </cite>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
