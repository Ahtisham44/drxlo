import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "@/context/LenisContext"

const SECTION_SELECTOR = [
  "#home",
  '[data-name="Section - Problems"]',
  "#work",
  "#services",
  "#why",
  "#stories",
  '[data-name="Section - FAQ"]',
  "#contact",
  '[data-name="Footer"]',
]

// Sections from this index onward are static — they stay fully visible
// with no scroll-scrubbed fade animation.
const FIXED_FROM = SECTION_SELECTOR.findIndex((s) => s === "#stories") + 1

export default function useSectionFade() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    gsap.registerPlugin(ScrollTrigger)

    const sync = () => ScrollTrigger.update()
    lenis.on("scroll", sync)

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(SECTION_SELECTOR.join(", "))

      sections.forEach((el, index) => {
        if (index === 0 || index >= FIXED_FROM) {
          gsap.set(el, { opacity: 1 })
          return
        }

        // Fade in once the section scrolls up past the bottom of the viewport
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 30%",
              scrub: 1,
            },
          }
        )

        // Fade out while the section exits, giving room for the next one
        gsap.to(el, {
          opacity: 0,
          ease: "none",
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            start: "bottom 75%",
            end: "bottom 25%",
            scrub: 1,
          },
        })
      })
    })

    ScrollTrigger.refresh()

    return () => {
      lenis.off("scroll", sync)
      ctx.revert()
    }
  }, [lenis])
}