# Deployment Guide

## Overview
This portfolio has two parts:
1. **Frontend** - Static HTML/CSS/JS (deploys to Netlify)
2. **Backend** - Node.js/Express API (deploys to Render)

---

## Backend Deployment (Render)

### Step 1: Deploy to Render
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the following:
   - **Name**: `melkamu-portfolio-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### Step 2: Configure Environment Variables
Add these in Render dashboard:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
BREVO_API_KEY=your_brevo_api_key
```

### Step 3: Get Your Backend URL
After deployment, you'll get a URL like: `https://melkamu-portfolio-backend.onrender.com`

---

## Frontend Deployment (Netlify)

### Step 1: Update Backend URL
Before deploying, replace `YOUR-RENDER-BACKEND` in these files:

**netlify.toml:**
```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-RENDER-BACKEND.onrender.com/api/:splat"
```

**_redirects:**
```
/api/* https://YOUR-RENDER-BACKEND.onrender.com/api/:splat 200
```

Replace `YOUR-RENDER-BACKEND` with your actual Render backend name (without .onrender.com).

### Step 2: Deploy to Netlify
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Deploy settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `.`
6. Click "Deploy"

### Step 3: Configure Admin Panel
After deployment:
1. Open `admin.html` on your Netlify URL
2. Login with: `admin` / `melkamu2025`
3. Enter your backend URL (e.g., `https://melkamu-portfolio-backend.onrender.com/api`)
4. Click Login

---

## Quick Update for Backend URL

If you want to change the backend URL without rebuilding:

1. **Netlify**: Go to Site settings → Environment variables → Add `BACKEND_URL`
2. **Or edit _redirects** file and redeploy

---

## Testing Locally

### Frontend (with local backend):
```bash
# Start backend
cd backend
npm install
node server.js

# Open index.html or use a local server
# In admin.html, enter http://localhost:10000/api as API URL
```

### Backend API Endpoints:
- `GET /api/blogposts` - Blog posts
- `GET /api/projects` - Projects
- `GET /api/skills` - Skills
- `GET /api/certifications` - Certifications
- `GET /api/experiences` - Experiences
- `GET /api/testimonials` - Testimonials
- `GET /api/testimonials/featured` - Featured testimonials
- `POST /api/contacts` - Contact form submissions
- `POST /api/subscribers` - Newsletter subscriptions

---

## Admin Credentials
- **Username**: `admin`
- **Password**: `melkamu2025`

---

## Troubleshooting

### CORS Errors
If you get CORS errors, ensure your Render backend has:
```javascript
app.use(cors());
```

### API Not Found
Make sure the `_redirects` file has the correct backend URL format:
- Correct: `https://your-backend.onrender.com`
- Wrong: `https://your-backend.onrender.com/`

### MongoDB Connection Issues
- Check that your MongoDB URI is correct
- For local testing, use MongoDB Atlas free tier
- Ensure IP whitelist includes Render's IPs
