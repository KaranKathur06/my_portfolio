"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

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
      const mailtoLink = `mailto:kathurkaran077@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
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
      value: "kathurkaran077@gmail.com",
      href: "mailto:kathurkaran077@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 6352 454 180",
      href: "tel:+916352454180",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/KaranKathur06", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/karan-kathur", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/karankathur", label: "Twitter" },
  ];

  return (
    <section id="contact" className="section-padding bg-slate-900/30">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6 transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm text-primary-300">Let's Connect</span>
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
            Have a project in mind? Let's discuss how I can help bring your ideas to life
          </p>

          <div
            className={`w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6 transition-all duration-700 delay-300 ${
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
                    className="flex items-start space-x-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-primary-500/50 transition-all duration-300"
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
                    className="w-14 h-14 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300 hover:scale-110"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-6 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-xl">
              <h4 className="text-xl font-semibold mb-2 text-slate-200">Ready to Start?</h4>
              <p className="text-slate-400 mb-4">
                I'm currently available for freelance work and new project opportunities.
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
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="John Doe"
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
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-primary-500 transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="Web Development">💻 Web Development Project</option>
                  <option value="Mobile App Development">📱 Mobile App Development</option>
                  <option value="UI/UX Design">🎨 UI/UX Design Services</option>
                  <option value="Full-Stack Development">⚡ Full-Stack Development</option>
                  <option value="Backend Development">🔧 Backend Development</option>
                  <option value="Consultation">💡 Technical Consultation</option>
                  <option value="Maintenance & Support">🛠️ Maintenance & Support</option>
                  <option value="General Inquiry">📧 General Inquiry</option>
                  <option value="Other">🔖 Other</option>
                </select>
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
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
                  <CheckCircle size={20} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
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
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
