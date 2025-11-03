"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

export interface FilterState {
  priceRange: [number, number]
  sizes: string[]
  dates: string[]
  sortBy: "newest" | "price-low" | "price-high" | "rating"
}

interface FilterPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClose?: () => void
}

export function FilterPanel({ filters, onFiltersChange, onClose }: FilterPanelProps) {
  const handlePriceChange = (value: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: value })
  }

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size) ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size]
    onFiltersChange({ ...filters, sizes: newSizes })
  }

  const handleSortChange = (sort: FilterState["sortBy"]) => {
    onFiltersChange({ ...filters, sortBy: sort })
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-foreground text-lg">Filters</h2>
        {onClose && (
          <button onClick={onClose} className="hover:text-destructive transition-all duration-200 ease-out">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-4">
          Budget: {filters.priceRange[0]}€ - {filters.priceRange[1]}€
        </label>
        <Slider
          min={0}
          max={500}
          step={10}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="w-full"
        />
      </div>

      {/* Size Filter */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Size</label>
        <div className="space-y-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} className="flex items-center gap-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.sizes.includes(size)}
                onCheckedChange={() => handleSizeToggle(size)}
              />
              <label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Sort by</label>
        <div className="space-y-2">
          {[
            { value: "newest", label: "Newest" },
            { value: "price-low", label: "Price: Low to High" },
            { value: "price-high", label: "Price: High to Low" },
            { value: "rating", label: "Best rated" },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                value={value}
                checked={filters.sortBy === value}
                onChange={() => handleSortChange(value as FilterState["sortBy"])}
                className="w-4 h-4"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full rounded-lg bg-transparent"
        onClick={() =>
          onFiltersChange({
            priceRange: [0, 500],
            sizes: [],
            dates: [],
            sortBy: "newest",
          })
        }
      >
        Reset filters
      </Button>
    </div>
  )
}
