"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface UserBid {
  id: string
  cropName: string
  farmerName: string
  yourBid: number
  currentBid: number
  status: "winning" | "outbid" | "sold" | "ended"
  daysLeft: number
  quantity: number
  unit: string
  location: string
}

const mockUserBids: UserBid[] = [
  {
    id: "1",
    cropName: "Basmati Rice",
    farmerName: "Rajesh Kumar",
    yourBid: 70,
    currentBid: 70,
    status: "winning",
    daysLeft: 5,
    quantity: 1000,
    unit: "kg",
    location: "Punjab",
  },
  {
    id: "2",
    cropName: "Fresh Tomatoes",
    farmerName: "Priya Singh",
    yourBid: 16,
    currentBid: 18,
    status: "outbid",
    daysLeft: 3,
    quantity: 500,
    unit: "kg",
    location: "Maharashtra",
  },
  {
    id: "3",
    cropName: "Organic Onions",
    farmerName: "Amit Patel",
    yourBid: 32,
    currentBid: 32,
    status: "sold",
    daysLeft: 0,
    quantity: 800,
    unit: "kg",
    location: "Karnataka",
  },
]

export default function MyBidsPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "winning" | "outbid" | "sold" | "ended">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBids = mockUserBids.filter((bid) => {
    const matchesSearch =
      bid.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || bid.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const winningCount = mockUserBids.filter((b) => b.status === "winning").length
  const outbidCount = mockUserBids.filter((b) => b.status === "outbid").length
  const soldCount = mockUserBids.filter((b) => b.status === "sold").length

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="buyer" userName="Ajay Mehta" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">My Bids</h1>
          <p className="text-muted-foreground mt-2">Track all your active and past bids</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Bids</p>
                <p className="text-3xl font-bold text-primary">{mockUserBids.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Winning</p>
                <p className="text-3xl font-bold text-accent">{winningCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Outbid</p>
                <p className="text-3xl font-bold text-secondary">{outbidCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sold</p>
                <p className="text-3xl font-bold text-primary">{soldCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Search */}
        <div className="mb-8 flex gap-4 flex-col sm:flex-row">
          <Input
            placeholder="Search by crop name or farmer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 h-11"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 h-11 rounded-md border border-input bg-background"
          >
            <option value="all">All Status</option>
            <option value="winning">Winning</option>
            <option value="outbid">Outbid</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        {/* Bids Grid */}
        {filteredBids.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No bids found</p>
              <Link href="/buyer/dashboard">
                <Button>Browse Available Crops</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBids.map((bid) => (
              <Card key={bid.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{bid.cropName}</CardTitle>
                      <CardDescription>{bid.farmerName}</CardDescription>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                        bid.status === "winning"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : bid.status === "outbid"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {bid.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Quantity</span>
                      <span className="font-semibold">
                        {bid.quantity} {bid.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="font-semibold">{bid.location}</span>
                    </div>
                  </div>

                  {/* Bid Information */}
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Your Bid</span>
                      <span className="font-bold">₹{bid.yourBid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Current Bid</span>
                      <span className="font-bold text-primary">₹{bid.currentBid}</span>
                    </div>
                  </div>

                  {/* Time or Status */}
                  {bid.status !== "ended" && bid.status !== "sold" && (
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">Time Left</span>
                      <span className={`font-semibold ${bid.daysLeft <= 2 ? "text-destructive" : ""}`}>
                        {bid.daysLeft} days
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Link href={`/buyer/bid/${bid.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        {bid.status === "outbid" ? "Place Higher Bid" : "View"}
                      </Button>
                    </Link>
                    {bid.status === "winning" && (
                      <Link href="#" className="flex-1">
                        <Button size="sm" className="w-full">
                          Pay Now
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
