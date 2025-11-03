import Link from "next/link"
import { MapPin, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ListingCardProps {
  id: string
  title: string
  price: number
  origin: string
  destination: string
  dates: string
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL"
  avatar?: string
}

const sizeColors: Record<string, string> = {
  XS: "bg-blue-50 text-blue-700 border border-blue-200",
  S: "bg-green-50 text-green-700 border border-green-200",
  M: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  L: "bg-orange-50 text-orange-700 border border-orange-200",
  XL: "bg-red-50 text-red-700 border border-red-200",
  XXL: "bg-purple-50 text-purple-700 border border-purple-200",
}

export function ListingCard({ id, title, price, origin, destination, dates, size, avatar }: ListingCardProps) {
  return (
    <Link href={`/listing/${id}`}>
      <div className="bg-card rounded-lg p-5 card-shadow border border-border cursor-pointer hover:border-primary/30 transition-smooth group">
        <div className="flex gap-4 mb-4">
          {/* Avatar */}
          {avatar && (
            <div
              className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent-green flex-shrink-0 shadow-sm group-hover:shadow-md transition-smooth"
              style={{ backgroundImage: `url('${avatar}')`, backgroundSize: "cover" }}
            />
          )}

          {/* Title and Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate text-base leading-snug group-hover:text-primary transition-smooth">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {origin} → {destination}
              </span>
            </div>
          </div>

          {/* Price and Size */}
          <div className="text-right flex-shrink-0">
            <div className="font-bold text-primary text-xl leading-snug">{price}€</div>
            <Badge className={`${sizeColors[size]} text-xs font-semibold mt-2 justify-center`}>{size}</Badge>
          </div>
        </div>

        {/* Date Footer */}
        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Package className="w-3 h-3 flex-shrink-0" />
          {dates}
        </div>
      </div>
    </Link>
  )
}
