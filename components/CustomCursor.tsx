'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const followerX = useSpring(cursorX, { damping: 40, stiffness: 150 })
  const followerY = useSpring(cursorY, { damping: 40, stiffness: 150 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6)
      cursorY.set(e.clientY - 6)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="cursor"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="cursor-follower"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
          left: 20,
          top: 20,
        }}
      />
    </>
  )
}
