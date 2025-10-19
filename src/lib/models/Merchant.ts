import mongoose, { Schema, Document } from 'mongoose'

export interface IMerchant extends Document {
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  businessType: string
  industry: string
  website?: string
  description?: string
  subscriptionPlan?: mongoose.Types.ObjectId
  isActive: boolean
  isApproved: boolean
  approvedBy?: mongoose.Types.ObjectId
  approvedAt?: Date
  billingInfo?: {
    paymentMethod: string
    billingEmail: string
    billingAddress: {
      street: string
      city: string
      state: string
      country: string
      zipCode: string
    }
  }
  settings?: {
    currency: string
    timezone: string
    language: string
    invoicePrefix: string
    autoBilling: boolean
    notifications: {
      email: boolean
      sms: boolean
    }
  }
  createdAt: Date
  updatedAt: Date
}

const MerchantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    zipCode: { type: String, trim: true }
  },
  businessType: {
    type: String,
    required: true,
    enum: ['SOLE_PROPRIETORSHIP', 'PARTNERSHIP', 'CORPORATION', 'LLC', 'NON_PROFIT']
  },
  industry: {
    type: String,
    required: true
  },
  website: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  subscriptionPlan: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  billingInfo: {
    paymentMethod: { type: String },
    billingEmail: { type: String, lowercase: true, trim: true },
    billingAddress: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zipCode: { type: String, trim: true }
    }
  },
  settings: {
    currency: { type: String, default: 'USD' },
    timezone: { type: String, default: 'UTC' },
    language: { type: String, default: 'en' },
    invoicePrefix: { type: String, default: 'INV-' },
    autoBilling: { type: Boolean, default: true },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    }
  }
}, {
  timestamps: true
})

// Indexes for performance
MerchantSchema.index({ email: 1 })
MerchantSchema.index({ isActive: 1 })
MerchantSchema.index({ isApproved: 1 })
MerchantSchema.index({ businessType: 1 })
MerchantSchema.index({ industry: 1 })

export default mongoose.model<IMerchant>('Merchant', MerchantSchema)