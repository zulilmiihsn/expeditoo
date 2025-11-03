import { cn } from "@/lib/utils"

interface ChatBubbleProps {
  message: string
  isOwn: boolean
  timestamp: string
  avatar?: string
}

export function ChatBubble({ message, isOwn, timestamp, avatar }: ChatBubbleProps) {
  return (
    <div className={cn("flex gap-3 mb-4", isOwn && "flex-row-reverse")}>
      {!isOwn && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-pink flex-shrink-0 flex-none" />
      )}
      <div className={cn("flex flex-col max-w-xs", isOwn && "items-end")}>
        <div
          className={cn(
            "px-4 py-2 rounded-2xl text-sm leading-relaxed",
            isOwn ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted text-foreground rounded-bl-none",
          )}
        >
          <p>{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
      </div>
    </div>
  )
}
