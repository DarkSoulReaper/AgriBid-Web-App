"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: "primary" | "secondary" | "accent"
}

export function StatCard({ label, value, icon, trend, color = "primary" }: StatCardProps) {
  const colorClass = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  }[color]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">{label}</p>
            {icon && <div className="text-2xl">{icon}</div>}
          </div>
          <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
          {trend && (
            <p className={`text-xs ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
              {trend.isPositive ? "↑" : "↓"} {trend.value}%
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
