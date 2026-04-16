"use client";

import { useEffect, useState } from "react";
import StatsGrid from "@/components/crm/StatsGrid";
import LeadsTable from "@/components/crm/LeadsTable";

interface LeadStats {
  total: number;
  new: number;
  in_progress: number;
  converted: number;
  closed: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function CrmDashboard() {
  const [stats, setStats] = useState<LeadStats>({
    total: 0, new: 0, in_progress: 0, converted: 0, closed: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const adminKey = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("key") || ""
    : "";

  useEffect(() => {
    if (!adminKey) return;
    fetchData();
  }, [adminKey]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/leads", {
        headers: { "x-admin-key": adminKey },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      const leads: Lead[] = data.leads || [];

      // Calculate stats from leads
      const calculatedStats: LeadStats = {
        total: leads.length,
        new: leads.filter((l: Lead) => l.status === "new").length,
        in_progress: leads.filter((l: Lead) => l.status === "in_progress").length,
        converted: leads.filter((l: Lead) => l.status === "converted").length,
        closed: leads.filter((l: Lead) => l.status === "closed").length,
      };

      setStats(calculatedStats);
      setRecentLeads(leads.slice(0, 5));
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-slate-400 mt-1">Loading...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Lead management overview
        </p>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Recent Leads */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-200">Recent Leads</h2>
          <a
            href={`/internal-admin-x9k7/leads?key=${adminKey}`}
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            View All →
          </a>
        </div>
        <LeadsTable leads={recentLeads} adminKey={adminKey} compact />
      </div>
    </div>
  );
}
