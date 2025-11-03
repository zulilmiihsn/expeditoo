import type React from "react"
import { ThemeProvider } from "./theme-provider"
import { BottomNav } from "./bottom-nav"
import { SidebarNav } from "./sidebar-nav"
import { NotificationBell } from "./notification-bell"
import { PageTransition } from "./page-transition"
import { Search } from "lucide-react"
import Link from "next/link"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 border-r border-border flex-col bg-card">
          <SidebarNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b border-border bg-card sticky top-0 z-40">
            <div className="flex items-center justify-between px-4 md:px-6 py-4">
              {/* Mobile Logo */}
              <Link href="/home" className="md:hidden flex-shrink-0">
                <h1 className="text-lg font-bold text-primary">EXPEDITOO</h1>
              </Link>

              {/* Desktop Logo */}
              <Link href="/home" className="hidden md:block flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">E</span>
                </div>
              </Link>

              <div className="flex-1 md:ml-6 md:max-w-md">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4 flex-shrink-0">
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
