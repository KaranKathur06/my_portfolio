"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Code2, Sparkles } from "lucide-react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const roles = [
    "Full-Stack Developer",
    "Web Designer",
    "App Developer",
    "UI/UX Designer",
    "Python Expert",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentText = "";
    let charIndex = 0;
    const role = roles[currentIndex];

    const typeInterval = setInterval(() => {
      if (charIndex < role.length) {
        currentText += role[charIndex];
        setDisplayText(currentText);
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container-custom px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-8 animate-fade-in">
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">Available for Freelance</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            Hi, I'm{" "}
            <span className="text-gradient glow-text">Karan Kathur</span>
          </h1>

          {/* Animated Role */}
          <div className="h-16 md:h-20 mb-8">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-slate-300">
              <span className="inline-flex items-center">
                <Code2 className="mr-3 text-primary-400" size={32} />
                <span className="text-primary-400 min-w-[300px] md:min-w-[400px] text-left">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 animate-fade-in leading-relaxed">
            Building powerful, elegant digital experiences with{" "}
            <span className="text-primary-400 font-semibold">Python</span> at the core.
            Transforming ideas into production-ready, high-impact digital products.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-scale-in">
            <a
              href="#projects"
              className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <span>View My Work</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-primary-500 rounded-full font-semibold text-lg hover:bg-primary-500/10 transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </a>
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
