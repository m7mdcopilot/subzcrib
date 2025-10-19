# Demo Credentials - subzcrib.com

This document contains the demo credentials for testing the subzcrib.com role-based dashboard system.

## 🎯 Demo Users

### 🔵 Portal Administrator
- **Email**: `admin@subzcrib.com`
- **Password**: `admin123`
- **Role**: Platform Administrator
- **Access**: Full platform control, merchant management, system analytics

### 🟢 Merchant
- **Email**: `merchant@subzcrib.com`
- **Password**: `merchant123`
- **Role**: Business Owner
- **Access**: Business dashboard, customer management, product catalog

### 🟣 Customer
- **Email**: `customer@subzcrib.com`
- **Password**: `customer123`
- **Role**: Subscriber
- **Access**: Personal subscriptions, invoices, account settings

## 🚀 How to Test

### 1. Using the Web Interface
1. Navigate to `http://localhost:3000/login`
2. The login page displays all demo credentials on the left side
3. Click on any role tab (Admin, Merchant, Customer) to auto-fill the credentials
4. Click "Sign In" to access the dashboard

### 2. Using API (for testing)
```bash
# Admin Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@subzcrib.com","password":"admin123"}'

# Merchant Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"merchant@subzcrib.com","password":"merchant123"}'

# Customer Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@subzcrib.com","password":"customer123"}'
```

### 3. Testing Invalid Credentials
```bash
# Should return "Invalid credentials" error
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid@test.com","password":"wrong"}'
```

## 📱 Dashboard Features

### Portal Admin Dashboard
- Platform-wide analytics and metrics
- Merchant management and approval
- System monitoring and settings
- B2B subscription oversight

### Merchant Dashboard
- Business performance metrics
- Customer management
- Product catalog management
- Subscription tracking
- Revenue analytics

### Customer Dashboard
- Personal subscription overview
- Invoice access and payment history
- Account management
- Self-service features

## 🔧 Technical Notes

### Authentication
- Uses JWT tokens for session management
- Role-based access control (RBAC)
- Demo users work offline (no database connection required)
- Fallback to database authentication when available

### Database
- MongoDB Atlas configured (may require IP whitelisting)
- Demo users are hardcoded for testing convenience
- Production implementation should use proper password hashing

### Security
- Demo credentials are for testing only
- Production environment should use secure authentication
- Passwords should be hashed using bcrypt or similar
- HTTPS should be enabled in production

## 🎨 UI/UX Features

### Login Page
- Responsive design for all devices
- Auto-fill demo credentials when selecting roles
- Visual role indicators with color coding
- Clear error messaging
- Professional gradient background

### Dashboard Navigation
- Role-based navigation menus
- Intuitive iconography
- Mobile-responsive layout
- Real-time data updates (when database connected)

## 🐛 Troubleshooting

### Common Issues

1. **"Internal server error" on login**
   - Demo users should work without database
   - Check if development server is running
   - Verify login route implementation

2. **Database connection errors**
   - Demo users work offline - ignore database errors for testing
   - For production, ensure MongoDB Atlas IP whitelist includes your IP

3. **Page not loading**
   - Ensure development server is running: `npm run dev`
   - Check browser console for JavaScript errors
   - Verify all dependencies are installed

### Getting Help
- Check the browser console for detailed error messages
- Review the server logs for authentication errors
- Ensure all demo credentials are entered exactly as shown

---

**Note**: These demo credentials are for testing and development purposes only. In a production environment, always use secure authentication practices and proper password management.