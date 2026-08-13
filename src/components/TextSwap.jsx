import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

const TEXT_SWAP_PHRASES = [
  "drive measurable growth",
  "turn users into customers",
  "people actually want to use",
  "solve real business problems",
  "increase revenue",
]

export default function TextSwap({
  phrases = TEXT_SWAP_PHRASES,
  interval = 2300,
  duration = 0.5,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    }, interval)
    return () => clearInterval(timer)
  }, [phrases.length, interval])

  return (
    <div className={`relative inline-flex justify-center overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: 25, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -25, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration, ease: [0.9, 1, .3, 1] }}
          className="leading-none"
        >
          {phrases[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}