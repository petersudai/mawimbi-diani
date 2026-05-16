'use client'

import Image from 'next/image'
import { useRef, ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion'

type Shot = {
  src: string
  alt: string
  title: string
  coord: string
  index: string
  span: string
  aspect: string
  depth: number
}

const shots: Shot[] = [
  {
    src: '/photos/diani-boat.jpg',
    alt: 'A ngalawa fishing boat on the horizon at dawn, Diani Beach',
    title: 'Ngalawa at first light',
    coord: '04°19′S',
    index: 'A / 05',
    span: 'lg:col-span-7',
    aspect: 'aspect-[4/3]',
    depth: 38,
  },
  {
    src: '/photos/diani-footprints.jpg',
    alt: 'Footprints leading along the empty shoreline at Diani Beach',
    title: 'Morning, alone',
    coord: '39°35′E',
    index: 'B / 05',
    span: 'lg:col-span-5 lg:mt-24',
    aspect: 'aspect-[3/4]',
    depth: -38,
  },
  {
    src: '/photos/diani-wave.jpg',
    alt: 'A wave breaking on white coral sand beneath palms',
    title: 'Where the reef breaks',
    coord: '04°20′S',
    index: 'C / 05',
    span: 'lg:col-span-5',
    aspect: 'aspect-[4/3]',
    depth: 38,
  },
  {
    src: '/photos/diani-sign.jpg',
    alt: 'A weathered Public Beach sign on the dunes at Diani',
    title: 'Swim at own risk',
    coord: 'GALU',
    index: 'D / 05',
    span: 'lg:col-span-7 lg:mt-20',
    aspect: 'aspect-[4/3]',
    depth: -38,
  },
]

function ParallaxShot({ shot, progress }: { shot: Shot; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [shot.depth, -shot.depth])

  return (
    <motion.figure
      className={`group relative ${shot.span}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`relative ${shot.aspect} overflow-hidden rounded-2xl`}>
        <motion.div style={{ y }} className="absolute inset-[-7%]">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
            quality={90}
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />

        {/* Index tag */}
        <span className="absolute top-5 right-5 font-mono text-[10px] tracking-[0.22em] text-white/55">
          {shot.index}
        </span>

        {/* Caption */}
        <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <p
            className="font-display text-2xl lg:text-3xl text-white leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {shot.title}
          </p>
          <span className="font-mono text-[10px] tracking-[0.2em] text-ocean/90 whitespace-nowrap">
            {shot.coord}
          </span>
        </figcaption>
      </div>
    </motion.figure>
  )
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const stripRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: stripProgress } = useScroll({
    target: stripRef,
    offset: ['start end', 'end start'],
  })
  const stripY = useTransform(stripProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id="coast"
      ref={sectionRef}
      className="relative bg-abyss py-28 lg:py-44 overflow-hidden"
    >
      {/* Section index */}
      <div className="hidden lg:flex absolute left-6 top-32 z-10 flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ocean/70 [writing-mode:vertical-rl]">
          [ 05 / THE COAST ]
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-ocean/50 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-5"
            >
              <div className="w-10 h-px bg-ocean" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ocean">
                Field Notes / Diani
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-[clamp(44px,8vw,128px)] leading-[0.86] uppercase text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The Coast
              <br />
              <span className="gradient-text">Itself.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="max-w-xs text-white/45 text-sm leading-relaxed lg:text-right font-light"
          >
            No studio. No stock. Every frame shot on the sand at Diani. The
            exact water that gives Mawimbi its name.
          </motion.p>
        </div>

        {/* Parallax grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {shots.map((shot) => (
            <ParallaxShot key={shot.src} shot={shot} progress={scrollYProgress} />
          ))}
        </div>

        {/* Wide cinematic strip */}
        <div
          ref={stripRef}
          className="relative mt-8 lg:mt-8 aspect-[21/9] overflow-hidden rounded-2xl"
        >
          <motion.div style={{ y: stripY }} className="absolute inset-[-7%]">
            <Image
              src="/photos/diani-deck.jpg"
              alt="Palm canopy over the beach decking at Diani"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-abyss/10 to-abyss/30" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-ocean mb-4"
            >
              E / 05 · Under The Palms
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-[clamp(32px,6vw,96px)] leading-[0.9] uppercase text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Bottled at the
              <br />
              <span className="gradient-text">source.</span>
            </motion.h3>
          </div>
        </div>
      </div>
    </section>
  )
}
