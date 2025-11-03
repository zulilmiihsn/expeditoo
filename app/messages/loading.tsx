import { Skeleton } from "@/components/ui/skeleton"
import { MainLayout } from "@/components/main-layout"

export default function MessagesLoading() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto h-full flex flex-col">
        <div className="p-4 md:p-6 border-b border-border sticky top-0 bg-background/95">
          <Skeleton className="h-9 w-32 mb-4" />
          <Skeleton className="h-10 w-full rounded-full" />
        </div>

        <div className="px-4 md:px-6 pt-4 border-b border-border">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-9 w-20" />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3 p-4 border-b border-border">
              <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
