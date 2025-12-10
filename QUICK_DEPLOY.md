# Quick Deployment Checklist

## 🚀 Quick Steps to Deploy

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### 2. Set Up MongoDB Atlas
- Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create free cluster
- Create database user
- Whitelist IP: `0.0.0.0/0` (allow all)
- Copy connection string

### 3. Deploy Backend on Render
1. Go to [render.com](https://render.com) → New Web Service
2. Connect GitHub repo
3. Settings:
   - **Build:** `cd backend && npm install`
   - **Start:** `cd backend && npm start`
4. Add Environment Variables:
   ```
   MONGODB_URI = your-mongodb-connection-string
   JWT_SECRET = random-secret-key-here
   NODE_ENV = production
   ```
5. Deploy → Copy backend URL

### 4. Deploy Frontend on Render
1. New Static Site
2. Connect same GitHub repo
3. Settings:
   - **Build:** `cd frontend && npm install && npm run build`
   - **Publish:** `frontend/dist`
4. Add Environment Variable:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```
5. Deploy → Copy frontend URL

### 5. Test
- Visit frontend URL
- Test login/logout
- Verify all features work

---

**Full detailed guide:** See `DEPLOYMENT_GUIDE.md`

