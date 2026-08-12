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
  },
  {
    title: "Product development",
    items: [
      "Branding & logo design",
      "UI UX Design",
      "Design Systems",
      "Interactive Prototypes",
    ],
    variant: "subtle",
    gap: "gap-[40px]",
  },
  {
    title: "SEO",
    items: [
      "Branding & logo design",
      "UI UX Design",
      "Design Systems",
      "Interactive Prototypes",
    ],
    variant: "rich",
    gap: "gap-[48px]",
  },
]

export default function Services() {
  return (
    <section
      data-name="Section - Services"
      className="flex w-full shrink-0 flex-col items-center gap-48 overflow-clip bg-white px-[64px] py-[96px]"
    >
      <div className="flex w-full flex-col items-start font-syne font-extrabold">
        <div className="relative mb-[-40px] flex w-full flex-col justify-center text-[104px] leading-none tracking-[-3.5px] text-paper-dark">
          <p className="leading-none">We help you decide</p>
        </div>
        <div className="flex w-full flex-col justify-center text-right text-[52px] leading-none tracking-[-2.5px] text-drx-accent">
          <p className="mb-0 leading-none">what to build,</p>
          <p className="mb-0 leading-none">why it matters,</p>
          <p className="leading-none">and how to launch it.</p>
        </div>
      </div>

      <div className="relative flex w-full items-start gap-[16px] overflow-x-visible scrollbar-hide">
        <img
          alt=""
          src={IMG_SERVICE_R}
          className="pointer-events-none absolute left-[1181px] top-[-240.35px] size-[408px] object-cover"
        />
        <img
          alt=""
          src={IMG_SERVICE_L}
          className="pointer-events-none absolute left-[410px] top-[-224.35px] size-[415px] object-cover"
        />

        {CARDS.map((card) => (
          <GlassCard
            key={card.title}
            className={`glass-card--${card.variant} shrink-0`}
            style={{ width: 723, height: 803, borderRadius: 40 }}
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
        ))}
      </div>
    </section>
  )
}