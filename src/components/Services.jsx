import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { IMG_SERVICE_L, IMG_SERVICE_R } from "@/lib/assets"
import GlassCard from "@/components/GlassCard"

const CARDS = [
  {
    title: "Design",
    items: [
      "Branding & logo design",
      "Web design",
      "Mobile app design",
      "Design Systems",
      "Interactive Prototypes",
    ],
    variant: "light",
    gap: "gap-[40px]",
    image: IMG_SERVICE_L,
    imageSize: 415,
    imageTop: -290,
  },
  {
    title: "Product development",
    items: [
      "Branding & logo design",
      "UI UX Design",
      "Design Systems",
      "Interactive Prototypes",
    ],
    variant: "light",
    gap: "gap-[40px]",
    image: IMG_SERVICE_R,
    imageSize: 408,
    imageTop: -290,
  },
  {
    title: "SEO",
    items: [
      "Branding & logo design",
      "UI UX Design",
      "Design Systems",
      "Interactive Prototypes",
    ],
    variant: "light",
    gap: "gap-[48px]",
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const getDistance = () =>
      trackRef.current.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        pin: pinRef.current,
        start: "top top",
        end: () => `+=${getDistance()}`,
        scrub: 1,
        pinSpacing: true,
        onUpdate: (self) => {
          gsap.set(trackRef.current, {
            x: -self.progress * getDistance(),
          })
        },
      })
    }, sectionRef)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      data-name="Section - Services"
      className="relative w-full"
    >
      <div className="flex w-full flex-col items-start px-[64px] pb-[16px] mt-80 font-syne font-extrabold">
        <div className="relative flex w-full flex-col justify-center text-[104px] leading-none tracking-[-3.5px] text-paper-dark">
          <p className="leading-none">We help you decide</p>
        </div>
        <div className="flex w-full flex-col justify-center text-right text-[52px] leading-none tracking-[-2.5px] text-drx-accent mb-60">
          <p className="mb-0 leading-none">what to build,</p>
          <p className="mb-0 leading-none">why it matters,</p>
          <p className="leading-none">and how to launch it.</p>
        </div>
      </div>

      <div ref={pinRef} className="relative flex h-screen w-full items-start overflow-visible pt-40 mb-20">
        <div
          ref={trackRef}
          className="relative flex h-full w-max items-start gap-[16px] pl-[64px] pr-[64px]"
        >
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="relative isolate flex shrink-0 flex-col items-start"
            >
              {card.image && (
                <img
                  alt=""
                  src={card.image}
                  className="pointer-events-none absolute right-[24px] z-[-1] object-cover"
                  style={{ top: card.imageTop, width: card.imageSize, height: card.imageSize }}
                />
              )}
              <GlassCard
                className={`glass-card--${card.variant} shrink-0`}
                style={{ width: "40vw", height: "80vh", borderRadius: 40 }}
              >
                <div className="flex h-full w-full flex-col items-start justify-between p-[64px]">
                  <p className="relative shrink-0 font-instrument text-[84px] italic leading-none tracking-[-3.5px] text-paper-dark">
                    {card.title}
                  </p>

                  <div
                    className={`relative flex shrink-0 flex-col items-start font-syne font-bold text-[39px] tracking-[-2px] whitespace-nowrap text-paper-dark ${card.gap}`}
                  >
                    {card.items.map((item) => (
                      <div key={item} className="flex flex-col justify-center">
                        <p className="leading-none">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}