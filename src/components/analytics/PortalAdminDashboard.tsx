'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'

interface PlatformMetrics {
  totalMerchants: number
  activeMerchants: number
  pendingMerchants: number
  totalCustomers: number
  totalSubscriptions: number
  activeSubscriptions: number
  monthlyRevenue: number
  totalRevenue: number
  churnRate: number
}

interface Merchant {
  _id: string
  name: string
  email: string
  isApproved: boolean
  isActive: boolean
  businessType: string
  industry: string
  createdAt: string
}

export default function PortalAdminDashboard() {
  const [metrics, setMetrics] = useState<PlatformMetrics>({
    totalMerchants: 0,
    activeMerchants: 0,
    pendingMerchants: 0,
    totalCustomers: 0,
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    totalRevenue: 0,
    churnRate: 0
  })
  
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real implementation, fetch from API
    setTimeout(() => {
      setMetrics({
        totalMerchants: 156,
        activeMerchants: 142,
        pendingMerchants: 8,
        totalCustomers: 12450,
        totalSubscriptions: 8934,
        activeSubscriptions: 7821,
        monthlyRevenue: 485000,
        totalRevenue: 2840000,
        churnRate: 3.2
      })

      setMerchants([
        {
          _id: '1',
          name: 'TechCorp Solutions',
          email: 'contact@techcorp.com',
          isApproved: true,
          isActive: true,
          businessType: 'CORPORATION',
          industry: 'Technology',
          createdAt: '2024-01-15'
        },
        {
          _id: '2',
          name: 'Green Energy Co',
          email: 'info@greenenergy.com',
          isApproved: false,
          isActive: true,
          businessType: 'LLC',
          industry: 'Energy',
          createdAt: '2024-03-20'
        },
        {
          _id: '3',
          name: 'EduTech Academy',
          email: 'hello@edutech.com',
          isApproved: true,
          isActive: false,
          businessType: 'CORPORATION',
          industry: 'Education',
          createdAt: '2024-02-10'
        }
      ])
      
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getMerchantStatusBadge = (merchant: Merchant) => {
    if (!merchant.isActive) {
      return <Badge variant="secondary">Inactive</Badge>
    }
    if (!merchant.isApproved) {
      return <Badge variant="outline">Pending Approval</Badge>
    }
    return <Badge variant="default">Active</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Portal Admin Dashboard</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage the entire subzcrib.com platform
          </p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Add New Admin
        </Button>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalMerchants)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(metrics.activeMerchants)} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalCustomers)}</div>
            <p className="text-xs text-muted-foreground">
              Across all merchants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.monthlyRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            {metrics.churnRate > 5 ? (
              <TrendingUp className="h-4 w-4 text-red-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics.churnRate > 5 ? 'text-red-600' : 'text-green-600'}`}>
              {metrics.churnRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly churn
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.activeSubscriptions)}</div>
            <p className="text-xs text-muted-foreground">
              of {formatNumber(metrics.totalSubscriptions)} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.pendingMerchants)}</div>
            <p className="text-xs text-muted-foreground">
              Merchants awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Merchant Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Merchants</CardTitle>
            <CardDescription>
              Latest merchant registrations and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {merchants.map((merchant) => (
                <div key={merchant._id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{merchant.name}</h4>
                      {getMerchantStatusBadge(merchant)}
                    </div>
                    <p className="text-sm text-gray-600">{merchant.email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{merchant.businessType}</span>
                      <span className="text-xs text-gray-500">{merchant.industry}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-xs text-gray-500">
                      {new Date(merchant.createdAt).toLocaleDateString()}
                    </span>
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Building2 className="h-4 w-4 mr-2" />
              View All Merchants
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Review Pending Approvals
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertTriangle className="h-4 w-4 mr-2" />
              View System Alerts
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Revenue Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <XCircle className="h-4 w-4 mr-2" />
              Manage Suspended Accounts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}