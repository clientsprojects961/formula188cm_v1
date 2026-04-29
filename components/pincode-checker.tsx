"use client"
import { useState, useEffect } from "react"
import { MapPin, CheckCircle2 } from "lucide-react"

function getDelivery() {
  const today = new Date()
  
  const addDays = (d: Date, n: number) => {
    const r = new Date(d)
    r.setDate(r.getDate() + n)
    return r.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  // Uniform delivery times for all valid pincodes
  return {
    prepaid: `${addDays(today, 3)} – ${addDays(today, 4)}`,
    cod: `${addDays(today, 3)} – ${addDays(today, 5)}`
  }
}

export function PincodeChecker() {
  const [pincode, setPincode] = useState("")
  const [result, setResult] = useState<{ prepaid: string; cod: string } | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("delivery_pincode")
    if (saved) {
      setPincode(saved)
      setResult(getDelivery())
    }
  }, [])

  const check = () => {
    if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      setError("Enter a valid 6-digit pincode")
      setResult(null)
      return
    }
    setError("")
    setResult(getDelivery())
    localStorage.setItem("delivery_pincode", pincode)
  }

  return (
    <div className="my-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-500" />
        <input
          type="tel"
          maxLength={6}
          placeholder="Enter pincode"
          value={pincode}
          onChange={e => { setPincode(e.target.value); setResult(null); setError("") }}
          onKeyDown={e => e.key === "Enter" && check()}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none transition-colors bg-white focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
        />
        <button 
          onClick={check} 
          className="bg-gray-900 text-white border-none rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer transition-colors whitespace-nowrap hover:bg-gray-800"
        >
          Check
        </button>
      </div>

      {error && <p className="text-[12px] text-red-600 mt-2">{error}</p>}

      {result && (
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-start gap-2 text-[13px] text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <span>
              <strong>Prepaid:</strong> Delivers by <strong>{result.prepaid}</strong>
            </span>
          </div>
          <div className="flex items-start gap-2 text-[13px] text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <span>
              <strong>Cash on Delivery:</strong> {result.cod}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
