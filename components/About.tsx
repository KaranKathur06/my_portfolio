"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { profile, skillGroups } from "@/data/portfolio";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/my_portfolio";
  const profileImageSrc = `${basePath}/profile.jpeg`;

  const toolsTier = skillGroups.find((g) => g.title === "Tools & Platforms")?.tiers as
    | Record<string, string[]>
    | undefined;
  const tools = toolsTier?.Core || [];
  const toolsStrong = toolsTier?.Strong || [];

  const verifiedTools = ["Git", "GitHub", "VS Code", "Docker", "Postman"];

  return (
    <section id="about" className="section-padding bg-slate-900/30">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            About <span className="text-gradient">Me</span>
          </h2>
          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto transition-all duration-700 delay-100 ${inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
          />
        </div>

        {/* Main Content Grid - Perfectly Aligned */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* LEFT COLUMN: About Me Text + Workflow */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 flex flex-col ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            {/* Introduction */}
            <div className="rounded-3xl surface overflow-hidden">
              <div className="grid sm:grid-cols-[176px_1fr] gap-6 p-6">
                <div className="relative">
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40 hover:shadow-2xl hover:shadow-black/40 transition-shadow duration-300">
                    <Image
                      src={profileImageSrc}
                      alt={profile.name}
                      fill
                      sizes="176px"
                      className="object-cover saturate-110 contrast-110 brightness-95 transition-transform duration-300 hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-slate-400">{profile.location}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mt-1">
                      {profile.name}
                    </h3>
                    <div className="text-slate-300 font-semibold mt-2">{profile.headline}</div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-slate-200 leading-relaxed">
                      I&apos;m Karan Kathur, a full-stack developer focused on building clean, reliable, and production-ready web and mobile applications.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      I work across backend and frontend systems - using Python for APIs, automation, and data-driven logic, paired with modern frontend frameworks like React and Next.js for fast, accessible interfaces.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      I care deeply about clarity, performance, and maintainable code. My goal is to ship solutions that scale well, remain easy to maintain, and solve real problems without unnecessary complexity.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/[0.03] text-slate-200">
                      Freelancing: January 2025 – Present
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/[0.03] text-slate-200 hover:border-primary-500/30 hover:text-primary-200 transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Section */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl surface surface-hover">
                <div className="text-sm font-semibold text-slate-200">Core Expertise</div>
                <div className="mt-3 space-y-2 text-sm text-slate-300">
                  {[
                    "Full-Stack Development",
                    "Backend APIs & Systems",
                    "Authentication & Authorization",
                    "Dashboards & Analytics",
                    "Database-Driven Applications",
                  ].map((x) => (
                    <div key={x} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                      <span className="leading-relaxed">{x}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl surface surface-hover">
                <div className="text-sm font-semibold text-slate-200">Tools & Software</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {verifiedTools.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full border border-white/10 bg-white/[0.03] text-slate-200 hover:border-primary-500/30 transition-colors"
                      title={t}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400/80" />
                      {t}
                    </span>
                  ))}
                </div>
                <div className="sr-only">
                  {tools.length + toolsStrong.length}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Skill/Feature Boxes */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-300 h-full content-start ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            {/* Technical Skills */}
            <div className="p-6 rounded-2xl surface surface-hover">
              <div className="text-sm font-semibold text-slate-200">Technical Skills</div>
              <div className="mt-4 space-y-4">
                {([
                  {
                    tier: "Core",
                    items: ["Python", "Django", "React", "JavaScript"],
                  },
                  {
                    tier: "Strong",
                    items: ["Next.js", "Tailwind CSS", "Flask"],
                  },
                  {
                    tier: "Familiar",
                    items: ["FastAPI"],
                  },
                ] as const).map((group) => (
                  <div key={group.tier}>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-300">{group.tier}</div>
                      <div className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-300">
                        {group.items.length}
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {group.items.map((x) => (
                        <div
                          key={x}
                          className="px-3 py-2 rounded-xl border border-white/10 bg-black/30 text-sm text-slate-200"
                        >
                          {x}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="p-6 rounded-2xl surface surface-hover">
              <div className="text-sm font-semibold text-slate-200">Tech Stack</div>
              <div className="mt-4 space-y-4">
                {[
                  { k: "Backend", v: ["Python", "Django", "Flask", "FastAPI"] },
                  { k: "Frontend", v: ["React", "Next.js", "JavaScript", "Tailwind CSS"] },
                  { k: "Databases", v: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Firebase"] },
                  { k: "Mobile", v: ["Flutter"] },
                ].map((row) => (
                  <div key={row.k}>
                    <div className="text-xs font-semibold text-slate-300">{row.k}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {row.v.map((x) => (
                        <span
                          key={x}
                          className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/[0.03] text-slate-200"
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="p-6 rounded-2xl surface surface-hover">
              <div className="text-sm font-semibold text-slate-200">Education</div>
              <div className="mt-2 h-px w-10 bg-primary-400/70" />
              <div className="mt-4 space-y-1.5">
                <div className="text-sm text-slate-100 font-semibold">
                  B.Tech in Information Technology
                </div>
                <div className="text-sm text-slate-300">Atmiya University</div>
                <div className="text-sm text-slate-300">2021 – 2025</div>
                <div className="text-sm text-slate-400">CGPA: 8.2</div>
              </div>
            </div>

            {/* Interests */}
            <div className="p-6 rounded-2xl surface surface-hover">
              <div className="text-sm font-semibold text-slate-200">Interests</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Learning", "Building products", "Problem solving", "Tech exploration"].map((x) => (
                  <span
                    key={x}
                    className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/[0.03] text-slate-200"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`mt-20 relative transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="relative p-10 rounded-3xl surface overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary-500/14 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-green-400">Available for Hire</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">
                Ready to Start Your <span className="text-gradient">Next Project</span>?
              </h3>

              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                I&apos;m currently open for <span className="text-primary-400 font-semibold">freelance and contract opportunities</span>.
                Let&apos;s collaborate and create something amazing together!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="group px-8 py-4 bg-primary-500 text-slate-950 rounded-full font-semibold text-lg hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 hover:scale-[1.01] flex items-center space-x-2"
                >
                  <span>Let&apos;s Build Something Exceptional</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a
                  href="#projects"
                  className="px-8 py-4 border-2 border-primary-500 rounded-full font-semibold text-lg hover:bg-primary-500/10 transition-all duration-300 hover:scale-105"
                >
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
