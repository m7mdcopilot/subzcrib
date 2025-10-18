import mongoose, { Document, Schema } from 'mongoose'

export interface ISubscription extends Document {
  customer: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  status: 'active' | 'cancelled' | 'expired' | 'paused'
  startDate: Date
  endDate?: Date
  nextBillingDate: Date
  amount: number
  currency: string
  billingCycle: 'monthly' | 'yearly' | 'weekly' | 'daily'
  autoRenew: boolean
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
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired', 'paused'],
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
  }
}, {
  timestamps: true
})

export default mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema)