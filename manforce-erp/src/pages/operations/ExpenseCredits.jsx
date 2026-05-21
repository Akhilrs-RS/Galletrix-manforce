import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Plus, X, ChevronDown, Check, Search, Download, TrendingUp, TrendingDown, Landmark } from "lucide-react";

export default function ExpenseCredits({ role }) {
  // --- 1. INITIAL MOCK TRANSACTIONS ---
  const [transactions, setTransactions] = useState([
    {
      id: "TXN-001",
      date: "2026-05-18",
      description: "Emaar Properties Progress Payment",
      category: "Credit",
      amount: 157500,
      status: "Approved"
    },
    {
      id: "TXN-002",
      date: "2026-05-16",
      description: "Worker Accommodation Rent (Q2)",
      category: "Expense",
      amount: 25000,
      status: "Approved"
    },
    {
      id: "TXN-003",
      date: "2026-05-15",
      description: "Al Futtaim Group Invoice Collection",
      category: "Credit",
      amount: 89600,
      status: "Approved"
    },
    {
      id: "TXN-004",
      date: "2026-05-12",
      description: "Worker Visa Processing & Medical Fees",
      category: "Expense",
      amount: 7700,
      status: "Approved"
    },
    {
      id: "TXN-005",
      date: "2026-05-10",
      description: "DAMAC Properties Advance",
      category: "Credit",
      amount: 58900,
      status: "Pending"
    },
    {
      id: "TXN-006",
      date: "2026-05-08",
      description: "Site Transport Fuel Reimbursement",
      category: "Expense",
      amount: 12500,
      status: "Approved"
    },
    {
      id: "TXN-007",
      date: "2026-05-05",
      description: "Office Consumables & Stationery",
      category: "Expense",
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
  const [category, setCategory] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("Pending");

  // --- 3. DYNAMIC STATS ---
  const stats = useMemo(() => {
    let totalExpenses = 0;
    let totalCredits = 0;

    transactions.forEach((t) => {
      if (t.category === "Expense") {
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
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
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
      category,
      amount: parseFloat(amount),
      status
    };

    setTransactions([newTxn, ...transactions]);
    setShowModal(false);
    triggerNotify(`Transaction ${newTxn.id} saved successfully!`);

    // Reset Form
    setDescription("");
    setCategory("Expense");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setStatus("Pending");
  };

  const handleExportLedger = () => {
    const headers = ["Transaction ID", "Date", "Description", "Category", "Amount (AED)", "Status"];
    const rows = transactions.map((t) => [t.id, t.date, t.description, t.category, t.amount, t.status]);

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

  // Inject header actions into the layout
  const headerActions = (
    <div className="flex items-center gap-3">
      <button
        onClick={handleExportLedger}
        className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
      >
        <Download size={14} /> Export Ledger
      </button>
      <button
        onClick={() => setShowModal(true)}
        className="bg-brand-gold text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
      >
        <Plus size={16} /> New Entry
      </button>
    </div>
  );

  return (
    <DashboardLayout role={role} headerActions={headerActions}>
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
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <TrendingDown size={24} />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-slate-800 leading-none">
                AED {stats.expenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[12px] text-slate-500 font-bold mt-1.5 uppercase tracking-wider">
                Total Expenses
              </p>
            </div>
          </div>

          {/* Total Credits */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <TrendingUp size={24} />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-slate-800 leading-none">
                AED {stats.credits.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[12px] text-slate-500 font-bold mt-1.5 uppercase tracking-wider">
                Total Credits
              </p>
            </div>
          </div>

          {/* Net Balance */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
              stats.balance >= 0 ? "bg-amber-50 text-brand-gold" : "bg-rose-50 text-rose-500"
            }`}>
              <Landmark size={24} />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-slate-800 leading-none">
                AED {stats.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[12px] text-slate-500 font-bold mt-1.5 uppercase tracking-wider">
                Net Balance
              </p>
            </div>
          </div>
        </div>

        {/* 2. TRANSACTIONS LEDGER */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          {/* Card Header & Filters */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-left">
              <h3 className="text-lg font-bold text-slate-800">Ledger Statements</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Showing {filteredTransactions.length} of {transactions.length} Transactions
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-none">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-brand-gold transition-all"
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
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Amount (AED)</th>
                  <th className="px-8 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-8 py-4 font-bold text-brand-gold">{t.id}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{t.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{t.description}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${
                            t.category === "Credit"
                              ? "bg-emerald-50/40 text-emerald-600 border-emerald-200/50"
                              : "bg-rose-50/40 text-rose-600 border-rose-200/50"
                          }`}
                        >
                          {t.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-black text-slate-800">
                        {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold border ${
                            t.status === "Approved"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-10 text-center text-slate-400 font-medium">
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
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                </div>

                <div className="grid grid-cols-2 gap-4">
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
