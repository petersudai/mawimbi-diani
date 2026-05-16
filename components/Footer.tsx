'use client'

import { motion } from 'framer-motion'

const socials = ['Instagram', 'TikTok', 'X (Twitter)', 'YouTube']
const links = {
  'Brand': ['Our Story', 'Flavours', 'Ingredients', 'Press'],
  'Shop': ['Order Online', 'Stockists', 'Wholesale', 'Corporate'],
  'Connect': ['Instagram', 'TikTok', 'Careers', 'Contact'],
}

export default function Footer() {
  return (
    <footer className="bg-abyss border-t border-white/5 pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 relative">
                <div className="absolute inset-0 border-2 border-ocean rounded-full" />
                <div className="absolute inset-[3px] bg-ocean rounded-full opacity-60" />
              </div>
              <span
                className="text-xl tracking-[0.25em] font-display text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                MAWIMBI
              </span>
            </div>

            <p className="text-muted text-sm leading-relaxed max-w-xs mb-6">
              Born at the edge of the Indian Ocean. Diani Beach, Kenya.
              Pure coastal energy for the relentless.
            </p>

            <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-ocean/60">
              <div className="w-1.5 h-1.5 rounded-full bg-ocean animate-pulse" />
              Diani Beach, Coast Province, Kenya
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-mono text-[11px] tracking-[0.1em] text-muted hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider mb-10" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[10px] tracking-[0.15em] text-white/20">
            © {new Date().getFullYear()} MAWIMBI Energy. All rights reserved. Crafted in Kenya.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-[10px] tracking-[0.1em] text-white/20 hover:text-muted transition-colors">
              Privacy
            </a>
            <a href="#" className="font-mono text-[10px] tracking-[0.1em] text-white/20 hover:text-muted transition-colors">
              Terms
            </a>
            <a href="#" className="font-mono text-[10px] tracking-[0.1em] text-white/20 hover:text-muted transition-colors">
              Sustainability
            </a>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-ocean/60 hover:text-ocean transition-colors"
          >
            Back to top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
