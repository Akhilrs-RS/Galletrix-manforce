import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  ExternalLink,
  Users,
} from "lucide-react";

// --- Internal Reusable Table Component ---
const WorkerTable = ({ title, icon: Icon, description, workers }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
    <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
          <Icon size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">
              {title}
            </h3>
            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {workers.length}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">
            {description}
          </p>
        </div>
      </div>
    </div>
    <table className="w-full text-left">
      <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
        <tr>
          <th className="px-6 py-4">Worker</th>
          <th className="px-6 py-4">Category</th>
          <th className="px-6 py-4">Labour Type</th>
          <th className="px-6 py-4">Nationality</th>
          <th className="px-6 py-4">Salary (AED)</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Visa Expiry</th>
          <th className="px-6 py-4 text-right">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50 text-[12px]">
        {workers.map((w, i) => (
          <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
            <td className="px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[11px]">
                {w.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-bold text-slate-800">{w.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{w.id}</p>
              </div>
            </td>
            <td className="px-6 py-4 font-medium text-slate-500">
              {w.category}
            </td>
            <td className="px-6 py-4 text-[10px]">
              <span
                className={`px-2 py-0.5 rounded font-bold border uppercase tracking-tighter ${w.type === "Own" ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-amber-50 text-amber-600 border-amber-100"}`}
              >
                {w.type}
              </span>
            </td>
            <td className="px-6 py-4 text-slate-600 font-medium">
              {w.nationality}
            </td>
            <td className="px-6 py-4 font-bold text-slate-700">{w.salary}</td>
            <td className="px-6 py-4">
              <span
                className={`px-2.5 py-1 rounded text-[10px] font-bold border ${w.status === "Deployed" ? "bg-blue-50 text-blue-600 border-blue-100" : w.status === "On Leave" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}
              >
                {w.status}
              </span>
            </td>
            <td
              className={`px-6 py-4 text-[11px] font-bold ${w.expiry.startsWith("2024") ? "text-red-500" : "text-slate-500"}`}
            >
              {w.expiry}
            </td>
            <td className="px-6 py-4 text-right">
              <button className="text-[11px] font-bold text-slate-400 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all">
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Workers({ role = "admin" }) {
  const ownLabour = [
    {
      name: "Mohammed Al Rashidi",
      id: "W001",
      category: "Electrician",
      type: "Own",
      nationality: "Pakistani",
      salary: "2,800",
      status: "Deployed",
      expiry: "2026-08-14",
    },
    {
      name: "Ramesh Kumar",
      id: "W002",
      category: "Plumber",
      type: "Own",
      nationality: "Indian",
      salary: "2,400",
      status: "Available",
      expiry: "2026-11-30",
    },
    {
      name: "Ahmed Hassan",
      id: "W005",
      category: "Foreman",
      type: "Own",
      nationality: "Egyptian",
      salary: "3,500",
      status: "Deployed",
      expiry: "2027-03-10",
    },
  ];

  const outsourcedLabour = [
    {
      name: "Carlos Fernandez",
      id: "W003",
      category: "Driver",
      type: "Outsourced",
      nationality: "Filipino",
      salary: "2,200",
      status: "Deployed",
      expiry: "2026-12-20",
    },
    {
      name: "Sanjay Patel",
      id: "W004",
      category: "Mason",
      type: "Outsourced",
      nationality: "Indian",
      salary: "2,100",
      status: "On Leave",
      expiry: "2026-09-15",
    },
    {
      name: "Bibek Thapa",
      id: "W006",
      category: "Helper",
      type: "Outsourced",
      nationality: "Nepalese",
      salary: "1,800",
      status: "Available",
      expiry: "2026-07-05",
    },
  ];

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Search and Action Bar */}
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
          <div className="flex-1 flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 group focus-within:border-brand-gold transition-all">
            <Search
              size={16}
              className="text-slate-400 mr-3 group-focus-within:text-brand-gold"
            />
            <input
              type="text"
              placeholder="Search by name, ID, category..."
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-bold text-slate-600 cursor-pointer">
              All Status <ChevronDown size={14} />
            </div>
            <button className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg transition-all">
              <Plus size={16} /> Add Worker
            </button>
          </div>
        </div>

        <WorkerTable
          title="Own Labour"
          icon={Users}
          description="Directly employed workers"
          workers={ownLabour}
        />
        <WorkerTable
          title="Outsourced Labour"
          icon={ExternalLink}
          description="Third-party / contract workers"
          workers={outsourcedLabour}
        />
      </div>
    </DashboardLayout>
  );
}
