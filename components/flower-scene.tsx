"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

/* ─── Soft Falling Petal ─── */
function Petal({ delay, startX, size, duration, hue }: {
  delay: number
  startX: number
  size: number
  duration: number
  hue: number
}) {
  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${startX}%`,
        top: "-8%",
      }}
      initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ["0vh", "105vh"],
        x: [0, Math.sin(delay) * 60, Math.cos(delay) * 40],
        rotate: [0, 180 + delay * 30],
        opacity: [0, 0.7, 0.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none">
        <path
          d="M10 0C10 0 20 8 20 16C20 22 15.5 28 10 28C4.5 28 0 22 0 16C0 8 10 0 10 0Z"
          fill={`hsla(${hue}, 70%, 55%, 0.6)`}
        />
        <path
          d="M10 4C10 4 16 10 16 16C16 20 13.5 24 10 24"
          stroke={`hsla(${hue}, 60%, 40%, 0.3)`}
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </motion.div>
  )
}

/* ─── Gentle Light Orb ─── */
function LightOrb({ x, y, size, delay, color }: {
  x: string
  y: string
  size: number
  delay: number
  color: string
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${size * 0.3}px)`,
      }}
      animate={{
        scale: [0.9, 1.15, 0.9],
        opacity: [0.12, 0.28, 0.12],
      }}
      transition={{
        duration: 5 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

/* ─── Micro Gold Sparkle ─── */
function MicroSparkle({ x, y, delay, size }: {
  x: string
  y: string
  delay: number
  size: number
}) {
  return (
    <motion.div
      className="absolute pointer-events-none z-30"
      style={{ left: x, top: y }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 0.9, 0],
      }}
      transition={{
        duration: 1.4,
        delay,
        repeat: Infinity,
        repeatDelay: 3 + delay * 0.8,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path
          d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
          fill="rgba(212, 175, 55, 0.85)"
        />
      </svg>
    </motion.div>
  )
}

/* ─── Rising Shimmer ─── */
function Shimmer({ delay, x, size }: {
  delay: number
  x: number
  size: number
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "5%",
        background: `radial-gradient(circle, rgba(212, 175, 55, 0.8), rgba(245, 215, 110, 0.3), transparent)`,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -250, -450],
        opacity: [0, 0.7, 0],
        scale: [0.6, 1, 0.2],
      }}
      transition={{
        duration: 6 + delay,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  )
}

export default function FlowerScene({ isVisible }: { isVisible: boolean }) {
  const [mounted, setMounted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const petals = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      delay: i * 0.7 + Math.sin(i) * 0.5,
      startX: 8 + (i * 7.5) % 84,
      size: 8 + (i % 4) * 2,
      duration: 9 + (i % 5) * 1.5,
      hue: [345, 350, 355, 0, 340, 330][i % 6],
    }))
  }, [mounted])

  const shimmers = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      delay: i * 0.4,
      x: 20 + (i * 3.7) % 60,
      size: 1.5 + (i % 3),
    }))
  }, [mounted])

  const sparkles = useMemo(() => {
    if (!mounted) return []
    return [
      { x: "18%", y: "22%", delay: 0.8, size: 12 },
      { x: "78%", y: "18%", delay: 1.6, size: 10 },
      { x: "72%", y: "52%", delay: 2.5, size: 14 },
      { x: "22%", y: "62%", delay: 3.2, size: 10 },
      { x: "55%", y: "12%", delay: 2.0, size: 8 },
      { x: "88%", y: "38%", delay: 4.0, size: 10 },
      { x: "12%", y: "42%", delay: 3.8, size: 8 },
    ]
  }, [mounted])

  const orbs = useMemo(() => {
    if (!mounted) return []
    return [
      { x: "8%", y: "18%", size: 120, delay: 0, color: "rgba(180, 60, 80, 0.08)" },
      { x: "72%", y: "12%", size: 90, delay: 1, color: "rgba(212, 175, 55, 0.06)" },
      { x: "82%", y: "55%", size: 130, delay: 0.5, color: "rgba(200, 80, 100, 0.06)" },
      { x: "12%", y: "65%", size: 100, delay: 2, color: "rgba(212, 175, 55, 0.05)" },
    ]
  }, [mounted])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
        >
          {/* Ambient radial glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "100%",
              height: "100%",
              background: "radial-gradient(ellipse at 50% 45%, rgba(180, 60, 80, 0.04) 0%, rgba(212, 175, 55, 0.02) 35%, transparent 70%)",
            }}
          />

          {/* Soft light orbs */}
          {orbs.map((o, i) => (
            <LightOrb key={`orb-${i}`} {...o} />
          ))}

          {/* Falling petals */}
          {petals.map((p) => (
            <Petal key={`petal-${p.id}`} {...p} />
          ))}

          {/* Rising shimmer particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {shimmers.map((s) => (
              <Shimmer key={`shimmer-${s.id}`} {...s} />
            ))}
          </div>

          {/* ── Central Bouquet ── */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.4, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              duration: 1.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Outer warm glow */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                inset: "-60px",
                background: "radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.08) 0%, rgba(180, 60, 80, 0.04) 40%, transparent 70%)",
                filter: "blur(30px)",
              }}
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Inner rose glow */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                inset: "-30px",
                background: "radial-gradient(ellipse at 50% 40%, rgba(200, 70, 90, 0.06) 0%, transparent 60%)",
                filter: "blur(20px)",
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />

            {/* Floating animation */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Image container */}
              <div className="relative" style={{ width: "clamp(260px, 50vw, 380px)", height: "clamp(330px, 60vw, 480px)" }}>
                <Image
                  src="/images/bouquet.jpg"
                  alt="Gul buketi"
                  fill
                  priority
                  sizes="(max-width: 768px) 260px, 380px"
                  className="relative z-10 object-contain"
                  style={{
                    filter: imageLoaded
                      ? "saturate(1.1) drop-shadow(0 0 30px rgba(180,60,80,0.15))"
                      : "none",
                  }}
                  onLoad={handleImageLoad}
                />


              </div>
            </motion.div>
          </motion.div>

          {/* Gold sparkles */}
          {sparkles.map((s, i) => (
            <MicroSparkle key={`sparkle-${i}`} {...s} />
          ))}

          {/* Bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
            style={{
              background: "linear-gradient(to top, rgba(13, 10, 11, 1) 0%, rgba(13, 10, 11, 0.6) 40%, transparent 100%)",
            }}
          />

          {/* Top subtle vignette */}
          <div
            className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-20"
            style={{
              background: "linear-gradient(to bottom, rgba(13, 10, 11, 0.4) 0%, transparent 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
