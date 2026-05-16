'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProductIntro() {
  return (
    <section id="product" className="relative bg-deep py-24 lg:py-36 overflow-hidden">
      {/* Section index */}
      <div className="hidden lg:flex absolute left-6 top-28 z-10 flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ocean/70 [writing-mode:vertical-rl]">
          [ 02 / THE CAN ]
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-ocean/50 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-10 h-px bg-ocean" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ocean">
                The Product
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-[clamp(48px,7vw,116px)] leading-[0.86] uppercase text-white mb-7"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              This Is
              <br />
              <span className="gradient-text">Mawimbi.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/65 text-base lg:text-lg leading-[1.8] max-w-md mb-8 font-light"
            >
              Six coastal botanicals, marine minerals and zero cane sugar,
              sealed in a 250ml can built for the relentless. No crash, no
              compromise. Just the clean energy of the Indian Ocean.
            </motion.p>

            {/* Quick spec row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-8 mb-10"
            >
              {[
                { v: '250ml', l: 'Coastal Can' },
                { v: '0g', l: 'Cane Sugar' },
                { v: '6', l: 'Botanicals' },
              ].map((s) => (
                <div key={s.l} className="flex flex-col gap-1">
                  <span
                    className="font-display text-3xl lg:text-4xl text-white leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {s.v}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/45">
                    {s.l}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="#flavours"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="btn-primary glow-ocean inline-flex items-center gap-2 bg-ocean text-abyss px-8 py-3.5 rounded-full font-mono font-bold text-xs tracking-[0.18em] uppercase hover:bg-white transition-colors duration-300"
            >
              Explore The Six Flavours
              <span aria-hidden>→</span>
            </motion.a>
          </div>

          {/* Layered can images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative"
          >
            {/* Main shot */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10">
              <Image
                src="/photos/can-sand.png"
                alt="A Mawimbi energy drink can resting on Diani Beach sand"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                quality={92}
                className="object-cover"
              />
            </div>

            {/* Overlapping accent shot */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-12 -left-6 lg:-left-12 w-36 lg:w-52 aspect-square overflow-hidden rounded-xl ring-1 ring-white/15 shadow-2xl shadow-black/60"
            >
              <Image
                src="/photos/can-beach.png"
                alt="A Mawimbi can against the Indian Ocean"
                fill
                sizes="208px"
                quality={92}
                className="object-cover"
              />
            </motion.div>

            {/* Corner bracket */}
            <div className="absolute top-5 right-5 w-9 h-9 border-t border-r border-ocean/40" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
