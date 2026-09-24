import { Button } from "@/components/ui/button"

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "UI/UX Design", href: "#services" },
      { label: "Design Systems", href: "#services" },
      { label: "Full-Stack Development", href: "#services" },
      { label: "AI Solutions", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#home" },
      { label: "Our Work", href: "#work" },
      { label: "Process & Culture", href: "#why" },
      { label: "Careers", href: "#contact" },
      { label: "Press & Media", href: "#stories" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "FinTech & Banking", href: "#work" },
      { label: "Healthcare & MedTech", href: "#work" },
      { label: "SaaS & B2B Software", href: "#work" },
      { label: "AI & DeepTech", href: "#work" },
      { label: "E-Commerce & Retail", href: "#work" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@drxlo.com", href: "mailto:hello@drxlo.com" },
      { label: "Lahore, Pakistan", href: "#contact" },
      { label: "Working globally.", href: "#contact" },
    ],
    social: true,
  },
]

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/drxlo",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    ),
  },
  {
    name: "X",
    href: "https://x.com/drxlo",
    icon: (
      <path d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" />
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/drxlo",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    name: "Clutch",
    href: "https://clutch.co/profile/drxlo",
    icon: (
      <path
        d="M21 12a9 9 0 1 1-3-6.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    ),
  },
]

export default function Footer() {
  return (
    <footer
      data-name="Footer"
      className="flex w-full shrink-0 flex-col items-center gap-10 sm:gap-14 md:gap-[64px] overflow-clip bg-paper-dark px-4 sm:px-8 md:px-[64px] pt-12 sm:pt-16 md:pt-[64px] text-paper-light"
    >
      <div className="grid w-full grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4 lg:gap-x-[120px]">
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col items-start gap-[40px]">
            <h2 className="font-instrument text-2xl sm:text-3xl md:text-[32px] italic leading-[1.3] tracking-[-1px]">
              {col.title}
            </h2>
            <div className="flex flex-col items-start gap-[8px] font-geist text-base sm:text-lg md:text-[20px] font-light leading-[1.5]">
              {col.links.map(({ label, href }) => (
                <Button
                  asChild
                  key={label}
                  variant="link"
                  className="h-auto p-0 font-geist text-base sm:text-lg md:text-[20px] font-light text-paper-light no-underline hover:underline"
                >
                  <a href={href}>{label}</a>
                </Button>
              ))}
              {col.social && (
                <div className="mt-[16px] flex items-center gap-3">
                  {SOCIAL_LINKS.map(({ name, href, icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="flex size-10 items-center justify-center rounded-full border border-paper-light/20 text-paper-light transition-colors duration-300 hover:border-drx-lime hover:text-drx-lime"
                    >
                      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
                        {icon}
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="w-full text-center font-geist text-sm sm:text-base font-light text-paper-light/60">
        © 2026 Drxlo. All rights reserved.
      </p>

      <p
        className="w-full text-center font-syne font-extrabold leading-none tracking-[-3.5px]"
        style={{
          fontSize: "clamp(80px, 20vw, 300px)",
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