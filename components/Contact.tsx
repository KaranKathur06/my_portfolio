"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  Layers,
  FileText,
  Wallet,
  Clock,
  User,
  Send,
  Check,
} from "lucide-react";
import { profile } from "@/data/portfolio";

// ── Types ─────────────────────────────────────────────────────────
interface FunnelData {
  service_type: string;
  message: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactProps {
  preselectedService?: string;
}

// ── Step Config ───────────────────────────────────────────────────
const TOTAL_STEPS = 5;

const SERVICE_OPTIONS = [
  { value: "Website", label: "Website", desc: "Landing page, portfolio, or multi-page site" },
  { value: "Full-Stack Application", label: "Full-Stack Application", desc: "Frontend + backend + database" },
  { value: "Dashboard / Admin Panel", label: "Dashboard / Admin Panel", desc: "Data-driven internal tools" },
  { value: "API / Backend", label: "API / Backend", desc: "REST APIs, microservices, integrations" },
  { value: "Not sure", label: "Not sure yet", desc: "Let's figure it out together" },
];

const BUDGET_OPTIONS = [
  { value: "₹5k–₹10k", label: "₹5k – ₹10k", tag: "Starter" },
  { value: "₹10k–₹25k", label: "₹10k – ₹25k", tag: "Growth" },
  { value: "₹25k–₹50k", label: "₹25k – ₹50k", tag: "Pro" },
  { value: "₹50k+", label: "₹50k+", tag: "Enterprise" },
];

const TIMELINE_OPTIONS = [
  { value: "ASAP", label: "ASAP", icon: "⚡" },
  { value: "1–2 weeks", label: "1–2 Weeks", icon: "📅" },
  { value: "1 month", label: "1 Month", icon: "🗓️" },
  { value: "Flexible", label: "Flexible", icon: "🌊" },
];

const STEP_META = [
  { title: "Service", icon: Layers, question: "What are you looking to build?" },
  { title: "Project", icon: FileText, question: "Tell me about your project" },
  { title: "Budget", icon: Wallet, question: "What's your budget range?" },
  { title: "Timeline", icon: Clock, question: "When do you need this?" },
  { title: "Details", icon: User, question: "How can I reach you?" },
];

// ── Component ─────────────────────────────────────────────────────
const Contact = ({ preselectedService }: ContactProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const stepContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FunnelData>({
    service_type: "",
    message: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
  });

  // Pre-select service from pricing CTA
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service_type: preselectedService }));
      // If service is already selected, jump to step 1
      if (currentStep === 0) {
        setDirection("forward");
        setCurrentStep(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectedService]);

  const updateField = useCallback(
    <K extends keyof FunnelData>(field: K, value: FunnelData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 0:
        return formData.service_type !== "";
      case 1:
        return formData.message.trim().length >= 10;
      case 2:
        return formData.budget !== "";
      case 3:
        return formData.timeline !== "";
      case 4:
        return (
          formData.name.trim().length >= 2 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        );
      default:
        return false;
    }
  }, [currentStep, formData]);

  const goNext = useCallback(() => {
    if (!canProceed || currentStep >= TOTAL_STEPS - 1) return;
    setDirection("forward");
    setCurrentStep((s) => s + 1);
  }, [canProceed, currentStep]);

  const goPrev = useCallback(() => {
    if (currentStep <= 0) return;
    setDirection("backward");
    setCurrentStep((s) => s - 1);
  }, [currentStep]);

  // Handle final submission
  const handleSubmit = async () => {
    if (!canProceed) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service_type: formData.service_type,
          budget: formData.budget,
          timeline: formData.timeline,
          subject: formData.service_type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  // ── Contact info sidebar ──────────────────────────────────────
  const contactInfo = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone.replace(/-/g, " "), href: `tel:${profile.phone.replace(/-/g, "")}` },
    { icon: MapPin, label: "Location", value: profile.location, href: null },
  ];

  const socialLinks = [
    { icon: Github, href: profile.links.github, label: "GitHub" },
    { icon: Linkedin, href: profile.links.linkedin, label: "LinkedIn" },
  ];

  const resumeHref = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/KARAN_KATHUR_RESUME.pdf`;

  // ── Success Screen ────────────────────────────────────────────
  if (status === "success") {
    return (
      <section id="contact" className="section-padding bg-slate-900/30">
        <div className="container-custom" ref={ref}>
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center animate-scale-in">
              <CheckCircle size={40} className="text-green-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Thanks! Your project is in good hands.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-2">
              I&apos;ll review your project details and get back to you within{" "}
              <span className="text-primary-300 font-semibold">24 hours</span>.
            </p>
            <p className="text-sm text-slate-500">
              Check your email ({formData.email}) for a confirmation.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl surface surface-hover text-slate-200 font-medium"
              >
                <Linkedin size={18} />
                <span>Connect on LinkedIn</span>
              </a>
              <button
                onClick={() => {
                  setStatus("idle");
                  setCurrentStep(0);
                  setFormData({
                    service_type: "",
                    message: "",
                    budget: "",
                    timeline: "",
                    name: "",
                    email: "",
                    phone: "",
                  });
                }}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                Submit another project →
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            <span className="text-sm text-primary-300">Start a Project</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Let&apos;s Build <span className="text-gradient">Together</span>
          </h2>

          <p
            className={`text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Answer a few quick questions so I can understand your project better
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto mt-6 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* ── Left: Contact Info (2 cols) ─────────────────────── */}
          <div
            className={`lg:col-span-2 space-y-8 transition-all duration-700 delay-400 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-slate-200">
                Contact Information
              </h3>
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

            {/* Availability */}
            <div className="p-6 rounded-xl surface">
              <h4 className="text-xl font-semibold mb-2 text-slate-200">
                Ready to Start?
              </h4>
              <p className="text-slate-400 mb-4">
                I&apos;m currently available for freelance work and new project
                opportunities.
              </p>
              <div className="flex items-center space-x-2 text-primary-400">
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Available for hire</span>
              </div>
            </div>
          </div>

          {/* ── Right: Multi-Step Funnel (3 cols) ──────────────── */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-500 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">
                  Step {currentStep + 1} of {TOTAL_STEPS}
                </span>
                <span className="text-sm font-medium text-primary-300">
                  {STEP_META[currentStep].title}
                </span>
              </div>

              {/* Step indicators */}
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i < currentStep
                        ? "bg-primary-500 flex-1"
                        : i === currentStep
                        ? "bg-primary-400 flex-[2]"
                        : "bg-white/10 flex-1"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div
              ref={stepContainerRef}
              className="relative min-h-[380px] overflow-hidden"
            >
              <div
                key={currentStep}
                className={`funnel-step ${
                  direction === "forward"
                    ? "funnel-step-enter-right"
                    : "funnel-step-enter-left"
                }`}
              >
                {/* Step Question */}
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
                  {STEP_META[currentStep].question}
                </h3>
                <p className="text-sm text-slate-500 mb-8">
                  {currentStep === 0 && "This helps me recommend the right approach for you"}
                  {currentStep === 1 && "A brief description helps me understand your vision"}
                  {currentStep === 2 && "This ensures we're aligned from the start"}
                  {currentStep === 3 && "Helps me plan resources and milestones"}
                  {currentStep === 4 && "I'll send you a detailed response within 24 hours"}
                </p>

                {/* ── Step 0: Service Selection ──────────────────── */}
                {currentStep === 0 && (
                  <div className="grid gap-3">
                    {SERVICE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          updateField("service_type", opt.value);
                          // Auto-advance after selection
                          setTimeout(() => {
                            setDirection("forward");
                            setCurrentStep(1);
                          }, 200);
                        }}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer group ${
                          formData.service_type === opt.value
                            ? "bg-primary-500/10 border-primary-500/40 shadow-lg shadow-primary-500/5"
                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-slate-100">
                              {opt.label}
                            </div>
                            <div className="text-sm text-slate-400 mt-0.5">
                              {opt.desc}
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              formData.service_type === opt.value
                                ? "border-primary-400 bg-primary-500"
                                : "border-white/20 group-hover:border-white/40"
                            }`}
                          >
                            {formData.service_type === opt.value && (
                              <Check size={12} className="text-slate-950" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* ── Step 1: Project Description ────────────────── */}
                {currentStep === 1 && (
                  <div>
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      rows={6}
                      autoFocus
                      className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500/40 focus:shadow-lg focus:shadow-primary-500/5 transition-all duration-200 resize-none text-[15px] leading-relaxed"
                      placeholder="e.g., I need an e-commerce platform with user authentication, product listings, and payment integration..."
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">
                        {formData.message.length < 10
                          ? `${10 - formData.message.length} more characters needed`
                          : "✓ Looks good"}
                      </span>
                    </div>
                  </div>
                )}

                {/* ── Step 2: Budget Selection ───────────────────── */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-2 gap-3">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          updateField("budget", opt.value);
                          setTimeout(() => {
                            setDirection("forward");
                            setCurrentStep(3);
                          }, 200);
                        }}
                        className={`p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          formData.budget === opt.value
                            ? "bg-primary-500/10 border-primary-500/40 shadow-lg shadow-primary-500/5"
                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                        }`}
                      >
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                          {opt.tag}
                        </div>
                        <div className="text-xl font-bold text-slate-100">
                          {opt.label}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* ── Step 3: Timeline Selection ─────────────────── */}
                {currentStep === 3 && (
                  <div className="grid grid-cols-2 gap-3">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          updateField("timeline", opt.value);
                          setTimeout(() => {
                            setDirection("forward");
                            setCurrentStep(4);
                          }, 200);
                        }}
                        className={`p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          formData.timeline === opt.value
                            ? "bg-primary-500/10 border-primary-500/40 shadow-lg shadow-primary-500/5"
                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                        }`}
                      >
                        <div className="text-2xl mb-2">{opt.icon}</div>
                        <div className="font-semibold text-slate-100">
                          {opt.label}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* ── Step 4: Contact Details ────────────────────── */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="funnel-name"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="funnel-name"
                        autoFocus
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500/40 focus:shadow-lg focus:shadow-primary-500/5 transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="funnel-email"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="funnel-email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500/40 focus:shadow-lg focus:shadow-primary-500/5 transition-all duration-200"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="funnel-phone"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Phone{" "}
                        <span className="text-slate-500 font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="funnel-phone"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500/40 focus:shadow-lg focus:shadow-primary-500/5 transition-all duration-200"
                        placeholder="+91 00000 00000"
                      />
                    </div>

                    {/* Error Message */}
                    {status === "error" && (
                      <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                        <AlertCircle size={20} />
                        <span>{errorMessage || "Something went wrong. Please try again."}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.06]">
              <button
                onClick={goPrev}
                disabled={currentStep === 0}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                  currentStep === 0
                    ? "opacity-0 pointer-events-none"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                }`}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              {currentStep < TOTAL_STEPS - 1 ? (
                <button
                  onClick={goNext}
                  disabled={!canProceed}
                  className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                    canProceed
                      ? "bg-primary-500 text-slate-950 hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/20"
                      : "bg-white/[0.06] text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed || status === "loading"}
                  className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                    canProceed && status !== "loading"
                      ? "bg-primary-500 text-slate-950 hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/20"
                      : "bg-white/[0.06] text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Summary bar */}
            {currentStep > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {formData.service_type && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-medium text-primary-300">
                    <Layers size={12} />
                    {formData.service_type}
                  </span>
                )}
                {formData.budget && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-medium text-primary-300">
                    <Wallet size={12} />
                    {formData.budget}
                  </span>
                )}
                {formData.timeline && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-medium text-primary-300">
                    <Clock size={12} />
                    {formData.timeline}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
