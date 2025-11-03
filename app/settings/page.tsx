"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MainLayout } from "@/components/main-layout"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Globe, Bell, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [language, setLanguage] = useState("fr")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  })

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/profile" className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
        </div>

        <div className="bg-card rounded-xl p-5 border border-border mb-5">
          <h2 className="font-semibold text-foreground mb-5 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Language
          </h2>
          <div className="space-y-3">
            {[
              { code: "fr", label: "Français" },
              { code: "en", label: "English" },
              { code: "es", label: "Español" },
            ].map((lang) => (
              <label
                key={lang.code}
                className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <input
                  type="radio"
                  name="language"
                  value={lang.code}
                  checked={language === lang.code}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-4 h-4 cursor-pointer accent-primary"
                />
                <span className="text-foreground font-medium">{lang.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 border border-border mb-8">
          <h2 className="font-semibold text-foreground mb-5 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Label className="cursor-pointer font-medium">Email notifications</Label>
              <Checkbox
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked as boolean })}
                className="accent-primary"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Label className="cursor-pointer font-medium">Push notifications</Label>
              <Checkbox
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked as boolean })}
                className="accent-primary"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Label className="cursor-pointer font-medium">SMS</Label>
              <Checkbox
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked as boolean })}
                className="accent-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-accent-red/8 border border-accent-red/20 rounded-xl p-5">
          <h2 className="font-semibold text-accent-red mb-5 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full rounded-lg font-medium">
                Delete my account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete account</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All your data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex gap-3 justify-end">
                <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                <AlertDialogAction className="rounded-lg bg-destructive hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </MainLayout>
  )
}
