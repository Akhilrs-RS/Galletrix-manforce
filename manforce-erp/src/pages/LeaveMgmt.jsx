import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Truck,
  CalendarCheck,
  UserCheck,
  Wallet,
  FileText,
  ClipboardList,
  FileStack,
  BarChart3,
  Lock,
  LogOut,
  Bell,
  ShieldCheck,
} from "lucide-react";

// --- Reusable Sidebar Item Component ---
const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-6 py-2.5 cursor-pointer transition-all duration-200 ${
      active
        ? "bg-[#334155] border-r-4 border-brand-gold"
        : "hover:bg-slate-800"
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon
        size={17}
        className={active ? "text-brand-gold" : "text-slate-400"}
      />
      <span
        className={`text-[13px] ${active ? "text-white font-medium" : "text-slate-400"}`}
      >
        {label}
      </span>
    </div>
    {badge && (
      <span className="bg-brand-gold text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
        {badge}
      </span>
    )}
  </div>
);

export default function LeaveMgmt() {
  const navigate = useNavigate();
  const location = useLocation();

  const requests = [
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
  ];

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-900">
      {/* 1. Sidebar Navigation */}
      <aside className="w-64 bg-brand-navy flex flex-col shadow-2xl shrink-0 z-20">
        <div className="p-6 mb-4 flex items-center gap-3">
          <div className="bg-brand-gold p-2 rounded-lg text-white font-bold text-xl shadow-sm">
            M
          </div>
          <div>
            <h1 className="text-white font-bold text-sm tracking-tight leading-none">
              ManForce ERP
            </h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">
              Dubai · UAE
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto pb-6 custom-scrollbar">
          <p className="px-6 text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">
            Core
          </p>
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={location.pathname === "/dashboard"}
            onClick={() => navigate("/dashboard")}
          />
          <SidebarItem
            icon={Users}
            label="Workers"
            badge="142"
            active={location.pathname === "/workers"}
            onClick={() => navigate("/workers")}
          />
          <SidebarItem
            icon={Briefcase}
            label="Clients"
            active={location.pathname === "/clients"}
            onClick={() => navigate("/clients")}
          />
          <SidebarItem
            icon={Truck}
            label="Deployment"
            active={location.pathname === "/deployment"}
            onClick={() => navigate("/deployment")}
          />

          <p className="px-6 text-[10px] font-bold text-slate-500 uppercase mt-8 mb-3 tracking-widest">
            Operations
          </p>
          <SidebarItem
            icon={CalendarCheck}
            label="Attendance"
            active={location.pathname === "/attendance"}
            onClick={() => navigate("/attendance")}
          />
          <SidebarItem
            icon={UserCheck}
            label="Recruitment"
            badge="7"
            active={location.pathname === "/recruitment"}
            onClick={() => navigate("/recruitment")}
          />
          <SidebarItem
            icon={Wallet}
            label="Payroll"
            active={location.pathname === "/payroll"}
            onClick={() => navigate("/payroll")}
          />
          <SidebarItem
            icon={FileText}
            label="Invoices"
            active={location.pathname === "/invoices"}
            onClick={() => navigate("/invoices")}
          />
          <SidebarItem
            icon={ClipboardList}
            label="Leave Mgmt"
            badge="3"
            active={location.pathname === "/leave-mgmt"}
            onClick={() => navigate("/leave-mgmt")}
          />

          <p className="px-6 text-[10px] font-bold text-slate-500 uppercase mt-8 mb-3 tracking-widest">
            Compliance
          </p>
          <SidebarItem
            icon={FileStack}
            label="Documents"
            badge="3"
            active={location.pathname === "/documents"}
            onClick={() => navigate("/documents")}
          />
          <SidebarItem
            icon={BarChart3}
            label="Reports"
            active={location.pathname === "/reports"}
            onClick={() => navigate("/reports")}
          />

          <p className="px-6 text-[10px] font-bold text-slate-500 uppercase mt-8 mb-3 tracking-widest">
            System
          </p>
          <SidebarItem
            icon={Lock}
            label="Roles & Access"
            active={location.pathname === "/roles"}
            onClick={() => navigate("/roles")}
          />
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 bg-[#1e293b] p-3 rounded-xl mb-3 border border-slate-700/50 shadow-inner">
            <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white font-bold text-xs shadow-sm">
              AD
            </div>
            <div className="flex-1">
              <p className="text-xs text-white font-bold">Admin</p>
              <p className="text-[10px] text-slate-500 font-medium">
                Super Admin
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-red-400 text-xs font-bold w-full p-2.5 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Leave Management</h2>
          <div className="flex items-center gap-3">
            <div className="bg-amber-100/50 text-amber-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-amber-200">
              <ShieldCheck size={14} /> Admin
            </div>
            <div className="relative bg-slate-100 p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-all cursor-pointer">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 text-[8px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">
                5
              </span>
            </div>
            <button className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer">
              + Request Leave
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1500px] mx-auto space-y-6">
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { t: "PENDING REQUESTS", v: "3" },
              { t: "APPROVED", v: "2" },
              { t: "ON LEAVE TODAY", v: "1" },
              { t: "TOTAL DAYS TAKEN", v: "13" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border-t-4 border-brand-gold shadow-sm"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {s.t}
                </p>
                <h4 className="text-3xl font-bold mt-2 text-slate-800">
                  {s.v}
                </h4>
              </div>
            ))}
          </div>

          {/* View Tabs */}
          <div className="flex gap-8 border-b border-slate-200 px-2">
            <button className="pb-3 text-xs font-bold text-brand-gold border-b-2 border-brand-gold uppercase tracking-widest">
              Leave Requests
            </button>
            <button className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors cursor-pointer">
              Balance & Entitlements
            </button>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">From</th>
                  <th className="px-6 py-4">To</th>
                  <th className="px-6 py-4">Days</th>
                  <th className="px-6 py-4 text-center">Reason</th>
                  <th className="px-6 py-4 text-right">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[12px]">
                {requests.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px]">
                        {r.id}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{r.name}</p>
                        <p className="text-[9px] text-slate-400 font-medium">
                          {r.cat}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-tighter ${
                          r.type === "Annual"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : r.type === "Sick"
                              ? "bg-amber-50 text-amber-600 border-amber-100"
                              : "bg-red-50 text-red-600 border-red-100"
                        }`}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">
                      {r.from}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">
                      {r.to}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">
                      {r.days}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium text-center">
                      {r.reason}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                          r.status === "Approved"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {r.status === "Pending" ? (
                        <div className="flex gap-1 justify-end">
                          <button className="w-7 h-7 flex items-center justify-center border border-emerald-200 text-emerald-600 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-all shadow-sm cursor-pointer">
                            ✓
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center border border-red-200 text-red-600 rounded-lg bg-red-50 hover:bg-red-100 transition-all shadow-sm cursor-pointer">
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
          </div>
        </div>
      </main>
    </div>
  );
}
