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

// --- Sidebar Item Component ---
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

export default function Payroll() {
  const navigate = useNavigate();
  const location = useLocation();

  const payrollData = [
    {
      name: "Mohammed Al Rashidi",
      basic: "2,800",
      ot: "875",
      allow: "400",
      ded: "-150",
      net: "3,925",
      status: "Paid",
    },
    {
      name: "Ramesh Kumar",
      basic: "2,400",
      ot: "—",
      allow: "350",
      ded: "-120",
      net: "2,630",
      status: "Pending",
    },
    {
      name: "Carlos Fernandez",
      basic: "2,200",
      ot: "680",
      allow: "300",
      ded: "-110",
      net: "3,070",
      status: "Paid",
    },
    {
      name: "Bibek Thapa",
      basic: "1,800",
      ot: "220",
      allow: "250",
      ded: "-90",
      net: "2,180",
      status: "Processing",
    },
  ];

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-900">
      {/* Sidebar Navigation */}
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Payroll</h2>
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
            <button className="bg-brand-navy text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer">
              ▶ Run Payroll
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto space-y-6">
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                TOTAL PAYROLL
              </p>
              <h4 className="text-2xl font-bold mt-1 text-slate-800 uppercase">
                AED 19,100
              </h4>
              <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">
                June 2025
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                PAID OUT
              </p>
              <h4 className="text-2xl font-bold mt-1 text-emerald-600 uppercase">
                AED 11,995
              </h4>
            </div>
            <div className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                PENDING
              </p>
              <h4 className="text-2xl font-bold mt-1 text-brand-gold uppercase">
                AED 7,105
              </h4>
            </div>
          </div>

          {/* WPS Filing Alert */}
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <p className="text-xs font-bold text-blue-700">
              📋 WPS filing due June 15, 2025.{" "}
              <span className="underline cursor-pointer ml-2">
                Generate WPS →
              </span>
            </p>
          </div>

          {/* Payroll Data Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
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
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-bold text-slate-700">
                      {p.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500">
                      {p.basic}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 font-bold text-brand-gold">
                        {p.ot} ✏️
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{p.allow}</td>
                    <td className="px-6 py-4 text-red-500 font-bold">
                      {p.ded}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800 uppercase">
                      AED {p.net}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === "Paid"
                            ? "bg-emerald-50 text-emerald-600"
                            : p.status === "Pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[11px] font-bold text-emerald-600 border border-emerald-200 px-3 py-1 rounded-lg hover:bg-emerald-50 transition-all cursor-pointer">
                        Pay
                      </button>
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
