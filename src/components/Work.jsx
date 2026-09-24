import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"
import { IMG_WORK_1, IMG_WORK_2, IMG_WORK_3, IMG_WORK_4, IMG_WORK_5 } from "@/lib/assets"

const GRADIENT_WARM_MESH =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1166 670.11' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-58.3 52.438 -65.628 -46.583 1166 -0.000055532)'><stop stop-color='rgba(255,235,220,1)' offset='0'/><stop stop-color='rgba(252,200,175,1)' offset='0.35'/><stop stop-color='rgba(245,165,185,1)' offset='0.65'/><stop stop-color='rgba(215,185,225,1)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(252, 220, 200) 0%, rgb(232, 196, 210) 100%)"
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
    ratio: 1.74,
    offset: 128,
    label: "Finance",
  },
  {
    id: "green",    
    image: IMG_WORK_2,
    backgroundColor: "#FAFAFA",
    ratio: 1.74,
    offset: 104,
    label: "Verification",
    darkText: true,
  },
  {
    id: "purple",    
    image: IMG_WORK_3,
    fallbackGradient: GRADIENT_WARM_MESH,
    ratio: 1.74,
    offset: 80,
    label: "Expenses",
  },
  {
    id: "sky",    
    image: IMG_WORK_4,
    fallbackGradient: GRADIENT_SKY,
    ratio: 1.74,
    offset: 56,
    label: "Products",
  },
  {
    id: "sunset",    
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
      itemClassName="rounded-[46px] border border-black/20 p-[6px] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_25px_60px_rgba(0,0,0,0.5)]"
      itemStyle={{
        width: "96vw",
        height: "56rem",
        marginInline: "auto",
      }}
    >
      <div className="relative size-full overflow-hidden rounded-[40px] border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_0_-1px_0_0_rgba(255,255,255,0.2)]">
        <div className="absolute inset-0" style={{ backgroundImage: item.fallbackGradient, backgroundColor: item.backgroundColor }} />
        <img
          alt=""
          src={item.image}
          loading="lazy"
          decoding="async"
          className={
            item.id === "purple"
              ? "absolute inset-0 w-full object-cover"
              : "absolute inset-0 size-full object-cover"
          }
        />
        <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${item.darkText ? "from-black/10" : "from-black/40"} to-transparent`} />
        <div className="absolute inset-0 flex items-start justify-between p-[clamp(24px,3vw,40px)]">
          <h3 className={`font-syne font-bold text-[clamp(28px,3.5vw,56px)] tracking-[-2px] ${item.darkText ? "text-neutral-900" : "text-white"}`}>
            <span className="leading-[1.3]">{before}</span>
            {item.highlight && (
              <span className="font-instrument italic leading-[1.3]">{item.highlight}</span>
            )}
            <span className="leading-[1.3]">{after}</span>
          </h3>        
        </div>
      </div>
    </ScrollStackItem>
  )
}

export default function Work() {
  return (
    <section id="work" data-name="Section - work" className="w-full shrink-0">
      <h2 className="sr-only">Selected work</h2>
      <div className="relative w-full">
        <ScrollStack
          useWindowScroll
          className="w-full"
          itemDistance={6}
          itemStackDistance={20}
          stackPosition="5%"
          scaleStartPosition="80%"
          scaleEndPosition="0%"
          baseScale={0.8}
          itemScale={0.035}
          blurAmount={0}
        >
          {WORK_ITEMS.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}