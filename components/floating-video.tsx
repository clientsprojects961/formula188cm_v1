"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, X } from "lucide-react"

export function FloatingVideo() {
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      // Try to autoplay
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e))
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-[85px] md:bottom-4 left-4 z-[60] w-32 md:w-48 aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black group transition-transform hover:scale-105">
      <video
        ref={videoRef}
        src="/formulavideo.mp4"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />
      
      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors pointer-events-none" />
      
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        aria-label="Close video"
      >
        <X className="w-3 h-3 md:w-4 md:h-4" />
      </button>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-3 h-3 md:w-4 md:h-4" /> : <Volume2 className="w-3 h-3 md:w-4 md:h-4" />}
      </button>
    </div>
  )
}
