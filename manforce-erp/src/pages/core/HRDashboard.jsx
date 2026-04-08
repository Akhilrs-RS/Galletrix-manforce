import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { ChevronRight, AlertTriangle, Calendar, Clock } from "lucide-react";

const StatCard = ({ title, value, subtext, colorClass }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32 transition-hover hover:shadow-md">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-3xl font-bold text-slate-800 mt-1">{value}</h4>
    </div>
    <p className={`text-[10px] font-bold ${colorClass || "text-slate-400"}`}>
      {subtext}
    </p>
  </div>
);

export default function HRDashboard({ role = "hr" }) {
  const navigate = useNavigate();

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* 1. TOP STATS GRID */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="Total Workers"
            value="6"
            subtext="+4 this month"
            colorClass="text-emerald-500"
          />
          <StatCard title="Deployed" value="3" subtext="Utilization: 50%" />
          <StatCard
            title="Available"
            value="2"
            subtext="Ready to assign"
            colorClass="text-blue-500"
          />
          <StatCard
            title="Pending Leaves"
            value="3"
            subtext="Awaiting review"
            colorClass="text-amber-500"
          />
        </div>

        {/* 2. ALERT BANNERS */}
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-center justify-between text-[12px] shadow-sm">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="font-bold">2 documents</span>
              <span className="text-red-600/80 font-medium">
                expiring or expired.
              </span>
              <button
                onClick={() => navigate("/hr-documents")}
                className="text-red-700 font-bold hover:underline flex items-center gap-1 ml-1"
              >
                View <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex items-center justify-between text-[12px] shadow-sm">
            <div className="flex items-center gap-2 text-amber-700">
              <Calendar size={16} className="text-amber-500" />
              <span className="font-bold">3 leave requests</span>
              <span className="text-amber-600/80 font-medium">
                awaiting approval.
              </span>
              <button
                onClick={() => navigate("/leave-mgmt")}
                className="text-amber-700 font-bold hover:underline flex items-center gap-1 ml-1"
              >
                Review <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. MIDDLE SECTION: ATTENDANCE & STATUS */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-[13px] font-bold text-slate-700 uppercase tracking-widest mb-6">
              Attendance Today
            </h3>
            <div className="space-y-5">
              {[
                { label: "Present", val: 4, color: "text-emerald-500" },
                { label: "Absent", val: 1, color: "text-red-500" },
                { label: "On Leave", val: 1, color: "text-amber-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-slate-50 pb-2"
                >
                  <span className="text-sm font-medium text-slate-500">
                    {item.label}
                  </span>
                  <span className={`text-xl font-bold ${item.color}`}>
                    {item.val}
                  </span>
                </div>
              ))}
              <div className="pt-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase">
                  <span>Attendance Rate</span>
                  <span>67%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-gold h-full"
                    style={{ width: "67%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-[13px] font-bold text-slate-700 mb-8 uppercase tracking-widest">
              Worker Status
            </h3>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-slate-100"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-brand-gold"
                    strokeWidth="3.5"
                    strokeDasharray="50, 100"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-emerald-500"
                    strokeWidth="3.5"
                    strokeDasharray="33, 100"
                    strokeDashoffset="-50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">50%</span>
                </div>
              </div>
              <div className="mt-8 w-full space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-gold"></div>{" "}
                    Deployed (3)
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>{" "}
                    Available (2)
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-800"></div>{" "}
                    On Leave (1)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM SECTION: RECENT WORKERS & ACTIVITY */}
        <div className="grid grid-cols-3 gap-6 pb-10">
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                Recent Workers
              </h3>
              <button
                onClick={() => navigate("/hr-workers")}
                className="text-[10px] font-bold text-brand-gold uppercase border border-brand-gold/20 px-3 py-1 rounded hover:bg-brand-gold hover:text-white transition-all"
              >
                View all
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[11px]">
                {[
                  {
                    name: "Mohammed Al Rashidi",
                    id: "W001",
                    cat: "Electrician",
                    status: "Deployed",
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    name: "Ramesh Kumar",
                    id: "W002",
                    cat: "Plumber",
                    status: "Available",
                    color: "bg-emerald-50 text-emerald-600",
                  },
                ].map((worker, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px]">
                        {worker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">
                          {worker.name}
                        </p>
                        <p className="text-slate-400 text-[9px]">{worker.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-500">
                      {worker.cat}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`${worker.color} px-2.5 py-1 rounded text-[10px] font-bold`}
                      >
                        {worker.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest mb-6">
              Recent Activity
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {[
                {
                  text: "Ahmed Hassan deployed to DAMAC — Arjan",
                  time: "Today, 09:14 AM",
                },
                {
                  text: "Leave request from Bibek Thapa — Emergency",
                  time: "Yesterday, 06:00 PM",
                },
                {
                  text: "Visa expiry alert: Carlos Fernandez (EXPIRED)",
                  time: "Yesterday, 08:30 AM",
                },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center border-4 border-white z-10 shadow-sm"></div>
                  <div>
                    <p className="text-xs text-slate-700 font-bold">
                      {act.text}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
