"use client";

import { Mail, Calendar, ChevronRight } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

interface LeadsTableProps {
  leads: Lead[];
  adminKey: string;
  compact?: boolean;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  new: {
    label: "New",
    className: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  },
  converted: {
    label: "Converted",
    className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  },
  closed: {
    label: "Closed",
    className: "bg-slate-500/15 text-slate-400 border-slate-500/25",
  },
};

const LeadsTable = ({ leads, adminKey, compact = false }: LeadsTableProps) => {
  if (leads.length === 0) {
    return (
      <div className="p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
        <div className="text-4xl mb-3">📭</div>
        <h3 className="text-lg font-semibold text-slate-300 mb-1">No leads yet</h3>
        <p className="text-sm text-slate-500">
          Leads from your portfolio contact form will appear here.
        </p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.06] text-xs font-medium text-slate-500 uppercase tracking-wider">
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Email</div>
        {!compact && <div className="col-span-2">Subject</div>}
        <div className={compact ? "col-span-2" : "col-span-1"}>Status</div>
        <div className={compact ? "col-span-3" : "col-span-2"}>Date</div>
        <div className="col-span-1"></div>
      </div>

      {/* Table Body */}
      {leads.map((lead) => {
        const status = statusConfig[lead.status] || statusConfig.new;

        return (
          <a
            key={lead.id}
            href={`/internal-admin-x9k7/leads/${lead.id}?key=${adminKey}`}
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors cursor-pointer group"
          >
            {/* Name */}
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 text-sm font-semibold flex-shrink-0">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-200 truncate group-hover:text-primary-300 transition-colors">
                {lead.name}
              </span>
            </div>

            {/* Email */}
            <div className="col-span-3 flex items-center gap-2 text-sm text-slate-400 truncate">
              <Mail size={14} className="flex-shrink-0 text-slate-600" />
              <span className="truncate">{lead.email}</span>
            </div>

            {/* Subject */}
            {!compact && (
              <div className="col-span-2 flex items-center text-sm text-slate-400 truncate">
                {lead.subject || "—"}
              </div>
            )}

            {/* Status */}
            <div className={compact ? "col-span-2" : "col-span-1"}>
              <div className="flex items-center">
                <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-medium border ${status.className}`}>
                  {status.label}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className={`${compact ? "col-span-3" : "col-span-2"} flex items-center gap-2 text-sm text-slate-500`}>
              <Calendar size={14} className="flex-shrink-0 text-slate-600" />
              <span>{formatDate(lead.created_at)}</span>
              {!compact && (
                <span className="text-slate-600">{formatTime(lead.created_at)}</span>
              )}
            </div>

            {/* Arrow */}
            <div className="col-span-1 flex items-center justify-end">
              <ChevronRight size={16} className="text-slate-600 group-hover:text-primary-400 transition-colors" />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default LeadsTable;
