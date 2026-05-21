import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Plus, X, ChevronDown, Check } from "lucide-react";
import api from "../../utils/api";

export default function LeaveMgmt({ role = "admin" }) {
  const [activeTab, setActiveTab] = useState("requests");
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState("All Requests");
  const [notification, setNotification] = useState(null);
  const [requests, setRequests] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [daysCount, setDaysCount] = useState("");

  const [balances, setBalances] = useState([
    { worker: "Mohammed Al Rashidi", entitlement: 30, used: 6 },
    { worker: "Ramesh Kumar", entitlement: 30, used: 0 },
    { worker: "Carlos Fernandez", entitlement: 30, used: 7 },
    { worker: "Sanjay Patel", entitlement: 30, used: 0 },
    { worker: "Ahmed Hassan", entitlement: 30, used: 0 },
    { worker: "Bibek Thapa", entitlement: 30, used: 0 },
  ]);

  const calculatedBalances = useMemo(() => {
    return balances.map((bal) => {
      const approvedAnnualDays = requests
        .filter((r) => r.worker_name === bal.worker && r.status === "Approved" && r.type === "Annual")
        .reduce((sum, r) => sum + Number(r.days || 0), 0);

      const totalUsed = bal.used + approvedAnnualDays;
      const remaining = bal.entitlement - totalUsed;
      const pctUsed = Math.min(100, Math.round((totalUsed / bal.entitlement) * 100));

      return {
        ...bal,
        used: totalUsed,
        remaining: remaining > 0 ? remaining : 0,
        pctUsed,
      };
    });
  }, [balances, requests]);

  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDaysCount(diffDays > 0 ? diffDays : "");
    } else {
      setDaysCount("");
    }
  }, [fromDate, toDate]);

  const handleCloseModal = () => {
    setShowModal(false);
    setFromDate("");
    setToDate("");
    setDaysCount("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rRes, wRes] = await Promise.all([
        api.get("/leave-requests"),
        api.get("/workers"),
      ]);
      setRequests(rRes.data);
      setWorkers(wRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleAction = async (id, status) => {
    try {
      await api.put(`/leave-requests/${id}`, { status });
      fetchData();
      triggerNotify(`Request ${status} successfully`);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await api.post("/leave-requests", { ...data, status: "Pending" });
      handleCloseModal();
      fetchData();
      triggerNotify("Request submitted successfully");
    } catch (err) {
      console.error("Error submitting request:", err);
    }
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
                          {r.display_id || "—"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700">
                            {r.worker_name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase tracking-tighter ${r.type === "Annual" ? "bg-blue-50 text-blue-600" : r.type === "Sick" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}
                        >
                          {r.type}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-mono text-slate-500">
                        {r.from_date ? r.from_date.split("T")[0] : "—"}
                      </td>
                      <td className="px-6 py-5 font-mono text-slate-500">
                        {r.to_date ? r.to_date.split("T")[0] : "—"}
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-700">
                        {r.days}
                      </td>
                      <td className="px-6 py-5 text-slate-500 font-medium">
                        {r.reason}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${r.status === "Approved" ? "bg-emerald-50 text-emerald-600" : r.status === "Rejected" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {r.status === "Pending" ? (
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleAction(r.id, "Approved")}
                              className="w-7 h-7 flex items-center justify-center border border-emerald-200 text-emerald-600 rounded-lg bg-emerald-50 hover:bg-emerald-100"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handleAction(r.id, "Rejected")}
                              className="w-7 h-7 flex items-center justify-center border border-red-200 text-red-600 rounded-lg bg-red-50 hover:bg-red-100"
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
            <div className="text-left">
              {/* Header inside the container */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/20">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                  Annual Leave Balance — 2025
                </h3>
              </div>

              {/* Table */}
              <table className="w-full text-left">
                <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-4">Worker</th>
                    <th className="px-6 py-4">Entitlement</th>
                    <th className="px-6 py-4">Used</th>
                    <th className="px-6 py-4">Remaining</th>
                    <th className="px-8 py-4 text-left">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {calculatedBalances.map((bal, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-8 py-5 font-bold text-slate-800">
                        {bal.worker}
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-slate-800">{bal.entitlement}</span>{" "}
                        <span className="text-slate-400 font-normal">days</span>
                      </td>
                      <td className="px-6 py-5 text-amber-700 font-bold">
                        <span>{bal.used}</span>{" "}
                        <span className="text-slate-400 font-normal">days</span>
                      </td>
                      <td className="px-6 py-5 text-emerald-600 font-bold">
                        <span>{bal.remaining}</span>{" "}
                        <span className="text-slate-400 font-normal">days</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="w-48">
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${bal.pctUsed}%` }}
                              className="h-full bg-brand-gold rounded-full"
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                            {bal.pctUsed}% used
                          </span>
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
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 text-left border border-slate-100">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Submit Leave Request</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Create a new worker leave application</p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={submitRequest} className="p-6 space-y-4">
                {/* Select Worker */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Select Worker
                  </label>
                  <div className="relative">
                    <select
                      name="worker_id"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Choose Worker...</option>
                      {workers.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.name} ({w.display_id || "No ID"})
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Leave Type */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Leave Type
                  </label>
                  <div className="relative">
                    <select
                      name="type"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold appearance-none cursor-pointer"
                    >
                      <option value="Annual">Annual Leave</option>
                      <option value="Sick">Sick Leave</option>
                      <option value="Emergency">Emergency Leave</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Dates & Days Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Start Date
                    </label>
                    <input
                      required
                      type="date"
                      name="from_date"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      End Date
                    </label>
                    <input
                      required
                      type="date"
                      name="to_date"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Total Days */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Total Days (Auto Calculated)
                  </label>
                  <input
                    required
                    type="number"
                    name="days"
                    placeholder="Total Days"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                    value={daysCount}
                    onChange={(e) => setDaysCount(e.target.value)}
                  />
                </div>

                {/* Reason */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Reason / Details
                  </label>
                  <textarea
                    required
                    name="reason"
                    placeholder="Provide details for this leave application..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all h-20 resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all cursor-pointer shadow-md shadow-brand-gold/10 text-center"
                  >
                    Submit Request
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
