"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Facebook, Apple } from "lucide-react"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent-pink/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-primary">cocolis</span>
          </h1>
        </div>

        {/* Info bubble */}
        <div className="bg-accent-pink/20 border border-accent-pink/30 rounded-2xl p-4 mb-8 flex gap-3">
          <div className="text-3xl flex-shrink-0">💡</div>
          <div>
            <p className="text-sm font-medium text-foreground">Last time you signed in using your Google account.</p>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <Button variant="outline" className="w-full h-12 rounded-full border-2 gap-2 bg-transparent">
            <Facebook className="w-5 h-5 text-blue-600" />
            <span>Facebook</span>
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-full border-2 gap-2 bg-transparent">
            <Apple className="w-5 h-5" />
            <span>Apple</span>
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-full border-2 gap-2 bg-transparent">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="currentColor"
                fontSize="16"
                fontWeight="bold"
              >
                G
              </text>
            </svg>
            <span>Google</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground font-medium">ou</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Form */}
        <form className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Email address</label>
            <Input
              type="email"
              placeholder="Ex : martin.boulanger@mail.com"
              className="h-12 rounded-full"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-foreground">Password</label>
              <a href="#" className="text-xs text-primary font-medium hover:underline">
                Forgot password
              </a>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 rounded-full pr-12"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </form>

        {/* Submit button */}
        <Button
          disabled={!formData.email || !formData.password}
          className="w-full h-12 rounded-full text-base font-bold mb-4"
        >
          Sign in
        </Button>

        {/* Sign up link */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="#" className="text-primary font-medium hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  )
}
