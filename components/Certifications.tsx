"use client";

import { useInView } from "react-intersection-observer";
import { Award, Sparkles } from "lucide-react";
import { certifications } from "@/data/portfolio";

const Certifications = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certifications" className="section-padding bg-slate-900/30">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6 transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">Certifications</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Certifications & <span className="text-gradient">Learning</span>
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Relevant certifications and training completed as part of my continuous learning.
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((title, index) => (
            <div
              key={title}
              className={`group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-primary-500/40 transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 60 + 350}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="text-primary-400" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 group-hover:text-primary-300 transition-colors">
                    {title}
                  </h3>
                  <div className="mt-3 inline-flex items-center px-2.5 py-1 rounded-full bg-slate-950/40 border border-slate-800 text-xs text-slate-300">
                    Verified from resume
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
