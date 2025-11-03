"use client"

import { useState } from "react"

interface FilterTab {
  id: string
  label: string
}

interface FilterTabsProps {
  tabs: FilterTab[]
  onTabChange: (tabId: string) => void
}

export function FilterTabs({ tabs, onTabChange }: FilterTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "")

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange(tabId)
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-2 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? "#EFF6FF" : "transparent",
              color: activeTab === tab.id ? "#1E40AF" : "#6B7280",
              border: activeTab === tab.id ? "1px solid #BFDBFE" : "1px solid transparent",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "all 200ms ease-in-out",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#1E40AF"
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#6B7280"
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
