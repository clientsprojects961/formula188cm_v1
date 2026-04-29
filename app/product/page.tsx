"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Star, StarHalf, Plus, Minus, Share2, Calendar, CheckCircle2 } from "lucide-react"

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeVariant, setActiveVariant] = useState("starter")
  const MAX_QUANTITY = 4

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= MAX_QUANTITY) {
      setQuantity(value)
    }
  }

  // Delivery date logic
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 5)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short"
  })

  const price = 1999
  const discountedPrice = 1099
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

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>("details")

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const reviewBase = [
    { name: "Himanshu", text: "This is really incredible, I followed the methods for 5-6 months and gained height from 5'5 to 5'9. All I did was follow consistently." },
    { name: "Rohit", text: "Using it for 3 months. I grew from 5'3 to 5'5. Just stay consistent and you will see results too." },
    { name: "Arjun", text: "This really works! I was stuck at 5'4 for years, and in 4 months I reached 5'7. Just need patience and discipline." },
    { name: "Sahil", text: "I didn’t believe at first, but after 3 months I can see clear results. Went from 5'6 to 5'8." },
    { name: "Ritika", text: "Tried everything before, nothing worked. This actually did. From 5'2 to 5'5 in 5 months!" }
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
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 fill-black text-black" />)}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-black text-black" />}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 fill-gray-200 text-gray-300" />)}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT COLUMN (60%) - Image Gallery */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full aspect-square bg-[#F9F9F9] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center relative">
               <img
                src={productSlides[activeImageIndex] || "/placeholder.svg"}
                alt="Product image"
                className="w-full h-full object-contain p-4 mix-blend-multiply"
              />
            </div>

            {/* Thumbnails Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
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
              
              {/* Breadcrumb */}
              <nav className="text-sm text-gray-500 mb-2">
                <Link href="/" className="hover:text-black">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-black">Supplements</span>
              </nav>

              {/* Title & Badges */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-3 leading-tight tracking-tight">
                  Formula188CM Natural Height Growth Support
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-[13px] text-gray-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Doctor's Choice
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-gray-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    100% Natural
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-gray-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Clinically Tested
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {renderStars(4.9)}
                  <a href="#reviews" className="text-sm text-black font-semibold underline underline-offset-4 hover:text-gray-600">
                    4,789 reviews
                  </a>
                </div>
              </div>

              {/* Price Block */}
              <div className="bg-[#F9F9F9] p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl font-bold text-black">₹{discountedPrice}</span>
                  <span className="text-lg text-gray-400 line-through font-medium">₹{price}</span>
                  <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {discountPercent}% OFF
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">MRP (Inclusive of all Taxes)</p>
              </div>

              {/* Variant Selector */}
              <div>
                <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-wide">Select Size</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setActiveVariant("starter")}
                    className={`p-3 rounded-lg border-2 text-left relative transition-colors ${activeVariant === "starter" ? "border-black bg-white" : "border-gray-200 bg-gray-50 hover:bg-white"}`}
                  >
                    <div className="font-bold text-black text-sm mb-1">Starter Pack - 30 Days</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-black">₹1,099</span>
                      <span className="text-gray-400 line-through text-xs">₹1,999</span>
                    </div>
                    <div className="text-green-700 text-xs font-bold mt-1">Save ₹900</div>
                  </button>
                  <button 
                    onClick={() => setActiveVariant("results")}
                    className={`p-3 rounded-lg border-2 text-left relative transition-colors ${activeVariant === "results" ? "border-black bg-white" : "border-gray-200 bg-gray-50 hover:bg-white"}`}
                  >
                    <div className="absolute -top-3 right-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">POPULAR</div>
                    <div className="font-bold text-black text-sm mb-1">Results Pack - 90 Days</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-black">₹2,899</span>
                      <span className="text-gray-400 line-through text-xs">₹5,997</span>
                    </div>
                    <div className="text-green-700 text-xs font-bold mt-1">Save ₹3,098</div>
                  </button>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 font-mono text-xs font-bold px-3 py-1.5 rounded text-black">CODE: EXTRA10</div>
                    <p className="text-sm text-gray-600">Get Extra 10% off on Prepaid</p>
                  </div>
                  <button className="text-xs font-bold text-black border-b border-black pb-0.5 hover:text-gray-600">COPY</button>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-wide">Quantity</h3>
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

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <Link
                  href={`/checkout?quantity=${quantity}`}
                  className="w-full flex items-center justify-center py-4 bg-black text-white font-bold text-sm uppercase tracking-wider rounded transition-transform active:scale-95 hover:bg-gray-900"
                >
                  Add to Cart
                </Link>
                <Link
                  href={`/checkout?quantity=${quantity}`}
                  className="w-full flex items-center justify-center py-4 bg-white text-black border border-black font-bold text-sm uppercase tracking-wider rounded transition-colors hover:bg-gray-50"
                >
                  Buy It Now
                </Link>
                <div className="flex items-center justify-center gap-2 pt-2 text-sm text-gray-500">
                  <Share2 className="w-4 h-4" />
                  <button className="hover:text-black underline underline-offset-4">Share this product</button>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <Calendar className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-black font-medium">Estimated Delivery by <span className="font-bold">{formattedDeliveryDate}</span></p>
              </div>

            </div>
          </div>
        </div>

        {/* Accordions Section */}
        <div className="mt-16 border-t border-gray-200">
          
          {/* Details */}
          <div className="border-b border-gray-200">
            <button 
              className="w-full flex items-center justify-between py-6 text-left"
              onClick={() => toggleAccordion("details")}
            >
              <h2 className="text-lg font-bold text-black">Product Details</h2>
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
              <h2 className="text-lg font-bold text-black">Ingredients</h2>
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
              <h2 className="text-lg font-bold text-black">How To Use</h2>
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
        <div id="reviews" className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 capitalize tracking-tight">Real Customers Real Reviews</h2>
            <p className="text-gray-500 font-medium">Trusted by 4,874 Customers</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Reviews Summary */}
            <div className="w-full lg:w-1/3">
              <h3 className="text-xl font-bold text-black mb-2">Customer Reviews</h3>
              <div className="flex items-center gap-3 mb-6">
                {renderStars(4.9)}
                <span className="text-sm text-gray-500">Based on 4,789 reviews</span>
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
                    <div className="w-12 text-gray-600">{row.stars} stars</div>
                    <div className="flex-1 h-2 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-black rounded" style={{ width: `${row.pct}%` }}></div>
                    </div>
                    <div className="w-8 text-right text-gray-500">{row.pct}%</div>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 border border-black font-bold text-sm text-black uppercase tracking-wider rounded hover:bg-gray-50 transition-colors">
                Write a Review
              </button>
            </div>

            {/* Review Cards Grid/Carousel */}
            <div className="w-full lg:w-2/3">
              <div className="flex lg:grid lg:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 no-scrollbar snap-x">
                {reviews.slice(0, 4).map((r, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[85%] lg:w-full snap-center bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg uppercase">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-black text-sm">{r.name}</div>
                          <div className="text-xs text-gray-500">Verified Buyer</div>
                        </div>
                      </div>
                      <div className="bg-white p-1 rounded border border-gray-100">
                         {renderStars(r.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed italic mb-4">"{r.text}"</p>
                    <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-black uppercase">Formula188CM</span>
                      <img src="/c1.jpeg" className="w-8 h-8 rounded object-cover border border-gray-200 mix-blend-multiply" alt="thumb" />
                    </div>
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
