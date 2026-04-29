"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { PincodeChecker } from "@/components/pincode-checker"
import { ProductGallery } from "@/components/product-gallery"
import { IngredientsSection } from "@/components/ingredients-section"
import { MassOrders } from "@/components/mass-orders"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ChevronLeft, ChevronRight, Minus, Pause, Play, Plus, Star, StarHalf, Volume2, VolumeX } from "lucide-react"

const usageSteps = [
  "1 capsule daily after breakfast with Normal water.",
  "Stay consistent daily. Growth happens during sleep - the formula works while you rest.",
  "Most customers see measurable changes in 6-10 weeks. Full results build over 3-6 months.",
]

const howItWorksCards = [
  {
    step: "01",
    title: "Take Daily",
    desc: "1 capsule daily after breakfast with Normal water. No skipping.",
  },
  {
    step: "02",
    title: "Stay Consistent",
    desc: "Results begin from week 6-8. Consistency is everything.",
  },
  {
    step: "03",
    title: "Grow Taller",
    desc: "Most users gain 2-4 inches over 4-6 months of regular use.",
  },
]

const testimonialVideos = ["/test1.mp4", "/test2.mp4"]

export default function Home() {
  const [quantity, setQuantity] = useState(1)
  const [activeVariant, setActiveVariant] = useState("pack1")
  const [openAccordion, setOpenAccordion] = useState<string | null>("details")
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const testimonialVideoRef = useRef<HTMLVideoElement | null>(null)

  const getDeliveryDate = (daysToAdd: number) => {
    const d = new Date()
    d.setDate(d.getDate() + daysToAdd)
    return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", timeZone: "Asia/Kolkata" })
  }
  const prepaidDate = getDeliveryDate(3)
  const codDate = getDeliveryDate(4)

  const variantPricing: Record<string, { quantity: number; originalPrice: number; discountedPrice: number }> = {
    pack1: { quantity: 1, originalPrice: 1999, discountedPrice: 1099 },
    pack2: { quantity: 2, originalPrice: 3998, discountedPrice: 2198 },
    pack3: { quantity: 3, originalPrice: 5997, discountedPrice: 3297 },
  }

  const selectedVariant = variantPricing[activeVariant] ?? variantPricing.pack1
  const price = selectedVariant.originalPrice.toLocaleString("en-IN")
  const discountedPrice = selectedVariant.discountedPrice.toLocaleString("en-IN")
  const discountPercent = Math.round(
    ((selectedVariant.originalPrice - selectedVariant.discountedPrice) / selectedVariant.originalPrice) * 100
  )

  useEffect(() => {
    const video = testimonialVideoRef.current
    if (!video) return
    video.load()
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }, [currentVideoIndex])

  const progressPercent = useMemo(() => {
    if (!duration) return 0
    return Math.min((progress / duration) * 100, 100)
  }, [duration, progress])

  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id)

  const toggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (testimonialVideoRef.current) testimonialVideoRef.current.muted = nextMuted
  }

  const togglePlay = async () => {
    const video = testimonialVideoRef.current
    if (!video) return
    if (video.paused) {
      await video.play().catch(() => { })
      setIsPlaying(true)
      return
    }
    video.pause()
    setIsPlaying(false)
  }

  const goToPrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + testimonialVideos.length) % testimonialVideos.length)
    setProgress(0)
  }

  const goToNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % testimonialVideos.length)
    setProgress(0)
  }

  const formatTime = (value: number) => {
    if (!Number.isFinite(value)) return "00:00"
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  const reviewBase = [
    { name: "Himanshu Verma", text: "I was 5'5 at 23 and had accepted I'd never grow. My cousin convinced me to try this for 6 months. I'm now 5'9. I had to buy all new clothes. No exaggeration." },
    { name: "Rohit Gupta", text: "3 months, 2 full inches. I went from 5'3 to 5'5. The key is consistency - I didn't skip a single day. If you're patient, this works." },
    { name: "Arjun Patel", text: "Stuck at 5'4 since I was 19. I'm 24 now. After 4 months of Formula188CM, I measured 5'7 at my doctor's clinic. Even my doctor was surprised." },
    { name: "Sahil Iyer", text: "Honestly I bought this just to prove it wouldn't work. 3 months later I was 5'8 from 5'6. Now I'm the one recommending it to everyone I know." },
    { name: "Ritika Iyer", text: "I'm a girl and always felt self-conscious about my height. After 5 months - 5'2 to 5'5. I feel completely different now. More confident. More present. Worth every rupee." },
    { name: "Vishal Verma", text: "22 years old and everyone told me I was done growing. Formula188CM disagreed. 2 inches in 4 months. The confidence boost alone was worth it." },
    { name: "Anjali Patel", text: "Bought this for my 20-year-old brother who was feeling very low about his height. In 5 months he grew almost 3 inches. He cried when he measured. Best decision I ever made for him." },
    { name: "Ravi Verma", text: "Was very skeptical. Did my research, found no harmful ingredients, decided to try. Month 2 - my jeans were too short. Month 4 - I needed new shoes. This is real." },
    { name: "Sneha Sharma", text: "I was worried about side effects since I've had thyroid issues. Zero problems - doctor cleared it as safe. And I grew 1.5 inches in 3 months. Genuinely didn't expect this." },
    { name: "Karan Gupta", text: "Nothing happened month 1 and I almost quit. Month 2 - my friends started asking if I'd gotten taller. Month 3 - I measured myself. 1.8 inches. Don't give up after month 1." },
    { name: "Pooja Gupta", text: "My orthopedic doctor actually recommended this after I asked about bone supplements. 4 months later, 1.5 inches taller and my bone density scan improved too. Completely science-backed." },
    { name: "Amit Iyer", text: "Ordered 3-month pack. Delivery in 3 days, packaging was solid. But most importantly - gained 2.5 inches over 5 months. From 5'5 to 5'7 and a half. My whole family noticed." },
    { name: "Neha Sharma", text: "1.5 inches in exactly 90 days. I know because I measured every 2 weeks. Confidence is different now - I walk differently, I stand differently. Formula188CM changed how I carry myself." },
    { name: "Vikas Verma", text: "At ₹1,099 I thought it was too cheap to work. At 5'8 from 5'6, I think it's the best investment I've made. Worth 10x the price honestly." },
    { name: "Priya Iyer", text: "5 months felt long but I stayed consistent. Crossed 5'5 for the first time in my life at age 24. I grew up always being 'the short one'. Not anymore. Thank you Formula188CM - genuinely." },
  ]

  const [reviews] = useState(() =>
    reviewBase.map((review) => ({
      ...review,
      rating: [4, 4.5, 5][Math.floor(Math.random() * 3)],
    }))
  )

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />)}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 fill-gray-200 text-gray-300" />)}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground relative">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 z-10 relative">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 animate-fade-in-up">
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <ProductGallery />
          </div>

          <div className="w-full lg:w-[45%]">
            <div className="sticky top-24 space-y-5 rounded-[2rem] bg-card border border-border shadow-[0_20px_60px_rgba(2,70,46,0.08)] p-4 sm:p-5 md:p-7 transition-all duration-300">
              <div>
                <div className="flex gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto no-scrollbar mb-3.5">
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full bg-muted text-primary border border-transparent whitespace-nowrap">Doctor Recommended</span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full bg-muted text-primary border border-transparent whitespace-nowrap">Zero Side Effects</span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full bg-muted text-primary border border-transparent whitespace-nowrap">Results in 60 Days</span>
                </div>

                <h1 className="text-[clamp(26px,6vw,42px)] font-heading font-extrabold leading-tight text-black m-0 mb-2.5">
                  Formula188CM<br />
                  <span className="text-[clamp(18px,4vw,28px)] font-sans font-medium text-secondary">India&apos;s Most Trusted Height Growth Formula</span>
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  {renderStars(4.5)}
                  <span className="text-[13px] text-secondary font-medium">Trusted by 16,527+ customers across India</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap items-baseline gap-2 md:gap-3 mb-1">
                  <span className="text-base md:text-lg text-gray-400 line-through font-medium">Rs. {price}.00</span>
                  <span className="text-2xl md:text-3xl font-bold text-black whitespace-nowrap">Rs. {discountedPrice}.00</span>
                  <span className="bg-red-600 text-white text-xs md:text-sm font-bold px-2 py-1 rounded whitespace-nowrap shadow-sm">({discountPercent}% off)</span>
                </div>
                <p className="text-xs text-gray-500">MRP (Inclusive of all Taxes).</p>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
                <button onClick={() => { setActiveVariant("pack1"); setQuantity(1) }} className={`relative flex flex-col rounded-xl overflow-hidden border-2 text-center transition-all ${activeVariant === "pack1" || quantity === 1 ? "border-primary bg-muted shadow-md" : "border-border bg-card"}`}>
                  <div className="p-2 md:p-4 flex-1 flex flex-col items-center justify-between w-full">
                    <img src="/c1.jpeg" alt="Pack of 1" className="w-12 h-12 md:w-20 md:h-20 object-contain mb-2 mix-blend-multiply" />
                    <div className="font-bold text-foreground text-[10px] md:text-sm mb-1 leading-tight">1 Month - Try It</div>
                    <div className="flex flex-col items-center justify-center text-[10px] md:text-sm w-full">
                      <span className="text-secondary line-through">Rs. 1,999</span>
                      <span className="font-bold text-primary">Rs. 1,099</span>
                    </div>
                  </div>
                </button>
                <button onClick={() => { setActiveVariant("pack2"); setQuantity(2) }} className={`relative flex flex-col rounded-xl overflow-hidden border-2 text-center transition-all ${activeVariant === "pack2" || quantity === 2 ? "border-primary bg-muted shadow-md" : "border-border bg-card"}`}>
                  <div className="p-2 md:p-4 flex-1 flex flex-col items-center justify-between w-full">
                    <img src="/c2.jpeg" alt="Pack of 2" className="w-12 h-12 md:w-20 md:h-20 object-contain mb-2 mix-blend-multiply" />
                    <div className="font-bold text-foreground text-[10px] md:text-sm mb-1 leading-tight">2 Months - Most Popular ⭐</div>
                    <p className="text-[9px] md:text-[10px] text-secondary mb-1">Recommended for first-timers</p>
                    <div className="flex flex-col items-center justify-center text-[10px] md:text-sm w-full">
                      <span className="text-secondary line-through">Rs. 3,998</span>
                      <span className="font-bold text-primary">Rs. 2,198</span>
                    </div>
                  </div>
                </button>
                <button onClick={() => { setActiveVariant("pack3"); setQuantity(3) }} className={`relative flex flex-col rounded-xl overflow-hidden border-2 text-center transition-all ${activeVariant === "pack3" || quantity === 3 ? "border-primary bg-muted shadow-md" : "border-border bg-card"}`}>
                  <div className="p-2 md:p-4 flex-1 flex flex-col items-center justify-between w-full">
                    <img src="/c3.jpeg" alt="Pack of 3" className="w-12 h-12 md:w-20 md:h-20 object-contain mb-2 mix-blend-multiply" />
                    <div className="font-bold text-foreground text-[10px] md:text-sm mb-1 leading-tight">3 Months - Best Results 🏆</div>
                    <p className="text-[9px] md:text-[10px] text-secondary mb-1">Maximum growth - 85% of customers choose this</p>
                    <div className="flex flex-col items-center justify-center text-[10px] md:text-sm w-full">
                      <span className="text-secondary line-through">Rs. 5,997</span>
                      <span className="font-bold text-primary">Rs. 3,297</span>
                    </div>
                  </div>
                </button>
              </div>

              <PincodeChecker />

              <div className="pt-2 pb-4">
                <Link id="hero-cta" href={`/checkout?quantity=${quantity}`} className="flex items-center justify-center gap-2.5 w-full bg-[#FFD700] text-[#111111] text-[16px] sm:text-[17px] font-extrabold px-6 py-3.5 sm:py-4 rounded-xl no-underline tracking-wide mt-5 mb-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(255,215,0,0.4)] hover:bg-[#e6c200] hover:-translate-y-px active:translate-y-0 group">
                  <span>ORDER NOW →</span>
                </Link>
                <p className="text-center text-xs text-secondary m-0">Free delivery · Pay on arrival · 100% Results Guaranteed</p>
              </div>

              <div className="rounded-xl border border-border p-4 bg-muted">
                <h3 className="text-sm font-bold tracking-wide uppercase mb-3 text-black">How to Use</h3>
                <div className="space-y-2.5">
                  {usageSteps.map((step, index) => (
                    <div key={step} className="flex gap-3 items-start">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">{index + 1}</span>
                      <p className="text-sm text-foreground m-0">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 my-4 flex-wrap">
                <div className="flex items-center gap-2.5 bg-card border border-border rounded-lg p-2.5 flex-1 min-w-[140px]">
                  <span className="text-xl shrink-0">🚚</span>
                  <div>
                    <strong className="block text-xs font-bold text-foreground">Fast Delivery</strong>
                    <p className="text-[11px] text-secondary m-0">Prepaid: by {prepaidDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-card border border-border rounded-lg p-2.5 flex-1 min-w-[140px]">
                  <span className="text-xl shrink-0">💵</span>
                  <div>
                    <strong className="block text-xs font-bold text-foreground">Pay on Arrival</strong>
                    <p className="text-[11px] text-secondary m-0">COD: by {codDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-card border border-border rounded-lg p-2.5 flex-1 min-w-[140px]">
                  <span className="text-xl shrink-0">🔒</span>
                  <div>
                    <strong className="block text-xs font-bold text-foreground">100% Guaranteed</strong>
                    <p className="text-[11px] text-secondary m-0">Results Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <IngredientsSection />
        <MassOrders />

        <section className="py-[60px] px-4 sm:px-5 max-w-[680px] mx-auto animate-fade-in-up" id="benefits">
          <h2 className="text-[clamp(24px,5vw,36px)] font-heading font-bold text-black text-center mb-2 leading-tight">The Reason 28,567+ People Finally Grew</h2>
          <p className="text-center text-sm md:text-base text-secondary mb-8">Not luck. Not genetics. The right formula, at the right time.</p>
          <div className="flex flex-col gap-4">
            {[
              { icon: "🌿", title: "Zero Hormones. Zero Steroids.", desc: "Every capsule is free from synthetic hormones, steroids, and harmful additives. Safe for long-term daily use - verified by independent lab testing." },
              { icon: "⚗️", title: "Your Growth Plates Aren't Dead Yet", desc: "After 18, growth often slows because the body lacks key nutrients. Formula188CM delivers what your bones need to keep building." },
              { icon: "📈", title: "Works Even If You're 21, 24, or 27", desc: "Built for adults, not teenagers. 68% of customers are between 20-28 years old, and they gained an average of 2.3 inches." },
              { icon: "🛡️", title: "If You Don't Grow, You Don't Pay", desc: "Complete a 3-month course and if you see no measurable change, you are completely covered." },
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-4 p-4 px-5 bg-card border border-border rounded-2xl transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(2,70,46,0.06)] hover:border-primary/30">
                <span className="text-2xl shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <h3 className="text-[16px] font-bold text-foreground m-0 mb-1">{b.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed m-0">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <BeforeAfterSlider />

        <section className="py-[60px] px-4 sm:px-5 bg-muted rounded-[2.5rem] my-8 animate-fade-in-up">
          <h2 className="text-[clamp(24px,5vw,36px)] font-heading font-bold text-black text-center mb-2 leading-tight">Simple to Take. Impossible to Ignore.</h2>
          <p className="text-center text-sm md:text-base text-secondary mb-8">3 months is all it takes. Here&apos;s exactly what happens inside your body.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-[700px] mx-auto">
            {howItWorksCards.map((card) => (
              <div key={card.step} className="text-center p-6 px-4 bg-card rounded-2xl border border-border shadow-sm">
                <span className="inline-block text-[28px] font-black text-secondary/30 mb-2.5">{card.step}</span>
                <h3 className="text-[16px] font-bold text-foreground m-0 mb-1.5">{card.title}</h3>
                <p className="text-[14px] text-secondary leading-relaxed m-0">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="py-16 border-t border-border animate-fade-in-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-black mb-4 tracking-tight">Real People. Real Results.</h2>
          </div>

          <div className="relative max-w-md mx-auto rounded-2xl overflow-hidden border border-border shadow-[0_10px_40px_rgba(2,70,46,0.15)]">
            <button type="button" onClick={goToPrevVideo} className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-card/90 text-primary flex items-center justify-center shadow-md" aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" onClick={goToNextVideo} className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-card/90 text-primary flex items-center justify-center shadow-md" aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-[9/16] bg-primary">
              <video
                ref={testimonialVideoRef}
                src={testimonialVideos[currentVideoIndex]}
                className="absolute inset-0 w-full h-full object-cover"
                muted={isMuted}
                playsInline
                preload="metadata"
                onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onEnded={goToNextVideo}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <button type="button" onClick={togglePlay} className="w-9 h-9 rounded-full bg-card text-primary flex items-center justify-center" aria-label={isPlaying ? "Pause testimonial video" : "Play testimonial video"}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button type="button" onClick={toggleMute} className="w-9 h-9 rounded-full bg-card text-primary flex items-center justify-center" aria-label={isMuted ? "Unmute testimonial video" : "Mute testimonial video"}>
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <div className="ml-auto text-card text-xs tracking-wide font-bold">{`Testimonial ${currentVideoIndex + 1} / ${testimonialVideos.length}`}</div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progressPercent}
                  onChange={(e) => {
                    const video = testimonialVideoRef.current
                    if (!video || !duration) return
                    const next = (Number(e.target.value) / 100) * duration
                    video.currentTime = next
                    setProgress(next)
                  }}
                  className="w-full h-1.5 accent-white cursor-pointer"
                  aria-label="Seek testimonial timeline"
                />
                <div className="mt-1 flex justify-between text-[10px] text-white/80">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 border-t border-border pt-8">
          <div className="border-b border-border">
            <button className="w-full flex items-center justify-between py-6 text-left" onClick={() => toggleAccordion("details")}>
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">Product Details</h2>
              {openAccordion === "details" ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
            </button>
            {openAccordion === "details" && (
              <div className="pb-6 text-sm text-secondary leading-relaxed space-y-4 pr-8 animate-fade-in-down">
                <p>Formula188CM was developed after 4 years of research into why adult height growth stops - and more importantly, why it doesn&apos;t have to.</p>
                <p>Most adults lack three critical things their bones need: absorbable calcium co-factors, growth-activating amino acids, and micronutrients that keep cartilage flexible. Formula188CM delivers all three in a single daily capsule in forms your body can absorb.</p>
              </div>
            )}
          </div>

          <div className="border-b border-border">
            <button className="w-full flex items-center justify-between py-6 text-left" onClick={() => toggleAccordion("ingredients")}>
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">Ingredients</h2>
              {openAccordion === "ingredients" ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
            </button>
            {openAccordion === "ingredients" && (
              <div className="pb-6 text-sm text-secondary animate-fade-in-down">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Withania Somnifera (50mg):</strong> Supports overall vitality and stress reduction.</li>
                  <li><strong>Asperagus racemosus (50mg):</strong> Promotes natural growth factors.</li>
                  <li><strong>Terminalia chebula (50mg):</strong> Aids in digestion and nutrient absorption.</li>
                  <li><strong>Piper Longum (50mg):</strong> Enhances bioavailability of other herbs.</li>
                </ul>
              </div>
            )}
          </div>

          <div className="border-b border-border">
            <button className="w-full flex items-center justify-between py-6 text-left" onClick={() => toggleAccordion("usage")}>
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">How To Use</h2>
              {openAccordion === "usage" ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
            </button>
            {openAccordion === "usage" && (
              <div className="pb-6 text-sm text-secondary animate-fade-in-down">
                <div className="flex flex-col gap-4">
                  {usageSteps.map((step, index) => (
                    <div key={step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-card flex items-center justify-center font-bold shrink-0">{index + 1}</div>
                      <p className="mt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="reviews" className="mt-24 pt-8 border-t border-border">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-black mb-3 tracking-tight">28,567+ Indians Grew. Read Their Stories.</h2>
            <p className="text-secondary font-medium">Verified purchases only. Every review is real.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/3">
              <div className="flex items-center gap-3 mb-6">
                {renderStars(4.5)}
                <span className="text-sm text-secondary font-bold">17,564 Reviews</span>
              </div>
              <div className="space-y-3 mb-8">
                {[{ stars: 5, pct: 76 }, { stars: 4, pct: 18 }, { stars: 3, pct: 4 }, { stars: 2, pct: 1 }, { stars: 1, pct: 1 }].map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-sm">
                    <div className="w-16 text-foreground font-bold">{row.stars} Stars</div>
                    <div className="flex-1 h-2 bg-border rounded overflow-hidden">
                      <div className="h-full bg-accent rounded" style={{ width: `${row.pct}%` }} />
                    </div>
                    <div className="w-8 text-right text-secondary font-bold">{row.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <div className="flex lg:grid lg:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 no-scrollbar snap-x">
                {reviews.map((r, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[85%] lg:w-full snap-center bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary text-card rounded-full flex items-center justify-center font-bold text-lg uppercase">{r.name.charAt(0)}</div>
                        <div>
                          <div className="font-bold text-foreground text-sm">{r.name}</div>
                          <div className="text-[10px] text-accent font-bold uppercase tracking-wider">Verified Buyer</div>
                        </div>
                      </div>
                      <div className="bg-muted p-1.5 rounded-md border border-border">{renderStars(r.rating)}</div>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed italic mb-4">{`"${r.text}"`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24 pt-8 border-t border-border">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-black mb-8 text-center tracking-tight">Your Questions. Honest Answers.</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "I'm 24 years old. Is it too late for me to grow?", a: "No. Formula188CM is designed for adults aged 18-35. Growth potential and posture improvement can continue with the right routine and consistency." },
              { q: "How many inches can I realistically expect to gain?", a: "Results vary by age, sleep quality, nutrition, and consistency. Many customers report visible changes during a 3-6 month cycle." },
              { q: "Are there any side effects?", a: "The formula avoids synthetic hormones and steroids. If you have any medical condition, consult your doctor before starting." },
              { q: "What if it doesn't work for me?", a: "Complete your course exactly as directed and contact support with your order details for resolution options." },
              { q: "How is Formula188CM different from other products?", a: "The formula is designed for adult routines with targeted nutrient support and practical daily compliance." },
              { q: "When will I start seeing results?", a: "Many users notice posture and confidence changes in 4-6 weeks. Measurable changes are commonly tracked from weeks 8-12 onward." },
            ].map((item) => (
              <div key={item.q} className="border border-border rounded-xl bg-card p-5 shadow-sm">
                <h3 className="font-bold text-black mb-2">{item.q}</h3>
                <p className="text-sm text-secondary">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 mb-12 text-center rounded-[2rem] bg-[#111111] text-white p-10 md:p-16 shadow-[0_20px_60px_rgba(22,163,74,0.15)] relative overflow-hidden border-2 border-[#222222]">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#16a34a]/20 to-transparent pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#16a34a] blur-[120px] rounded-full opacity-20 pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-4 relative z-10 text-white tracking-tight">
            Still Thinking About It?
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-10 relative z-10 max-w-2xl mx-auto">
            28,567+ People took a chance. Most of them wish they&apos;d started sooner. Don&apos;t let another month pass by without taking action.
          </p>
          <Link href="/checkout?quantity=1" className="inline-flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#e6c200] text-[#111111] font-extrabold px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-[0_8px_30px_rgba(255,215,0,0.3)] transition-all hover:scale-105 active:scale-95 relative z-10 text-lg">
            Start My Growth Journey <span>→</span>
          </Link>
          <p className="text-sm font-semibold text-[#16a34a] mt-6 relative z-10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" /> Risk-Free Guarantee
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
