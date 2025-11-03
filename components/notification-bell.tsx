import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NotificationBellProps {
  unreadCount?: number
  className?: string
}

export function NotificationBell({ unreadCount = 0, className }: NotificationBellProps) {
  return (
    <Link href="/notifications" className={cn("relative inline-block", className)}>
      <Bell className="w-6 h-6 cursor-pointer hover:text-primary transition-all duration-200 ease-out" />
      {unreadCount > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
    </Link>
  )
}
