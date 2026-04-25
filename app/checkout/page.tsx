"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { generateOrderId, submitToGoogleSheets } from "@/lib/google-sheets"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const quantity = Number.parseInt(searchParams.get("quantity") || "1")

  const ONLINE_PRICE = 1099
  const COD_PRICE = 1299

  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  })

  const currentPrice = paymentMethod === "online" ? ONLINE_PRICE : paymentMethod === "cod" ? COD_PRICE : 0
  const totalPrice = currentPrice * quantity

  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 5)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentMethod) {
      setSubmitError("Please select a payment method")
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const orderId = generateOrderId()
      const sheetName = paymentMethod === "online" ? "Sheet7" : "Sheet9"
      const result = await submitToGoogleSheets(
        {
          ...formData,
          paymentMethod,
          quantity,
          totalPrice,
        },
        orderId,
        sheetName,
      )

      if (result.success) {
        localStorage.setItem(
          "checkoutData",
          JSON.stringify({
            ...formData,
            paymentMethod,
            quantity,
            totalPrice,
            orderId,
          }),
        )
        window.location.href = `/payment?total=${totalPrice}&method=${paymentMethod}&quantity=${quantity}&orderId=${orderId}`
      } else {
        setSubmitError(result.message)
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-black">
      <Navbar />

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 uppercase tracking-tight">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form - Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded text-red-900 text-sm">
                  <p className="font-bold mb-1">Error:</p>
                  <p>{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Payment Method */}
                <div className="p-6 bg-white border border-gray-200 rounded shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-4 border-2 rounded cursor-pointer transition-all ${
                        paymentMethod === "online" ? "border-black bg-gray-50" : "border-gray-200 hover:border-black"
                      }`}
                      onClick={() => setPaymentMethod("online")}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "online" ? "border-black" : "border-gray-400"}`}>
                          {paymentMethod === "online" && <div className="w-2 h-2 bg-black rounded-full" />}
                        </div>
                        <h3 className="font-bold text-base">Online Payment</h3>
                      </div>
                      <p className="text-sm text-gray-500 ml-7">UPI, QR Code, Bank Transfer</p>
                      <p className="text-lg font-bold text-black mt-2 ml-7">₹{ONLINE_PRICE}</p>
                    </div>

                    <div
                      className={`p-4 border-2 rounded cursor-pointer transition-all ${
                        paymentMethod === "cod" ? "border-black bg-gray-50" : "border-gray-200 hover:border-black"
                      }`}
                      onClick={() => setPaymentMethod("cod")}
                    >
                      <div className="flex items-center gap-3 mb-2">
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "cod" ? "border-black" : "border-gray-400"}`}>
                          {paymentMethod === "cod" && <div className="w-2 h-2 bg-black rounded-full" />}
                        </div>
                        <h3 className="font-bold text-base">Cash on Delivery</h3>
                      </div>
                      <p className="text-sm text-gray-500 ml-7">Pay on delivery</p>
                      <p className="text-lg font-bold text-black mt-2 ml-7">₹{COD_PRICE}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="p-6 bg-white border border-gray-200 rounded shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none w-full"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none w-full"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none w-full"
                      />
                    </div>

                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none w-full"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none w-full"
                      />
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none w-full bg-white text-black"
                      >
                        <option value="">Select State</option>
                        {[
                          "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
                          "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Delhi", "Goa", "Gujarat", 
                          "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", 
                          "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
                          "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", 
                          "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
                        ].map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      name="pinCode"
                      placeholder="PIN Code"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      required
                      maxLength={6}
                      pattern="[0-9]{6}"
                      className="px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none w-full"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50 hover:bg-gray-900"
                  disabled={!paymentMethod || isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Continue to Payment"}
                </button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="h-fit sticky top-24">
              <div className="p-6 bg-white border border-gray-200 rounded shadow-sm">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                <div className="flex justify-between border-b border-gray-200 pb-4 mb-4 text-sm">
                  <span className="text-gray-600 font-medium">Formula188CM × {quantity}</span>
                  <span className="font-bold">₹{currentPrice > 0 ? totalPrice : "-"}</span>
                </div>

                <div className="space-y-3 border-b border-gray-200 pb-4 mb-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-bold text-black">4-5 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-bold text-black uppercase">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-3xl font-bold text-black">
                    ₹{currentPrice > 0 ? totalPrice : "-"}
                  </span>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded text-sm text-gray-600 mb-4">
                  <p className="font-bold text-black mb-1">✓ Fast & Secure Checkout</p>
                  <p>Your payment information is encrypted and secure.</p>
                </div>

                {paymentMethod && (
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded text-sm text-gray-600">
                    <p className="font-bold text-black mb-1">Method Selected:</p>
                    <p>{paymentMethod === "online" ? "Online Payment (₹1099)" : "Cash on Delivery (₹1299)"}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-black font-bold uppercase">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
