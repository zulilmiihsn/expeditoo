"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainLayout } from "@/components/main-layout"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function WithdrawPage() {
  const [amount, setAmount] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [processing, setProcessing] = useState(false)

  const walletBalance = 285
  const minWithdraw = 10
  const fee = amount ? Math.max(0, Number.parseFloat(amount) * 0.02) : 0
  const netAmount = amount ? Number.parseFloat(amount) - fee : 0

  const handleWithdraw = async () => {
    setProcessing(true)
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Demande de retrait soumise!")
    setAmount("")
    setProcessing(false)
  }

  const canWithdraw =
    amount && Number.parseFloat(amount) >= minWithdraw && Number.parseFloat(amount) <= walletBalance && bankAccount

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/wallet">
            <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-primary transition-all duration-200 ease-out" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Withdraw earnings</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white mb-6">
          <p className="text-sm opacity-90 mb-1">Available balance</p>
          <h2 className="text-4xl font-bold">{walletBalance}€</h2>
        </div>

        {/* Withdrawal Form */}
        <div className="bg-card rounded-xl p-6 border border-border mb-6">
          <h2 className="font-bold text-foreground mb-4">Amount to withdraw</h2>

          <div className="mb-4">
            <div className="flex gap-2 mb-4">
              {[50, 100, 200].map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  onClick={() => setAmount(preset.toString())}
                  className="flex-1 rounded-lg bg-transparent"
                >
                  {preset}€
                </Button>
              ))}
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="Custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Minimum: {minWithdraw}€</p>
          </div>

          {/* Fee Breakdown */}
          {amount && (
            <div className="bg-muted rounded-lg p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Requested amount</span>
                <span className="text-foreground font-medium">{Number.parseFloat(amount)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee (2%)</span>
                <span className="text-foreground font-medium">-{fee.toFixed(2)}€</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-base">
                <span className="font-bold text-foreground">Net amount</span>
                <span className="font-bold text-primary">{netAmount.toFixed(2)}€</span>
              </div>
            </div>
          )}

          {/* Bank Account Info */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">Bank account</label>
            <Input
              type="text"
              placeholder="Select a registered account..."
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="rounded-lg"
            />
            <p className="text-xs text-muted-foreground mt-2">
              <Link href="#" className="text-primary hover:underline">
                Manage my bank accounts
              </Link>
            </p>
          </div>

          {/* Alerts */}
          {amount && Number.parseFloat(amount) < minWithdraw && (
            <div className="flex gap-3 p-4 bg-accent-red/10 border border-accent-red/30 rounded-lg mb-4 text-sm text-accent-red">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>Minimum withdrawal amount is {minWithdraw}€</p>
            </div>
          )}

          {amount && Number.parseFloat(amount) > walletBalance && (
            <div className="flex gap-3 p-4 bg-accent-red/10 border border-accent-red/30 rounded-lg mb-4 text-sm text-accent-red">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>Insufficient balance</p>
            </div>
          )}

          {/* Processing Time */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-primary/30 rounded-lg p-4 text-sm text-foreground">
            <p className="font-medium mb-1">Processing time</p>
            <p className="text-xs text-muted-foreground">Usually 2-3 business days after validation</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 fixed bottom-20 md:bottom-6 left-0 right-0 md:relative px-4 md:px-0">
          <Button
            onClick={handleWithdraw}
            disabled={!canWithdraw || processing}
            className="w-full h-12 rounded-full text-base font-bold"
          >
            {processing ? "Processing..." : `Request withdrawal of ${netAmount.toFixed(2)}€`}
          </Button>
          <Link href="/wallet" className="w-full">
            <Button variant="outline" className="w-full h-12 rounded-full text-base font-bold bg-transparent">
              Back
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
