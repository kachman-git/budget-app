'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { User } from '@/lib/types'
import { getCurrentUser, logout as apiLogout } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (typeof window !== 'undefined' && localStorage.getItem('token')) {
          const userData = await getCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        localStorage.removeItem('token')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const logout = () => {
    apiLogout()
    setUser(null)
    router.push('/signin')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

