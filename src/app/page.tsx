'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, TrendingUp, Shield } from 'lucide-react'

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-8 h-8">
              <div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">subzcrib.com</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push('/login')}>
              Sign In
            </Button>
            <Button onClick={() => router.push('/register')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Modern Subscription Management
            <span className="text-blue-600"> for Every Business</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            subzcrib.com provides a complete subscription management platform with role-based dashboards, 
            powerful analytics, and seamless customer experiences.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={() => router.push('/register')}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/login')}>
              Sign In
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Building2 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">Portal Admin</CardTitle>
              <CardDescription>
                Manage the entire platform with comprehensive analytics and merchant oversight
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-lg">Merchant</CardTitle>
              <CardDescription>
                Run your business with customer management, products, and revenue tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <CardTitle className="text-lg">Customer</CardTitle>
              <CardDescription>
                Manage subscriptions, view invoices, and access self-service features
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 mx-auto text-red-600 mb-2" />
              <CardTitle className="text-lg">Secure</CardTitle>
              <CardDescription>
                Enterprise-grade security with role-based access and data isolation
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Role-based Dashboard Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Role-Based Dashboards</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Portal Admin</h4>
                <ul className="text-left text-blue-800 space-y-2">
                  <li>• Platform analytics & metrics</li>
                  <li>• Merchant management</li>
                  <li>• B2B subscriptions</li>
                  <li>• Merchant invoicing</li>
                  <li>• Staff management</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full">
                Admin Demo
              </Button>
            </div>

            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-6 mb-4">
                <h4 className="text-xl font-semibold text-green-900 mb-2">Merchant</h4>
                <ul className="text-left text-green-800 space-y-2">
                  <li>• Business analytics</li>
                  <li>• B2B subscriptions</li>
                  <li>• Customer management</li>
                  <li>• Product catalog</li>
                  <li>• Team management</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full">
                Merchant Demo
              </Button>
            </div>

            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <h4 className="text-xl font-semibold text-purple-900 mb-2">Customer</h4>
                <ul className="text-left text-purple-800 space-y-2">
                  <li>• Subscription usage</li>
                  <li>• Personal subscriptions</li>
                  <li>• Invoice access</li>
                  <li>• Account settings</li>
                  <li>• Payment methods</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full">
                Customer Demo
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Subscription Business?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses using subzcrib.com to manage their recurring revenue.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary" onClick={() => router.push('/register')}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" onClick={() => router.push('/login')}>
              Sign In to Account
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 subzcrib.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}