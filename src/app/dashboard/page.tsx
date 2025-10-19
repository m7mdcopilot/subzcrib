'use client'

import { useAuth, usePortalAdmin, useMerchant, useCustomer } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Role-specific dashboard components
import PortalAdminDashboard from '@/components/analytics/PortalAdminDashboard'
import MerchantDashboard from '@/components/analytics/MerchantDashboard'
import CustomerDashboard from '@/components/analytics/CustomerDashboard'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const isPortalAdmin = usePortalAdmin()
  const isMerchant = useMerchant()
  const isCustomer = useCustomer()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">subzcrib.com</h1>
              <span className="ml-4 px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                {user.role.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.removeItem('auth_token')
                  window.location.href = '/login'
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isPortalAdmin && <PortalAdminDashboard />}
        {isMerchant && <MerchantDashboard />}
        {isCustomer && <CustomerDashboard />}
      </main>
    </div>
  )
}