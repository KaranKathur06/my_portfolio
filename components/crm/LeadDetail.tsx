"use client";

import { useState } from "react";
import { Mail, Calendar, Clock, FileText, MessageSquare, Save, Check } from "lucide-react";

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

interface LeadDetailProps {
  lead: Lead;
  onUpdate: (updates: { status?: string; notes?: string }) => Promise<void>;
  adminKey: string;
}

const statusFlow = [
  { value: "new", label: "New", color: "bg-blue-500", textColor: "text-blue-300" },
  { value: "in_progress", label: "In Progress", color: "bg-amber-500", textColor: "text-amber-300" },
  { value: "converted", label: "Converted", color: "bg-emerald-500", textColor: "text-emerald-300" },
  { value: "closed", label: "Closed", color: "bg-slate-500", textColor: "text-slate-400" },
];

const LeadDetail = ({ lead, onUpdate, adminKey }: LeadDetailProps) => {
  const [notes, setNotes] = useState(lead.notes || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
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

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === lead.status) return;
    setUpdatingStatus(true);
    await onUpdate({ status: newStatus });
    setUpdatingStatus(false);
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    await onUpdate({ notes });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const currentStatusIndex = statusFlow.findIndex((s) => s.value === lead.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{lead.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Mail size={14} />
              <a href={`mailto:${lead.email}`} className="hover:text-primary-300 transition-colors">
                {lead.email}
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(lead.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {formatTime(lead.created_at)}
            </span>
          </div>
        </div>

        {/* ID Badge */}
        <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-slate-500">
          {lead.id.slice(0, 8)}...
        </div>
      </div>

      {/* Status Flow */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
          <FileText size={16} />
          Status
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          {statusFlow.map((status, index) => {
            const isActive = status.value === lead.status;
            const isPast = index < currentStatusIndex;

            return (
              <div key={status.value} className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={updatingStatus}
                  onClick={() => handleStatusChange(status.value)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border cursor-pointer disabled:opacity-50 ${
                    isActive
                      ? `${status.color}/20 ${status.textColor} border-current`
                      : isPast
                      ? "bg-white/[0.05] text-slate-400 border-white/[0.08]"
                      : "bg-white/[0.02] text-slate-500 border-white/[0.06] hover:bg-white/[0.05] hover:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
                    )}
                    {isPast && <Check size={14} className="text-slate-500" />}
                    {status.label}
                  </div>
                </button>

                {index < statusFlow.length - 1 && (
                  <div className={`w-6 h-px ${index < currentStatusIndex ? "bg-slate-600" : "bg-white/[0.06]"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Message */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h3 className="text-sm font-semibold text-slate-300 mb-1 flex items-center gap-2">
            <MessageSquare size={16} />
            Message
          </h3>
          {lead.subject && (
            <div className="text-xs text-primary-400 mb-4 font-medium">
              Subject: {lead.subject}
            </div>
          )}
          <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-white/[0.02] rounded-xl p-4 border border-white/[0.04] max-h-80 overflow-y-auto">
            {lead.message}
          </div>
        </div>

        {/* Notes */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <FileText size={16} />
            Notes
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this lead..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-primary-500/50 transition-colors resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-[11px] text-slate-600">
              Last updated: {formatDate(lead.updated_at)} at {formatTime(lead.updated_at)}
            </span>
            <button
              type="button"
              onClick={handleSaveNotes}
              disabled={saving || notes === lead.notes}
              className="px-4 py-2 rounded-lg bg-primary-500/15 text-primary-300 text-sm font-medium border border-primary-500/25 hover:bg-primary-500/25 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saved ? (
                <>
                  <Check size={14} />
                  Saved
                </>
              ) : saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-primary-300 border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Save Notes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
