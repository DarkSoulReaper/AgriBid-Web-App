"use client"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Crop {
  id: string
  name: string
  quantity: number
  unit: string
  basePrice: number
  status: "active" | "sold" | "expired"
  bids: number
  highestBid: number
}

const mockListings: Crop[] = [
  {
    id: "1",
    name: "Wheat",
    quantity: 100,
    unit: "kg",
    basePrice: 25,
    status: "active",
    bids: 5,
    highestBid: 28,
  },
  {
    id: "2",
    name: "Tomatoes",
    quantity: 500,
    unit: "kg",
    basePrice: 15,
    status: "active",
    bids: 8,
    highestBid: 18,
  },
  {
    id: "3",
    name: "Corn",
    quantity: 200,
    unit: "kg",
    basePrice: 20,
    status: "sold",
    bids: 12,
    highestBid: 24,
  },
]

export default function FarmerDashboard() {
  const totalListings = mockListings.length
  const activeListing = mockListings.filter((c) => c.status === "active").length
  const totalBids = mockListings.reduce((sum, c) => sum + c.bids, 0)
  const avgPrice = mockListings.reduce((sum, c) => sum + c.highestBid, 0) / mockListings.length

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="farmer" userName="Rajesh Kumar" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Farmer Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your crop listings and track bids</p>
          </div>
          <Link href="/farmer/add-crop">
            <Button size="lg" className="gap-2">
              <span>+</span> Add New Crop
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Listings</p>
                <p className="text-3xl font-bold text-primary">{totalListings}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-3xl font-bold text-accent">{activeListing}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Bids</p>
                <p className="text-3xl font-bold text-secondary">{totalBids}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Avg Bid Price</p>
                <p className="text-3xl font-bold text-primary">₹{avgPrice.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Listings</CardTitle>
            <CardDescription>Track bids and manage your crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Crop Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Quantity</th>
                    <th className="text-left py-3 px-4 font-semibold">Base Price</th>
                    <th className="text-left py-3 px-4 font-semibold">Highest Bid</th>
                    <th className="text-left py-3 px-4 font-semibold">Bids</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockListings.map((crop) => (
                    <tr key={crop.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="py-4 px-4 font-medium">{crop.name}</td>
                      <td className="py-4 px-4">
                        {crop.quantity} {crop.unit}
                      </td>
                      <td className="py-4 px-4">₹{crop.basePrice}</td>
                      <td className="py-4 px-4 font-semibold text-accent">₹{crop.highestBid}</td>
                      <td className="py-4 px-4">{crop.bids}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            crop.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : crop.status === "sold"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link href={`/farmer/bids/${crop.name.replace(/\s+/g, "-")}`}>
                          <Button variant="outline" size="sm">
                            View Bids
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            View all listings in{" "}
            <Link href="/farmer/listings" className="text-primary hover:underline">
              My Listings
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
