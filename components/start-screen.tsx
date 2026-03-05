"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Gift } from "lucide-react"

interface StartScreenProps {
  isVisible: boolean
  onOpen: () => void
}

export default function StartScreen({ isVisible, onOpen }: StartScreenProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particles = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  }, [mounted])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0d0a0b 0%, #261a1d 50%, #0d0a0b 100%)",
      }}
    >
      {/* Background shimmer */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Floating particles background */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: "rgba(212, 175, 55, 0.3)",
              }}
              animate={{
                y: [-20, 20],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                repeatType: "reverse",
                delay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative flex flex-col items-center gap-8"
      >
        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xs tracking-[0.4em] uppercase text-gold/60 font-sans"
        >
          8 Mart
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-2xl md:text-3xl font-serif text-gold/90 text-center text-balance"
        >
          {"Senin ucun xususi bir hediyye var"}
        </motion.h2>

        {/* Gift icon with glow */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group cursor-pointer mt-4"
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 -m-6 rounded-full"
            animate={{
              boxShadow: [
                "0 0 20px rgba(212, 175, 55, 0.1)",
                "0 0 40px rgba(212, 175, 55, 0.3)",
                "0 0 20px rgba(212, 175, 55, 0.1)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Button container */}
          <div
            className="relative flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300"
            style={{
              background: "rgba(212, 175, 55, 0.1)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              boxShadow: "0 0 30px rgba(212, 175, 55, 0.1)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Gift className="w-6 h-6 text-gold" />
            </motion.div>
            <span className="text-gold font-serif text-lg tracking-wide">
              {"Mektubu Ac"}
            </span>
          </div>
        </motion.button>

        {/* Subtle hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-xs text-foreground/40 font-sans mt-2"
        >
          {"Hediyyeni acmaq ucun toxun"}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
