"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BidDetails {
  id: string
  cropName: string
  farmerName: string
  quantity: number
  unit: string
  basePrice: number
  currentBid: number
  location: string
  daysLeft: number
  bidsCount: number
  bidHistory: Array<{ bidder: string; amount: number; timestamp: string }>
}

const mockBidDetails: BidDetails = {
  id: "1",
  cropName: "Basmati Rice",
  farmerName: "Rajesh Kumar",
  quantity: 1000,
  unit: "kg",
  basePrice: 60,
  currentBid: 68,
  location: "Punjab",
  daysLeft: 5,
  bidsCount: 12,
  bidHistory: [
    { bidder: "Buyer A", amount: 68, timestamp: "2 hours ago" },
    { bidder: "Buyer B", amount: 65, timestamp: "4 hours ago" },
    { bidder: "You", amount: 62, timestamp: "6 hours ago" },
  ],
}

export default function BidPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [bidAmount, setBidAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const auction = mockBidDetails

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const bid = Number.parseFloat(bidAmount)
    if (bid <= auction.currentBid) {
      setError(`Your bid must be higher than the current bid (₹${auction.currentBid})`)
      return
    }

    setIsLoading(true)
    // TODO: Implement bid submission
    console.log("Bid submitted:", bidAmount)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/buyer/bids")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="buyer" userName="Ajay Mehta" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link href="/buyer/dashboard" className="text-primary hover:underline text-sm mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Crop Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Details Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <div>
                  <CardTitle className="text-3xl">{auction.cropName}</CardTitle>
                  <CardDescription>from {auction.farmerName}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Crop Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="text-2xl font-bold">
                      {auction.quantity} {auction.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-2xl font-bold">{auction.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Base Price</p>
                    <p className="text-2xl font-bold">₹{auction.basePrice}/kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Left</p>
                    <p className={`text-2xl font-bold ${auction.daysLeft <= 2 ? "text-destructive" : "text-accent"}`}>
                      {auction.daysLeft} days
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Bid History */}
                <div>
                  <h3 className="font-semibold mb-4">Bid History</h3>
                  <div className="space-y-3">
                    {auction.bidHistory.map((bid, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{bid.bidder}</p>
                          <p className="text-xs text-muted-foreground">{bid.timestamp}</p>
                        </div>
                        <p className="text-lg font-bold text-primary">₹{bid.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bid Form */}
          <div>
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle>Place Your Bid</CardTitle>
                <CardDescription>Current highest bid</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitBid} className="space-y-6">
                  {/* Current Bid Display */}
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Current Highest Bid</p>
                    <p className="text-3xl font-bold text-primary">₹{auction.currentBid}</p>
                    <p className="text-xs text-muted-foreground mt-2">Total bids: {auction.bidsCount}</p>
                  </div>

                  {/* Bid Amount Input */}
                  <div className="space-y-2">
                    <Label htmlFor="bidAmount">Your Bid Amount (₹)</Label>
                    <Input
                      id="bidAmount"
                      type="number"
                      placeholder={`Minimum ${auction.currentBid + 1}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="h-11 text-lg"
                      min={auction.currentBid + 1}
                      step="1"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Minimum bid: ₹{auction.currentBid + 1}</p>
                  </div>

                  {/* Error Message */}
                  {error && <p className="text-sm text-destructive">{error}</p>}

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full h-11" disabled={isLoading || !bidAmount}>
                    {isLoading ? "Placing Bid..." : "Place Bid"}
                  </Button>

                  {/* Info */}
                  <p className="text-xs text-muted-foreground text-center">
                    By placing a bid, you agree to complete this purchase at your bid price
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
