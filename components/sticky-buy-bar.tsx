"use client"
import { useEffect, useState } from "react"

export function StickyBuyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero-cta")
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-4 py-3 transform transition-transform duration-300 shadow-[0_-4px_20px_rgba(2,70,46,0.08)] md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between max-w-[480px] mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-secondary line-through">₹1,999</span>
          <span className="text-lg font-bold text-foreground">₹1,099</span>
          <span className="text-[12px] bg-accent/20 text-primary px-2 py-0.5 rounded-full font-semibold">45% OFF</span>
        </div>
        <a 
          href="/checkout?quantity=1" 
          className="bg-[#FFD700] text-[#111111] text-[15px] font-bold px-6 py-3 rounded-lg no-underline tracking-wide transition-colors hover:bg-[#e6c200] whitespace-nowrap shadow-[0_4px_14px_rgba(255,215,0,0.3)]"
        >
          ORDER NOW →
        </a>
      </div>
    </div>
  )
}
