import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Check, Loader2, Download } from "lucide-react";

export default function Reports({ role = "admin" }) {
  // --- 1. STATE MANAGEMENT ---
  const [notification, setNotification] = useState(null);

  const reportCategories = [
    {
      title: "Workforce Utilization",
      desc: "Worker deployment rate and bench strength",
      icon: "👷",
    },
    {
      title: "Payroll Summary",
      desc: "Monthly breakdown by category",
      icon: "💰",
    },
    {
      title: "Client Revenue",
      desc: "Revenue per client with YoY comparison",
      icon: "📈",
    },
    {
      title: "Attendance Report",
      desc: "Daily, weekly, monthly analytics",
      icon: "🕒",
    },
    {
      title: "Leave Analysis",
      desc: "Leave patterns, peak periods, balances",
      icon: "📅",
    },
    {
      title: "Document Expiry",
      desc: "Upcoming visa and ID expiry alerts",
      icon: "📁",
    },
  ];

  // --- 2. ACTIONS ---
  const handleExport = (title) => {
    setNotification(`Generating ${title}...`);

    // Simulate processing then success
    setTimeout(() => {
      setNotification(`${title} exported successfully`);
      setTimeout(() => setNotification(null), 3000);
    }, 1500);
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6 relative">
        {/* --- GLOBAL NOTIFICATION --- */}
        {notification && (
          <div className="fixed top-24 right-12 z-50 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-[#1e293b] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
              {notification.includes("Generating") ? (
                <Loader2 size={18} className="animate-spin text-blue-400" />
              ) : (
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Check size={18} className="text-emerald-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-bold">
                  {notification.includes("Generating")
                    ? "Processing..."
                    : "Export Complete"}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {notification}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800">Reports</h2>
          <button
            onClick={() => handleExport("Full System Report")}
            className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg transition-all cursor-pointer"
          >
            Export Report
          </button>
        </div>

        {/* --- REPORTS GRID (Matched to Screenshot) --- */}
        <div className="grid grid-cols-3 gap-8">
          {reportCategories.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                {cat.icon}
              </div>

              <h3 className="text-base font-bold text-slate-800 mb-2">
                {cat.title}
              </h3>

              <p className="text-xs text-slate-400 font-medium leading-relaxed mb-8 max-w-[200px]">
                {cat.desc}
              </p>

              <button
                onClick={() => handleExport(cat.title)}
                className="text-[10px] font-bold text-slate-500 border border-slate-200 px-6 py-2 rounded-xl hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all cursor-pointer"
              >
                Export PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
