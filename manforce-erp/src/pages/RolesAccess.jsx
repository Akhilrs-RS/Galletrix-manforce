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
  Plus,
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

const RoleCard = ({
  title,
  icon,
  desc,
  userCount,
  active,
  colorClass,
  btnLabel,
}) => (
  <div
    className={`bg-white p-6 rounded-2xl border-2 transition-all ${
      active ? "border-brand-gold shadow-md" : "border-transparent shadow-sm"
    }`}
  >
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="text-3xl">{icon}</div>
      <h3 className={`font-bold text-lg ${colorClass}`}>{title}</h3>
      <p className="text-[10px] text-slate-400 font-medium leading-relaxed px-2">
        {desc}
      </p>
      <div className="flex flex-col items-center gap-2 pt-2">
        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full">
          {userCount} user{userCount !== 1 ? "s" : ""}
        </span>
        {active && (
          <span className="bg-amber-50 text-brand-gold text-[9px] font-bold px-2 py-0.5 rounded-full border border-brand-gold/20">
            • Active Role
          </span>
        )}
      </div>
      <button className="w-full mt-4 border border-slate-200 text-slate-600 text-[11px] font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
        {btnLabel}
      </button>
    </div>
  </div>
);

export default function RolesAccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const permissions = [
    { module: "View Dashboard", roles: [true, true, true, true] },
    { module: "View All Workers", roles: [true, true, true, false] },
    { module: "Add / Edit Workers", roles: [true, true, true, false] },
    { module: "View Worker Salaries", roles: [true, false, false, false] },
    { module: "View Clients", roles: [true, true, false, false] },
    { module: "Manage Deployment", roles: [true, false, true, false] },
    { module: "Mark Attendance", roles: [true, true, true, false] },
    { module: "Manage Recruitment", roles: [true, true, false, false] },
  ];

  const Toggle = ({ enabled }) => (
    <div
      className={`w-10 h-5 rounded-full relative transition-colors ${
        enabled ? "bg-brand-gold" : "bg-slate-200"
      }`}
    >
      <div
        className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${
          enabled ? "right-1" : "left-1"
        }`}
      ></div>
    </div>
  );

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
          <h2 className="text-xl font-bold text-slate-800">
            Roles & Permissions
          </h2>
          <div className="flex items-center gap-4">
            <div className="bg-amber-100/50 text-amber-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-amber-200">
              <ShieldCheck size={14} /> Admin
            </div>
            <div className="relative bg-slate-100 p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-all cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-[9px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">
                5
              </span>
            </div>
            <button className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer">
              <Plus size={16} /> Add User
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto space-y-8">
          <div className="grid grid-cols-4 gap-6">
            <RoleCard
              title="Admin"
              icon="👑"
              userCount={1}
              active
              desc="Full system access — all modules, settings, and financial data"
              colorClass="text-brand-gold"
              btnLabel="Switch to Admin"
            />
            <RoleCard
              title="HR"
              icon="👤"
              userCount={2}
              desc="Manage workers, recruitment, leave, and documents (no financials)"
              colorClass="text-blue-600"
              btnLabel="Switch to HR"
            />
            <RoleCard
              title="Supervisor"
              icon="👷"
              userCount={3}
              desc="Site-level access — attendance marking and deployment view"
              colorClass="text-emerald-600"
              btnLabel="Switch to Supervisor"
            />
            <RoleCard
              title="Worker"
              icon="👷‍♂️"
              userCount={142}
              desc="Self-service portal — view profile, apply and track leave requests"
              colorClass="text-orange-500"
              btnLabel="Switch to Worker"
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-12">
            <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-brand-gold" />
                <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
                  Permissions Matrix
                </h3>
              </div>
              <p className="text-[10px] font-bold text-slate-400">
                Green = allowed • Grey = denied
              </p>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 w-1/2">Module / Permission</th>
                  <th className="px-4 py-4 text-center">Admin</th>
                  <th className="px-4 py-4 text-center">HR</th>
                  <th className="px-4 py-4 text-center">Supervisor</th>
                  <th className="px-4 py-4 text-center">Worker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {permissions.map((p, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-4 text-[13px] font-medium text-slate-700">
                      {p.module}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle enabled={p.roles[0]} />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle enabled={p.roles[1]} />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle enabled={p.roles[2]} />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle enabled={p.roles[3]} />
                      </div>
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
