import React from 'react';

export const DashboardCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  badge = null,
  colorScheme = "emerald" 
}) => {
  const schemes = {
    emerald: {
      bg: "bg-emerald-50 text-emerald-700",
      border: "border-emerald-200/80",
      valColor: "text-emerald-950"
    },
    amber: {
      bg: "bg-amber-50 text-amber-700",
      border: "border-amber-200/80",
      valColor: "text-amber-950"
    },
    sky: {
      bg: "bg-sky-50 text-sky-700",
      border: "border-sky-200/80",
      valColor: "text-sky-950"
    },
    purple: {
      bg: "bg-purple-50 text-purple-700",
      border: "border-purple-200/80",
      valColor: "text-purple-950"
    }
  }[colorScheme] || schemes.emerald;

  return (
    <div className={`p-6 rounded-3xl bg-white border ${schemes.border} shadow-soft flex flex-col justify-between`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-2xl ${schemes.bg} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-1">
        <div className={`text-2xl sm:text-3xl font-black ${schemes.valColor} tracking-tight`}>
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {badge && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">{badge.label}</span>
          <span className="font-bold text-agri-700">{badge.val}</span>
        </div>
      )}
    </div>
  );
};
