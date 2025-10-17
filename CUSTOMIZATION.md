# 🎨 Customization Guide

This guide shows you exactly where to update content to make this portfolio your own.

---

## 🔧 Essential Customizations

### 1. GitHub Username

**File:** `.env.local`

```env
NEXT_PUBLIC_GITHUB_USERNAME=YourGitHubUsername
```

---

### 2. Contact Information

**File:** `components/Contact.tsx`

**Lines 30-45:** Update contact info

```typescript
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "your.email@example.com",  // ← Change this
    href: "mailto:your.email@example.com",  // ← Change this
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 XXX XXX XXXX",  // ← Change this
    href: "tel:+1XXXXXXXXXX",  // ← Change this
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Your City, Country",  // ← Change this
    href: null,
  },
];
```

**Lines 52-55:** Update social links

```typescript
const socialLinks = [
  { icon: Github, href: "https://github.com/YourUsername", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/yourhandle", label: "Twitter" },
];
```

---

### 3. Footer Social Links

**File:** `components/Footer.tsx`

**Lines 10-15:** Update social links

```typescript
const socialLinks = [
  { icon: Github, href: "https://github.com/YourUsername", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/yourhandle", label: "Twitter" },
  { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
];
```

---

### 4. Hero Section Stats

**File:** `components/Hero.tsx`

**Lines 90-95:** Update your stats

```typescript
{[
  { number: "50+", label: "Projects Completed" },  // ← Change numbers
  { number: "30+", label: "Happy Clients" },
  { number: "5+", label: "Years Experience" },
  { number: "100%", label: "Client Satisfaction" },
].map((stat, index) => (
```

---

### 5. SEO Metadata

**File:** `app/layout.tsx`

**Lines 15-35:** Update meta information

```typescript
export const metadata: Metadata = {
  title: "Your Name | Full-Stack Developer",  // ← Change this
  description: "Your custom description here",  // ← Change this
  keywords: ["your", "keywords", "here"],  // ← Change this
  authors: [{ name: "Your Name" }],  // ← Change this
  creator: "Your Name",  // ← Change this
  openGraph: {
    url: "https://yourdomain.com",  // ← Change this
    title: "Your Name | Full-Stack Developer",  // ← Change this
    description: "Your custom description",  // ← Change this
    siteName: "Your Name Portfolio",  // ← Change this
  },
  twitter: {
    title: "Your Name | Full-Stack Developer",  // ← Change this
    description: "Your custom description",  // ← Change this
    creator: "@yourhandle",  // ← Change this
  },
};
```

---

## 🎯 Optional Customizations

### 6. About Section

**File:** `components/About.tsx`

**Lines 40-80:** Customize your bio text

Replace the entire bio with your own story. Keep the structure but change the content.

---

### 7. Services

**File:** `components/Services.tsx`

**Lines 20-70:** Customize services

```typescript
const services = [
  {
    icon: Layout,
    title: "Your Service Name",  // ← Change
    description: "Your service description",  // ← Change
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],  // ← Change
  },
  // Add or remove services as needed
];
```

---

### 8. Skills & Proficiency Levels

**File:** `components/Skills.tsx`

**Lines 15-75:** Update your skills

```typescript
const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95 },  // ← Change skill names and levels (0-100)
      { name: "Next.js", level: 92 },
      // Add or remove skills
    ],
  },
  // Add or remove categories
];
```

**Lines 78-82:** Update technology cloud

```typescript
const tools = [
  "Python", "React", "Next.js", // ← Add/remove technologies
  // Add your tools here
];
```

---

### 9. Hero Typing Animation

**File:** `components/Hero.tsx`

**Lines 11-17:** Customize rotating roles

```typescript
const roles = [
  "Full-Stack Developer",  // ← Change these
  "Web Designer",
  "App Developer",
  "UI/UX Designer",
  "Python Expert",
  // Add more roles
];
```

---

### 10. Domain & URLs

**File:** `app/sitemap.ts`

**Lines 5-30:** Update your domain

```typescript
{
  url: 'https://yourdomain.com',  // ← Change all URLs
  // ...
}
```

**File:** `app/robots.ts`

**Line 10:** Update sitemap URL

```typescript
sitemap: 'https://yourdomain.com/sitemap.xml',  // ← Change
```

---

## 🎨 Design Customizations

### 11. Color Scheme

**File:** `tailwind.config.ts`

**Lines 10-30:** Change colors

```typescript
colors: {
  primary: {
    // Change these hex values to your brand colors
    500: '#0ea5e9',  // Main primary color
    600: '#0284c7',
    // ... other shades
  },
  accent: {
    500: '#d946ef',  // Main accent color
    // ... other shades
  },
},
```

**Quick Color Palette Generators:**
- https://uicolors.app/create
- https://coolors.co/
- https://paletton.com/

---

### 12. Fonts

**File:** `app/layout.tsx`

**Lines 5-12:** Change fonts

```typescript
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
```

**Browse Google Fonts:** https://fonts.google.com/

---

### 13. Animation Speed

**File:** `tailwind.config.ts`

**Lines 35-50:** Adjust animation durations

```typescript
animation: {
  'fade-in': 'fadeIn 0.6s ease-in-out',  // ← Change duration (0.6s)
  'slide-up': 'slideUp 0.6s ease-out',
  // ...
},
```

---

## 📝 Content Customizations

### 14. Navigation Links

**File:** `components/Header.tsx`

**Lines 22-29:** Customize nav links

```typescript
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  // Add or remove links
  { name: "Blog", href: "#blog" },  // Example: Add blog link
];
```

---

### 15. Footer Links

**File:** `components/Footer.tsx`

**Lines 17-23:** Customize footer links

```typescript
const footerLinks = [
  { name: "Home", href: "#home" },
  // Add or remove links
  { name: "Privacy", href: "/privacy" },  // Example: Add privacy link
];
```

---

### 16. Contact Form Action

**File:** `components/Contact.tsx`

**Lines 35-45:** Add real form submission

Replace the simulated submission with actual API call:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("loading");

  try {
    // Replace with your actual API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
    }
  } catch (error) {
    setStatus("error");
  }
};
```

---

## 🖼️ Adding Images

### 17. Profile Picture

Create `public/images/profile.jpg` and add to About section:

**File:** `components/About.tsx`

```typescript
import Image from 'next/image';

// In the component:
<Image
  src="/images/profile.jpg"
  alt="Your Name"
  width={400}
  height={400}
  className="rounded-2xl"
/>
```

---

### 18. Project Screenshots

Add project images to `public/images/projects/`:

**File:** `components/Projects.tsx`

Add image display in project cards:

```typescript
<Image
  src={`/images/projects/${repo.name}.jpg`}
  alt={repo.name}
  width={400}
  height={250}
  className="rounded-lg"
/>
```

---

### 19. Favicon

Replace `public/favicon.ico` with your own favicon.

**Generate favicons:** https://realfavicongenerator.net/

---

## 🔌 Adding New Sections

### 20. Add a Blog Section

Create `components/Blog.tsx`:

```typescript
const Blog = () => {
  return (
    <section id="blog" className="section-padding">
      <div className="container-custom">
        <h2 className="text-4xl font-bold mb-8">
          Latest <span className="text-gradient">Articles</span>
        </h2>
        {/* Your blog content */}
      </div>
    </section>
  );
};

export default Blog;
```

Add to `app/page.tsx`:

```typescript
import Blog from "@/components/Blog";

// In the component:
<Blog />
```

---

### 21. Add Testimonials

Create `components/Testimonials.tsx`:

```typescript
const Testimonials = () => {
  const testimonials = [
    {
      name: "Client Name",
      role: "CEO, Company",
      text: "Great work!",
      image: "/images/client1.jpg",
    },
    // Add more testimonials
  ];

  return (
    <section id="testimonials" className="section-padding bg-slate-900/30">
      {/* Testimonial cards */}
    </section>
  );
};
```

---

## 📊 Analytics Integration

### 22. Google Analytics

**File:** `app/layout.tsx`

Add before closing `</body>`:

```typescript
import Script from 'next/script';

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

---

## ✅ Customization Checklist

- [ ] Update GitHub username in `.env.local`
- [ ] Change contact information (email, phone, location)
- [ ] Update all social media links
- [ ] Customize hero section stats
- [ ] Update SEO metadata
- [ ] Personalize about section bio
- [ ] Modify services offered
- [ ] Update skills and proficiency levels
- [ ] Change rotating roles in hero
- [ ] Update domain URLs (sitemap, robots.txt)
- [ ] Customize color scheme (optional)
- [ ] Change fonts (optional)
- [ ] Add profile picture (optional)
- [ ] Add project screenshots (optional)
- [ ] Replace favicon (optional)
- [ ] Add analytics (optional)

---

## 🎓 Tips

1. **Start Small**: Make one change at a time and test
2. **Keep Backups**: Commit to Git before major changes
3. **Test Responsive**: Check mobile after each change
4. **Use Dev Server**: Always test with `npm run dev`
5. **Build Before Deploy**: Run `npm run build` to catch errors

---

## 🆘 Need Help?

- **Documentation**: See README.md
- **Setup Issues**: See SETUP.md
- **Deployment**: See DEPLOYMENT.md
- **Quick Start**: See QUICKSTART.md

---

**Happy Customizing! 🚀**
