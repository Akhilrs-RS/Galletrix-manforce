import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

const LeaveStat = ({ label, value, subtext, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
        {label}
      </p>
      <h4
        className={`text-4xl font-bold mt-2 ${colorClass || "text-slate-800"}`}
      >
        {value}
      </h4>
    </div>
    <p className="text-[10px] text-slate-400 font-medium">{subtext}</p>
  </div>
);

export default function WorkerLeaves() {
  return (
    <DashboardLayout role="worker">
      <div className="space-y-8">
        {/* Top Section: Stats & Progress */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <LeaveStat
              label="Annual Entitlement"
              value="30"
              subtext="days per year"
            />
            <LeaveStat
              label="Days Used"
              value="6"
              colorClass="text-brand-gold"
            />
            <LeaveStat
              label="Days Remaining"
              value="24"
              colorClass="text-emerald-600"
            />
          </div>

          <div className="px-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-gold h-full"
                style={{ width: "20%" }}
              ></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2">
              6 of 30 days used (20%)
            </p>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
              My Leave Requests
            </h3>
            <button className="bg-brand-gold text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-md hover:brightness-110 transition-all">
              + Apply for Leave
            </button>
          </div>
          <table className="w-full text-left text-[11px]">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Request ID</th>
                <th className="px-8 py-4">Type</th>
                <th className="px-8 py-4">From</th>
                <th className="px-8 py-4">To</th>
                <th className="px-8 py-4 text-center">Days</th>
                <th className="px-8 py-4">Reason</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 font-bold text-brand-gold">LV005</td>
                <td className="px-8 py-5">
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-[9px] font-bold">
                    Annual
                  </span>
                </td>
                <td className="px-8 py-5 font-mono text-slate-500">
                  2025-04-10
                </td>
                <td className="px-8 py-5 font-mono text-slate-500">
                  2025-04-15
                </td>
                <td className="px-8 py-5 text-center font-bold text-slate-800">
                  6
                </td>
                <td className="px-8 py-5 text-slate-500">Eid holidays</td>
                <td className="px-8 py-5 text-right">
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold">
                    Approved
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
