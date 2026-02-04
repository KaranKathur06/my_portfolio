"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: profile.links.github, label: "GitHub" },
    { icon: Linkedin, href: profile.links.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  ];

  const footerLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container-custom px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-xl">
            <div className="text-2xl font-bold">
              <span className="text-gradient">{profile.name}</span>
            </div>
            <div className="mt-3 text-slate-300 font-semibold">
              {profile.headline}
            </div>
            <div className="mt-4 text-sm text-slate-500 space-y-1">
              <div>{profile.location}</div>
              <a
                href={`mailto:${profile.email}`}
                className="inline-block hover:text-primary-300 transition-colors"
              >
                {profile.email}
              </a>
            </div>
          </div>

          <div className="md:text-right">
            <div className="flex md:justify-end gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full surface surface-hover flex items-center justify-center text-slate-400 hover:text-primary-300 transition-all duration-300 hover:scale-[1.02]"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap md:justify-end gap-x-5 gap-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-primary-300 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="text-xs text-slate-500">
            © {currentYear} {profile.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
