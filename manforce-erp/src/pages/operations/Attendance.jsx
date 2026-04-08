import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Calendar } from "lucide-react";

// 1. Accept the role prop (defaults to admin if not provided)
export default function Attendance({ role = "admin" }) {
  const attendanceData = [
    {
      name: "Mohammed Al Rashidi",
      id: "W-001",
      in: "08:15",
      out: "17:30",
      ot: "1.5",
      status: "Present",
    },
    {
      name: "Ramesh Kumar",
      id: "W-002",
      in: "08:00",
      out: "17:45",
      ot: "2.0",
      status: "Present",
    },
    {
      name: "Carlos Fernandez",
      id: "W-003",
      in: "—",
      out: "—",
      ot: "—",
      status: "Absent",
    },
    {
      name: "Bibek Thapa",
      id: "W-004",
      in: "08:30",
      out: "16:00",
      ot: "—",
      status: "On Leave",
    },
    {
      name: "Ahmed Hassan",
      id: "W-005",
      in: "08:10",
      out: "17:20",
      ot: "0.5",
      status: "Present",
    },
    {
      name: "Juan Martinez",
      id: "W-006",
      in: "08:25",
      out: "17:40",
      ot: "0.2",
      status: "Present",
    },
  ];

  return (
    // 2. Pass the dynamic role prop here
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Summary Stat Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Present Today
            </p>
            <h4 className="text-2xl font-bold mt-1 text-emerald-600 uppercase">
              4
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-red-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Absent
            </p>
            <h4 className="text-2xl font-bold mt-1 text-red-600 uppercase">
              1
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-amber-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              On Leave
            </p>
            <h4 className="text-2xl font-bold mt-1 text-amber-600 uppercase">
              1
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-blue-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total OT Hours
            </p>
            <h4 className="text-2xl font-bold mt-1 text-blue-600 uppercase">
              4.2
            </h4>
          </div>
        </div>

        {/* Attendance Data Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
              Attendance — June 10, 2025
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                <Calendar size={14} /> 10/06/2025
              </button>
              {/* Only show Mark Today button for Admin or Supervisors if needed */}
              <button className="px-3 py-1.5 text-[11px] font-bold text-white bg-brand-gold rounded-lg hover:bg-brand-gold/90 transition-all cursor-pointer">
                Mark Today
              </button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">In Time</th>
                <th className="px-6 py-4">Out Time</th>
                <th className="px-6 py-4">OT Hours</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {attendanceData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-700">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500">
                    {row.in}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500">
                    {row.out}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-600">
                    {row.ot}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        row.status === "Present"
                          ? "bg-emerald-50 text-emerald-600"
                          : row.status === "Absent"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
