"use client";

import { useInView } from "react-intersection-observer";
import { Sparkles, Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Understand Requirements",
    description:
      "Deep-dive into your goals, users, and constraints. I ask the right questions to define what success looks like before writing a single line of code.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design the System",
    description:
      "Plan the architecture — database schema, API contracts, component structure. Every decision is made with scalability and maintainability in mind.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Build & Test",
    description:
      "Implement with clean, well-structured code. Every feature is tested against real-world scenarios, edge cases, and performance benchmarks.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Deploy & Maintain",
    description:
      "Ship to production with proper CI/CD, monitoring, and documentation. I stay available for iterations, bug fixes, and future enhancements.",
  },
];

const HowIWork = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="process" className="section-padding">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 surface rounded-full mb-6 transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">My Process</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            How I <span className="text-gradient">Work</span>
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            A structured, engineering-first approach to building software that works in the real world.
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group relative p-6 rounded-2xl surface surface-hover transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 120 + 300}ms` }}
            >
              {/* Step number */}
              <div className="absolute -top-3 -right-2 text-6xl font-black text-white/[0.03] select-none pointer-events-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <step.icon size={22} className="text-primary-400" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-primary-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (between cards on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary-500/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
