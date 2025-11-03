"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MainLayout } from "@/components/main-layout"
import { Timeline } from "@/components/timeline"
import { MessageCircle, MapPin, Phone, Mail, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DeliveryDetailPage({ params }: { params: { id: string } }) {
  const [chatMessage, setChatMessage] = useState("")

  const delivery = {
    id: params.id,
    title: "Mixer, Vacuum +1 Item",
    status: "picked_up",
    price: 46,
    origin: "Aubagne (13400)",
    destination: "Paris (75011)",
    dates: "Departure: Oct 20 - Arrival: Oct 25",
    driver: {
      name: "Thomas M.",
      rating: 4.8,
      reviews: 24,
      phone: "+33 6 12 34 56 78",
      email: "thomas@example.com",
      avatar: "/placeholder.svg?key=driver1",
      vehicle: "Peugeot Partner White",
    },
    timeline: [
      {
        label: "Package Created",
        date: "Oct 18 at 2:30 PM",
        status: "completed" as const,
        icon: "📦",
      },
      {
        label: "Driver Accepted",
        date: "Oct 18 at 3:45 PM",
        status: "completed" as const,
        icon: "✓",
      },
      {
        label: "Package Picked Up",
        date: "Oct 20 at 9:15 AM",
        status: "completed" as const,
        icon: "🚚",
      },
      {
        label: "In Transit",
        date: "In progress",
        status: "active" as const,
        icon: "🗺️",
      },
      {
        label: "Delivery Expected",
        date: "Oct 25 by 6:00 PM",
        status: "pending" as const,
        icon: "📍",
      },
    ],
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{delivery.title}</h1>
          <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">${delivery.price}</Badge>
        </div>

        {/* Route info */}
        <div className="bg-card rounded-lg p-4 border border-border mb-6">
          <div className="space-y-3">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium text-foreground">{delivery.origin}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-medium text-foreground">{delivery.destination}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground pt-2 border-t border-border">{delivery.dates}</div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-card rounded-lg p-4 border border-border mb-6">
          <h2 className="font-bold text-foreground mb-4">Driver</h2>
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-pink flex-shrink-0"
              style={{
                backgroundImage: `url('${delivery.driver.avatar}')`,
                backgroundSize: "cover",
              }}
            />
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{delivery.driver.name}</h3>
              <p className="text-sm text-muted-foreground">
                ⭐ {delivery.driver.rating}/5 - {delivery.driver.reviews} reviews
              </p>
              <p className="text-xs text-muted-foreground mt-1">{delivery.driver.vehicle}</p>
            </div>
            <Button size="icon" variant="outline" className="rounded-full bg-transparent">
              <Star className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <a
              href={`tel:${delivery.driver.phone}`}
              className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-all duration-200"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{delivery.driver.phone}</span>
            </a>
            <a
              href={`mailto:${delivery.driver.email}`}
              className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-all duration-200"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{delivery.driver.email}</span>
            </a>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-card rounded-lg p-4 border border-border mb-6">
          <h2 className="font-bold text-foreground mb-6">Tracking</h2>
          <Timeline events={delivery.timeline} />
        </div>

        {/* Chat Section */}
        <div className="fixed bottom-20 md:bottom-6 left-0 right-0 md:relative px-4 md:px-0">
          <Button className="w-full h-12 rounded-full text-base font-bold gap-2">
            <MessageCircle className="w-5 h-5" />
            Contact Driver
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
