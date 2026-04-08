import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

// 1. Accept the role prop (defaults to admin)
export default function LeaveMgmt({ role = "admin" }) {
  const requests = [
    {
      id: "RK",
      name: "Ramesh Kumar",
      cat: "LV001",
      type: "Annual",
      from: "2025-06-12",
      to: "2025-06-15",
      days: 4,
      reason: "Family visit to India",
      status: "Pending",
    },
    {
      id: "SP",
      name: "Sanjay Patel",
      cat: "LV002",
      type: "Sick",
      from: "2025-06-10",
      to: "2025-06-11",
      days: 2,
      reason: "Medical appointment",
      status: "Pending",
    },
    {
      id: "BT",
      name: "Bibek Thapa",
      cat: "LV003",
      type: "Emergency",
      from: "2025-06-20",
      to: "2025-06-22",
      days: 3,
      reason: "Family emergency",
      status: "Pending",
    },
    {
      id: "CF",
      name: "Carlos Fernandez",
      cat: "LV004",
      type: "Annual",
      from: "2025-05-01",
      to: "2025-05-07",
      days: 7,
      reason: "Annual vacation",
      status: "Approved",
    },
    {
      id: "MA",
      name: "Mohammed Al Rashidi",
      cat: "LV005",
      type: "Annual",
      from: "2025-04-10",
      to: "2025-04-15",
      days: 6,
      reason: "Eid holidays",
      status: "Approved",
    },
  ];

  return (
    // 2. Pass the dynamic role prop here
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Summary Stat Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border-t-4 border-amber-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              PENDING REQUESTS
            </p>
            <h4 className="text-2xl font-bold mt-1 text-amber-600 uppercase">
              3
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              APPROVED
            </p>
            <h4 className="text-2xl font-bold mt-1 text-emerald-600 uppercase">
              2
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-blue-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              ON LEAVE TODAY
            </p>
            <h4 className="text-2xl font-bold mt-1 text-blue-600 uppercase">
              1
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              TOTAL DAYS TAKEN
            </p>
            <h4 className="text-2xl font-bold mt-1 text-brand-gold uppercase">
              13
            </h4>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-8 border-b border-slate-200 px-2">
          <button className="pb-3 text-xs font-bold text-brand-gold border-b-2 border-brand-gold uppercase tracking-widest">
            Leave Requests
          </button>
          <button className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors cursor-pointer">
            Balance & Entitlements
          </button>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4">To</th>
                <th className="px-6 py-4">Days</th>
                <th className="px-6 py-4 text-center">Reason</th>
                <th className="px-6 py-4 text-right">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {requests.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px]">
                      {r.id}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{r.name}</p>
                      <p className="text-[9px] text-slate-400 font-medium">
                        {r.cat}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-tighter ${
                        r.type === "Annual"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : r.type === "Sick"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-red-50 text-red-600 border-red-100"
                      }`}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-600">
                    {r.from}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-600">{r.to}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">
                    {r.days}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium text-center">
                    {r.reason}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                        r.status === "Approved"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {r.status === "Pending" ? (
                      <div className="flex gap-1 justify-end">
                        <button className="w-7 h-7 flex items-center justify-center border border-emerald-200 text-emerald-600 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-all cursor-pointer text-sm">
                          ✓
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center border border-red-200 text-red-600 rounded-lg bg-red-50 hover:bg-red-100 transition-all cursor-pointer text-sm">
                          ×
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
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
