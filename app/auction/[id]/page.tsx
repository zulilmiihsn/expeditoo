"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/main-layout"
import { Clock } from "lucide-react"

interface Bid {
  bidder: string
  amount: number
  time: string
  avatar?: string
}

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [bidAmount, setBidAmount] = useState("")
  const [bids, setBids] = useState<Bid[]>([
    { bidder: "Thomas M.", amount: 125, time: "2 hours ago" },
    { bidder: "Sarah P.", amount: 120, time: "4 hours ago" },
    { bidder: "Marie D.", amount: 115, time: "6 hours ago" },
  ])

  const auction = {
    id: params.id,
    title: "Road Bike - Trek FX 3",
    image: "/classic-bicycle.png",
    currentBid: 125,
    timeRemaining: "2h 34m",
    status: "active" as const,
    minimumIncrease: 5,
    bidCount: bids.length,
  }

  const handlePlaceBid = () => {
    if (bidAmount && Number(bidAmount) > auction.currentBid) {
      setBids([
        {
          bidder: "You",
          amount: Number(bidAmount),
          time: "Just now",
        },
        ...bids,
      ])
      setBidAmount("")
    }
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent-pink/20 mb-6 h-64 md:h-96">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${auction.image}')` }} />
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <Badge className={auction.status === "active" ? "bg-green-500" : "bg-gray-500"}>
              {auction.status === "active" ? "Auction Active" : "Ended"}
            </Badge>
          </div>
        </div>

        {/* Title and Timer */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{auction.title}</h1>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-primary/20 to-accent-pink/20 rounded-lg p-4 flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Time Remaining</p>
              <p className="text-xl font-bold text-primary">{auction.timeRemaining}</p>
            </div>
          </div>
        </div>

        {/* Current Bid */}
        <div className="bg-card rounded-lg p-4 border border-border mb-6">
          <p className="text-sm text-muted-foreground mb-1">Current Bid</p>
          <div className="flex items-end gap-2">
            <div className="text-4xl font-bold text-primary">${auction.currentBid}</div>
            <p className="text-sm text-muted-foreground mb-1">{auction.bidCount} bids</p>
          </div>
        </div>

        {/* Bid Input */}
        <div className="bg-card rounded-lg p-4 border border-border mb-6 space-y-3">
          <p className="text-sm font-medium text-foreground">Place Your Bid</p>
          <p className="text-xs text-muted-foreground">Minimum bid: ${auction.currentBid + auction.minimumIncrease}</p>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                type="number"
                placeholder={String(auction.currentBid + auction.minimumIncrease)}
                className="pl-8 h-12 rounded-full"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min={auction.currentBid + auction.minimumIncrease}
              />
            </div>
            <Button
              onClick={handlePlaceBid}
              disabled={!bidAmount || Number(bidAmount) <= auction.currentBid}
              className="h-12 rounded-full px-6 font-bold"
            >
              Bid
            </Button>
          </div>
        </div>

        {/* Bid History */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h2 className="font-bold text-foreground mb-4">Bid History</h2>
          <div className="space-y-3">
            {bids.map((bid, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-pink flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{bid.bidder}</p>
                    <p className="text-xs text-muted-foreground">{bid.time}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-primary">${bid.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="fixed bottom-20 md:bottom-6 left-0 right-0 md:relative px-4 md:px-0 mt-6">
          <Button
            onClick={handlePlaceBid}
            disabled={!bidAmount || Number(bidAmount) <= auction.currentBid}
            className="w-full h-12 rounded-full text-base font-bold"
          >
            Place Bid
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
