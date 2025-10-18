import mongoose, { Document, Schema } from 'mongoose'

export interface IInvoice extends Document {
  customer: mongoose.Types.ObjectId
  subscription: mongoose.Types.ObjectId
  invoiceNumber: string
  amount: number
  currency: string
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
  dueDate: Date
  paidDate?: Date
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const InvoiceSchema = new Schema<IInvoice>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Customer is required']
  },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
    required: [true, 'Subscription is required']
  },
  invoiceNumber: {
    type: String,
    required: [true, 'Invoice number is required'],
    unique: true
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
  status: {
    type: String,
    enum: ['draft', 'pending', 'paid', 'overdue', 'cancelled'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  paidDate: {
    type: Date
  },
  items: [{
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, 'Unit price must be a positive number']
    },
    total: {
      type: Number,
      required: true
    }
  }],
  notes: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', InvoiceSchema)