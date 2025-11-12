"use client"

import { useState } from "react"
import Link from "next/link"

interface SidebarProps {
  userType: "farmer" | "buyer"
  activeTab?: string
}

export function Sidebar({ userType, activeTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const farmerLinks = [
    { href: "/farmer/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/farmer/listings", label: "My Listings", icon: "🌾" },
    { href: "/farmer/bids", label: "Bids Received", icon: "🤝" },
    { href: "/farmer/add-crop", label: "Add Crop", icon: "➕" },
  ]

  const buyerLinks = [
    { href: "/buyer/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/buyer/bids", label: "My Bids", icon: "🤝" },
    { href: "/buyer/active", label: "Active Auctions", icon: "⏱️" },
  ]

  const links = userType === "farmer" ? farmerLinks : buyerLinks

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static left-0 top-0 h-screen md:h-auto w-64 bg-primary text-primary-foreground transform transition-transform duration-300 z-30 md:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center md:hidden mb-8">
            <h2 className="font-bold text-xl">AgriBid</h2>
            <button onClick={() => setIsOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg transition ${
                  activeTab === link.href ? "bg-primary-foreground text-primary" : "hover:bg-primary-foreground/20"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Overlay for mobile */}
        {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
      </div>
    </>
  )
}
