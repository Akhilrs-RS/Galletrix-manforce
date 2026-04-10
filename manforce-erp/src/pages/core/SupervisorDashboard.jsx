import React from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation
import DashboardLayout from "../../components/DashboardLayout";

const StatCard = ({ title, value, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {title}
    </p>
    <h4 className={`text-4xl font-bold mt-1 ${colorClass || "text-slate-800"}`}>
      {value}
    </h4>
  </div>
);

export default function SupervisorDashboard() {
  const navigate = useNavigate(); // Initialize navigation

  const deployedWorkers = [
    {
      name: "Mohammed Al Rashidi",
      id: "MA",
      site: "Downtown Dubai",
      status: "Deployed",
    },
    {
      name: "Carlos Fernandez",
      id: "CF",
      site: "Business Bay",
      status: "Deployed",
    },
    { name: "Ahmed Hassan", id: "AH", site: "Arjan", status: "Deployed" },
  ];

  const attendancePreview = [
    { name: "Mohammed Al Rashidi", time: "07:02", status: "Present" },
    { name: "Carlos Fernandez", time: "06:58", status: "Present" },
    { name: "Ahmed Hassan", time: "07:30", status: "Present" },
    { name: "Ramesh Kumar", time: "—", status: "Absent" },
    { name: "Sanjay Patel", time: "—", status: "Leave" },
    { name: "Bibek Thapa", time: "07:15", status: "Present" },
  ];

  return (
    <DashboardLayout role="supervisor">
      <div className="space-y-8">
        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard title="Total Workers" value="142" />
          <StatCard
            title="Present Today"
            value="124"
            colorClass="text-emerald-600"
          />
          <StatCard title="Absent Today" value="12" colorClass="text-red-700" />
        </div>

        {/* TABLES SECTION */}
        <div className="grid grid-cols-2 gap-8">
          {/* --- DEPLOYED WORKERS CARD --- */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                Deployed Workers
              </h3>
              <button
                onClick={() => navigate("/sv-deployment")} // FIXED ROUTING
                className="text-[10px] font-bold text-brand-gold uppercase border border-brand-gold/20 px-4 py-1.5 rounded-xl hover:bg-brand-gold hover:text-white transition-all cursor-pointer"
              >
                View →
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">Site</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[11px]">
                {deployedWorkers.map((w, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px]">
                        {w.id}
                      </div>
                      <span className="font-bold text-slate-700">{w.name}</span>
                    </td>
                    <td className="px-6 py-5 text-slate-500 font-medium">
                      {w.site}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        Deployed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- TODAY'S ATTENDANCE CARD --- */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                Today's Attendance
              </h3>
              <button
                onClick={() => navigate("/sv-attendance")} // FIXED ROUTING
                className="text-[10px] font-bold text-emerald-600 uppercase border border-emerald-200 px-4 py-1.5 rounded-xl hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
              >
                Mark →
              </button>
            </div>
            <table className="w-full text-left text-[11px]">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">In Time</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {attendancePreview.map((a, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-700">
                      {a.name}
                    </td>
                    <td className="px-6 py-5 font-mono text-slate-500">
                      {a.time}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border 
                        ${
                          a.status === "Present"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : a.status === "Absent"
                              ? "bg-red-50 text-red-700 border-red-100"
                              : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
