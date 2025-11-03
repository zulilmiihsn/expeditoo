"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainLayout } from "@/components/main-layout"
import { TransactionCard } from "@/components/transaction-card"
import { ArrowDownRight, ArrowUpLeft } from "lucide-react"

interface Transaction {
  id: string
  type: "in" | "out"
  title: string
  description: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "in",
    title: "Paiement reçu",
    description: "Transport Paris → Lyon",
    amount: 85,
    date: "15 oct. 2024",
    status: "completed",
  },
  {
    id: "2",
    type: "out",
    title: "Transport effectué",
    description: "Marseille → Paris",
    amount: 46,
    date: "12 oct. 2024",
    status: "completed",
  },
  {
    id: "3",
    type: "in",
    title: "Remboursement",
    description: "Annulation de transport",
    amount: 30,
    date: "10 oct. 2024",
    status: "pending",
  },
]

export default function WalletPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24 md:pb-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My wallet</h1>
        </div>

        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-primary-foreground space-y-5">
          <div>
            <p className="text-sm font-medium opacity-90 mb-2">Available balance</p>
            <h2 className="text-4xl md:text-5xl font-bold">285€</h2>
          </div>
          <Link href="/wallet/withdraw" className="block">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full rounded-lg font-medium h-11">
              Withdraw earnings
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/checkout" className="block">
            <Button
              variant="outline"
              className="w-full rounded-lg gap-2 bg-card border-border hover:bg-muted font-medium"
            >
              <ArrowDownRight className="w-4 h-4" />
              <span>Add funds</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full rounded-lg gap-2 bg-card border-border hover:bg-muted font-medium"
          >
            <ArrowUpLeft className="w-4 h-4" />
            <span>History</span>
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Transaction history</h2>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} {...transaction} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
