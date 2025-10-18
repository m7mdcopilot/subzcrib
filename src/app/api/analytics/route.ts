import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Subscription, Customer, Invoice } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Get current date and previous month date for comparison
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    
    // Calculate MRR (Monthly Recurring Revenue)
    const activeSubscriptions = await Subscription.find({ status: 'active' })
    const totalMRR = activeSubscriptions.reduce((sum, sub) => {
      if (sub.billingCycle === 'monthly') {
        return sum + sub.amount
      } else if (sub.billingCycle === 'yearly') {
        return sum + (sub.amount / 12) // Convert yearly to monthly
      } else if (sub.billingCycle === 'weekly') {
        return sum + (sub.amount * 4.33) // Convert weekly to monthly (52 weeks / 12 months)
      } else if (sub.billingCycle === 'daily') {
        return sum + (sub.amount * 30) // Convert daily to monthly
      }
      return sum
    }, 0)
    
    // Get subscription counts
    const activeSubscriptionsCount = await Subscription.countDocuments({ status: 'active' })
    const totalSubscriptions = await Subscription.countDocuments()
    
    // Get customer counts
    const totalCustomers = await Customer.countDocuments()
    const activeCustomers = await Customer.countDocuments({ status: 'active' })
    
    // Calculate churn rate
    const cancelledSubscriptions = await Subscription.countDocuments({ 
      status: 'cancelled',
      updatedAt: { $gte: lastMonth }
    })
    const churnRate = totalSubscriptions > 0 ? ((cancelledSubscriptions / totalSubscriptions) * 100).toFixed(1) : 0
    
    // Get revenue data for the last 6 months
    const revenueData: Array<{ month: string; revenue: number }> = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)
      
      const monthSubscriptions = await Subscription.find({
        status: 'active',
        createdAt: { $lte: monthEnd }
      })
      
      const monthRevenue = monthSubscriptions.reduce((sum, sub) => {
        if (sub.billingCycle === 'monthly') {
          return sum + sub.amount
        } else if (sub.billingCycle === 'yearly') {
          return sum + (sub.amount / 12)
        } else if (sub.billingCycle === 'weekly') {
          return sum + (sub.amount * 4.33)
        } else if (sub.billingCycle === 'daily') {
          return sum + (sub.amount * 30)
        }
        return sum
      }, 0)
      
      revenueData.push({
        month: monthStart.toLocaleString('default', { month: 'short', year: 'numeric' }),
        revenue: Math.round(monthRevenue)
      })
    }
    
    // Get subscription status distribution
    const statusDistribution = await Subscription.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])
    
    // Get recent subscriptions
    const recentSubscriptions = await Subscription.find()
      .populate('customer')
      .populate('product')
      .sort({ createdAt: -1 })
      .limit(5)
    
    // Get invoice statistics
    const totalInvoices = await Invoice.countDocuments()
    const paidInvoices = await Invoice.countDocuments({ status: 'paid' })
    const pendingInvoices = await Invoice.countDocuments({ status: 'pending' })
    
    return NextResponse.json({
      stats: {
        totalMRR: Math.round(totalMRR),
        activeSubscriptions: activeSubscriptionsCount,
        totalCustomers,
        churnRate: parseFloat(churnRate.toString())
      },
      revenueData,
      statusDistribution,
      recentSubscriptions,
      invoiceStats: {
        total: totalInvoices,
        paid: paidInvoices,
        pending: pendingInvoices
      }
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}