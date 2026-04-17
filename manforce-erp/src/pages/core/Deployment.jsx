import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Check } from "lucide-react";
import api from "../../utils/api";

export default function Deployment({ role = "admin" }) {
  const [notification, setNotification] = useState(null);
  const [deployed, setDeployed] = useState([]);
  const [available, setAvailable] = useState([]);
  const [deployments, setDeployments] = useState([]);

  const fetchData = async () => {
    try {
      const [wRes, dRes] = await Promise.all([api.get("/workers"), api.get("/deployments")]);
      setDeployed(wRes.data.filter(w => w.status === 'Deployed'));
      setAvailable(wRes.data.filter(w => w.status === 'Available'));
      setDeployments(dRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAssign = async (workerId) => {
    if(deployments.length === 0) return alert("No active deployments found");
    try {
        await api.post("/deployments/assign", { worker_id: workerId, deployment_id: deployments[0].id });
        setNotification("Worker assigned successfully");
        fetchData();
        setTimeout(() => setNotification(null), 3000);
    } catch (err) { console.error(err); }
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
          {/* LEFT: DEPLOYED WORKERS (3 Columns Wide) */}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {deployed.map((w, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 transition-colors text-[11px]"
                  >
                    <td className="px-6 py-5 flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                        {w.worker_id}
                      </div>
                      <span className="font-bold text-slate-700">{w.name}</span>
                    </td>
                    <td className="px-6 py-5 font-medium text-slate-500">
                      {w.client_name || 'N/A'}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {w.site || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
              </div>

              {/* RIGHT: AVAILABLE WORKERS (2 Columns Wide) */}
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
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
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
                    onClick={() => handleAssign(w.id)}
                    className="bg-brand-gold text-white px-5 py-1.5 rounded-lg text-[10px] font-bold hover:brightness-110 shadow-lg shadow-brand-gold/20 transition-all cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              ))}
              </div>
              </div>        </div>
      </div>
    </DashboardLayout>
  );
}
