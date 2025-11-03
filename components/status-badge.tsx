import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "pending" | "accepted" | "picked_up" | "in_transit" | "delivered" | "cancelled"
  className?: string
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  accepted: { label: "Accepted", color: "bg-blue-100 text-blue-800" },
  picked_up: { label: "Picked Up", color: "bg-purple-100 text-purple-800" },
  in_transit: { label: "In Transit", color: "bg-indigo-100 text-indigo-800" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={cn("px-3 py-1 rounded-full text-sm font-medium", config.color, className)}>{config.label}</span>
  )
}
