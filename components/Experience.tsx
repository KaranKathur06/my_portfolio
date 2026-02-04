"use client";

import { useInView } from "react-intersection-observer";
import { Sparkles } from "lucide-react";
import { experience } from "@/data/portfolio";

const Experience = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6 transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">Professional Experience</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Experience <span className="text-gradient">Timeline</span>
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Verified roles and responsibilities from my recent work.
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-800" />

            <div className="space-y-10">
              {experience.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={`${item.title}-${item.dateRange}`}
                    className={`relative grid md:grid-cols-2 gap-6 md:gap-10 items-start transition-all duration-700 ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 120 + 250}ms` }}
                  >
                    <div className={`${isLeft ? "md:pr-8" : "md:order-2 md:pl-8"} pl-12 md:pl-0`}>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-sm text-slate-300">
                        {item.dateRange}
                      </div>
                    </div>

                    <div className={`${isLeft ? "md:pl-8" : "md:order-1 md:pr-8"} pl-12 md:pl-0`}>
                      <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-primary-500/40 transition-colors">
                        <div className="flex flex-col gap-1 mb-4">
                          <h3 className="text-xl md:text-2xl font-semibold text-slate-100">
                            {item.title}
                          </h3>
                          <div className="text-sm text-slate-400">{item.company}</div>
                        </div>
                        <ul className="space-y-2 text-slate-300">
                          {item.bullets.map((b) => (
                            <li key={b} className="flex gap-3">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2">
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-primary-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
