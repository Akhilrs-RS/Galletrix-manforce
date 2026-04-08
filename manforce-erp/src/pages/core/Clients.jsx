import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Search, Plus } from "lucide-react";

export default function Clients({ role = "admin" }) {
  const clientData = [
    {
      name: "Al Futtaim Group",
      contact: "Omar Al Futtaim",
      type: "Construction",
      workers: 28,
      rate: "3,200",
      till: "2025-12-31",
      status: "Active",
      revenue: "89,600",
    },
    {
      name: "Emaar Properties",
      contact: "Sarah Johnson",
      type: "Real Estate",
      workers: 45,
      rate: "3,500",
      till: "2026-06-30",
      status: "Active",
      revenue: "157,500",
    },
    {
      name: "DAMAC Properties",
      contact: "Ali Rashid",
      type: "Construction",
      workers: 19,
      rate: "3,100",
      till: "2025-09-15",
      status: "Active",
      revenue: "58,900",
    },
    {
      name: "DP World",
      contact: "James Clarke",
      type: "Logistics",
      workers: 31,
      rate: "2,900",
      till: "2026-01-31",
      status: "Active",
      revenue: "89,900",
    },
    {
      name: "Majid Al Futtaim",
      contact: "Nadia Hassan",
      type: "Retail",
      workers: 12,
      rate: "2,600",
      till: "2025-08-20",
      status: "Expired",
      revenue: "31,200",
    },
  ];

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Search and Action Bar */}
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
          <div className="flex-1 flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 group focus-within:border-brand-gold transition-all">
            <Search
              size={16}
              className="text-slate-400 mr-3 group-focus-within:text-brand-gold"
            />
            <input
              type="text"
              placeholder="Search clients..."
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <button className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg cursor-pointer transition-all">
            <Plus size={16} /> Add Client
          </button>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Workers</th>
                <th className="px-6 py-4">Rate/Worker</th>
                <th className="px-6 py-4">Contract Till</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clientData.map((client, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors group text-[12px]"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-[12px]">
                      {client.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{client.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {client.contact}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-500">
                    {client.type}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {client.workers} workers
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700 uppercase font-mono">
                    AED {client.rate}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {client.till}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold border ${client.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[11px] font-bold text-slate-400 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all cursor-pointer">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-2 gap-6 pb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">
              Top Clients by Workers
            </h3>
            <div className="space-y-6">
              {clientData.map((client, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold uppercase">
                    <span className="text-slate-700">{client.name}</span>
                    <span className="text-slate-400 font-mono">
                      {client.workers} workers
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-gold h-full rounded-full"
                      style={{ width: `${(client.workers / 45) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">
              Revenue by Client (AED)
            </h3>
            <div className="space-y-4">
              {clientData.map((client, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0"
                >
                  <span className="text-[11px] font-medium text-slate-600">
                    {client.name}
                  </span>
                  <span className="text-[11px] font-bold text-brand-navy uppercase font-mono">
                    AED {client.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
