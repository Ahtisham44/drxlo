import { IMG_MENU } from "@/lib/assets"
import { X } from "lucide-react"
import GlassSurface from "@/components/GlassSurface"
import useScrollTheme from "@/hooks/useScrollTheme"

export default function Topnav({ menuOpen = false, onToggleMenu }) {
  const theme = useScrollTheme('dark')
  const isLight = theme === 'light'

  return (
    <div
      data-name="Topnav"
      className="sticky top-0 z-50 flex w-full items-start justify-between overflow-clip px-6 sm:px-12 py-6 sm:py-8"
    >
      <GlassSurface width="auto" height="auto" borderRadius={99} backgroundOpacity={0.06} theme={theme}>
        <a href="#home" className="flex items-center justify-center px-[16px] py-[8px]">
          <p className={`font-syne text-[31px] font-extrabold tracking-[-2px] transition-colors duration-300 ${isLight ? 'text-paper-dark' : 'text-[#e5e8ec]'}`}>
            <span className="leading-none">Drx</span>
            <span className={`leading-none tracking-[-2px] transition-colors duration-300 ${isLight ? 'text-drx-accent' : 'text-drx-lime'}`}>l</span>
            <span className="leading-none">o</span>
          </p>
        </a>
      </GlassSurface>
      <GlassSurface width="auto" height="auto" borderRadius={99} backgroundOpacity={0.06} theme={theme}>
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="bubble-menu"
          className="flex cursor-pointer items-center justify-center border-none bg-transparent p-[12px]"
        >
          <span className="relative block size-[32px] transition-[transform] duration-300">
            <img
              alt="Menu"
              className={`block size-[32px] transition-[transform,filter] duration-300 ${isLight ? 'invert' : ''} ${menuOpen ? 'rotate-90 scale-0' : ''}`}
              src={IMG_MENU}
            />
            <X
              strokeWidth={1.5}
              className={`absolute inset-0 size-[32px] text-white transition-[transform,opacity] duration-300 ${isLight ? 'text-paper-dark' : ''} ${menuOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
            />
          </span>
        </button>
      </GlassSurface>
    </div>
  )
}