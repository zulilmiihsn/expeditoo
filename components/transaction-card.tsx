import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp } from "lucide-react"

interface TransactionCardProps {
  id: string
  type: "in" | "out"
  title: string
  description: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
}

export function TransactionCard({ type, title, description, amount, date, status }: TransactionCardProps) {
  const statusConfig = {
    completed: { bg: "bg-green-100", text: "text-green-800", label: "Complétée" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "En attente" },
    failed: { bg: "bg-red-100", text: "text-red-800", label: "Échouée" },
  }

  const config = statusConfig[status]

  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              type === "in" ? "bg-accent-green/20" : "bg-muted"
            }`}
          >
            {type === "in" ? (
              <TrendingUp className="w-5 h-5 text-accent-green" />
            ) : (
              <TrendingDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">{date}</p>
              <Badge variant="outline" className={`${config.bg} ${config.text}`}>
                {config.label}
              </Badge>
            </div>
          </div>
        </div>
        <div className={`font-bold text-lg flex-shrink-0 ${type === "in" ? "text-accent-green" : "text-foreground"}`}>
          {type === "in" ? "+" : "-"}
          {amount}€
        </div>
      </div>
    </div>
  )
}
