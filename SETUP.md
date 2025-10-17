# 🛠️ Setup Guide

## Quick Start

Follow these steps to get your portfolio up and running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
# Your GitHub username (required)
NEXT_PUBLIC_GITHUB_USERNAME=KaranKathur06

# GitHub Personal Access Token (optional but recommended)
# Without this, you're limited to 60 API requests per hour
# With this, you get 5,000 requests per hour
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here

# Your contact email (optional)
NEXT_PUBLIC_CONTACT_EMAIL=contact@karankathur.dev
```

### 3. Get a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Portfolio Website"
4. Select scope: `public_repo` (read access to public repositories)
5. Click "Generate token"
6. Copy the token and add it to `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Customize Content

Update the following files with your information:

- **Personal Info**: `components/Contact.tsx`, `components/Footer.tsx`
- **About Text**: `components/About.tsx`
- **Services**: `components/Services.tsx`
- **Skills**: `components/Skills.tsx`
- **Social Links**: Update URLs in `components/Footer.tsx` and `components/Contact.tsx`

### 6. Build for Production

```bash
npm run build
npm start
```

### 7. Deploy

**Vercel (Recommended)**:
1. Push to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy

**Netlify**:
1. Push to GitHub
2. Import project on Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### GitHub API Rate Limit

Add `NEXT_PUBLIC_GITHUB_TOKEN` to `.env.local` to increase rate limit from 60 to 5,000 requests/hour.

### Build Errors

Clear cache and rebuild:
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Need Help?

- Check the main [README.md](README.md)
- Open an issue on GitHub
- Contact: contact@karankathur.dev
