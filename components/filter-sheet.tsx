"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { useEffect } from "react"

interface FilterSheetProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    priceRange: [number, number]
    sizes: string[]
    dateRange: string
  }
  onFiltersChange: (filters: any) => void
}

export function FilterSheet({ isOpen, onClose, filters, onFiltersChange }: FilterSheetProps) {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size) ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size]
    onFiltersChange({ ...filters, sizes: newSizes })
  }

  const handleReset = () => {
    onFiltersChange({
      priceRange: [0, 100],
      sizes: [],
      dateRange: "",
    })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 md:right-0 md:left-auto md:top-0 md:w-96 bg-background z-50 rounded-t-2xl md:rounded-none shadow-xl animate-slide-up md:animate-slide-left">
        <div className="flex flex-col h-full max-h-[85vh] md:max-h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Filters</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Price Range */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Price Range</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Min: €{filters.priceRange[0]}</span>
                  <span className="text-muted-foreground">Max: €{filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)],
                    })
                  }
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Size */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Size</Label>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`h-12 rounded-lg font-medium text-sm transition-all ${
                      filters.sizes.includes(size)
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Delivery Date</Label>
              <div className="space-y-2">
                {["This week", "This month", "Flexible"].map((option) => (
                  <button
                    key={option}
                    onClick={() => onFiltersChange({ ...filters, dateRange: option })}
                    className={`w-full h-12 rounded-lg font-medium text-sm transition-all ${
                      filters.dateRange === option
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border space-y-3">
            <Button onClick={onClose} className="w-full h-12 rounded-full">
              Apply Filters
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full h-12 rounded-full bg-transparent">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
