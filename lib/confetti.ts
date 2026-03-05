import confetti from "canvas-confetti"

export function fireGoldConfetti() {
  const duration = 4000
  const end = Date.now() + duration

  const gold = ["#d4af37", "#e8c84a", "#b8941f", "#fff5e0", "#f5e6c8"]

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: gold,
      shapes: ["circle", "square"],
      scalar: 1.2,
      drift: 0.5,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: gold,
      shapes: ["circle", "square"],
      scalar: 1.2,
      drift: -0.5,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()

  // Big burst from center
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: gold,
      scalar: 1.5,
      gravity: 0.8,
    })
  }, 300)
}
