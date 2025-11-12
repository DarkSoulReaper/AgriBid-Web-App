"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface AdminStats {
  totalUsers: number
  totalFarmers: number
  totalBuyers: number
  totalListings: number
  activeListing: number
  totalBids: number
  totalRevenue: number
}

interface User {
  id: string
  name: string
  email: string
  type: "farmer" | "buyer"
  joinedDate: string
  status: "active" | "inactive" | "banned"
}

const mockStats: AdminStats = {
  totalUsers: 1245,
  totalFarmers: 456,
  totalBuyers: 789,
  totalListings: 892,
  activeListing: 234,
  totalBids: 5678,
  totalRevenue: 45000000,
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    type: "farmer",
    joinedDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya@example.com",
    type: "farmer",
    joinedDate: "2024-02-20",
    status: "active",
  },
  {
    id: "3",
    name: "Ajay Mehta",
    email: "ajay@example.com",
    type: "buyer",
    joinedDate: "2024-01-10",
    status: "active",
  },
  {
    id: "4",
    name: "Amit Patel",
    email: "amit@example.com",
    type: "farmer",
    joinedDate: "2024-03-05",
    status: "inactive",
  },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState<"all" | "farmer" | "buyer">("all")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = userTypeFilter === "all" || user.type === userTypeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-bold text-xl">AgriBid Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">Admin User</span>
              <Button variant="secondary" size="sm" onClick={() => console.log("Logout")}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage users, listings, and platform activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-primary">{mockStats.totalUsers}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Farmers</p>
                <p className="text-3xl font-bold text-accent">{mockStats.totalFarmers}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Buyers</p>
                <p className="text-3xl font-bold text-secondary">{mockStats.totalBuyers}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-primary">₹{(mockStats.totalRevenue / 100000).toFixed(1)}L</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Listings</p>
                <p className="text-3xl font-bold text-primary">{mockStats.totalListings}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-3xl font-bold text-accent">{mockStats.activeListing}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Bids</p>
                <p className="text-3xl font-bold text-secondary">{mockStats.totalBids}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage platform users and their permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 h-11"
              />
              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value as any)}
                className="px-4 h-11 rounded-md border border-input bg-background"
              >
                <option value="all">All Users</option>
                <option value="farmer">Farmers</option>
                <option value="buyer">Buyers</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="py-4 px-4 font-medium">{user.name}</td>
                      <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-4 px-4 capitalize">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-muted">{user.type}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{user.joinedDate}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : user.status === "inactive"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {user.status !== "banned" && (
                            <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                              Ban
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

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Manage Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Review and manage crop listings</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Listings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">View Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Generate and analyze reports</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Reports
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Configure platform settings</p>
              <Button variant="outline" className="w-full bg-transparent">
                Go to Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
