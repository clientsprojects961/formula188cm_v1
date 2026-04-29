"use client"

import Image from "next/image"

const WHATSAPP_NUMBER = "8989252740"

export function WhatsAppButton() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi, I need help with Formula188CM")
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-[85px] md:bottom-6 right-4 md:right-6 z-[60] w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 active:scale-95 group flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <Image 
        src="/wp.png" 
        alt="WhatsApp" 
        width={32} 
        height={32} 
        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover animate-pulse group-hover:animate-none"
      />
    </button>
  )
}

