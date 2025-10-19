import mongoose, { Document, Schema } from 'mongoose'

export interface ICustomer extends Document {
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  merchantId: mongoose.Types.ObjectId // Reference to the merchant this customer belongs to
  status: 'active' | 'inactive' | 'cancelled'
  customerSince: Date
  lastPurchaseDate?: Date
  totalSpent: number
  preferences?: {
    language: string
    currency: string
    timezone: string
    communication: {
      email: boolean
      sms: boolean
    }
  }
  createdAt: Date
  updatedAt: Date
}

const CustomerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Customer email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false },
    country: { type: String, required: false }
  },
  merchantId: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    required: [true, 'Customer must belong to a merchant']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'active'
  },
  customerSince: {
    type: Date,
    default: Date.now
  },
  lastPurchaseDate: {
    type: Date
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  preferences: {
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'USD' },
    timezone: { type: String, default: 'UTC' },
    communication: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    }
  }
}, {
  timestamps: true
})

// Indexes for performance
CustomerSchema.index({ email: 1 })
CustomerSchema.index({ merchantId: 1 })
CustomerSchema.index({ status: 1 })
CustomerSchema.index({ customerSince: -1 })

export default mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema)