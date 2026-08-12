import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"
import { IMG_WORK_1, IMG_WORK_2, IMG_WORK_3, IMG_WORK_4, IMG_WORK_5 } from "@/lib/assets"

const GRADIENT_MAGENTA =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1166 670.11' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-58.3 52.438 -65.628 -46.583 1166 -0.000055532)'><stop stop-color='rgba(240,0,188,1)' offset='0'/><stop stop-color='rgba(184,0,144,1)' offset='0.5'/><stop stop-color='rgba(127,0,100,1)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(5, 8, 10) 0%, rgb(5, 8, 10) 100%)"
const GRADIENT_GREEN =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1286 739.08' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-64.3 57.835 -72.382 -51.377 1286 -0.000061247)'><stop stop-color='rgba(0,240,152,1)' offset='0'/><stop stop-color='rgba(0,215,121,1)' offset='0.25'/><stop stop-color='rgba(0,189,91,1)' offset='0.5'/><stop stop-color='rgba(0,164,60,1)' offset='0.75'/><stop stop-color='rgba(0,138,30,1)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(5, 8, 10) 0%, rgb(5, 8, 10) 100%)"
const GRADIENT_PURPLE =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1392 800' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-69.6 62.602 -78.348 -55.612 1392 -0.000066295)'><stop stop-color='rgba(151,71,255,1)' offset='0'/><stop stop-color='rgba(113,42,206,1)' offset='0.5'/><stop stop-color='rgba(94,27,181,1)' offset='0.75'/><stop stop-color='rgba(75,12,156,1)' offset='1'/></radialGradient></defs></svg>\")"
const GRADIENT_SKY =
  "linear-gradient(180deg, #38bdf8 0%, #0284c7 55%, #0c4a6e 100%)"
const GRADIENT_SUNSET =
  "linear-gradient(180deg, #fb923c 0%, #f43f5e 55%, #7f1d1d 100%)"

// Add a new card to the stack by appending an object here.
// image:            drop the file in public/assets and point to it (e.g. "/assets/work-6.png")
// fallbackGradient: shown only until the image is added — delete once images are in
// ratio:            aspect-ratio (width / height); used to size the card
// offset:           horizontal staircase offset in px
// Width is vw-based (grows with the screen) but capped so the card height
// stays <= ~58vh — keeps the stacked layers visible like the ReactBits demo.
const WORK_ITEMS = [
  {
    id: "magenta",
    title: "Saved 40% business cost",
    highlight: "40%",
    image: IMG_WORK_1,
    fallbackGradient: GRADIENT_MAGENTA,
    ratio: 1.74,
    offset: 128,
    label: "Finance",
  },
  {
    id: "green",
    title: "Saved 40% business cost",
    highlight: "40%",
    image: IMG_WORK_2,
    fallbackGradient: GRADIENT_GREEN,
    ratio: 1.74,
    offset: 104,
    label: "Verification",
  },
  {
    id: "purple",
    title: "Saved 40% business cost",
    highlight: "40%",
    image: IMG_WORK_3,
    fallbackGradient: GRADIENT_PURPLE,
    ratio: 1.74,
    offset: 80,
    label: "Expenses",
  },
  {
    id: "sky",
    title: "Saved 40% business cost",
    highlight: "40%",
    image: IMG_WORK_4,
    fallbackGradient: GRADIENT_SKY,
    ratio: 1.74,
    offset: 56,
    label: "Products",
  },
  {
    id: "sunset",
    title: "Saved 40% business cost",
    highlight: "40%",
    image: IMG_WORK_5,
    fallbackGradient: GRADIENT_SUNSET,
    ratio: 1.74,
    offset: 32,
    label: "Platform",
  },
]

function WorkCard({ item }) {
  const [before, after] = item.highlight
    ? item.title.split(item.highlight)
    : [item.title, ""]

  return (
    <ScrollStackItem
      itemClassName="overflow-hidden rounded-[40px] border-4 border-[rgba(255,255,255,0.1)] box-border"
      itemStyle={{
        width: "90vw",
        height: "90vh",
        marginInline: "auto",
      }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: item.fallbackGradient }} />
      <img alt="" src={item.image} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-start justify-between p-[clamp(24px,3vw,40px)]">
        <p className="font-syne text-[clamp(28px,3.5vw,56px)] tracking-[-2px] text-white whitespace-nowrap">
          <span className="leading-[1.3]">{before}</span>
          {item.highlight && (
            <span className="font-instrument italic leading-[1.3]">{item.highlight}</span>
          )}
          <span className="leading-[1.3]">{after}</span>
        </p>
        {item.label && (
          <p className="font-syne text-[clamp(16px,1.6vw,24px)] font-semibold tracking-[0.2em] uppercase text-white/80 whitespace-nowrap">
            {item.label}
          </p>
        )}
      </div>
    </ScrollStackItem>
  )
}

export default function Work() {
  return (
<section id="work" data-name="Section - work" className="w-full shrink-0 bg-white">
      <div className="relative w-full">
        <ScrollStack
          useWindowScroll
          className="w-full"
          itemDistance={6}
          itemStackDistance={60}
          stackPosition="22%"
          scaleEndPosition="4%"
          baseScale={0.6}
          itemScale={0.035}
        >
          {WORK_ITEMS.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </ScrollStack>
      </div>

      <div className="flex flex-col items-center gap-[32px] px-[64px] py-[120px]">
        <p className="font-syne text-[clamp(32px,4vw,56px)] tracking-[-3px] text-paper-dark whitespace-nowrap">
          Not find what you are looking for?
        </p>
        <div className="flex items-center gap-[32px]">
          <p className="font-syne text-[clamp(32px,4vw,56px)] text-paper-dark">⌄</p>
          <p className="font-syne text-[clamp(32px,4vw,56px)] font-bold tracking-[-3px] text-paper-dark whitespace-nowrap">
            Show me <span className="underline">Saas</span> solutions
          </p>
        </div>
      </div>
    </section>
  )
}