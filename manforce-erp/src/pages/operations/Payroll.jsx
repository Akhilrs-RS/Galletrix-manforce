import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function Payroll({ role = "admin" }) {
  const payrollData = [
    {
      name: "Mohammed Al Rashidi",
      basic: "2,800",
      ot: "875",
      allow: "400",
      ded: "-150",
      net: "3,925",
      status: "Paid",
    },
    {
      name: "Ramesh Kumar",
      basic: "2,400",
      ot: "—",
      allow: "350",
      ded: "-120",
      net: "2,630",
      status: "Pending",
    },
    {
      name: "Carlos Fernandez",
      basic: "2,200",
      ot: "680",
      allow: "300",
      ded: "-110",
      net: "3,070",
      status: "Paid",
    },
    {
      name: "Bibek Thapa",
      basic: "1,800",
      ot: "220",
      allow: "250",
      ded: "-90",
      net: "2,180",
      status: "Processing",
    },
  ];

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Summary Stat Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              TOTAL PAYROLL
            </p>
            <h4 className="text-2xl font-bold mt-1 text-slate-800 uppercase">
              AED 19,100
            </h4>
            <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">
              June 2026
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              PAID OUT
            </p>
            <h4 className="text-2xl font-bold mt-1 text-emerald-600 uppercase">
              AED 11,995
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              PENDING
            </p>
            <h4 className="text-2xl font-bold mt-1 text-brand-gold uppercase">
              AED 7,105
            </h4>
          </div>
        </div>

        {/* WPS Filing Alert */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-tight">
            📋 WPS filing due June 15, 2026.{" "}
            <span className="underline cursor-pointer ml-2 hover:text-blue-900 transition-colors">
              Generate WPS →
            </span>
          </p>
          <button className="bg-brand-navy text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase shadow-md hover:brightness-110 transition-all">
            ▶ Run Payroll
          </button>
        </div>

        {/* Payroll Data Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
              Payroll Ledger — June 2026
            </h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Basic</th>
                <th className="px-6 py-4">Overtime</th>
                <th className="px-6 py-4">Allowance</th>
                <th className="px-6 py-4">Deduction</th>
                <th className="px-6 py-4">Net Pay</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {payrollData.map((p, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 font-bold text-slate-700">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500">
                    {p.basic}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 font-bold text-brand-gold">
                      {p.ot} <span className="text-[8px] opacity-40">✏️</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{p.allow}</td>
                  <td className="px-6 py-4 text-red-500 font-bold">{p.ded}</td>
                  <td className="px-6 py-4 font-bold text-slate-800 uppercase">
                    AED {p.net}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : p.status === "Pending"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[11px] font-bold text-emerald-600 border border-emerald-200 px-3 py-1 rounded-lg hover:bg-emerald-50 transition-all cursor-pointer">
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-slate-50/50 text-center border-t border-slate-50">
            <button className="text-[11px] font-bold text-slate-400 hover:text-brand-gold transition-colors">
              Export Monthly Statement (PDF)
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
