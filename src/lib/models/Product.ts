import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  currency: string
  billingCycle: 'monthly' | 'yearly' | 'weekly' | 'daily'
  features: string[]
  merchantId: mongoose.Types.ObjectId // Reference to the merchant who owns this product
  category?: string
  tags?: string[]
  images?: string[]
  trialPeriod?: number // in days
  setupFee?: number
  status: 'active' | 'inactive' | 'archived'
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be a positive number']
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
  features: [{
    type: String
  }],
  merchantId: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    required: [true, 'Product must belong to a merchant']
  },
  category: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String
  }],
  trialPeriod: {
    type: Number,
    min: [0, 'Trial period must be a positive number']
  },
  setupFee: {
    type: Number,
    min: [0, 'Setup fee must be a positive number'],
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true
})

// Indexes for performance
ProductSchema.index({ name: 1 })
ProductSchema.index({ merchantId: 1 })
ProductSchema.index({ status: 1 })
ProductSchema.index({ category: 1 })
ProductSchema.index({ billingCycle: 1 })

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)