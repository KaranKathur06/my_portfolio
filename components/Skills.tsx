"use client";

import { useInView } from "react-intersection-observer";
import { Database, Layout, Server, Smartphone, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/portfolio";

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const iconMap: Record<string, LucideIcon> = {
    frontend: Layout,
    backend: Server,
    mobile: Smartphone,
    data: Database,
    tools: Wrench,
  };

  const tierStyles: Record<string, string> = {
    Core: "bg-primary-500/10 border-primary-500/25 text-primary-300",
    Strong: "bg-slate-900/50 border-slate-700 text-slate-200",
    Familiar: "bg-slate-950/30 border-slate-800 text-slate-300",
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6 transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">Technical Expertise</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Skills & <span className="text-gradient">Technologies</span>
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            A comprehensive toolkit for building modern, scalable, and high-performance applications
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, index) => {
            const Icon = iconMap[group.icon] || Wrench;
            const tiers = group.tiers as Record<string, string[]>;

            return (
              <div
                key={group.title}
                className={`group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl transition-all duration-700 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/10 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 90 + 350}ms` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/18 to-primary-500/0 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon size={22} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">{group.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">Grouped by capability and confidence</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {(["Core", "Strong", "Familiar"] as const).map((tier) => {
                    const items = tiers[tier] || [];
                    if (items.length === 0) return null;

                    return (
                      <div key={tier}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-semibold text-slate-200">{tier}</div>
                          <div className={`text-xs px-2 py-1 rounded-full border ${tierStyles[tier] || tierStyles.Strong}`}>
                            {items.length}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {items.map((s) => (
                            <span
                              key={s}
                              className={`px-3 py-1 text-xs rounded-full border ${tierStyles[tier] || tierStyles.Strong}`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
