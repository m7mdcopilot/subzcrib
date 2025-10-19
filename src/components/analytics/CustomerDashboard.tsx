'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Package, 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  Download,
  Settings,
  User,
  AlertCircle
} from 'lucide-react'

interface CustomerMetrics {
  totalSubscriptions: number
  activeSubscriptions: number
  monthlySpending: number
  totalSpending: number
  nextBillingAmount: number
  upcomingPayments: number
}

interface CustomerSubscription {
  _id: string
  productName: string
  description: string
  status: string
  amount: number
  currency: string
  billingCycle: string
  nextBillingDate: string
  autoRenew: boolean
}

interface CustomerInvoice {
  _id: string
  invoiceNumber: string
  amount: number
  currency: string
  status: string
  dueDate: string
  createdAt: string
}

export default function CustomerDashboard() {
  const [metrics, setMetrics] = useState<CustomerMetrics>({
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    monthlySpending: 0,
    totalSpending: 0,
    nextBillingAmount: 0,
    upcomingPayments: 0
  })
  
  const [subscriptions, setSubscriptions] = useState<CustomerSubscription[]>([])
  const [invoices, setInvoices] = useState<CustomerInvoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real implementation, fetch from API
    setTimeout(() => {
      setMetrics({
        totalSubscriptions: 4,
        activeSubscriptions: 3,
        monthlySpending: 149.97,
        totalSpending: 1850.00,
        nextBillingAmount: 49.99,
        upcomingPayments: 2
      })

      setSubscriptions([
        {
          _id: '1',
          productName: 'Premium Plan',
          description: 'Access to all premium features',
          status: 'active',
          amount: 49.99,
          currency: 'USD',
          billingCycle: 'monthly',
          nextBillingDate: '2024-04-25',
          autoRenew: true
        },
        {
          _id: '2',
          productName: 'Storage Plus',
          description: 'Additional 100GB storage',
          status: 'active',
          amount: 9.99,
          currency: 'USD',
          billingCycle: 'monthly',
          nextBillingDate: '2024-04-25',
          autoRenew: true
        },
        {
          _id: '3',
          productName: 'Support Package',
          description: '24/7 priority support',
          status: 'active',
          amount: 29.99,
          currency: 'USD',
          billingCycle: 'monthly',
          nextBillingDate: '2024-04-25',
          autoRenew: true
        },
        {
          _id: '4',
          productName: 'Enterprise Tools',
          description: 'Advanced analytics and reporting',
          status: 'cancelled',
          amount: 99.99,
          currency: 'USD',
          billingCycle: 'monthly',
          nextBillingDate: '2024-03-25',
          autoRenew: false
        }
      ])

      setInvoices([
        {
          _id: '1',
          invoiceNumber: 'INV-2024-001',
          amount: 149.97,
          currency: 'USD',
          status: 'paid',
          dueDate: '2024-03-25',
          createdAt: '2024-03-25'
        },
        {
          _id: '2',
          invoiceNumber: 'INV-2024-002',
          amount: 149.97,
          currency: 'USD',
          status: 'pending',
          dueDate: '2024-04-25',
          createdAt: '2024-04-25'
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      case 'paused':
        return <Badge variant="secondary">Paused</Badge>
      case 'pending':
        return <Badge variant="outline">Pending</Badge>
      case 'paid':
        return <Badge variant="default">Paid</Badge>
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getDaysUntilBilling = (billingDate: string) => {
    const today = new Date()
    const billing = new Date(billingDate)
    const diffTime = billing.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
          <h2 className="text-2xl font-bold text-gray-900">Customer Dashboard</h2>
          <p className="text-sm text-gray-600">
            Manage your subscriptions and view your billing information
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
            Browse Products
          </Button>
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              of {metrics.totalSubscriptions} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.monthlySpending)}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.nextBillingAmount)}</div>
            <p className="text-xs text-muted-foreground">
              Upcoming payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalSpending)}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions and Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>My Subscriptions</CardTitle>
            <CardDescription>
              Your active and inactive subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <div key={subscription._id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{subscription.productName}</h4>
                      {getStatusBadge(subscription.status)}
                    </div>
                    <p className="text-xs text-gray-600">{subscription.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm font-medium">{formatCurrency(subscription.amount)}</span>
                      <span className="text-xs text-gray-500">{subscription.billingCycle}</span>
                      {subscription.autoRenew && (
                        <Badge variant="outline" className="text-xs">Auto-renew</Badge>
                      )}
                    </div>
                    {subscription.status === 'active' && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">
                          Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}
                          {getDaysUntilBilling(subscription.nextBillingDate) > 0 && (
                            <span> ({getDaysUntilBilling(subscription.nextBillingDate)} days)</span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-2">
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
            <CardTitle>My Invoices</CardTitle>
            <CardDescription>
              Your billing history and upcoming payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice._id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{invoice.invoiceNumber}</h4>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm font-medium">{formatCurrency(invoice.amount)}</span>
                      <span className="text-xs text-gray-500">{invoice.currency}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-xs text-gray-500">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {invoice.status === 'paid' ? (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    ) : (
                      <Button size="sm">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common customer tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button className="w-full justify-start" variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Methods
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <User className="h-4 w-4 mr-2" />
              Profile Settings
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoices
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Support
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Billing History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}