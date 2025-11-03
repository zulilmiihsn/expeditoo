"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { NotificationItem } from "@/components/notification-item"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, TrendingUp, Truck, Star, CreditCard, AlertCircle, Bell } from "lucide-react"

interface Notification {
  id: string
  type: "message" | "bid" | "delivery" | "review" | "payment" | "listing"
  title: string
  description: string
  timestamp: string
  read: boolean
  icon: React.ReactNode
  link?: string
  action?: { label: string; href: string }
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New message",
    description: "Thomas M. sent you a message about Paris → Lyon transport",
    timestamp: "Just now",
    read: false,
    icon: <MessageCircle className="w-5 h-5" />,
    link: "/messages/2",
    action: { label: "Reply", href: "/messages/2" },
  },
  {
    id: "2",
    type: "bid",
    title: "New bid",
    description: "You were outbid for Mixer + Vacuum lot",
    timestamp: "5 min ago",
    read: false,
    icon: <TrendingUp className="w-5 h-5" />,
    link: "/auction/1",
  },
  {
    id: "3",
    type: "delivery",
    title: "Package in transit",
    description: "Your package is being transported to Paris",
    timestamp: "30 min ago",
    read: false,
    icon: <Truck className="w-5 h-5" />,
    link: "/deliveries/1",
    action: { label: "Track", href: "/deliveries/1" },
  },
  {
    id: "4",
    type: "review",
    title: "New review received",
    description: "Sophie L. left you a 5-star review",
    timestamp: "2 hours ago",
    read: true,
    icon: <Star className="w-5 h-5" />,
    link: "/profile/reviews",
  },
  {
    id: "5",
    type: "payment",
    title: "Payment received",
    description: "You received €85 for Lyon → Marseille transport",
    timestamp: "Yesterday",
    read: true,
    icon: <CreditCard className="w-5 h-5" />,
    link: "/wallet",
  },
  {
    id: "6",
    type: "listing",
    title: "Listing expiring soon",
    description: "Your 'Mixer, Vacuum +1 item' listing expires in 3 days",
    timestamp: "1 day ago",
    read: true,
    icon: <AlertCircle className="w-5 h-5" />,
    link: "/profile/listings",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length
  const unreadByType = {
    all: unreadCount,
    message: notifications.filter((n) => n.type === "message" && !n.read).length,
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-sm font-medium hover:bg-primary/10 hover:text-primary"
            >
              Mark all read
            </Button>
          )}
        </div>

        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-muted/50 p-1 h-auto gap-1 rounded-xl">
              <TabsTrigger
                value="all"
                className="px-4 py-2 rounded-lg font-medium text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                All
                {unreadByType.all > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 px-1.5 text-xs font-semibold bg-primary text-primary-foreground"
                  >
                    {unreadByType.all}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="px-4 py-2 rounded-lg font-medium text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                Unread
                {unreadCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 px-1.5 text-xs font-semibold bg-primary text-primary-foreground"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="message"
                className="px-4 py-2 rounded-lg font-medium text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
              >
                Messages
                {unreadByType.message > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 px-1.5 text-xs font-semibold bg-primary text-primary-foreground"
                  >
                    {unreadByType.message}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onDismiss={() => handleDismiss(notification.id)}
              />
            ))
          ) : (
            <div className="text-center py-20 px-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
                <Bell className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {activeTab === "unread"
                  ? "You're all caught up! No unread notifications at the moment."
                  : "You don't have any notifications yet. We'll notify you when something important happens."}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
