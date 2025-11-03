"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/main-layout"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  name: string
  avatar?: string
  listing: string
  snippet: string
  timestamp: string
  unread: boolean
}

const mockMessages: Message[] = [
  {
    id: "1",
    name: "Chérilihedye S.",
    listing: "Mixeur, Aspirateur +1 objet",
    snippet: "Oui bien sûr, je peux être disponible jeudi...",
    timestamp: "Aujourd'hui",
    unread: true,
  },
  {
    id: "2",
    name: "Thomas M.",
    listing: "Vélo de route - Trek FX 3",
    snippet: "L'enchère est terminée, vous avez gagné !",
    timestamp: "Hier",
    unread: false,
  },
  {
    id: "3",
    name: "Sophie L.",
    listing: "44 jantes",
    snippet: "Merci pour votre confiance, à bientôt !",
    timestamp: "2 jours",
    unread: false,
  },
  {
    id: "4",
    name: "Jean P.",
    listing: "Tableau encadré de jardin",
    snippet: "The package arrived safely, thanks!",
    timestamp: "3 jours",
    unread: false,
  },
]

function MessageRow({ message }: { message: Message }) {
  return (
    <Link href={`/messages/${message.id}`}>
      <div className="flex gap-3 p-4 border-b border-border hover:bg-muted/50 transition-all duration-200 ease-out cursor-pointer">
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent-pink text-white">
            {message.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className={cn("font-bold truncate", message.unread && "text-foreground")}>{message.name}</h3>
            <span className="text-xs text-muted-foreground flex-shrink-0">{message.timestamp}</span>
          </div>
          <p className="text-xs text-muted-foreground truncate mb-1">{message.listing}</p>
          <p
            className={cn(
              "text-sm truncate",
              message.unread ? "font-semibold text-foreground" : "text-muted-foreground",
            )}
          >
            {message.snippet}
          </p>
        </div>
        {message.unread && <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-2" />}
      </div>
    </Link>
  )
}

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredMessages = mockMessages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.listing.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search a contact..."
              className="pl-12 h-10 rounded-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 md:px-6 pt-4 border-b border-border">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent p-0 h-auto gap-2 border-0">
              <TabsTrigger
                value="all"
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/8 border border-transparent data-[state=active]:border-primary/20 transition-all duration-200 hover:bg-muted/50"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="inbox"
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/8 border border-transparent data-[state=active]:border-primary/20 transition-all duration-200 hover:bg-muted/50"
              >
                Inbox
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="px-4 py-2.5 rounded-lg font-medium text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/8 border border-transparent data-[state=active]:border-primary/20 transition-all duration-200 hover:bg-muted/50"
              >
                Unread
                {mockMessages.some((m) => m.unread) && (
                  <Badge className="ml-2 bg-destructive text-white">
                    {mockMessages.filter((m) => m.unread).length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length > 0 ? (
            <div>
              {filteredMessages.map((message) => (
                <MessageRow key={message.id} message={message} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-muted-foreground mb-2">
                <Search className="w-12 h-12 mx-auto opacity-50 mb-4" />
                <p className="text-sm font-medium">No messages found</p>
                <p className="text-xs text-muted-foreground mt-1">Check your filters and try again</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
