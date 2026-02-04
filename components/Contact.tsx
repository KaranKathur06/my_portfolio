"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Sparkles, CheckCircle, AlertCircle, Download, ChevronDown, Check } from "lucide-react";
import { profile } from "@/data/portfolio";

const Contact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const subjectOptions = useMemo(
    () => [
      { value: "Web Development", label: "💻 Web Development Project" },
      { value: "Mobile App Development", label: "📱 Mobile App Development" },
      { value: "UI/UX Design", label: "🎨 UI/UX Design Services" },
      { value: "Full-Stack Development", label: "⚡ Full-Stack Development" },
      { value: "Backend Development", label: "🔧 Backend Development" },
      { value: "Consultation", label: "💡 Technical Consultation" },
      { value: "Maintenance & Support", label: "🛠️ Maintenance & Support" },
      { value: "General Inquiry", label: "📧 General Inquiry" },
      { value: "Other", label: "🔖 Other" },
    ],
    []
  );

  const [subjectOpen, setSubjectOpen] = useState(false);
  const [subjectActiveIndex, setSubjectActiveIndex] = useState(0);
  const subjectWrapRef = useRef<HTMLDivElement | null>(null);
  const subjectButtonRef = useRef<HTMLButtonElement | null>(null);

  const selectedSubject = subjectOptions.find((o) => o.value === formData.subject) || null;

  useEffect(() => {
    if (!subjectOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const el = subjectWrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setSubjectOpen(false);
    };

    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [subjectOpen]);

  useEffect(() => {
    if (!subjectOpen) return;
    const idx = Math.max(
      0,
      subjectOptions.findIndex((o) => o.value === formData.subject)
    );
    setSubjectActiveIndex(idx === -1 ? 0 : idx);
  }, [formData.subject, subjectOpen, subjectOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // For static site deployment, open email client
      const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
      
      if (false) {
        setStatus("error");
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone.replace(/-/g, " "),
      href: `tel:${profile.phone.replace(/-/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Github, href: profile.links.github, label: "GitHub" },
    { icon: Linkedin, href: profile.links.linkedin, label: "LinkedIn" },
  ];

  const resumeHref = `${process.env.NEXT_PUBLIC_BASE_PATH || "/my_portfolio"}/KARAN_KATHUR_RESUME.pdf`;

  return (
    <section id="contact" className="section-padding bg-slate-900/30">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 surface rounded-full mb-6 transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">Let&apos;s Connect</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Get In <span className="text-gradient">Touch</span>
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-700 delay-400 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-slate-200">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl surface surface-hover"
                  >
                    <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-primary-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-slate-200 hover:text-primary-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-200">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-slate-200">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 py-3 rounded-xl surface surface-hover text-slate-200"
                >
                  Connect on LinkedIn
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 py-3 rounded-xl surface surface-hover text-slate-200"
                >
                  View GitHub Profile
                </a>
                <a
                  href={resumeHref}
                  className="w-full px-5 py-3 bg-primary-500 rounded-xl font-semibold text-slate-950 flex items-center justify-center gap-2 hover:bg-primary-400 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-slate-200">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-14 h-14 rounded-xl surface surface-hover flex items-center justify-center text-slate-400 hover:text-primary-300 transition-all duration-300 hover:scale-105"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-6 rounded-xl surface">
              <h4 className="text-xl font-semibold mb-2 text-slate-200">Ready to Start?</h4>
              <p className="text-slate-400 mb-4">
                I&apos;m currently available for freelance work and new project opportunities.
              </p>
              <div className="flex items-center space-x-2 text-primary-400">
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Available for hire</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-500 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl surface text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl surface text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject *
                </label>
                <div ref={subjectWrapRef} className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="sr-only"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    {subjectOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>

                  <button
                    ref={subjectButtonRef}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={subjectOpen}
                    className={`w-full px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/25 ${
                      subjectOpen
                        ? "bg-[#0b1220]/80 border-primary-500/25 shadow-2xl shadow-black/40"
                        : "bg-[#0b1220]/60 border-white/10"
                    }`}
                    onClick={() => setSubjectOpen((v) => !v)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSubjectOpen(false);
                        return;
                      }

                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setSubjectOpen(true);
                        setSubjectActiveIndex((i) => Math.min(subjectOptions.length - 1, i + 1));
                        return;
                      }

                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setSubjectOpen(true);
                        setSubjectActiveIndex((i) => Math.max(0, i - 1));
                        return;
                      }

                      if (e.key === "Enter" || e.key === " ") {
                        if (!subjectOpen) return;
                        e.preventDefault();
                        const o = subjectOptions[subjectActiveIndex];
                        setFormData((p) => ({ ...p, subject: o.value }));
                        setSubjectOpen(false);
                        return;
                      }
                    }}
                  >
                    <span className="min-w-0">
                      {selectedSubject ? (
                        <span className="inline-flex items-center gap-3 min-w-0">
                          <span className="w-6 text-center text-base leading-none">{selectedSubject.label.split(" ")[0]}</span>
                          <span className="text-slate-200 font-medium truncate">
                            {selectedSubject.label.split(" ").slice(1).join(" ")}
                          </span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">Select a subject</span>
                      )}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${
                        subjectOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    role="listbox"
                    aria-label="Subject"
                    tabIndex={-1}
                    className={`absolute z-30 mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220]/95 backdrop-blur-md overflow-hidden transition-all duration-200 origin-top ${
                      subjectOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "pointer-events-none opacity-0 scale-[0.98] -translate-y-1"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        e.preventDefault();
                        setSubjectOpen(false);
                        subjectButtonRef.current?.focus();
                        return;
                      }

                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setSubjectActiveIndex((i) => Math.min(subjectOptions.length - 1, i + 1));
                        return;
                      }

                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setSubjectActiveIndex((i) => Math.max(0, i - 1));
                        return;
                      }

                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        const o = subjectOptions[subjectActiveIndex];
                        setFormData((p) => ({ ...p, subject: o.value }));
                        setSubjectOpen(false);
                        subjectButtonRef.current?.focus();
                      }
                    }}
                  >
                    {subjectOptions.map((o, idx) => {
                      const isSelected = formData.subject === o.value;
                      const isActive = idx === subjectActiveIndex;
                      const icon = o.label.split(" ")[0];
                      const text = o.label.split(" ").slice(1).join(" ");

                      return (
                        <button
                          key={o.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`w-full px-4 py-3 text-left flex items-center justify-between gap-3 transition-colors ${
                            isActive
                              ? "bg-primary-500/10"
                              : "bg-transparent"
                          } hover:bg-primary-500/10`}
                          onMouseEnter={() => setSubjectActiveIndex(idx)}
                          onClick={() => {
                            setFormData((p) => ({ ...p, subject: o.value }));
                            setSubjectOpen(false);
                            subjectButtonRef.current?.focus();
                          }}
                        >
                          <span className="inline-flex items-center gap-3 min-w-0">
                            <span className="w-6 text-center text-base leading-none">{icon}</span>
                            <span className="text-slate-200 font-medium truncate">{text}</span>
                          </span>

                          {isSelected ? (
                            <span className="flex items-center gap-2 text-primary-300">
                              <Check size={16} />
                            </span>
                          ) : (
                            <span className="w-4" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl surface text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
                  <CheckCircle size={20} />
                  <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                  <AlertCircle size={20} />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-8 py-4 bg-primary-500 rounded-xl font-semibold text-lg text-slate-950 hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
