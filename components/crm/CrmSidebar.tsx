"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Shield, LogOut } from "lucide-react";

const CrmSidebar = () => {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/internal-admin-x9k7",
      icon: LayoutDashboard,
      active: pathname === "/internal-admin-x9k7",
    },
    {
      label: "Leads",
      href: "/internal-admin-x9k7/leads",
      icon: Users,
      active: pathname.startsWith("/internal-admin-x9k7/leads"),
    },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } catch {
      // Logout anyway
    }
    window.location.href = "/";
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#080c16] border-r border-white/[0.06] flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-500/15 flex items-center justify-center">
            <Shield size={18} className="text-primary-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100">Lead CRM</h1>
            <p className="text-[10px] text-slate-500 font-mono">internal-admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              item.active
                ? "bg-primary-500/10 text-primary-300 border border-primary-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent"
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.06] space-y-3">
        <div className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400">Secure Session</span>
          </div>
          <p className="text-[10px] text-slate-600 font-mono">
            httpOnly · JWT · 24h expiry
          </p>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all duration-200 disabled:opacity-50"
        >
          <LogOut size={16} />
          <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
};

export default CrmSidebar;
