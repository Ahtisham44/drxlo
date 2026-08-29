import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import useScrollBackground from "@/hooks/useScrollBackground"
import useSectionFade from "@/hooks/useSectionFade"
import { Button } from "@/components/ui/button"
import GlassSurface from "@/components/GlassSurface"
import TextSwap from "@/components/TextSwap"
import Topnav from "@/components/Topnav"
import BubbleMenu from "@/components/BubbleMenu"
import CardSwap, { Card } from "@/components/CardSwap"
import {
  IMG_PARTNER_ACFS,
  IMG_PARTNER_CANVS,
  IMG_PARTNER_DAILYTELEGRAPH,
  IMG_PARTNER_DIGITALTALK,
  IMG_PARTNER_NEWSCORP,
  IMG_PARTNER_SYDNEYWATER,
  IMG_PARTNER_TAILOR247,
  IMG_PARTNER_TKXEL,
  IMG_WHATSAPP,
} from "@/lib/assets"

// ===== Below-the-fold sections are code-split. They load on demand as the
// user scrolls, shrinking the initial JS payload without changing layout,
// styling, or interaction.
const Problems = lazy(() => import("@/components/Problems"))
const Work = lazy(() => import("@/components/Work"))
const RequestSolution = lazy(() => import("@/components/RequestSolution"))
const Services = lazy(() => import("@/components/Services"))
const DrxloBento = lazy(() => import("@/components/DrxloBento"))
const StoriesCollage = lazy(() => import("@/components/StoriesCollage"))
const FAQ = lazy(() => import("@/components/FAQ"))
const Form = lazy(() => import("@/components/Form"))
const Footer = lazy(() => import("@/components/Footer"))

// ===== HERO SWAP CARDS =====
// Paste your own image in any card below. You can use:
//  - a public path:  "/assets/your-image.png"
//  - an imported asset:  IMG_VECTOR_1 (see imports above)
//  - any external URL:  "https://example.com/image.jpg"
// Add or remove entries to change the number of cards.
const HERO_CARDS = ["/assets/Frame 4.png","/assets/Frame 18.png","/assets/Frame 28.png","/assets/Frame 39.png","/assets/Frame 17.png",
  "/assets/Frame 7.png","/assets/Frame 41.png","/assets/Frame 42.png"
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

// Transparent placeholder so a lazy section never shifts layout while its
// chunk downloads; the fixed page background already matches the section theme.
const SectionFallback = () => <div aria-hidden="true" className="min-h-[30vh]" />

// Mounts only after the lazy section resolves, so the ready signal is accurate.
function LazySection({ onReady, children }) {
  useEffect(() => {
    onReady()
  }, [onReady])
  return children
}

const LAZY_SECTION_COUNT = 9

function App() {
  const bgRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroCard, setHeroCard] = useState({ width: 1200, height: 800 })
  const [loadedSections, setLoadedSections] = useState(0)
  const onSectionLoaded = useCallback(() => {
    setLoadedSections((n) => n + 1)
  }, [])
  const sectionsReady = loadedSections >= LAZY_SECTION_COUNT
  useScrollBackground(bgRef, sectionsReady)
  useSectionFade(sectionsReady)

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
                <img
                  alt={`Card ${i + 1}`}
                  src={src}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="size-full object-cover"
                />
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
                    <img alt="" src={IMG_WHATSAPP} decoding="async" />
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
      <Suspense fallback={<SectionFallback />}>
        <LazySection onReady={onSectionLoaded}>
          <Problems />
        </LazySection>
      </Suspense>

      {/* ===== Work ===== */}
      <Suspense fallback={<SectionFallback />}>
        <LazySection onReady={onSectionLoaded}>
          <Work />
        </LazySection>
      </Suspense>

      {/* ===== Request Solution ===== */}
      <Suspense fallback={<SectionFallback />}>
        <LazySection onReady={onSectionLoaded}>
          <RequestSolution />
        </LazySection>
      </Suspense>

      {/* ===== Services ===== */}
      <Suspense fallback={<SectionFallback />}>
        <LazySection onReady={onSectionLoaded}>
          <Services />
        </LazySection>
      </Suspense>

      {/* ===== Why ===== */}
      <Suspense fallback={<SectionFallback />}>
        <LazySection onReady={onSectionLoaded}>
          <DrxloBento />
        </LazySection>
      </Suspense>

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

        <Suspense fallback={<SectionFallback />}>
          <LazySection onReady={onSectionLoaded}>
            <StoriesCollage />
          </LazySection>
        </Suspense>
      </section>

      {/* ===== FAQ ===== */}
      <Suspense fallback={<SectionFallback />}>
        <LazySection onReady={onSectionLoaded}>
          <FAQ />
        </LazySection>
      </Suspense>

      {/* ===== Form ===== */}
      <Suspense fallback={<SectionFallback />}>
        <LazySection onReady={onSectionLoaded}>
          <Form />
        </LazySection>
      </Suspense>

      {/* ===== Footer ===== */}
      <Suspense fallback={<SectionFallback />}>
        <LazySection onReady={onSectionLoaded}>
          <Footer />
        </LazySection>
      </Suspense>
    </div>
  )
}

export default App