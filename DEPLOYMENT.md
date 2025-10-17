# 🚀 Deployment Guide

This guide covers deploying your portfolio to various platforms.

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/KaranKathur06/portfolio.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add:
     - `NEXT_PUBLIC_GITHUB_USERNAME` = `KaranKathur06`
     - `NEXT_PUBLIC_GITHUB_TOKEN` = `your_token_here`
     - `NEXT_PUBLIC_CONTACT_EMAIL` = `your_email@example.com`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `your-project.vercel.app`

5. **Custom Domain (Optional)**
   - Go to Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

### Automatic Deployments

Every push to `main` branch automatically deploys to production.

---

## Netlify

### Steps:

1. **Push to GitHub** (same as above)

2. **Import to Netlify**
   - Go to https://netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18 or higher

4. **Add Environment Variables**
   - Go to Site settings > Environment variables
   - Add the same variables as Vercel

5. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `random-name.netlify.app`

6. **Custom Domain (Optional)**
   - Go to Domain settings
   - Add custom domain

---

## Railway

### Steps:

1. **Push to GitHub**

2. **Deploy on Railway**
   - Go to https://railway.app
   - Click "New Project" > "Deploy from GitHub repo"
   - Select your repository

3. **Add Environment Variables**
   - In Railway dashboard, add variables

4. **Deploy**
   - Railway automatically builds and deploys

---

## DigitalOcean App Platform

### Steps:

1. **Push to GitHub**

2. **Create App**
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Connect GitHub repository

3. **Configure**
   - Build command: `npm run build`
   - Run command: `npm start`
   - Add environment variables

4. **Deploy**

---

## Self-Hosted (VPS/Server)

### Requirements:
- Node.js 18+
- PM2 (process manager)
- Nginx (reverse proxy)

### Steps:

1. **Clone Repository**
   ```bash
   git clone https://github.com/KaranKathur06/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create .env.local**
   ```bash
   nano .env.local
   # Add your environment variables
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Install PM2**
   ```bash
   npm install -g pm2
   ```

6. **Start with PM2**
   ```bash
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Enable SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Docker Deployment

### Dockerfile

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_GITHUB_USERNAME=KaranKathur06
      - NEXT_PUBLIC_GITHUB_TOKEN=${GITHUB_TOKEN}
      - NEXT_PUBLIC_CONTACT_EMAIL=${CONTACT_EMAIL}
    restart: unless-stopped
```

### Deploy:

```bash
docker-compose up -d
```

---

## Environment Variables

Make sure to set these on your deployment platform:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GITHUB_USERNAME` | Yes | Your GitHub username |
| `NEXT_PUBLIC_GITHUB_TOKEN` | Recommended | GitHub Personal Access Token |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Your contact email |

---

## Post-Deployment Checklist

- [ ] Test all sections load correctly
- [ ] Verify GitHub projects are fetching
- [ ] Check contact form works
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check SEO meta tags
- [ ] Test page load speed
- [ ] Verify SSL certificate (HTTPS)
- [ ] Set up analytics (optional)
- [ ] Submit sitemap to Google Search Console

---

## Monitoring & Analytics

### Google Analytics

Add to `app/layout.tsx`:

```typescript
import Script from 'next/script';

// In the <head> section
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

// In the return statement
<Analytics />
```

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Next.js Deployment: https://nextjs.org/docs/deployment
- Contact: contact@karankathur.dev
