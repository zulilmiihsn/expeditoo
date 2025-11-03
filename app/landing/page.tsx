"use client"

import { useRouter } from "next/navigation"
import { Package, Zap, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: Package,
      title: "Easy Shipping",
      description: "Ship parcels anywhere with just a few clicks",
    },
    {
      icon: TrendingUp,
      title: "Live Tracking",
      description: "Track your deliveries in real-time",
    },
    {
      icon: Zap,
      title: "Fast Auctions",
      description: "Bid on items and manage auctions seamlessly",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with buyers and sellers globally",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900">EXPEDITOO</span>
          </div>
          <Button onClick={() => router.push("/login")} variant="outline" className="rounded-full">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full">
        <section className="max-w-7xl mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Ship, Bid & Deliver
            <br />
            All in One Place
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl">
            EXPEDITOO is your complete logistics platform for shipping parcels, managing auctions, and tracking
            deliveries in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => router.push("/login")}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
              }}
              variant="outline"
              className="rounded-full px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-lg border border-neutral-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 text-lg">Join thousands of users shipping and trading with EXPEDITOO.</p>
            <Button
              onClick={() => router.push("/login")}
              className="rounded-full bg-white text-blue-600 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold"
            >
              Start Free Now
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-neutral-600">
          <p>&copy; 2025 EXPEDITOO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
