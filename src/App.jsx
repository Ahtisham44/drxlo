import { useEffect, useRef, useState } from "react"
import { useMotionValue, useTransform, motion } from "motion/react"
import { useLenis } from "@/context/LenisContext"
import useScrollBackground from "@/hooks/useScrollBackground"
import useSectionFade from "@/hooks/useSectionFade"
import { Button } from "@/components/ui/button"
import GlassSurface from "@/components/GlassSurface"
import TextSwap from "@/components/TextSwap"
import Topnav from "@/components/Topnav"
import BubbleMenu from "@/components/BubbleMenu"
import Work from "@/components/Work"
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

const PROBLEMS = [
  {
    serif: "Your product works well,",
    syne: "but users don't understand it ?",
    align: "end",
  },
  { serif: "Users sign up happily", syne: "then disappear?", align: "start" },
  { serif: "Traffic is growing", syne: "Revenue isn't?", align: "end" },
  {
    serif: "Your team keeps building features",
    syne: "but nobody uses?",
    align: "start",
  },
  { syneLines: ["Design and development ", "constantly misalign?"], align: "center" },
  { syneLines: ["Manual processes ", "waste hours every week?"], align: "center" },
]

const ITEMS = [
  ...PROBLEMS.map((p) =>
    p.syneLines
      ? { type: "syneLines", lines: p.syneLines }
      : { type: "pair", serif: p.serif, syne: p.syne }
  ),
  { type: "soundFamiliar" },
  { type: "cta" },
]

const TESTIMONIAL_QUOTE =
  "Working with this team was fantastic! They revamped my website to be sleek, modern, and fully functional. Great communication and timely delivery—highly recommend for boosting your online presence!"

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

function ProblemSlide({ progress, index, count, item }) {
  const local = useTransform(progress, [index / count, (index + 1) / count], [0, 1])
  const y = useTransform(local, [0, 0.4, 1], ["100vh", "0", "0"])
  const scale = useTransform(local, [0.6, 1], [1, 0.7])
  const opacity = useTransform(local, [0, 0.3, 0.6, 1], [0, 1, 1, 0])

  return (
    <motion.div
      style={{ y, scale, opacity }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] px-4 text-center"
    >
      {item.type === "pair" && (
        <div className="flex flex-col items-center gap-[0.25px] pb-[1.5px] whitespace-normal">
          <p className="font-instrument text-3xl sm:text-4xl md:text-[52px] text-drx-accent tracking-[-1px] leading-[1.3]">
            {item.serif}
          </p>
          <p className="font-syne text-2xl sm:text-3xl md:text-[39px] font-bold leading-none tracking-[-2px] text-paper-dark">
            {item.syne}
          </p>
        </div>
      )}
      {item.type === "syneLines" && (
        <div className="flex flex-col justify-center font-syne text-2xl sm:text-3xl md:text-[39px] font-bold leading-none tracking-[-2px] text-paper-dark">
          {item.lines.map((line, i) => (
            <p key={i} className="leading-none">{line}</p>
          ))}
        </div>
      )}
      {item.type === "soundFamiliar" && (
        <p className="font-syne text-4xl sm:text-6xl md:text-[104px] font-extrabold leading-none tracking-[-2px] sm:tracking-[-3.5px] text-paper-dark">
          Sound familiar? <br /> you&apos;re not alone.
        </p>
      )}
      {item.type === "cta" && (
        <p className="font-syne text-4xl sm:text-6xl md:text-[104px] font-extrabold leading-none tracking-[-2px] sm:tracking-[-3.5px]">
          <span className="font-instrument text-3xl sm:text-5xl md:text-[84px] italic font-light tracking-[-2px] sm:tracking-[-3.5px] text-paper-dark">If you&apos;re experiencing any of these,</span>{" "}
          <br />
          <span className="text-drx-accent">Drxlo</span>{" "}
          <span className="text-paper-dark">already solved it.</span>
        </p>
      )}
    </motion.div>
  )
}

// Design canvas is 1200 x 1180. The card stack is drawn at 1:1 and scaled
// proportionally to the container, while testimonial copy stays in an unscaled
// overlay so it remains readable on every viewport.
function StoriesCollage({ quote }) {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      setScale((wrapRef.current?.clientWidth ?? 1200) / 1200)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const textBlock = ({ left, top, width, nameSize, companySize, quoteSize }) => (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${left}%`, top: `${top}%`, width: `${width}%` }}
    >
      <div className="flex shrink-0 flex-col items-start">
        <p className="font-syne font-bold leading-[1.3] tracking-[-1px] text-white" style={{ fontSize: nameSize }}>
          Emily Thompson
        </p>
        <p className="font-geist leading-[1.5] text-[rgba(255,255,255,0.5)]" style={{ fontSize: companySize }}>
          BrandLite GmbH
        </p>
      </div>
      <p className="mt-2 font-geist font-light leading-[1.5] text-paper-light" style={{ fontSize: quoteSize }}>
        {quote}
      </p>
    </div>
  )

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[1200px] overflow-hidden">
      <div className="relative aspect-[1200/1180] w-full">
        <div
          className="absolute left-0 top-0"
          style={{
            width: 1200,
            height: 1180,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div
            className="absolute flex shrink-0 flex-col items-start overflow-clip rounded-[44.262px] border-[5.533px] border-[rgba(255,255,255,0.1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]"
            style={{ left: 270.85, top: 371.19, width: 679.145 }}
          >
            <div className="relative h-[589.929px] w-[687.444px] shrink-0 rounded-[11.065px]">
              <img
                alt=""
                src={IMG_TEST_SMALL}
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[11.065px] object-cover"
              />
            </div>
          </div>

          <div
            className="absolute flex shrink-0 flex-col items-start overflow-clip rounded-[54.671px] border-[6.834px] border-[rgba(255,255,255,0.1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]"
            style={{ left: 303, top: 301.82, width: 838.855 }}
          >
            <div className="relative h-[728.659px] w-[849.106px] shrink-0 rounded-[13.668px]">
              <img
                alt=""
                src={IMG_TEST_MID_A}
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[13.668px] object-cover"
              />
            </div>
          </div>

          <div
            className="absolute flex shrink-0 flex-col items-start overflow-clip rounded-[54.671px] border-[6.834px] border-[rgba(255,255,255,0.1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]"
            style={{ left: 510.15, top: 301.82, width: 838.855 }}
          >
            <div className="relative h-[728.659px] w-[849.106px] shrink-0 rounded-[13.668px]">
              <img
                alt=""
                src={IMG_TEST_MID_B}
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[13.668px] object-cover"
              />
            </div>
          </div>

          <div
            className="absolute flex shrink-0 flex-col items-start overflow-clip rounded-[64px] border-8 border-[rgba(255,255,255,0.1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]"
            style={{ left: 335, top: 239.65, width: 982 }}
          >
            <div className="relative h-[853px] w-[994px] shrink-0 rounded-[16px]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
                <img
                  alt=""
                  src={IMG_TEST_MAIN}
                  loading="lazy"
                  decoding="async"
                  className="absolute left-0 top-[-39.15%] h-[205.27%] w-full max-w-none"
                />
              </div>
            </div>
            <div className="absolute bottom-[7px] left-[7px] h-[297px] w-[968px]" data-name="Liquid Glass - Regular - Large">
              <div
                className="absolute inset-0 rounded-[66px] opacity-67 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {textBlock({
          left: 57.08,
          top: 79.55,
          width: 49.3,
          nameSize: "clamp(18px, 2.6vw, 32px)",
          companySize: "clamp(11px, 1.3vw, 16px)",
          quoteSize: "clamp(13px, 1.7vw, 20px)",
        })}
        {textBlock({
          left: 50.2,
          top: 76.2,
          width: 42.1,
          nameSize: "clamp(16px, 2.3vw, 27px)",
          companySize: "clamp(10px, 1.2vw, 13.7px)",
          quoteSize: "clamp(12px, 1.5vw, 17px)",
        })}
        {textBlock({
          left: 67.4,
          top: 76.2,
          width: 42.1,
          nameSize: "clamp(16px, 2.3vw, 27px)",
          companySize: "clamp(10px, 1.2vw, 13.7px)",
          quoteSize: "clamp(12px, 1.5vw, 17px)",
        })}
        {textBlock({
          left: 42.74,
          top: 72.4,
          width: 34.1,
          nameSize: "clamp(14px, 1.9vw, 22px)",
          companySize: "clamp(9px, 1vw, 11px)",
          quoteSize: "clamp(11px, 1.25vw, 13.8px)",
        })}
      </div>
    </div>
  )
}

function App() {
  const problemsRef = useRef(null)
  const bgRef = useRef(null)
  const scrollYProgress = useMotionValue(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroCard, setHeroCard] = useState({ width: 1200, height: 800 })
  const lenis = useLenis()
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

  useEffect(() => {
    if (!lenis) return

    const updateScrollProgress = () => {
      const section = problemsRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const sectionHeight = rect.height
      const scrollTop = -rect.top
      const maxScroll = sectionHeight - viewportHeight
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll))
      scrollYProgress.set(progress)
    }

    lenis.on("scroll", updateScrollProgress)
    updateScrollProgress()

    return () => {
      lenis.off("scroll", updateScrollProgress)
    }
  }, [lenis, scrollYProgress])

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
        className="relative flex w-full shrink-0 flex-col items-start overflow-clip px-4 sm:px-8 md:px-16 gap-24 sm:gap-48 md:gap-96"
      >
        <div className="absolute left-[40%] top-[40%]">
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

          <div className="relative flex w-full shrink-0 items-center justify-center pt-16 sm:pt-24 md:pt-40">
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


        <div className="relative flex w-full items-end justify-end align-bottom">
          <div className="flex shrink-0 flex-col font-instrument text-2xl sm:text-4xl md:text-[52px] text-white tracking-[-1px] whitespace-normal">
            {STATS.map((stat, i) => (
              <p key={stat} className={`leading-[1.3] ${i === STATS.length - 1 ? "" : "mb-0"}`}>
                {stat}
              </p>
            ))}
          </div>
        </div>

        {/* ===== Trusted by partners ===== */}
        <div className="relative flex w-full shrink-0 flex-col items-left">
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
      <section
        data-name="Section - Problems"
        ref={problemsRef}
        className="relative w-full overflow-clip px-4 sm:px-8 md:px-16"
        style={{ height: `${ITEMS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center w-full">
          {ITEMS.map((item, index) => (
            <ProblemSlide
              key={index}
              progress={scrollYProgress}
              index={index}
              count={ITEMS.length}
              item={item}
            />
          ))}
        </div>
      </section>

      {/* ===== Work ===== */}
      <Work />

      {/* ===== Services ===== */}
      <Services />

      {/* ===== Why ===== */}
      <section
        id="why"
        data-name="Section - Why"
        className="flex w-full shrink-0 flex-col items-start gap-16 sm:gap-24 md:gap-48 overflow-clip px-4 sm:px-8 md:px-[64px] py-16 sm:py-24 md:py-[96px]"
      >
        <div className="relative shrink-0 text-5xl sm:text-6xl md:text-[84px] tracking-[-2px] sm:tracking-[-3.5px] whitespace-normal">
          <p className="font-instrument italic leading-none text-paper-dark">What makes</p>
          <p className="font-syne font-extrabold leading-none text-white">Drxlo Unique</p>
        </div>

        <div className="relative grid h-auto w-full shrink-0 grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl">
          <div className="relative col-span-1 md:col-[1/span_2] md:row-[1/span_2] flex min-h-[440px] shrink-0 flex-col items-start gap-[32px] self-stretch justify-self-stretch overflow-clip rounded-[24px] p-6 sm:p-10 md:p-[48px]">
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
            <div className="relative mt-auto aspect-[516/384] w-[min(100%,516px)] self-center shadow-[0px_0px_40px_0px_rgba(0,0,0,0.4)]">
              <img alt="" src={IMG_WHY_52} loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 size-full object-cover" />
            </div>
          </div>

          <div className="relative col-span-1 md:col-3 md:row-1 flex min-h-[180px] shrink-0 flex-col items-start justify-center self-stretch justify-self-stretch overflow-clip rounded-[24px] sm:rounded-[56px] bg-white p-6 sm:p-8 md:p-[32px]">
            <p className="relative shrink-0 w-auto font-mont text-3xl sm:text-4xl md:w-[238px] md:text-[40px] leading-none tracking-[-2.4px] text-paper-dark uppercase whitespace-pre-wrap">
              <span className="leading-[1.3]">Your Finance, </span>
              <span className="leading-[1.3]">Our Headache</span>
            </p>
          </div>

          <div className="relative col-span-1 md:col-4 md:row-1 flex min-h-[220px] shrink-0 flex-col items-start justify-between self-stretch justify-self-stretch overflow-clip rounded-[24px] p-6 sm:p-8 md:p-[32px]">
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

          <div className="relative col-span-1 md:col-[3/span_2] md:row-2 flex min-h-[280px] shrink-0 flex-col items-start gap-[32px] justify-center self-stretch justify-self-stretch overflow-clip rounded-[24px] p-6 sm:p-8 md:p-[32px]">
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
              <span className="leading-[1.3]">expenses</span>
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
        className="relative flex w-full shrink-0 flex-col items-start gap-12 sm:gap-20 md:gap-[120px] overflow-clip px-4 sm:px-8 md:px-[64px] pb-16 sm:pb-24 md:pb-[120px] pt-16 sm:pt-24 md:pt-[96px]"
      >
        <div className="relative flex w-full shrink-0 flex-col items-start text-5xl sm:text-6xl md:text-[84px] tracking-[-2px] sm:tracking-[-3.5px] text-paper-light whitespace-normal">
          <p className="font-syne font-extrabold leading-none">Stories</p>
          <p className="font-instrument italic leading-none">from our partners</p>
        </div>

        <StoriesCollage quote={TESTIMONIAL_QUOTE} />
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