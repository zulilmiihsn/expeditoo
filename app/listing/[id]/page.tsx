"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/main-layout"
import { MapPin, Ruler, Weight, MessageCircle, ChevronDown, ChevronUp } from "lucide-react"
import { ListingReviews } from "./reviews"

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const [showMore, setShowMore] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock data
  const listing = {
    id: params.id,
    title: "Mixer, Vacuum +1 Item",
    price: 46,
    sender: { name: "Cheryl S.", rating: 4.5, reviews: 12 },
    origin: "Secretary Office Building, 92120 Montrouge",
    destination: "Paris (75011)",
    dates: "October 20 - November 3",
    size: "M",
    quantity: 3,
    weight: "15 kg",
    dimensions: { length: 50, width: 30, height: 40 },
    description: "Lot of 3 items in good condition, never used. Price negotiable based on meeting point.",
    images: ["/kitchen-mixer.jpg", "/vacuum-cleaner.jpg", "/modern-kitchen-appliances.png"],
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
        {/* Image Carousel */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent-pink/20 mb-6 h-64 md:h-96">
          <div
            className="w-full h-full bg-cover bg-center transition-all"
            style={{ backgroundImage: `url('${listing.images[currentImageIndex]}')` }}
          />
          {listing.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {listing.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Main Info */}
        <div className="mb-6">
          <div className="flex justify-between items-start gap-4 mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{listing.title}</h1>
            <Badge className="bg-accent-pink/20 text-accent-pink text-lg px-4 py-2">${listing.price}</Badge>
          </div>

          {/* Sender info */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-pink" />
            <div className="flex-1">
              <p className="font-bold text-foreground">{listing.sender.name}</p>
              <p className="text-sm text-muted-foreground">
                ⭐ {listing.sender.rating}/5 - {listing.sender.reviews} reviews
              </p>
            </div>
          </div>

          {/* Route info */}
          <div className="space-y-2 mb-4">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium text-foreground">{listing.origin}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-medium text-foreground">{listing.destination}</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="text-sm text-muted-foreground mb-6">{listing.dates}</div>
        </div>

        {/* Item Details */}
        <div className="bg-card rounded-xl p-4 border border-border mb-6">
          <h2 className="font-bold text-foreground mb-4">Item Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{listing.quantity}</div>
              <p className="text-xs text-muted-foreground mt-1">Quantity</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{listing.size}</div>
              <p className="text-xs text-muted-foreground mt-1">Size</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Weight className="w-5 h-5 text-primary" />
              <div>
                <div className="font-bold text-primary">{listing.weight}</div>
                <p className="text-xs text-muted-foreground mt-1">Weight</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Ruler className="w-5 h-5 text-primary" />
              <div>
                <div className="font-bold text-primary">
                  {listing.dimensions.length}x{listing.dimensions.width}x{listing.dimensions.height}cm
                </div>
                <p className="text-xs text-muted-foreground mt-1">Dimensions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-xl p-4 border border-border mb-6">
          <h2 className="font-bold text-foreground mb-3">Description</h2>
          <p className="text-foreground">{listing.description}</p>
        </div>

        <ListingReviews />

        {/* More Info Collapsible */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-smooth mb-6 mt-6"
        >
          <span className="font-bold text-foreground">More Information</span>
          {showMore ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showMore && (
          <div className="bg-muted rounded-xl p-4 mb-6 space-y-2 text-sm text-foreground">
            <p>• No handling assistance</p>
            <p>• Signature not required</p>
            <p>• No custom packaging included</p>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="fixed bottom-20 md:bottom-6 left-0 right-0 md:relative px-4 md:px-0 space-y-2 mt-6">
          <Button className="w-full h-12 rounded-full text-base font-bold">Offer to Ship</Button>
          <Button variant="outline" className="w-full h-12 rounded-full text-base font-bold gap-2 bg-transparent">
            <MessageCircle className="w-5 h-5" />
            Send Message
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
