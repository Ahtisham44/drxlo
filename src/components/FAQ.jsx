import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ITEMS = [
  {
    question: "Why not hire a freelancer?",
    answer:
      "You get product strategy, design and engineering in one partner.",
  },
  {
    question: "Do you only work with startups?",
    answer:
      "No. We also work with growing B2B companies modernising existing products.",
  },
  {
    question: "Can you work with our developers?",
    answer:
      "Yes. We collaborate with internal teams or deliver the complete product.",
  },
  {
    question: "What industries do you specialise in?",
    answer:
      "SaaS, AI, Healthcare, Logistics and workflow-heavy B2B software.",
  },
  {
    question: "Do you build MVPs?",
    answer: "Yes—from discovery to production.",
  },
  {
    question: "How long does a project take?",
    answer: "Most engagements range from 2–10 weeks depending on scope.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We continue improving the product through ongoing partnership if needed.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "Every engagement is scoped individually. We work on fixed-price project basis, so you know your costs up front with no surprises.",
  },
  {
    question: "How do we get started?",
    answer:
      "Get in touch through the form below and we'll set up a call to understand your goals, then propose a roadmap within days.",
  },
]

const COLUMN_BREAK = 5

function FaqColumn({ items, start }) {
  return (
    <Accordion type="multiple" className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={item.question}
          value={`item-${start + i}`}
          className="not-last:border-b border-paper-light-3"
        >
          <AccordionTrigger className="[&>span]:ml-auto">
            <p className="font-syne text-lg sm:text-2xl md:text-[32px] font-medium leading-[1.3] tracking-[-1.2px] text-paper-dark">
              {item.question}
            </p>
          </AccordionTrigger>
          {item.answer ? (
            <AccordionContent>
              <p className="font-geist w-full max-w-[1134px] text-base sm:text-lg md:text-[20px] font-light leading-[1.5] text-[rgba(0,0,0,0.6)]">
                {item.answer}
              </p>
            </AccordionContent>
          ) : null}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default function FAQ() {
  return (
    <section
      id="faq"
      data-name="Section - FAQ"
      className="flex w-full shrink-0 flex-col items-start gap-10 sm:gap-14 md:gap-[64px] overflow-x-clip bg-white px-4 sm:px-8 md:px-[64px] py-12 sm:py-16 md:py-[64px]"
    >
      <div className="relative flex w-full shrink-0 flex-col items-start text-5xl sm:text-6xl md:text-[84px] tracking-[-2px] sm:tracking-[-3.5px] text-paper-dark whitespace-normal">
        <p className="font-syne font-extrabold leading-none">Frequently</p>
        <p className="font-instrument italic leading-none">asked questions</p>
      </div>

      <div className="grid w-full grid-cols-1 items-start gap-x-16 lg:grid-cols-2">
        <FaqColumn items={ITEMS.slice(0, COLUMN_BREAK)} start={0} />
        <FaqColumn items={ITEMS.slice(COLUMN_BREAK)} start={COLUMN_BREAK} />
      </div>
    </section>
  )
}