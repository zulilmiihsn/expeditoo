import type React from "react"
import { ThemeProvider } from "./theme-provider"
import { BottomNav } from "./bottom-nav"
import { NotificationBell } from "./notification-bell"
import { PageTransition } from "./page-transition"
import Link from "next/link"
import { Home, Package, PlusCircle, MessageSquare, User } from "lucide-react"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex h-screen bg-background">
        <aside className="hidden lg:flex w-64 border-r bg-card flex-col">
          <div className="p-6 border-b">
            <Link href="/home">
              <h1 className="text-2xl font-bold text-primary">EXPEDITOO</h1>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/home"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/deliveries"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">My Deliveries</span>
            </Link>
            <Link
              href="/create"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span className="font-medium">Create Auction</span>
            </Link>
            <Link
              href="/messages"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">Messages</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b border-border bg-card sticky top-0 z-40">
            <div className="flex items-center justify-between px-4 md:px-6 py-4">
              {/* Mobile Logo */}
              <Link href="/home" className="flex-shrink-0 lg:hidden">
                <h1 className="text-lg font-bold text-primary">EXPEDITOO</h1>
              </Link>

              {/* Right Actions */}
              <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
                <NotificationBell unreadCount={3} />
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>

        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>
    </ThemeProvider>
  )
}
