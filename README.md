# 🚀 Karan Kathur - Portfolio Website

A modern, sleek, and highly attractive freelancer portfolio website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. This portfolio showcases my skills as a full-stack web & app designer + developer with seamless GitHub integration.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Design & UX
- **Modern & Minimal Design** - Clean, professional aesthetic with subtle animations
- **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - Scroll reveals, hover effects, and micro-interactions using Framer Motion
- **Custom Color Palette** - Gradient accents with primary (blue) and accent (purple) colors
- **Dark Theme** - Eye-friendly dark mode with proper contrast

### 🛠️ Technical Features
- **Next.js 14** - Latest App Router with server components
- **TypeScript** - Type-safe code for better maintainability
- **Tailwind CSS** - Utility-first styling with custom configurations
- **GitHub API Integration** - Automatically fetches and displays your repositories
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, sitemap, robots.txt
- **Performance Optimized** - Code splitting, lazy loading, image optimization
- **Accessibility** - ARIA labels, keyboard navigation, semantic HTML

### 📄 Sections

1. **Hero Section**
   - Dynamic typing animation with multiple roles
   - Call-to-action buttons
   - Animated background elements
   - Stats showcase

2. **About Me**
   - Comprehensive bio highlighting Python expertise
   - Workflow highlights with icons
   - Technology stack overview

3. **Services**
   - 6 service cards (Web Design, Development, Mobile Apps, UI/UX, Backend, Maintenance)
   - Feature lists for each service
   - Hover effects and animations

4. **Projects**
   - GitHub API integration
   - Automatic repository fetching
   - Project cards with language, stars, forks
   - Fallback data if API fails
   - Links to GitHub and live demos

5. **Skills**
   - Categorized skill sets (Frontend, Backend, Mobile, Database, Design, Other)
   - Animated progress bars
   - Technology cloud with 20+ tools
   - Stats section

6. **Contact**
   - Working contact form with validation
   - Contact information cards
   - Social media links
   - Availability status indicator

7. **Footer**
   - Quick links navigation
   - Social media icons
   - Copyright information

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KaranKathur06/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your configuration:
   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=KaranKathur06
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token_here
   NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com
   ```

   **Getting a GitHub Token:**
   - Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "Portfolio Website")
   - Select scopes: `public_repo` (read access to public repositories)
   - Click "Generate token"
   - Copy the token and paste it in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables in Vercel dashboard
6. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KaranKathur06/portfolio)

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Add environment variables
8. Deploy!

### Other Platforms

This is a standard Next.js application and can be deployed to:
- **AWS Amplify**
- **Railway**
- **Render**
- **DigitalOcean App Platform**
- **Self-hosted** with Node.js

## 🎨 Customization

### Update Personal Information

1. **GitHub Username**: Update in `.env.local`
2. **Contact Info**: Edit `components/Contact.tsx`
3. **Social Links**: Update in `components/Footer.tsx` and `components/Contact.tsx`
4. **About Text**: Modify `components/About.tsx`
5. **Services**: Customize `components/Services.tsx`
6. **Skills**: Update skill levels in `components/Skills.tsx`

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: { /* your primary color shades */ },
  accent: { /* your accent color shades */ },
}
```

### Modify Animations

Animations are defined in:
- `tailwind.config.ts` - Keyframes and animation utilities
- Individual components using `framer-motion`

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── robots.ts           # Robots.txt configuration
│   ├── sitemap.ts          # Sitemap generation
│   └── manifest.ts         # PWA manifest
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Services.tsx        # Services section
│   ├── Projects.tsx        # Projects/Portfolio section
│   ├── Skills.tsx          # Skills section
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer
├── lib/
│   └── github.ts           # GitHub API integration
├── public/
│   └── favicon.ico         # Favicon
├── .env.local.example      # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🔧 Technologies Used

### Core
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS

### Libraries
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **React Intersection Observer** - Scroll animations

### APIs
- **GitHub REST API** - Repository data

## 🐛 Troubleshooting

### GitHub API Rate Limiting

If you're not using a GitHub token, you're limited to 60 requests per hour. With a token, you get 5,000 requests per hour.

**Solution**: Add `NEXT_PUBLIC_GITHUB_TOKEN` to your `.env.local` file.

### Build Errors

If you encounter build errors:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Styling Issues

If Tailwind styles aren't working:
```bash
# Ensure Tailwind is properly configured
npm run dev
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

**Karan Kathur**
- Email: contact@karankathur.dev
- GitHub: [@KaranKathur06](https://github.com/KaranKathur06)
- LinkedIn: [Karan Kathur](https://linkedin.com/in/karankathur)

---

## 🎯 Future Enhancements

- [ ] Blog section with MDX support
- [ ] Testimonials carousel
- [ ] Project detail pages
- [ ] Dark/Light theme toggle
- [ ] Multi-language support (i18n)
- [ ] Analytics integration (Google Analytics, Plausible)
- [ ] Contact form backend integration (EmailJS, SendGrid)
- [ ] CMS integration (Sanity, Contentful)
- [ ] Performance monitoring (Lighthouse CI)

---

If you found this helpful, please give it a ⭐️!
