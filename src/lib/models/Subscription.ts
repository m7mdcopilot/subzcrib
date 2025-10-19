import mongoose, { Document, Schema } from 'mongoose'

export interface ISubscription extends Document {
  customer: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  merchantId: mongoose.Types.ObjectId // Reference to the merchant
  subscriptionType: 'B2B' | 'B2C' | 'C2B' // Business-to-Business, Business-to-Customer, Customer-to-Business
  status: 'active' | 'cancelled' | 'expired' | 'paused' | 'trial'
  startDate: Date
  endDate?: Date
  nextBillingDate: Date
  trialEndDate?: Date
  amount: number
  currency: string
  billingCycle: 'monthly' | 'yearly' | 'weekly' | 'daily'
  autoRenew: boolean
  metadata?: {
    setupFee?: number
    discount?: number
    promoCode?: string
    notes?: string
    customFields?: Record<string, any>
  }
  createdAt: Date
  updatedAt: Date
}

const SubscriptionSchema = new Schema<ISubscription>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Customer is required']
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  },
  merchantId: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    required: [true, 'Merchant is required']
  },
  subscriptionType: {
    type: String,
    enum: ['B2B', 'B2C', 'C2B'],
    required: [true, 'Subscription type is required'],
    default: 'B2C'
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired', 'paused', 'trial'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    default: Date.now
  },
  endDate: {
    type: Date
  },
  nextBillingDate: {
    type: Date,
    required: [true, 'Next billing date is required']
  },
  trialEndDate: {
    type: Date
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be a positive number']
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    default: 'USD',
    uppercase: true
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly', 'weekly', 'daily'],
    required: [true, 'Billing cycle is required']
  },
  autoRenew: {
    type: Boolean,
    default: true
  },
  metadata: {
    setupFee: { type: Number, min: [0, 'Setup fee must be positive'] },
    discount: { type: Number, min: [0, 'Discount must be positive'] },
    promoCode: { type: String, trim: true },
    notes: { type: String, trim: true },
    customFields: { type: Schema.Types.Mixed }
  }
}, {
  timestamps: true
})

// Indexes for performance
SubscriptionSchema.index({ customer: 1 })
SubscriptionSchema.index({ product: 1 })
SubscriptionSchema.index({ merchantId: 1 })
SubscriptionSchema.index({ status: 1 })
SubscriptionSchema.index({ subscriptionType: 1 })
SubscriptionSchema.index({ nextBillingDate: 1 })
SubscriptionSchema.index({ billingCycle: 1 })

export default mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema)