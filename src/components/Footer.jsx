const COLUMNS = [
  {
    title: "Services",
    links: ["Product Strategy", "Product Strategy", "Product Strategy", "Product Strategy", "Product Strategy"],
  },
  {
    title: "Company",
    links: ["Product Strategy", "Product Strategy", "Product Strategy", "Product Strategy", "Product Strategy"],
  },
  {
    title: "Industries",
    links: ["Product Strategy", "Product Strategy", "Product Strategy", "Product Strategy", "Product Strategy"],
  },
  {
    title: "Contact",
    links: ["hello@drxlo.com", "Lahore, Pakistan", "Working globally."],
  },
]

export default function Footer() {
  return (
    <footer
      data-name="Footer"
      className="flex w-full shrink-0 flex-col items-center gap-[120px] overflow-clip px-[64px] pt-[96px] whitespace-nowrap text-paper-light"
    >
      <div className="flex items-start gap-[120px]">
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col items-start gap-[40px]">
            <p className="font-instrument text-[32px] italic leading-[1.3] tracking-[-1px]">
              {col.title}
            </p>
            <div className="flex flex-col items-start gap-[8px] font-geist text-[20px] font-light leading-[1.5]">
              {col.links.map((link) => (
                <p key={link}>{link}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p
        className="w-full text-center font-syne font-extrabold leading-none tracking-[-3.5px]"
        style={{
          fontSize: "clamp(80px, 24vw, 340px)",
          textShadow: "0px 4px 80px rgba(200,240,0,0.3)",
        }}
      >
        <span className="leading-none">Drx</span>
        <span className="leading-none text-drx-lime tracking-[-3.5px]">l</span>
        <span className="leading-none">o</span>
      </p>
    </footer>
  )
}