'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  User, 
  CreditCard, 
  FileText, 
  Settings, 
  Download, 
  Edit, 
  Pause, 
  Play,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

interface Subscription {
  id: string
  product: {
    name: string
    description: string
    billingCycle: string
  }
  status: 'active' | 'cancelled' | 'paused' | 'expired'
  amount: number
  currency: string
  nextBillingDate: string
  autoRenew: boolean
  startDate: string
}

interface Invoice {
  id: string
  invoiceNumber: string
  amount: number
  currency: string
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
  dueDate: string
  paidDate?: string
  createdAt: string
}

export function CustomerPortal() {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  })

  useEffect(() => {
    // Mock data - will be replaced with API calls
    const mockCustomer: Customer = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    }

    const mockSubscriptions: Subscription[] = [
      {
        id: '1',
        product: {
          name: 'Pro Plan',
          description: 'Professional features for growing businesses',
          billingCycle: 'monthly'
        },
        status: 'active',
        amount: 99,
        currency: 'USD',
        nextBillingDate: '2024-02-15',
        autoRenew: true,
        startDate: '2024-01-15'
      },
      {
        id: '2',
        product: {
          name: 'Add-on: Extra Storage',
          description: 'Additional 100GB storage space',
          billingCycle: 'monthly'
        },
        status: 'active',
        amount: 20,
        currency: 'USD',
        nextBillingDate: '2024-02-15',
        autoRenew: true,
        startDate: '2024-01-15'
      }
    ]

    const mockInvoices: Invoice[] = [
      {
        id: '1',
        invoiceNumber: 'INV-2024-001',
        amount: 99,
        currency: 'USD',
        status: 'paid',
        dueDate: '2024-01-15',
        paidDate: '2024-01-14',
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        invoiceNumber: 'INV-2024-002',
        amount: 119,
        currency: 'USD',
        status: 'pending',
        dueDate: '2024-02-15',
        createdAt: '2024-02-01'
      }
    ]

    setCustomer(mockCustomer)
    setSubscriptions(mockSubscriptions)
    setInvoices(mockInvoices)
    setEditForm({
      name: mockCustomer.name,
      email: mockCustomer.email,
      phone: mockCustomer.phone || '',
      address: mockCustomer.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    })
    setLoading(false)
  }, [])

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

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      cancelled: 'destructive',
      paused: 'secondary',
      expired: 'secondary',
      paid: 'default',
      pending: 'secondary',
      overdue: 'destructive'
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const handleSaveProfile = () => {
    // Mock save - will be replaced with API call
    if (customer) {
      setCustomer({
        ...customer,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        address: editForm.address
      })
      setIsEditProfileOpen(false)
      alert('Profile updated successfully!')
    }
  }

  const handleCancelSubscription = (subscriptionId: string) => {
    if (confirm('Are you sure you want to cancel this subscription?')) {
      // Mock cancel - will be replaced with API call
      setSubscriptions(subscriptions.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: 'cancelled' as const }
          : sub
      ))
      alert('Subscription cancelled successfully!')
    }
  }

  const handlePauseSubscription = (subscriptionId: string) => {
    // Mock pause - will be replaced with API call
    setSubscriptions(subscriptions.map(sub => 
      sub.id === subscriptionId 
        ? { ...sub, status: sub.status === 'paused' ? 'active' as const : 'paused' as const }
        : sub
    ))
    alert(subscriptions.find(s => s.id === subscriptionId)?.status === 'paused' 
      ? 'Subscription resumed!' 
      : 'Subscription paused!')
  }

  const downloadInvoice = (invoiceId: string) => {
    // Mock download - will be replaced with actual download
    alert(`Downloading invoice ${invoiceId}...`)
  }

  if (loading) {
    return <div>Loading customer portal...</div>
  }

  if (!customer) {
    return <div>Error loading customer data</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customer Portal</h1>
          <p className="text-muted-foreground">Manage your subscriptions and account</p>
        </div>
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your personal information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input
                      placeholder="Street"
                      value={editForm.address.street}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        address: {...editForm.address, street: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="City"
                      value={editForm.address.city}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        address: {...editForm.address, city: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="State"
                      value={editForm.address.state}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        address: {...editForm.address, state: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="ZIP Code"
                      value={editForm.address.zipCode}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        address: {...editForm.address, zipCode: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Country"
                      value={editForm.address.country}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        address: {...editForm.address, country: e.target.value}
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Customer Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{customer.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Subscriptions</p>
              <p className="font-medium">{subscriptions.filter(s => s.status === 'active').length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Total</p>
              <p className="font-medium">
                {formatCurrency(
                  subscriptions
                    .filter(s => s.status === 'active')
                    .reduce((sum, s) => sum + s.amount, 0),
                  'USD'
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Your Subscriptions</CardTitle>
              <CardDescription>
                Manage your active subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscriptions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  You don't have any active subscriptions
                </div>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((subscription) => (
                    <div key={subscription.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{subscription.product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {subscription.product.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(subscription.amount, subscription.currency)}
                            <span className="text-sm text-muted-foreground ml-1">
                              /{subscription.product.billingCycle}
                            </span>
                          </p>
                          {getStatusBadge(subscription.status)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Next billing: {formatDate(subscription.nextBillingDate)}</span>
                        <div className="flex gap-2">
                          {(subscription.status === 'active' || subscription.status === 'paused') && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handlePauseSubscription(subscription.id)}
                              >
                                {subscription.status === 'paused' ? (
                                  <>
                                    <Play className="w-4 h-4 mr-1" />
                                    Resume
                                  </>
                                ) : (
                                  <>
                                    <Pause className="w-4 h-4 mr-1" />
                                    Pause
                                  </>
                                )}
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleCancelSubscription(subscription.id)}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your payment methods and billing settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Payment Method</span>
                    </div>
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Visa ending in 4242</p>
                    <p>Expires 12/2025</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    Update Payment Method
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">Billing Settings</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Auto-renew subscriptions</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Email notifications</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>
                View and download your billing history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No invoices found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                        <TableCell>{formatCurrency(invoice.amount, invoice.currency)}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadInvoice(invoice.id)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Notification Preferences</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Billing reminders</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Subscription updates</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Marketing emails</span>
                      <Badge variant="secondary">Disabled</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Security</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Password</span>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Two-factor authentication</span>
                      <Badge variant="secondary">Disabled</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}