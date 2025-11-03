"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/main-layout"
import { Settings, Leaf, Edit3, LogOut, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProfilePage() {
  const { logout, email } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/landing")
  }

  const user = {
    name: "Nicolas Denis",
    rating: 4.29,
    reviews: 14,
    type: "Particulier",
    wallet: 0,
    co2Saved: 900,
    avatar: "/placeholder.svg?key=profile1",
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24 md:pb-6 space-y-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Account</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-lg bg-transparent hover:bg-muted">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-950 border border-border shadow-lg">
              <div className="px-3 py-2.5 bg-muted/50 border-b border-border/50">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Account</p>
                <p className="text-sm font-semibold text-foreground truncate">{email}</p>
              </div>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-3 cursor-pointer px-2">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer px-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-start gap-5">
            <Avatar className="w-20 h-20 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent-pink text-white text-xl font-bold">
                ND
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">{user.name}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">⭐ {user.rating}</span>
                      <span className="text-xs text-muted-foreground">({user.reviews} reviews)</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {user.type}
                    </Badge>
                  </div>
                </div>
                <Link href="/profile/edit">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg flex-shrink-0 bg-transparent hover:bg-muted"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Link href="/profile/reviews" className="block group">
          <div className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Reviews & ratings
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{user.reviews} reviews received</p>
              </div>
              <svg
                className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-primary-foreground space-y-4">
          <div>
            <p className="text-sm font-medium opacity-90 mb-1">Available balance</p>
            <h2 className="text-4xl font-bold">{user.wallet}€</h2>
          </div>
          <Link href="/wallet" className="block">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full rounded-lg font-medium">
              Manage wallet
            </Button>
          </Link>
        </div>

        <div className="bg-accent-green/8 border border-accent-green/20 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 pt-1">
              <Leaf className="w-6 h-6 text-accent-green" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">CO₂ saved by your shipments</p>
              <p className="text-3xl font-bold text-accent-green">{user.co2Saved} kg</p>
            </div>
          </div>
        </div>

        <div className="bg-accent-red/8 border border-accent-red/20 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="font-semibold text-accent-red mb-2">Complete your profile</h3>
            <p className="text-sm text-foreground leading-relaxed">
              Add a profile photo to help show who you are when sharing shipments. It's simple, secure, and helps build
              trust with other users.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full rounded-lg text-accent-red border-accent-red/30 bg-transparent hover:bg-accent-red/5 font-medium"
          >
            Add profile photo
          </Button>
        </div>

        <Link href="/settings" className="block group">
          <div className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">Settings</span>
              </div>
              <svg
                className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </MainLayout>
  )
}
