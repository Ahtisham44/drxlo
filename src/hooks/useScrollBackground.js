import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "@/context/LenisContext"

const SECTION_COLORS = [
  { selector: "#home", color: "#05080a" },
  { selector: '[data-name="Section - Problems"]', color: "#ffffff" },
  { selector: "#work", color: "#ffffff" },
  { selector: "#services", color: "#ffffff" },
  { selector: "#why", color: "#ff4d1c" },
  { selector: "#stories", color: "#05080a" },
  { selector: '[data-name="Section - FAQ"]', color: "#ffffff" },
  { selector: "#contact", color: "#ffffff" },
  { selector: '[data-name="Footer"]', color: "#05080a" },
]

// Sections from this index onward are not animated by the global viewport
// background — they carry their own static, dedicated background color.
const STATIC_FROM = SECTION_COLORS.findIndex((s) => s.selector === "#stories") + 1

export default function useScrollBackground(bgRef) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis || !bgRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const sync = () => ScrollTrigger.update()
    lenis.on("scroll", sync)

    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, { backgroundColor: SECTION_COLORS[0].color })

      let prevColor = null
      for (let i = 1; i < SECTION_COLORS.length; i++) {
        const section = SECTION_COLORS[i]
        const triggerEl = document.querySelector(section.selector)
        if (!triggerEl) continue

        const from = prevColor ?? SECTION_COLORS[0].color
        if (from === section.color) {
          prevColor = section.color
          continue
        }

        if (i >= STATIC_FROM) {
          prevColor = section.color
          continue
        }

        gsap.fromTo(
          bgRef.current,
          { backgroundColor: from },
          {
            backgroundColor: section.color,
            ease: "none",
            overwrite: "auto",
            immediateRender: false,
            scrollTrigger: {
              trigger: triggerEl,
              start: "top 90%",
              end: "top 30%",
              scrub: 1,
            },
          }
        )
        prevColor = section.color
      }
    })

    ScrollTrigger.refresh()

    return () => {
      lenis.off("scroll", sync)
      ctx.revert()
    }
  }, [lenis, bgRef])
}
