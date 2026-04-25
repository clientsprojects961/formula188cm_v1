"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CheckCircle2, Building2, QrCode, Copy, Check } from "lucide-react"

const WHATSAPP_NUMBER = "918989252740"
const UPI_ID = "ayushyaduvanshi56441@okicici"
const UPI_MERCHANT_NAME = "Ayush Kumar"

function PaymentContent() {
  const searchParams = useSearchParams()
  const total = searchParams.get("total") || "0"
  const method = searchParams.get("method") || "online"
  const quantity = searchParams.get("quantity") || "1"

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [copiedUPI, setCopiedUPI] = useState(false)

  const handlePaymentSubmit = (paymentType: string) => {
    setSelectedMethod(paymentType)
  }

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopiedUPI(true)
    setTimeout(() => setCopiedUPI(false), 2000)
  }

  const openWhatsApp = () => {
    const message = `Hi, I need help with my Formula188CM order (₹${total})`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank")
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 text-black font-sans">
        <Navbar />
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center bg-white p-8 border border-gray-200 rounded shadow-sm">
            <div className="mb-6 flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-black" />
            </div>
            <h1 className="text-3xl font-bold mb-2 uppercase tracking-tight">Order Successful!</h1>
            <p className="text-gray-600 mb-6 text-sm">
              Thank you for your order. You will receive a call from our team shortly with your order details.
            </p>
            <div className="border-y border-gray-200 py-4 mb-6">
              <p className="text-3xl font-bold text-black mb-1">₹{total}</p>
              <p className="text-sm text-gray-500 font-medium">Quantity: {quantity}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={openWhatsApp}
                className="w-full py-4 bg-green-600 text-white font-bold uppercase tracking-wider rounded transition-colors hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Image src="/wp.png" alt="WhatsApp" width={20} height={20} />
                Chat on WhatsApp
              </button>
              <Link
                href="/"
                className="w-full py-4 border border-black text-black font-bold uppercase tracking-wider rounded transition-colors hover:bg-gray-50"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </section>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      <Navbar />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2 uppercase tracking-tight">Complete Your Payment</h1>
            <p className="text-gray-500">Choose your preferred payment method below</p>
          </div>

          {/* Order Details Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-white border border-gray-200 rounded text-center shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Amount</p>
              <p className="text-xl font-bold">₹{total}</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded text-center shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Quantity</p>
              <p className="text-xl font-bold">{quantity}</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded text-center shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Delivery</p>
              <p className="text-xl font-bold">{method === "online" ? "3-4 Days" : "3-5 Days"}</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded text-center shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Method</p>
              <p className="text-xl font-bold capitalize">{method}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
            {/* Payment Methods */}
            {method === "online" && (
              <div className="space-y-6">
                
                {/* Manual UPI Payment */}
                <div
                  className={`p-6 border-2 rounded cursor-pointer transition-all ${
                    selectedMethod === "upi" ? "border-black bg-gray-50" : "border-gray-200 hover:border-black"
                  }`}
                  onClick={() => handlePaymentSubmit("upi")}
                >
                  <h3 className="text-lg font-bold mb-2">Manual UPI Transfer</h3>
                  <p className="text-sm text-gray-500 mb-4">Copy the UPI ID and send payment from your bank app</p>

                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded mb-4">
                    <span className="font-mono text-base font-bold">{UPI_ID}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyUPI()
                      }}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                      aria-label="Copy UPI ID"
                    >
                      {copiedUPI ? <Check className="w-5 h-5 text-black" /> : <Copy className="w-5 h-5 text-gray-500" />}
                    </button>
                  </div>

                  {selectedMethod === "upi" && (
                    <button
                      onClick={() => setTimeout(() => setShowSuccess(true), 1500)}
                      className="w-full py-4 bg-black text-white font-bold uppercase tracking-wider rounded transition-colors hover:bg-gray-900"
                    >
                      I've Sent the Payment
                    </button>
                  )}
                </div>

                {/* Bank Transfer */}
                <div
                  className={`p-6 border-2 rounded cursor-pointer transition-all ${
                    selectedMethod === "bank" ? "border-black bg-gray-50" : "border-gray-200 hover:border-black"
                  }`}
                  onClick={() => handlePaymentSubmit("bank")}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-black" />
                    <h3 className="text-lg font-bold">Bank Transfer</h3>
                  </div>

                  <div className="bg-white border border-gray-200 rounded p-4 space-y-3 text-sm mb-4">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Bank Name</span>
                      <span className="font-bold">Yes Bank</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Account Number</span>
                      <span className="font-bold">067961900000815</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">IFSC Code</span>
                      <span className="font-bold">YESB0000679</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account Type</span>
                      <span className="font-bold">Current</span>
                    </div>
                  </div>

                  {selectedMethod === "bank" && (
                    <button
                      onClick={() => setTimeout(() => setShowSuccess(true), 1500)}
                      className="w-full py-4 bg-black text-white font-bold uppercase tracking-wider rounded transition-colors hover:bg-gray-900"
                    >
                      Confirm Payment Sent
                    </button>
                  )}
                </div>

                {/* QR Code Payment */}
                <div
                  className={`p-6 border-2 rounded cursor-pointer transition-all ${
                    selectedMethod === "qr" ? "border-black bg-gray-50" : "border-gray-200 hover:border-black"
                  }`}
                  onClick={() => handlePaymentSubmit("qr")}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <QrCode className="w-6 h-6 text-black" />
                    <h3 className="text-lg font-bold">QR Code Payment</h3>
                  </div>

                  {selectedMethod === "qr" && (
                    <div className="text-center pt-2">
                      <Link
                        href={`/payment/qr?total=${total}&quantity=${quantity}`}
                        className="inline-block w-full py-4 bg-black text-white font-bold uppercase tracking-wider rounded transition-colors hover:bg-gray-900"
                      >
                        Generate QR Code
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            )}

            {method === "cod" && (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-black mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Cash on Delivery</h2>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto text-sm">
                  You will pay ₹{total} when you receive your order. Our delivery partner will collect the payment.
                </p>

                <button
                  onClick={() => setTimeout(() => setShowSuccess(true), 1500)}
                  className="w-full md:w-auto px-10 py-4 bg-black text-white font-bold uppercase tracking-wider rounded transition-colors hover:bg-gray-900"
                >
                  Confirm COD Order
                </button>
              </div>
            )}
          </div>
          
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen font-bold uppercase">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
