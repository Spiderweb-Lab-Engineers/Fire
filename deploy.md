# Deployment Guide for fireweb.arachnet.co.za

## Built Files Location
Your production files are in the `dist/` folder:
- `index.html` - Main entry point
- `assets/` - CSS and JavaScript files
- `favicon.ico` - Site icon

## Deployment Options

### 1. Traditional Web Hosting
1. Upload all contents of the `dist/` folder to your web server
2. Point your domain `fireweb.arachnet.co.za` to the directory containing `index.html`
3. Ensure your web server serves the `index.html` file for all routes (for SPA routing)

### 2. Netlify (Free Option)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy from the dist folder
netlify deploy --dir=dist

# For production deployment
netlify deploy --prod --dir=dist
```

### 3. Vercel (Free Option)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root (Vercel will detect the build)
vercel

# Or deploy directly from dist
vercel --prod dist
```

### 4. GitHub Pages
1. Create a new GitHub repository
2. Push your code to GitHub
3. Add deployment script to package.json:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```
4. Run: `npm install gh-pages --save-dev`
5. Run: `npm run deploy`

### 5. Cloudflare Pages
```bash
# Install Wrangler CLI
npm install -g wrangler

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=fireweb
```

## Custom Domain Setup
After deploying to any platform:
1. Configure your DNS to point `fireweb.arachnet.co.za` to the hosting provider
2. Most platforms provide instructions for custom domain setup
3. Enable HTTPS (usually automatic with modern hosting platforms)

## Server Configuration for SPA
If using traditional hosting, ensure your server redirects all routes to `index.html`:

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

### Nginx
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Testing the Deployment
1. Visit `fireweb.arachnet.co.za`
2. Test navigation between different pages
3. Verify all features work correctly
4. Check browser developer tools for any errors
