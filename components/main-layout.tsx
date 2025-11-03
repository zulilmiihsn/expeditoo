import type React from "react"
import { ThemeProvider } from "./theme-provider"
import { BottomNav } from "./bottom-nav"
import { NotificationBell } from "./notification-bell"
import { PageTransition } from "./page-transition"
import Link from "next/link"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex h-screen bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b border-border bg-card sticky top-0 z-40">
            <div className="flex items-center justify-between px-4 md:px-6 py-4">
              {/* Mobile Logo */}
              <Link href="/home" className="flex-shrink-0">
                <h1 className="text-lg font-bold text-primary">EXPEDITOO</h1>
              </Link>

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
