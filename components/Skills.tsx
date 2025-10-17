"use client";

import { useInView } from "react-intersection-observer";
import { Sparkles } from "lucide-react";

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 92 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "JavaScript", level: 93 },
        { name: "HTML/CSS", level: 98 },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Python", level: 98 },
        { name: "Django", level: 90 },
        { name: "Flask", level: 92 },
        { name: "FastAPI", level: 88 },
        { name: "Node.js", level: 85 },
        { name: "REST APIs", level: 95 },
      ],
    },
    {
      category: "Mobile",
      skills: [
        { name: "Flutter", level: 87 },
        { name: "React Native", level: 82 },
        { name: "Dart", level: 85 },
        { name: "Mobile UI/UX", level: 90 },
      ],
    },
    {
      category: "Database & Tools",
      skills: [
        { name: "PostgreSQL", level: 88 },
        { name: "MongoDB", level: 85 },
        { name: "Firebase", level: 90 },
        { name: "Redis", level: 80 },
        { name: "Git", level: 95 },
        { name: "Docker", level: 82 },
      ],
    },
    {
      category: "Design",
      skills: [
        { name: "Figma", level: 92 },
        { name: "UI/UX Design", level: 90 },
        { name: "Responsive Design", level: 95 },
        { name: "Prototyping", level: 88 },
      ],
    },
    {
      category: "Other",
      skills: [
        { name: "AI/ML Integration", level: 85 },
        { name: "Web Scraping", level: 90 },
        { name: "Automation", level: 92 },
        { name: "Cloud (AWS/GCP)", level: 80 },
      ],
    },
  ];

  const tools = [
    "Python", "React", "Next.js", "TypeScript", "Django", "Flask", "FastAPI",
    "TailwindCSS", "Flutter", "PostgreSQL", "MongoDB", "Firebase", "Git",
    "Docker", "Figma", "VS Code", "Linux", "REST APIs", "GraphQL", "Redis",
  ];

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
            className={`w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className={`p-6 bg-slate-900/50 border border-slate-800 rounded-2xl transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${categoryIndex * 100 + 400}ms` }}
            >
              <h3 className="text-xl font-semibold mb-6 text-slate-200">{category.category}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-300">{skill.name}</span>
                      <span className="text-sm text-primary-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000 ease-out ${
                          inView ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          width: inView ? `${skill.level}%` : "0%",
                          transitionDelay: `${categoryIndex * 100 + skillIndex * 50 + 600}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools Cloud */}
        <div
          className={`transition-all duration-700 delay-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-slate-200">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, index) => (
              <span
                key={tool}
                className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full text-slate-300 hover:border-primary-500/50 hover:text-primary-400 transition-all duration-300 hover:scale-110 cursor-default"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-1200 ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {[
            { number: "20+", label: "Technologies Mastered" },
            { number: "50+", label: "Projects Delivered" },
            { number: "5+", label: "Years of Experience" },
            { number: "100%", label: "Code Quality" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-xl text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
