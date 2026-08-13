import { createContext, useContext, useEffect, useState } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      smoothTouch: false,
      anchors: true,
    })

    setLenis(lenis)

    const tickerUpdate = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerUpdate)
      lenis.destroy()
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}

export default LenisContext