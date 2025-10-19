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

// Layout components
import SidebarNav from '@/components/layout/SidebarNav'
import MobileNav from '@/components/layout/MobileNav'

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
    <div className="h-screen overflow-hidden bg-gray-50">
      <MobileNav />
      
      <div className="flex h-full">
        <SidebarNav />
        
        <main className="flex-1 lg:ml-64 overflow-y-auto">
          <div className="p-4 lg:p-8">
            {isPortalAdmin && <PortalAdminDashboard />}
            {isMerchant && <MerchantDashboard />}
            {isCustomer && <CustomerDashboard />}
          </div>
        </main>
      </div>
    </div>
  )
}