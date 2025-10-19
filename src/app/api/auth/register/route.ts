import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { User, Merchant } from '@/lib/models'
import { createAuthResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      name,
      businessName,
      businessEmail,
      businessPhone,
      businessType,
      industry
    } = await request.json()

    // Validate required fields
    if (!email || !password || !name || !businessName || !businessType || !industry) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Check if merchant already exists
    const existingMerchant = await Merchant.findOne({ email: businessEmail || email })
    if (existingMerchant) {
      return NextResponse.json(
        { error: 'Merchant with this email already exists' },
        { status: 409 }
      )
    }

    // Create merchant
    const merchant = new Merchant({
      name: businessName,
      email: businessEmail || email,
      phone: businessPhone,
      businessType,
      industry,
      isApproved: false // Requires admin approval
    })

    await merchant.save()

    // Create user
    const user = new User({
      email,
      password,
      name,
      role: 'MERCHANT',
      merchantId: merchant._id,
      businessName
    })

    await user.save()

    // Create auth response
    const authUser = {
      id: (user as any)._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      merchantId: (user as any).merchantId?.toString()
    }

    return createAuthResponse(authUser)

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}