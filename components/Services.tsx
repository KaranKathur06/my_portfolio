"use client";

import { useInView } from "react-intersection-observer";
import {
  Code2,
  Palette,
  Smartphone,
  Layout,
  Database,
  Wrench,
  Sparkles,
  Zap,
} from "lucide-react";

const Services = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Layout,
      title: "Web Design",
      description:
        "Modern, responsive, and user-centric web designs that captivate and convert. From wireframes to high-fidelity mockups.",
      features: ["UI/UX Design", "Responsive Layouts", "Prototyping", "Brand Identity"],
    },
    {
      icon: Code2,
      title: "Web Development",
      description:
        "Full-stack web applications built with cutting-edge technologies. Fast, scalable, and maintainable code.",
      features: ["React & Next.js", "Python Backend", "REST APIs", "Database Design"],
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description:
        "Cross-platform mobile applications that deliver native-like experiences on iOS and Android.",
      features: ["Flutter & React Native", "Native Performance", "App Store Deployment", "Push Notifications"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Intuitive interfaces and delightful user experiences that keep users engaged and satisfied.",
      features: ["User Research", "Wireframing", "Interactive Prototypes", "Usability Testing"],
    },
    {
      icon: Database,
      title: "Backend & APIs",
      description:
        "Robust backend systems and RESTful APIs using Python frameworks like Django, Flask, and FastAPI.",
      features: ["Python Frameworks", "Database Optimization", "Authentication", "Cloud Integration"],
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description:
        "Ongoing maintenance, updates, and technical support to keep your digital products running smoothly.",
      features: ["Bug Fixes", "Performance Optimization", "Security Updates", "Feature Enhancements"],
    },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6 transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">What I Offer</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-gradient">Services</span> & Expertise
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            From concept to deployment, I provide end-to-end solutions for all your digital needs
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/10 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-primary-400" size={32} />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-3 text-slate-200 group-hover:text-primary-400 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm text-slate-400">
                    <Zap size={14} className="text-primary-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="mt-6 pt-6 border-t border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href="#contact"
                  className="text-primary-400 font-semibold flex items-center space-x-2 hover:space-x-3 transition-all"
                >
                  <span>Get Started</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xl text-slate-300 mb-6">
            Need something specific? Let&apos;s discuss your project requirements
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 border-2 border-primary-500 rounded-full font-semibold text-lg hover:bg-primary-500/10 transition-all duration-300 hover:scale-105"
          >
            Request a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
