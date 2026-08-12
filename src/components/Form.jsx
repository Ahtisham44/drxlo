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
      data-name="Section - Form"
      className="relative flex w-full shrink-0 flex-col items-start gap-[120px] overflow-clip bg-white px-[64px] py-[96px]"
    >
      <div className="pointer-events-none absolute bottom-[0.35px] left-1/2 flex h-[436px] w-[1448px] -translate-x-1/2 items-center justify-center">
        <div className="relative h-[1448px] w-[436px] rotate-90 -scale-y-100" data-name="Section - INDUSTRIES - Light band">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(200,240,0,1) 0%, rgba(200,240,0,0) 100%)",
            }}
          />
        </div>
      </div>

      <h2 className="relative shrink-0 font-syne text-[104px] font-extrabold leading-none tracking-[-3.5px] text-paper-dark">
        <span className="leading-none">Let's </span>
        <span className="leading-none text-drx-accent">solve</span>
        <span className="leading-none"> the right problem.</span>
      </h2>

      <div className="relative flex w-full flex-col gap-[40px]">
        {ROWS.map((row) => (
          <div key={row.label} className="flex w-full items-start gap-[120px]">
            <div className="w-[456px] shrink-0 font-syne text-[41px] font-bold leading-none tracking-[-3px] text-paper-dark">
              <p>{row.label}</p>
            </div>
            <div className="flex min-w-px flex-[1_0_0] flex-col items-start">
              {row.options.map((option, i) => (
                <div
                  key={option}
                  className="flex min-h-[80px] w-full items-center gap-[24px] border-b border-paper-dark py-[16px]"
                >
                  <Checkbox defaultChecked={i === row.checked} />
                  <p className="font-syne text-[32px] font-medium leading-[1.3] tracking-[-1.2px] text-paper-dark whitespace-nowrap">
                    {option}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex w-full items-start gap-[120px]">
          <div className="w-[456px] shrink-0 font-syne text-[41px] font-bold leading-none tracking-[-3px] text-paper-dark">
            <p>Your email</p>
          </div>
          <div className="flex min-w-px flex-[1_0_0] flex-col items-start">
            <Input type="email" placeholder="example@example.com" />
          </div>
        </div>

        <GlassSurface width="100%" height="auto" borderRadius={99} backgroundOpacity={0.06}>
          <Button variant="default" className="relative">
            Book Discovery Call
          </Button>
        </GlassSurface>
      </div>
    </section>
  )
}