export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "KaranKathur06";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter and sort repos
    const filteredRepos = repos
      .filter((repo) => !repo.name.includes("config") && !repo.name.includes("dotfiles"))
      .sort((a, b) => {
        // Prioritize repos with more stars and recent updates
        const scoreA = a.stargazers_count * 10 + new Date(a.pushed_at).getTime();
        const scoreB = b.stargazers_count * 10 + new Date(b.pushed_at).getTime();
        return scoreB - scoreA;
      })
      .slice(0, 8); // Get top 8 repos

    return filteredRepos;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return getFallbackRepos();
  }
}

// Fallback data if API fails
function getFallbackRepos(): GitHubRepo[] {
  return [
    {
      id: 1,
      name: "portfolio-website",
      full_name: "KaranKathur06/portfolio-website",
      description: "Modern portfolio website built with Next.js, TypeScript, and Tailwind CSS",
      html_url: "https://github.com/KaranKathur06",
      homepage: "https://karankathur.dev",
      stargazers_count: 15,
      forks_count: 3,
      language: "TypeScript",
      topics: ["nextjs", "react", "tailwindcss", "portfolio"],
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-10-01T00:00:00Z",
      pushed_at: "2024-10-01T00:00:00Z",
    },
    {
      id: 2,
      name: "python-automation-tools",
      full_name: "KaranKathur06/python-automation-tools",
      description: "Collection of Python automation scripts for web scraping, data processing, and task automation",
      html_url: "https://github.com/KaranKathur06",
      homepage: null,
      stargazers_count: 22,
      forks_count: 5,
      language: "Python",
      topics: ["python", "automation", "web-scraping", "data-processing"],
      created_at: "2023-06-01T00:00:00Z",
      updated_at: "2024-09-15T00:00:00Z",
      pushed_at: "2024-09-15T00:00:00Z",
    },
    {
      id: 3,
      name: "react-dashboard",
      full_name: "KaranKathur06/react-dashboard",
      description: "Feature-rich admin dashboard with charts, tables, and real-time data visualization",
      html_url: "https://github.com/KaranKathur06",
      homepage: "https://dashboard-demo.karankathur.dev",
      stargazers_count: 18,
      forks_count: 4,
      language: "JavaScript",
      topics: ["react", "dashboard", "charts", "admin-panel"],
      created_at: "2023-08-01T00:00:00Z",
      updated_at: "2024-08-20T00:00:00Z",
      pushed_at: "2024-08-20T00:00:00Z",
    },
    {
      id: 4,
      name: "fastapi-backend",
      full_name: "KaranKathur06/fastapi-backend",
      description: "High-performance REST API built with FastAPI, PostgreSQL, and Redis",
      html_url: "https://github.com/KaranKathur06",
      homepage: null,
      stargazers_count: 12,
      forks_count: 2,
      language: "Python",
      topics: ["fastapi", "python", "rest-api", "postgresql"],
      created_at: "2023-10-01T00:00:00Z",
      updated_at: "2024-07-10T00:00:00Z",
      pushed_at: "2024-07-10T00:00:00Z",
    },
    {
      id: 5,
      name: "flutter-mobile-app",
      full_name: "KaranKathur06/flutter-mobile-app",
      description: "Cross-platform mobile app with beautiful UI and smooth animations",
      html_url: "https://github.com/KaranKathur06",
      homepage: null,
      stargazers_count: 10,
      forks_count: 2,
      language: "Dart",
      topics: ["flutter", "mobile-app", "cross-platform", "dart"],
      created_at: "2024-02-01T00:00:00Z",
      updated_at: "2024-06-15T00:00:00Z",
      pushed_at: "2024-06-15T00:00:00Z",
    },
    {
      id: 6,
      name: "ai-chatbot",
      full_name: "KaranKathur06/ai-chatbot",
      description: "AI-powered chatbot using OpenAI API and Python backend",
      html_url: "https://github.com/KaranKathur06",
      homepage: null,
      stargazers_count: 25,
      forks_count: 6,
      language: "Python",
      topics: ["ai", "chatbot", "openai", "python"],
      created_at: "2024-03-01T00:00:00Z",
      updated_at: "2024-09-25T00:00:00Z",
      pushed_at: "2024-09-25T00:00:00Z",
    },
  ];
}
