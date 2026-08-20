import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import useScrollBackground from "@/hooks/useScrollBackground"
import useSectionFade from "@/hooks/useSectionFade"
import { Button } from "@/components/ui/button"
import GlassSurface from "@/components/GlassSurface"
import TextSwap from "@/components/TextSwap"
import Topnav from "@/components/Topnav"
import BubbleMenu from "@/components/BubbleMenu"
import Problems from "@/components/Problems"
import Work from "@/components/Work"
import RequestSolution from "@/components/RequestSolution"
import Services from "@/components/Services"
import FAQ from "@/components/FAQ"
import Form from "@/components/Form"
import Footer from "@/components/Footer"
import DrxloBento from "@/components/DrxloBento"
import CardSwap, { Card } from "@/components/CardSwap"
import {
  IMG_FINGER,
  IMG_PARTNER_ACFS,
  IMG_PARTNER_CANVS,
  IMG_PARTNER_DAILYTELEGRAPH,
  IMG_PARTNER_DIGITALTALK,
  IMG_PARTNER_NEWSCORP,
  IMG_PARTNER_SYDNEYWATER,
  IMG_PARTNER_TAILOR247,
  IMG_PARTNER_TKXEL,
  IMG_TEST_MAIN,
  IMG_TEST_MID_A,
  IMG_TEST_MID_B,
  IMG_TEST_SMALL,
  IMG_VECTOR_1,
  IMG_VECTOR_2,
  IMG_VECTOR_3,
  IMG_WHATSAPP,
  IMG_WHY_52,
  IMG_WHY_53,  
} from "@/lib/assets"

// ===== HERO SWAP CARDS =====
// Paste your own image in any card below. You can use:
//  - a public path:  "/assets/your-image.png"
//  - an imported asset:  IMG_VECTOR_1 (see imports above)
//  - any external URL:  "https://example.com/image.jpg"
// Add or remove entries to change the number of cards.
const HERO_CARDS = ["public/assets/Frame 4.png","public/assets/Frame 18.png","public/assets/Frame 28.png","public/assets/Frame 39.png","public/assets/Frame 17.png",
  "public/assets/Frame 7.png","public/assets/Frame 41.png","public/assets/Frame 42.png"
]

const STATS = [
  "15+ products delivered",
  "10+ industries",
  "40% admin workload reduction",
  "90% fewer backend requests",
]

const PARTNERS = [
  {
    name: "News Corp Australia",
    logo: IMG_PARTNER_NEWSCORP,
    style: {
      width: 121.18,
      height: 121.18,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    name: "DigitalTalk",
    logo: IMG_PARTNER_DIGITALTALK,
    style: {
      width: 351.035,
      height: 196.98,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    name: "Canvs",
    logo: IMG_PARTNER_CANVS,
    style: {
      width: 137.704,
      height: 137.704,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    name: "Sydney Water",
    logo: IMG_PARTNER_SYDNEYWATER,
    style: {
      width: 126.172,
      height: 100.937,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    name: "ACFS Port Logistics",
    logo: IMG_PARTNER_ACFS,
    style: {
      width: 148.193,
      height: 96.737,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    name: "Tailor 24/7",
    logo: IMG_PARTNER_TAILOR247,
    style: {
      width: 120.87,
      height: 38.22,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    name: "Daily Telegraph",
    logo: IMG_PARTNER_DAILYTELEGRAPH,
    style: {
      width: 126.137,
      height: 26.279,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    name: "Tkxel",
    logo: IMG_PARTNER_TKXEL,
    style: {
      width: 72.983,
      height: 72.983,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
]

const MENU_ITEMS = [
  {
    label: "home",
    href: "#home",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#ff4d1c", textColor: "#ffffff" },
  },
  {
    label: "work",
    href: "#work",
    ariaLabel: "Work",
    rotation: 8,
    hoverStyles: { bgColor: "#c8f000", textColor: "#05080a" },
  },
  {
    label: "services",
    href: "#services",
    ariaLabel: "Services",
    rotation: 8,
    hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
  },
  {
    label: "why us",
    href: "#why",
    ariaLabel: "Why us",
    rotation: 8,
    hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  },
  {
    label: "stories",
    href: "#stories",
    ariaLabel: "Stories",
    rotation: -8,
    hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
]

const TESTIMONIALS = [
  {
    image: IMG_TEST_MAIN,
    name: "Emily Thompson",
    company: "BrandLite GmbH",
    quote:
      "Working with this team was fantastic! They revamped my website to be sleek, modern, and fully functional. Great communication and timely delivery—highly recommend for boosting your online presence!",
  },
  {
    image: IMG_TEST_MID_A,
    name: "Daniel Carter",
    company: "Nimbus Labs",
    quote:
      "Our analytics dashboard was rebuilt from the ground up and the difference is night and day. Fast, reliable, and beautifully crafted.",
  },
  {
    image: IMG_TEST_MID_B,
    name: "Sofia Reyes",
    company: "Lumen Studio",
    quote:
      "From the first call to launch they kept us in the loop. The app feels polished and our users keep complimenting the design.",
  },
  {
    image: IMG_TEST_SMALL,
    name: "Marcus Chen",
    company: "Vertex Analytics",
    quote:
      "They handled a complex migration without breaking a thing. Clear communication and rock-solid delivery—exactly what we needed.",
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
        <div className="relative w-full" style={{ aspectRatio: "1 / 0.78" }}>
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
              <div className="relative min-h-0 flex-1">
                <img
                  alt=""
                  src={t.image}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="relative shrink-0 border-t border-white/10 bg-black/60 p-4 backdrop-blur-xl sm:p-6">
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

function App() {
  const bgRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroCard, setHeroCard] = useState({ width: 1200, height: 800 })
  useScrollBackground(bgRef)
  useSectionFade()

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const width = Math.min(1200, vw * 0.92)
      setHeroCard({ width, height: Math.min(800, width * 0.6667) })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <div
      data-name="Html → Body"
      className="relative isolate flex w-full flex-col items-start"
    >
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-paper-dark will-change-[background-color]"
      />
      <Topnav menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
      <BubbleMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={MENU_ITEMS}
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />

      {/* ===== Hero ===== */}
      <section
        id="home"
        data-name="Section - HERO - Marquee Hero macrostructure"
        className="relative flex w-full flex-col items-start overflow-clip px-4 sm:px-8 md:px-16 gap-96 sm:gap-20 md:gap-40"
      >
        <div className="absolute left-[40%] top-[30%]">
          <CardSwap
            width={heroCard.width}
            height={heroCard.height}
            cardDistance={65 * (heroCard.width / 1200)}
            verticalDistance={100 * (heroCard.width / 1200)}
            delay={3000}
            pauseOnHover={false}
            skewAmount={6}
            easing="elastic"
          >
            {HERO_CARDS.map((src, i) => (
              <Card key={i} className="overflow-hidden rounded-3xl border-0 bg-transparent]">
                <img alt={`Card ${i + 1}`} src={src} className="size-full object-cover" />
              </Card>
            ))}
          </CardSwap>
        </div>

        <div className="relative flex w-full shrink-0 flex-col items-center pt-10">
          <div className="relative flex shrink-0 flex-col items-center gap-[0.25px] pb-[1.5px] text-center tracking-[-2px] sm:tracking-[-3.5px] whitespace-normal">
            <div className="flex shrink-0 flex-col justify-center font-syne text-5xl sm:text-7xl md:text-[104px] font-extrabold text-[#e5e8ec]">
              <p className="mb-0 leading-none">We design</p>
              <p className="leading-none">products that</p>
            </div>
            <div className="flex shrink-0 flex-col justify-center font-instrument text-6xl sm:text-8xl md:text-[120px] italic text-drx-lime">
              <TextSwap />
            </div>
          </div>

          <div className="relative flex w-full shrink-0 items-center justify-center pt-10 sm:pt-14 md:pt-24">
            <div className="flex w-full max-w-xl shrink-0 flex-col items-center justify-center gap-4 sm:flex-row sm:items-start sm:gap-[16px]">
              <GlassSurface width="auto" height="auto" borderRadius={99} backgroundOpacity={0.06}>
                <Button variant="default" asChild>
                  <a href="mailto:hello@drxlo.com?subject=Free%20Audit%20Request">Book Free Audit</a>
                </Button>
              </GlassSurface>
              <GlassSurface width="auto" height="auto" borderRadius={99} backgroundOpacity={0.06}>
                <Button variant="default" asChild>
                  <a
                    href="https://wa.me/923226247462"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img alt="" src={IMG_WHATSAPP} />
                    Chat on Whatsapp
                  </a>
                </Button>
              </GlassSurface>
            </div>
          </div>
        </div>


        <div className="relative flex w-full py-40">
          <div className="flex max-w-full shrink-0 flex-col items-start text-right font-instrument text-2xl sm:text-4xl md:text-[52px] text-white tracking-[-1px] whitespace-normal">
            {STATS.map((stat, i) => (
              <p key={stat} className={`leading-[1.3] ${i === STATS.length - 1 ? "" : "mb-0"}`}>
                {stat}
              </p>
            ))}
          </div>
        </div>

        {/* ===== Trusted by partners ===== */}
        <div className="relative flex w-full shrink-0 flex-col items-left py-80">
          <div className="relative shrink-0 text-paper-light">
            <p className="font-syne text-2xl sm:text-4xl md:text-[49px] font-bold leading-none tracking-[-2px] sm:tracking-[-3px]">Trusted by</p>
            <p className="font-syne text-4xl sm:text-6xl md:text-[84px] font-extrabold leading-none tracking-[-2px] sm:tracking-[-3.5px]">28 partners</p>
          </div>
          <div className="relative w-full shrink-0 overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.06)] mt-20">
            <div className="grid w-full grid-cols-2 gap-px sm:grid-cols-4 md:grid-cols-8">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="relative aspect-[164/111] overflow-hidden bg-paper-dark"
                >
                  <div className="absolute" style={partner.style}>
                    <img
                      alt={`${partner.name} logo`}
                      src={partner.logo}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover brightness-0 invert opacity-60"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      

      {/* ===== Problems ===== */}
      <Problems />

      {/* ===== Work ===== */}
      <Work />

      {/* ===== Request Solution ===== */}
      <RequestSolution />

      {/* ===== Services ===== */}
      <Services />

      {/* ===== Why ===== */}
      <DrxloBento />

      {/* ===== Testimonials ===== */}
      <section
        id="stories"
        data-name="Section - Testimonials"
        className="relative flex w-full shrink-0 flex-col items-start gap-10 sm:gap-14 md:gap-[64px] overflow-clip px-4 sm:px-8 md:px-[64px] pb-12 sm:pb-16 md:pb-[64px] pt-12 sm:pt-16 md:pt-[64px]"
      >
        <div className="relative flex w-full shrink-0 flex-col items-start text-5xl sm:text-6xl md:text-[84px] tracking-[-2px] sm:tracking-[-3.5px] text-paper-light whitespace-normal">
          <p className="font-syne font-extrabold leading-none">Stories</p>
          <p className="font-instrument italic leading-none">from our partners</p>
        </div>

        <StoriesCollage />
      </section>

      {/* ===== FAQ ===== */}
      <FAQ />

      {/* ===== Form ===== */}
      <Form />

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  )
}

export default App