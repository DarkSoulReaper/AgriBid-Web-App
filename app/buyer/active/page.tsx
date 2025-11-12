"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ActiveAuction {
  id: string
  cropName: string
  farmerName: string
  currentBid: number
  bidsCount: number
  daysLeft: number
  quantity: number
  unit: string
  location: string
}

const mockActiveAuctions: ActiveAuction[] = [
  {
    id: "1",
    cropName: "Basmati Rice",
    farmerName: "Rajesh Kumar",
    currentBid: 70,
    bidsCount: 12,
    daysLeft: 5,
    quantity: 1000,
    unit: "kg",
    location: "Punjab",
  },
  {
    id: "2",
    cropName: "Fresh Tomatoes",
    farmerName: "Priya Singh",
    currentBid: 18,
    bidsCount: 8,
    daysLeft: 3,
    quantity: 500,
    unit: "kg",
    location: "Maharashtra",
  },
  {
    id: "3",
    cropName: "Organic Onions",
    farmerName: "Amit Patel",
    currentBid: 32,
    bidsCount: 15,
    daysLeft: 7,
    quantity: 800,
    unit: "kg",
    location: "Karnataka",
  },
]

export default function ActiveAuctionsPage() {
  const [sortBy, setSortBy] = useState<"newest" | "ending-soon" | "price-low" | "price-high">("ending-soon")

  const sortedAuctions = [...mockActiveAuctions].sort((a, b) => {
    if (sortBy === "ending-soon") return a.daysLeft - b.daysLeft
    if (sortBy === "price-low") return a.currentBid - b.currentBid
    if (sortBy === "price-high") return b.currentBid - a.currentBid
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="buyer" userName="Ajay Mehta" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Active Auctions</h1>
          <p className="text-muted-foreground mt-2">
            {mockActiveAuctions.length} crops actively being bid on right now
          </p>
        </div>

        {/* Sort */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Showing {sortedAuctions.length} active auctions</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 h-11 rounded-md border border-input bg-background"
          >
            <option value="newest">Newest First</option>
            <option value="ending-soon">Ending Soon</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Auctions List - Card View for Better Details */}
        <div className="space-y-4">
          {sortedAuctions.map((auction) => (
            <Card key={auction.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* Crop Info */}
                  <div>
                    <p className="font-bold text-lg">{auction.cropName}</p>
                    <p className="text-sm text-muted-foreground">{auction.farmerName}</p>
                  </div>

                  {/* Details */}
                  <div className="text-sm">
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-semibold">
                      {auction.quantity} {auction.unit}
                    </p>
                  </div>

                  <div className="text-sm">
                    <p className="text-muted-foreground">Current Bid</p>
                    <p className="font-bold text-primary text-lg">₹{auction.currentBid}</p>
                  </div>

                  <div className="text-sm">
                    <p className="text-muted-foreground">Activity</p>
                    <p className="font-semibold">{auction.bidsCount} bids</p>
                  </div>

                  {/* Time and Action */}
                  <div className="flex flex-col sm:flex-row gap-2 items-end md:items-center">
                    <div className="text-sm flex-1">
                      <p className="text-muted-foreground">Ends In</p>
                      <p className={`font-bold text-lg ${auction.daysLeft <= 2 ? "text-destructive" : "text-accent"}`}>
                        {auction.daysLeft}d
                      </p>
                    </div>
                    <Link href={`/buyer/bid/${auction.id}`}>
                      <Button size="sm">Bid Now</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
