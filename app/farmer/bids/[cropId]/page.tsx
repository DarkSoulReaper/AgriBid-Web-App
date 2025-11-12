"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Bid {
  id: string
  bidderName: string
  bidderEmail: string
  bidderLocation: string
  bidAmount: number
  timestamp: string
  status: "pending" | "accepted" | "rejected"
  bidderPhone?: string
}

const mockCropDetails = {
  cropName: "Basmati Rice",
  quantity: 1000,
  unit: "kg",
  basePrice: 60,
  location: "Punjab",
  daysLeft: 5,
}

const mockBids: Bid[] = [
  {
    id: "1",
    bidderName: "Ajay Mehta",
    bidderEmail: "ajay.mehta@email.com",
    bidderLocation: "Delhi",
    bidAmount: 70,
    timestamp: "2 hours ago",
    status: "pending",
    bidderPhone: "+91-9876543210",
  },
  {
    id: "2",
    bidderName: "Priya Sharma",
    bidderEmail: "priya.sharma@email.com",
    bidderLocation: "Mumbai",
    bidAmount: 68,
    timestamp: "4 hours ago",
    status: "pending",
    bidderPhone: "+91-9123456789",
  },
  {
    id: "3",
    bidderName: "Vikram Singh",
    bidderEmail: "vikram.singh@email.com",
    bidderLocation: "Chandigarh",
    bidAmount: 65,
    timestamp: "6 hours ago",
    status: "rejected",
    bidderPhone: "+91-8765432109",
  },
  {
    id: "4",
    bidderName: "Neha Verma",
    bidderEmail: "neha.verma@email.com",
    bidderLocation: "Haryana",
    bidAmount: 62,
    timestamp: "1 day ago",
    status: "pending",
    bidderPhone: "+91-9012345678",
  },
]

export default function CropBidsPage({ params }: { params: { cropId: string } }) {
  const [selectedBid, setSelectedBid] = useState<string | null>(null)
  const cropName = mockCropDetails.cropName

  const highestBid = Math.max(...mockBids.map((b) => b.bidAmount))
  const pendingBids = mockBids.filter((b) => b.status === "pending")
  const acceptedBids = mockBids.filter((b) => b.status === "accepted")

  const handleAcceptBid = (bidId: string) => {
    // TODO: Implement accept bid logic
    console.log("Accept bid:", bidId)
  }

  const handleRejectBid = (bidId: string) => {
    // TODO: Implement reject bid logic
    console.log("Reject bid:", bidId)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="farmer" userName="Rajesh Kumar" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link href="/farmer/bids" className="text-primary hover:underline text-sm mb-4 inline-block">
          ← Back to All Bids
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Crop & Bid Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Crop Information Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">{cropName}</CardTitle>
                <CardDescription>Bids for your crop listing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Crop Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="text-xl font-bold">
                      {mockCropDetails.quantity} {mockCropDetails.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-xl font-bold">{mockCropDetails.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Base Price</p>
                    <p className="text-xl font-bold">₹{mockCropDetails.basePrice}/kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Left</p>
                    <p className="text-xl font-bold text-accent">{mockCropDetails.daysLeft} days</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Highest Bid Summary */}
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Highest Bid Received</p>
                  <p className="text-3xl font-bold text-accent">₹{highestBid}</p>
                  <p className="text-xs text-muted-foreground mt-2">from {mockBids[0].bidderName}</p>
                </div>
              </CardContent>
            </Card>

            {/* All Bids List */}
            <Card>
              <CardHeader>
                <CardTitle>All Bids ({mockBids.length})</CardTitle>
                <CardDescription>Sort by highest bid first</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockBids
                  .sort((a, b) => b.bidAmount - a.bidAmount)
                  .map((bid) => (
                    <div
                      key={bid.id}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 transition cursor-pointer"
                      onClick={() => setSelectedBid(bid.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-lg">{bid.bidderName}</p>
                          <p className="text-sm text-muted-foreground">{bid.bidderLocation}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-accent">₹{bid.bidAmount}</p>
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${
                              bid.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : bid.status === "accepted"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{bid.timestamp}</p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Selected Bid Details */}
          <div>
            {selectedBid ? (
              <Card className="shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle>Bid Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const bid = mockBids.find((b) => b.id === selectedBid)
                    if (!bid) return null

                    return (
                      <div className="space-y-6">
                        {/* Bidder Information */}
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Bidder Name</p>
                            <p className="font-semibold text-lg">{bid.bidderName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="font-medium break-all">{bid.bidderEmail}</p>
                          </div>
                          {bid.bidderPhone && (
                            <div>
                              <p className="text-xs text-muted-foreground">Phone</p>
                              <p className="font-medium">{bid.bidderPhone}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-muted-foreground">Location</p>
                            <p className="font-medium">{bid.bidderLocation}</p>
                          </div>
                        </div>

                        {/* Bid Information */}
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-2">Bid Amount</p>
                          <p className="text-3xl font-bold text-accent">₹{bid.bidAmount}</p>
                          <p className="text-xs text-muted-foreground mt-3">Placed {bid.timestamp}</p>
                        </div>

                        {/* Action Buttons */}
                        {bid.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAcceptBid(bid.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              Accept Bid
                            </Button>
                            <Button onClick={() => handleRejectBid(bid.id)} variant="destructive" className="flex-1">
                              Reject
                            </Button>
                          </div>
                        )}

                        {bid.status === "accepted" && (
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                            <p className="text-sm font-semibold text-green-800 dark:text-green-200">Bid Accepted</p>
                          </div>
                        )}

                        {bid.status === "rejected" && (
                          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                            <p className="text-sm font-semibold text-red-800 dark:text-red-200">Bid Rejected</p>
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            ) : (
              <Card className="text-center py-12 sticky top-24">
                <CardContent>
                  <p className="text-muted-foreground">Select a bid to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
