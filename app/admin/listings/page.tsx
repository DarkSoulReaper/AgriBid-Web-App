"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface AdminListing {
  id: string
  cropName: string
  farmerName: string
  quantity: number
  basePrice: number
  currentBid: number
  status: "active" | "sold" | "expired" | "flagged"
  bidsCount: number
  listedDate: string
}

const mockListings: AdminListing[] = [
  {
    id: "1",
    cropName: "Basmati Rice",
    farmerName: "Rajesh Kumar",
    quantity: 1000,
    basePrice: 60,
    currentBid: 68,
    status: "active",
    bidsCount: 12,
    listedDate: "2024-11-01",
  },
  {
    id: "2",
    cropName: "Fresh Tomatoes",
    farmerName: "Priya Singh",
    quantity: 500,
    basePrice: 15,
    currentBid: 18,
    status: "active",
    bidsCount: 8,
    listedDate: "2024-11-02",
  },
  {
    id: "3",
    cropName: "Suspicious Listing",
    farmerName: "Unknown Farmer",
    quantity: 2000,
    basePrice: 100,
    currentBid: 105,
    status: "flagged",
    bidsCount: 2,
    listedDate: "2024-11-05",
  },
]

export default function AdminListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "sold" | "expired" | "flagged">("all")

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch =
      listing.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="hover:opacity-80 transition">
                AgriBid Admin
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Admin User</span>
              <Button variant="secondary" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link href="/admin/dashboard" className="text-primary hover:underline text-sm mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Manage Listings</h1>
          <p className="text-muted-foreground mt-2">Review and moderate crop listings</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-4 flex-col sm:flex-row">
          <Input
            placeholder="Search listings..."
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
            <option value="flagged">Flagged</option>
          </select>
        </div>

        {/* Listings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Listings ({filteredListings.length})</CardTitle>
            <CardDescription>All crop listings on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Crop</th>
                    <th className="text-left py-3 px-4 font-semibold">Farmer</th>
                    <th className="text-left py-3 px-4 font-semibold">Quantity</th>
                    <th className="text-left py-3 px-4 font-semibold">Base Price</th>
                    <th className="text-left py-3 px-4 font-semibold">Current Bid</th>
                    <th className="text-left py-3 px-4 font-semibold">Bids</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="py-4 px-4 font-medium">{listing.cropName}</td>
                      <td className="py-4 px-4">{listing.farmerName}</td>
                      <td className="py-4 px-4">{listing.quantity} kg</td>
                      <td className="py-4 px-4">₹{listing.basePrice}</td>
                      <td className="py-4 px-4 font-semibold text-primary">₹{listing.currentBid}</td>
                      <td className="py-4 px-4">{listing.bidsCount}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            listing.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : listing.status === "sold"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : listing.status === "flagged"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {listing.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                          {listing.status === "flagged" && (
                            <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                              Remove
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
