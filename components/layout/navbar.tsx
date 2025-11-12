"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  userType?: "farmer" | "buyer"
  userName?: string
}

export function Navbar({ userType = "farmer", userName = "User" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            AgriBid
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {userType === "farmer" ? (
              <>
                <Link href="/farmer/dashboard" className="hover:opacity-80 transition">
                  Dashboard
                </Link>
                <Link href="/farmer/listings" className="hover:opacity-80 transition">
                  My Listings
                </Link>
                <Link href="/farmer/add-crop" className="hover:opacity-80 transition">
                  Add Crop
                </Link>
              </>
            ) : (
              <>
                <Link href="/buyer/dashboard" className="hover:opacity-80 transition">
                  Dashboard
                </Link>
                <Link href="/buyer/bids" className="hover:opacity-80 transition">
                  My Bids
                </Link>
                <Link href="/buyer/active" className="hover:opacity-80 transition">
                  Active Auctions
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm">{userName}</span>
            <Button variant="secondary" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-primary-foreground hover:text-primary rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {userType === "farmer" ? (
              <>
                <Link href="/farmer/dashboard" className="block py-2 hover:opacity-80">
                  Dashboard
                </Link>
                <Link href="/farmer/listings" className="block py-2 hover:opacity-80">
                  My Listings
                </Link>
                <Link href="/farmer/add-crop" className="block py-2 hover:opacity-80">
                  Add Crop
                </Link>
              </>
            ) : (
              <>
                <Link href="/buyer/dashboard" className="block py-2 hover:opacity-80">
                  Dashboard
                </Link>
                <Link href="/buyer/bids" className="block py-2 hover:opacity-80">
                  My Bids
                </Link>
                <Link href="/buyer/active" className="block py-2 hover:opacity-80">
                  Active Auctions
                </Link>
              </>
            )}
            <Button variant="secondary" size="sm" className="w-full mt-4" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
