import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { User, Customer, Merchant } from '@/lib/models'
import { createAuthResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      name,
      merchantId,
      phone,
      address
    } = await request.json()

    // Validate required fields
    if (!email || !password || !name || !merchantId) {
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

    // Check if merchant exists and is approved
    const merchant = await Merchant.findById(merchantId)
    if (!merchant) {
      return NextResponse.json(
        { error: 'Merchant not found' },
        { status: 404 }
      )
    }

    if (!merchant.isApproved) {
      return NextResponse.json(
        { error: 'Merchant is not yet approved' },
        { status: 400 }
      )
    }

    // Create customer
    const customer = new Customer({
      name,
      email,
      phone,
      address,
      merchantId: merchant._id
    })

    await customer.save()

    // Create user
    const user = new User({
      email,
      password,
      name,
      role: 'CUSTOMER',
      merchantId: merchant._id,
      customerId: customer._id
    })

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
    console.error('Customer registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}