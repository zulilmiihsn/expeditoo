"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, MapPin, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/main-layout"
import { ProtectedRoute } from "@/lib/protected-route"
import { useRouter } from "next/navigation"
import { FilterSheet } from "@/components/filter-sheet"

const mockListings = [
  {
    id: "1",
    title: "Kitchen Mixer & Vacuum Cleaner",
    description: "2 household appliances",
    currentBid: 46,
    bids: 12,
    origin: { city: "Aubagne", zip: "13400", lat: 43.2925, lng: 5.5708 },
    destination: { city: "Paris", zip: "75011", lat: 48.8566, lng: 2.3522 },
    deadline: "2 days left",
    size: "M",
    distance: "780 km",
    status: "active",
  },
  {
    id: "2",
    title: "44 Car Wheels - Bulk Delivery",
    description: "Large shipment of wheels",
    currentBid: 58,
    bids: 8,
    origin: { city: "Neuilly-sur-Seine", zip: "92200", lat: 48.8846, lng: 2.2686 },
    destination: { city: "Saint-Laurent-du-Var", zip: "06700", lat: 43.6947, lng: 7.2621 },
    deadline: "5 days left",
    size: "XL",
    distance: "950 km",
    status: "active",
  },
  {
    id: "3",
    title: "Framed Garden Painting",
    description: "Delicate artwork",
    currentBid: 66,
    bids: 15,
    origin: { city: "Beaune", zip: "21200", lat: 47.0256, lng: 4.8389 },
    destination: { city: "Paris", zip: "75016", lat: 48.8566, lng: 2.3522 },
    deadline: "Flexible",
    size: "L",
    distance: "310 km",
    status: "hot",
  },
]

function HomePageContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    sizes: [] as string[],
    dateRange: "",
  })

  const filteredListings = mockListings.filter((listing) => {
    const priceMatch = listing.currentBid >= filters.priceRange[0] && listing.currentBid <= filters.priceRange[1]
    const sizeMatch = filters.sizes.length === 0 || filters.sizes.includes(listing.size)
    return priceMatch && sizeMatch
  })

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] pb-16 lg:pb-0">
        <div className="bg-background border-b">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by location, item, or route..."
                  className="pl-12 h-12 rounded-lg text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-lg bg-transparent"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h2 className="font-semibold text-lg">Active Auctions</h2>
              <p className="text-sm text-muted-foreground">Browse and place your bid on delivery opportunities</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {filteredListings.map((listing, index) => (
                <div
                  key={listing.id}
                  onClick={() => router.push(`/listing/${listing.id}`)}
                  className="group bg-card border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-200 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{listing.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-3 shrink-0 text-xs font-medium">
                      {listing.size}
                    </Badge>
                  </div>

                  {/* Route - cleaner design */}
                  <div className="space-y-3 mb-5 pl-1">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">{listing.origin.city}</span>
                        <span className="text-muted-foreground text-sm ml-2">({listing.origin.zip})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">{listing.destination.city}</span>
                        <span className="text-muted-foreground text-sm ml-2">({listing.destination.zip})</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer - improved spacing */}
                  <div className="flex items-center justify-between pt-5 border-t">
                    <div>
                      <div className="text-3xl font-bold text-primary">€{listing.currentBid}</div>
                      <div className="text-xs text-muted-foreground mt-1">{listing.bids} bids • Current highest</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{listing.deadline}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{listing.distance}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block w-1/2 border-l relative bg-muted/10">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Map placeholder with better design */}
              <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/40 relative">
                {/* Center info */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center space-y-4 p-8 bg-background/80 backdrop-blur-sm rounded-2xl border shadow-lg">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Auction Map</h3>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        View routes and locations for all active bidding opportunities
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mock markers - more polished */}
                {filteredListings.map((listing, index) => (
                  <div
                    key={listing.id}
                    className="absolute pointer-events-auto"
                    style={{
                      left: `${25 + index * 20}%`,
                      top: `${35 + index * 15}%`,
                    }}
                  >
                    <div
                      className="w-12 h-12 bg-primary rounded-full border-4 border-background shadow-xl cursor-pointer hover:scale-125 transition-transform duration-200 flex items-center justify-center"
                      onClick={() => router.push(`/listing/${listing.id}`)}
                    >
                      <span className="text-xs font-bold text-primary-foreground">€{listing.currentBid}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </MainLayout>
  )
}

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HomePageContent />
    </ProtectedRoute>
  )
}
