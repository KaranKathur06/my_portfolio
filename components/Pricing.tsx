"use client";

import { useInView } from "react-intersection-observer";
import { Sparkles } from "lucide-react";

const Pricing = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const packs = [
    {
      title: "Freelance Pack",
      price: "Quote-based",
      note: "Best for landing pages and small websites",
      items: [
        "1–3 pages (responsive)",
        "Modern UI (Tailwind)",
        "Basic SEO + performance pass",
        "Deployment support",
      ],
    },
    {
      title: "Project-Based Work",
      price: "Quote-based",
      note: "Best for web apps and dashboards",
      items: [
        "Frontend + backend integration",
        "Auth / roles (if needed)",
        "Database + APIs",
        "Milestone-based delivery",
      ],
    },
    {
      title: "Maintenance / Support",
      price: "Quote-based",
      note: "Best for updates and reliability",
      items: [
        "Bug fixes + small changes",
        "Performance checks",
        "Dependency updates",
        "Priority response window",
      ],
    },
  ];

  return (
    <section id="pricing" className="section-padding">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 surface rounded-full mb-6 transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">Service Packs</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Simple <span className="text-gradient">Pricing</span>
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Clear starting points for freelance work. Final cost depends on scope and timeline.
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {packs.map((pack, index) => (
            <div
              key={pack.title}
              className={`p-7 rounded-2xl surface surface-hover transition-transform duration-300 hover:scale-[1.01] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 90 + 300}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-100">{pack.title}</h3>
                  <div className="text-slate-400 text-sm mt-1">{pack.note}</div>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-3xl font-bold text-slate-100">
                  {pack.price}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <ul className="space-y-2 text-sm text-slate-300">
                  {pack.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                      <span className="leading-relaxed">{i}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-primary-500 text-slate-950 font-semibold hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-14 transition-all duration-700 delay-[520ms] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_50%_35%,rgba(56,189,248,0.10),transparent_58%)]" />
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />

            <div className="relative px-6 py-10 md:px-10 md:py-12">
              <div className="max-w-2xl">
                <div className="text-sm text-primary-300 font-semibold">Quote-based work</div>
                <h3 className="mt-3 text-3xl md:text-4xl font-bold text-slate-100">
                  Ready to Start Your Project?
                </h3>
                <p className="mt-4 text-slate-300 leading-relaxed">
                  Tell me about your idea, scope, or problem — I&apos;ll help you figure out the right technical approach.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-primary-500 text-slate-950 font-semibold hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300"
                  >
                    Get a Quote
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-slate-200 font-semibold hover:border-primary-500/25 hover:bg-primary-500/10 transition-all duration-300"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
