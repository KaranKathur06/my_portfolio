import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Karan Kathur | Full-Stack Web & App Designer + Developer",
  description: "Full-stack Web & App Designer + Developer specializing in Python, React, Next.js, and modern web technologies. Building powerful, elegant digital experiences.",
  keywords: ["web developer", "app developer", "full-stack developer", "UI/UX designer", "Python developer", "React developer", "Next.js", "freelance developer"],
  authors: [{ name: "Karan Kathur" }],
  creator: "Karan Kathur",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://karankathur.dev",
    title: "Karan Kathur | Full-Stack Web & App Designer + Developer",
    description: "Full-stack Web & App Designer + Developer specializing in Python, React, Next.js, and modern web technologies.",
    siteName: "Karan Kathur Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Kathur | Full-Stack Web & App Designer + Developer",
    description: "Full-stack Web & App Designer + Developer specializing in Python, React, Next.js, and modern web technologies.",
    creator: "@karankathur",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-slate-950 text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
