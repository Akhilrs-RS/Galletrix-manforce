import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Plus, X, ChevronDown, Check, Loader2 } from "lucide-react";

export default function Invoices({ role }) {
  // --- 1. STATE MANAGEMENT ---
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [newInvoice, setNewInvoice] = useState({
    client: "Al Futtaim Group",
    amount: "",
    issued: "",
    due: "",
  });

  const [invoices, setInvoices] = useState([
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
  ]);

  // --- 2. ACTIONS ---
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveInvoice = (e) => {
    e.preventDefault();
    const invId = `INV-00${invoices.length + 1}`;

    const entry = {
      id: invId,
      client: newInvoice.client,
      amt: Number(newInvoice.amount).toLocaleString(),
      date: newInvoice.issued || "2025-04-10",
      due: newInvoice.due || "2025-05-10",
      status: "Pending",
    };

    setInvoices([entry, ...invoices]);
    setShowModal(false);
    triggerNotify(
      `Invoice ${invId} saved successfully for ${newInvoice.client}`,
    );
    setNewInvoice({
      client: "Al Futtaim Group",
      amount: "",
      issued: "",
      due: "",
    });
  };

  const handleDownloadPDF = (id) => {
    triggerNotify(`Generating PDF for ${id}...`);
  };

  return (
    <DashboardLayout role={role}>
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

        {/* Header Action Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg transition-all cursor-pointer"
          >
            <Plus size={16} /> New Invoice
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard
            title="TOTAL INVOICED"
            value="AED 427,100"
            color="brand-gold"
          />
          <StatCard title="COLLECTED" value="AED 120,800" color="emerald" />
          <StatCard title="OUTSTANDING" value="AED 306,300" color="red" />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center px-8">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
              All Invoices
            </h3>
            <button
              onClick={() => setShowModal(true)}
              className="bg-brand-gold text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
            >
              <Plus size={14} /> New Invoice
            </button>
          </div>

          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Invoice #</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Amount (AED)</th>
                <th className="px-6 py-4">Issued</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-brand-gold">
                    {inv.id}
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-800">
                    {inv.client}
                  </td>
                  <td className="px-6 py-5 font-bold text-brand-navy uppercase">
                    AED {inv.amt}
                  </td>
                  <td className="px-6 py-5 text-slate-400 font-medium">
                    {inv.date}
                  </td>
                  <td
                    className={`px-6 py-5 font-medium ${inv.status === "Overdue" ? "text-red-500 font-bold" : "text-slate-400"}`}
                  >
                    {inv.due}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
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
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => handleDownloadPDF(inv.id)}
                      className="text-[10px] font-bold text-slate-500 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all cursor-pointer"
                    >
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- ADD NEW INVOICE MODAL --- */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 text-left">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800">
                  Add New Invoice
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSaveInvoice} className="p-8 space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                    Client Name
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer"
                      value={newInvoice.client}
                      onChange={(e) =>
                        setNewInvoice({ ...newInvoice, client: e.target.value })
                      }
                    >
                      <option>Al Futtaim Group</option>
                      <option>Emaar Properties</option>
                      <option>DAMAC Properties</option>
                      <option>DP World</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                      Amount (AED)
                    </label>
                    <input
                      required
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                      value={newInvoice.amount}
                      onChange={(e) =>
                        setNewInvoice({ ...newInvoice, amount: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                      Due Date
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                      value={newInvoice.due}
                      onChange={(e) =>
                        setNewInvoice({ ...newInvoice, due: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all cursor-pointer"
                  >
                    Save Invoice
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
    <div
      className={`bg-white p-6 rounded-2xl border-t-4 shadow-sm ${colorMap[color]}`}
    >
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-2xl font-bold mt-1 uppercase">{value}</h4>
    </div>
  );
}
