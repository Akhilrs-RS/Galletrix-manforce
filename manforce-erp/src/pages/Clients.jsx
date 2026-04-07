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
  Search,
  Plus,
  ShieldCheck,
} from "lucide-react";

// --- Reusable Sidebar Item Component ---
const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-6 py-2.5 cursor-pointer transition-all duration-200 ${active ? "bg-[#334155] border-r-4 border-brand-gold" : "hover:bg-slate-800"}`}
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

export default function Clients() {
  const navigate = useNavigate();
  const location = useLocation();

  const clientData = [
    {
      name: "Al Futtaim Group",
      contact: "Omar Al Futtaim",
      type: "Construction",
      workers: 28,
      rate: "3,200",
      till: "2025-12-31",
      status: "Active",
      revenue: "89,600",
    },
    {
      name: "Emaar Properties",
      contact: "Sarah Johnson",
      type: "Real Estate",
      workers: 45,
      rate: "3,500",
      till: "2026-06-30",
      status: "Active",
      revenue: "157,500",
    },
    {
      name: "DAMAC Properties",
      contact: "Ali Rashid",
      type: "Construction",
      workers: 19,
      rate: "3,100",
      till: "2025-09-15",
      status: "Active",
      revenue: "58,900",
    },
    {
      name: "DP World",
      contact: "James Clarke",
      type: "Logistics",
      workers: 31,
      rate: "2,900",
      till: "2026-01-31",
      status: "Active",
      revenue: "89,900",
    },
    {
      name: "Majid Al Futtaim",
      contact: "Nadia Hassan",
      type: "Retail",
      workers: 12,
      rate: "2,600",
      till: "2025-08-20",
      status: "Expired",
      revenue: "31,200",
    },
  ];

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-900">
      {/* 1. Sidebar */}
      <aside className="w-64 bg-brand-navy flex flex-col shadow-2xl shrink-0 z-20">
        <div className="p-6 mb-4">
          <div className="flex items-center gap-3">
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

        {/* Super Admin Profile Section */}
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

      {/* 2. Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Clients</h2>
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
            <button className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg cursor-pointer">
              <Plus size={16} /> Add Client
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1500px] mx-auto space-y-6">
          <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
            <div className="flex-1 flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 group focus-within:border-brand-gold transition-all">
              <Search
                size={16}
                className="text-slate-400 mr-3 group-focus-within:text-brand-gold"
              />
              <input
                type="text"
                placeholder="Search clients..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Workers</th>
                  <th className="px-6 py-4">Rate/Worker</th>
                  <th className="px-6 py-4">Contract Till</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {clientData.map((client, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors group text-[12px]"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-[12px]">
                        {client.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">
                          {client.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {client.contact}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-500">
                      {client.type}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {client.workers} workers
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700 uppercase font-mono">
                      AED {client.rate}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {client.till}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border ${client.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[11px] font-bold text-slate-400 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all cursor-pointer">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-6 pb-10">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">
                Top Clients by Workers
              </h3>
              <div className="space-y-6">
                {clientData.map((client, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase">
                      <span className="text-slate-700">{client.name}</span>
                      <span className="text-slate-400 font-mono">
                        {client.workers} workers
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-gold h-full rounded-full"
                        style={{ width: `${(client.workers / 45) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">
                Revenue by Client (AED)
              </h3>
              <div className="space-y-4">
                {clientData.map((client, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-[11px] font-medium text-slate-600">
                      {client.name}
                    </span>
                    <span className="text-[11px] font-bold text-brand-navy uppercase font-mono">
                      AED {client.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
