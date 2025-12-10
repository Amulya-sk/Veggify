# Deployment Guide: Veggies Recipe App to Render

This guide will walk you through deploying your Veggies Recipe App to GitHub and Render.

## Prerequisites

1. **GitHub Account** - [Sign up here](https://github.com)
2. **Render Account** - [Sign up here](https://render.com) (free tier available)
3. **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas) (free tier available)
4. **Git installed** on your computer

---

## Step 1: Prepare Your Code

### 1.1 Update Environment Variables

1. Copy `backend/.env.example` to `backend/.env` (if you don't have one)
2. Copy `frontend/.env.example` to `frontend/.env` (if you don't have one)
3. **DO NOT commit `.env` files to GitHub** (they're in `.gitignore`)

### 1.2 Set Up MongoDB Atlas (Production Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is fine)
3. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Save the username and password
4. Whitelist IP addresses:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for Render
5. Get your connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/veggify?retryWrites=true&w=majority`

---

## Step 2: Push Code to GitHub

### 2.1 Initialize Git Repository (if not already done)

Open terminal in your project root directory and run:

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
```

### 2.2 Create .gitignore (if needed)

The `.gitignore` file is already created. Make sure it includes:
- `node_modules/`
- `.env` files
- `dist/` and `build/` folders

### 2.3 Stage and Commit Your Changes

```bash
# Add all files
git add .

# Commit changes
git commit -m "Add logout functionality and prepare for deployment"
```

### 2.4 Create GitHub Repository

1. Go to [GitHub](https://github.com) and click "New repository"
2. Name it (e.g., `veggies-recipe-app`)
3. **DO NOT** initialize with README, .gitignore, or license (you already have these)
4. Click "Create repository"

### 2.5 Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Render

### 3.1 Create Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub account if not already connected
4. Select your repository

### 3.2 Configure Backend Service

**Basic Settings:**
- **Name:** `veggies-backend` (or any name you prefer)
- **Environment:** `Node`
- **Region:** Choose closest to you
- **Branch:** `main`

**Build & Deploy:**
- **Build Command:** `cd backend && npm install`
- **Start Command:** `cd backend && npm start`
- **Plan:** Free (or choose paid if needed)

**Environment Variables:**
Click "Add Environment Variable" and add:

```
NODE_ENV = production
MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/veggify?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-random-string-here
PORT = 10000
```

**Important:**
- Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
- Generate a strong random string for `JWT_SECRET` (you can use: `openssl rand -base64 32`)

### 3.3 Deploy Backend

1. Click "Create Web Service"
2. Wait for deployment to complete (usually 2-5 minutes)
3. **Copy your backend URL** (e.g., `https://veggies-backend.onrender.com`)
4. Test it: Visit `https://your-backend-url.onrender.com/` - should see "Veggify Recipe App Server is Running!"

---

## Step 4: Deploy Frontend to Render

### 4.1 Create Frontend Service

1. In Render Dashboard, click "New +" → "Static Site"
2. Connect your GitHub account if not already connected
3. Select the same repository

### 4.2 Configure Frontend Service

**Basic Settings:**
- **Name:** `veggies-frontend` (or any name you prefer)
- **Branch:** `main`

**Build Settings:**
- **Build Command:** `cd frontend && npm install && npm run build`
- **Publish Directory:** `frontend/dist`

**Environment Variables:**
Add:

```
VITE_API_URL = https://your-backend-url.onrender.com
```

**Important:** Replace `your-backend-url.onrender.com` with your actual backend URL from Step 3.3

### 4.3 Deploy Frontend

1. Click "Create Static Site"
2. Wait for deployment to complete (usually 2-5 minutes)
3. **Copy your frontend URL** (e.g., `https://veggies-frontend.onrender.com`)

---

## Step 5: Update Frontend API URL (if needed)

If you need to update the frontend's API URL after deployment:

1. Go to your Frontend service in Render Dashboard
2. Go to "Environment" tab
3. Update `VITE_API_URL` to your backend URL
4. Click "Save Changes" - this will trigger a new deployment

---

## Step 6: Test Your Deployment

1. Visit your frontend URL
2. Test signup/login functionality
3. Verify logout button appears after login
4. Test creating recipes
5. Check that all API calls work

---

## Troubleshooting

### Backend Issues

**"MongoDB connection error"**
- Check your `MONGODB_URI` in Render environment variables
- Ensure MongoDB Atlas IP whitelist includes Render's IPs (0.0.0.0/0)
- Verify database user credentials

**"Port already in use"**
- Render sets PORT automatically, but ensure your code uses `process.env.PORT`

**"JWT_SECRET not set"**
- Add `JWT_SECRET` to environment variables in Render

### Frontend Issues

**"API calls failing"**
- Check `VITE_API_URL` in frontend environment variables
- Ensure backend URL is correct (no trailing slash)
- Check browser console for CORS errors (backend should allow all origins)

**"404 on page refresh"**
- This is normal for SPAs. Render Static Sites handle this automatically, but if issues persist, check your routing setup

### General Issues

**"Build failed"**
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

**"Service not responding"**
- Free tier services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Consider upgrading to paid tier for always-on service

---

## Updating Your Deployment

After making code changes:

```bash
# Make your changes locally
# ...

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

Render will automatically detect the push and redeploy both services.

---

## Additional Notes

### Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after spin-down is slow (cold start)
- Limited build minutes per month
- Services may take longer to start

### Security Best Practices

1. **Never commit `.env` files** to GitHub
2. **Use strong JWT_SECRET** (random, long string)
3. **Keep MongoDB credentials secure**
4. **Use environment variables** for all sensitive data
5. **Enable HTTPS** (Render does this automatically)

### Monitoring

- Check Render dashboard for service health
- Monitor build logs for errors
- Check MongoDB Atlas dashboard for database metrics

---

## Support

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [React Router Documentation](https://reactrouter.com)

---

**Congratulations! Your app should now be live on Render! 🎉**

