import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ITEMS = [
  {
    question: "Will my website be optimized for SEO?",
    answer:
      "Yes! We ensure that every website we build follows SEO best practices, including fast loading speeds, mobile responsiveness, clean code, and proper meta tags. If you need ongoing SEO services, we also offer additional optimization plans to help improve your rankings.",
  },
  {
    question: "Do you offer custom design, or do you use templates?",
    answer:
      "We create fully custom designs tailored to your brand and business goals. Every project starts from scratch with a unique design system built specifically for your needs.",
  },
  {
    question: "Will my website be mobile-friendly and optimized for SEO?",
    answer:
      "Absolutely. All our websites are built with a mobile-first approach and fully responsive design, ensuring they look and perform great on every device.",
  },
  {
    question: "Can I update my website myself after it's launched?",
    answer:
      "Yes! We build our sites with user-friendly content management systems, so you can easily update text, images, and pages without needing technical knowledge.",
  },
  {
    question: "What is included in the maintenance and support services?",
    answer:
      "Our maintenance plans include regular updates, security monitoring, performance optimization, bug fixes, and priority support to keep your site running smoothly.",
  },
]

export default function FAQ() {
  return (
    <section
      data-name="Section - FAQ"
      className="flex w-full shrink-0 flex-col items-start overflow-x-clip bg-white px-[64px] py-[96px]"
    >
      <Accordion type="multiple" className="w-full">
        {ITEMS.map((item, i) => (
          <AccordionItem
            key={item.question}
            value={`item-${i}`}
            className="not-last:border-b border-paper-light-3"
          >
            <AccordionTrigger className="[&>span]:ml-auto">
              <p className="font-syne text-[32px] font-medium leading-[1.3] tracking-[-1.2px] text-paper-dark whitespace-nowrap">
                {item.question}
              </p>
            </AccordionTrigger>
            {item.answer ? (
              <AccordionContent>
                <p className="font-geist w-[1134px] text-[20px] font-light leading-[1.5] text-[rgba(0,0,0,0.6)]">
                  {item.answer}
                </p>
              </AccordionContent>
            ) : null}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}