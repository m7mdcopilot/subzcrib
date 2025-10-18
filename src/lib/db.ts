import connectDB from './mongodb'
import { Customer, Product, Subscription, Invoice } from './models'

// Database connection
export { connectDB }

// Models
export { Customer, Product, Subscription, Invoice }

// Helper functions for database operations
export const db = {
  // Customer operations
  customers: {
    find: (query: any = {}) => Customer.find(query),
    findById: (id: string) => Customer.findById(id),
    create: (data: any) => Customer.create(data),
    update: (id: string, data: any) => Customer.findByIdAndUpdate(id, data, { new: true }),
    delete: (id: string) => Customer.findByIdAndDelete(id),
    count: (query: any = {}) => Customer.countDocuments(query)
  },
  
  // Product operations
  products: {
    find: (query: any = {}) => Product.find(query),
    findById: (id: string) => Product.findById(id),
    create: (data: any) => Product.create(data),
    update: (id: string, data: any) => Product.findByIdAndUpdate(id, data, { new: true }),
    delete: (id: string) => Product.findByIdAndDelete(id),
    count: (query: any = {}) => Product.countDocuments(query)
  },
  
  // Subscription operations
  subscriptions: {
    find: (query: any = {}) => Subscription.find(query).populate('customer').populate('product'),
    findById: (id: string) => Subscription.findById(id).populate('customer').populate('product'),
    create: (data: any) => Subscription.create(data),
    update: (id: string, data: any) => Subscription.findByIdAndUpdate(id, data, { new: true }),
    delete: (id: string) => Subscription.findByIdAndDelete(id),
    count: (query: any = {}) => Subscription.countDocuments(query)
  },
  
  // Invoice operations
  invoices: {
    find: (query: any = {}) => Invoice.find(query).populate('customer').populate('subscription'),
    findById: (id: string) => Invoice.findById(id).populate('customer').populate('subscription'),
    create: (data: any) => Invoice.create(data),
    update: (id: string, data: any) => Invoice.findByIdAndUpdate(id, data, { new: true }),
    delete: (id: string) => Invoice.findByIdAndDelete(id),
    count: (query: any = {}) => Invoice.countDocuments(query)
  }
}