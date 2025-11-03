"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Search,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  MoreVertical,
  Ban,
  CheckCircle,
  Trash2,
  Eye,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockUsers = [
  {
    id: "1",
    name: "Nicolas Denis",
    email: "nicolas@example.com",
    status: "active",
    joinDate: "2024-01-15",
    listings: 12,
    deliveries: 8,
  },
  {
    id: "2",
    name: "Thomas Martin",
    email: "thomas@example.com",
    status: "active",
    joinDate: "2024-02-20",
    listings: 5,
    deliveries: 15,
  },
  {
    id: "3",
    name: "Sophie Laurent",
    email: "sophie@example.com",
    status: "suspended",
    joinDate: "2024-03-10",
    listings: 3,
    deliveries: 2,
  },
]

const mockStats = [
  { label: "Total Users", value: "1,234", icon: Users, change: "+12%" },
  { label: "Active Listings", value: "456", icon: Package, change: "+8%" },
  { label: "Reports", value: "23", icon: AlertTriangle, change: "-5%" },
  { label: "Revenue", value: "€12,345", icon: TrendingUp, change: "+15%" },
]

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("users")

  const tabs = [
    { id: "users", label: "Users" },
    { id: "listings", label: "Listings" },
    { id: "reports", label: "Reports" },
    { id: "analytics", label: "Analytics" },
  ]

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, listings, and platform activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mockStats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span
                  className={`text-sm font-semibold ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-smooth ${
                  selectedTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-11 h-12 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Users Table */}
        {selectedTab === "users" && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm text-foreground">User</th>
                    <th className="text-left p-4 font-semibold text-sm text-foreground">Status</th>
                    <th className="text-left p-4 font-semibold text-sm text-foreground">Join Date</th>
                    <th className="text-left p-4 font-semibold text-sm text-foreground">Listings</th>
                    <th className="text-left p-4 font-semibold text-sm text-foreground">Deliveries</th>
                    <th className="text-right p-4 font-semibold text-sm text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{user.joinDate}</td>
                      <td className="p-4 text-sm text-foreground">{user.listings}</td>
                      <td className="p-4 text-sm text-foreground">{user.deliveries}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Verify User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-orange-600">
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Other tabs placeholder */}
        {selectedTab !== "users" && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} management coming soon
            </p>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
