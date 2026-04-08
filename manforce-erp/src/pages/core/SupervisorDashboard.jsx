import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

const StatCard = ({ title, value, colorClass }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {title}
    </p>
    <h4 className={`text-4xl font-bold mt-1 ${colorClass || "text-slate-800"}`}>
      {value}
    </h4>
  </div>
);

export default function SupervisorDashboard() {
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
          <StatCard title="Total Workers" value="6" />
          <StatCard
            title="Present Today"
            value="4"
            colorClass="text-emerald-600"
          />
          <StatCard title="Absent Today" value="1" colorClass="text-red-700" />
        </div>

        {/* TABLES SECTION */}
        <div className="grid grid-cols-2 gap-8">
          {/* Deployed Workers */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                Deployed Workers
              </h3>
              <button className="text-[10px] font-bold text-slate-500 uppercase border border-slate-200 px-3 py-1 rounded hover:bg-slate-50">
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
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px]">
                        {w.id}
                      </div>
                      <span className="font-bold text-slate-700">{w.name}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {w.site}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded text-[10px] font-bold">
                        Deployed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance Preview */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                Today's Attendance
              </h3>
              <button className="text-[10px] font-bold text-slate-500 uppercase border border-slate-200 px-3 py-1 rounded hover:bg-slate-50">
                Mark →
              </button>
            </div>
            <table className="w-full text-left text-[11px]">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">In</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {attendancePreview.map((a, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">
                      {a.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500">
                      {a.time}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-bold 
                        ${
                          a.status === "Present"
                            ? "bg-emerald-50 text-emerald-600"
                            : a.status === "Absent"
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-600"
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
