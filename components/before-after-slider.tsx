"use client"
import type React from "react"
import { useEffect } from "react"
import { MoveHorizontal } from "lucide-react"

export function BeforeAfterSlider() {
  const ImgComparisonSlider = "img-comparison-slider" as unknown as React.ElementType

  useEffect(() => {
    // dynamically import so it registers the web component
    import("img-comparison-slider")
  }, [])

  return (
    <section className="py-[60px] px-5 max-w-[720px] mx-auto text-center">
      <div className="mb-7">
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-card border border-border px-4 py-1.5 rounded-full mb-4 shadow-sm">
          PROOF - NO FILTERS
        </span>
        <h2 className="text-[clamp(24px,5vw,36px)] font-heading font-bold text-black m-0 mb-3 tracking-tight leading-tight">
          He Was 5&apos;4 at Age 22. He&apos;s 5&apos;7 Now.
        </h2>
        <p className="text-sm md:text-base text-secondary m-0">Drag to see Arjun&apos;s 4-month transformation. No Photoshop. No camera tricks.</p>
      </div>

      <ImgComparisonSlider class="w-full rounded-[2rem] overflow-hidden shadow-[0_16px_40px_rgba(2,70,46,0.15)] [--divider-width:3px] [--divider-color:#FEC700] [--default-handle-opacity:1]">
        <img
          slot="first"
          src="/before.png"
          alt="Before using Formula188CM"
          className="w-full h-[620px] md:h-[740px] object-cover object-top block bg-card"
        />
        <img
          slot="second"
          src="/after.png"
          alt="After using Formula188CM"
          className="w-full h-[620px] md:h-[740px] object-cover object-top block bg-card"
        />
        <div slot="handle" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(2,70,46,0.4)] cursor-ew-resize border-2 border-[#FEC700]">
          <MoveHorizontal className="text-[#FEC700] w-6 h-6" />
        </div>
        <div slot="first" className="absolute bottom-6 left-6 text-[14px] font-bold text-white bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full tracking-wide">
          Before
        </div>
        <div slot="second" className="absolute bottom-6 right-6 text-[14px] font-bold text-white bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full tracking-wide">
          After
        </div>
      </ImgComparisonSlider>
    </section>
  )
}
