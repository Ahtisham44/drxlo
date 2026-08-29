import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { IMG_TEST_MAIN, IMG_TEST_MID_A, IMG_TEST_MID_B, IMG_TEST_SMALL } from "@/lib/assets"

const TESTIMONIALS = [
  {
    image: IMG_TEST_MAIN,
    name: "Jay",
    company: "NewsCorp Australia",
    quote:
      "Working with this team was fantastic! They revamped my website to be sleek, modern, and fully functional. Great communication and timely delivery highly recommend for boosting your online presence!",
  },
  {
    image: IMG_TEST_MID_A,
    name: "Bram",
    company: "Brain Manager",
    quote:
      "Our analytics dashboard was rebuilt from the ground up and the difference is night and day. Fast, reliable, and beautifully crafted.",
  },
  {
    image: IMG_TEST_MID_B,
    name: "Virpal",
    company: "DigitalTolk",
    quote:
      "From the first call to launch they kept us in the loop. The app feels polished and our users keep complimenting the design.",
  },
  {
    image: IMG_TEST_SMALL,
    name: "Adeel",
    company: "BrainX Technologies",
    quote:
      "They handled a complex migration without breaking a thing. Clear communication and rock-solid delivery exactly what we needed.",
  },
]

// Horizontal flat testimonial deck powered by a GSAP timeline. Every card is a
// stable, independent DOM node (one ref per testimonial), so navigation animates
// pure GPU-friendly transforms with zero React re-renders per frame. Cards share
// the same size (the active one ≈ 60% of the stack width) and sit directly on
// top of each other, fanned out left and right; back cards render at 80%
// opacity. A next/prev click advances a cyclic order array — the card that
// wraps around the deck dips behind the stack (low z-index) while the incoming
// card rises to the front.
const CARD_WIDTH_PCT = 60
const STEP_PCT = 15
const BACK_SCALE = 0.05

function StoriesCollage() {
  const cardRefs = useRef([])
  const tlRef = useRef(null)
  const orderRef = useRef(TESTIMONIALS.map((_, i) => i))
  const [active, setActive] = useState(0)
  const total = TESTIMONIALS.length

  const slotVars = (slot) => {
    const depth = Math.abs(slot)
    return {
      xPercent: -50 + slot * STEP_PCT,
      scale: 1 - depth * BACK_SCALE,
      opacity: slot === 0 ? 1 : 0.8,
      zIndex: 10 - depth,
    }
  }

  const layoutSlot = (position) =>
    position === 0 ? 0 : position === 1 ? 1 : position === 2 ? 2 : -1

  const go = (dir) => {
    if (total < 2) return
    const order = orderRef.current
    const nextOrder =
      dir > 0
        ? [order[3], order[0], order[1], order[2]]
        : [order[1], order[2], order[3], order[0]]
    orderRef.current = nextOrder
    setActive(nextOrder[0])

    const cards = cardRefs.current
    if (!cards.length) return

    const wrap = dir > 0 ? order[2] : order[3]

    tlRef.current?.kill()
    gsap.killTweensOf(cards)
    tlRef.current = gsap.timeline()

    nextOrder.forEach((cardIdx, position) => {
      const vars = slotVars(layoutSlot(position))
      if (cardIdx === wrap) vars.zIndex = 3
      gsap.set(cards[cardIdx], { zIndex: vars.zIndex })
      tlRef.current.to(
        cards[cardIdx],
        {
          xPercent: vars.xPercent,
          scale: vars.scale,
          opacity: vars.opacity,
          duration: 0.6,
          ease: "power2.inOut",
          force3D: true,
        },
        0,
      )
    })
  }

  useLayoutEffect(() => {
    const cards = cardRefs.current
    if (!cards.length) return
    orderRef.current.forEach((cardIdx, position) => {
      gsap.set(cards[cardIdx], {
        ...slotVars(layoutSlot(position)),
        transformOrigin: "50% 50%",
        force3D: true,
      })
    })
  }, [])

  useEffect(() => {
    const cards = cardRefs.current
    return () => {
      tlRef.current?.kill()
      gsap.killTweensOf(cards)
    }
  }, [])

  const arrowClass =
    "absolute top-1/2 z-30 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95 sm:size-14"

  return (
    <div className="relative mx-auto w-full max-w-[1200px]">
      <div className="relative w-full px-8 sm:px-16 lg:px-20">
        <div className="relative w-full" style={{ aspectRatio: "1 / 0.62" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardRefs.current[i] = el
              }}
              aria-hidden={i !== active}
              className="absolute inset-y-0 left-1/2 flex flex-col overflow-clip rounded-4xl border border-[rgba(255,255,255,0.12)] bg-[#0b0f12] shadow-[0px_20px_50px_rgba(0,0,0,0.45)] will-change-transform"
              style={{ width: `${CARD_WIDTH_PCT}%` }}
            >
              <img
                alt=""
                src={t.image}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 pt-12">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/16 to-transparent backdrop-blur-xl [mask-image:linear-gradient(to_top,black_0%,black_80%,transparent_100%)]" />
                <div className="relative p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-syne font-bold leading-[1.3] text-white">{t.name}</p>
                  <span className="size-1 rounded-full bg-white/30" />
                  <p className="font-geist text-sm leading-none text-white/45">{t.company}</p>
                </div>
                <p className="mt-3 font-geist font-light leading-[1.5] text-paper-light">
                  {t.quote}
                </p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={() => go(-1)}
        className={`${arrowClass} left-0`}
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={() => go(1)}
        className={`${arrowClass} right-0`}
      >
        <Chevron direction="right" />
      </button>
    </div>
  )
}

const Chevron = ({ direction }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default StoriesCollage
