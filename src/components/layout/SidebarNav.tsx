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
  HelpCircle,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
    <div className="hidden w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 min-h-screen lg:flex lg:flex-col">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute top-16 left-1 w-3 h-3 bg-blue-600 rounded-full animate-ping z-5" style={{ top: '35px', left: '0.15rem' }}></div>
                <div className="h-12 w-auto flex items-center justify-center">
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">subzcrib.com</h2>
          </div>
        </div>

        {/* Navigation - No Scroll */}
        <div className="flex-1 p-6">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer',
                    isActive 
                      ? 'bg-[#00234B] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm truncate">{item.name}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-white text-red-600 border-red-200 flex-shrink-0">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    {item.description && (
                      <p className={cn(
                        "text-xs mt-1 truncate",
                        isActive ? "text-gray-300" : "text-gray-500"
                      )}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Fixed User Info - Sticky at bottom */}
        <div className="sticky bottom-0 p-6 border-t border-gray-200 flex-shrink-0 bg-white/80 backdrop-blur-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full p-3 h-auto bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 justify-start cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-[#00234B] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{getRoleDisplayName(user.role)}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem 
                onClick={() => {
                  localStorage.removeItem('auth_token')
                  window.location.href = '/login'
                }}
                className="cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-100 focus:text-red-600 focus:bg-red-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}