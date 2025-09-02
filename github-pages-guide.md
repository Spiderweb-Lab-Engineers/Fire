# GitHub Pages Deployment Guide for fireweb.arachnet.co.za

## Quick Setup Instructions

### 1. Create a GitHub Repository
1. Go to https://github.com and sign in
2. Click the "+" icon → "New repository"
3. Name it: `fireweb-arachnet` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README/gitignore (we already have files)
6. Click "Create repository"

### 2. Push Your Code to GitHub
Run these commands in your terminal:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit - Fire safety management system"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fireweb-arachnet.git

# Push to GitHub
git push -u origin main
```

### 3. Deploy to GitHub Pages
After pushing to GitHub, run:

```bash
npm run deploy
```

This will:
- Build your application
- Create a `gh-pages` branch
- Deploy to GitHub Pages automatically

### 4. Configure GitHub Pages Settings
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select branch: `gh-pages`
6. Select folder: `/ (root)`
7. Click "Save"

### 5. Set Up Custom Domain
In the same Pages settings:
1. Under "Custom domain", enter: `fireweb.arachnet.co.za`
2. Check "Enforce HTTPS" (recommended)
3. Click "Save"

### 6. Configure Your DNS
In your domain provider's DNS settings for `arachnet.co.za`:

**Option A - CNAME Record (Recommended):**
```
Type: CNAME
Name: fireweb
Value: YOUR_USERNAME.github.io
TTL: 3600 (or default)
```

**Option B - A Records (Alternative):**
```
Type: A
Name: fireweb
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
TTL: 3600 (or default)
```

## Testing Your Deployment

1. After DNS propagation (5-60 minutes), visit: `https://fireweb.arachnet.co.za`
2. Your fire safety management system should be live!

## Future Updates

Whenever you make changes:
1. Edit your files
2. Commit changes: `git add . && git commit -m "Update description"`
3. Push to GitHub: `git push`
4. Deploy: `npm run deploy`

## Troubleshooting

- **404 Error**: Make sure the `gh-pages` branch is selected in repository settings
- **Custom domain not working**: Check DNS settings and wait for propagation
- **CSS/JS not loading**: Clear browser cache and check console for errors

## Free Benefits of GitHub Pages
✅ Free hosting for public repositories
✅ Custom domain support
✅ HTTPS included
✅ Global CDN
✅ Automatic deployments
✅ 100GB bandwidth/month
✅ 1GB storage limit
