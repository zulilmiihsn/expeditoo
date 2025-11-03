"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Package } from "lucide-react"

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect to home after 2.5 seconds
    const timer = setTimeout(() => {
      router.push("/home")
    }, 2500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl animate-pulse" />
          <div className="relative bg-white rounded-3xl p-8 shadow-2xl animate-scale-in">
            <Package className="w-20 h-20 text-blue-600" strokeWidth={2} />
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center space-y-2 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-white tracking-tight">EXPEDITOO</h1>
          <p className="text-blue-100 text-lg font-medium">Ship, Bid & Deliver</p>
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-4 mt-8 animate-fade-in-up delay-300">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-white/80 text-sm font-medium">Loading your experience...</p>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/50 to-transparent" />
    </div>
  )
}
