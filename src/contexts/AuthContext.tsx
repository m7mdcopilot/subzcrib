'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'PORTAL_ADMIN' | 'MERCHANT' | 'CUSTOMER'
  merchantId?: string
  customerId?: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  hasPermission: (requiredRole: 'PORTAL_ADMIN' | 'MERCHANT' | 'CUSTOMER') => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Verify token and set user
      verifyToken(token)
    }
    setIsLoading(false)
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        localStorage.removeItem('auth_token')
        setUser(null)
      }
    } catch (error) {
      localStorage.removeItem('auth_token')
      setUser(null)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('auth_token', data.token)
        setUser(data.user)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  const hasPermission = (requiredRole: 'PORTAL_ADMIN' | 'MERCHANT' | 'CUSTOMER'): boolean => {
    if (!user) return false
    
    const roleHierarchy = {
      'PORTAL_ADMIN': 3,
      'MERCHANT': 2,
      'CUSTOMER': 1
    }
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading,
      hasPermission
    }}>
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

// Role-based hooks
export function usePortalAdmin() {
  const { user } = useAuth()
  return user?.role === 'PORTAL_ADMIN'
}

export function useMerchant() {
  const { user } = useAuth()
  return user?.role === 'MERCHANT'
}

export function useCustomer() {
  const { user } = useAuth()
  return user?.role === 'CUSTOMER'
}