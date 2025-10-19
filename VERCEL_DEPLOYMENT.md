# Vercel Deployment Guide

## 🚀 Deploying subzcrib.com to Vercel

### Prerequisites
- GitHub repository connected to Vercel
- Vercel account

### Step 1: Connect to Vercel

1. **Import Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository (`m7mdcopilot/subzcrib`)
   - Click "Import"

### Step 2: Configure Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables** and add:

```bash
# Optional (for production)
NODE_ENV=production
```

**Note**: MongoDB connection is now hardcoded in the codebase, no MONGODB_URI needed.

### Step 3: Configure Build Settings

The project is now configured for Vercel with:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Framework**: `nextjs`

### Step 4: Deploy

Click **"Deploy"** button. Vercel will:
1. Install dependencies
2. Build the Next.js application
3. Deploy to global edge network

### 🔧 Troubleshooting 404 Errors

If you see a 404 error, check these:

#### 1. Build Logs
Check Vercel build logs for errors:
- TypeScript errors
- Missing dependencies
- Build failures

#### 2. Function Logs
Check serverless function logs for runtime errors.

#### 3. Domain Configuration
Ensure your domain is properly configured in Vercel.

#### 4. MongoDB Connection
Verify the MongoDB connection string is correct in the code.

### 🌍 Production vs Development

**Development** (local):
```bash
npm run dev
# Uses custom server with Socket.IO
# Runs on http://localhost:3000
```

**Production** (Vercel):
```bash
npm run build
npm run start
# Uses Vercel's serverless functions
# No custom server needed
```

### 📝 Important Notes

1. **Custom Server**: The custom server (`server.ts`) is only used for local development. Vercel uses serverless functions.

2. **Socket.IO**: Real-time features via Socket.IO will work differently on Vercel. Consider using Vercel's real-time features or WebSockets.

3. **Database**: MongoDB connection is now hardcoded in `src/lib/mongodb.ts` for both environments.

4. **Static Assets**: All static files are automatically optimized by Vercel.

### 🔄 Automatic Deploys

Enable automatic deploys in Vercel settings:
- **Main Branch**: Automatically deploy when pushing to `master`
- **Preview Deployments**: Deploy every PR for testing

### 📊 Monitoring

Vercel provides:
- Real-time analytics
- Performance metrics
- Error tracking
- Log viewing

### 🚀 Post-Deployment

After successful deployment:

1. **Test the Application**: Visit your Vercel URL
2. **Check All Features**: Verify subscriptions, analytics, and customer portal work
3. **Set Up Custom Domain**: Configure your domain in Vercel settings
4. **Monitor Performance**: Use Vercel analytics to monitor performance

---

**Need Help?**
- Check Vercel's [documentation](https://vercel.com/docs)
- Review build logs for specific errors
- Ensure MongoDB connection string is correct in the code