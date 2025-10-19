import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Mock JWT secret - in production, use environment variable
const JWT_SECRET = 'your-secret-key-here'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'PORTAL_ADMIN' | 'MERCHANT' | 'CUSTOMER'
  merchantId?: string
  customerId?: string
}

export interface DecodedToken {
  userId: string
  email: string
  role: string
  merchantId?: string
  customerId?: string
  iat: number
  exp: number
}

// Create JWT token
export function createToken(user: AuthUser): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    merchantId: user.merchantId,
    customerId: user.customerId
  }
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Verify JWT token
export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken
  } catch (error) {
    return null
  }
}

// Get user from request
export async function getUserFromRequest(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    
    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return null
    }
    
    return {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role as 'PORTAL_ADMIN' | 'MERCHANT' | 'CUSTOMER',
      merchantId: decoded.merchantId,
      customerId: decoded.customerId
    }
  } catch (error) {
    return null
  }
}

// Role-based authorization middleware
export function authorizeRole(allowedRoles: ('PORTAL_ADMIN' | 'MERCHANT' | 'CUSTOMER')[]) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }
    
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden - Insufficient permissions' },
        { status: 403 }
      )
    }
    
    return null // User is authorized
  }
}

// Check if user can access merchant data
export function authorizeMerchantAccess(merchantId: string) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }
    
    // Portal admins can access any merchant data
    if (user.role === 'PORTAL_ADMIN') {
      return null
    }
    
    // Merchants can only access their own data
    if (user.role === 'MERCHANT' && user.merchantId === merchantId) {
      return null
    }
    
    // Customers can only access data from their merchant
    if (user.role === 'CUSTOMER' && user.merchantId === merchantId) {
      return null
    }
    
    return NextResponse.json(
      { error: 'Forbidden - Cannot access this merchant data' },
      { status: 403 }
    )
  }
}

// Check if user can access customer data
export function authorizeCustomerAccess(customerId: string) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }
    
    // Portal admins can access any customer data
    if (user.role === 'PORTAL_ADMIN') {
      return null
    }
    
    // Merchants can access their own customers
    if (user.role === 'MERCHANT') {
      // We'll need to check if this customer belongs to the merchant
      // This will be implemented in the API route
      return null
    }
    
    // Customers can only access their own data
    if (user.role === 'CUSTOMER' && user.customerId === customerId) {
      return null
    }
    
    return NextResponse.json(
      { error: 'Forbidden - Cannot access this customer data' },
      { status: 403 }
    )
  }
}

// Create auth response with token
export function createAuthResponse(user: AuthUser) {
  const token = createToken(user)
  
  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      merchantId: user.merchantId,
      customerId: user.customerId
    },
    token
  })
}