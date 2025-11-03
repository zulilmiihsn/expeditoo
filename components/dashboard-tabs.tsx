"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Package } from "lucide-react"
import { BarChart3 } from "lucide-react"
import { CheckSquare } from "lucide-react"
import { FileText } from "lucide-react"
import { ShipmentsTab } from "./shipments-tab"
import { AnalyticsTab } from "./analytics-tab"
import { TasksTab } from "./tasks-tab"
import { DocumentsTab } from "./documents-tab"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("shipments")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const tabs = [
    { id: "shipments", label: "Shipments", icon: Package },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "documents", label: "Documents", icon: FileText },
  ]

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 relative whitespace-nowrap",
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-slide-underline" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div
        className={cn(
          "min-h-[400px] transition-all duration-200 ease-out",
          isTransitioning ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0",
        )}
      >
        {activeTab === "shipments" && <ShipmentsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "tasks" && <TasksTab />}
        {activeTab === "documents" && <DocumentsTab />}
      </div>
    </div>
  )
}
