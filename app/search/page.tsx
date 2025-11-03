"use client"

import { useState } from "react"
import { Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ListingCard } from "@/components/listing-card"
import { MainLayout } from "@/components/main-layout"
import { FilterTabs } from "@/components/filter-tabs"

const mockListings = [
  {
    id: "1",
    title: "Mixer, Vacuum +1 Item",
    price: 46,
    origin: "Aubagne (13400)",
    destination: "Paris (75011)",
    dates: "Oct 20 - Nov 3",
    size: "M" as const,
  },
  {
    id: "2",
    title: "44 Wheels",
    price: 58,
    origin: "Neuilly-sur-Seine",
    destination: "Saint-Laurent-du-Var (06700)",
    dates: "Oct 20 - Nov 3",
    size: "XL" as const,
  },
]

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "routes", label: "My Routes" },
  { id: "urgent", label: "Urgent" },
  { id: "near", label: "Near Me" },
]

export default function SearchPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <MainLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto pb-24 md:pb-8">
        {/* Search Section */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search location, item..."
              className="pl-11 h-12 rounded-lg text-base focus:ring-2 focus:ring-primary/50 transition-smooth"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-lg bg-primary text-primary-foreground border-primary hover:bg-primary/90 transition-smooth"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        <div className="mb-8">
          <FilterTabs tabs={FILTER_TABS} onTabChange={setActiveFilter} />
        </div>

        {/* Listings Section */}
        <div>
          <div className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="text-primary font-bold text-base">{mockListings.length}</span>
            <span>listings available</span>
          </div>
          <div className="space-y-4">
            {mockListings.map((listing) => (
              <div key={listing.id} className="animate-fade-in">
                <ListingCard {...listing} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
