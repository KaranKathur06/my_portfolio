"use client";

import { useInView } from "react-intersection-observer";
import {
  Sparkles,
  Globe,
  Server,
  Wrench,
  ArrowRight,
  Rocket,
  Database,
  LayoutDashboard,
  Cable,
  Check,
} from "lucide-react";

interface PricingProps {
  onStartProject?: (service: string) => void;
}

const Pricing = ({ onStartProject }: PricingProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleCTA = (service: string) => {
    if (onStartProject) {
      onStartProject(service);
    }
    // Smooth scroll to contact
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const packs = [
    {
      id: "freelance-starter",
      title: "Freelance Starter",
      price: "₹8,000",
      priceLabel: "Starting from",
      note: "Perfect for small businesses and personal brands",
      icon: Globe,
      featured: false,
      serviceKey: "Website",
      items: [
        "1–3 page responsive website",
        "Clean UI design",
        "Contact form (CRM connected)",
        "Basic SEO setup",
        "Deployment & go-live",
      ],
    },
    {
      id: "full-stack",
      title: "Full-Stack Development",
      price: "₹20,000",
      priceLabel: "Starting from",
      note: "Ideal for startups building real products",
      icon: Server,
      featured: true,
      serviceKey: "Full-Stack Application",
      items: [
        "Backend APIs & architecture",
        "Database design & setup",
        "Authentication system",
        "Dashboard / admin panel",
        "Deployment & infrastructure",
      ],
    },
    {
      id: "maintenance",
      title: "Maintenance & Support",
      price: "₹3,000",
      priceLabel: "Starting from",
      priceSuffix: "/month",
      note: "Keep your product fast, secure, and up to date",
      icon: Wrench,
      featured: false,
      serviceKey: "Not sure",
      items: [
        "Bug fixes & patches",
        "Feature updates",
        "Performance optimization",
        "Security monitoring",
        "Priority response window",
      ],
    },
  ];

  const addOns = [
    {
      icon: Rocket,
      title: "Deployment Setup",
      range: "₹1k – ₹3k",
    },
    {
      icon: Database,
      title: "Database Setup",
      range: "₹1.5k – ₹4k",
    },
    {
      icon: LayoutDashboard,
      title: "Admin Dashboard",
      range: "₹5k – ₹15k",
    },
    {
      icon: Cable,
      title: "API Integrations",
      range: "₹2k – ₹8k",
    },
  ];

  return (
    <section id="pricing" className="section-padding">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
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
            Transparent <span className="text-gradient">Pricing</span>
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Clear starting points so you know what to expect. Pick a pack, or
            let&apos;s discuss a custom scope.
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {packs.map((pack, index) => (
            <div
              key={pack.id}
              className={`relative group p-7 rounded-2xl transition-all duration-500 ${
                pack.featured
                  ? "bg-gradient-to-b from-primary-500/[0.08] to-transparent border-2 border-primary-500/25 shadow-2xl shadow-primary-500/[0.06]"
                  : "surface surface-hover"
              } ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              {/* Featured badge */}
              {pack.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-primary-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    pack.featured
                      ? "bg-primary-500/20"
                      : "bg-white/[0.05]"
                  }`}
                >
                  <pack.icon
                    size={22}
                    className={
                      pack.featured ? "text-primary-300" : "text-slate-400"
                    }
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-100">
                    {pack.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">{pack.note}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">
                  {pack.priceLabel}
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      pack.featured ? "text-primary-300" : "text-slate-100"
                    }`}
                  >
                    {pack.price}
                  </span>
                  {pack.priceSuffix && (
                    <span className="text-slate-500 text-sm font-medium">
                      {pack.priceSuffix}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <ul className="space-y-3">
                  {pack.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          pack.featured
                            ? "text-primary-400"
                            : "text-slate-500"
                        }`}
                      />
                      <span className="text-sm text-slate-300 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleCTA(pack.serviceKey)}
                  className={`mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                    pack.featured
                      ? "bg-primary-500 text-slate-950 hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/20"
                      : "bg-white/[0.06] text-slate-200 border border-white/10 hover:bg-white/[0.10] hover:border-primary-500/30"
                  }`}
                >
                  <span>Start a Project</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div
          className={`mt-14 transition-all duration-700 delay-[600ms] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-100">
              Need Something Extra?
            </h3>
            <p className="text-slate-400 mt-2 text-sm">
              Add-on services to extend your project
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((addon, i) => (
              <div
                key={addon.title}
                className={`group p-5 rounded-xl surface surface-hover cursor-pointer transition-all duration-500 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80 + 700}ms` }}
                onClick={() => handleCTA("Not sure")}
              >
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center mb-3 group-hover:bg-primary-500/20 transition-colors">
                  <addon.icon size={18} className="text-primary-400" />
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {addon.title}
                </div>
                <div className="text-xs text-primary-400 font-medium mt-1">
                  {addon.range}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Note + Bottom CTA */}
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
                <div className="text-sm text-primary-300 font-semibold">
                  Custom projects welcome
                </div>
                <h3 className="mt-3 text-3xl md:text-4xl font-bold text-slate-100">
                  Have a Different Idea?
                </h3>
                <p className="mt-4 text-slate-300 leading-relaxed">
                  Final pricing depends on project complexity, features, and
                  timeline. Tell me about your idea — I&apos;ll help you figure
                  out the right technical approach and a fair estimate.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    onClick={() => handleCTA("Not sure")}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary-500 text-slate-950 font-semibold hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 cursor-pointer"
                  >
                    <span>Discuss Your Idea</span>
                    <ArrowRight size={16} />
                  </button>
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
