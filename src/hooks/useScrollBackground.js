import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "@/context/LenisContext"

const SECTION_COLORS = [
  { selector: "#home", color: "#05080a" },
  { selector: '[data-name="Section - Problems"]', color: "#ffffff" },
  { selector: "#work", color: "#ffffff" },
  { selector: "#services", color: "#ffffff" },
  { selector: "#why", color: "#C8F000" },
  { selector: "#stories", color: "#05080a" },
  { selector: '[data-name="Section - FAQ"]', color: "#ffffff" },
  { selector: "#contact", color: "#ffffff" },
  { selector: '[data-name="Footer"]', color: "#05080a" },
]

// Sections from this index onward are not animated by the global viewport
// background — they carry their own static, dedicated background color.
const STATIC_FROM = SECTION_COLORS.findIndex((s) => s.selector === "#stories") + 1

export default function useScrollBackground(bgRef, ready = true) {
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

        const isHeroTransition = i === 1

        gsap.fromTo(
          bgRef.current,
          { backgroundColor: from },
          {
            backgroundColor: section.color,
            ease: "none",
            overwrite: "auto",
            immediateRender: false,
            scrollTrigger: {
              trigger: isHeroTransition ? "#home" : triggerEl,
              start: isHeroTransition ? "bottom bottom" : "top 90%",
              end: isHeroTransition ? "bottom top" : "top 80%",
              scrub: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
            },
          }
        )
        prevColor = section.color
      }
    })

    ScrollTrigger.refresh()

    const observed = []
    for (const s of SECTION_COLORS) {
      const el = document.querySelector(s.selector)
      if (el) observed.push(el)
    }
    const ro = new ResizeObserver(() => ScrollTrigger.refresh())
    observed.forEach((el) => ro.observe(el))

    return () => {
      ro.disconnect()
      lenis.off("scroll", sync)
      ctx.revert()
    }
  }, [lenis, bgRef, ready])
}
