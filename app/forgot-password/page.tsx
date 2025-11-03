"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address")
      setLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-neutral-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-neutral-900">EXPEDITOO</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">Reset Password</h1>
              <p className="text-neutral-600 mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-lg border px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-1 ${
                      error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-neutral-300 focus:border-blue-600 focus:ring-blue-600"
                    }`}
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-semibold transition-colors"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <button
                onClick={() => router.push("/login")}
                className="w-full mt-6 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">Check Your Email</h1>
                <p className="text-neutral-600 mb-6">We've sent a password reset link to {email}</p>
                <p className="text-sm text-neutral-500 mb-6">
                  The link expires in 1 hour. Check your spam folder if you don't see it.
                </p>

                <Button
                  onClick={() => router.push("/login")}
                  className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-semibold transition-colors"
                >
                  Back to Sign In
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-neutral-700">
            <strong>Demo:</strong> Enter any email and you'll see the confirmation
          </p>
        </div>
      </div>
    </div>
  )
}
