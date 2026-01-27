"use client";

import { useInView } from "react-intersection-observer";
import { Code, Palette, Rocket, Zap } from "lucide-react";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: Code,
      title: "Python-Powered",
      description: "Backend systems, automation, data integration, and AI-powered applications",
    },
    {
      icon: Palette,
      title: "Design-First",
      description: "Clean UI/UX with modern frameworks like React, Next.js, and TailwindCSS",
    },
    {
      icon: Rocket,
      title: "Full-Stack",
      description: "End-to-end development from design to deployment and optimization",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Maintainable, secure, and high-performance code that scales",
    },
  ];

  return (
    <section id="about" className="section-padding bg-slate-900/30">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            About <span className="text-gradient">Me</span>
          </h2>
          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto transition-all duration-700 delay-100 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Main Content Grid - Perfectly Aligned */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* LEFT COLUMN: About Me Text + Workflow */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 flex flex-col ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium">
                Hey, I&apos;m <span className="text-gradient font-bold">Karan Kathur</span> — a full-stack{" "}
                <span className="text-primary-400 font-semibold">Web & App Designer + Developer</span>{" "}
                who builds powerful, elegant digital experiences.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed">
                I specialize in using{" "}
                <span className="inline-flex items-center px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 font-semibold">
                  🐍 Python
                </span>{" "}
                for backend systems, automation, data integration, and AI-powered web applications — combining it with modern frontend frameworks like{" "}
                <span className="text-primary-400 font-semibold">React</span>,{" "}
                <span className="text-primary-400 font-semibold">Next.js</span>, and{" "}
                <span className="text-primary-400 font-semibold">TailwindCSS</span>{" "}
                to deliver clean, fast, and scalable solutions.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed">
                Whether it&apos;s designing a modern interface, developing a full web platform, or building cross-platform apps, I handle the{" "}
                <span className="text-accent-400 font-semibold">complete process</span> — design, development, optimization, and deployment.
              </p>
            </div>

            {/* Workflow Section */}
            <div className="flex-grow flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-slate-100">
                <span className="text-gradient">My Workflow</span>
              </h3>
              <div className="space-y-3 flex-grow">
                {[
                  { icon: "🎯", title: "Understand deeply", desc: "Every project starts with strategy and user needs" },
                  { icon: "🎨", title: "Design intelligently", desc: "Focused on clean UI/UX and smooth experiences" },
                  { icon: "⚡", title: "Develop efficiently", desc: "Writing maintainable, secure, and high-performance code" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3.5 bg-slate-800/30 rounded-xl border border-slate-800 hover:border-primary-500/30 transition-all duration-300">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="text-base font-semibold text-primary-400 mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="p-5 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl border border-primary-500/10">
              <p className="text-sm text-slate-300 leading-relaxed mb-2.5">
                I&apos;ve worked across technologies like:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Flask", "Django", "FastAPI", "React", "Next.js", "Flutter", "Firebase", "REST APIs"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-xs text-slate-300 hover:border-primary-500/50 hover:text-primary-400 transition-all duration-300">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Crafting everything from dashboards to automation tools and full-scale SaaS platforms.
              </p>
            </div>

            {/* Final Statement */}
            <div className="p-5 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-2xl border-l-4 border-primary-500">
              <p className="text-sm text-slate-200 leading-relaxed">
                When you collaborate with me, you get more than a coder — you get a{" "}
                <span className="text-accent-400 font-bold">problem solver</span> who understands both{" "}
                <span className="text-primary-400 font-semibold">technology</span> and{" "}
                <span className="text-primary-400 font-semibold">design</span>, capable of turning ideas into{" "}
                <span className="text-gradient font-bold">production-ready, high-impact digital products</span>.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Skill/Feature Boxes */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-300 h-full content-start ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="relative p-5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl hover:border-primary-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10 group overflow-hidden flex flex-col aspect-square"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/5 group-hover:to-accent-500/5 transition-all duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                    <item.icon className="text-primary-400 group-hover:text-primary-300" size={24} />
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-slate-100 group-hover:text-gradient transition-all duration-300">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors flex-grow">{item.description}</p>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`mt-20 relative transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative p-10 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-primary-500/10 rounded-3xl border border-primary-500/20 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl" />
            
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
                  className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
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
