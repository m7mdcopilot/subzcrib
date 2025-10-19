'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Info, Key, User } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('merchant')
  
  const { login } = useAuth()
  const router = useRouter()

  // Demo credentials
  const demoCredentials = {
    admin: {
      email: 'admin@subzcrib.com',
      password: 'admin123',
      name: 'Portal Admin',
      description: 'Platform administrator with full access'
    },
    merchant: {
      email: 'merchant@subzcrib.com',
      password: 'merchant123',
      name: 'Demo Merchant',
      description: 'Business owner with merchant dashboard access'
    },
    customer: {
      email: 'customer@subzcrib.com',
      password: 'customer123',
      name: 'Demo Customer',
      description: 'Subscriber with customer portal access'
    }
  }

  // Auto-fill demo credentials when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    const credentials = demoCredentials[tab as keyof typeof demoCredentials]
    setEmail(credentials.email)
    setPassword(credentials.password)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const success = await login(email, password)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Welcome to subzcrib.com
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Role-based subscription management platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demo Credentials Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Demo Credentials
              </CardTitle>
              <CardDescription>
                Use these credentials to test the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      Admin
                    </Badge>
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-blue-900">{demoCredentials.admin.email}</p>
                  <p className="text-xs text-blue-700">Password: {demoCredentials.admin.password}</p>
                  <p className="text-xs text-blue-600 mt-1">{demoCredentials.admin.description}</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Merchant
                    </Badge>
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-green-900">{demoCredentials.merchant.email}</p>
                  <p className="text-xs text-green-700">Password: {demoCredentials.merchant.password}</p>
                  <p className="text-xs text-green-600 mt-1">{demoCredentials.merchant.description}</p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      Customer
                    </Badge>
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-purple-900">{demoCredentials.customer.email}</p>
                  <p className="text-xs text-purple-700">Password: {demoCredentials.customer.password}</p>
                  <p className="text-xs text-purple-600 mt-1">{demoCredentials.customer.description}</p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  These are demo credentials for testing purposes. Click on any role below to auto-fill the login form.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Login Form Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Choose your account type to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                  <TabsTrigger value="merchant">Merchant</TabsTrigger>
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="admin" className="mt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@subzcrib.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign in as Admin'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="merchant" className="mt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="merchant-email">Merchant Email</Label>
                      <Input
                        id="merchant-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="merchant@subzcrib.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="merchant-password">Password</Label>
                      <Input
                        id="merchant-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign in as Merchant'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="customer" className="mt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="customer-email">Customer Email</Label>
                      <Input
                        id="customer-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="customer@subzcrib.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer-password">Password</Label>
                      <Input
                        id="customer-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign in as Customer'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}