import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Plus, X, ChevronDown, Check } from "lucide-react";

export default function LeaveMgmt({ role = "admin" }) {
  // --- 1. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("requests"); // requests | balance
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState("All Requests");
  const [notification, setNotification] = useState(null);

  const [requests, setRequests] = useState([
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
  ]);

  const balanceData = [
    { name: "Mohammed Al Rashidi", ent: 30, used: 6, rem: 24, perc: 20 },
    { name: "Ramesh Kumar", ent: 30, used: 0, rem: 30, perc: 0 },
    { name: "Carlos Fernandez", ent: 30, used: 7, rem: 23, perc: 23 },
    { name: "Sanjay Patel", ent: 30, used: 0, rem: 30, perc: 0 },
    { name: "Ahmed Hassan", ent: 30, used: 0, rem: 30, perc: 0 },
    { name: "Bibek Thapa", ent: 30, used: 0, rem: 30, perc: 0 },
  ];

  // --- 2. ACTIONS ---
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: action === "approve" ? "Approved" : "Rejected" }
          : r,
      ),
    );
    triggerNotify(
      `Request ${action === "approve" ? "Approved" : "Rejected"} successfully`,
    );
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6 relative">
        {/* --- NOTIFICATION --- */}
        {notification && (
          <div className="fixed top-24 right-12 z-50 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-[#1e293b] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
              <Check size={16} className="text-emerald-400" />
              <span className="text-[13px] font-bold tracking-tight">
                {notification}
              </span>
            </div>
          </div>
        )}

        {/* --- STAT CARDS --- */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="PENDING REQUESTS"
            value={requests.filter((r) => r.status === "Pending").length}
            color="amber"
          />
          <StatCard
            title="APPROVED"
            value={requests.filter((r) => r.status === "Approved").length}
            color="emerald"
          />
          <StatCard title="ON LEAVE TODAY" value="1" color="blue" />
          <StatCard title="TOTAL DAYS TAKEN" value="13" color="brand-gold" />
        </div>

        {/* --- NAVIGATION TABS --- */}
        <div className="flex gap-8 border-b border-slate-200 px-2">
          <button
            onClick={() => setActiveTab("requests")}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${activeTab === "requests" ? "text-brand-gold border-b-2 border-brand-gold" : "text-slate-400 hover:text-slate-600"}`}
          >
            Leave Requests
          </button>
          <button
            onClick={() => setActiveTab("balance")}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${activeTab === "balance" ? "text-brand-gold border-b-2 border-brand-gold" : "text-slate-400 hover:text-slate-600"}`}
          >
            Balance & Entitlements
          </button>
        </div>

        {/* --- ACTION BAR (Only visible on requests tab) --- */}
        <div className="flex items-center gap-3 h-10">
          {activeTab === "requests" && (
            <>
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 pl-4 pr-10 py-2 rounded-xl text-[11px] font-bold text-slate-600 outline-none focus:border-brand-gold transition-all cursor-pointer shadow-sm"
                >
                  <option>All Requests</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-brand-gold text-white px-4 py-2 rounded-xl text-[11px] font-bold flex items-center gap-2 hover:brightness-105 shadow-md transition-all cursor-pointer"
              >
                <Plus size={14} /> Request Leave
              </button>
            </>
          )}
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
          {activeTab === "requests" ? (
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Worker</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">From</th>
                  <th className="px-6 py-4">To</th>
                  <th className="px-6 py-4">Days</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[12px]">
                {requests
                  .filter(
                    (r) =>
                      filterType === "All Requests" || r.status === filterType,
                  )
                  .map((r, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-5 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px] uppercase">
                          {r.id}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700">{r.name}</p>
                          <p className="text-[9px] text-slate-400 font-medium">
                            {r.cat}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase tracking-tighter ${r.type === "Annual" ? "bg-blue-50 text-blue-600 border-blue-100" : r.type === "Sick" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-red-50 text-red-600 border-red-100"}`}
                        >
                          {r.type}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-mono text-slate-500">
                        {r.from}
                      </td>
                      <td className="px-6 py-5 font-mono text-slate-500">
                        {r.to}
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-700">
                        {r.days}
                      </td>
                      <td className="px-6 py-5 text-slate-500 font-medium">
                        {r.reason}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${r.status === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : r.status === "Rejected" ? "bg-red-50 text-red-600 border-red-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {r.status === "Pending" ? (
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleAction(r.id, "approve")}
                              className="w-7 h-7 flex items-center justify-center border border-emerald-200 text-emerald-600 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-all cursor-pointer"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handleAction(r.id, "reject")}
                              className="w-7 h-7 flex items-center justify-center border border-red-200 text-red-600 rounded-lg bg-red-50 hover:bg-red-100 transition-all cursor-pointer"
                            >
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
          ) : (
            <div>
              <div className="p-6 border-b border-slate-50 bg-slate-50/20 px-8">
                <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                  Annual Leave Balance — 2025
                </h3>
              </div>
              <table className="w-full text-left">
                <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-4">Worker</th>
                    <th className="px-6 py-4">Entitlement</th>
                    <th className="px-6 py-4">Used</th>
                    <th className="px-6 py-4 text-emerald-600">Remaining</th>
                    <th className="px-8 py-4 w-1/4 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[12px]">
                  {balanceData.map((b, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-5 font-bold text-slate-700">
                        {b.name}
                      </td>
                      <td className="px-6 py-5 font-medium text-slate-500">
                        {b.ent} days
                      </td>
                      <td className="px-6 py-5 font-bold text-amber-600">
                        {b.used} days
                      </td>
                      <td className="px-6 py-5 font-bold text-emerald-600">
                        {b.rem} days
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col items-end">
                          <div className="w-full max-w-[150px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-brand-gold h-full rounded-full"
                              style={{ width: `${b.perc}%` }}
                            ></div>
                          </div>
                          <p className="text-[9px] text-slate-400 font-bold mt-1.5">
                            {b.perc}% used
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* --- LEAVE REQUEST MODAL --- */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 text-left">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white z-10">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                  Submit Leave Request
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                  triggerNotify("Request submitted successfully");
                }}
                className="p-8 space-y-5"
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    Worker
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
                      <option>Mohammed Al Rashidi</option>
                      <option>Ramesh Kumar</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                      Leave Type
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
                        <option>Annual</option>
                        <option>Sick</option>
                        <option>Emergency</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                      From Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                      To Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    Reason
                  </label>
                  <textarea
                    placeholder="Reason for leave..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm h-28 resize-none transition-all"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-105 transition-all cursor-pointer"
                  >
                    Save
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
  const colors = {
    amber: "border-amber-500 text-amber-600",
    emerald: "border-emerald-500 text-emerald-600",
    blue: "border-blue-500 text-blue-600",
    "brand-gold": "border-brand-gold text-brand-gold",
  };
  return (
    <div
      className={`bg-white p-6 rounded-2xl border-t-4 shadow-sm ${colors[color]}`}
    >
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-2xl font-bold mt-1 uppercase tracking-tight text-slate-800">
        {value}
      </h4>
    </div>
  );
}
