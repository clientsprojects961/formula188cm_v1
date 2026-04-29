"use client"
import { useMemo, useRef, useState } from "react"
import { Pause, Play, ShieldCheck, Truck, RotateCcw, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"

const media = [
 
  { type: "image" as const, src: "/c1.jpeg", alt: "Formula188CM front view", label: "Front View" },
  { type: "image" as const, src: "/c2.jpeg", alt: "Formula188CM ingredients", label: "Ingredients" },
  { type: "video" as const, src: "/formula188unbox.mp4", alt: "Formula188CM unboxing video", label: "Unboxing Video" },
  { type: "image" as const, src: "/c5.jpeg", alt: "Formula188CM back view", label: "Back View" },
  { type: "image" as const, src: "/c4.jpeg", alt: "Formula188CM usage", label: "Usage" },
  { type: "image" as const, src: "/c3.jpeg", alt: "Formula188CM packaging", label: "Packaging" },
]

export function ProductGallery() {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [isMuted, setIsMuted] = useState(true)  
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const activeMedia = media[active]

  const formatTime = (value: number) => {
    if (!Number.isFinite(value)) return "00:00"
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  const progressPercent = useMemo(() => {
    if (!duration) return 0
    return Math.min((progress / duration) * 100, 100)
  }, [duration, progress])

  const togglePlay = async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      await video.play().catch(() => {})
      setIsPlaying(true)
      return
    }
    video.pause()
    setIsPlaying(false)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !isMuted
    video.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const onSeek = (value: string) => {
    const video = videoRef.current
    if (!video || !duration) return
    const nextProgress = (Number(value) / 100) * duration
    video.currentTime = nextProgress
    setProgress(nextProgress)
  }

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActive((prev) => (prev + 1) % media.length)
  }

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActive((prev) => (prev - 1 + media.length) % media.length)
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 text-[10px] sm:text-[11px] font-bold text-secondary whitespace-nowrap pb-1">
        <span className="bg-card px-2.5 py-1 rounded-full border border-border flex items-center gap-1 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" /> ⭐ 4.8/5 Rating
        </span>
        <span className="bg-card px-2.5 py-1 rounded-full border border-border flex items-center gap-1 shrink-0">
          <Truck className="w-3.5 h-3.5" /> 🧬 Works After Age 21
        </span>
        <span className="bg-card px-2.5 py-1 rounded-full border border-border flex items-center gap-1 shrink-0">
          <RotateCcw className="w-3.5 h-3.5" /> ↩️ Results Guaranteed
        </span>
      </div>

      <div
        className={`relative w-full aspect-square bg-muted rounded-[2rem] overflow-hidden border border-border shadow-sm ${activeMedia.type === "image" ? "cursor-zoom-in" : ""} ${zoomed ? "z-10" : ""}`}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        {activeMedia.type === "video" ? (
          <>
            <video
              ref={videoRef}
              src={activeMedia.src}
              className="w-full h-full object-cover"
              muted={isMuted}
              playsInline
              preload="metadata"
              onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-card text-primary flex items-center justify-center"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-card text-primary flex items-center justify-center"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[11px] font-bold tracking-wider uppercase text-white ml-auto">Unboxing</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={progressPercent}
                onChange={(e) => onSeek(e.target.value)}
                className="w-full h-1.5 accent-white cursor-pointer"
                aria-label="Seek video timeline"
              />
              <div className="mt-1 flex justify-between text-[10px] text-white/80">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </>
        ) : (
          <img
            src={activeMedia.src}
            alt={activeMedia.alt}
            className={`w-full h-full object-cover transition-transform duration-400 ease-out mix-blend-multiply ${zoomed ? "scale-[1.08]" : "scale-100"}`}
          />
        )}
        
        {/* Navigation Buttons */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all z-20"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all z-20"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {media.map((item, i) => (
          <button
            key={i}
            className={`flex-shrink-0 w-[76px] h-[76px] rounded-[1rem] overflow-hidden border-2 bg-card p-0 transition-all ${
              i === active ? "border-primary shadow-sm" : "border-transparent hover:border-primary/50"
            }`}
            onClick={() => setActive(i)}
            aria-label={item.alt}
          >
            {item.type === "video" ? (
              <div className="w-full h-full bg-primary text-card flex flex-col items-center justify-center gap-1">
                <Play className="w-4 h-4 fill-card" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Video</span>
              </div>
            ) : (
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover mix-blend-multiply" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
