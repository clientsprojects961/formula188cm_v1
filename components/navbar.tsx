"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ShoppingBag, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Benefits", href: "#benefits" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Reviews", href: "#reviews" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">

          {/* Left Section */}
          <div className="flex items-center w-20 md:flex-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -ml-2 text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Perfect Center Premium Text Logo on Mobile, Left on Desktop */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:static md:inset-auto md:flex md:flex-1 md:justify-start">
            <Link
              href="/"
              className="pointer-events-auto flex items-center justify-center md:justify-start"
            >
              <span className="font-black uppercase tracking-[0.22em] text-[14px] md:text-[18px] text-[#111111] whitespace-nowrap leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]">
                FORMULA188CM
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-[2] justify-center items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-bold text-secondary hover:text-primary uppercase tracking-wider transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-2 w-20 md:flex-1">
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/checkout?quantity=1"
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border absolute w-full left-0 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-4 text-base font-bold text-foreground border-b border-border uppercase tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <button
              className="w-full mt-4 py-4 bg-[#FFD700] text-[#111111] rounded-xl text-center font-extrabold uppercase tracking-wider shadow-[0_4px_14px_rgba(255,215,0,0.3)] transition-transform hover:-translate-y-1"
              onClick={() => {
                setIsOpen(false)
                window.location.href = "/checkout?quantity=1"
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