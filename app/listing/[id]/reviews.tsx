"use client"

import { ReviewCard } from "@/components/review-card"
import { useState } from "react"

const mockListingReviews = [
  {
    id: "1",
    author: "Thomas M.",
    rating: 5,
    title: "Excellent transporteur!",
    content: "Transport rapide et sécurisé. Produit bien emballé. Je recommande!",
    timestamp: "Il y a 3 semaines",
    type: "buyer" as const,
    helpful: 8,
  },
  {
    id: "2",
    author: "Marie D.",
    rating: 5,
    title: "Très professionnel",
    content: "Livraison impeccable, tout s'est passé comme prévu.",
    timestamp: "Il y a 1 mois",
    type: "buyer" as const,
    helpful: 5,
  },
]

export function ListingReviews() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        Avis des acheteurs
        <span className="text-sm text-muted-foreground font-normal">({mockListingReviews.length})</span>
      </h2>

      {mockListingReviews.length > 0 ? (
        <div className="space-y-4">
          {mockListingReviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-muted rounded-xl">
          <p className="text-muted-foreground">Aucun avis disponible pour cette annonce</p>
        </div>
      )}
    </div>
  )
}
