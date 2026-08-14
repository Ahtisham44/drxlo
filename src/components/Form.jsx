import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import GlassSurface from "@/components/GlassSurface"

const ROWS = [
  {
    label: "Select what best describes your current challenge.",
    options: [
      "Our product feels outdated.",
      "Users drop off during onboarding.",
      "Customer support response times are slow.",
      "Navigation is non-intuitive.",
      "Visual design lacks modern appeal.",
    ],
    checked: 1,
  },
  {
    label: "Project Budget",
    options: ["Under $5k", "$5k–10k", "$10k–25k", "$25k+"],
    checked: 1,
  },
  {
    label: "Timeline",
    options: ["ASAP", "Within 30 days", "1–3 months", "Just exploring"],
    checked: 1,
  },
]

export default function Form() {
  return (
    <section
      id="contact"
      data-name="Section - Form"
      className="relative flex w-full shrink-0 flex-col items-start gap-12 sm:gap-16 md:gap-[120px] overflow-clip bg-white px-4 sm:px-8 md:px-[64px] py-16 sm:py-24 md:py-[96px]"
    >
      {/* <div className="pointer-events-none absolute bottom-[0.35px] left-1/2 flex h-2/6 w-full -translate-x-1/2 items-center justify-center">
        
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 0% 50%, rgba(200,240,0,1) 0%, rgba(200,240,0,0) 100%)",
            }}
          />
      </div> */}

      <h2 className="relative shrink-0 font-syne text-4xl sm:text-6xl md:text-[104px] font-extrabold leading-none tracking-[-2px] sm:tracking-[-3.5px] text-paper-dark">
        <span className="leading-none">Let's </span>
        <span className="leading-none text-drx-accent">solve</span>
        <span className="leading-none"> the right problem.</span>
      </h2>

      <div className="relative flex w-full flex-col gap-10 md:gap-[40px]">
        {ROWS.map((row) => (
          <div key={row.label} className="flex w-full flex-col items-start gap-6 md:flex-row md:items-start md:gap-[120px]">
            <div className="w-full shrink-0 font-syne text-2xl sm:text-3xl md:w-[456px] md:text-[41px] font-bold leading-none tracking-[-2px] md:tracking-[-3px] text-paper-dark">
              <p>{row.label}</p>
            </div>
            <div className="flex w-full min-w-px flex-[1_0_0] flex-col items-start">
              {row.options.map((option, i) => (
                <div
                  key={option}
                  className="flex min-h-[80px] w-full items-center gap-[24px] border-b border-paper-dark py-[16px]"
                >
                  <Checkbox defaultChecked={i === row.checked} />
                  <p className="font-syne text-xl sm:text-2xl md:text-[32px] font-medium leading-[1.3] tracking-[-1.2px] text-paper-dark">
                    {option}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex w-full flex-col items-start gap-6 md:flex-row md:items-start md:gap-[120px]">
          <div className="w-full shrink-0 font-syne text-2xl sm:text-3xl md:w-[456px] md:text-[41px] font-bold leading-none tracking-[-2px] md:tracking-[-3px] text-paper-dark">
            <p>Your email</p>
          </div>
          <div className="flex w-full min-w-px flex-[1_0_0] flex-col items-start">
            <Input type="email" placeholder="example@example.com" />
          </div>
        </div>

        <GlassSurface width="100%" height="auto" borderRadius={99} backgroundOpacity={0.06} theme="light" className="p-[0px]">
          <Button variant="cta" className="relative" size="default">
            Book Discovery Call
          </Button>
        </GlassSurface>
      </div>
    </section>
  )
}