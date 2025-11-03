"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Search, Calendar, Package, Plus, MessageCircle, User, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, email } = useAuth()

  const mainItems = [
    { href: "/home", label: "Search", icon: <Search className="w-5 h-5" /> },
    { href: "/deliveries", label: "Deliveries", icon: <Calendar className="w-5 h-5" /> },
    { href: "/cargo", label: "Cargo", icon: <Package className="w-5 h-5" /> },
    { href: "/create", label: "Ship", icon: <Plus className="w-5 h-5" /> },
    { href: "/messages", label: "Messages", icon: <MessageCircle className="w-5 h-5" /> },
    { href: "/profile", label: "Account", icon: <User className="w-5 h-5" /> },
  ]

  const handleLogout = () => {
    logout()
    router.push("/landing")
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-primary">EXPEDITOO</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {mainItems.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-out",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/20",
              )}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-out",
            pathname?.startsWith("/settings")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/20",
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>

        <div className="pt-2 border-t border-sidebar-border">
          <div className="px-4 py-3 mb-2">
            <p className="text-xs text-sidebar-foreground/70 mb-1">Signed in as</p>
            <p className="text-sm font-medium text-sidebar-foreground truncate">{email}</p>
          </div>
          <Button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 font-medium transition-all duration-200 ease-out"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}
