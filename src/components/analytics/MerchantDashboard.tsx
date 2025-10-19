'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CreditCard,
  Plus,
  Settings
} from 'lucide-react'

interface MerchantMetrics {
  totalCustomers: number
  activeCustomers: number
  totalProducts: number
  activeProducts: number
  totalSubscriptions: number
  activeSubscriptions: number
  monthlyRevenue: number
  totalRevenue: number
  averageRevenuePerCustomer: number
  churnRate: number
}

interface RecentSubscription {
  _id: string
  customerName: string
  productName: string
  status: string
  amount: number
  currency: string
  createdAt: string
}

export default function MerchantDashboard() {
  const [metrics, setMetrics] = useState<MerchantMetrics>({
    totalCustomers: 0,
    activeCustomers: 0,
    totalProducts: 0,
    activeProducts: 0,
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    totalRevenue: 0,
    averageRevenuePerCustomer: 0,
    churnRate: 0
  })
  
  const [recentSubscriptions, setRecentSubscriptions] = useState<RecentSubscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real implementation, fetch from API
    setTimeout(() => {
      setMetrics({
        totalCustomers: 285,
        activeCustomers: 267,
        totalProducts: 12,
        activeProducts: 10,
        totalSubscriptions: 342,
        activeSubscriptions: 298,
        monthlyRevenue: 28500,
        totalRevenue: 156000,
        averageRevenuePerCustomer: 106.72,
        churnRate: 2.8
      })

      setRecentSubscriptions([
        {
          _id: '1',
          customerName: 'John Smith',
          productName: 'Premium Plan',
          status: 'active',
          amount: 99.99,
          currency: 'USD',
          createdAt: '2024-03-25'
        },
        {
          _id: '2',
          customerName: 'Sarah Johnson',
          productName: 'Basic Plan',
          status: 'active',
          amount: 49.99,
          currency: 'USD',
          createdAt: '2024-03-24'
        },
        {
          _id: '3',
          customerName: 'Mike Davis',
          productName: 'Enterprise Plan',
          status: 'cancelled',
          amount: 299.99,
          currency: 'USD',
          createdAt: '2024-03-23'
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      case 'paused':
        return <Badge variant="secondary">Paused</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Merchant Dashboard</h2>
          <p className="text-sm text-gray-600">
            Manage your business, products, and customers
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Product
          </Button>
        </div>
      </div>

      {/* Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalCustomers)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(metrics.activeCustomers)} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.activeProducts)}</div>
            <p className="text-xs text-muted-foreground">
              of {formatNumber(metrics.totalProducts)} total
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
            <CardTitle className="text-sm font-medium">Avg. Revenue/Customer</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.averageRevenuePerCustomer)}</div>
            <p className="text-xs text-muted-foreground">
              Monthly average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
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

      {/* Business Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Subscriptions</CardTitle>
            <CardDescription>
              Latest subscription activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubscriptions.map((subscription) => (
                <div key={subscription._id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{subscription.customerName}</h4>
                      {getStatusBadge(subscription.status)}
                    </div>
                    <p className="text-xs text-gray-600">{subscription.productName}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm font-medium">{formatCurrency(subscription.amount)}</span>
                      <span className="text-xs text-gray-500">{subscription.currency}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-xs text-gray-500">
                      {new Date(subscription.createdAt).toLocaleDateString()}
                    </span>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Management</CardTitle>
            <CardDescription>
              Quick access to business operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Manage Customers
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Manage Products
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              View Subscriptions
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="h-4 w-4 mr-2" />
              Customer Invoices
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              My Subscriptions
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Business Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}