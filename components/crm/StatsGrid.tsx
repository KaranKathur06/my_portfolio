"use client";

import { Users, UserPlus, ArrowRightLeft, CheckCircle2, XCircle } from "lucide-react";

interface StatsGridProps {
  stats: {
    total: number;
    new: number;
    in_progress: number;
    converted: number;
    closed: number;
  };
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  const cards = [
    {
      label: "Total Leads",
      value: stats.total,
      icon: Users,
      color: "text-primary-400",
      bgColor: "bg-primary-500/10",
      borderColor: "border-primary-500/20",
    },
    {
      label: "New",
      value: stats.new,
      icon: UserPlus,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      label: "In Progress",
      value: stats.in_progress,
      icon: ArrowRightLeft,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      label: "Converted",
      value: stats.converted,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      label: "Closed",
      value: stats.closed,
      icon: XCircle,
      color: "text-slate-400",
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`p-5 rounded-2xl bg-white/[0.02] border ${card.borderColor} hover:bg-white/[0.04] transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center`}>
              <card.icon size={18} className={card.color} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 mb-1">
            {card.value}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
