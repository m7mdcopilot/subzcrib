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

    // Find user by email
    const user = await User.findOne({ email, isActive: true })
    
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

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}