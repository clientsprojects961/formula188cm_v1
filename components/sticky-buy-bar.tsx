"use client"
import { useEffect, useState } from "react"

export function StickyBuyBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-4 py-3 shadow-[0_-4px_20px_rgba(2,70,46,0.08)] md:hidden"
    >
      <div className="flex items-center justify-between max-w-[480px] mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-secondary line-through">₹1,999</span>
          <span className="text-lg font-bold text-foreground">₹1,099</span>
          <span className="text-[12px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">45% OFF</span>
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
