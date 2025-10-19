'use client'

import { useAuth, usePortalAdmin, useMerchant, useCustomer } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Package, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  LogOut,
  User,
  ShoppingCart,
  FileText,
  Bell,
  Shield,
  BarChart3,
  Clock,
  AlertTriangle,
  Download,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface NavItem {
  name: string
  href: string
  icon: any
  badge?: string
  description?: string
}

const navigation = {
  PORTAL_ADMIN: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Platform overview'
    },
    {
      name: 'Merchants',
      href: '/dashboard/merchants',
      icon: Building2,
      description: 'Manage all merchants'
    },
    {
      name: 'Customers',
      href: '/dashboard/customers',
      icon: Users,
      description: 'View all customers'
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      description: 'Platform analytics'
    },
    {
      name: 'Approvals',
      href: '/dashboard/approvals',
      icon: Shield,
      badge: '8',
      description: 'Pending approvals'
    },
    {
      name: 'System Alerts',
      href: '/dashboard/alerts',
      icon: AlertTriangle,
      description: 'System notifications'
    },
    {
      name: 'Revenue',
      href: '/dashboard/revenue',
      icon: DollarSign,
      description: 'Revenue reports'
    }
  ],
  MERCHANT: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Business overview'
    },
    {
      name: 'Products',
      href: '/dashboard/products',
      icon: Package,
      description: 'Manage your products'
    },
    {
      name: 'Customers',
      href: '/dashboard/customers',
      icon: Users,
      description: 'Manage your customers'
    },
    {
      name: 'Subscriptions',
      href: '/dashboard/subscriptions',
      icon: CreditCard,
      description: 'View subscriptions'
    },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
      icon: FileText,
      description: 'Billing & invoices'
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: TrendingUp,
      description: 'Business analytics'
    },
    {
      name: 'My Subscriptions',
      href: '/dashboard/my-subscriptions',
      icon: ShoppingCart,
      description: 'Your subscriptions'
    }
  ],
  CUSTOMER: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Account overview'
    },
    {
      name: 'My Subscriptions',
      href: '/dashboard/subscriptions',
      icon: Package,
      description: 'Manage subscriptions'
    },
    {
      name: 'Billing',
      href: '/dashboard/billing',
      icon: CreditCard,
      description: 'Payment methods'
    },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
      icon: FileText,
      description: 'Billing history'
    },
    {
      name: 'Browse Products',
      href: '/dashboard/products',
      icon: ShoppingCart,
      description: 'Discover products'
    },
    {
      name: 'Account',
      href: '/dashboard/account',
      icon: User,
      description: 'Account settings'
    },
    {
      name: 'Support',
      href: '/dashboard/support',
      icon: HelpCircle,
      description: 'Get help'
    }
  ]
}

export default function SidebarNav() {
  const { user } = useAuth()
  const isPortalAdmin = usePortalAdmin()
  const isMerchant = useMerchant()
  const isCustomer = useCustomer()
  const pathname = usePathname()

  if (!user) return null

  const navItems: NavItem[] = isPortalAdmin 
    ? navigation.PORTAL_ADMIN 
    : isMerchant 
      ? navigation.MERCHANT 
      : navigation.CUSTOMER

  const getRoleDisplayName = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'PORTAL_ADMIN':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'MERCHANT':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'CUSTOMER':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="hidden border-r bg-gray-50/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Logo and Brand */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <div className="h-6 w-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
            <span className="text-lg">subzcrib.com</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="px-3 py-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Badge 
                variant="secondary" 
                className={cn("text-xs", getRoleColor(user.role))}
              >
                {getRoleDisplayName(user.role)}
              </Badge>
            </div>
          </div>

          {/* Navigation */}
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:text-gray-900 hover:bg-gray-100',
                    isActive && 'bg-gray-100 text-gray-900'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto p-4">
          <div className="grid gap-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                localStorage.removeItem('auth_token')
                window.location.href = '/login'
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}