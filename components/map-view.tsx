"use client"

import { MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Listing {
  id: string
  title: string
  price: number
  origin: string
  destination: string
  dates: string
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL"
  lat: number
  lng: number
}

interface MapViewProps {
  listings: Listing[]
}

export function MapView({ listings }: MapViewProps) {
  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative w-full h-96 bg-muted rounded-xl overflow-hidden border border-border">
        {/* Placeholder map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
          {/* Map markers */}
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              className="absolute animate-fade-in"
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + (index % 2) * 20}%`,
              }}
            >
              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-background border border-border rounded-lg p-2 shadow-xl whitespace-nowrap">
                    <p className="text-xs font-semibold">{listing.title}</p>
                    <p className="text-xs text-muted-foreground">€{listing.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map overlay text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground text-center">
              Interactive map view
              <br />
              <span className="text-xs">Showing {listings.length} listings</span>
            </p>
          </div>
        </div>
      </div>

      {/* Listings below map */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Listings on Map</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {listings.map((listing) => (
            <Link key={listing.id} href={`/listing/${listing.id}`}>
              <Card className="p-4 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm line-clamp-1">{listing.title}</h4>
                  <span className="text-primary font-bold text-sm">€{listing.price}</span>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {listing.origin} → {listing.destination}
                  </p>
                  <p>{listing.dates}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
