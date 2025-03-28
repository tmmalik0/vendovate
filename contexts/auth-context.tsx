"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define user types
export type UserRole = "admin" | "vendor" | "customer" | null

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  name: string
}

// Define context type
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (identifier: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

// Mock users for demo
const MOCK_USERS = [
  {
    id: "1",
    username: "admin",
    email: "admin@meincbd24-7.com",
    password: "password",
    role: "admin" as UserRole,
    name: "Admin User",
  },
  {
    id: "2",
    username: "vendor",
    email: "vendor@naturecbd.com",
    password: "password",
    role: "vendor" as UserRole,
    name: "Vendor User",
  },
  {
    id: "3",
    username: "customer",
    email: "customer@example.com",
    password: "password",
    role: "customer" as UserRole,
    name: "Customer User",
  },
  {
    id: "4",
    username: "demouser",
    email: "demo@example.com",
    password: "password",
    role: "vendor" as UserRole,
    name: "Demo Vendor",
  },
]

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  loading: true,
})

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (identifier: string, password: string): Promise<boolean> => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Find user by username or email
      const foundUser = MOCK_USERS.find(
        (u) => (u.username === identifier || u.email === identifier) && u.password === password,
      )

      if (foundUser) {
        // Create user object without password
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)

        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        setLoading(false)
        return true
      }

      setLoading(false)
      return false
    } catch (error) {
      console.error("Login error:", error)
      setLoading(false)
      return false
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext)
}

