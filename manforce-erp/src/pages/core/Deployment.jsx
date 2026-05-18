import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Check, Plus, X, ChevronDown, Search } from "lucide-react";
import api from "../../utils/api";

export default function Deployment({ role = "admin" }) {
  const [notification, setNotification] = useState(null);
  const [deployed, setDeployed] = useState([]);
  const [available, setAvailable] = useState([]);
  const [deployments, setDeployments] = useState([]);
  
  const [workOrders, setWorkOrders] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [duration, setDuration] = useState("30");
  const [searchWorkerQuery, setSearchWorkerQuery] = useState("");
  const [showWorkerDropdown, setShowWorkerDropdown] = useState(false);

  const fetchData = async () => {
    try {
      const [wRes, dRes, woRes] = await Promise.all([
        api.get("/workers"),
        api.get("/deployments"),
        api.get("/work-orders"),
      ]);
      setDeployed(wRes.data.filter(w => w.status === 'Deployed'));
      setAvailable(wRes.data.filter(w => w.status === 'Available'));
      setDeployments(dRes.data);
      setWorkOrders(woRes.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenAssignModal = (worker) => {
    setSelectedWorkers([worker]);
    setShowAssignModal(true);
  };

  const handleAssignMultiple = async (e) => {
    e.preventDefault();
    if (!selectedWorkOrder) return alert("Please select a work order.");
    if (selectedWorkers.length === 0) return alert("Please select at least one worker.");
    if (selectedWorkers.length > 10) return alert("Cannot select more than 10 workers.");

    try {
      const workOrderDetails = JSON.parse(selectedWorkOrder);
      await api.post("/deployments/assign-multiple", {
        worker_ids: selectedWorkers.map((w) => w.id),
        site_name: workOrderDetails.site_name,
        client_name: workOrderDetails.client_name,
        duration: parseInt(duration) || 30
      });

      setNotification("Workers assigned successfully");
      setShowAssignModal(false);
      setSelectedWorkers([]);
      setSelectedWorkOrder("");
      setDuration("30");
      fetchData();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error("Failed to assign workers:", err);
      alert("Failed to deploy workers.");
    }
  };

  const handleCompleteDeployment = async (workerId) => {
    try {
      await api.post("/deployments/complete-worker", { worker_id: workerId });
      setNotification("Deployment marked as completed");
      fetchData();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error("Failed to complete deployment:", err);
    }
  };

  return (
    <DashboardLayout role={role}>
      <div className="relative">
        {/* SUCCESS NOTIFICATION (Matches Screenshot) */}
        {notification && (
          <div className="fixed top-24 right-12 z-50 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-[#1e293b] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
              <Check size={18} className="text-emerald-400" />
              <span className="text-[13px] font-bold tracking-tight">
                {notification}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-8">
          {/* LEFT: AVAILABLE WORKERS (2 Columns Wide) */}
          <div className="col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-fit">
            <div className="p-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">
              <span className="text-emerald-500 text-lg">✅</span>
              <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
                Available ({available.length})
              </h3>
            </div>

            <div className="divide-y divide-slate-50">
              {available.map((w, i) => (
                <div
                  key={i}
                  className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px] shadow-sm shrink-0">
                      {w.worker_id}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-700">
                        {w.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {w.category} · {w.nationality}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenAssignModal(w)}
                    className="bg-brand-gold text-white px-5 py-1.5 rounded-lg text-[10px] font-bold hover:brightness-110 shadow-lg shadow-brand-gold/20 transition-all cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DEPLOYED WORKERS (3 Columns Wide) */}
          <div className="col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-fit">
            <div className="p-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">
              <span className="text-red-500 text-lg">📍</span>
              <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
                Deployed ({deployed.length})
              </h3>
            </div>

            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Site</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {deployed.map((w, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 transition-colors text-[11px]"
                  >
                    <td className="px-6 py-5 flex items-center gap-4 text-left">
                      <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px] shadow-sm shrink-0">
                        {w.worker_id}
                      </div>
                      <span className="font-bold text-slate-700">{w.name}</span>
                    </td>
                    <td className="px-6 py-5 font-medium text-slate-500 text-left">
                      {w.client_name || 'N/A'}
                    </td>
                    <td className="px-6 py-5 text-left">
                      <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {w.site || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleCompleteDeployment(w.id)}
                        className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 px-3 py-1.5 rounded-lg text-[9px] font-bold cursor-pointer transition-all"
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- ASSIGN MULTIPLE LABOURS MODAL --- */}
        {showAssignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100 flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight text-left">
                    Deploy Labours / Workers
                  </h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-left mt-0.5">
                    Assign Up to 10 workers at once
                  </p>
                </div>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleAssignMultiple} className="p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-left">
                {/* 1. Work Order Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    1. Destination Work Order
                  </label>
                  <select
                    required
                    value={selectedWorkOrder}
                    onChange={(e) => setSelectedWorkOrder(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm cursor-pointer"
                  >
                    <option value="">Select a work order...</option>
                    {workOrders.map((wo) => (
                      <option key={wo.id} value={JSON.stringify({ site_name: wo.site_name, client_name: wo.client_name })}>
                        {wo.site_name} ({wo.client_name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Labour Search Dropdown */}
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    2. Labours / Workers Selection
                  </label>

                  {/* Pills List */}
                  <div className="flex flex-wrap gap-1.5 min-h-[44px] p-2.5 bg-slate-50/50 rounded-xl border border-slate-200/50 mb-2">
                    {selectedWorkers.length === 0 ? (
                      <span className="text-[11px] text-slate-400 p-1">No workers chosen yet. Search and add below.</span>
                    ) : (
                      selectedWorkers.map((w) => (
                        <span key={w.id} className="inline-flex items-center gap-1 bg-brand-navy text-white text-[9px] font-black px-2 py-0.5 rounded border border-slate-800">
                          {w.name} (ID: {w.worker_id})
                          <button
                            type="button"
                            onClick={() => setSelectedWorkers(selectedWorkers.filter((x) => x.id !== w.id))}
                            className="hover:text-red-400 font-bold ml-1 text-[11px] leading-none shrink-0"
                          >
                            ×
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Search Bar Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Name, ID, or Category..."
                      value={searchWorkerQuery}
                      onChange={(e) => {
                        setSearchWorkerQuery(e.target.value);
                        setShowWorkerDropdown(true);
                      }}
                      onFocus={() => setShowWorkerDropdown(true)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                    />
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Dropdown Options */}
                  {showWorkerDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl max-h-[180px] overflow-y-auto custom-scrollbar animate-in fade-in duration-100">
                      <div className="p-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                          Queue: {selectedWorkers.length} / 10 selected
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowWorkerDropdown(false)}
                          className="text-[9px] font-bold text-brand-gold hover:underline cursor-pointer"
                        >
                          Close List
                        </button>
                      </div>
                      {available
                        .filter(
                          (w) =>
                            !searchWorkerQuery ||
                            w.name.toLowerCase().includes(searchWorkerQuery.toLowerCase()) ||
                            w.worker_id.toLowerCase().includes(searchWorkerQuery.toLowerCase()) ||
                            w.category.toLowerCase().includes(searchWorkerQuery.toLowerCase())
                        )
                        .map((w) => {
                          const isChecked = selectedWorkers.some((x) => x.id === w.id);
                          return (
                            <div
                              key={w.id}
                              onClick={() => {
                                if (isChecked) {
                                  setSelectedWorkers(selectedWorkers.filter((x) => x.id !== w.id));
                                } else {
                                  if (selectedWorkers.length >= 10) {
                                    return alert("Maximum allocation limit reached: up to 10 workers can be assigned.");
                                  }
                                  setSelectedWorkers([...selectedWorkers, w]);
                                }
                              }}
                              className={`px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0 ${
                                isChecked ? "bg-brand-gold/5 font-semibold" : ""
                              }`}
                            >
                              <div className="text-left">
                                <p className="text-[12px] font-bold text-slate-700">{w.name} (ID: {w.worker_id})</p>
                                <p className="text-[10px] text-slate-400 font-medium">{w.category} · {w.nationality}</p>
                              </div>
                              <div className="w-4 h-4 flex items-center justify-center rounded border border-slate-200 bg-white shrink-0">
                                {isChecked && <Check size={10} className="text-brand-gold font-bold" />}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* 3. Duration Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    3. Deployment Duration (Days)
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder="e.g. 30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="px-5 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all cursor-pointer"
                  >
                    Deploy Labours
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
