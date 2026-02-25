# MongoDB Blog Setup Guide

## The Problem
The MongoDB connection is failing because the connection string needs to be replaced with your actual MongoDB Atlas credentials.

## Quick Fix Required

### Step 1: Get MongoDB Atlas Connection String
1. Go to **https://www.mongodb.com/cloud/atlas**
2. Create a free account (or login)
3. Create a **Free Shared Cluster**:
   - Click "Build a Database" → "Free" tier
   - Choose any provider (AWS recommended)
   - Click "Create Cluster" (wait 2-3 minutes)

4. **Create Database User**:
   - Click "Database Access" → "Add New Database User"
   - Username: `melkamu` (or any username)
   - Password: `melkamu2025` (or generate one)
   - Click "Add User"

5. **Network Access**:
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**:
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@clusterxyz.xxx.mongodb.net/?retryWrites=true&w=majority`

### Step 2: Update backend/.env
Replace the MONGODB_URI line with your actual connection string:

```
MONGODB_URI=mongodb+srv://melkamu:melkamu2025@cluster0.xxx.mongodb.net/blog?retryWrites=true&w=majority
```

**Important**: Replace `melkamu:melkamu2025` with your actual username and password, and `cluster0.xxx` with your actual cluster name from MongoDB Atlas.

### Step 3: Run the Setup Commands
```bash
cd backend
npm install
npm run seed
npm start
```

## After Setup
- **Admin Dashboard**: http://localhost:10000/admin.html
- **Login**: username = `admin`, password = `melkamu2025`
- **Blog API**: http://localhost:10000/api/blogposts

## If MongoDB Still Doesn't Work
The portfolio will still work - it has a fallback to static blog posts when the database is unavailable.
