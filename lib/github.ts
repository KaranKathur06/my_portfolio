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

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

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
    return [];
  }
}
