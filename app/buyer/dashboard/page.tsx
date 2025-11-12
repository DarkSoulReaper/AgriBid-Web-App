"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Auction {
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
}

const mockAuctions: Auction[] = [
  {
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
  },
  {
    id: "2",
    cropName: "Fresh Tomatoes",
    farmerName: "Priya Singh",
    quantity: 500,
    unit: "kg",
    basePrice: 15,
    currentBid: 18,
    location: "Maharashtra",
    daysLeft: 3,
    bidsCount: 8,
  },
  {
    id: "3",
    cropName: "Organic Onions",
    farmerName: "Amit Patel",
    quantity: 800,
    unit: "kg",
    basePrice: 25,
    currentBid: 32,
    location: "Karnataka",
    daysLeft: 7,
    bidsCount: 15,
  },
  {
    id: "4",
    cropName: "Potatoes",
    farmerName: "Harjeet Singh",
    quantity: 1200,
    unit: "kg",
    basePrice: 18,
    currentBid: 21,
    location: "Himachal Pradesh",
    daysLeft: 2,
    bidsCount: 9,
  },
]

export default function BuyerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "ending-soon" | "price-low" | "price-high">("newest")

  const filteredAuctions = mockAuctions
    .filter(
      (auction) =>
        auction.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "ending-soon") return a.daysLeft - b.daysLeft
      if (sortBy === "price-low") return a.currentBid - b.currentBid
      if (sortBy === "price-high") return b.currentBid - a.currentBid
      return 0
    })

  const totalAuctions = mockAuctions.length
  const activeAuctions = mockAuctions.filter((a) => a.daysLeft > 0).length

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="buyer" userName="Ajay Mehta" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Available Crops</h1>
          <p className="text-muted-foreground mt-2">Browse and bid on fresh crops from farmers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Available Auctions</p>
                <p className="text-3xl font-bold text-primary">{totalAuctions}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Active Auctions</p>
                <p className="text-3xl font-bold text-accent">{activeAuctions}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Your Pending Bids</p>
                <p className="text-3xl font-bold text-secondary">3</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex gap-4 flex-col sm:flex-row">
          <Input
            placeholder="Search by crop name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 h-11"
          />
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

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="text-lg">{auction.cropName}</CardTitle>
                  <CardDescription>{auction.farmerName}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                {/* Details */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <span className="font-semibold">
                      {auction.quantity} {auction.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="font-semibold">{auction.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Base Price</span>
                    <span className="font-semibold">₹{auction.basePrice}</span>
                  </div>
                </div>

                {/* Current Bid */}
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Current Bid</p>
                  <p className="text-2xl font-bold text-primary">₹{auction.currentBid}</p>
                </div>

                {/* Time and Bids */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Time Left</p>
                    <p className={`font-semibold ${auction.daysLeft <= 2 ? "text-destructive" : ""}`}>
                      {auction.daysLeft} days
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Bids</p>
                    <p className="font-semibold">{auction.bidsCount}</p>
                  </div>
                </div>

                {/* Place Bid Button */}
                <Link href={`/buyer/bid/${auction.id}`} className="block pt-2">
                  <Button className="w-full" size="sm">
                    Place Bid
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No auctions found matching your search</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
