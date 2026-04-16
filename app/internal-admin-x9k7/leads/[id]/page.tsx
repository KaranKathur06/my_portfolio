"use client";

import { useEffect, useState } from "react";
import LeadDetail from "@/components/crm/LeadDetail";

interface Lead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLead();
  }, [params.id]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/leads/${params.id}`, {
        credentials: "same-origin",
      });

      if (!res.ok) {
        if (res.status === 404) {
          setError("Lead not found");
        } else {
          setError("Failed to load lead");
        }
        return;
      }

      const data = await res.json();
      setLead(data.lead);
    } catch (err) {
      setError("Failed to load lead");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updates: { status?: string; notes?: string }) => {
    if (!lead) return;

    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      setLead(data.lead);
    } catch (err) {
      console.error("Failed to update lead:", err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 rounded bg-white/[0.03] animate-pulse" />
        <div className="h-64 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-slate-200 mb-2">{error || "Lead not found"}</h2>
          <a
            href="/internal-admin-x9k7/leads"
            className="text-primary-400 hover:text-primary-300 text-sm"
          >
            ← Back to Leads
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <a
        href="/internal-admin-x9k7/leads"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Leads
      </a>

      <LeadDetail lead={lead} onUpdate={handleUpdate} />
    </div>
  );
}
