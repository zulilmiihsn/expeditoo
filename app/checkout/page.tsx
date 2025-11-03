"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainLayout } from "@/components/main-layout"
import { PaymentMethodSelector } from "@/components/payment-method-selector"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [email, setEmail] = useState("")
  const [processing, setProcessing] = useState(false)

  const orderTotal = 46

  const handleCheckout = async () => {
    setProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // In a real app, this would call Stripe or another payment processor
    alert("Payment processed successfully!")
    setProcessing(false)
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/listing/1" className="md:hidden">
            <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-primary transition-all duration-200" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Secure Payment</h1>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-lg p-6 border border-border mb-6">
          <h2 className="font-bold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 pb-4 border-b border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping Fee</span>
              <span className="text-foreground">${orderTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform Fee</span>
              <span className="text-foreground">$0</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-foreground">Total</span>
            <span className="text-2xl font-bold text-primary">${orderTotal}</span>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg"
          />
          <p className="text-xs text-muted-foreground mt-2">A payment receipt will be sent to this address</p>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h2 className="font-bold text-foreground mb-4">Payment Method</h2>
          <PaymentMethodSelector selected={selectedPayment} onSelect={setSelectedPayment} />
        </div>

        {/* Card Details (shown when card is selected) */}
        {selectedPayment === "card" && (
          <div className="bg-muted rounded-lg p-6 mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
              <Input type="text" placeholder="1234 5678 9012 3456" className="rounded-lg font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Expiration</label>
                <Input type="text" placeholder="MM/YY" className="rounded-lg font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">CVC</label>
                <Input type="text" placeholder="123" className="rounded-lg font-mono" />
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Info */}
        {selectedPayment === "bank" && (
          <div className="bg-accent-blue/10 border border-primary/30 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-foreground mb-2">Bank Transfer Details</h3>
            <div className="space-y-2 text-sm text-foreground">
              <p>Recipient: EXPEDITOO SAS</p>
              <p>IBAN: FR76 XXXX XXXX XXXX XXXX XXXX XX</p>
              <p>BIC: XXXXX</p>
              <p className="text-xs text-muted-foreground mt-3">Please include reference: REF-12345</p>
            </div>
          </div>
        )}

        {/* Wallet Info */}
        {selectedPayment === "wallet" && (
          <div className="bg-accent-green/10 border border-accent-green/30 rounded-lg p-6 mb-6">
            <p className="text-sm text-foreground">
              Wallet Balance: <span className="font-bold">$0</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Your balance is insufficient. Please top up your wallet.
            </p>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-card rounded-lg p-4 border border-border mb-6 text-xs text-muted-foreground">
          <p>🔒 Your payment is secure and encrypted with SSL 256-bit</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 fixed bottom-20 md:bottom-6 left-0 right-0 md:relative px-4 md:px-0">
          <Button
            onClick={handleCheckout}
            disabled={!email || processing}
            className="w-full h-12 rounded-full text-base font-bold"
          >
            {processing ? "Processing..." : `Pay $${orderTotal}`}
          </Button>
          <Link href="/listing/1" className="w-full">
            <Button variant="outline" className="w-full h-12 rounded-full text-base font-bold bg-transparent">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
