import { Skeleton } from "@/components/ui/skeleton"
import { MainLayout } from "@/components/main-layout"

export default function MessageDetailLoading() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto h-full flex flex-col bg-background">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-border sticky top-0 bg-background/95 flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Item Context Card */}
        <div className="px-4 md:px-6 py-3 bg-muted border-b border-border">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={cn("flex gap-3", i % 2 === 0 && "flex-row-reverse")}>
              <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
              <Skeleton className="h-12 w-32" />
            </div>
          ))}
        </div>

        {/* Message Composer */}
        <div className="border-t border-border p-4 md:p-6 bg-background sticky bottom-0">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    </MainLayout>
  )
}

import { cn } from "@/lib/utils"
