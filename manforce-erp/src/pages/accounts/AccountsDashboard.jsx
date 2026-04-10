import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Wallet,
  Receipt,
  TrendingUp,
  Landmark,
  ChevronDown,
  Download,
} from "lucide-react";

const FinancialStat = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}
    >
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-2xl font-black text-slate-800">{value}</h4>
      <p className="text-[9px] font-bold text-slate-400 mt-0.5">{subtext}</p>
    </div>
  </div>
);

export default function AccountsDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("April 2026");

  const monthlyExpenses = [
    {
      category: "Salaries & Payroll",
      project: "All Projects",
      amount: "AED 145,000",
      status: "Paid",
    },
    {
      category: "Operational Costs",
      project: "DAMAC Arjan",
      amount: "AED 12,400",
      status: "Pending",
    },
    {
      category: "Logistics & Transport",
      project: "Business Bay",
      amount: "AED 8,900",
      status: "Paid",
    },
    {
      category: "Worker Insurance",
      project: "All Projects",
      amount: "AED 45,200",
      status: "Paid",
    },
  ];

  return (
    <DashboardLayout role="accounts">
      <div className="space-y-6">
        {/* --- 1. COMPANY-WIDE FINANCIAL OVERVIEW --- */}
        <div className="grid grid-cols-4 gap-6">
          <FinancialStat
            title="Total Payroll"
            value="AED 145k"
            subtext="For 142 Workers"
            icon={Wallet}
            color="bg-amber-50 text-amber-600"
          />
          <FinancialStat
            title="Total Received"
            value="AED 890k"
            subtext="Current Fiscal Year"
            icon={Landmark}
            color="bg-emerald-50 text-emerald-600"
          />
          <FinancialStat
            title="Project Expenses"
            value="AED 62k"
            subtext="Project: DAMAC Arjan"
            icon={Receipt}
            color="bg-blue-50 text-blue-600"
          />
          <FinancialStat
            title="Avg. Margin"
            value="24%"
            subtext="Company-wide avg."
            icon={TrendingUp}
            color="bg-purple-50 text-purple-600"
          />
        </div>

        {/* --- 2. EXPENSE CLASSIFICATION & PROJECT TRACKING --- */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center px-8">
            <div>
              <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
                Monthly Expense Classification
              </h3>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
                Breakdown by Project & Category
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 pl-4 pr-10 py-2 rounded-xl text-[11px] font-bold text-slate-600 outline-none cursor-pointer shadow-sm"
                >
                  <option>April 2026</option>
                  <option>March 2026</option>
                  <option>February 2026</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
              <button className="bg-brand-navy text-white px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-2 hover:brightness-110 shadow-md">
                <Download size={14} /> Export Report
              </button>
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Expense Category</th>
                <th className="px-6 py-4">Project Association</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {monthlyExpenses.map((exp, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-700">
                    {exp.category}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-blue-500 font-bold bg-blue-50 px-3 py-1 rounded-lg text-[10px]">
                      {exp.project}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-black text-slate-800">
                    {exp.amount}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                        exp.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- 3. PAYSLIP GENERATION SECTION --- */}
        <div className="grid grid-cols-2 gap-6 pb-10">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest mb-6">
              Quick Payslip Generator
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block mb-2">
                  Worker Selection
                </label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none outline-none focus:border-brand-gold">
                  <option>All Workers (Batch)</option>
                  <option>Mohammed Al Rashidi (W001)</option>
                  <option>Carlos Fernandez (W004)</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 bottom-4 text-slate-400 pointer-events-none"
                />
              </div>
              <button className="w-full bg-brand-gold text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all text-xs">
                Generate Monthly Payslips
              </button>
            </div>
          </div>

          <div className="bg-brand-navy p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">
                Financial Health
              </h3>
              <h2 className="text-3xl font-black">AED 1.2M</h2>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
                Total Company Revenue (YTD)
              </p>
              <div className="mt-8 flex gap-6">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Expenses
                  </p>
                  <p className="text-lg font-bold">AED 412k</p>
                </div>
                <div className="w-px h-10 bg-slate-700"></div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Net Profit
                  </p>
                  <p className="text-lg font-bold text-emerald-400">AED 788k</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <Landmark size={200} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
