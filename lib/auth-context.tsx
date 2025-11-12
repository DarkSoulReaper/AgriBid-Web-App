"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  userType: "farmer" | "buyer" | "admin" | null
  userName: string | null
  userId: string | null
  login: (email: string, password: string, userType: "farmer" | "buyer") => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<"farmer" | "buyer" | "admin" | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken")
      const type = localStorage.getItem("userType")
      const name = localStorage.getItem("userName")
      const id = localStorage.getItem("userId")

      if (token && type) {
        setIsAuthenticated(true)
        setUserType(type as "farmer" | "buyer" | "admin")
        setUserName(name)
        setUserId(id)
        document.cookie = `authToken=${token};path=/`
        document.cookie = `userType=${type};path=/`
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, type: "farmer" | "buyer") => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual API call
      const mockUserId = "user_" + Math.random().toString(36).substr(2, 9)
      const mockToken = "token_" + Math.random().toString(36).substr(2, 9)

      localStorage.setItem("authToken", mockToken)
      localStorage.setItem("userType", type)
      localStorage.setItem("userName", email.split("@")[0])
      localStorage.setItem("userId", mockUserId)

      document.cookie = `authToken=${mockToken};path=/`
      document.cookie = `userType=${type};path=/`

      setIsAuthenticated(true)
      setUserType(type)
      setUserName(email.split("@")[0])
      setUserId(mockUserId)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userType")
    localStorage.removeItem("userName")
    localStorage.removeItem("userId")

    document.cookie = "authToken=;max-age=0;path=/"
    document.cookie = "userType=;max-age=0;path=/"

    setIsAuthenticated(false)
    setUserType(null)
    setUserName(null)
    setUserId(null)

    window.location.href = "/auth/login"
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        userName,
        userId,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
