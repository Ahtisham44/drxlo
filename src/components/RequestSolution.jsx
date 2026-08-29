import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

const INDUSTRIES = [
  "Saas",
  "Fintech",
  "Landing page",
  "Mobile app",
  "Dashboard",
  "B2B",
  "Health",
  "Logistics",
  "Translation",
  "Analytics",
  "News & Media",
]

export default function RequestSolution() {
  const [industry, setIndustry] = useState("Saas")
  const [hasSelected, setHasSelected] = useState(false)
  const [email, setEmail] = useState("")

  const mailtoHref = `mailto:ahtisham@drxlo.com?subject=${encodeURIComponent(
    `Design request: ${industry} solutions`
  )}&body=${encodeURIComponent(
    `Hi Ahtisham,\n\nI'm looking for a ${industry} solution and would like to request a design.\n\nMy email: ${email}`
  )}`

  return (
    <section data-name="Section - Request solution" className="relative z-20 flex w-full shrink-0 flex-col items-center gap-[32px] bg-white mb-40 px-4 py-20 sm:px-8 md:py-16">
      <p className="font-syne text-[clamp(24px,4vw,56px)] tracking-[-2px] sm:tracking-[-3px] text-paper-dark text-center">
        Not find what you are looking for?
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-[32px]">
        <p className="font-syne text-[clamp(24px,4vw,56px)] font-extrabold tracking-[-2px] sm:tracking-[-3px] text-paper-dark flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span>Show me</span>
          <Select
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value)
              setHasSelected(true)
            }}
          >
            {INDUSTRIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <span>solutions</span>
        </p>
      </div>
      {hasSelected && (
        <div className="flex w-full max-w-[560px] flex-col items-center gap-[16px] pt-[16px]">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="cta" className="relative" size="default" asChild>
            <a href={mailtoHref}>Request Design</a>
          </Button>
        </div>
      )}
    </section>
  )
}
