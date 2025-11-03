import { ListingCard } from "@/components/listing-card"
import { AlertCircle } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  price: number
  origin: string
  destination: string
  dates: string
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL"
}

interface SearchResultsProps {
  results: SearchResult[]
  loading?: boolean
  query?: string
}

export function SearchResults({ results, loading, query }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground opacity-50 mb-3" />
        <h3 className="font-bold text-foreground mb-1">No results found</h3>
        <p className="text-sm text-muted-foreground">
          {query ? `No listings match "${query}"` : "Try refining your search"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-bold text-foreground mb-4">
        <span className="text-primary">{results.length}</span> listings found
      </div>
      {results.map((result) => (
        <ListingCard key={result.id} {...result} />
      ))}
    </div>
  )
}
