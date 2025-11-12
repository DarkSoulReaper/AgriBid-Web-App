"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddCropPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    unit: "kg",
    basePrice: "",
    location: "",
    harvestDate: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement crop submission logic
    console.log("Add crop:", formData)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/farmer/listings")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="farmer" userName="Rajesh Kumar" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">List a New Crop</h1>
          <p className="text-muted-foreground mt-2">Add details about your crop and set a starting bid price</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Crop Details</CardTitle>
            <CardDescription>Provide information about your crop for buyers to bid on</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Crop Name */}
              <div className="space-y-2">
                <Label htmlFor="cropName">Crop Name *</Label>
                <Input
                  id="cropName"
                  name="cropName"
                  placeholder="e.g., Basmati Rice, Tomatoes"
                  value={formData.cropName}
                  onChange={handleChange}
                  className="h-11"
                  required
                />
              </div>

              {/* Quantity & Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="100"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full h-11 px-3 rounded-md border border-input bg-background"
                    required
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="ton">Metric Ton (t)</option>
                    <option value="bag">Bag</option>
                    <option value="piece">Piece</option>
                  </select>
                </div>
              </div>

              {/* Base Price */}
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price (₹) *</Label>
                <Input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  placeholder="25"
                  value={formData.basePrice}
                  onChange={handleChange}
                  className="h-11"
                  required
                />
                <p className="text-xs text-muted-foreground">Buyers will bid starting from this price</p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City/District, State"
                  value={formData.location}
                  onChange={handleChange}
                  className="h-11"
                  required
                />
              </div>

              {/* Harvest Date */}
              <div className="space-y-2">
                <Label htmlFor="harvestDate">Expected Harvest Date *</Label>
                <Input
                  id="harvestDate"
                  name="harvestDate"
                  type="date"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  className="h-11"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Add any additional details about your crop (quality, certification, etc.)"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-input bg-background text-foreground resize-none"
                  rows={4}
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" size="lg" disabled={isLoading} className="flex-1">
                  {isLoading ? "Publishing..." : "Publish Listing"}
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => router.back()} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
