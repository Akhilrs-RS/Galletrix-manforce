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

export default function AccountsDashboard({ role }) {
  const savedRole = localStorage.getItem("userRole");
  const currentRole = role || (savedRole === "admin" ? "admin" : "accounts");
  const [filterMode, setFilterMode] = useState("all"); // "all" | "range" | "month" | "year"
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("2025-04");
  const [selectedYear, setSelectedYear] = useState("25-26");

  const allTransactions = [
    {
      date: "2024-05-10",
      description: "Project Milestone 1 - Palm Villa",
      category: "Income",
      debit: 0,
      credit: 350000,
    },
    {
      date: "2024-06-15",
      description: "Material Purchase - Palm Villa",
      category: "Project Materials",
      debit: 80000,
      credit: 0,
    },
    {
      date: "2024-07-20",
      description: "Labour Payments July 24",
      category: "Salaries & Payroll",
      debit: 120000,
      credit: 0,
    },
    {
      date: "2024-11-05",
      description: "Client Advance - Dubai Hills",
      category: "Income",
      debit: 0,
      credit: 200000,
    },
    {
      date: "2024-12-20",
      description: "Office Rent & Utilities",
      category: "Rent & Utilities",
      debit: 25000,
      credit: 0,
    },
    {
      date: "2025-01-10",
      description: "Government Fees & Licences",
      category: "Compliance",
      debit: 12000,
      credit: 0,
    },
    {
      date: "2025-03-25",
      description: "Final Payment - Palm Villa",
      category: "Income",
      debit: 0,
      credit: 150000,
    },
    {
      date: "2025-04-01",
      description: "Client Advance - DAMAC Arjan",
      category: "Income",
      debit: 0,
      credit: 120000,
    },
    {
      date: "2025-04-10",
      description: "Worker Salaries April 25",
      category: "Salaries & Payroll",
      debit: 145000,
      credit: 0,
    },
    {
      date: "2025-04-12",
      description: "Logistics April 25",
      category: "Logistics & Transport",
      debit: 8900,
      credit: 0,
    },
    {
      date: "2025-04-15",
      description: "Insurance Renewal",
      category: "Worker Insurance",
      debit: 45200,
      credit: 0,
    },
    {
      date: "2025-05-02",
      description: "Progress Billing - DAMAC Arjan",
      category: "Income",
      debit: 0,
      credit: 210000,
    },
    {
      date: "2025-05-15",
      description: "Office Setup Expansion",
      category: "Capital Expense",
      debit: 35000,
      credit: 0,
    },
  ];

  // Dynamically compute running balances
  let balanceTracker = 500000;
  const transactionsWithBalance = allTransactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((txn) => {
      balanceTracker = balanceTracker - txn.debit + txn.credit;
      return {
        ...txn,
        runningBalance: balanceTracker,
      };
    });

  // Filter display transactions
  const displayTransactions = transactionsWithBalance.filter((txn) => {
    const txnDate = new Date(txn.date);

    if (filterMode === "range") {
      if (startDate && new Date(startDate) > txnDate) return false;
      if (endDate && new Date(endDate) < txnDate) return false;
      return true;
    }

    if (filterMode === "month") {
      const [year, month] = selectedMonth.split("-");
      return (
        txnDate.getFullYear() === parseInt(year) &&
        txnDate.getMonth() === parseInt(month) - 1
      );
    }

    if (filterMode === "year") {
      const [startYearStr, endYearStr] = selectedYear.split("-");
      const startYear = parseInt("20" + startYearStr);
      const endYear = parseInt("20" + endYearStr);

      const fyStart = new Date(`${startYear}-04-01T00:00:00`);
      const fyEnd = new Date(`${endYear}-03-31T23:59:59`);

      return txnDate >= fyStart && txnDate <= fyEnd;
    }

    return true;
  });

  // Stat computations based on filtered results
  const totalReceivedFiltered = displayTransactions.reduce((acc, t) => acc + t.credit, 0);
  const totalExpensesFiltered = displayTransactions.reduce((acc, t) => acc + t.debit, 0);
  const overallBalance = transactionsWithBalance.length > 0
    ? transactionsWithBalance[transactionsWithBalance.length - 1].runningBalance
    : 500000;

  return (
    <DashboardLayout role={currentRole}>
      <div className="space-y-6">
        {/* --- 1. COMPANY-WIDE FINANCIAL OVERVIEW --- */}
        <div className="grid grid-cols-4 gap-6">
          <FinancialStat
            title="Current Balance"
            value={`AED ${(overallBalance / 1000).toFixed(1)}k`}
            subtext="Available Liquid Funds"
            icon={Wallet}
            color="bg-amber-50 text-amber-600"
          />
          <FinancialStat
            title="Total Received"
            value={`AED ${(totalReceivedFiltered / 1000).toFixed(1)}k`}
            subtext="In Selected Period"
            icon={Landmark}
            color="bg-emerald-50 text-emerald-600"
          />
          <FinancialStat
            title="Project Expenses"
            value={`AED ${(totalExpensesFiltered / 1000).toFixed(1)}k`}
            subtext="In Selected Period"
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
          <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center px-8 flex-wrap gap-4">
            <div>
              <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
                Account Statement
              </h3>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
                Detailed Transaction Ledger
              </p>
            </div>
            <div className="flex gap-3 flex-wrap items-center">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Filter Mode:
                </span>
                <div className="relative">
                  <select
                    value={filterMode}
                    onChange={(e) => setFilterMode(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 pl-4 pr-10 py-2 rounded-xl text-[11px] font-bold text-slate-600 outline-none cursor-pointer shadow-sm"
                  >
                    <option value="all">Show All</option>
                    <option value="range">Date Range</option>
                    <option value="month">Monthly</option>
                    <option value="year">Financial Year</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Conditional Inputs */}
              {filterMode === "range" && (
                <div className="flex items-center gap-2 animate-in fade-in duration-200">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 outline-none shadow-sm"
                  />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 outline-none shadow-sm"
                  />
                </div>
              )}

              {filterMode === "month" && (
                <div className="relative animate-in fade-in duration-200">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 pl-4 pr-10 py-2 rounded-xl text-[11px] font-bold text-slate-600 outline-none cursor-pointer shadow-sm"
                  >
                    <option value="2025-05">May 2025</option>
                    <option value="2025-04">April 2025</option>
                    <option value="2025-03">March 2025</option>
                    <option value="2025-01">January 2025</option>
                    <option value="2024-12">December 2024</option>
                    <option value="2024-11">November 2024</option>
                    <option value="2024-07">July 2024</option>
                    <option value="2024-06">June 2024</option>
                    <option value="2024-05">May 2024</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              )}

              {filterMode === "year" && (
                <div className="relative animate-in fade-in duration-200">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 pl-4 pr-10 py-2 rounded-xl text-[11px] font-bold text-slate-600 outline-none cursor-pointer shadow-sm"
                  >
                    <option value="25-26">FY 2025-26 (Apr 2025 - Mar 2026)</option>
                    <option value="24-25">FY 2024-25 (Apr 2024 - Mar 2025)</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              )}

              <button
                onClick={() => {
                  setFilterMode("all");
                  setStartDate("");
                  setEndDate("");
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-bold cursor-pointer transition-colors"
              >
                Reset
              </button>
              <button className="bg-brand-navy text-white px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-2 hover:brightness-110 shadow-md cursor-pointer">
                <Download size={14} /> Export Report
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Debit</th>
                  <th className="px-6 py-4 text-right">Credit</th>
                  <th className="px-8 py-4 text-right">Running Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[12px]">
                {displayTransactions.map((txn, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 text-slate-500 font-mono whitespace-nowrap">
                      {txn.date}
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-800">
                      {txn.description}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-slate-600 bg-slate-100 px-3 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap">
                        {txn.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-black text-red-500 text-right">
                      {txn.debit > 0 ? `AED ${txn.debit.toLocaleString()}` : "-"}
                    </td>
                    <td className="px-6 py-5 font-black text-emerald-600 text-right">
                      {txn.credit > 0 ? `AED ${txn.credit.toLocaleString()}` : "-"}
                    </td>
                    <td className="px-8 py-5 text-right font-black text-slate-800">
                      AED {txn.runningBalance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- 3. FINANCIAL HEALTH SECTION --- */}
        <div className="pb-10">
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
