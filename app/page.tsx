"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-balance text-primary">
            Fair Crop Pricing Through Transparent Bidding
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            AgriBid connects farmers and buyers directly, ensuring fair prices and market transparency for agricultural
            products
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap pt-4">
          <Link href="/auth/login">
            <Button size="lg" className="px-8">
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">100%</div>
            <p className="text-sm text-muted-foreground">Transparent Pricing</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">Real-time</div>
            <p className="text-sm text-muted-foreground">Live Bidding Updates</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">Secure</div>
            <p className="text-sm text-muted-foreground">Trusted Platform</p>
          </div>
        </div>
      </div>
    </div>
  )
}
