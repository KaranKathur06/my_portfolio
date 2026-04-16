"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { LayoutDashboard, Users, Shield } from "lucide-react";

const CrmSidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const adminKey = searchParams.get("key") || "";

  const navItems = [
    {
      label: "Dashboard",
      href: `/internal-admin-x9k7?key=${adminKey}`,
      icon: LayoutDashboard,
      active: pathname === "/internal-admin-x9k7",
    },
    {
      label: "Leads",
      href: `/internal-admin-x9k7/leads?key=${adminKey}`,
      icon: Users,
      active: pathname.startsWith("/internal-admin-x9k7/leads"),
    },
  ];

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
      <div className="p-4 border-t border-white/[0.06]">
        <div className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400">Secure Session</span>
          </div>
          <p className="text-[10px] text-slate-600 font-mono">
            Access: Token Auth
          </p>
        </div>
      </div>
    </aside>
  );
};

export default CrmSidebar;
