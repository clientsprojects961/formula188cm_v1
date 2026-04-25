"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Benefits", href: "#benefits" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Reviews", href: "#reviews" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">

          {/* Mobile Menu Toggle (Left) */}
          <div className="flex-1 md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 -ml-2 text-black">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo (Centered on mobile, Left on Desktop) */}
          <div className="flex-shrink-0 flex items-center justify-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-1 md:justify-start">
            <Link href="/" className="flex items-center">
              <img src="/formula188cmlogo.jpeg" alt="Formula188" className="h-8 w-auto object-contain mix-blend-multiply" />
            </Link>
          </div>

          {/* Desktop Navigation (Center) */}
          <div className="hidden md:flex flex-2 justify-center items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-bold text-gray-600 hover:text-black uppercase tracking-wider transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Spacer (for balanced flex layout on desktop/mobile) */}
          <div className="flex-1 flex justify-end">
            {/* Intentionally left blank to balance the flex row */}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute w-full left-0 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-4 text-base font-bold text-black border-b border-gray-100 uppercase tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="w-full mt-4 py-4 bg-black text-white rounded text-center font-bold uppercase tracking-wider"
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
