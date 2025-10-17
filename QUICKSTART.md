# ⚡ Quick Start Guide

Get your portfolio running in **5 minutes**!

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Create Environment File (1 min)

Create a file named `.env.local` in the root directory:

```env
NEXT_PUBLIC_GITHUB_USERNAME=KaranKathur06
```

That's the minimum required! For better GitHub API limits, add a token:

```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
```

**Get a GitHub token:** https://github.com/settings/tokens (select `public_repo` scope)

## Step 3: Run Development Server (1 min)

```bash
npm run dev
```

Open http://localhost:3000 🎉

## Step 4: Customize (2 min)

Update these files with your information:

1. **Contact Info** - `components/Contact.tsx` (lines 30-45)
2. **Social Links** - `components/Footer.tsx` (lines 10-13)
3. **GitHub Username** - `.env.local`

## Step 5: Deploy (Optional)

**Vercel (Easiest):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Or use the web interface:**
1. Push to GitHub
2. Import on https://vercel.com
3. Add environment variables
4. Deploy!

---

## Need More Help?

- **Full Setup Guide:** [SETUP.md](SETUP.md)
- **Deployment Guide:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Complete Documentation:** [README.md](README.md)

---

## Common Issues

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**GitHub API not working?**
- Add `NEXT_PUBLIC_GITHUB_TOKEN` to `.env.local`
- Make sure `.env.local` exists in root directory

**Build errors?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

**That's it! You're ready to go! 🚀**
