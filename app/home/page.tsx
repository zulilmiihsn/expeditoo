"use client"

import { useState } from "react"
import { Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ListingCard } from "@/components/listing-card"
import { MainLayout } from "@/components/main-layout"
import { ProtectedRoute } from "@/lib/protected-route"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  {
    id: "3",
    title: "Framed Garden Painting...",
    price: 66,
    origin: "Beaune (21200)",
    destination: "Paris (75016)",
    dates: "Flexible",
    size: "L" as const,
  },
]

function HomePageContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const tabs = [
    { id: "all", label: "All" },
    { id: "routes", label: "My Routes" },
    { id: "urgent", label: "Urgent" },
    { id: "near", label: "Near Me" },
    { id: "resources", label: "Resources" },
  ]

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
          </div>
          <Link href="/search">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-lg bg-muted border-border hover:bg-border hover:border-primary transition-smooth"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Tabs Section */}
        <div className="mb-8 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-smooth ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
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

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HomePageContent />
    </ProtectedRoute>
  )
}
