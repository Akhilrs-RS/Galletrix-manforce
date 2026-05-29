import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarCheck,
  UserCheck,
  ClipboardList,
  Lock,
  Bell,
  LogOut,
  Wallet,
  FileText,
  FileStack,
  BarChart3,
  UserCircle,
  Receipt,
  Target,
  Coins,
} from "lucide-react";

// Optimized SidebarItem with tighter padding for no-scroll layout
const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-6 py-1.5 cursor-pointer transition-all duration-200 ${active
      ? "bg-[#1e293b] border-r-4 border-brand-gold"
      : "hover:bg-slate-800"
      }`}
  >
    <div className="flex items-center gap-3">
      <Icon
        size={16}
        className={active ? "text-brand-gold" : "text-slate-400"}
      />
      <span
        className={`text-[12px] ${active ? "text-white font-medium" : "text-slate-400"}`}
      >
        {label}
      </span>
    </div>
    {badge && (
      <span className="bg-brand-gold text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
        {badge}
      </span>
    )}
  </div>
);

export default function DashboardLayout({ children, role, headerActions, subtitle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isQuickActionOpen, setIsQuickActionOpen] = React.useState(false);

  // Use localStorage for persistence across navigations
  const savedRole = localStorage.getItem("userRole");
  const currentRole = role || savedRole || "admin";

  const isHR = currentRole === "hr";
  const isSupervisor = currentRole === "supervisor";
  const isWorker = currentRole === "worker";
  const isAccounts = currentRole === "accounts";
  const isAdmin = currentRole === "admin";

  const getRoute = (base) => {
    if (isHR) return `/hr-${base}`;
    if (isSupervisor) return `/sv-${base}`;
    if (isAccounts) return `/ac-${base}`;
    return `/${base}`;
  };

  const getDashboardRoute = () => {
    if (isHR) return "/hr-dashboard";
    if (isSupervisor) return "/sv-dashboard";
    if (isWorker) return "/worker-dashboard";
    if (isAccounts) return "/accounts-dashboard";
    return "/admin-dashboard";
  };

  const getPageTitle = () => {
    const path = location.pathname
      .replace("/", "")
      .replace("hr-", "")
      .replace("sv-", "")
      .replace("worker-", "")
      .replace("accounts-", "");

    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("workers") || path.includes("profile"))
      return isWorker ? "My Profile" : "Workers";
    if (path === "roles") return "Roles & Access";
    if (path.includes("leaves")) return "My Leaves";
    if (path.includes("financials")) return "Financial Overview";
    if (path === "crm") return "CRM";
    if (path === "expenses") return "Expense & Credits";
    if (path === "invoices") return "Invoice & Receipts";

    return path.replace("-", " ") || "Home";
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] font-sans text-slate-900 overflow-hidden">
      <aside className="w-64 bg-brand-navy flex flex-col shadow-2xl shrink-0 z-20 h-full">
        {/* Logo Section */}
        <div className="p-5 mb-1 flex items-center gap-3">
          <div className="bg-brand-gold p-1.5 rounded-lg text-white font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <h1 className="text-white font-bold text-xs leading-none">
              ManForce ERP
            </h1>
            <p className="text-[8px] text-slate-500 uppercase font-bold mt-1">
              Dubai · UAE
            </p>
          </div>
        </div>



        <nav className="flex-1 space-y-0.5 overflow-y-auto custom-scrollbar">
          {/* --- WORKER SIDEBAR --- */}
          {isWorker && (
            <>
              <p className="px-6 text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                My Portal
              </p>
              <SidebarItem
                icon={LayoutDashboard}
                label="Dashboard"
                active={location.pathname.includes("dashboard")}
                onClick={() => navigate("/worker-dashboard")}
              />
              <SidebarItem
                icon={UserCircle}
                label="My Profile"
                active={location.pathname.includes("profile")}
                onClick={() => navigate("/worker-profile")}
              />
              <SidebarItem
                icon={CalendarCheck}
                label="My Leaves"
                badge="1"
                active={location.pathname.includes("leaves")}
                onClick={() => navigate("/worker-leaves")}
              />
            </>
          )}

          {/* --- ACCOUNTS SIDEBAR --- */}
          {isAccounts && (
            <>
              <p className="px-6 text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                Financial Portal
              </p>
              <SidebarItem
                icon={LayoutDashboard}
                label="Overview"
                active={location.pathname.includes("accounts-dashboard")}
                onClick={() => navigate("/accounts-dashboard")}
              />
              <SidebarItem
                icon={Users}
                label="Workers"
                active={location.pathname.includes("workers")}
                onClick={() => navigate(getRoute("workers"))}
              />
              <SidebarItem
                icon={Briefcase}
                label="Clients"
                active={location.pathname.includes("clients")}
                onClick={() => navigate(getRoute("clients"))}
              />
              <SidebarItem
                icon={Wallet}
                label="Payroll Mgmt"
                active={location.pathname.includes("payroll")}
                onClick={() => navigate(getRoute("payroll"))}
              />
              <SidebarItem
                icon={FileText}
                label="Client Invoices"
                active={location.pathname.includes("invoices")}
                onClick={() => navigate(getRoute("invoices"))}
              />
              <SidebarItem
                icon={Coins}
                label="Expense & Credits"
                active={location.pathname.includes("expenses")}
                onClick={() => navigate(getRoute("expenses"))}
              />
            </>
          )}

          {/* --- ADMIN / HR / SUPERVISOR CORE --- */}
          {!isWorker && !isAccounts && (
            <>
              <p className="px-6 text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                Core
              </p>
              <SidebarItem
                icon={LayoutDashboard}
                label="Dashboard"
                active={location.pathname.includes("dashboard") && !location.pathname.includes("worker") && !location.pathname.includes("accounts")}
                onClick={() => navigate(getDashboardRoute())}
              />
              <SidebarItem
                icon={Users}
                label="Workers"
                badge="142"
                active={location.pathname.includes("workers")}
                onClick={() => navigate(getRoute("workers"))}
              />

              {/* CRM - Restricted to Admin Only */}
              {isAdmin && (
                <SidebarItem
                  icon={Target}
                  label="CRM"
                  active={location.pathname === "/crm"}
                  onClick={() => navigate("/crm")}
                />
              )}

              <SidebarItem
                icon={ClipboardList}
                label="Work Orders"
                active={location.pathname.includes("work-orders")}
                onClick={() => navigate(getRoute("work-orders"))}
              />

              {isAdmin && (
                <SidebarItem
                  icon={Briefcase}
                  label="Clients"
                  active={location.pathname === "/clients"}
                  onClick={() => navigate("/clients")}
                />
              )}

              <p className="px-6 text-[9px] font-bold text-slate-500 uppercase mt-4 mb-2 tracking-widest">
                Operations
              </p>
              <SidebarItem
                icon={CalendarCheck}
                label="Attendance"
                active={location.pathname.includes("attendance")}
                onClick={() => navigate(getRoute("attendance"))}
              />

              {!isSupervisor && (
                <>
                  <SidebarItem
                    icon={UserCheck}
                    label="Recruitment"
                    badge="7"
                    active={location.pathname.includes("recruitment")}
                    onClick={() =>
                      navigate(isHR ? "/hr-recruitment" : "/recruitment")
                    }
                  />
                  {isAdmin && (
                    <>
                      <SidebarItem
                        icon={Wallet}
                        label="Payroll"
                        active={location.pathname === "/payroll"}
                        onClick={() => navigate("/payroll")}
                      />
                      <SidebarItem
                        icon={Receipt}
                        label="Accounts Section"
                        active={location.pathname === "/accounts-dashboard"}
                        onClick={() => navigate("/accounts-dashboard")}
                      />
                      <SidebarItem
                        icon={FileText}
                        label="Invoices & Receipts"
                        active={location.pathname === "/invoices"}
                        onClick={() => navigate("/invoices")}
                      />
                      <SidebarItem
                        icon={Coins}
                        label="Expense & Credits"
                        active={location.pathname === "/expenses"}
                        onClick={() => navigate("/expenses")}
                      />
                    </>
                  )}
                  <SidebarItem
                    icon={ClipboardList}
                    label="Leave Mgmt"
                    badge="3"
                    active={location.pathname.includes("leave-mgmt")}
                    onClick={() =>
                      navigate(isHR ? "/hr-leave-mgmt" : "/leave-mgmt")
                    }
                  />
                </>
              )}

              {/* --- COMPLIANCE SECTION RESTORED --- */}
              {!isSupervisor && (
                <>
                  <p className="px-6 text-[9px] font-bold text-slate-500 uppercase mt-4 mb-2 tracking-widest">
                    Compliance
                  </p>
                  <SidebarItem
                    icon={FileStack}
                    label="Documents"
                    badge="3"
                    active={location.pathname.includes("documents")}
                    onClick={() =>
                      navigate(isHR ? "/hr-documents" : "/documents")
                    }
                  />
                  <SidebarItem
                    icon={BarChart3}
                    label="Reports"
                    active={location.pathname.includes("reports")}
                    onClick={() => navigate(isHR ? "/hr-reports" : "/reports")}
                  />
                </>
              )}

              {isAdmin && (
                <>
                  <p className="px-6 text-[9px] font-bold text-slate-500 uppercase mt-4 mb-2 tracking-widest">
                    System
                  </p>
                  <SidebarItem
                    icon={Lock}
                    label="Roles & Access"
                    active={location.pathname === "/roles"}
                    onClick={() => navigate("/roles")}
                  />
                </>
              )}
            </>
          )}
        </nav>

        {/* Profile Card Footer */}
        <div className="p-3 border-t border-slate-800 bg-brand-navy">
          <div className="flex items-center gap-3 bg-[#1e293b] p-2 rounded-xl mb-2 border border-slate-700/50 shadow-inner">
            <div className="w-7 h-7 rounded-full bg-brand-gold flex items-center justify-center text-white font-bold text-[9px]">
              {isWorker
                ? "WK"
                : isHR
                  ? "HR"
                  : isSupervisor
                    ? "SV"
                    : isAccounts
                      ? "AC"
                      : "AD"}
            </div>
            <div className="flex-1 text-left">
              <p className="text-[11px] text-white font-bold leading-tight">
                {isAdmin
                  ? "Admin"
                  : isHR
                    ? "HR Manager"
                    : isSupervisor
                      ? "Supervisor"
                      : isAccounts
                        ? "Accounts"
                        : "Worker"}
              </p>
              <p className="text-[9px] text-slate-500 font-medium leading-tight">
                ManForce ERP
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-red-400 text-[11px] font-bold w-full p-2 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#FDFBF7]">
        {location.pathname === "/admin-dashboard" ? (
          <header className="bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-between sticky top-0 z-30">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Dashboard
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                Welcome back admin
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Search bar */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search workers, clients, invoice.."
                  className="w-64 pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-medium text-slate-700 placeholder-slate-400"
                />
              </div>

              {/* Quick Action dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
                  className="flex items-center gap-2 bg-[#0f172a] text-white text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                >
                  <span>+ Quick Action</span>
                  <svg
                    className={`h-3 w-3 text-slate-300 transition-transform ${isQuickActionOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isQuickActionOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsQuickActionOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-40 animate-in fade-in slide-in-from-top-1 duration-150">
                      <button
                        onClick={() => {
                          navigate("/workers");
                          setIsQuickActionOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-bold transition-colors"
                      >
                        View Workers
                      </button>
                      <button
                        onClick={() => {
                          navigate("/invoices");
                          setIsQuickActionOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-bold transition-colors"
                      >
                        Create Invoice
                      </button>
                      <button
                        onClick={() => {
                          navigate("/crm");
                          setIsQuickActionOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-bold transition-colors"
                      >
                        CRM Activity
                      </button>
                      <button
                        onClick={() => {
                          navigate("/attendance");
                          setIsQuickActionOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-bold transition-colors"
                      >
                        Record Attendance
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Notification icon */}
              <div className="relative p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-all flex items-center justify-center">
                <Bell size={18} className="stroke-[2.5]" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </div>

              {/* Admin Access pill */}
              <div className="px-4 py-1.5 rounded-lg text-[10px] font-bold border bg-[#F6EFE5] text-[#8C6D3F] border-[#EADCC8] shadow-sm tracking-wider uppercase">
                Admin Access
              </div>
            </div>
          </header>
        ) : (
          <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h2 className="text-xl font-bold text-slate-800 capitalize">
                {getPageTitle()}
              </h2>
              {subtitle && (
                <p className="text-xs text-slate-400 font-semibold mt-0.5 normal-case">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {headerActions}
              <div className="relative p-1.5 text-red-500 hover:text-red-600 cursor-pointer transition-colors flex items-center justify-center">
                <Bell size={18} className="stroke-[2.5]" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-[10px] font-bold border ${isAccounts
                  ? "bg-purple-50 text-purple-600 border-purple-100"
                  : isHR
                    ? "bg-blue-50 text-blue-600 border-blue-100"
                    : "bg-amber-50 text-amber-600 border-amber-100"
                  }`}
              >
                {isWorker
                  ? "Worker Portal"
                  : isHR
                    ? "HR Portal"
                    : isSupervisor
                      ? "Site Supervisor"
                      : isAccounts
                        ? "Accounts Portal"
                        : "Admin Access"}
              </div>
            </div>
          </header>
        )}
        <div className="p-8 max-w-[1600px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
