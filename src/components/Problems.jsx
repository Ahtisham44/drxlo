import { useEffect, useRef, useState, startTransition } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const SLIDES = [
  {
    type: "pair",
    serif: "Your product works well,",
    syne: "but users don't understand it?",
  },
  { type: "pair", serif: "Users sign up happily", syne: "then disappear?" },
  { type: "pair", serif: "Traffic is growing", syne: "Revenue isn't?" },
  {
    type: "pair",
    serif: "Your team keeps building features",
    syne: "but nobody uses?",
  },
  { type: "soundFamiliar" },
  { type: "cta" },
]

const ACTIVE_DOT_COLOR = "#05080a"
const INACTIVE_DOT_COLOR = "#d9dfe5"

function SlideContent({ item }) {
  if (item.type === "pair") {
    return (
      <div className="flex flex-col items-center gap-[0.25px] pb-[1.5px] whitespace-normal">
        <p className="font-instrument text-3xl sm:text-4xl md:text-[52px] text-drx-accent tracking-[-1px] leading-[1.3]">
          {item.serif}
        </p>
        <p className="font-syne text-2xl sm:text-3xl md:text-[39px] font-bold leading-none tracking-[-2px] text-paper-dark">
          {item.syne}
        </p>
      </div>
    )
  }

  if (item.type === "syneLines") {
    return (
      <div className="flex flex-col justify-center font-syne text-2xl sm:text-3xl md:text-[39px] font-bold leading-none tracking-[-2px] text-paper-dark">
        {item.lines.map((line, i) => (
          <p key={i} className="leading-none">
            {line}
          </p>
        ))}
      </div>
    )
  }

  if (item.type === "soundFamiliar") {
    return (
      <div className="flex w-full justify-center">
        <p className="font-syne text-4xl sm:text-6xl md:text-[104px] font-extrabold leading-none tracking-[-2px] sm:tracking-[-3.5px] text-paper-dark text-center">
          Sound familiar? <br /> you&apos;re not alone.
        </p>
      </div>
    )
  }

  if (item.type === "cta") {
    return (
      <div className="flex w-full justify-center">
        <p className="font-syne text-4xl sm:text-6xl md:text-[104px] font-extrabold leading-none tracking-[-2px] sm:tracking-[-3.5px] text-center">
          <span className="font-instrument text-3xl sm:text-5xl md:text-[84px] italic font-light tracking-[-2px] sm:tracking-[-3.5px] text-paper-dark">
            If you&apos;re experiencing any of these,
          </span>{" "}
          <br />
          <span className="text-drx-accent">Drxlo</span>{" "}
          <span className="text-paper-dark">already solved it.</span>
        </p>
      </div>
    )
  }

  return null
}

function AnimatedSlide({ index, total, scrollYProgress, children }) {
  const segment = 1 / total
  const startProgress = index * segment
  const fadeInEnd = Math.min(startProgress + segment * 0.1, 1)
  const fadeOutStart = Math.min(startProgress + segment * 0.9, 1)
  const endProgress = Math.min(startProgress + segment, 1)

  const opacity = useTransform(
    scrollYProgress,
    [startProgress, fadeInEnd, fadeOutStart, endProgress],
    [0, 1, 1, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [startProgress, fadeInEnd, fadeOutStart, endProgress],
    [20, 0, 0, -20]
  )

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        opacity,
        y,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Problems() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      startTransition(() => {
        setIsMobile(window.innerWidth < 1024)
      })
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * SLIDES.length),
        SLIDES.length - 1
      )

      startTransition(() => {
        setActiveIndex(Math.max(newIndex, 0))
      })
    })
  }, [scrollYProgress])

  const dotsOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  )

  return (
    <section
      data-name="Section - Problems"
      ref={sectionRef}
      className="relative w-full overflow-clip"
      style={{ height: `${SLIDES.length * 60}vh` }}
    >
      <h2 className="sr-only">Problems we solve</h2>
      <div
        className="sticky top-0 flex h-screen w-full flex-col items-center overflow-clip"
        style={{
          justifyContent: isMobile ? "flex-start" : "center",
          paddingTop: isMobile ? "38vh" : 0,
          boxSizing: "border-box",
        }}
      >
        {!isMobile && (
          <motion.div
            style={{
              position: "absolute",
              left: 80,
              top: "50%",
              transform: "translateY(calc(-50% - 27px))",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "center",
              opacity: dotsOpacity,
              zIndex: 2,
            }}
          >
            {SLIDES.map((_, index) => (
              <div
                key={index}
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: 999,
                  backgroundColor:
                    index === activeIndex ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR,
                  transition: "background-color 0.3s ease",
                }}
              />
            ))}
          </motion.div>
        )}

        <div
          className="flex w-full max-w-[1200px] flex-col items-center px-4 sm:px-8"
          style={{
            position: "relative",
            boxSizing: "border-box",
            ...(isMobile && { padding: "0 24px" }),
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              minHeight: 200,
              textAlign: "center",
            }}
          >
            {SLIDES.map((item, index) => (
              <AnimatedSlide
                key={index}
                index={index}
                total={SLIDES.length}
                scrollYProgress={scrollYProgress}
              >
                <SlideContent item={item} />
              </AnimatedSlide>
            ))}
          </div>
        </div>

        {isMobile && (
          <motion.div
            style={{
              position: "absolute",
              bottom: 60,
              left: 0,
              right: 0,
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
              opacity: dotsOpacity,
              zIndex: 2,
            }}
          >
            {SLIDES.map((_, index) => (
              <div
                key={index}
                style={{
                  width: 18,
                  height: index === activeIndex ? 2 : 1.5,
                  borderRadius: 1,
                  backgroundColor:
                    index === activeIndex ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR,
                  transition: "background-color 0.3s ease, height 0.3s ease",
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
