'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const ingredients = [
  {
    name: 'Baobab',
    origin: 'Kenyan Savanna',
    benefit: 'Vitamin C powerhouse. Antioxidant richness from the Tree of Life.',
    icon: '🌳',
    delay: 0,
  },
  {
    name: 'Marine Minerals',
    origin: 'Indian Ocean',
    benefit: 'Pure electrolyte matrix sourced from the Kenyan coast.',
    icon: '🌊',
    delay: 0.08,
  },
  {
    name: 'Green Tea',
    origin: 'Kenyan Highlands',
    benefit: 'Natural focus and a gentle, clean lift from the misty highlands.',
    icon: '🍵',
    delay: 0.16,
  },
  {
    name: 'Hibiscus',
    origin: 'East Africa',
    benefit: 'Deep rose flavor profile with natural antioxidant power.',
    icon: '🌺',
    delay: 0.24,
  },
  {
    name: 'Coconut Water',
    origin: 'Diani Palms',
    benefit: 'Natural isotonic hydration with potassium and magnesium.',
    icon: '🥥',
    delay: 0.32,
  },
  {
    name: 'Ginger Root',
    origin: 'Coastal Kenya',
    benefit: 'Soothing warmth. Digestive clarity. Fired up and ready.',
    icon: '🫚',
    delay: 0.40,
  },
]

const facts = [
  { number: '0', label: 'Artificial Colours' },
  { number: '0g', label: 'Added Sugar' },
  { number: '6', label: 'Natural Ingredients' },
  { number: '100%', label: 'East African Sourced' },
]

export default function IngredientsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="relative bg-abyss py-28 lg:py-44 overflow-hidden"
    >
      {/* Faint photo backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/photos/diani-wave.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.13]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/85 to-abyss" />
      </div>

      {/* Decorative parallax lines */}
      <motion.div
        style={{ y: y1 }}
        className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-ocean/10 to-transparent pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-coral/10 to-transparent pointer-events-none"
      />

      {/* Section index */}
      <div className="hidden lg:flex absolute left-6 top-32 z-10 flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ocean/70 [writing-mode:vertical-rl]">
          [ 06 / INGREDIENTS ]
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-ocean/50 to-transparent" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-14">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-8 h-px bg-gold" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold">
                06 / What's Inside
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(40px,7vw,96px)] leading-[0.9] uppercase text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Pure.<br />
              <span className="gradient-text">African.</span><br />
              Power.
            </motion.h2>
          </div>

          {/* Facts row */}
          <div className="grid grid-cols-2 gap-6 lg:gap-10">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="text-center lg:text-left"
              >
                <p
                  className="font-display text-4xl lg:text-5xl text-ocean"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {fact.number}
                </p>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted mt-1">
                  {fact.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ingredients grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {ingredients.map((ingredient, i) => (
            <motion.div
              key={ingredient.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ingredient.delay }}
              className="group bg-abyss p-8 hover:bg-deep transition-colors duration-300 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.05) 0%, transparent 60%)' }} />

              {/* Icon */}
              <div className="text-3xl mb-4">{ingredient.icon}</div>

              {/* Name */}
              <h3
                className="font-display text-2xl text-white mb-1 group-hover:text-ocean transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {ingredient.name}
              </h3>

              {/* Origin */}
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-ocean/60 mb-3">
                {ingredient.origin}
              </p>

              {/* Benefit */}
              <p className="text-muted text-sm leading-relaxed">
                {ingredient.benefit}
              </p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-ocean to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: ingredient.delay + 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom disclaimer */}
        <motion.p
          className="mt-8 text-center font-mono text-[9px] tracking-[0.2em] uppercase text-white/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          All ingredients certified organic · Sourced within 500km of Diani Beach · No artificial preservatives
        </motion.p>
      </div>
    </section>
  )
}
