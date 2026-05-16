'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stockists = ['NAIVAS', 'CARREFOUR', 'QUICKMART', 'CHANDARANA', 'ARTCAFFE', 'JAVA HOUSE']

export default function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="order" ref={ref} className="relative overflow-hidden">
      {/* Photo background */}
      <div className="absolute inset-0">
        <Image
          src="/photos/diani-boat.jpg"
          alt="A fishing boat at sunset on the Indian Ocean, Diani Beach"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/55 to-abyss" />
      <div className="absolute inset-0 bg-abyss/35" />

      {/* Drifting shimmer lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${28 + i * 14}%`,
            background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.18), transparent)',
          }}
          animate={{ opacity: [0, 1, 0], x: [-120, 120] }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, delay: i * 1.6, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-14 py-32 lg:py-48 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-8 h-px bg-ocean" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ocean">
            07 / Ride The Wave
          </span>
          <div className="w-8 h-px bg-ocean" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-[clamp(56px,11vw,184px)] leading-[0.84] uppercase text-white mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The Ocean
          <br />
          <span className="gradient-text">Is Calling.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/65 text-base lg:text-lg max-w-lg mx-auto leading-relaxed mb-14"
        >
          Be first to know when Mawimbi reaches a shelf near you. Join the wave
          for early access pricing, reserved for the founding crew.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-md mx-auto mb-20"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/8 border border-white/15 rounded-full px-5 py-3.5 text-sm font-mono text-white placeholder-white/35 focus:outline-none focus:border-ocean/60 transition-colors backdrop-blur-sm"
              />
              <button
                type="submit"
                className="btn-primary glow-ocean bg-ocean text-abyss px-7 py-3.5 rounded-full font-mono font-bold text-xs tracking-[0.16em] uppercase whitespace-nowrap hover:bg-white transition-colors"
              >
                Join Wave
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-3.5"
            >
              <span className="w-2 h-2 rounded-full bg-ocean animate-pulse" />
              <p className="font-mono text-sm tracking-[0.08em] text-ocean">
                You're on the wave. We'll be in touch.
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="border-t border-white/10 pt-14"
        >
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 mb-8">
            Soon Available At
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {stockists.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.07 }}
                className="font-display text-lg tracking-[0.2em] text-white/25 hover:text-white/55 transition-colors cursor-default"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
