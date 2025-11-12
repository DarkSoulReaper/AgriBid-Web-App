"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface CropBid {
  id: string
  cropName: string
  bidderName: string
  bidAmount: number
  timestamp: string
  status: "pending" | "accepted" | "rejected"
  bidderLocation: string
}

const mockAllBids: CropBid[] = [
  {
    id: "1",
    cropName: "Basmati Rice",
    bidderName: "Ajay Mehta",
    bidAmount: 70,
    timestamp: "2 hours ago",
    status: "pending",
    bidderLocation: "Delhi",
  },
  {
    id: "2",
    cropName: "Basmati Rice",
    bidderName: "Priya Sharma",
    bidAmount: 68,
    timestamp: "4 hours ago",
    status: "pending",
    bidderLocation: "Mumbai",
  },
  {
    id: "3",
    cropName: "Fresh Tomatoes",
    bidderName: "Rohan Singh",
    bidAmount: 18,
    timestamp: "1 hour ago",
    status: "accepted",
    bidderLocation: "Bangalore",
  },
  {
    id: "4",
    cropName: "Fresh Tomatoes",
    bidderName: "Neha Verma",
    bidAmount: 16,
    timestamp: "3 hours ago",
    status: "pending",
    bidderLocation: "Pune",
  },
  {
    id: "5",
    cropName: "Corn",
    bidderName: "Vikram Patel",
    bidAmount: 24,
    timestamp: "1 day ago",
    status: "rejected",
    bidderLocation: "Ahmedabad",
  },
]

export default function FarmerBidsPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "accepted" | "rejected">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBids = mockAllBids.filter((bid) => {
    const matchesSearch =
      bid.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.bidderName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || bid.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const pendingCount = mockAllBids.filter((b) => b.status === "pending").length
  const acceptedCount = mockAllBids.filter((b) => b.status === "accepted").length
  const rejectedCount = mockAllBids.filter((b) => b.status === "rejected").length

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="farmer" userName="Rajesh Kumar" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Bids Received</h1>
            <p className="text-muted-foreground mt-2">Manage all bids across your crop listings</p>
          </div>
          <Link href="/farmer/listings">
            <Button variant="outline">Back to Listings</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Bids</p>
                <p className="text-3xl font-bold text-primary">{mockAllBids.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-secondary">{pendingCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-3xl font-bold text-accent">{acceptedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-3xl font-bold text-destructive">{rejectedCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Search */}
        <div className="mb-8 flex gap-4 flex-col sm:flex-row">
          <Input
            placeholder="Search by crop name or bidder..."
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
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Bids Table */}
        {filteredBids.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No bids found</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Crop Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Bidder Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Location</th>
                      <th className="text-left py-3 px-4 font-semibold">Bid Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Time</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBids.map((bid) => (
                      <tr key={bid.id} className="border-b border-border hover:bg-muted/50 transition">
                        <td className="py-4 px-4 font-medium">{bid.cropName}</td>
                        <td className="py-4 px-4">{bid.bidderName}</td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{bid.bidderLocation}</td>
                        <td className="py-4 px-4 font-semibold text-accent">₹{bid.bidAmount}</td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{bid.timestamp}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              bid.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : bid.status === "accepted"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Link href={`/farmer/bids/${bid.cropName.replace(/\s+/g, "-")}`}>
                            <Button variant="outline" size="sm">
                              View Crop Bids
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
        )}
      </main>
    </div>
  )
}
