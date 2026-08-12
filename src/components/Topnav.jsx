import { IMG_MENU } from "@/lib/assets"
import GlassSurface from "@/components/GlassSurface"
import useScrollTheme from "@/hooks/useScrollTheme"

export default function Topnav({ menuOpen = false, onToggleMenu }) {
  const theme = useScrollTheme('dark')
  const isLight = theme === 'light'

  return (
    <div
      data-name="Topnav"
      className="sticky top-0 z-50 flex w-full items-start justify-between overflow-clip px-[48px] py-[32px]"
    >
      <GlassSurface width="auto" height="auto" borderRadius={99} backgroundOpacity={0.06} theme={theme}>
        <div className="flex items-center justify-center px-[24px] py-[16px]">
          <p className={`font-syne text-[31px] font-extrabold tracking-[-2px] transition-colors duration-300 ${isLight ? 'text-paper-dark' : 'text-[#e5e8ec]'}`}>
            <span className="leading-none">Drx</span>
            <span className={`leading-none tracking-[-2px] transition-colors duration-300 ${isLight ? 'text-drx-accent' : 'text-drx-lime'}`}>l</span>
            <span className="leading-none">o</span>
          </p>
        </div>
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
          <img
            alt="Menu"
            className={`block size-[40px] transition-[transform,filter] duration-300 ${isLight ? 'invert' : ''} ${menuOpen ? 'rotate-90' : ''}`}
            src={IMG_MENU}
          />
        </button>
      </GlassSurface>
    </div>
  )
}