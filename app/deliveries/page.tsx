"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/main-layout"
import { StatusBadge } from "@/components/status-badge"
import Link from "next/link"
import { MapPin, Package, Clock, Zap } from "lucide-react"

interface DeliveryCard {
  id: string
  title: string
  origin: string
  destination: string
  dates: string
  status: "pending" | "accepted" | "picked_up" | "in_transit" | "delivered" | "cancelled"
  driver?: string
  price: number
}

const mockDeliveries: Record<string, DeliveryCard[]> = {
  active: [
    {
      id: "1",
      title: "Mixeur, Aspirateur +1 objet",
      origin: "Aubagne (13400)",
      destination: "Paris (75011)",
      dates: "Departure: Oct 20",
      status: "picked_up",
      driver: "Thomas M.",
      price: 46,
    },
    {
      id: "2",
      title: "44 jantes",
      origin: "Neuilly-sur-Seine",
      destination: "Saint-Laurent-du-Var (06700)",
      dates: "Departure: Oct 25",
      status: "accepted",
      driver: "Sophie L.",
      price: 58,
    },
  ],
  completed: [
    {
      id: "3",
      title: "Tableau encadré",
      origin: "Beaune (21200)",
      destination: "Paris (75016)",
      dates: "Livré: 18 oct.",
      status: "delivered",
      driver: "Jean P.",
      price: 66,
    },
  ],
  auctions: [
    {
      id: "4",
      title: "Vélo de route - Trek FX 3",
      origin: "Lyon",
      destination: "Marseille",
      dates: "Enchère gagnée",
      status: "pending",
      price: 125,
    },
  ],
}

function DeliveryCardComponent({ delivery, index }: { delivery: DeliveryCard; index: number }) {
  return (
    <Link href={`/deliveries/${delivery.id}`}>
      <div
        style={{
          animation: `fadeIn 0.4s ease-out ${index * 0.08}s both`,
        }}
        className="group bg-card rounded-2xl p-5 border border-border cursor-pointer hover:border-primary/40 transition-smooth hover:shadow-md hover:shadow-primary/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent-green/0 group-hover:from-primary/5 group-hover:via-primary/0 group-hover:to-accent-green/5 transition-smooth pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-smooth truncate">
                {delivery.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 group-hover:text-foreground/70 transition-smooth">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {delivery.origin} → {delivery.destination}
                </span>
              </div>
            </div>
            <Badge className="bg-primary/90 text-primary-foreground font-bold px-3 py-1 group-hover:bg-primary transition-smooth flex-shrink-0">
              {delivery.price}€
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground/70 transition-smooth">
              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{delivery.dates}</span>
            </div>

            <div className="h-px bg-gradient-to-r from-border via-border to-transparent group-hover:from-primary/20 group-hover:via-primary/10 group-hover:to-transparent transition-smooth" />

            <div className="flex justify-between items-center">
              <StatusBadge status={delivery.status} />
              {delivery.driver && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground/70 transition-smooth">
                  <Zap className="w-3 h-3" />
                  <span>{delivery.driver}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function DeliveriesPage() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto h-full flex flex-col">
        <div className="p-4 md:p-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              My deliveries
            </h1>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-4 md:px-6 pt-4 border-b border-border bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/30">
            <TabsList className="w-full justify-start bg-transparent p-0 h-auto gap-2 border-0">
              <TabsTrigger
                value="active"
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/8 border border-transparent data-[state=active]:border-primary/20 transition-all duration-200 hover:bg-muted/50"
              >
                Active Deliveries
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/8 border border-transparent data-[state=active]:border-primary/20 transition-all duration-200 hover:bg-muted/50"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="auctions"
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/8 border border-transparent data-[state=active]:border-primary/20 transition-all duration-200 hover:bg-muted/50"
              >
                Auctions
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">
              <TabsContent value="active" className="space-y-4 mt-0">
                {mockDeliveries.active.length > 0 ? (
                  mockDeliveries.active.map((delivery, index) => (
                    <DeliveryCardComponent key={delivery.id} delivery={delivery} index={index} />
                  ))
                ) : (
                  <div
                    style={{ animation: "fadeIn 0.5s ease-out" }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <div className="bg-muted/50 p-4 rounded-full mb-4">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">No active deliveries</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-0">
                {mockDeliveries.completed.length > 0 ? (
                  mockDeliveries.completed.map((delivery, index) => (
                    <DeliveryCardComponent key={delivery.id} delivery={delivery} index={index} />
                  ))
                ) : (
                  <div
                    style={{ animation: "fadeIn 0.5s ease-out" }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <div className="bg-muted/50 p-4 rounded-full mb-4">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">No completed deliveries</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="auctions" className="space-y-4 mt-0">
                {mockDeliveries.auctions.length > 0 ? (
                  mockDeliveries.auctions.map((delivery, index) => (
                    <DeliveryCardComponent key={delivery.id} delivery={delivery} index={index} />
                  ))
                ) : (
                  <div
                    style={{ animation: "fadeIn 0.5s ease-out" }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <div className="bg-muted/50 p-4 rounded-full mb-4">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">No auction deliveries</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  )
}
