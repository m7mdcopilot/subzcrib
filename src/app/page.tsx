'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreditCard, Users, TrendingUp, AlertCircle, Plus, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubscriptionList } from '@/components/subscriptions'
import { AnalyticsDashboard } from '@/components/analytics'
import { CustomerPortal } from '@/components/customer-portal'

interface DashboardStats {
  totalMRR: number
  activeSubscriptions: number
  totalCustomers: number
  churnRate: number
}

interface RecentSubscription {
  id: string
  customerName: string
  productName: string
  status: string
  amount: number
  nextBillingDate: string
}

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMRR: 0,
    activeSubscriptions: 0,
    totalCustomers: 0,
    churnRate: 0
  })

  const [recentSubscriptions, setRecentSubscriptions] = useState<RecentSubscription[]>([])

  useEffect(() => {
    // Mock data for now - will be replaced with API calls
    setStats({
      totalMRR: 15420,
      activeSubscriptions: 142,
      totalCustomers: 128,
      churnRate: 3.2
    })

    setRecentSubscriptions([
      {
        id: '1',
        customerName: 'John Doe',
        productName: 'Pro Plan',
        status: 'active',
        amount: 99,
        nextBillingDate: '2024-02-15'
      },
      {
        id: '2',
        customerName: 'Jane Smith',
        productName: 'Business Plan',
        status: 'active',
        amount: 299,
        nextBillingDate: '2024-02-20'
      },
      {
        id: '3',
        customerName: 'Bob Johnson',
        productName: 'Starter Plan',
        status: 'cancelled',
        amount: 49,
        nextBillingDate: '2024-01-30'
      }
    ])
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      cancelled: 'destructive',
      expired: 'secondary',
      paused: 'secondary'
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-8 h-8">
              <img
                src="/logo.svg"
                alt="subzcrib.com"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold">subzcrib.com</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Subscription Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your recurring revenue and track key business metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalMRR)}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
              <p className="text-xs text-muted-foreground">
                +8 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                +5 new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.churnRate}%</div>
              <p className="text-xs text-muted-foreground">
                -0.8% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Subscriptions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Subscriptions</CardTitle>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subscription
                    </Button>
                  </div>
                  <CardDescription>
                    Latest subscription activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSubscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell className="font-medium">{subscription.customerName}</TableCell>
                          <TableCell>{subscription.productName}</TableCell>
                          <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                          <TableCell>{formatCurrency(subscription.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks for subscription management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Subscription
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Add New Customer
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Generate Invoices
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionList />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerPortal />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}