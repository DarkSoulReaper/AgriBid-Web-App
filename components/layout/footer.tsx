"use client"

import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl">AgriBid</h3>
            <p className="text-sm opacity-90">Connecting farmers and buyers through transparent online crop bidding</p>
          </div>

          {/* For Farmers */}
          <div className="space-y-4">
            <h4 className="font-semibold">For Farmers</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  List Your Crops
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* For Buyers */}
          <div className="space-y-4">
            <h4 className="font-semibold">For Buyers</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Browse Crops
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  How Bidding Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-75">© {currentYear} AgriBid. All rights reserved.</p>
            <div className="flex gap-4 text-sm opacity-75">
              <Link href="#" className="hover:opacity-100 transition">
                Twitter
              </Link>
              <Link href="#" className="hover:opacity-100 transition">
                LinkedIn
              </Link>
              <Link href="#" className="hover:opacity-100 transition">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
