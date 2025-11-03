"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ReviewCard } from "@/components/review-card"
import { RatingStars } from "@/components/rating-stars"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  timestamp: string
  type: "buyer" | "seller"
  helpful: number
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Thomas M.",
    rating: 5,
    title: "Excellent vendeur, très sérieux!",
    content: "Tout s'est déroulé comme prévu. L'article était bien emballé et livré à temps. Je recommande vivement!",
    timestamp: "Il y a 2 semaines",
    type: "buyer",
    helpful: 12,
  },
  {
    id: "2",
    author: "Sophie L.",
    rating: 4,
    title: "Bonne communication",
    content: "Bonne communication avec le vendeur. Légère délai de livraison mais produit conforme.",
    timestamp: "Il y a 1 mois",
    type: "buyer",
    helpful: 8,
  },
  {
    id: "3",
    author: "Jean P.",
    rating: 5,
    title: "Transport fiable",
    content: "Parfait pour mon transport de colis. Très rapide et sécurisé. Merci!",
    timestamp: "Il y a 3 semaines",
    type: "buyer",
    helpful: 5,
  },
]

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const stats = {
    average: 4.67,
    total: 14,
    distribution: {
      5: 10,
      4: 3,
      3: 1,
      2: 0,
      1: 0,
    },
  }

  const filteredReviews = mockReviews.filter((review) => {
    if (activeTab === "all") return true
    if (activeTab === "buyer") return review.type === "buyer"
    if (activeTab === "seller") return review.type === "seller"
    return true
  })

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/profile" className="md:hidden">
            <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-primary transition-smooth" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Avis et évaluations</h1>
        </div>

        {/* Rating Summary */}
        <div className="bg-card rounded-xl p-6 border border-border mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stats.average}</div>
              <RatingStars rating={Math.round(stats.average)} />
              <p className="text-xs text-muted-foreground mt-2">{stats.total} avis</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 text-xs mb-1">
                  <span className="w-4 text-muted-foreground">{star}★</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{
                        width: `${(stats.distribution[star as keyof typeof stats.distribution] / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-6 text-right text-muted-foreground">
                    {stats.distribution[star as keyof typeof stats.distribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent p-0 h-auto gap-2 border-0">
              <TabsTrigger
                value="all"
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/8 border border-transparent data-[state=active]:border-primary/20 transition-all duration-200 hover:bg-muted/50"
              >
                Tous
                <Badge variant="outline" className="ml-2 text-xs">
                  {stats.total}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="buyer"
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/8 border border-transparent data-[state=active]:border-primary/20 transition-all duration-200 hover:bg-muted/50"
              >
                Acheteur
                <Badge variant="outline" className="ml-2 text-xs">
                  {mockReviews.filter((r) => r.type === "buyer").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="seller"
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/8 border border-transparent data-[state=active]:border-primary/20 transition-all duration-200 hover:bg-muted/50"
              >
                Vendeur
                <Badge variant="outline" className="ml-2 text-xs">
                  {mockReviews.filter((r) => r.type === "seller").length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => <ReviewCard key={review.id} {...review} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun avis disponible pour cette catégorie</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
