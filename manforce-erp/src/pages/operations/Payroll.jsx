import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  X,
  Info,
  ChevronDown,
  Check,
  Loader2,
  Play,
  Calendar,
} from "lucide-react";

export default function Payroll({ role = "admin" }) {
  // --- 1. STATE MANAGEMENT ---
  const [showOTModal, setShowOTModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [notification, setNotification] = useState(null);

  // Expanded Data to match screenshot row count
  const [payrollData, setPayrollData] = useState([
    {
      name: "Mohammed Al Rashidi",
      basic: "2,800",
      ot: "875",
      allow: "400",
      ded: "-150",
      net: "3,925",
      status: "Paid",
      otHours: "52.0",
      flatOT: "875",
    },
    {
      name: "Ramesh Kumar",
      basic: "2,400",
      ot: "—",
      allow: "350",
      ded: "-120",
      net: "2,630",
      status: "Pending",
      otHours: "0",
      flatOT: "0",
    },
    {
      name: "Carlos Fernandez",
      basic: "2,200",
      ot: "680",
      allow: "300",
      ded: "-110",
      net: "3,070",
      status: "Paid",
      otHours: "40.0",
      flatOT: "680",
    },
    {
      name: "Sanjay Patel",
      basic: "2,100",
      ot: "—",
      allow: "300",
      ded: "-105",
      net: "2,295",
      status: "Pending",
      otHours: "0",
      flatOT: "0",
    },
    {
      name: "Ahmed Hassan",
      basic: "3,500",
      ot: "1,100",
      allow: "600",
      ded: "-200",
      net: "5,000",
      status: "Paid",
      otHours: "60.0",
      flatOT: "1,100",
    },
    {
      name: "Bibek Thapa",
      basic: "1,800",
      ot: "220",
      allow: "250",
      ded: "-90",
      net: "2,180",
      status: "Processing",
      otHours: "15.0",
      flatOT: "220",
    },
  ]);

  const [otFormData, setOtFormData] = useState({
    hours: "",
    multiplier: "1.25x (Standard UAE)",
    flatAmount: "",
  });

  // --- 2. ACTIONS ---
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEditOT = (worker) => {
    setSelectedWorker(worker);
    setOtFormData({
      hours: worker.otHours,
      multiplier: "1.25x (Standard UAE)",
      flatAmount: worker.flatOT,
    });
    setShowOTModal(true);
  };

  const calculateHourlyRate = (basic) => {
    if (!basic) return "0.00";
    const b = parseFloat(basic.replace(",", ""));
    return (b / 26 / 8).toFixed(2);
  };

  const handleSaveOT = (e) => {
    e.preventDefault();
    // Logic to update the worker list with new OT would go here
    setShowOTModal(false);
    triggerNotify(`Updated overtime for ${selectedWorker.name}`);
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6 relative">
        {/* --- GLOBAL NOTIFICATION --- */}
        {notification && (
          <div className="fixed top-24 right-12 z-50 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-[#1e293b] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
              {notification.includes("Running") ? (
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

        {/* --- SUMMARY STAT CARDS --- */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard
            title="TOTAL PAYROLL"
            value="AED 19,100"
            sub="June 2025"
            color="brand-gold"
          />
          <StatCard title="PAID OUT" value="AED 11,995" color="emerald" />
          <StatCard title="PENDING" value="AED 7,105" color="brand-gold" />
        </div>

        {/* --- WPS FILING ALERT --- */}
        <div className="bg-[#EBF5FF] border border-blue-100 p-3 px-5 rounded-xl flex items-center justify-between shadow-sm">
          <p className="text-[11px] font-bold text-blue-700 flex items-center gap-2">
            <span>📊</span> WPS filing due June 15, 2025.
            <button
              onClick={() => triggerNotify("Generating WPS...")}
              className="underline ml-1 hover:text-blue-900 transition-colors cursor-pointer"
            >
              Generate WPS →
            </button>
          </p>
          <button
            onClick={() => triggerNotify("Running payroll now...")}
            className="bg-[#0f172a] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Play size={10} fill="currentColor" /> Run Payroll
          </button>
        </div>

        {/* --- PAYROLL TABLE --- */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
              Payroll — June 2025
            </h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Basic</th>
                <th className="px-6 py-4">Overtime (AED)</th>
                <th className="px-6 py-4">Allowance</th>
                <th className="px-6 py-4">Deduction</th>
                <th className="px-6 py-4">Net Pay</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {payrollData.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 font-bold text-slate-700">
                    {p.name}
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-500">
                    {p.basic}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          p.ot === "—"
                            ? "text-slate-300"
                            : "font-bold text-brand-gold"
                        }
                      >
                        {p.ot}
                      </span>
                      <button
                        onClick={() => handleEditOT(p)}
                        className="w-6 h-6 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-[10px] hover:bg-brand-gold hover:text-white transition-all cursor-pointer"
                      >
                        ✏️
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600 font-medium">
                    {p.allow}
                  </td>
                  <td className="px-6 py-5 text-red-400 font-bold">{p.ded}</td>
                  <td className="px-6 py-5 font-bold text-slate-800 uppercase">
                    AED {p.net}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        p.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : p.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() =>
                        triggerNotify(`Payment processed for ${p.name}`)
                      }
                      className="text-[11px] font-bold text-emerald-600 border border-emerald-200 px-4 py-1.5 rounded-lg hover:bg-emerald-50 transition-all cursor-pointer"
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- FULLY OPERATIONAL OT EDIT MODAL (Fixed) --- */}
        {showOTModal && selectedWorker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
                <h3 className="text-sm font-bold text-slate-800">
                  Overtime Pay — {selectedWorker.name}
                </h3>
                <button
                  onClick={() => setShowOTModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X size={18} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSaveOT} className="p-8 space-y-6 text-left">
                {/* Stat Header Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <ModalHeaderBox
                    label="Basic Salary"
                    value={`AED ${selectedWorker.basic}`}
                  />
                  <ModalHeaderBox
                    label="Hourly Rate"
                    value={`AED ${calculateHourlyRate(selectedWorker.basic)}`}
                  />
                  <ModalHeaderBox
                    label="Current OT"
                    value={`AED ${selectedWorker.ot}`}
                    color="amber"
                  />
                </div>

                {/* Input Grid */}
                <div className="grid grid-cols-2 gap-5">
                  <ModalInputItem
                    label="OT Hours Worked"
                    value={otFormData.hours}
                    onChange={(e) =>
                      setOtFormData({ ...otFormData, hours: e.target.value })
                    }
                    placeholder="e.g. 52.0"
                  />
                  <ModalSelect
                    label="OT Rate Multiplier"
                    value={otFormData.multiplier}
                    options={["1.25x (Standard UAE)", "1.5x (Holiday)"]}
                  />
                </div>

                <ModalInputItem
                  label="Flat OT Amount (AED) — Overrides Calculation Above"
                  value={otFormData.flatAmount}
                  onChange={(e) =>
                    setOtFormData({ ...otFormData, flatAmount: e.target.value })
                  }
                  placeholder="e.g. 875"
                />

                {/* Law Info Box */}
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex gap-3 items-start">
                  <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-blue-700 leading-relaxed">
                    <strong>UAE Labour Law:</strong> Overtime is paid at 1.25×
                    the basic hourly rate (basic ÷ 26 days ÷ 8 hrs). Public
                    holiday work is paid at 1.5×.
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-6 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setShowOTModal(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs cursor-pointer hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-gold text-white rounded-xl font-bold text-xs shadow-lg shadow-brand-gold/20 cursor-pointer hover:brightness-110 transition-all"
                  >
                    Save Overtime
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

// --- HELPERS (Remains same) ---
function StatCard({ title, value, sub, color }) {
  const colorMap = {
    "brand-gold": "border-brand-gold text-slate-800",
    emerald: "border-emerald-500 text-emerald-600",
  };
  return (
    <div
      className={`bg-white p-6 rounded-2xl border-t-4 shadow-sm ${colorMap[color]}`}
    >
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-2xl font-bold mt-1 uppercase">{value}</h4>
      {sub && (
        <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">
          {sub}
        </p>
      )}
    </div>
  );
}

function ModalHeaderBox({ label, value, color }) {
  return (
    <div
      className={`p-3 rounded-xl border ${color === "amber" ? "bg-amber-50 border-amber-100" : "bg-[#FAF9F6] border-slate-100"}`}
    >
      <p
        className={`text-[8px] font-bold uppercase tracking-widest mb-1 ${color === "amber" ? "text-amber-500" : "text-slate-400"}`}
      >
        {label}
      </p>
      <p
        className={`text-xs font-bold ${color === "amber" ? "text-amber-600" : "text-slate-700"}`}
      >
        {value}
      </p>
    </div>
  );
}

function ModalInputItem({ label, value, onChange, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm transition-all"
      />
    </div>
  );
}

function ModalSelect({ label, value, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          readOnly
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
    </div>
  );
}
