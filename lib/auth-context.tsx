"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  email: string | null
  fullName: string | null
  login: (email: string, fullName?: string) => void
  signup: (email: string, fullName: string, password: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth_state")
    if (storedAuth) {
      try {
        const { isAuthenticated: auth, email: authEmail, fullName: authName } = JSON.parse(storedAuth)
        setIsAuthenticated(auth)
        setEmail(authEmail)
        setFullName(authName)
      } catch (error) {
        console.error("Failed to restore auth state:", error)
        localStorage.removeItem("auth_state")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userEmail: string, userName?: string) => {
    setIsAuthenticated(true)
    setEmail(userEmail)
    setFullName(userName || null)
    localStorage.setItem(
      "auth_state",
      JSON.stringify({
        isAuthenticated: true,
        email: userEmail,
        fullName: userName || null,
      }),
    )
  }

  const signup = (userEmail: string, userName: string, password: string) => {
    // For now, we just log them in after signup
    setIsAuthenticated(true)
    setEmail(userEmail)
    setFullName(userName)
    localStorage.setItem(
      "auth_state",
      JSON.stringify({
        isAuthenticated: true,
        email: userEmail,
        fullName: userName,
      }),
    )
  }

  const logout = () => {
    setIsAuthenticated(false)
    setEmail(null)
    setFullName(null)
    localStorage.removeItem("auth_state")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, fullName, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
