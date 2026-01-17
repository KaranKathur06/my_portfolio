export const profile = {
  name: "Karan Kathur",
  headline: "Full-Stack Developer — Python Engineer — Web & Mobile Applications",
  location: "India",
  email: "kathurkaran077@gmail.com",
  phone: "+91-63524-54180",
  links: {
    portfolio: "https://karankathur06.github.io/my_portfolio/",
    github: "https://github.com/KaranKathur06",
    linkedin: "https://linkedin.com/in/karan-kathur",
  },
};

export type ExperienceItem = {
  title: string;
  company: string;
  dateRange: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    dateRange: "July 2025 – Present",
    bullets: [
      "Deliver end-to-end web and mobile applications for clients, from requirement analysis to deployment.",
      "Architect and develop full-stack systems using Python (Django, Flask, FastAPI) and modern frontend frameworks.",
      "Build REST APIs, authentication systems, dashboards, and database-driven applications.",
      "Design responsive, user-focused interfaces using Tailwind CSS, Bootstrap, and Figma.",
      "Manage complete project lifecycle including planning, development, optimization, and maintenance.",
    ],
  },
  {
    title: "Python Developer Intern",
    company: "BellatrixNC",
    dateRange: "Feb 2025 – July 2025",
    bullets: [
      "Led development of EcoCarpool, a Django-based sustainable ride-sharing platform.",
      "Developed RESTful APIs for frontend and mobile application integrations.",
      "Built real-time analytics dashboards using Chart.js.",
      "Integrated secure authentication, authorization, and payment workflows.",
      "Optimized database queries, improving performance by approximately 40%.",
      "Worked in an Agile environment and maintained technical documentation.",
    ],
  },
];

export type ProjectItem = {
  name: string;
  year: string;
  tech: string[];
  bullets: string[];
  featured?: boolean;
  links?: {
    live?: string;
    code?: string;
  };
};

export const projects: ProjectItem[] = [
  {
    name: "EcoCarpool Platform",
    year: "2025",
    tech: ["Python", "Django", "PostgreSQL", "JavaScript", "Bootstrap"],
    bullets: [
      "Developed a full-featured ride-sharing platform focused on sustainable transportation.",
      "Implemented ride booking, secure payments, eco-impact tracking, and an admin analytics dashboard.",
    ],
    featured: true,
  },
  {
    name: "Smart Short Link Platform",
    year: "2025",
    tech: ["Python", "Django", "REST APIs", "JavaScript", "PostgreSQL"],
    bullets: [
      "Built a URL shortening and analytics platform with authentication and dashboard insights.",
      "Implemented link tracking, CPM logic, earnings analytics, and role-based access control.",
    ],
    featured: true,
  },
  {
    name: "Real-Time Analytics Dashboard",
    year: "2024",
    tech: ["Python", "Flask", "Pandas", "Chart.js", "PostgreSQL"],
    bullets: [
      "Designed a real-time data analytics dashboard for business performance monitoring.",
      "Visualized KPIs using interactive charts and automated data pipelines.",
    ],
    featured: true,
  },
  {
    name: "Authentication & User Management System",
    year: "2024",
    tech: ["Python", "Django", "JWT", "PostgreSQL"],
    bullets: [
      "Designed secure authentication and authorization workflows using JWT-based access control.",
      "Implemented email verification, role-based permissions, and session management.",
    ],
    featured: true,
  },
  {
    name: "Criminal Investigation System",
    year: "2024",
    tech: ["Flutter", "Firebase"],
    bullets: [
      "Developed a mobile application for managing criminal records and investigations.",
      "Implemented Firebase authentication, advanced search, filters, and role-based access control.",
    ],
  },
  {
    name: "T20 Cricket Analysis Dashboard",
    year: "2023",
    tech: ["Python", "Pandas", "Matplotlib", "Tableau", "Power BI"],
    bullets: [
      "Analyzed and visualized player and match performance statistics across multiple datasets.",
      "Built interactive dashboards with comparative and predictive insights.",
    ],
  },
  {
    name: "Ghost VA (Virtual Assistant)",
    year: "Aug 2022",
    tech: ["Python", "Speech Recognition", "NLP", "APIs"],
    bullets: [
      "Built a voice-enabled virtual assistant supporting multi-user workflows.",
      "Implemented task management, web search, automation, and text-to-speech features.",
    ],
  },
  {
    name: "Portfolio & Client Websites",
    year: "2023 – 2025",
    tech: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    bullets: [
      "Designed and developed multiple responsive portfolio and business websites.",
      "Focused on performance optimization, SEO fundamentals, and modern UI/UX practices.",
    ],
  },
];

export const certifications: string[] = [
  "Python Development Certification",
  "Data Science with Python",
  "Machine Learning Fundamentals",
  "AI ChatGPT Bootcamp",
  "Git & GitHub Bootcamp",
  "Excel Bootcamp",
  "C / C++ Development Certification",
  "HTML & CSS Design Thinking",
  "Hackathon Participation Certificate",
  "Social Media Marketing Internship",
];

export const skillGroups = [
  {
    title: "Backend Systems",
    icon: "backend",
    tiers: {
      Core: ["Python", "Django", "RESTful APIs"],
      Strong: ["Flask", "FastAPI", "Node.js"],
      Familiar: ["Web Security"],
    },
  },
  {
    title: "Frontend Interfaces",
    icon: "frontend",
    tiers: {
      Core: ["React", "Next.js", "JavaScript", "Tailwind CSS"],
      Strong: ["TypeScript", "HTML5", "CSS3"],
      Familiar: [],
    },
  },
  {
    title: "Mobile Development",
    icon: "mobile",
    tiers: {
      Core: ["Flutter"],
      Strong: ["React Native", "Dart"],
      Familiar: [],
    },
  },
  {
    title: "Databases & Analytics",
    icon: "data",
    tiers: {
      Core: ["PostgreSQL"],
      Strong: ["MySQL", "MongoDB", "SQLite", "Firebase"],
      Familiar: ["Pandas", "NumPy", "Matplotlib", "Tableau", "Power BI"],
    },
  },
  {
    title: "Tools & Platforms",
    icon: "tools",
    tiers: {
      Core: ["Git", "GitHub", "VS Code", "Linux"],
      Strong: ["Docker", "Figma"],
      Familiar: ["Agile & Scrum"],
    },
  },
];
