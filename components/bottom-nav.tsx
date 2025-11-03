"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Calendar, Plus, MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
}

const navItems: NavItem[] = [
  { href: "/home", label: "Search", icon: <Search className="w-5 h-5" /> },
  { href: "/deliveries", label: "Deliveries", icon: <Calendar className="w-5 h-5" /> },
  { href: "/create", label: "Ship", icon: <Plus className="w-5 h-5" /> },
  { href: "/messages", label: "Messages", icon: <MessageCircle className="w-5 h-5" />, badge: 3 },
  { href: "/profile", label: "Account", icon: <User className="w-5 h-5" /> },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 md:hidden safe-area-inset shadow-lg">
      <div className="flex justify-around items-stretch max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 flex-1 py-3 px-2 min-h-16 transition-all duration-200 relative group",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-b-md transition-all duration-200" />
              )}

              <div
                className={cn(
                  "relative p-2 rounded-lg transition-all duration-200",
                  isActive ? "bg-primary/10" : "group-hover:bg-muted",
                )}
              >
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label with proper sizing */}
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-200",
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
