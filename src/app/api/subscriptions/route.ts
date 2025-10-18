import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Subscription } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    const skip = (page - 1) * limit
    
    // Build query
    let query: any = {}
    
    if (status && status !== 'all') {
      query.status = status
    }
    
    if (search) {
      query.$or = [
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } },
        { 'product.name': { $regex: search, $options: 'i' } }
      ]
    }
    
    const subscriptions = await Subscription.find(query)
      .populate('customer')
      .populate('product')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
    
    const total = await Subscription.countDocuments(query)
    
    return NextResponse.json({
      subscriptions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Calculate next billing date based on billing cycle
    const startDate = new Date(body.startDate)
    const nextBillingDate = new Date(startDate)
    
    switch (body.billingCycle) {
      case 'daily':
        nextBillingDate.setDate(startDate.getDate() + 1)
        break
      case 'weekly':
        nextBillingDate.setDate(startDate.getDate() + 7)
        break
      case 'monthly':
        nextBillingDate.setMonth(startDate.getMonth() + 1)
        break
      case 'yearly':
        nextBillingDate.setFullYear(startDate.getFullYear() + 1)
        break
    }
    
    const subscription = new Subscription({
      ...body,
      nextBillingDate,
      status: 'active'
    })
    
    await subscription.save()
    
    // Populate customer and product for response
    await subscription.populate('customer')
    await subscription.populate('product')
    
    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}