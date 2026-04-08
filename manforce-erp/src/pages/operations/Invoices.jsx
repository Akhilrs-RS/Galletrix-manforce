import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function Invoices() {
  const invoices = [
    {
      id: "INV-001",
      client: "Al Futtaim Group",
      amt: "89,600",
      date: "2025-06-01",
      due: "2025-06-30",
      status: "Paid",
    },
    {
      id: "INV-002",
      client: "Emaar Properties",
      amt: "157,500",
      date: "2025-06-01",
      due: "2025-06-30",
      status: "Pending",
    },
    {
      id: "INV-003",
      client: "DAMAC Properties",
      amt: "58,900",
      date: "2025-06-01",
      due: "2025-06-30",
      status: "Pending",
    },
    {
      id: "INV-004",
      client: "DP World",
      amt: "89,900",
      date: "2025-05-01",
      due: "2025-05-31",
      status: "Overdue",
    },
    {
      id: "INV-005",
      client: "Majid Al Futtaim",
      amt: "31,200",
      date: "2025-05-01",
      due: "2025-05-31",
      status: "Paid",
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Summary Stat Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              TOTAL INVOICED
            </p>
            <h4 className="text-2xl font-bold mt-1 text-slate-800 uppercase">
              AED 427,100
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              COLLECTED
            </p>
            <h4 className="text-2xl font-bold mt-1 text-emerald-600 uppercase">
              AED 120,800
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-red-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              OUTSTANDING
            </p>
            <h4 className="text-2xl font-bold mt-1 text-red-600 uppercase">
              AED 306,300
            </h4>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/30">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
              All Invoices
            </h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Amount (AED)</th>
                <th className="px-6 py-4">Issued</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-gold">
                    {inv.id}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {inv.client}
                  </td>
                  <td className="px-6 py-4 font-bold text-brand-navy uppercase">
                    AED {inv.amt}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{inv.date}</td>
                  <td
                    className={`px-6 py-4 ${
                      inv.status === "Overdue"
                        ? "text-red-500 font-bold"
                        : "text-slate-400"
                    }`}
                  >
                    {inv.due}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                        inv.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : inv.status === "Overdue"
                            ? "bg-red-50 text-red-600 border-red-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                      PDF
                    </button>
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
