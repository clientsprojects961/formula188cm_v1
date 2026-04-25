"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Star, StarHalf, Plus, Minus, Share2, Calendar, CheckCircle2, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react"

export default function Home() {
  // PRODUCT LOGIC
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeVariant, setActiveVariant] = useState("starter")
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false)
  const MAX_QUANTITY = 4

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= MAX_QUANTITY) {
      setQuantity(value)
    }
  }

  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 5)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short"
  })

  const basePrice = 1999
  const baseDiscountedPrice = 1099
  const price = basePrice * quantity
  const discountedPrice = baseDiscountedPrice * quantity
  const savings = price - discountedPrice
  const discountPercent = Math.round((savings / price) * 100)

  const productSlides = [
    "/c1.jpeg",
    "/c2.jpeg",
    "/c3.jpeg",
    "/c4.jpeg",
    "/c5.jpeg",
    "/c6.jpeg",
  ]

  // Carousel Navigation & Auto-slide
  const nextSlide = () => setActiveImageIndex((prev) => (prev + 1) % productSlides.length)
  const prevSlide = () => setActiveImageIndex((prev) => (prev - 1 + productSlides.length) % productSlides.length)

  useEffect(() => {
    if (isHoveringCarousel) return
    const timer = setInterval(nextSlide, 2000)
    return () => clearInterval(timer)
  }, [isHoveringCarousel])

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>("details")
  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id)

  // VIDEO TESTIMONIAL LOGIC
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const testimonials = ["/t2.mp4", "/t3.mp4", "/t4.mp4", "/t5.mp4"]
  const posters = ["/t1.jpeg", "/t2.jpeg", "/t3.jpeg", "/t4.jpeg", "/t5.jpeg"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      currentVideo.play().catch(() => {})
    }
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideoIndex) {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [currentVideoIndex])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    videoRefs.current.forEach((video) => {
      if (video) video.muted = !isMuted
    })
  }

  // WRITTEN REVIEWS LOGIC
  const reviewBase = [
    { name: "Himanshu", text: "This is really incredible, I followed the methods for 5-6 months and gained height from 5'5 to 5'9." },
    { name: "Rohit", text: "Using it for 3 months. I grew from 5'3 to 5'5. Just stay consistent and you will see results too." },
    { name: "Arjun", text: "This really works! I was stuck at 5'4 for years, and in 4 months I reached 5'7." },
    { name: "Sahil", text: "I didn’t believe at first, but after 3 months I can see clear results. Went from 5'6 to 5'8." },
    { name: "Ritika", text: "Tried everything before, nothing worked. This actually did. From 5'2 to 5'5 in 5 months!" },
    { name: "Vishal", text: "Amazing product. I am 22 and still gained 2 inches in just 4 months. Highly recommended." },
    { name: "Anjali", text: "I bought this for my younger brother and his height increased significantly. Very happy with the results!" },
    { name: "Ravi", text: "I was skeptical, but the 100% natural ingredients convinced me. Seeing real changes now." },
    { name: "Sneha", text: "Best height growth supplement I have ever used. No side effects at all." },
    { name: "Karan", text: "Started seeing a difference after the 2nd month. Consistency is the key." },
    { name: "Pooja", text: "Doctor recommended this to me. Great results, completely safe and natural." },
    { name: "Amit", text: "The delivery was fast, and the packaging was premium. Product works exactly as described." },
    { name: "Neha", text: "I have gained 1.5 inches in 3 months! I feel much more confident now." },
    { name: "Vikas", text: "Worth every penny. This actually delivers what it promises." },
    { name: "Priya", text: "It took some time, but after 5 months, I finally crossed 5'5. Thank you Formula188CM!" }
  ]
  const surnameOptions = ["Sharma", "Patel", "Gupta", "Verma", "Iyer"]
  const [reviews] = useState(() =>
    reviewBase.map((review) => ({
      ...review,
      name: `${review.name} ${surnameOptions[Math.floor(Math.random() * surnameOptions.length)]}`,
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
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT COLUMN (60%) - Image Gallery */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            {/* Main Image with Carousel Controls */}
            <div 
              className="w-full aspect-square bg-[#F9F9F9] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center relative group"
              onMouseEnter={() => setIsHoveringCarousel(true)}
              onMouseLeave={() => setIsHoveringCarousel(false)}
            >
               <img
                src={productSlides[activeImageIndex] || "/placeholder.svg"}
                alt="Product image"
                className="w-full h-full object-contain p-4 mix-blend-multiply"
              />
              
              {/* Carousel Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 p-2 bg-white/80 hover:bg-white text-black rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 p-2 bg-white/80 hover:bg-white text-black rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails Strip */}
            <div 
              className="flex gap-3 overflow-x-auto pb-2 no-scrollbar"
              onMouseEnter={() => setIsHoveringCarousel(true)}
              onMouseLeave={() => setIsHoveringCarousel(false)}
            >
              {productSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 bg-[#F9F9F9] transition-all ${
                    index === activeImageIndex ? "border-black" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <img
                    src={slide}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain p-2 mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN (40%) - Product Details (Sticky) */}
          <div className="w-full lg:w-[45%]">
            <div className="sticky top-28 space-y-6">
              
              {/* Title & Badges */}
              <div>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>
                  <a href="#reviews" className="text-sm text-gray-600 font-medium ml-2">
                    4789 reviews
                  </a>
                </div>

                <h1 className="text-4xl font-bold text-black mb-4 leading-tight tracking-tight font-serif">
                  Formula188CM Natural Height Growth
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F5EEDF] rounded-full text-xs text-[#5C4529] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Doctor's Choice
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F5EEDF] rounded-full text-xs text-[#5C4529] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    100% Natural
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F5EEDF] rounded-full text-xs text-[#5C4529] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Clinically Tested
                  </div>
                </div>
              </div>

              {/* Price Block */}
              <div className="mb-6">
                <div className="flex flex-wrap items-baseline gap-2 md:gap-3 mb-1">
                  <span className="text-base md:text-lg text-gray-400 line-through font-medium">Rs. {price}.00</span>
                  <span className="text-2xl md:text-3xl font-bold text-black whitespace-nowrap">Rs. {discountedPrice}.00</span>
                  <span className="bg-[#008A00] text-white text-xs md:text-sm font-bold px-2 py-1 rounded whitespace-nowrap">
                    ({discountPercent}% off)
                  </span>
                </div>
                <p className="text-xs text-gray-500">MRP (Inclusive of all Taxes).</p>
              </div>

              {/* Variant Selector */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
                {/* Pack of 1 */}
                <button 
                  onClick={() => { setActiveVariant("pack1"); setQuantity(1); }}
                  className={`relative flex flex-col rounded-xl overflow-hidden border-2 text-center bg-white transition-all ${activeVariant === "pack1" || quantity === 1 ? "border-black shadow-md" : "border-gray-200"}`}
                >
                  <div className="p-2 md:p-4 flex-1 flex flex-col items-center justify-between w-full">
                    <img src="/c1.jpeg" alt="Pack of 1" className="w-12 h-12 md:w-20 md:h-20 object-contain mb-2 mix-blend-multiply" />
                    <div className="font-bold text-black text-[10px] md:text-sm mb-1 leading-tight">Pack of 1</div>
                    <div className="flex flex-col items-center justify-center text-[10px] md:text-sm w-full">
                      <span className="text-gray-400 line-through">Rs. 1,999</span>
                      <span className="font-bold text-black">Rs. 1,099</span>
                    </div>
                  </div>
                </button>

                {/* Pack of 2 */}
                <button 
                  onClick={() => { setActiveVariant("pack2"); setQuantity(2); }}
                  className={`relative flex flex-col rounded-xl overflow-hidden border-2 text-center bg-white transition-all ${activeVariant === "pack2" || quantity === 2 ? "border-black shadow-md" : "border-gray-200"}`}
                >
                  <div className="p-2 md:p-4 flex-1 flex flex-col items-center justify-between w-full">
                    <img src="/c2.jpeg" alt="Pack of 2" className="w-12 h-12 md:w-20 md:h-20 object-contain mb-2 mix-blend-multiply" />
                    <div className="font-bold text-black text-[10px] md:text-sm mb-1 leading-tight">Pack of 2</div>
                    <div className="flex flex-col items-center justify-center text-[10px] md:text-sm w-full">
                      <span className="text-gray-400 line-through">Rs. 3,998</span>
                      <span className="font-bold text-black">Rs. 2,198</span>
                    </div>
                  </div>
                </button>

                {/* Pack of 3 */}
                <button 
                  onClick={() => { setActiveVariant("pack3"); setQuantity(3); }}
                  className={`relative flex flex-col rounded-xl overflow-hidden border-2 text-center bg-white transition-all ${activeVariant === "pack3" || quantity === 3 ? "border-black shadow-md" : "border-gray-200"}`}
                >
                  <div className="p-2 md:p-4 flex-1 flex flex-col items-center justify-between w-full">
                    <img src="/c3.jpeg" alt="Pack of 3" className="w-12 h-12 md:w-20 md:h-20 object-contain mb-2 mix-blend-multiply" />
                    <div className="font-bold text-black text-[10px] md:text-sm mb-1 leading-tight">Pack of 3</div>
                    <div className="flex flex-col items-center justify-center text-[10px] md:text-sm w-full">
                      <span className="text-gray-400 line-through">Rs. 5,997</span>
                      <span className="font-bold text-black">Rs. 3,297</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Quantity */}
              <div className="hidden">
                {/* Quantity hidden since variant boxes directly control quantity */}
                <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded-md w-32">
                  <button onClick={() => handleQuantityChange(quantity - 1)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center font-bold text-black">
                    {quantity}
                  </div>
                  <button onClick={() => handleQuantityChange(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Primary CTA Action */}
              <div className="pt-4">
                <Link
                  href={`/checkout?quantity=${quantity}`}
                  className="w-full flex items-center justify-center py-5 bg-black text-white font-bold text-lg uppercase tracking-widest rounded shadow-lg transition-all hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98]"
                >
                  BUY IT NOW
                </Link>
                
                {/* Delivery Estimate */}
                <div className="mt-4 flex flex-col items-center justify-center gap-1 text-xs md:text-sm text-gray-600 font-medium">
                  <p>Prepaid Orders: <span className="font-bold text-black">3-4 Days Delivery</span></p>
                  <p>Cash on Delivery: <span className="font-bold text-black">3-5 Days Delivery</span></p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- ADDITIONAL PRODUCT INFO (Merged from Home) --- */}

        {/* Guaranteed Growth Highlight */}
        <section className="mt-20 py-12 md:py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-12 bg-[#F9F9F9] border border-gray-200 rounded-2xl text-center shadow-sm">
              <div className="inline-block px-4 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded mb-6">
                100% Guaranteed
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                Guaranteed Growth Even After Age 21
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Break the age barrier! Our scientifically proven formula works effectively for individuals over 21, supporting natural height increase with guaranteed results.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tight uppercase">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🌿", title: "100% Natural", desc: "Formulated with pure, clinically-tested natural ingredients without harmful additives." },
              { icon: "⚗️", title: "Scientifically Formulated", desc: "Developed by nutrition experts to maximize bone health and growth potential safely." },
              { icon: "👥", title: "30k+ Customers", desc: "Join our satisfied customers who have experienced visible and measurable results." },
            ].map((benefit, idx) => (
              <div key={idx} className="p-8 bg-[#F9F9F9] border border-gray-200 rounded-xl text-center hover:border-black transition-colors">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 uppercase">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Video Section */}
        <section id="testimonials" className="py-16 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tight uppercase">Real Results</h2>
            <p className="text-gray-600 font-medium">Watch authentic video reviews from our community.</p>
          </div>

          <div className="relative max-w-md mx-auto">
            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-gray-200">
              {testimonials.map((videoSrc, index) => (
                <video
                  key={index}
                  ref={(el) => { videoRefs.current[index] = el }}
                  src={videoSrc}
                  poster={posters[index]}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  muted={isMuted}
                  loop
                  playsInline
                />
              ))}

              <div className="absolute top-4 right-4 z-30 flex gap-2">
                <button
                  onClick={toggleMute}
                  className="p-3 bg-white text-black rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentVideoIndex ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={posters[index]} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Accordions Section */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          {/* Details */}
          <div className="border-b border-gray-200">
            <button 
              className="w-full flex items-center justify-between py-6 text-left"
              onClick={() => toggleAccordion("details")}
            >
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">Product Details</h2>
              {openAccordion === "details" ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
            {openAccordion === "details" && (
              <div className="pb-6 text-sm text-gray-600 leading-relaxed space-y-4 pr-8 animate-fade-in-down">
                <p>
                  Formula188CM is a scientifically-formulated dietary supplement designed to support natural bone
                  development and growth optimization. Our product combines traditional botanical wisdom with modern
                  nutritional science.
                </p>
                <p>
                  Each ingredient is carefully selected for its role in supporting skeletal health, proper mineral
                  absorption, and bone density maintenance. We source only premium-grade natural components.
                </p>
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className="border-b border-gray-200">
            <button 
              className="w-full flex items-center justify-between py-6 text-left"
              onClick={() => toggleAccordion("ingredients")}
            >
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">Ingredients</h2>
              {openAccordion === "ingredients" ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
            {openAccordion === "ingredients" && (
              <div className="pb-6 text-sm text-gray-600 animate-fade-in-down">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Withania Somnifera (50mg):</strong> Supports overall vitality and stress reduction.</li>
                  <li><strong>Asperagus racemosus (50mg):</strong> Promotes natural growth factors.</li>
                  <li><strong>Terminalia chebula (50mg):</strong> Aids in digestion and nutrient absorption.</li>
                  <li><strong>Piper Longum (50mg):</strong> Enhances bioavailability of other herbs.</li>
                </ul>
              </div>
            )}
          </div>

          {/* How to Use */}
          <div className="border-b border-gray-200">
            <button 
              className="w-full flex items-center justify-between py-6 text-left"
              onClick={() => toggleAccordion("usage")}
            >
              <h2 className="text-lg font-bold text-black uppercase tracking-wide">How To Use</h2>
              {openAccordion === "usage" ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
            {openAccordion === "usage" && (
              <div className="pb-6 text-sm text-gray-600 animate-fade-in-down">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <p className="mt-1">Prepare a glass of normal water.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <p className="mt-1">Take 1 capsule daily after breakfast.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">3</div>
                    <p className="mt-1">Maintain consistency for at least 3-6 months for best results.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="mt-24 pt-8 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-3 uppercase tracking-tight">Customer Reviews</h2>
            <p className="text-gray-500 font-medium">Trusted by 30,000+ Customers</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Reviews Summary */}
            <div className="w-full lg:w-1/3">
              <div className="flex items-center gap-3 mb-6">
                {renderStars(4.9)}
                <span className="text-sm text-gray-500 font-bold">4,789 Reviews</span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3 mb-8">
                {[
                  { stars: 5, pct: 85 },
                  { stars: 4, pct: 10 },
                  { stars: 3, pct: 3 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 1 },
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-sm">
                    <div className="w-16 text-gray-600 font-bold">{row.stars} Stars</div>
                    <div className="flex-1 h-2 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-[#FFB800] rounded" style={{ width: `${row.pct}%` }}></div>
                    </div>
                    <div className="w-8 text-right text-gray-500 font-bold">{row.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Cards Grid/Carousel */}
            <div className="w-full lg:w-2/3">
              <div className="flex lg:grid lg:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 no-scrollbar snap-x">
                {reviews.map((r, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[85%] lg:w-full snap-center bg-[#F9F9F9] p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg uppercase">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-black text-sm">{r.name}</div>
                          <div className="text-xs text-green-700 font-bold uppercase tracking-wider">Verified Buyer</div>
                        </div>
                      </div>
                      <div className="bg-white p-1 rounded border border-gray-100">
                         {renderStars(r.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed italic mb-4">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
