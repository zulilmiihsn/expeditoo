"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Download, Search, Filter, Calendar, Package } from "lucide-react"

const documents = [
  {
    id: "DOC-001",
    name: "Commercial Invoice",
    type: "Invoice",
    shipmentId: "SHP-2024-001",
    date: "2024-01-15",
    size: "245 KB",
    status: "verified",
  },
  {
    id: "DOC-002",
    name: "Bill of Lading",
    type: "BOL",
    shipmentId: "SHP-2024-001",
    date: "2024-01-15",
    size: "189 KB",
    status: "verified",
  },
  {
    id: "DOC-003",
    name: "Customs Declaration",
    type: "Customs",
    shipmentId: "SHP-2024-002",
    date: "2024-01-14",
    size: "156 KB",
    status: "pending",
  },
  {
    id: "DOC-004",
    name: "Packing List",
    type: "Packing",
    shipmentId: "SHP-2024-002",
    date: "2024-01-14",
    size: "98 KB",
    status: "verified",
  },
  {
    id: "DOC-005",
    name: "Certificate of Origin",
    type: "Certificate",
    shipmentId: "SHP-2024-003",
    date: "2024-01-13",
    size: "134 KB",
    status: "verified",
  },
  {
    id: "DOC-006",
    name: "Shipping Manifest",
    type: "Manifest",
    shipmentId: "SHP-2024-003",
    date: "2024-01-13",
    size: "278 KB",
    status: "pending",
  },
]

const statusColors = {
  verified: "bg-accent-green/10 text-accent-green border-accent-green/20",
  pending: "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
}

export function DocumentsTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-9" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm leading-tight">{doc.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{doc.type}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Package className="h-3.5 w-3.5" />
                <span>{doc.shipmentId}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{doc.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={statusColors[doc.status as keyof typeof statusColors]}>
                  {doc.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{doc.size}</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Documents</p>
              <p className="text-2xl font-semibold mt-1">{documents.length}</p>
            </div>
            <FileText className="h-8 w-8 text-primary/60" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-2xl font-semibold mt-1">{documents.filter((d) => d.status === "verified").length}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-accent-green/10 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-accent-green" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold mt-1">{documents.filter((d) => d.status === "pending").length}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-accent-orange/10 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-accent-orange" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
