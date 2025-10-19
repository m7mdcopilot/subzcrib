'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Pause, Play } from 'lucide-react'
import { SubscriptionForm } from './SubscriptionForm'

interface Subscription {
  id: string
  customer: {
    name: string
    email: string
  }
  product: {
    name: string
    billingCycle: string
  }
  status: 'active' | 'cancelled' | 'expired' | 'paused'
  amount: number
  currency: string
  nextBillingDate: string
  autoRenew: boolean
  createdAt: string
}

export function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Mock data - will be replaced with API calls
    const mockSubscriptions: Subscription[] = [
      {
        id: '1',
        customer: { name: 'John Doe', email: 'john@example.com' },
        product: { name: 'Pro Plan', billingCycle: 'monthly' },
        status: 'active',
        amount: 99,
        currency: 'USD',
        nextBillingDate: '2024-02-15',
        autoRenew: true,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        customer: { name: 'Jane Smith', email: 'jane@example.com' },
        product: { name: 'Business Plan', billingCycle: 'yearly' },
        status: 'active',
        amount: 299,
        currency: 'USD',
        nextBillingDate: '2024-12-20',
        autoRenew: true,
        createdAt: '2023-12-20'
      },
      {
        id: '3',
        customer: { name: 'Bob Johnson', email: 'bob@example.com' },
        product: { name: 'Starter Plan', billingCycle: 'monthly' },
        status: 'cancelled',
        amount: 49,
        currency: 'USD',
        nextBillingDate: '2024-01-30',
        autoRenew: false,
        createdAt: '2023-11-30'
      },
      {
        id: '4',
        customer: { name: 'Alice Brown', email: 'alice@example.com' },
        product: { name: 'Enterprise Plan', billingCycle: 'monthly' },
        status: 'paused',
        amount: 599,
        currency: 'USD',
        nextBillingDate: '2024-02-10',
        autoRenew: true,
        createdAt: '2024-01-10'
      }
    ]
    
    setSubscriptions(mockSubscriptions)
    setLoading(false)
  }, [])

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      cancelled: 'destructive',
      expired: 'secondary',
      paused: 'secondary'
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return <div>Loading subscriptions...</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Subscriptions</CardTitle>
            <CardDescription>
              Manage all your customer subscriptions
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Subscription
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Subscription</DialogTitle>
                <DialogDescription>
                  Add a new subscription for a customer
                </DialogDescription>
              </DialogHeader>
              <SubscriptionForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search subscriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Auto Renew</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{subscription.customer.name}</div>
                      <div className="text-sm text-gray-500">{subscription.customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{subscription.product.name}</div>
                      <div className="text-sm text-gray-500">{subscription.product.billingCycle}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                  <TableCell>{formatCurrency(subscription.amount, subscription.currency)}</TableCell>
                  <TableCell>{formatDate(subscription.nextBillingDate)}</TableCell>
                  <TableCell>
                    {subscription.autoRenew ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        {subscription.status === 'paused' ? (
                          <Play className="w-4 h-4" />
                        ) : (
                          <Pause className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No subscriptions found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  )
}