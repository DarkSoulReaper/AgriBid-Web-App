"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-12 pb-12 text-center space-y-4">
        {icon && <div className="text-5xl mb-4 flex justify-center">{icon}</div>}
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        {actionLabel && actionHref && (
          <div className="pt-4">
            <Link href={actionHref}>
              <Button>{actionLabel}</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
