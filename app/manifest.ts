import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Karan Kathur - Full-Stack Developer',
    short_name: 'Karan Kathur',
    description: 'Full-stack Web & App Designer + Developer specializing in Python, React, Next.js, and modern web technologies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
