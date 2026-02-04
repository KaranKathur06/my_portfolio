"use client";

import { useMemo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";

const Hero = () => {
  const gifSrc = useMemo(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/my_portfolio";
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
              Hi, I&apos;m{" "}
              <span className="text-gradient glow-text">Karan Kathur</span>
            </h1>

            {/* Role */}
            <div className="mb-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-200">
                {profile.headline}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-12 animate-fade-in leading-relaxed">
              Building powerful, elegant digital experiences with{" "}
              <span className="text-primary-400 font-semibold">Python</span> at the core.
              Transforming ideas into production-ready, high-impact digital products.
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
                { label: "Experience", value: "~1 year" },
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

          <div className="hidden lg:block">
            <div className="relative ml-auto max-w-md">
              <div className="group/scene relative">
                <div className="pointer-events-none absolute -inset-10 opacity-35 group-hover/scene:opacity-45 transition-opacity duration-500">
                  <div className="absolute inset-0 blur-2xl">
                    <svg
                      viewBox="0 0 600 600"
                      className="h-full w-full translate-y-0 group-hover/scene:translate-y-1 transition-transform duration-500 brightness-100 group-hover/scene:brightness-110"
                      aria-hidden="true"
                    >
                      <defs>
                        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="rgba(56,189,248,0.22)" />
                          <stop offset="55%" stopColor="rgba(56,189,248,0.06)" />
                          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                        </radialGradient>
                        <linearGradient id="heroStroke" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="rgba(56,189,248,0.45)" />
                          <stop offset="100%" stopColor="rgba(56,189,248,0.0)" />
                        </linearGradient>
                      </defs>
                      <g className="origin-center animate-[spin_12s_linear_infinite]" opacity="0.9">
                        <circle cx="300" cy="300" r="210" fill="url(#heroGlow)" />
                        <circle cx="300" cy="300" r="238" fill="none" stroke="url(#heroStroke)" strokeWidth="2" />
                        <circle cx="300" cy="300" r="150" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="relative space-y-4">
                  <div className="group/panel rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl shadow-black/40 p-5 transition-all duration-300 hover:shadow-black/60 hover:border-primary-500/25 hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="ml-2 text-xs text-slate-500 font-mono">api/main.py</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary-500/25 bg-primary-500/10 text-primary-200">
                          FastAPI
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          live
                        </span>
                      </div>
                    </div>

                    <pre className="font-mono text-xs leading-relaxed text-slate-300 whitespace-pre">
                      <span className="text-primary-300">from</span> <span className="text-slate-200">fastapi</span> <span className="text-primary-300">import</span> <span className="text-slate-200">FastAPI</span>{"\n\n"}
                      <span className="text-slate-200">app</span> <span className="text-slate-200">=</span> <span className="text-slate-200">FastAPI()</span>{"\n\n"}
                      <span className="text-primary-300">@</span><span className="text-slate-200">app.get</span><span className="text-slate-200">(</span><span className="text-primary-200">&quot;/health&quot;</span><span className="text-slate-200">)</span>{"\n"}
                      <span className="text-primary-300">def</span> <span className="text-slate-200">health</span><span className="text-slate-200">():</span>{"\n"}
                      <span className="text-slate-200">    return</span> <span className="text-slate-200">{`{`}</span><span className="text-primary-200">&quot;status&quot;</span><span className="text-slate-200">:</span> <span className="text-primary-200">&quot;ok&quot;</span><span className="text-slate-200">{`}`}</span>
                    </pre>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl shadow-black/35 p-5 transition-all duration-300 hover:shadow-black/55 hover:border-primary-500/20 hover:scale-[1.01]">
                    <div className="text-xs text-slate-500 font-mono mb-3">system status</div>
                    <div className="space-y-2 text-sm text-slate-200">
                      {[
                        "✔ API initialized",
                        "✔ Routes registered",
                        "✔ Database connected",
                        "✔ Health check: OK",
                        "✔ Ready for production traffic",
                      ].map((line) => (
                        <div key={line} className="text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
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
