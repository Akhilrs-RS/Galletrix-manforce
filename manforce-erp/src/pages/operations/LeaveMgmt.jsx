import React, { useState, useEffect } from "react";
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
      setShowModal(false);
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
            <div>{/* ... balance tab content ... */}</div>
          )}
        </div>

        {/* --- LEAVE REQUEST MODAL --- */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden p-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Submit Leave Request
              </h3>
              <form onSubmit={submitRequest} className="space-y-4">
                <select
                  name="worker_id"
                  className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
                  required
                >
                  <option value="">Select Worker</option>
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
                <select
                  name="type"
                  className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
                >
                  <option>Annual</option>
                  <option>Sick</option>
                  <option>Emergency</option>
                </select>
                <input
                  type="date"
                  name="from_date"
                  className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
                  required
                />
                <input
                  type="date"
                  name="to_date"
                  className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
                  required
                />
                <input
                  type="number"
                  name="days"
                  placeholder="Total Days"
                  className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
                  required
                />
                <textarea
                  name="reason"
                  placeholder="Reason..."
                  className="w-full p-3 bg-slate-50 border rounded-xl text-sm h-20"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-gold text-white rounded-xl font-bold text-xs"
                >
                  Submit
                </button>
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
