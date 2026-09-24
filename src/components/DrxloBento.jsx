import React from "react"
import "./DrxloBento.css"
import {
  IMG_BENTO_PEOPLE,
  IMG_BENTO_CUBE,
  IMG_BENTO_MAGNIFY,
  IMG_BENTO_CHART,
  IMG_BENTO_INFINITY,
  IMG_FINGER
} from "../lib/assets"

export default function DrxloBento() {
  return (
    <section
      id="why"
      data-name="Section - Why"
      className="flex w-full shrink-0 flex-col items-start justify-start gap-12 sm:gap-16 md:gap-20 overflow-clip px-4 sm:px-8 md:px-[64px] py-12 sm:py-16 md:py-[64px]"
    >
      <div className="drxlo-layout">
        <h2 className="drxlo-layout-copy sticky top-40">
          <span className="font-instrument italic leading-none text-paper-dark">What makes</span>
          <span className="font-syne font-extrabold leading-none text-paper-dark">Drxlo Unique</span>
        </h2>

        <div className="drxlo-bento-wrapper">
        <div className="drxlo-bento">
          {/* 01 */}
          <article className="drxlo-cell drxlo-direct">
            <h3 className="drxlo-medium">
              You’ll work<br />
              directly with<br />
              the person<br />
              you hired
            </h3>

            <div className="drxlo-asset-wrap drxlo-people-wrap">
              <img src={IMG_BENTO_PEOPLE} alt="You'll work directly" loading="lazy" decoding="async" className="drxlo-asset-img" />
            </div>
          </article>

          {/* 02 */}
          <article className="drxlo-cell drxlo-challenge">
            <div className="drxlo-challenge-copy">
              <h3 className="drxlo-medium">
                <span className="drxlo-lime">We challenge</span><br />
                assumptions<br />
                before designing<br />
                a single screen,
              </h3>
            </div>

            <div className="drxlo-asset-wrap drxlo-cube-wrap">
              <img src={IMG_BENTO_CUBE} alt="We challenge assumptions" loading="lazy" decoding="async" className="drxlo-asset-img" />
            </div>
          </article>

          {/* 03 */}
          <article className="drxlo-cell drxlo-research">
            <h3 className="drxlo-medium">
              Built on<br />
              <span className="drxlo-lime">research.</span>
            </h3>

            <div className="drxlo-asset-wrap drxlo-magnify-wrap">
              <img src={IMG_BENTO_MAGNIFY} alt="Built on research" loading="lazy" decoding="async" className="drxlo-asset-img" />
            </div>
          </article>

          {/* 04 */}
          <article className="drxlo-cell drxlo-center">            

            <h3 className="drxlo-headline">
              One partner<br />
              for strategy,<br />
              design and build—<br />
              zero handoffs,<br />
              full ownership
            </h3>
          </article>

          {/* 05 */}
          <article className="drxlo-cell drxlo-decision">
            <h3 className="drxlo-medium">
              <span className="drxlo-lime">Every decision</span><br />
              must improve<br />
              the product—<br />
              not just the<br />
              interface
            </h3>

            <div className="drxlo-asset-wrap drxlo-chart-wrap">
              <img src={IMG_BENTO_CHART} alt="Every decision must improve the product" loading="lazy" decoding="async" className="drxlo-asset-img" />
            </div>
          </article>

          {/* 06 */}
          <article className="drxlo-cell drxlo-support">
            <h3 className="drxlo-medium">
              <span className="drxlo-lime">Support</span><br />
              doesn’t end<br />
              after launch,
            </h3>

            <div className="drxlo-asset-wrap drxlo-infinity-wrap">
              <img src={IMG_BENTO_INFINITY} alt="Support doesn't end after launch" loading="lazy" decoding="async" className="drxlo-asset-img" />
            </div>
          </article>
        </div>
      </div>
    </div>
    </section>
  )
}
