import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Users, Wallet, CalendarCheck, FileStack } from "lucide-react";

// 1. Accept the role prop (defaults to admin for safety)
export default function Reports({ role = "admin" }) {
  const reportCategories = [
    {
      title: "Manpower Utilisation",
      desc: "Detailed breakdown of worker deployment vs availability",
      icon: Users,
      color: "blue",
    },
    {
      title: "Financial Summary",
      desc: "Invoiced vs Collected reports for current fiscal year",
      icon: Wallet,
      color: "emerald",
    },
    {
      title: "Attendance Analytics",
      desc: "Overtime trends and absent patterns per site",
      icon: CalendarCheck,
      color: "amber",
    },
    {
      title: "Compliance Audit",
      desc: "Document expiry forecasts and legal status checks",
      icon: FileStack,
      color: "red",
    },
  ];

  return (
    // 2. Pass the dynamic role prop to the layout
    <DashboardLayout role={role}>
      <div>
        <div className="grid grid-cols-2 gap-6 pb-12">
          {reportCategories.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm group hover:border-brand-gold hover:shadow-md transition-all cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                  cat.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : cat.color === "emerald"
                      ? "bg-emerald-50 text-emerald-600"
                      : cat.color === "amber"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-red-50 text-red-600"
                } group-hover:bg-brand-gold group-hover:text-white`}
              >
                <cat.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {cat.title}
              </h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">
                {cat.desc}
              </p>
              <div className="flex gap-3">
                <button className="text-[11px] font-bold uppercase tracking-wider text-brand-gold border border-brand-gold/20 px-4 py-2 rounded-lg hover:bg-brand-gold hover:text-white transition-all cursor-pointer">
                  Generate PDF
                </button>
                <button className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                  Excel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
