import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { X, ChevronDown, Check, Plus } from "lucide-react";

export default function MyLeaves() {
  // --- 1. STATE MANAGEMENT ---
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // --- 2. ACTIONS ---
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveLeave = (e) => {
    e.preventDefault();
    setShowApplyModal(false);
    triggerNotify("Leave application submitted successfully");
  };

  return (
    <DashboardLayout role="worker">
      <div className="space-y-6 relative">
        {/* --- SUCCESS NOTIFICATION --- */}
        {notification && (
          <div className="fixed top-24 right-12 z-[100] animate-in slide-in-from-right-4 duration-300">
            <div className="bg-[#1e293b] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
              <Check size={16} className="text-emerald-400" />
              <span className="text-[13px] font-bold tracking-tight">
                {notification}
              </span>
            </div>
          </div>
        )}

        {/* --- LEAVE STAT CARDS --- */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard
            title="Annual Entitlement"
            value="30"
            subtext="days per year"
          />
          <StatCard
            title="Days Used"
            value="6"
            subtext="6 of 30 days used (20%)"
            colorClass="text-slate-500"
          />
          <StatCard
            title="Days Remaining"
            value="24"
            colorClass="text-emerald-600"
          />
        </div>

        {/* --- LEAVE REQUESTS TABLE --- */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center px-8 bg-slate-50/30">
            <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
              My Leave Requests
            </h3>
            <button
              onClick={() => setShowApplyModal(true)}
              className="bg-brand-gold text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-sm hover:brightness-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus size={14} /> Apply for Leave
            </button>
          </div>

          <table className="w-full text-left text-[11px]">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Request ID</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4 text-center">Dates</th>
                <th className="px-6 py-4 text-center">Days</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50 transition-colors font-medium">
                <td className="px-8 py-5 text-slate-400">LV005</td>
                <td className="px-6 py-5 text-center">
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                    Annual
                  </span>
                </td>
                <td className="px-6 py-5 text-center text-slate-500">
                  2025-04-10 → 2025-04-15
                </td>
                <td className="px-6 py-5 text-center font-bold">6</td>
                <td className="px-6 py-5 text-slate-500">Eid holidays</td>
                <td className="px-8 py-5 text-right">
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-100">
                    Approved
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- APPLY FOR LEAVE MODAL (Matched to Screenshot) --- */}
        {showApplyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                  Apply for Leave
                </h3>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={handleSaveLeave}
                className="p-8 space-y-6 text-left"
              >
                {/* Worker (Prefilled) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Worker
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Mohammed Al Rashidi"
                    className="w-full px-4 py-3 bg-[#fdfaf3] border border-amber-100 rounded-xl text-sm font-medium text-slate-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Leave Type
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
                        <option>Annual</option>
                        <option>Sick</option>
                        <option>Emergency</option>
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      From Date
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      To Date
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Reason
                  </label>
                  <textarea
                    placeholder="Reason for leave..."
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm h-32 resize-none transition-all"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-8 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-10 py-3 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-105 transition-all cursor-pointer"
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

function StatCard({ title, value, subtext, colorClass }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm h-36 flex flex-col justify-between">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <div className="flex flex-col">
        <h4 className={`text-4xl font-black ${colorClass || "text-slate-800"}`}>
          {value}
        </h4>
        {subtext && (
          <p className="text-[10px] text-slate-400 font-bold mt-1">{subtext}</p>
        )}
      </div>
    </div>
  );
}
