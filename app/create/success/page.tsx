"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Copy, Share2, Home, Eye } from "lucide-react"

export default function AuctionSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)

  // In a real app, this would come from the URL params or API
  const auctionId = searchParams.get("id") || "12345"
  const paymentLink = `${typeof window !== "undefined" ? window.location.origin : ""}/auction/${auctionId}/payment`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Auction Listing",
          text: "Check out my auction listing on EXPEDITOO",
          url: paymentLink,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4 pb-24 md:pb-6">
        <Card className="max-w-lg w-full p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Auction Created Successfully!</h1>
            <p className="text-muted-foreground">
              Your auction listing has been published and is now live. Share the link below to start receiving bids.
            </p>
          </div>

          {/* Auction Details */}
          <div className="bg-muted rounded-lg p-4 space-y-2 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Auction ID:</span>
              <span className="font-mono font-semibold">#{auctionId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-600 dark:text-green-400 font-semibold">Active</span>
            </div>
          </div>

          {/* Payment Link */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">Share Your Auction</Label>
            <div className="flex gap-2">
              <div className="flex-1 bg-muted rounded-lg px-4 py-3 text-sm font-mono text-muted-foreground truncate">
                {paymentLink}
              </div>
              <Button
                onClick={handleCopyLink}
                variant="outline"
                size="icon"
                className="h-12 w-12 flex-shrink-0 bg-transparent"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button onClick={() => router.push(`/listing/${auctionId}`)} className="w-full h-12 rounded-full">
              <Eye className="w-5 h-5 mr-2" />
              View Auction
            </Button>
            <Button onClick={handleShare} variant="outline" className="w-full h-12 rounded-full bg-transparent">
              <Share2 className="w-5 h-5 mr-2" />
              Share Auction
            </Button>
            <Button onClick={() => router.push("/home")} variant="ghost" className="w-full h-12 rounded-full">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Next steps:</strong> You'll receive notifications when users place bids on your auction. You can
              manage your auction from the "My Deliveries" section.
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
