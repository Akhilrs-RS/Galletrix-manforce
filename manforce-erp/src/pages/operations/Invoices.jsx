import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Plus, X, ChevronDown, Check, Loader2, Download, Receipt as ReceiptIcon, FileText, Search } from "lucide-react";
import api from "../../utils/api";

export default function Invoices({ role }) {
  // --- 1. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("invoices"); // "invoices" | "receipts"
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [clientsList, setClientsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Invoices State
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      client: "Al Futtaim Group",
      amt: 89600,
      date: "2026-05-01",
      due: "2026-05-30",
      status: "Paid",
    },
    {
      id: "INV-002",
      client: "Emaar Properties",
      amt: 157500,
      date: "2026-05-01",
      due: "2026-05-30",
      status: "Pending",
    },
    {
      id: "INV-003",
      client: "DAMAC Properties",
      amt: 58900,
      date: "2026-05-01",
      due: "2026-05-30",
      status: "Pending",
    },
    {
      id: "INV-004",
      client: "DP World",
      amt: 89900,
      date: "2026-04-01",
      due: "2026-04-30",
      status: "Overdue",
    },
    {
      id: "INV-005",
      client: "Majid Al Futtaim",
      amt: 31200,
      date: "2026-04-01",
      due: "2026-04-30",
      status: "Paid",
    },
  ]);

  // Receipts State
  const [receipts, setReceipts] = useState([
    {
      id: "REC-001",
      client: "Al Futtaim Group",
      invoiceRef: "INV-001",
      amt: 89600,
      date: "2026-05-05",
    },
    {
      id: "REC-002",
      client: "Majid Al Futtaim",
      invoiceRef: "INV-005",
      amt: 31200,
      date: "2026-04-15",
    },
  ]);

  // Forms State
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    amount: "",
    issued: new Date().toISOString().split("T")[0],
    due: "",
  });

  const [newReceipt, setNewReceipt] = useState({
    client: "",
    invoiceRef: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  // --- 2. LOAD CLIENTS ---
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClientsList(res.data || []);
        if (res.data && res.data.length > 0) {
          setNewInvoice((prev) => ({ ...prev, client: res.data[0].name }));
          setNewReceipt((prev) => ({ ...prev, client: res.data[0].name }));
        }
      } catch (err) {
        console.error("Failed to load clients in Invoices page:", err);
      }
    };
    fetchClients();
  }, []);

  // Set initial invoice reference when client changes in Receipt form
  useEffect(() => {
    if (newReceipt.client) {
      const clientInvoices = invoices.filter(
        (inv) => inv.client === newReceipt.client && inv.status !== "Paid"
      );
      setNewReceipt((prev) => ({
        ...prev,
        invoiceRef: clientInvoices.length > 0 ? clientInvoices[0].id : "General Payment",
        amount: clientInvoices.length > 0 ? clientInvoices[0].amt.toString() : "",
      }));
    }
  }, [newReceipt.client, invoices]);

  // --- 3. DYNAMIC STATS ---
  const stats = useMemo(() => {
    const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amt, 0);
    const totalCollected = receipts.reduce((sum, rec) => sum + rec.amt, 0);
    const totalOutstanding = totalInvoiced - totalCollected;

    return {
      invoiced: totalInvoiced,
      collected: totalCollected,
      outstanding: totalOutstanding,
    };
  }, [invoices, receipts]);

  // Filtered lists based on tab & search
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) =>
      inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [invoices, searchQuery]);

  const filteredReceipts = useMemo(() => {
    return receipts.filter((rec) =>
      rec.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.invoiceRef.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [receipts, searchQuery]);

  // --- 4. HANDLERS ---
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveInvoice = (e) => {
    e.preventDefault();
    if (!newInvoice.client || !newInvoice.amount) return;

    const invId = `INV-0${String(invoices.length + 1).padStart(2, "0")}`;
    const entry = {
      id: invId,
      client: newInvoice.client,
      amt: parseFloat(newInvoice.amount),
      date: newInvoice.issued || new Date().toISOString().split("T")[0],
      due: newInvoice.due || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "Pending",
    };

    setInvoices([entry, ...invoices]);
    setShowInvoiceModal(false);
    triggerNotify(`Invoice ${invId} created successfully for ${newInvoice.client}`);
    
    // Reset form
    setNewInvoice({
      client: clientsList[0]?.name || "",
      amount: "",
      issued: new Date().toISOString().split("T")[0],
      due: "",
    });
  };

  const handleSaveReceipt = (e) => {
    e.preventDefault();
    if (!newReceipt.client || !newReceipt.amount) return;

    const recId = `REC-0${String(receipts.length + 1).padStart(2, "0")}`;
    const amountPaid = parseFloat(newReceipt.amount);

    const entry = {
      id: recId,
      client: newReceipt.client,
      invoiceRef: newReceipt.invoiceRef || "General Payment",
      amt: amountPaid,
      date: newReceipt.date || new Date().toISOString().split("T")[0],
    };

    // If an invoice is referenced, automatically mark it as Paid
    if (newReceipt.invoiceRef && newReceipt.invoiceRef !== "General Payment") {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === newReceipt.invoiceRef ? { ...inv, status: "Paid" } : inv
        )
      );
    }

    setReceipts([entry, ...receipts]);
    setShowReceiptModal(false);
    triggerNotify(`Receipt ${recId} generated successfully for ${newReceipt.client}`);

    // Reset form
    setNewReceipt({
      client: clientsList[0]?.name || "",
      invoiceRef: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleDownloadPDF = (id) => {
    triggerNotify(`Generating PDF for ${id}...`);
  };

  // Header Actions injection
  const headerActions = (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setShowInvoiceModal(true)}
        className="bg-slate-800 text-white hover:bg-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
      >
        <Plus size={15} /> New Invoice
      </button>
      <button
        onClick={() => setShowReceiptModal(true)}
        className="bg-brand-gold text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
      >
        <Plus size={15} /> New Receipt
      </button>
    </div>
  );

  return (
    <DashboardLayout role={role} headerActions={headerActions}>
      <div className="space-y-6 relative">
        {/* SUCCESS NOTIFICATION */}
        {notification && (
          <div className="fixed top-24 right-12 z-50 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-[#1e293b] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
              {notification.includes("Generating") ? (
                <Loader2 size={16} className="animate-spin text-blue-400" />
              ) : (
                <Check size={16} className="text-emerald-400" />
              )}
              <span className="text-[13px] font-bold tracking-tight">
                {notification}
              </span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="TOTAL INVOICED"
            value={`AED ${stats.invoiced.toLocaleString()}`}
            color="brand-gold"
          />
          <StatCard 
            title="TOTAL COLLECTED" 
            value={`AED ${stats.collected.toLocaleString()}`} 
            color="emerald" 
          />
          <StatCard 
            title="OUTSTANDING" 
            value={`AED ${stats.outstanding.toLocaleString()}`} 
            color="red" 
          />
        </div>

        {/* Tab Controls and List */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
          {/* Card Header & Tabs & Filters */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Tab switchers */}
            <div className="flex bg-slate-50 p-1 rounded-xl gap-1 shrink-0">
              <button
                onClick={() => { setActiveTab("invoices"); setSearchQuery(""); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                  activeTab === "invoices"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText size={14} /> Invoices ({invoices.length})
              </button>
              <button
                onClick={() => { setActiveTab("receipts"); setSearchQuery(""); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                  activeTab === "receipts"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <ReceiptIcon size={14} /> Receipts ({receipts.length})
              </button>
            </div>

            {/* Filter Search */}
            <div className="relative w-full md:w-64">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={activeTab === "invoices" ? "Search invoices..." : "Search receipts..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-brand-gold transition-all"
              />
            </div>
          </div>

          {/* Dynamic Table based on Active Tab */}
          <div className="overflow-x-auto">
            {activeTab === "invoices" ? (
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-4">Invoice #</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4 text-right">Amount (AED)</th>
                    <th className="px-6 py-4">Issued</th>
                    <th className="px-6 py-4">Due Date</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-8 py-4 font-bold text-brand-gold">{inv.id}</td>
                        <td className="px-6 py-4 font-bold text-slate-800">{inv.client}</td>
                        <td className="px-6 py-4 text-right font-black text-slate-800">
                          {inv.amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-medium">{inv.date}</td>
                        <td
                          className={`px-6 py-4 font-medium ${
                            inv.status === "Overdue" ? "text-rose-500 font-bold" : "text-slate-400"
                          }`}
                        >
                          {inv.due}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              inv.status === "Paid"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                : inv.status === "Overdue"
                                ? "bg-rose-50 text-rose-600 border-rose-100"
                                : "bg-amber-50 text-amber-600 border-amber-100"
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <button
                            onClick={() => handleDownloadPDF(inv.id)}
                            className="text-[10px] font-bold text-slate-500 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all cursor-pointer"
                          >
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-8 py-10 text-center text-slate-400 font-medium">
                        No invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-4">Receipt #</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Invoice Reference</th>
                    <th className="px-6 py-4 text-right">Amount Paid (AED)</th>
                    <th className="px-6 py-4">Date Paid</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {filteredReceipts.length > 0 ? (
                    filteredReceipts.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-8 py-4 font-bold text-brand-gold">{rec.id}</td>
                        <td className="px-6 py-4 font-bold text-slate-800">{rec.client}</td>
                        <td className="px-6 py-4 font-medium text-slate-500">{rec.invoiceRef}</td>
                        <td className="px-6 py-4 text-right font-black text-slate-800">
                          {rec.amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-medium">{rec.date}</td>
                        <td className="px-8 py-4 text-right">
                          <button
                            onClick={() => handleDownloadPDF(rec.id)}
                            className="text-[10px] font-bold text-slate-500 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all cursor-pointer"
                          >
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-8 py-10 text-center text-slate-400 font-medium">
                        No receipts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* --- ADD NEW INVOICE MODAL --- */}
        {showInvoiceModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 text-left border border-slate-100">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Create New Invoice</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Add a pending billing statement</p>
                </div>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveInvoice} className="p-6 space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Client Name
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold appearance-none cursor-pointer"
                      value={newInvoice.client}
                      onChange={(e) =>
                        setNewInvoice({ ...newInvoice, client: e.target.value })
                      }
                    >
                      {clientsList.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Amount (AED)
                    </label>
                    <input
                      required
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                      value={newInvoice.amount}
                      onChange={(e) =>
                        setNewInvoice({ ...newInvoice, amount: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Due Date
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                      value={newInvoice.due}
                      onChange={(e) =>
                        setNewInvoice({ ...newInvoice, due: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowInvoiceModal(false)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-all cursor-pointer shadow-md"
                  >
                    Save Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- GENERATE NEW RECEIPT MODAL --- */}
        {showReceiptModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 text-left border border-slate-100">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Generate New Receipt</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Record a client invoice collection payment</p>
                </div>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveReceipt} className="p-6 space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Client Name
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold appearance-none cursor-pointer"
                      value={newReceipt.client}
                      onChange={(e) =>
                        setNewReceipt({ ...newReceipt, client: e.target.value })
                      }
                    >
                      {clientsList.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Invoice Reference
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold appearance-none cursor-pointer"
                      value={newReceipt.invoiceRef}
                      onChange={(e) => {
                        const val = e.target.value;
                        const matchInv = invoices.find((i) => i.id === val);
                        setNewReceipt({
                          ...newReceipt,
                          invoiceRef: val,
                          amount: matchInv ? matchInv.amt.toString() : "",
                        });
                      }}
                    >
                      <option value="General Payment">General Payment / Deposit</option>
                      {invoices
                        .filter((i) => i.client === newReceipt.client && i.status !== "Paid")
                        .map((inv) => (
                          <option key={inv.id} value={inv.id}>
                            {inv.id} - AED {inv.amt.toLocaleString()} (Due: {inv.due})
                          </option>
                        ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Amount Paid (AED)
                    </label>
                    <input
                      required
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                      value={newReceipt.amount}
                      onChange={(e) =>
                        setNewReceipt({ ...newReceipt, amount: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Date Paid
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                      value={newReceipt.date}
                      onChange={(e) =>
                        setNewReceipt({ ...newReceipt, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowReceiptModal(false)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all cursor-pointer shadow-md shadow-brand-gold/10"
                  >
                    Save Receipt
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

function StatCard({ title, value, color }) {
  const colorMap = {
    "brand-gold": "border-brand-gold text-slate-800",
    emerald: "border-emerald-500 text-emerald-600",
    red: "border-red-500 text-red-600",
  };
  return (
    <div className={`bg-white p-6 rounded-2xl border-t-4 shadow-sm flex flex-col justify-center items-start text-left ${colorMap[color]}`}>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
        {title}
      </p>
      <h4 className="text-2xl font-black mt-2 leading-none uppercase tracking-tight">{value}</h4>
    </div>
  );
}
