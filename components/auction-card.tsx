import Link from "next/link"
import { Clock, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AuctionCardProps {
  id: string
  title: string
  image?: string
  currentBid: number
  bidCount: number
  timeRemaining: string
  status: "active" | "closed"
}

export function AuctionCard({ id, title, image, currentBid, bidCount, timeRemaining, status }: AuctionCardProps) {
  return (
    <Link href={`/auction/${id}`}>
      <div className="bg-card rounded-lg overflow-hidden card-shadow border border-border cursor-pointer hover:shadow-lg transition-all duration-200">
        {image && (
          <div
            className="w-full h-40 bg-gradient-to-br from-primary to-accent-pink"
            style={{ backgroundImage: `url('${image}')`, backgroundSize: "cover" }}
          />
        )}
        <div className="p-4">
          <h3 className="font-semibold text-foreground truncate mb-3">{title}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-bold text-lg text-primary">${currentBid}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {bidCount} bids
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {timeRemaining}
            </div>
            <Badge className={status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
              {status === "active" ? "Active" : "Ended"}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}
