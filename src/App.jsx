import { Button } from "@/components/ui/button"
import GlassSurface from "@/components/GlassSurface"
import Topnav from "@/components/Topnav"
import Services from "@/components/Services"
import FAQ from "@/components/FAQ"
import Form from "@/components/Form"
import Footer from "@/components/Footer"
import {
  IMG_FINGER,
  IMG_PARTNERS,
  IMG_TEST_MAIN,
  IMG_TEST_MID_A,
  IMG_TEST_MID_B,
  IMG_TEST_SMALL,
  IMG_VECTOR_1,
  IMG_VECTOR_2,
  IMG_VECTOR_3,
  IMG_WHATSAPP,
  IMG_WHY_52,
  IMG_WHY_53,
} from "@/lib/assets"

const GRADIENT_MAGENTA =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1166 670.11' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-58.3 52.438 -65.628 -46.583 1166 -0.000055532)'><stop stop-color='rgba(240,0,188,1)' offset='0'/><stop stop-color='rgba(184,0,144,1)' offset='0.5'/><stop stop-color='rgba(127,0,100,1)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(5, 8, 10) 0%, rgb(5, 8, 10) 100%)"
const GRADIENT_GREEN =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1286 739.08' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-64.3 57.835 -72.382 -51.377 1286 -0.000061247)'><stop stop-color='rgba(0,240,152,1)' offset='0'/><stop stop-color='rgba(0,215,121,1)' offset='0.25'/><stop stop-color='rgba(0,189,91,1)' offset='0.5'/><stop stop-color='rgba(0,164,60,1)' offset='0.75'/><stop stop-color='rgba(0,138,30,1)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(5, 8, 10) 0%, rgb(5, 8, 10) 100%)"
const GRADIENT_PURPLE =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1392 800' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-69.6 62.602 -78.348 -55.612 1392 -0.000066295)'><stop stop-color='rgba(151,71,255,1)' offset='0'/><stop stop-color='rgba(113,42,206,1)' offset='0.5'/><stop stop-color='rgba(94,27,181,1)' offset='0.75'/><stop stop-color='rgba(75,12,156,1)' offset='1'/></radialGradient></defs></svg>\")"

const STATS = [
  "15+ products delivered",
  "10+ industries",
  "40% admin workload reduction",
  "90% fewer backend requests",
]

const PROBLEMS = [
  {
    serif: "Your product works well,",
    syne: "but users don't understand it ?",
    align: "end",
  },
  { serif: "Users sign up happily", syne: "then disappear?", align: "start" },
  { serif: "Traffic is growing", syne: "Revenue isn't?", align: "end" },
  {
    serif: "Your team keeps building features",
    syne: "but nobody uses?",
    align: "start",
  },
  { syneLines: ["Design and development ", "constantly misalign?"], align: "center" },
  { syneLines: ["Manual processes ", "waste hours every week?"], align: "center" },
]

const TESTIMONIAL_QUOTE =
  "Working with this team was fantastic! They revamped my website to be sleek, modern, and fully functional. Great communication and timely delivery—highly recommend for boosting your online presence!"

function App() {
  return (
    <div
      data-name="Html → Body"
      className="relative flex w-full flex-col items-start bg-paper-dark"
    >
      <Topnav />

      {/* ===== Hero ===== */}
      <section
        data-name="Section - HERO - Marquee Hero macrostructure"
        className="relative flex w-full shrink-0 flex-col items-start overflow-clip px-[64px] pb-[120px] pt-[64px]"
      >
        <div className="absolute left-[40px] top-[0px]">
          <div className="absolute left-[852.48px] top-[480px] h-[894.578px] w-[839.524px]">
            <img alt="" src={IMG_VECTOR_3} className="block size-full max-w-none" />
          </div>
          <div className="absolute left-[721.04px] top-[548.48px] h-[894.578px] w-[839.524px]">
            <img alt="" src={IMG_VECTOR_2} className="block size-full max-w-none" />
          </div>
          <div className="absolute left-[599px] top-[611.42px] h-[894.578px] w-[839.524px]">
            <img alt="" src={IMG_VECTOR_1} className="block size-full max-w-none" />
          </div>
        </div>

        <div className="relative flex w-full shrink-0 flex-col items-center">
          <div className="relative flex shrink-0 flex-col items-center gap-[0.25px] pb-[1.5px] text-center tracking-[-3.5px] whitespace-nowrap">
            <div className="flex shrink-0 flex-col justify-center font-syne text-[104px] font-extrabold text-[#e5e8ec]">
              <p className="mb-0 leading-none">We design</p>
              <p className="leading-none">products that</p>
            </div>
            <div className="flex shrink-0 flex-col justify-center font-instrument text-[120px] italic text-drx-lime">
              <p className="leading-none">move businesses forward.</p>
            </div>
          </div>

          <div className="relative flex w-full shrink-0 items-center justify-center pt-[64px]">
            <div className="flex shrink-0 items-start gap-[16px]">
              <GlassSurface width="auto" height="auto" borderRadius={99} backgroundOpacity={0.06}>
                <Button variant="lime">Book Free Audit</Button>
              </GlassSurface>
              <GlassSurface width="auto" height="auto" borderRadius={99} backgroundOpacity={0.06}>
                <Button variant="default">
                  <img alt="" src={IMG_WHATSAPP} />
                  Chat on Whatsapp
                </Button>
              </GlassSurface>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[64px] right-[64px] flex flex-col items-center">
          <div className="h-[56px] w-px bg-gradient-to-b from-drx-accent to-[rgba(255,77,28,0)]" />
        </div>

        <div className="relative flex flex-1 items-end pt-64">
          <div className="flex shrink-0 flex-col justify-center font-instrument text-[52px] text-white tracking-[-1px] whitespace-nowrap">
            {STATS.map((stat, i) => (
              <p key={stat} className={`leading-[1.3] ${i === STATS.length - 1 ? "" : "mb-0"}`}>
                {stat}
              </p>
            ))}
          </div>
        </div>

        {/* ===== Trusted by partners ===== */}
        <div className="relative shrink-0 text-paper-light whitespace-nowrap pt-48">
          <p className="font-syne text-[49px] font-bold leading-none tracking-[-3px]">Trusted by</p>
          <p className="font-syne text-[84px] font-extrabold leading-none tracking-[-3.5px]">28 partners</p>
        </div>
        <div className="relative h-[273.348px] w-[1758px] shrink-0">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              alt="Partners screenshot"
              src={IMG_PARTNERS}
              className="absolute left-[-3.89%] top-[-339.29%] h-[454.31%] w-[121.84%] max-w-none"
            />
          </div>
        </div>
      </section>

      {/* ===== Trusted by partners ===== */}
      <section
        data-name="Section - Trusted by partners"
        className="flex w-full shrink-0 flex-col items-start gap-[40px] overflow-clip px-[64px] pb-[120px] pt-[96px]"
      >
        <div className="relative shrink-0 text-paper-light whitespace-nowrap">
          <p className="font-syne text-[49px] font-bold leading-none tracking-[-3px]">Trusted by</p>
          <p className="font-syne text-[84px] font-extrabold leading-none tracking-[-3.5px]">28 partners</p>
        </div>
        <div className="relative h-[273.348px] w-[1758px] shrink-0">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              alt="Partners screenshot"
              src={IMG_PARTNERS}
              className="absolute left-[-3.89%] top-[-339.29%] h-[454.31%] w-[121.84%] max-w-none"
            />
          </div>
        </div>
      </section>

      {/* ===== Problems ===== */}
      <section
        data-name="Section - Problems"
        className="flex w-full shrink-0 flex-col items-end gap-[200px] overflow-clip bg-white px-[64px] py-[96px]"
      >
        <div className="relative flex w-full flex-col items-end gap-[120px]">
          {PROBLEMS.map((p) => {
            const isCenter = p.align === "center"
            const isStart = p.align === "start"
            return (
              <div
                key={p.syne || p.syneLines?.[0]}
                className={`relative flex shrink-0 flex-col items-start gap-[0.25px] pb-[1.5px] whitespace-nowrap ${isStart ? "w-full" : isCenter ? "w-full text-center" : ""}`}
                style={{ justifyContent: isStart ? "flex-start" : isCenter ? "center" : "flex-start" }}
              >
                {p.syneLines ? (
                  <div className={`flex shrink-0 flex-col justify-center font-syne text-[39px] font-bold leading-none tracking-[-2px] text-center text-paper-dark ${isCenter ? "w-full" : ""}`}>
                    {p.syneLines.map((line) => (
                      <p key={line} className="leading-none">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className={`font-instrument text-[52px] text-drx-accent tracking-[-1px] ${isStart ? "w-full" : ""}`}>
                      {p.serif}
                    </p>
                    <p className={`font-syne text-[39px] font-bold leading-none text-center tracking-[-2px] text-paper-dark ${isStart ? "w-full" : ""}`}>
                      {p.syne}
                    </p>
                  </>
                )}
              </div>
            )
          })}
        </div>

        <p className="w-full shrink-0 text-center font-syne text-[104px] font-extrabold leading-none tracking-[-3.5px] text-paper-dark">
          Sound familiar? you're not alone.
        </p>

        <p className="w-full shrink-0 text-center font-syne text-[104px] font-extrabold leading-none tracking-[-3.5px]">
          <span className="font-instrument text-[84px] italic tracking-[-3.5px] text-paper-dark">If you're experiencing any of these,</span>{" "}
          <span className="text-drx-accent">Drxlo</span>{" "}
          <span className="text-paper-dark">already solved it.</span>
        </p>
      </section>

      {/* ===== Work ===== */}
      <section data-name="Section - work" className="relative h-[1530px] w-full shrink-0 overflow-clip bg-white">
        <div
          className="absolute left-[137px] top-[26.34px] flex h-[670.115px] w-[1166px] flex-col items-start gap-[67.011px] overflow-clip rounded-[65.506px] border-4 border-[rgba(255,255,255,0.1)] p-[36.856px]"
          style={{ backgroundImage: GRADIENT_MAGENTA }}
        >
          <div className="relative flex shrink-0 items-end">
            <p className="font-syne text-[46.908px] tracking-[-1.6753px] text-white whitespace-nowrap">
              <span className="leading-[1.3]">Saved </span>
              <span className="font-instrument italic leading-[1.3]">40%</span>
              <span className="leading-[1.3]"> business cost </span>
            </p>
          </div>
          <div className="absolute left-[312.63px] top-[187.82px] h-[529.391px] w-[859.422px] rounded-[17.456px] border-[0.873px] border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.1)] shadow-[17.456px_3.491px_20.947px_0px_rgba(0,0,0,0.25)]" />
        </div>

        <div
          className="absolute left-[77px] top-[62.8px] flex h-[739.081px] w-[1286px] flex-col items-start gap-[73.908px] overflow-clip rounded-[68.954px] border-4 border-[rgba(255,255,255,0.1)] p-[40.649px]"
          style={{ backgroundImage: GRADIENT_GREEN }}
        >
          <div className="relative flex shrink-0 items-end">
            <p className="font-syne text-[51.736px] tracking-[-1.8477px] text-white whitespace-nowrap">
              <span className="leading-[1.3]">Saved </span>
              <span className="font-instrument italic leading-[1.3]">40%</span>
              <span className="leading-[1.3]"> business cost </span>
            </p>
          </div>
          <div className="absolute left-[345.22px] top-[207.56px] h-[583.874px] w-[947.871px] rounded-[19.252px] border-[0.963px] border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.1)] shadow-[19.252px_3.85px_23.103px_0px_rgba(0,0,0,0.25)]" />
        </div>

        <div
          className="absolute left-[24px] right-[24px] top-[109.89px] flex h-[800px] flex-col items-start gap-[80px] overflow-clip rounded-[64px] border-4 border-[rgba(255,255,255,0.1)] p-[44px]"
          style={{ backgroundImage: GRADIENT_PURPLE }}
        >
          <div className="relative flex shrink-0 items-end">
            <p className="font-syne text-[56px] tracking-[-2px] text-white whitespace-nowrap">
              <span className="leading-[1.3]">Saved </span>
              <span className="font-instrument italic leading-[1.3]">40%</span>
              <span className="leading-[1.3]"> business cost </span>
            </p>
          </div>
          <div className="absolute left-[410px] top-[187.11px] h-[564px] w-[916px] rounded-[19.252px] border-[0.963px] border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.06)] shadow-[0px_3.85px_40px_16px_rgba(0,0,0,0.25)]" />
          <div className="absolute left-[296px] top-[277.11px] h-[564px] w-[314px] rounded-[19.252px] border-[0.963px] border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.06)] shadow-[0px_3.85px_40px_16px_rgba(0,0,0,0.25)]" />
        </div>

        <p className="absolute left-[calc(50%-621px)] top-[1098.5px] -translate-y-1/2 font-syne text-[56px] tracking-[-3px] text-paper-dark whitespace-nowrap">
          Not find what you are looking for?
        </p>
        <p className="absolute left-[calc(50%+167px)] top-[1281.5px] -translate-y-1/2 font-syne text-[56px] font-bold tracking-[-3px] text-paper-dark whitespace-nowrap">
          ⌄
        </p>
        <div className="absolute left-[calc(50%-56px)] top-[1250px] -translate-y-1/2 font-syne text-[56px] tracking-[-3px] text-paper-dark whitespace-nowrap">
          <p className="mb-0 font-extrabold leading-[1.3] whitespace-pre">Show me </p>
          <p className="font-extrabold whitespace-pre">
            <span className="leading-[1.3] underline">Saas</span>
            <span className="leading-[1.3]">    solutions</span>
          </p>
        </div>
      </section>

      {/* ===== Services ===== */}
      <Services />

      {/* ===== Why ===== */}
      <section
        data-name="Section - Why"
        className="flex w-full shrink-0 flex-col items-start gap-48 overflow-clip bg-drx-accent px-[64px] py-[96px]"
      >
        <div className="relative shrink-0 text-[84px] tracking-[-3.5px] whitespace-nowrap">
          <p className="font-instrument italic leading-none text-paper-dark">What makes</p>
          <p className="font-syne font-extrabold leading-none text-white">Drxlo Unique</p>
        </div>

        <div className="relative grid h-auto w-full shrink-0 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] gap-x-[8px] gap-y-[8px] rounded-2xl">
          <div className="relative col-[1/span_2] row-[1/span_2] flex shrink-0 flex-col items-start gap-[32px] self-stretch justify-self-stretch overflow-clip rounded-[24px] p-[48px]">
            <div className="absolute inset-[-0.35px_0_0.35px_0] rounded-[56px]">
              <div className="absolute inset-0 rounded-[56px] bg-[#ccc] mix-blend-color-burn opacity-67" />
              <div
                className="absolute inset-0 rounded-[56px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)",
                }}
              />
            </div>
            <p className="relative shrink-0 font-mont text-[40px] font-semibold leading-[1.3] tracking-[-0.8px] text-white">
              Evaluate your expenses against possible savings.
            </p>
            <div className="absolute left-1/2 top-[427.65px] h-[384px] w-[516px] -translate-x-1/2 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.4)]">
              <img alt="" src={IMG_WHY_52} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
            </div>
          </div>

          <div className="relative col-3 row-1 flex shrink-0 flex-col items-start justify-center self-stretch justify-self-stretch overflow-clip rounded-[56px] bg-white p-[32px]">
            <p className="relative shrink-0 w-[238px] font-mont text-[40px] leading-none tracking-[-2.4px] text-paper-dark uppercase whitespace-pre-wrap">
              <span className="leading-[1.3]">Your Finance, </span>
              <span className="leading-[1.3]">Our Headache</span>
            </p>
          </div>

          <div className="relative col-4 row-1 flex shrink-0 flex-col items-start justify-between self-stretch justify-self-stretch overflow-clip rounded-[24px] p-[32px]">
            <div className="absolute inset-[-0.35px_0_0.35px_0] rounded-[56px]">
              <div className="absolute inset-0 rounded-[56px] bg-[#ccc] mix-blend-color-burn opacity-67" />
              <div
                className="absolute inset-0 rounded-[56px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)",
                }}
              />
            </div>
            <div className="relative size-[96px] overflow-clip">
              <img alt="" src={IMG_FINGER} className="block size-full max-w-none" />
            </div>
            <p className="relative shrink-0 font-mont text-[32px] font-semibold leading-[1.3] tracking-[-0.64px] text-white">
              Verification on the go
            </p>
          </div>

          <div className="relative col-[3/span_2] row-2 flex shrink-0 flex-col items-start gap-[32px] justify-center self-stretch justify-self-stretch overflow-clip rounded-[24px] p-[32px]">
            <div className="absolute inset-[-0.35px_0_0.35px_0] rounded-[56px]">
              <div className="absolute inset-0 rounded-[56px] bg-[#ccc] mix-blend-color-burn opacity-67" />
              <div
                className="absolute inset-0 rounded-[56px]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)",
                }}
              />
            </div>
            <p className="relative shrink-0 font-mont text-[32px] font-semibold leading-none tracking-[-0.64px] text-white whitespace-nowrap">
              <span className="leading-[1.3] whitespace-pre">Collective </span>
              <span className="leading-[1.3] whitespace-pre">expenses</span>
              <span className="leading-[1.3] whitespace-pre">under 1 roof</span>
            </p>
            <div className="absolute left-[calc(50%+186.5px)] top-[calc(50%+1px)] h-[217px] w-[401px] -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.4)]">
              <img alt="" src={IMG_WHY_53} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section
        data-name="Section - Testimonials"
        className="relative flex h-[1180px] w-full shrink-0 flex-col items-center gap-[120px] overflow-clip px-[64px] pb-[120px] pt-[96px]"
      >
        <div className="absolute left-[270.85px] top-[371.19px] flex w-[679.145px] shrink-0 flex-col items-start gap-[82.991px] overflow-clip rounded-[44.262px] border-[5.533px] border-[rgba(255,255,255,0.1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]">
          <div className="relative h-[589.929px] w-[687.444px] shrink-0 rounded-[11.065px]">
            <img alt="" src={IMG_TEST_SMALL} className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[11.065px] object-cover" />
          </div>
          <div className="absolute left-[calc(50%-97.51px)] top-[calc(50%+188.46px)] flex w-[409.423px] max-w-[553.2749633789062px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-[27.664px]">
            <div className="flex shrink-0 flex-col items-start">
              <p className="shrink-0 font-syne text-[22.131px] font-bold leading-[1.3] tracking-[-1.3832px] text-center text-white whitespace-nowrap">Emily Thompson</p>
              <p className="shrink-0 font-geist text-[11.065px] leading-[1.5] text-[rgba(255,255,255,0.4)]">BrandLite GmbH</p>
            </div>
            <p className="shrink-0 font-geist text-[13.832px] font-light leading-[1.5] text-paper-light">{TESTIMONIAL_QUOTE}</p>
          </div>
        </div>

        <div className="absolute left-[303px] top-[301.82px] flex w-[838.855px] shrink-0 flex-col items-start gap-[102.508px] overflow-clip rounded-[54.671px] border-[6.834px] border-[rgba(255,255,255,0.1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]">
          <div className="relative h-[728.659px] w-[849.106px] shrink-0 rounded-[13.668px]">
            <img alt="" src={IMG_TEST_MID_A} className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[13.668px] object-cover" />
          </div>
          <div className="absolute left-[calc(50%-120.45px)] top-[calc(50%+232.78px)] flex w-[505.705px] max-w-[683.3848876953125px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-[34.169px]">
            <div className="flex shrink-0 flex-col items-start">
              <p className="shrink-0 font-syne text-[27.335px] font-bold leading-[1.3] tracking-[-1.7085px] text-center text-white whitespace-nowrap">Emily Thompson</p>
              <p className="shrink-0 font-geist text-[13.668px] leading-[1.5] text-[rgba(255,255,255,0.4)]">BrandLite GmbH</p>
            </div>
            <p className="shrink-0 font-geist text-[17.085px] font-light leading-[1.5] text-paper-light">{TESTIMONIAL_QUOTE}</p>
          </div>
        </div>

        <div className="absolute left-[510.15px] top-[301.82px] flex w-[838.855px] shrink-0 flex-col items-start gap-[102.508px] overflow-clip rounded-[54.671px] border-[6.834px] border-[rgba(255,255,255,0.1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]">
          <div className="relative h-[728.659px] w-[849.106px] shrink-0 rounded-[13.668px]">
            <img alt="" src={IMG_TEST_MID_B} className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[13.668px] object-cover" />
          </div>
          <div className="absolute left-[calc(50%-120.45px)] top-[calc(50%+232.78px)] flex w-[505.705px] max-w-[683.3848876953125px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-[34.169px]">
            <div className="flex shrink-0 flex-col items-start">
              <p className="shrink-0 font-syne text-[27.335px] font-bold leading-[1.3] tracking-[-1.7085px] text-center text-white whitespace-nowrap">Emily Thompson</p>
              <p className="shrink-0 font-geist text-[13.668px] leading-[1.5] text-[rgba(255,255,255,0.4)]">BrandLite GmbH</p>
            </div>
            <p className="shrink-0 font-geist text-[17.085px] font-light leading-[1.5] text-paper-light">{TESTIMONIAL_QUOTE}</p>
          </div>
        </div>

        <div className="relative flex w-full shrink-0 flex-col items-start text-[84px] tracking-[-3.5px] text-paper-light whitespace-nowrap">
          <p className="font-syne font-extrabold leading-none">Stories</p>
          <p className="font-instrument italic leading-none">from our partners</p>
        </div>

        <div className="absolute left-[335px] top-[239.65px] flex w-[982px] shrink-0 flex-col items-start gap-[120px] overflow-clip rounded-[64px] border-8 border-[rgba(255,255,255,0.1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]">
          <div className="relative h-[853px] w-[994px] shrink-0 rounded-[16px]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
              <img alt="" src={IMG_TEST_MAIN} className="absolute left-0 top-[-39.15%] h-[205.27%] w-full max-w-none" />
            </div>
          </div>
          <div className="absolute bottom-[7px] left-[7px] h-[297px] w-[968px]" data-name="Liquid Glass - Regular - Large">
            <div
              className="absolute inset-0 rounded-[66px] opacity-67 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%)",
              }}
            />
          </div>
          <div className="absolute left-[calc(50%-141px)] top-[calc(50%+272.5px)] flex w-[592px] max-w-[800px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-[40px]">
            <div className="flex shrink-0 flex-col items-start">
              <p className="shrink-0 font-syne text-[32px] font-bold leading-[1.3] tracking-[-2px] text-center text-white whitespace-nowrap">Emily Thompson</p>
              <p className="shrink-0 font-geist text-[16px] leading-[1.5] text-[rgba(255,255,255,0.4)]">BrandLite GmbH</p>
            </div>
            <p className="shrink-0 font-geist text-[20px] font-light leading-[1.5] text-paper-light">{TESTIMONIAL_QUOTE}</p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ />

      {/* ===== Form ===== */}
      <Form />

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  )
}

export default App