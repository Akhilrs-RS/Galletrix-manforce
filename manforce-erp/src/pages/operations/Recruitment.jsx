import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { ChevronRight } from "lucide-react";

// 1. Accept the role prop from the Router (defaults to admin)
export default function Recruitment({ role = "admin" }) {
  const pipeline = [
    {
      stage: "Applied",
      color: "slate",
      count: 1,
      items: [
        {
          name: "Deepak Chaudhary",
          role: "Helper",
          nat: "Nepalese",
          exp: "1 yr",
          date: "2025-06-07",
        },
      ],
    },
    {
      stage: "Screening",
      color: "blue",
      count: 2,
      items: [
        {
          name: "Pradeep Singh",
          role: "Welder",
          nat: "Indian",
          exp: "5 yrs",
          date: "2025-06-05",
        },
        {
          name: "Samuel Okafor",
          role: "Mason",
          nat: "Nigerian",
          exp: "6 yrs",
          date: "2025-06-08",
        },
      ],
    },
    {
      stage: "Interview",
      color: "amber",
      count: 2,
      items: [
        {
          name: "Jomar Reyes",
          role: "Driver",
          nat: "Filipino",
          exp: "3 yrs",
          date: "2025-06-03",
        },
        {
          name: "Rizwan Malik",
          role: "Plumber",
          nat: "Pakistani",
          exp: "4 yrs",
          date: "2025-06-01",
        },
      ],
    },
    {
      stage: "Offer",
      color: "brand-gold",
      count: 1,
      items: [
        {
          name: "Mohammed Iqbal",
          role: "Electrician",
          nat: "Pakistani",
          exp: "8 yrs",
          date: "2025-05-28",
        },
      ],
    },
    {
      stage: "Hired",
      color: "emerald",
      count: 1,
      items: [
        {
          name: "Ali Karimi",
          role: "Foreman",
          nat: "Iranian",
          exp: "12 yrs",
          date: "2025-05-20",
          hired: true,
        },
      ],
    },
  ];

  return (
    // 2. Pass the dynamic role prop here
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              TOTAL CANDIDATES
            </p>
            <h4 className="text-2xl font-bold mt-1 text-slate-800 uppercase">
              7
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              IN PROGRESS
            </p>
            <h4 className="text-2xl font-bold mt-1 text-slate-800 uppercase">
              5
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              HIRED THIS MONTH
            </p>
            <h4 className="text-2xl font-bold mt-1 text-slate-800 uppercase">
              1
            </h4>
          </div>
        </div>

        {/* Kanban Pipeline View */}
        <div className="grid grid-cols-5 gap-4">
          {pipeline.map((p, i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${p.color === "brand-gold" ? "bg-[#c5a447]" : `bg-${p.color}-500`}`}
                  ></div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">
                    {p.stage}
                  </span>
                </div>
                <span className="bg-slate-200/50 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {p.count}
                </span>
              </div>
              <div className="space-y-3">
                {p.items.map((c, j) => (
                  <div
                    key={j}
                    className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3 transition-transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white text-[10px] font-bold">
                        {c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-800 leading-tight">
                          {c.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {c.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="bg-slate-50 text-[9px] px-2 py-0.5 rounded border border-slate-100 font-bold text-slate-500">
                        🌍 {c.nat}
                      </span>
                      <span className="bg-slate-50 text-[9px] px-2 py-0.5 rounded border border-slate-100 font-bold text-slate-500">
                        🏗️ {c.exp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <span className="text-[9px] text-slate-400 font-medium">
                        {c.date}
                      </span>
                      {c.hired ? (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          ✓ Hired
                        </span>
                      ) : (
                        <button className="bg-brand-gold/10 text-brand-gold p-1 rounded-md hover:bg-brand-gold hover:text-white transition-all cursor-pointer">
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
