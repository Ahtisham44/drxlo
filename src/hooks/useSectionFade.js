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

        // A single timeline drives the full lifecycle — fade in on entry, stay
        // visible, then fade out as the section exits the bottom. One
        // ScrollTrigger scrub means playback always mirrors the scroll
        // direction, so scrolling back into a section never leaves it stuck
        // faded out (previously two competing tweens overwrote each other).
        //
        // Segment durations are proportional to the scroll distance each phase
        // should span, so animation progress lines up with the trigger range
        // end-to-end (total duration === end minus start, in px).
        const vh = window.innerHeight
        const sectionHeight = el.offsetHeight

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom 25%",
              scrub: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(el, { opacity: 0 }, { opacity: 1, duration: vh * 0.6 })
          .to(el, { opacity: 1, duration: Math.max(0.001, sectionHeight - vh * 0.45) })
          .to(el, { opacity: 0, duration: vh * 0.5 })
      })
    })

    ScrollTrigger.refresh()

    return () => {
      lenis.off("scroll", sync)
      ctx.revert()
    }
  }, [lenis])
}