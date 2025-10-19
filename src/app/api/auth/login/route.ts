import { NextRequest, NextResponse } from 'next/server'
import { createAuthResponse } from '@/lib/auth'
import { db } from '@/lib/db'
import { User } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Demo users for testing (when database is not available)
    const demoUsers = [
      {
        id: '1',
        email: 'admin@subzcrib.com',
        password: 'admin123',
        name: 'Portal Admin',
        role: 'PORTAL_ADMIN' as const,
        merchantId: undefined,
        customerId: undefined
      },
      {
        id: '2',
        email: 'merchant@subzcrib.com',
        password: 'merchant123',
        name: 'Demo Merchant',
        role: 'MERCHANT' as const,
        merchantId: 'merchant-demo-id',
        customerId: undefined
      },
      {
        id: '3',
        email: 'customer@subzcrib.com',
        password: 'customer123',
        name: 'Demo Customer',
        role: 'CUSTOMER' as const,
        merchantId: 'merchant-demo-id',
        customerId: 'customer-demo-id'
      }
    ]

    // Check if it's a demo user
    const demoUser = demoUsers.find(user => user.email === email && user.password === password)
    
    if (demoUser) {
      // Create auth response for demo user
      const authUser = {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
        merchantId: demoUser.merchantId,
        customerId: demoUser.customerId
      }

      return createAuthResponse(authUser)
    }

    // If not demo user, try to find in database (if available)
    try {
      const user = await User.findOne({ email, isActive: true }) as any
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      // In a real implementation, you would hash and compare passwords
      // For now, we'll use a simple comparison (not secure for production)
      if (user.password !== password) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      // Update last login
      user.lastLogin = new Date()
      await user.save()

      // Create auth response
      const authUser = {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        merchantId: user.merchantId?.toString(),
        customerId: user.customerId?.toString()
      }

      return createAuthResponse(authUser)
    } catch (dbError) {
      // Database error - return invalid credentials immediately
      console.error('Database error during login:', dbError)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}