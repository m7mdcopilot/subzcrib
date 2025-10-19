import { db } from '../src/lib/db'
import { User, Merchant, Customer } from '../src/lib/models'
import connectDB from '../src/lib/mongodb'

async function createDemoUsers() {
  try {
    // Connect to database
    await connectDB()
    console.log('✅ Connected to database')

    // Clear existing demo data (optional)
    await User.deleteMany({ email: { $in: ['admin@subzcrib.com', 'merchant@subzcrib.com', 'customer@subzcrib.com'] } })
    await Merchant.deleteMany({ email: { $in: ['merchant@subzcrib.com'] } })
    await Customer.deleteMany({ email: { $in: ['customer@subzcrib.com'] } })
    console.log('🗑️  Cleared existing demo data')

    // 1. Create Portal Admin
    const portalAdmin = new User({
      email: 'admin@subzcrib.com',
      password: 'admin123',
      name: 'Portal Admin',
      role: 'PORTAL_ADMIN',
      isActive: true,
      permissions: ['manage_merchants', 'manage_customers', 'view_analytics', 'system_settings']
    })
    await portalAdmin.save()
    console.log('👤 Created Portal Admin:', portalAdmin.email)

    // 2. Create Merchant
    const merchant = new Merchant({
      name: 'Demo Merchant Inc.',
      email: 'merchant@subzcrib.com',
      businessType: 'SaaS',
      industry: 'Technology',
      description: 'A demo SaaS company for testing the subscription platform',
      website: 'https://demomerchant.com',
      isApproved: true, // Auto-approve for demo
      subscriptionPlan: 'premium',
      billingEmail: 'billing@demomerchant.com',
      supportEmail: 'support@demomerchant.com',
      phone: '+1-555-0123',
      address: {
        street: '123 Demo Street',
        city: 'Demo City',
        state: 'Demo State',
        zipCode: '12345',
        country: 'United States'
      },
      settings: {
        currency: 'USD',
        timezone: 'UTC',
        language: 'en',
        autoBilling: true,
        invoiceGeneration: true,
        emailNotifications: true
      }
    })
    await merchant.save()
    console.log('🏢 Created Merchant:', merchant.name)

    // 3. Create Merchant User
    const merchantUser = new User({
      email: 'merchant@subzcrib.com',
      password: 'merchant123',
      name: 'Demo Merchant',
      role: 'MERCHANT',
      merchantId: merchant._id,
      isActive: true,
      businessName: merchant.name,
      businessEmail: merchant.email
    })
    await merchantUser.save()
    console.log('👤 Created Merchant User:', merchantUser.email)

    // 4. Create Customer
    const customer = new Customer({
      name: 'Demo Customer',
      email: 'customer@subzcrib.com',
      phone: '+1-555-0456',
      address: {
        street: '456 Customer Ave',
        city: 'Customer City',
        state: 'Customer State',
        zipCode: '67890',
        country: 'United States'
      },
      merchantId: merchant._id,
      status: 'active',
      customerSince: new Date(),
      totalSpent: 0,
      preferences: {
        language: 'en',
        currency: 'USD',
        timezone: 'UTC',
        communication: {
          email: true,
          sms: false
        }
      }
    })
    await customer.save()
    console.log('👥 Created Customer:', customer.name)

    // 5. Create Customer User
    const customerUser = new User({
      email: 'customer@subzcrib.com',
      password: 'customer123',
      name: 'Demo Customer',
      role: 'CUSTOMER',
      merchantId: merchant._id,
      customerId: customer._id,
      isActive: true,
      customerSince: new Date()
    })
    await customerUser.save()
    console.log('👤 Created Customer User:', customerUser.email)

    // Display demo credentials
    console.log('\n🎉 Demo users created successfully!')
    console.log('\n📋 Demo Credentials:')
    console.log('═════════════════════════════════════════')
    console.log('🔵 PORTAL ADMIN:')
    console.log('   Email: admin@subzcrib.com')
    console.log('   Password: admin123')
    console.log('   Role: Platform Administrator')
    console.log('')
    console.log('🟢 MERCHANT:')
    console.log('   Email: merchant@subzcrib.com')
    console.log('   Password: merchant123')
    console.log('   Role: Business Owner')
    console.log('')
    console.log('🟣 CUSTOMER:')
    console.log('   Email: customer@subzcrib.com')
    console.log('   Password: customer123')
    console.log('   Role: Subscriber')
    console.log('═════════════════════════════════════════')
    console.log('\n💡 You can now use these credentials to test the login functionality!')

  } catch (error) {
    console.error('❌ Error creating demo users:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

// Run the script
createDemoUsers()