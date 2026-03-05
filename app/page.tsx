"use client"

import { useState, useCallback, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import StartScreen from "@/components/start-screen"
import MessageCard from "@/components/message-card"
import FlowerScene from "@/components/flower-scene"
import { fireGoldConfetti } from "@/lib/confetti"

function CelebrationContent() {
  const searchParams = useSearchParams()
  const [isOpened, setIsOpened] = useState(false)
  const [showScene, setShowScene] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  // 1. MİNİ-BAZA (İstədiyin adları bura əlavə et)
  const tebrikBazasi: Record<string, { ad: string; mesaj: string }> = {
    "ana": {
      ad: "Canım Anam",
      mesaj: "8 Mart Beynəlxalq Qadınlar Günün mübarək! Sənə can sağlığı və uzun ömür arzulayıram. Bu 3D buket sənin üçündür!"
    },
    "SEVGILIM": {
      ad: "SEVGILIM",
      mesaj: "8 Martın mübarək, həyatımın ən güclü və ən zərif qadını. Sənin varlığın həyatımı daha işıqlı və mənalı edir."
    },
    "default": {
      ad: "Əzizim",
      mesaj: "8 Mart Beynəlxalq Qadınlar Günün mübarək! Bu rəqəmsal təcrübə sənin üçün xüsusi hazırlanıb."
    }
  };

  // 2. URL-dən məlumatı çək
  const idParam = searchParams.get("id");
  const gelenId = idParam ? idParam.toLowerCase() : "default";
  const secilenTebrik = tebrikBazasi[gelenId] || tebrikBazasi["default"];

  const name = secilenTebrik.ad;
  const message = secilenTebrik.mesaj;

  const handleOpen = useCallback(() => {
    setIsOpened(true)
    setTimeout(() => setShowScene(true), 400)
    setTimeout(() => {
      setShowMessage(true)
      fireGoldConfetti()
    }, 1600)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isOpened) {
        handleOpen()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpened, handleOpen])

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d0a0b 0%, #151013 30%, #1a1216 50%, #0d0a0b 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-100"
          style={{
            background: "radial-gradient(circle, rgba(180, 60, 80, 0.03) 0%, rgba(212, 175, 55, 0.02) 30%, transparent 70%)",
          }}
        />
      </div>

      <AnimatePresence>
        {!isOpened && <StartScreen isVisible={!isOpened} onOpen={handleOpen} />}
      </AnimatePresence>

      {isOpened && (
        <div className="relative z-10 flex flex-col items-center min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="w-full flex-1 max-h-[62vh] md:max-h-[66vh]"
          >
            <FlowerScene isVisible={showScene} />
          </motion.div>

          <div className="w-full pb-12 md:pb-16 -mt-16 relative z-30">
            <MessageCard name={name} message={message} isVisible={showMessage} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={showMessage ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="absolute bottom-4 left-0 right-0 text-center"
          >
            <p className="text-xs text-foreground/15 font-sans tracking-[0.3em] uppercase">
              {"Sevgi ile hazirlandi"}
            </p>
          </motion.div>
        </div>
      )}
    </main>
  )
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #0d0a0b 0%, #1a1216 50%, #0d0a0b 100%)",
          }}
        >
          <motion.div
            className="w-6 h-6 rounded-full border-2 border-gold/40 border-t-gold"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      }
    >
      <CelebrationContent />
    </Suspense>
  )
}