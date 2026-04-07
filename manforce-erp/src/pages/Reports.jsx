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
  FileSpreadsheet,
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

export default function Reports() {
  const navigate = useNavigate();
  const location = useLocation();

  const reportCategories = [
    {
      title: "Manpower Utilisation",
      desc: "Detailed breakdown of worker deployment vs availability",
      icon: Users,
      color: "blue",
    },
    {
      title: "Financial Summary",
      desc: "Invoiced vs Collected reports for current fiscal year",
      icon: Wallet,
      color: "emerald",
    },
    {
      title: "Attendance Analytics",
      desc: "Overtime trends and absent patterns per site",
      icon: CalendarCheck,
      color: "amber",
    },
    {
      title: "Compliance Audit",
      desc: "Document expiry forecasts and legal status checks",
      icon: FileStack,
      color: "red",
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

        {/* Profile Card */}
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
          <h2 className="text-xl font-bold text-slate-800">Reports Central</h2>
          <div className="flex items-center gap-4">
            <div className="bg-amber-100/50 text-amber-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-amber-200">
              <ShieldCheck size={14} /> Admin
            </div>
            <button className="bg-brand-navy text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer shadow-lg">
              <FileSpreadsheet size={16} /> Export Master Data
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 gap-6 pb-12">
            {reportCategories.map((cat, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm group hover:border-brand-gold hover:shadow-md transition-all cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                    cat.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : cat.color === "emerald"
                        ? "bg-emerald-50 text-emerald-600"
                        : cat.color === "amber"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-600"
                  } group-hover:bg-brand-gold group-hover:text-white`}
                >
                  <cat.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">
                  {cat.desc}
                </p>
                <div className="flex gap-3">
                  <button className="text-[11px] font-bold uppercase tracking-wider text-brand-gold border border-brand-gold/20 px-4 py-2 rounded-lg hover:bg-brand-gold hover:text-white transition-all">
                    Generate PDF
                  </button>
                  <button className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all">
                    Excel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
