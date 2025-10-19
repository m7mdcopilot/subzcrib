import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  role: 'PORTAL_ADMIN' | 'MERCHANT' | 'CUSTOMER'
  merchantId?: mongoose.Types.ObjectId // For merchants and customers
  customerId?: mongoose.Types.ObjectId // For customers
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  // Portal Admin specific
  permissions?: string[]
  // Merchant specific
  businessName?: string
  businessEmail?: string
  businessPhone?: string
  // Customer specific
  customerSince?: Date
  preferences?: {
    language: string
    currency: string
    timezone: string
  }
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['PORTAL_ADMIN', 'MERCHANT', 'CUSTOMER'],
    default: 'CUSTOMER'
  },
  merchantId: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    required: function() {
      return this.role === 'MERCHANT' || this.role === 'CUSTOMER'
    }
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: function() {
      return this.role === 'CUSTOMER'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  // Portal Admin specific
  permissions: [{
    type: String
  }],
  // Merchant specific
  businessName: {
    type: String,
    required: function() {
      return this.role === 'MERCHANT'
    }
  },
  businessEmail: {
    type: String,
    lowercase: true,
    trim: true
  },
  businessPhone: {
    type: String
  },
  // Customer specific
  customerSince: {
    type: Date,
    default: Date.now
  },
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    currency: {
      type: String,
      default: 'USD'
    },
    timezone: {
      type: String,
      default: 'UTC'
    }
  }
}, {
  timestamps: true
})

// Indexes for performance
UserSchema.index({ email: 1 })
UserSchema.index({ role: 1 })
UserSchema.index({ merchantId: 1 })
UserSchema.index({ isActive: 1 })

// Pre-save middleware
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    // Hash password would go here in a real implementation
    // For now, we'll store it as is (not secure for production)
  }
  next()
})

// Methods
UserSchema.methods.toJSON = function() {
  const user = this.toObject()
  delete user.password
  return user
}

export default mongoose.model<IUser>('User', UserSchema)