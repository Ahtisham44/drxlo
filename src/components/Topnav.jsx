import { IMG_MENU } from "@/lib/assets"
import GlassSurface from "@/components/GlassSurface"

export default function Topnav() {
  return (
    <div
      data-name="Topnav"
      className="sticky top-0 z-50 flex w-full items-start justify-between overflow-clip px-[48px] py-[32px]"
    >
      <GlassSurface width="auto" height="auto" borderRadius={99} backgroundOpacity={0.06}>
        <div className="flex items-center justify-center px-[24px] py-[16px]">
          <p className="font-syne text-[31px] font-extrabold tracking-[-2px] text-[#e5e8ec]">
            <span className="leading-none">Drx</span>
            <span className="leading-none text-drx-lime tracking-[-2px]">l</span>
            <span className="leading-none">o</span>
          </p>
        </div>
      </GlassSurface>
      <GlassSurface width="auto" height="auto" borderRadius={99} backgroundOpacity={0.06}>
        <div className="flex items-center justify-center p-[12px]">
          <img alt="Menu" className="block size-[40px]" src={IMG_MENU} />
        </div>
      </GlassSurface>
    </div>
  )
}