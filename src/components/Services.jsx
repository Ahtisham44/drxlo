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
      "SaaS Design",
      "Dashboard Design",      
    ],
    variant: "light",
    gap: "gap-[24px]",
    image: IMG_SERVICE_L,
    imageSize: "min(55vw, 415px)",
    imageTop: "max(-290px, -22vh)",
  },
  {
    title: "Build",
    items: [
      "Web development",
      "WordPress, Webflow & Framer",
      "API & Third-Party Integrations",
      "Custom Web Applications",
      "Backend Development",
    ],
    variant: "light",
    gap: "gap-[24px]",
    image: IMG_SERVICE_R,
    imageSize: "min(55vw, 408px)",
    imageTop: "max(-290px, -22vh)",
  },
  {
    title: "Launch (SEO)",
    items: [
      "SEO Strategy & Audits",
      "Technical SEO",
      "Content & Topical Authority",
      "Digital PR & Link Building",
      "Back Linking & Outreach",
      "AI Search Optimization"
    ],
    variant: "light",
    gap: "gap-[24px]",
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  // Cache the horizontal travel distance so onUpdate never forces a reflow by
  // reading scrollWidth back every frame.
  const distanceRef = useRef(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const measureDistance = () => {
      distanceRef.current = trackRef.current.scrollWidth - window.innerWidth
    }

    const handleResize = () => {
      measureDistance()
      ScrollTrigger.refresh()
    }

    measureDistance()

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        pin: pinRef.current,
        start: "top 20%",
        end: () => `+=${distanceRef.current * 0.8}`,
        scrub: 1,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(trackRef.current, {
            x: -self.progress * distanceRef.current,
            force3D: true,
          })
        },
      })
    }, sectionRef)

    window.addEventListener("resize", handleResize)

    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener("resize", handleResize)
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
      <div className="flex w-full flex-col items-start px-4 sm:px-8 md:px-[64px] pb-[16px] mt-12 sm:mt-20 md:mt-32 font-syne font-extrabold">
        <div className="relative flex w-full flex-col justify-center text-4xl sm:text-6xl md:text-[104px] leading-none tracking-[-2px] sm:tracking-[-3.5px] text-paper-dark">
          <h2 className="leading-none">We help you decide</h2>
        </div>
        <div className="flex w-full flex-col justify-center text-right text-2xl sm:text-4xl md:text-[52px] leading-none tracking-[-1.5px] sm:tracking-[-2.5px] text-drx-accent mb-24 sm:mb-40 md:mb-60">
          <p className="mb-0 leading-none">what to build,</p>
          <p className="mb-0 leading-none">why it matters,</p>
          <p className="leading-none">and how to launch it.</p>
        </div>
      </div>

      <div ref={pinRef} className="relative flex h-screen w-full items-start overflow-visible pt-10 sm:pt-16 mb-10">
        <div
          ref={trackRef}
          className="relative flex h-full w-max items-stretch gap-[16px] pl-4 sm:pl-8 md:pl-[64px] pr-4 sm:pr-8 md:pr-[64px] will-change-transform"
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
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute right-[clamp(8px,3vw,24px)] z-[-1] object-cover"
                  style={{ top: card.imageTop, width: card.imageSize, height: card.imageSize }}
                />
              )}
              <GlassCard
                className={`glass-card--${card.variant} h-auto min-h-[660px] shrink-0`}
                style={{
                  width: "clamp(300px, min(88vw, 40vw), 760px)",
                  borderRadius: 40,
                }}
              >
                <div className="flex h-full w-full flex-col items-start justify-between p-6 sm:p-12 md:p-[64px]">
                  <h3 className="relative shrink-0 font-instrument text-4xl sm:text-6xl md:text-[84px] italic leading-none tracking-[-2px] sm:tracking-[-3.5px] text-paper-dark">
                    {card.title}
                  </h3>

                  <div
                    className={`relative flex shrink-0 flex-col items-start font-syne font-medium text-2xl sm:text-3xl md:text-[39px] tracking-[-1px] sm:tracking-[-2px] text-paper-dark ${card.gap}`}
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