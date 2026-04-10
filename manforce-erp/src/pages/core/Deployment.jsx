import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Check } from "lucide-react";

export default function Deployment({ role = "admin" }) {
  // --- STATE MANAGEMENT ---
  const [notification, setNotification] = useState(null);

  // Simulated Data based on screenshot
  const deployedWorkers = [
    {
      name: "Mohammed Al Rashidi",
      id: "MA",
      client: "Al Futtaim Group",
      site: "Downtown Dubai",
    },
    {
      name: "Carlos Fernandez",
      id: "CF",
      client: "Emaar Properties",
      site: "Business Bay",
    },
    {
      name: "Ahmed Hassan",
      id: "AH",
      client: "DAMAC Properties",
      site: "Arjan",
    },
  ];

  const availableWorkers = [
    { name: "Ramesh Kumar", id: "RK", role: "Plumber", nat: "Indian" },
    { name: "Bibek Thapa", id: "BT", role: "Helper", nat: "Nepalese" },
  ];

  // --- ACTIONS ---
  const handleAssign = (workerName) => {
    setNotification(`Assigned ${workerName}`);
    // Auto-hide notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
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
                Deployed ({deployedWorkers.length})
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
                {deployedWorkers.map((w, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 transition-colors text-[11px]"
                  >
                    <td className="px-6 py-5 flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                        {w.id}
                      </div>
                      <span className="font-bold text-slate-700">{w.name}</span>
                    </td>
                    <td className="px-6 py-5 font-medium text-slate-500">
                      {w.client}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {w.site}
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
                Available ({availableWorkers.length})
              </h3>
            </div>

            <div className="divide-y divide-slate-50">
              {availableWorkers.map((w, i) => (
                <div
                  key={i}
                  className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                      {w.id}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-700">
                        {w.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {w.role} · {w.nat}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAssign(w.name)}
                    className="bg-brand-gold text-white px-5 py-1.5 rounded-lg text-[10px] font-bold hover:brightness-110 shadow-lg shadow-brand-gold/20 transition-all cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
