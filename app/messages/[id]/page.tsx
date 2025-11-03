"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainLayout } from "@/components/main-layout"
import { ChatBubble } from "@/components/chat-bubble"
import { Send, Paperclip, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChatMessage {
  id: string
  text: string
  isOwn: boolean
  timestamp: string
}

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Bonjour, est-ce que ce prix est négociable ?",
      isOwn: true,
      timestamp: "14:32",
    },
    {
      id: "2",
      text: "Oui bien sûr, je peux être disponible jeudi ou vendredi pour le départ.",
      isOwn: false,
      timestamp: "14:45",
    },
    {
      id: "3",
      text: "Parfait, jeudi c'est idéal pour moi ! À quelle heure ?",
      isOwn: true,
      timestamp: "14:50",
    },
    {
      id: "4",
      text: "Je propose 14h, ça te va ?",
      isOwn: false,
      timestamp: "14:55",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const contact = {
    name: "Chérilihedye S.",
    rating: 4.5,
    avatar: "/placeholder.svg?key=chat1",
    listing: "Mixeur, Aspirateur +1 objet",
  }

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: String(messages.length + 1),
        text: inputValue,
        isOwn: true,
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setInputValue("")
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto h-full flex flex-col bg-background">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur flex items-center gap-3">
          <Link href="/messages" className="md:hidden">
            <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-primary transition-smooth" />
          </Link>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent-pink text-white">
              {contact.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-foreground truncate">{contact.name}</h1>
            <p className="text-xs text-muted-foreground truncate">⭐ {contact.rating}/5</p>
          </div>
        </div>

        {/* Item Context Card */}
        <div className="px-4 md:px-6 py-3 bg-muted border-b border-border text-sm">
          <p className="text-muted-foreground mb-1">À propos de</p>
          <p className="font-medium text-foreground">{contact.listing}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message.text} isOwn={message.isOwn} timestamp={message.timestamp} />
          ))}
        </div>

        {/* Message Composer */}
        <div className="border-t border-border p-4 md:p-6 bg-background sticky bottom-0 safe-area-inset">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              type="text"
              placeholder="Votre message..."
              className="rounded-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="rounded-full flex-shrink-0"
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
