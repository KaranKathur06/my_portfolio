"use client";

import { useMemo } from "react";
import { ArrowRight, Sparkles, Terminal, Server, Database, Shield } from "lucide-react";
import { profile } from "@/data/portfolio";

const Hero = () => {
  const gifSrc = useMemo(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    return `${basePath}/download.gif`;
  }, []);

  return (
    <section
      id="home"
      className="group min-h-screen flex items-center justify-center relative overflow-hidden pt-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-screen saturate-0"
          style={{
            backgroundImage: `url(${gifSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_12%,rgba(56,189,248,0.08),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(760px_circle_at_18%_88%,rgba(56,189,248,0.05),transparent_62%)]" />
        <div className="absolute inset-0 opacity-25 bg-grid-pattern" />
        {/* Subtle cyan ambient animation */}
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary-500/[0.04] rounded-full blur-3xl animate-float" />
      </div>

      <div className="container-custom px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          <div className="relative overflow-hidden text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 surface rounded-full mb-8 animate-fade-in">
              <Sparkles size={16} className="text-primary-400" />
              <span className="text-sm text-primary-300">Available for Freelance</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-slide-up">
              Hi, I&apos;m{" "}
              <span className="text-gradient glow-text">Karan Kathur</span>
            </h1>

            {/* Role */}
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-200">
                {profile.headline}
              </h2>
            </div>

            {/* Positioning Line */}
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-12 animate-fade-in leading-relaxed">
              I build backend-driven applications, APIs, and dashboards that are{" "}
              <span className="text-primary-400 font-semibold">reliable</span>,{" "}
              <span className="text-primary-400 font-semibold">scalable</span>, and{" "}
              <span className="text-primary-400 font-semibold">production-ready</span>.
              Transforming ideas into high-impact digital products with{" "}
              <span className="text-slate-200 font-semibold">Python</span> at the core.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 animate-scale-in">
              <a
                href="#projects"
                className="group px-8 py-4 bg-primary-500 text-slate-950 rounded-full font-semibold text-lg hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-[1.01] flex items-center space-x-2"
              >
                <span>View My Work</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full font-semibold text-lg surface surface-hover hover:scale-[1.02] transition-transform"
              >
                Get In Touch
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                { label: "Experience", value: "+1 year" },
                { label: "Freelancing", value: "Since July 2025" },
                { label: "Location", value: profile.location },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-2xl surface surface-hover"
                >
                  <div className="text-lg font-semibold text-slate-100">{item.value}</div>
                  <div className="text-sm text-slate-400 mt-1">{item.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Terminal Panel — System Snapshot */}
          <div className="hidden lg:block">
            <div className="relative ml-auto max-w-md">
              {/* Glow backdrop */}
              <div className="pointer-events-none absolute -inset-8 opacity-30">
                <div className="absolute inset-0 bg-primary-500/10 rounded-3xl blur-2xl" />
              </div>

              <div className="relative space-y-4">
                {/* Terminal: Code Preview */}
                <div className="group/panel rounded-2xl border border-white/10 bg-[#0a0e17]/90 backdrop-blur-md shadow-2xl shadow-black/40 p-5 transition-all duration-300 hover:shadow-black/60 hover:border-primary-500/25">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      <div className="ml-2 text-xs text-slate-500 font-mono">~/system-status</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-slate-500" />
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        live
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-xs leading-relaxed space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">$</span>
                      <span className="text-primary-300">karan</span>
                      <span className="text-slate-500">--status</span>
                    </div>
                    <div className="text-slate-400 pl-4 border-l border-white/5 space-y-1 mt-2">
                      <div className="flex items-center gap-2">
                        <Server size={11} className="text-primary-400" />
                        <span className="text-emerald-400">✔</span>
                        <span>Backend Systems ── Python • Django • Node.js + FastAPI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database size={11} className="text-primary-400" />
                        <span className="text-emerald-400">✔</span>
                        <span>Databases ── PostgreSQL • MongoDB</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Terminal size={11} className="text-primary-400" />
                        <span className="text-emerald-400">✔</span>
                        <span>Frontend ── React • Next.js • Tailwind</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield size={11} className="text-primary-400" />
                        <span className="text-emerald-400">✔</span>
                        <span>APIs ── REST • Auth • Payments</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/5">
                      <span className="text-slate-500">status:</span>{" "}
                      <span className="text-emerald-400 font-semibold">ready for production</span>
                    </div>
                  </div>
                </div>

                {/* System stats */}
                <div className="rounded-2xl border border-white/10 bg-[#0a0e17]/90 backdrop-blur-md shadow-2xl shadow-black/35 p-5 transition-all duration-300 hover:shadow-black/55 hover:border-primary-500/20">
                  <div className="text-xs text-slate-500 font-mono mb-3">deployment log</div>
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    {[
                      { time: "00:01", text: "Dependencies installed", color: "text-slate-400" },
                      { time: "00:03", text: "Database migrations applied", color: "text-slate-400" },
                      { time: "00:04", text: "API routes registered", color: "text-slate-400" },
                      { time: "00:05", text: "Health check: 200 OK", color: "text-emerald-400" },
                      { time: "00:06", text: "Build complete — ready to serve", color: "text-primary-300" },
                    ].map((line) => (
                      <div key={line.time} className="flex items-center gap-3">
                        <span className="text-slate-600 w-10">{line.time}</span>
                        <span className={line.color}>{line.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats - Hidden */}
          {/* Uncomment below to show stats
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "30+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-primary-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
          */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-70">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
