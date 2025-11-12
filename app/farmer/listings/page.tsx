"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Crop {
  id: string
  name: string
  quantity: number
  unit: string
  basePrice: number
  location: string
  status: "active" | "sold" | "expired"
  bids: number
  highestBid: number
  daysLeft: number
}

const mockListings: Crop[] = [
  {
    id: "1",
    name: "Basmati Rice",
    quantity: 1000,
    unit: "kg",
    basePrice: 60,
    location: "Punjab",
    status: "active",
    bids: 12,
    highestBid: 68,
    daysLeft: 5,
  },
  {
    id: "2",
    name: "Fresh Tomatoes",
    quantity: 500,
    unit: "kg",
    basePrice: 15,
    location: "Maharashtra",
    status: "active",
    bids: 8,
    highestBid: 18,
    daysLeft: 3,
  },
  {
    id: "3",
    name: "Corn",
    quantity: 2000,
    unit: "kg",
    basePrice: 20,
    location: "Rajasthan",
    status: "sold",
    bids: 15,
    highestBid: 24,
    daysLeft: 0,
  },
  {
    id: "4",
    name: "Onions",
    quantity: 800,
    unit: "kg",
    basePrice: 25,
    location: "Karnataka",
    status: "expired",
    bids: 5,
    highestBid: 26,
    daysLeft: -1,
  },
]

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "sold" | "expired">("all")

  const filteredListings = mockListings.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || crop.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="farmer" userName="Rajesh Kumar" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">My Listings</h1>
            <p className="text-muted-foreground mt-2">Manage all your crop listings</p>
          </div>
          <Link href="/farmer/add-crop">
            <Button size="lg" className="gap-2">
              <span>+</span> Add New Crop
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-4 flex-col sm:flex-row">
          <Input
            placeholder="Search by crop name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 h-11"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 h-11 rounded-md border border-input bg-background"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No listings found</p>
              <Link href="/farmer/add-crop">
                <Button>Add your first crop</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((crop) => (
              <Card key={crop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{crop.name}</CardTitle>
                      <CardDescription>{crop.location}</CardDescription>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        crop.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : crop.status === "sold"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {crop.status.toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Quantity */}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <span className="font-semibold">
                      {crop.quantity} {crop.unit}
                    </span>
                  </div>

                  {/* Base Price */}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Base Price</span>
                    <span className="font-semibold">₹{crop.basePrice}</span>
                  </div>

                  {/* Highest Bid */}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Highest Bid</span>
                    <span className="font-semibold text-accent">₹{crop.highestBid}</span>
                  </div>

                  {/* Bids Count */}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Bids</span>
                    <span className="font-semibold">{crop.bids}</span>
                  </div>

                  {/* Days Left */}
                  {crop.status === "active" && (
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="text-sm text-muted-foreground">Days Left</span>
                      <span className={`font-semibold ${crop.daysLeft <= 2 ? "text-destructive" : ""}`}>
                        {crop.daysLeft} days
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Link href={`/farmer/bids/${crop.name.replace(/\s+/g, "-")}`}>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        View Bids
                      </Button>
                    </Link>
                    {crop.status === "active" && (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Edit
                      </Button>
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
