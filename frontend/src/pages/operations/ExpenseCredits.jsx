import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { 
  Plus, 
  X, 
  ChevronDown, 
  Check, 
  Search, 
  Download, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Landmark, 
  ShieldCheck,
  MoreVertical 
} from "lucide-react";

export default function ExpenseCredits({ role }) {
  // --- 1. INITIAL TRANSACTIONS ---
  const [transactions, setTransactions] = useState([
    {
      id: "TXN-001",
      date: "2026-05-18",
      description: "Emaar Properties Progress Payment",
      type: "Credit",
      category: "Payment",
      amount: 157500,
      status: "Approved"
    },
    {
      id: "TXN-002",
      date: "2026-05-16",
      description: "Worker Accommodation Rent (Q2)",
      type: "Expense",
      category: "Accommodation",
      amount: 25000,
      status: "Approved"
    },
    {
      id: "TXN-003",
      date: "2026-05-15",
      description: "Al Futtaim Group Invoice Collection",
      type: "Credit",
      category: "Collection",
      amount: 89600,
      status: "Approved"
    },
    {
      id: "TXN-004",
      date: "2026-05-12",
      description: "Worker Visa Processing & Medical Fees",
      type: "Expense",
      category: "Visa",
      amount: 7700,
      status: "Approved"
    },
    {
      id: "TXN-005",
      date: "2026-05-10",
      description: "DAMAC Properties Advance",
      type: "Credit",
      category: "Advance",
      amount: 58900,
      status: "Pending"
    },
    {
      id: "TXN-006",
      date: "2026-05-08",
      description: "Site Transport Fuel Reimbursement",
      type: "Expense",
      category: "Fuel",
      amount: 12500,
      status: "Approved"
    },
    {
      id: "TXN-007",
      date: "2026-05-05",
      description: "Office Consumables & Stationery",
      type: "Expense",
      category: "Office",
      amount: 1450,
      status: "Approved"
    }
  ]);

  // --- 2. STATE ---
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notification, setNotification] = useState(null);

  // Form State
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Payment");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("Pending");

  // --- 3. DYNAMIC STATS ---
  const stats = useMemo(() => {
    let totalExpenses = 0;
    let totalCredits = 0;

    transactions.forEach((t) => {
      if (t.type === "Expense") {
        totalExpenses += t.amount;
      } else {
        totalCredits += t.amount;
      }
    });

    const netBalance = totalCredits - totalExpenses;

    return {
      expenses: totalExpenses,
      credits: totalCredits,
      balance: netBalance
    };
  }, [transactions]);

  // --- 4. FILTERING & SEARCH ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === "All" || t.type === categoryFilter;
      const matchesStatus = statusFilter === "All" || t.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [transactions, searchQuery, categoryFilter, statusFilter]);

  // --- 5. HANDLERS ---
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveTransaction = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTxn = {
      id: `TXN-0${String(transactions.length + 1).padStart(2, "0")}`,
      date,
      description,
      type,
      category,
      amount: parseFloat(amount),
      status
    };

    setTransactions([newTxn, ...transactions]);
    setShowModal(false);
    triggerNotify(`Transaction ${newTxn.id} saved successfully!`);

    // Reset Form
    setDescription("");
    setType("Expense");
    setCategory("Payment");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setStatus("Pending");
  };

  const handleExportLedger = () => {
    const headers = ["Transaction ID", "Date", "Description", "Type", "Category", "Amount (AED)", "Status"];
    const rows = transactions.map((t) => [t.id, t.date, t.description, t.type, t.category, t.amount, t.status]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `expenses_credits_ledger_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerNotify("Ledger exported successfully!");
  };

  // Header actions matching the design
  const headerActions = (
    <div className="flex items-center gap-3">
      <button
        onClick={handleExportLedger}
        className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
      >
        <Download size={14} className="text-slate-500" /> Export
      </button>
      <button
        onClick={() => setShowModal(true)}
        className="bg-brand-gold text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
      >
        <Plus size={16} /> New Entry
      </button>
    </div>
  );

  // Chart Setup matching the screenshot
  const chartData = [
    { month: "Dec 25", expense: 280000, credit: 380000 },
    { month: "Jan 26", expense: 320000, credit: 460000 },
    { month: "Feb 26", expense: 340000, credit: 490000 },
    { month: "Mar 26", expense: 430000, credit: 610000 },
    { month: "Apr 26", expense: 480000, credit: 630000 },
    { month: "May 26", expense: 600000, credit: 780000 },
  ];

  return (
    <DashboardLayout 
      role={role} 
      headerActions={headerActions}
      subtitle="Track expenses, credits, and ledger entries."
    >
      <div className="space-y-6">
        {/* SUCCESS NOTIFICATION */}
        {notification && (
          <div className="fixed top-24 right-12 z-[100] animate-in slide-in-from-right-4 duration-300">
            <div className="bg-[#1e293b] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
              <Check size={18} className="text-emerald-400" />
              <span className="text-[13px] font-bold tracking-tight">
                {notification}
              </span>
            </div>
          </div>
        )}

        {/* 1. STATS SUMMARY SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Expenses */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <TrendingDown size={24} className="stroke-[2.5]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Total Expenses
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1 leading-none">
                AED {stats.expenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[11px] text-slate-400 font-semibold mt-2">
                All Time
              </p>
            </div>
          </div>

          {/* Total Credits */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <TrendingUp size={24} className="stroke-[2.5]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Total Credits
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1 leading-none">
                AED {stats.credits.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[11px] text-slate-400 font-semibold mt-2">
                All Time
              </p>
            </div>
          </div>

          {/* Net Balance */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
              <Landmark size={24} className="stroke-[2.2]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Net Balance
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1 leading-none">
                AED {stats.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[11px] text-slate-400 font-semibold mt-2">
                All Time
              </p>
            </div>
          </div>
        </div>

        {/* 2. APPROVALS BANNER */}
        <div className="bg-[#FFF8F2] border border-[#F5E6D3] rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100/50 flex items-center justify-center text-orange-600">
              <ShieldCheck size={18} className="stroke-[2.2]" />
            </div>
            <p className="text-xs font-semibold text-slate-700">
              <span className="font-extrabold text-slate-900">3 approvals pending</span>
              <span className="mx-2 text-slate-300">•</span>
              AED 85,400 requires review
            </p>
          </div>
          <button 
            onClick={() => triggerNotify("Opening pending reviews...")}
            className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
          >
            Review Now <ArrowRight size={14} className="text-slate-500" />
          </button>
        </div>

        {/* 3. MIDDLE CHARTS AND UPCOMING PAYMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Overview CSS Chart (2 cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Monthly Overview (Last 6 Months)
              </h4>
            </div>

            {/* Custom Interactive HTML/CSS Bar Chart */}
            <div className="flex h-56 items-stretch gap-2 relative mt-2 pr-2">
              {/* Y-Axis Labels */}
              <div className="flex flex-col justify-between text-[10px] text-slate-400 w-10 text-right pr-2">
                <span>800k</span>
                <span>600k</span>
                <span>400k</span>
                <span>200k</span>
                <span className="mt-auto">0</span>
              </div>

              {/* Grid Area */}
              <div className="flex-1 flex justify-around items-end relative border-b border-slate-100 pb-1 h-44 mt-2">
                {/* Horizontal Guide Lines */}
                <div className="absolute inset-x-0 top-0 border-t border-dashed border-slate-100"></div>
                <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-slate-100"></div>
                <div className="absolute inset-x-0 top-2/4 border-t border-dashed border-slate-100"></div>
                <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-slate-100"></div>

                {/* Bars */}
                {chartData.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end z-10 w-16 group cursor-pointer">
                    <div className="flex items-end gap-1.5 h-full">
                      {/* Expense Bar (Red) */}
                      <div 
                        style={{ height: `${(data.expense / 800000) * 100}%` }}
                        className="w-3.5 bg-rose-500 rounded-t-sm transition-all group-hover:brightness-105 shadow-sm relative"
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
                          Exp: AED {(data.expense / 1000).toFixed(0)}k
                        </div>
                      </div>
                      {/* Credit Bar (Green) */}
                      <div 
                        style={{ height: `${(data.credit / 800000) * 100}%` }}
                        className="w-3.5 bg-emerald-500 rounded-t-sm transition-all group-hover:brightness-105 shadow-sm relative"
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
                          Cred: AED {(data.credit / 1000).toFixed(0)}k
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* X-Axis Month Labels */}
            <div className="flex justify-around pl-10 text-[10px] font-bold text-slate-400 mt-2">
              {chartData.map((data, idx) => (
                <span key={idx} className="w-16 text-center">{data.month}</span>
              ))}
            </div>
          </div>

          {/* Upcoming Payments */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-5">
                Upcoming Payments
              </h4>
              <div className="divide-y divide-slate-100">
                {/* Item 1 */}
                <div className="py-3 flex justify-between items-center first:pt-0">
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800">
                      Worker Accommodation Rent (Q2)
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Due in 3 days <span className="mx-1">•</span> Jun 3, 2026
                    </p>
                  </div>
                  <p className="text-xs font-bold text-rose-500">
                    AED 25,000.00
                  </p>
                </div>
                {/* Item 2 */}
                <div className="py-3 flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800">
                      Worker Visa Processing
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Due in 7 days <span className="mx-1">•</span> Jun 7, 2026
                    </p>
                  </div>
                  <p className="text-xs font-bold text-rose-500">
                    AED 7,700.00
                  </p>
                </div>
                {/* Item 3 */}
                <div className="py-3 flex justify-between items-center last:pb-0">
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800">
                      DAMAC Properties Advance
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Due in 12 days <span className="mx-1">•</span> Jun 12, 2026
                    </p>
                  </div>
                  <p className="text-xs font-bold text-rose-500">
                    AED 58,900.00
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => triggerNotify("Navigating to all upcoming payments...")}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 text-left mt-4 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              View all upcoming
            </button>
          </div>
        </div>

        {/* 4. TRANSACTIONS LEDGER */}
        <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
          {/* Card Header & Filters */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-left">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Ledger Entries</h3>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-none">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-brand-gold transition-all font-medium"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-slate-600 cursor-pointer outline-none focus:bg-white focus:border-brand-gold transition-all"
                >
                  <option value="All">All Categories</option>
                  <option value="Credit">Credit Only</option>
                  <option value="Expense">Expense Only</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-slate-600 cursor-pointer outline-none focus:bg-white focus:border-brand-gold transition-all"
                >
                  <option value="All">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <button 
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("All");
                  setStatusFilter("All");
                }}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer transition-colors"
              >
                View all
              </button>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/40 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-8 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Amount(AED)</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-8 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-8 py-4 font-bold text-brand-gold">{t.id}</td>
                      <td className="px-6 py-4 text-slate-400 font-medium">{t.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{t.description}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${
                            t.type === "Credit"
                              ? "bg-emerald-50/60 text-emerald-600 border-emerald-200/50"
                              : "bg-rose-50/60 text-rose-600 border-rose-200/50"
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{t.category}</td>
                      <td className="px-6 py-4 text-right font-black text-slate-800">
                        {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold border ${
                            t.status === "Approved"
                              ? "bg-emerald-50/60 text-emerald-600 border-emerald-200/50"
                              : "bg-amber-50/60 text-amber-600 border-amber-200/50"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <button 
                          onClick={() => triggerNotify(`Actions for ${t.id}`)}
                          className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer inline-flex items-center justify-center"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-8 py-10 text-center text-slate-400 font-medium">
                      No transactions match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- ADD TRANSACTION MODAL --- */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center text-left bg-slate-50/20">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Add New Entry</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Record a financial transaction</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveTransaction} className="p-6 space-y-4 text-left">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Description
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Visa Fees, Progress Invoicing"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Type
                    </label>
                    <div className="relative">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold appearance-none cursor-pointer"
                      >
                        <option value="Expense">Expense</option>
                        <option value="Credit">Credit</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Category
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Payment, Accommodation"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Amount (AED)
                    </label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Date
                    </label>
                    <input
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold appearance-none cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold hover:brightness-105 transition-all cursor-pointer shadow-md shadow-brand-gold/10"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
