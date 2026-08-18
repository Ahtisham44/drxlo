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
import CardSwap, { Card } from "@/components/CardSwap"
import {
  IMG_FINGER,
  IMG_PARTNERS,
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
const HERO_CARDS = ["public/assets/5 Interpretation & Translation Dashboard & Analytics.jpg","public/assets/mobile 01.jpg", "public/assets/2 Dashboard & Analytics.jpg","public/assets/1 Canvs Dashboard & Analytics.jpg",
  "public/assets/3 Doctor Appointment booking Dashboard.jpg","public/assets/4 Expense Analyser Dashboard & Analytics.jpg"
]

const STATS = [
  "15+ products delivered",
  "10+ industries",
  "40% admin workload reduction",
  "90% fewer backend requests",
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
            verticalDistance={120 * (heroCard.width / 1200)}
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
          <div className="relative aspect-[1758/273] w-full shrink-0 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <img
                alt="Partners screenshot"
                src={IMG_PARTNERS}
                loading="lazy"
                decoding="async"
                className="absolute left-[-3.8%] top-[-339.29%] h-[454.31%] w-[121.84%] max-w-none"
              />
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
      <section
        id="why"
        data-name="Section - Why"
        className="flex w-full shrink-0 flex-col items-start gap-12 sm:gap-16 md:gap-24 overflow-clip px-4 sm:px-8 md:px-[64px] py-12 sm:py-16 md:py-[64px]"
      >
        <div className="relative shrink-0 text-5xl sm:text-6xl md:text-[84px] tracking-[-2px] sm:tracking-[-3.5px] whitespace-normal">
          <p className="font-instrument italic leading-none text-paper-dark">What makes</p>
          <p className="font-syne font-extrabold leading-none text-white">Drxlo Unique</p>
        </div>

        <div className="relative grid h-[80vh] w-full shrink-0 grid-cols-1 gap-2 rounded-2xl md:aspect-[1280/770] md:grid-cols-4 md:grid-rows-2">
          <div className="relative col-span-1 md:col-[1/span_2] md:row-[1/span_2] flex min-h-[440px] md:min-h-0 shrink-0 flex-col items-start gap-[32px] self-stretch justify-self-stretch overflow-clip rounded-[24px] p-6 sm:p-10 md:p-[48px]">
            <div className="absolute inset-[-0.35px_0_0.35px_0] rounded-[56px]">
              <div className="absolute inset-0 rounded-[56px] bg-[#ccc] mix-blend-color-burn opacity-67" />
              <div
                className="absolute inset-0 rounded-[56px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)",
                }}
              />
            </div>
            <p className="relative shrink-0 font-mont text-2xl sm:text-3xl md:text-[40px] font-semibold leading-[1.3] tracking-[-0.8px] text-white">
              Evaluate your expenses against possible savings.
            </p>
            <div className="relative mt-auto rounded-3xl aspect-[516/384] w-[min(100%,516px)] self-center shadow-[0px_0px_40px_0px_rgba(0,0,0,0.4)]">
              <img alt="" src={IMG_WHY_52} loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 size-full object-cover" />
            </div>
          </div>

          <div className="relative col-span-1 md:col-3 md:row-1 flex min-h-[180px] md:min-h-0 shrink-0 flex-col items-start justify-center self-stretch justify-self-stretch overflow-clip rounded-[24px] sm:rounded-[56px] bg-white p-6 sm:p-8 md:p-[32px]">
            <p className="relative shrink-0 w-auto font-mont text-3xl sm:text-4xl md:w-[238px] md:text-[40px] leading-none tracking-[-2.4px] text-paper-dark uppercase whitespace-pre-wrap">
              <span className="leading-[1.3]">Your Finance, </span>
              <span className="leading-[1.3]">Our Headache</span>
            </p>
          </div>

          <div className="relative col-span-1 md:col-4 md:row-1 flex min-h-[220px] md:min-h-0 shrink-0 flex-col items-start justify-between self-stretch justify-self-stretch overflow-clip rounded-[24px] p-6 sm:p-8 md:p-[32px]">
            <div className="absolute inset-[-0.35px_0_0.35px_0] rounded-[56px]">
              <div className="absolute inset-0 rounded-[56px] bg-[#ccc] mix-blend-color-burn opacity-67" />
              <div
                className="absolute inset-0 rounded-[56px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)",
                }}
              />
            </div>
            <div className="relative size-[96px] overflow-clip">
              <img alt="" src={IMG_FINGER} className="block size-full max-w-none" />
            </div>
            <p className="relative shrink-0 font-mont text-2xl sm:text-3xl md:text-[32px] font-semibold leading-[1.3] tracking-[-0.64px] text-white">
              Verification on the go
            </p>
          </div>

          <div className="relative col-span-1 md:col-[3/span_2] md:row-2 flex min-h-[280px] md:min-h-0 shrink-0 flex-col items-start gap-[32px] justify-self-stretch overflow-clip p-6 sm:p-8 md:p-[32px]">
            <div className="absolute inset-[-0.35px_0_0.35px_0] rounded-[56px]">
              <div className="absolute inset-0 rounded-[56px] bg-[#ccc] mix-blend-color-burn opacity-67" />
              <div
                className="absolute inset-0 rounded-[56px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)",
                }}
              />
            </div>
            <p className="relative shrink-0 font-mont text-2xl sm:text-3xl md:text-[32px] font-semibold leading-none tracking-[-0.64px] text-white whitespace-normal">
              <span className="leading-[1.3]">Collective </span>
              <span className="leading-[1.3]">expenses</span> <br />
              <span className="leading-[1.3]">under 1 roof</span>
            </p>
            <div className="relative mt-auto aspect-[401/217] w-[min(70%,401px)] self-end shadow-[0px_0px_40px_0px_rgba(0,0,0,0.4)]">
              <img alt="" src={IMG_WHY_53} loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

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