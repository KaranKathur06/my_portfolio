"use client";

import { useEffect, useState } from "react";
import LeadsTable from "@/components/crm/LeadsTable";

interface Lead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const adminKey = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("key") || ""
    : "";

  useEffect(() => {
    if (!adminKey) return;
    fetchLeads();
  }, [adminKey, statusFilter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (searchQuery) params.set("search", searchQuery);

      const res = await fetch(`/api/leads?${params.toString()}`, {
        headers: { "x-admin-key": adminKey },
      });

      if (!res.ok) throw new Error("Failed to fetch leads");

      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const statuses = [
    { value: "", label: "All Leads" },
    { value: "new", label: "New" },
    { value: "in_progress", label: "In Progress" },
    { value: "converted", label: "Converted" },
    { value: "closed", label: "Closed" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Leads</h1>
        <p className="text-slate-400 mt-1">
          {leads.length} total lead{leads.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          {statuses.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStatusFilter(s.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                statusFilter === s.value
                  ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
                  : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:border-white/10 hover:text-slate-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 min-w-[250px] max-w-md ml-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or message..."
              className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-primary-500/50 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary-400 transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
          ))}
        </div>
      ) : (
        <LeadsTable leads={leads} adminKey={adminKey} />
      )}
    </div>
  );
}
