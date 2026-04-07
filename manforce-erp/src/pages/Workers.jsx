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
  Filter,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

// --- Internal Components ---

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
      <tbody className="divide-y divide-slate-50">
        {workers.map((w, i) => (
          <tr
            key={i}
            className="hover:bg-slate-50/30 transition-colors group text-[12px]"
          >
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
              <button className="text-[11px] font-bold text-slate-400 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all cursor-pointer">
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Workers() {
  const navigate = useNavigate();
  const location = useLocation();

  const ownLabour = [
    {
      name: "Mohammed Al Rashidi",
      id: "W001",
      category: "Electrician",
      type: "Own",
      nationality: "Pakistani",
      salary: "2,800",
      status: "Deployed",
      expiry: "2025-08-14",
    },
    {
      name: "Ramesh Kumar",
      id: "W002",
      category: "Plumber",
      type: "Own",
      nationality: "Indian",
      salary: "2,400",
      status: "Available",
      expiry: "2025-11-30",
    },
    {
      name: "Ahmed Hassan",
      id: "W005",
      category: "Foreman",
      type: "Own",
      nationality: "Egyptian",
      salary: "3,500",
      status: "Deployed",
      expiry: "2026-03-10",
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
      expiry: "2024-12-20",
    },
    {
      name: "Sanjay Patel",
      id: "W004",
      category: "Mason",
      type: "Outsourced",
      nationality: "Indian",
      salary: "2,100",
      status: "On Leave",
      expiry: "2025-09-15",
    },
    {
      name: "Bibek Thapa",
      id: "W006",
      category: "Helper",
      type: "Outsourced",
      nationality: "Nepalese",
      salary: "1,800",
      status: "Available",
      expiry: "2025-07-05",
    },
  ];

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-900">
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

        <nav className="flex-1 space-y-0.5 overflow-y-auto pb-6">
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

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Workers</h2>
          <div className="flex items-center gap-3">
            <div className="bg-amber-100/50 text-amber-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-amber-200">
              <ShieldCheck size={14} /> Admin
            </div>
            <div className="relative bg-slate-100 p-2 rounded-lg text-slate-500">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 text-[8px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">
                5
              </span>
            </div>
            <button className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg cursor-pointer">
              <Plus size={16} /> Add Worker
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1500px] mx-auto">
          <div className="flex items-center gap-4 mb-8 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
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
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-bold text-slate-600 cursor-pointer">
                All Labour <ChevronDown size={14} />
              </div>
              <button className="bg-brand-gold/10 text-brand-gold p-2 rounded-lg hover:bg-brand-gold hover:text-white transition-all cursor-pointer">
                <Filter size={18} />
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
      </main>
    </div>
  );
}
