import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import {
  ChevronRight,
  AlertTriangle,
  Calendar,
  Users,
  Activity,
} from "lucide-react";

const StatCard = ({ title, value, subtext, colorClass, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32 transition-all ${onClick ? "cursor-pointer hover:border-brand-gold group" : ""}`}
  >
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-brand-gold transition-colors">
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
            value="142"
            subtext="+4 this month"
            colorClass="text-emerald-500"
          />
          <StatCard title="Deployed" value="98" subtext="Utilization: 69%" />
          <StatCard
            title="Available"
            value="31"
            subtext="Ready to assign"
            colorClass="text-blue-500"
          />
          <StatCard
            title="Pending Leaves"
            value="3"
            subtext="Review Now →"
            colorClass="text-amber-500"
            onClick={() => navigate("/hr-leave-mgmt")}
          />
        </div>

        {/* 2. ALERT BANNERS */}
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-100 p-3 px-5 rounded-xl flex items-center justify-between text-[12px] shadow-sm">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="font-bold">2 critical document issues:</span>
              <span className="text-red-600/80 font-medium">
                Carlos Fernandez (Visa: Expired), Bibek Thapa (Visa: Expiring)
              </span>
            </div>
            <button
              onClick={() => navigate("/hr-documents")}
              className="text-red-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              View <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-3 px-5 rounded-xl flex items-center justify-between text-[12px] shadow-sm">
            <div className="flex items-center gap-2 text-amber-700">
              <Calendar size={16} className="text-amber-500" />
              <span className="font-bold">3 leave requests</span>
              <span className="text-amber-600/80 font-medium">
                awaiting approval from the operations team.
              </span>
            </div>
            <button
              onClick={() => navigate("/hr-leave-mgmt")}
              className="text-amber-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Review <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* 3. ATTENDANCE & STATUS SECTION */}
        <div className="grid grid-cols-3 gap-6">
          {/* Attendance Today Card */}
          <div className="col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest mb-8">
              Attendance Today — April 10
            </h3>
            <div className="space-y-6">
              {[
                {
                  label: "Present",
                  val: 124,
                  color: "text-emerald-500",
                  perc: "87%",
                },
                { label: "Absent", val: 12, color: "text-red-500", perc: "8%" },
                {
                  label: "On Leave",
                  val: 6,
                  color: "text-amber-500",
                  perc: "5%",
                },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-slate-600">
                      {item.label}
                    </span>
                    <span className={`text-lg font-black ${item.color}`}>
                      {item.val}{" "}
                      <span className="text-[10px] text-slate-300 ml-1 font-bold">
                        ({item.perc})
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color.replace("text", "bg")}`}
                      style={{ width: item.perc }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worker Status Doughnut */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest mb-10 w-full text-left">
              Worker Status
            </h3>
            <div className="relative w-40 h-40">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-slate-50"
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-brand-gold"
                  strokeWidth="4"
                  strokeDasharray="69, 100"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-blue-400"
                  strokeWidth="4"
                  strokeDasharray="22, 100"
                  strokeDashoffset="-69"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-800">142</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Total
                </span>
              </div>
            </div>
            <div className="mt-10 w-full space-y-3">
              <StatusLegend dot="bg-brand-gold" label="Deployed" val="98" />
              <StatusLegend dot="bg-blue-400" label="Available" val="31" />
              <StatusLegend dot="bg-slate-200" label="Inactive" val="13" />
            </div>
          </div>
        </div>

        {/* 4. RECENT WORKERS & ACTIVITY */}
        <div className="grid grid-cols-3 gap-6 pb-10">
          <div className="col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center px-8 bg-slate-50/30">
              <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest">
                Recent Workers
              </h3>
              <button
                onClick={() => navigate("/hr-workers")}
                className="text-[10px] font-bold text-brand-gold uppercase border border-brand-gold/20 px-4 py-1.5 rounded-xl hover:bg-brand-gold hover:text-white transition-all cursor-pointer"
              >
                View All Workers
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Worker</th>
                  <th className="px-6 py-4">Position</th>
                  <th className="px-8 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[11px]">
                {[
                  {
                    name: "Mohammed Al Rashidi",
                    id: "LV005",
                    pos: "Electrician",
                    status: "Deployed",
                    color: "bg-emerald-50 text-emerald-600",
                  },
                  {
                    name: "Carlos Fernandez",
                    id: "LV004",
                    pos: "Foreman",
                    status: "On Leave",
                    color: "bg-amber-50 text-amber-600",
                  },
                  {
                    name: "Ahmed Hassan",
                    id: "LV009",
                    pos: "Mason",
                    status: "Available",
                    color: "bg-blue-50 text-blue-600",
                  },
                ].map((worker, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px]">
                        {worker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">
                          {worker.name}
                        </p>
                        <p className="text-slate-400 text-[9px] uppercase font-bold">
                          {worker.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-medium text-slate-500">
                      {worker.pos}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span
                        className={`${worker.color} px-3 py-1 rounded-full text-[10px] font-bold border border-current opacity-80`}
                      >
                        {worker.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest mb-8">
              Recent Activity
            </h3>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-50">
              {[
                {
                  text: "New leave request: Sanjay Patel",
                  time: "Today, 02:45 PM",
                  icon: <Calendar size={10} className="text-white" />,
                },
                {
                  text: "Ahmed Hassan deployed to Arjan",
                  time: "Today, 09:14 AM",
                  icon: <Users size={10} className="text-white" />,
                },
                {
                  text: "Visa updated: Mohammed Al Rashidi",
                  time: "Yesterday, 04:30 PM",
                  icon: <Activity size={10} className="text-white" />,
                },
              ].map((act, i) => (
                <div key={i} className="flex gap-5 relative">
                  <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center border-4 border-white z-10 shadow-sm">
                    {act.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-700 font-bold leading-tight">
                      {act.text}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">
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

// Sub-component for Legend
function StatusLegend({ dot, label, val }) {
  return (
    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
      <span className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${dot}`}></div> {label}
      </span>
      <span className="text-slate-700">{val}</span>
    </div>
  );
}
