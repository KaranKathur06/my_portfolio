"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Star, GitFork, Sparkles } from "lucide-react";
import { fetchGitHubRepos, GitHubRepo } from "@/lib/github";
import { profile, projects as resumeProjects } from "@/data/portfolio";

const Projects = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadRepos = async () => {
      const data = await fetchGitHubRepos();
      setRepos(data);
      setLoading(false);
    };
    loadRepos();
  }, []);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-400",
      Python: "bg-green-400",
      Dart: "bg-cyan-400",
      Java: "bg-red-400",
      Go: "bg-cyan-300",
      Rust: "bg-orange-400",
      HTML: "bg-orange-500",
      CSS: "bg-purple-400",
    };
    return colors[language || ""] || "bg-slate-400";
  };

  const featured = resumeProjects.filter((p) => p.featured);
  const visibleResumeProjects = showAll ? resumeProjects : featured;

  const repoLiveOverrides: Record<string, string> = {
    "million-flats": "https://millionflats.com",
    "metal-hub": "https://karankathur06.github.io/Metal-Hub/",
    "smart-short": "https://www.smartshort.in",
  };

  const getRepoLiveUrl = (repo: GitHubRepo) => {
    const normalized = repo.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return repo.homepage || repoLiveOverrides[normalized] || null;
  };

  return (
    <section id="projects" className="section-padding bg-slate-900/30">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6 transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">Featured Work</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Recent <span className="text-gradient">Projects</span>
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Featured work from my resume (plus open-source projects from GitHub).
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        <div className="mb-14">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <h3 className="text-2xl font-semibold text-slate-100">Featured Projects</h3>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="px-5 py-2.5 rounded-full border-2 border-primary-500 text-slate-100 font-semibold hover:bg-primary-500/10 transition-all duration-300"
            >
              {showAll ? "Show Featured" : "View All Projects"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleResumeProjects.map((project, index) => (
              <div
                key={`${project.name}-${project.year}`}
                className={`group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 80 + 250}ms` }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-200 group-hover:text-primary-300 transition-colors">
                      {project.name}
                    </h4>
                    <div className="text-sm text-slate-500 mt-1">{project.year}</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full text-xs bg-primary-500/10 border border-primary-500/20 text-primary-300">
                    Resume
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  {project.bullets.slice(0, 2).map((b) => (
                    <p key={b} className="text-sm text-slate-400 leading-relaxed">
                      {b}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs bg-slate-950/40 text-slate-300 rounded-full border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <h3 className="text-2xl font-semibold text-slate-100">Open Source on GitHub</h3>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-primary-300 transition-colors"
          >
            <span>View GitHub Profile</span>
            <ExternalLink size={18} />
          </a>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse"
              >
                <div className="h-6 bg-slate-800 rounded w-3/4 mb-4" />
                <div className="h-4 bg-slate-800 rounded w-full mb-2" />
                <div className="h-4 bg-slate-800 rounded w-5/6" />
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.length === 0 && (
              <div className="md:col-span-2 lg:col-span-3 p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-center">
                <div className="text-slate-200 font-semibold mb-2">GitHub projects are temporarily unavailable</div>
                <div className="text-slate-400 text-sm">
                  You can still view my open-source work directly on GitHub.
                </div>
              </div>
            )}

            {repos.map((repo, index) => (
              <div
                key={repo.id}
                className={`group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/10 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Github className="text-primary-400" size={24} />
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-primary-400 transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github size={20} />
                    </a>
                    {getRepoLiveUrl(repo) && (
                      <a
                        href={getRepoLiveUrl(repo) as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-primary-400 transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 text-slate-200 group-hover:text-primary-400 transition-colors">
                  {repo.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {repo.description || "No description available"}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs bg-primary-500/10 text-primary-300 rounded-full border border-primary-500/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    {repo.language && (
                      <div className="flex items-center space-x-1">
                        <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Star size={14} />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork size={14} />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
