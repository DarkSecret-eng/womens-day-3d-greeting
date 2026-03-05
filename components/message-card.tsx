"use client"

import { motion } from "framer-motion"

interface MessageCardProps {
  name: string
  message: string
  isVisible: boolean
}

export default function MessageCard({ name, message, isVisible }: MessageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="relative z-10 w-full max-w-lg mx-auto px-4"
    >
      {/* Date badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center mb-4"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-gold/70 font-sans">
          8 Mart - Beynalxalq Qadinlar Gunu
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-center font-serif text-4xl md:text-6xl lg:text-7xl text-gold mb-6 text-balance"
        style={{ textShadow: "0 0 40px rgba(212, 175, 55, 0.3)" }}
      >
        {name}
      </motion.h1>

      {/* Glassmorphism message box */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="relative rounded-2xl p-6 md:p-8"
        style={{
          background: "rgba(26, 19, 21, 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
        }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/40 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40 rounded-br-2xl" />

        <p className="text-center text-foreground/90 leading-relaxed text-base md:text-lg font-sans">
          {message}
        </p>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-gold/60">
            <path
              d="M8 1l2.2 4.4L15 6.3l-3.5 3.4.8 4.9L8 12.4l-4.3 2.2.8-4.9L1 6.3l4.8-.9L8 1z"
              fill="currentColor"
            />
          </svg>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      </motion.div>
    </motion.div>
  )
}
