import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import GlassSurface from "@/components/GlassSurface"

const CHALLENGES = [
  "Our product feels outdated.",
  "Users drop off during onboarding.",
  "Conversion isn't improving.",
  "We need an MVP designed and built.",
  "We're replacing manual workflows.",
  "We need a UX audit.",
  "We want AI integrated into our product.",
  "Our design and development are constantly out of sync.",
  "We need a scalable design system.",
  "We're not sure what to build next.",
  "Have specific problem in mind? write here",
]

const CUSTOM_INDEX = CHALLENGES.length - 1

const ROWS = [
  {
    label: "Select what best describes your current challenge.",
    options: CHALLENGES,
    key: "challenges",
    multi: true,
  },
  {
    label: "Project Budget",
    options: ["Under $5k", "$5k–10k", "$10k–25k", "$25k+"],
    key: "budget",
    checked: 1,
  },
  {
    label: "Timeline",
    options: ["ASAP", "Within 30 days", "1–3 months", "Just exploring"],
    key: "timeline",
    checked: 1,
  },
]

export default function Form() {
  const [selected, setSelected] = useState({ budget: 1, timeline: 1 })
  const [customActive, setCustomActive] = useState(false)
  const [customValue, setCustomValue] = useState("")
  const [email, setEmail] = useState("")

  const toggleMulti = (rowKey, i) =>
    setSelected((prev) => ({ ...prev, [`${rowKey}-${i}`]: !prev[`${rowKey}-${i}`] }))

  const toggleSingle = (rowKey, i) =>
    setSelected((prev) => ({ ...prev, [rowKey]: prev[rowKey] === i ? null : i }))

  const selectedChallenges = CHALLENGES.filter((_, i) => selected[`challenges-${i}`])
  const budget = ROWS[1].options[selected.budget]
  const timeline = ROWS[2].options[selected.timeline]

  const notes = [
    ...(selectedChallenges.length
      ? ["Selected challenges:", ...selectedChallenges.map((c) => `- ${c}`)]
      : []),
    customValue ? `Specific problem: ${customValue}` : "",
    `Project Budget: ${budget || "Not selected"}`,
    `Timeline: ${timeline || "Not selected"}`,
  ]
    .filter(Boolean)
    .join("\n")

  const params = new URLSearchParams()
  if (email) params.set("email", email)
  if (notes) params.set("notes", notes)

  const bookingHref = `https://cal.com/ahtisham-jilani${params.toString() ? `?${params.toString()}` : ""}`

  return (
    <section
      id="contact"
      data-name="Section - Form"
      className="relative flex w-full shrink-0 flex-col items-start gap-10 sm:gap-12 md:gap-[64px] overflow-clip bg-white px-4 sm:px-8 md:px-[64px] py-12 sm:py-16 md:py-[64px]"
    >
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
              {row.multi
                ? row.options.map((option, i) => {
                    const isCustom = i === CUSTOM_INDEX
                    const active = isCustom && customActive
                    const clickable = !isCustom || !active
                    return (
                      <div
                        key={option}
                        onClick={
                          isCustom
                            ? !active
                              ? () => setCustomActive(true)
                              : undefined
                            : () => toggleMulti(row.key, i)
                        }
                        className={`flex min-h-[80px] w-full items-center gap-[24px] border-b border-paper-dark py-[16px] ${
                          clickable ? "cursor-pointer select-none" : ""
                        }`}
                      >
                        {!isCustom && (
                          <Checkbox
                            checked={!!selected[`${row.key}-${i}`]}
                            onCheckedChange={() => toggleMulti(row.key, i)}
                            className="pointer-events-none"
                          />
                        )}
                        {active ? (
                          <Input
                            autoFocus
                            type="text"
                            value={customValue}
                            onChange={(e) => setCustomValue(e.target.value)}
                            placeholder="Describe your specific problem…"
                            className="min-h-0 rounded-none border-0 bg-transparent px-0 font-syne text-xl sm:text-2xl md:text-[32px] font-medium leading-[1.3] tracking-[-1.2px] text-paper-dark shadow-none placeholder:text-[#c6c6c6] focus-visible:ring-0"
                          />
                        ) : (
                          <p className={`font-syne text-xl sm:text-2xl md:text-[32px] font-medium leading-[1.3] tracking-[-1.2px] text-paper-dark ${
                              isCustom && !active ? "underline-offset-8 hover:underline" : ""
                            }`}>
                            {option}
                          </p>
                        )}
                      </div>
                    )
                  })
                : row.options.map((option, i) => (
                    <div
                      key={option}
                      onClick={() => toggleSingle(row.key, i)}
                      className="flex min-h-[80px] w-full cursor-pointer select-none items-center gap-[24px] border-b border-paper-dark py-[16px]"
                    >
                      <Checkbox
                        checked={selected[row.key] === i}
                        onCheckedChange={() => toggleSingle(row.key, i)}
                        className="pointer-events-none"
                      />
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
            <Input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <GlassSurface width="100%" height="auto" borderRadius={99} backgroundOpacity={0.06} theme="light" className="p-[0px]">
          <Button variant="cta" className="relative" size="default" asChild>
            <a href={bookingHref} target="_blank" rel="noopener noreferrer">Book Discovery Call</a>
          </Button>
        </GlassSurface>
      </div>
    </section>
  )
}