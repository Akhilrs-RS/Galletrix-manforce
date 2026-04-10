import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Truck,
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
} from "lucide-react";

const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-6 py-1.5 cursor-pointer transition-all duration-200 ${
      active
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

export default function DashboardLayout({ children, role = "admin" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHR = role === "hr";
  const isSupervisor = role === "supervisor";
  const isWorker = role === "worker";
  const isAccounts = role === "accounts"; // Defined explicitly
  const isAdmin = role === "admin";

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
    if (path.includes("financials")) return "Company Financials";

    return path.replace("-", " ") || "Home";
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] font-sans text-slate-900 overflow-hidden">
      <aside className="w-64 bg-brand-navy flex flex-col shadow-2xl shrink-0 z-20 h-full">
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
          {/* WORKER VIEW */}
          {isWorker && (
            <>
              <p className="px-6 text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                My Portal
              </p>
              <SidebarItem
                icon={LayoutDashboard}
                label="My Dashboard"
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

          {/* ACCOUNTS VIEW */}
          {isAccounts && (
            <>
              <p className="px-6 text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                Financial Portal
              </p>
              <SidebarItem
                icon={LayoutDashboard}
                label="Finance Overview"
                active={location.pathname.includes("dashboard")}
                onClick={() => navigate("/accounts-dashboard")}
              />
              <SidebarItem
                icon={Wallet}
                label="Payroll Mgmt"
                onClick={() => navigate("/accounts-payroll")}
              />
              <SidebarItem
                icon={Receipt}
                label="Expense Tracker"
                onClick={() => navigate("/accounts-expenses")}
              />
              <SidebarItem
                icon={FileText}
                label="Client Invoices"
                onClick={() => navigate("/accounts-invoices")}
              />
            </>
          )}

          {/* ADMIN / HR / SV CORE */}
          {!isWorker && !isAccounts && (
            <>
              <p className="px-6 text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                Core
              </p>
              <SidebarItem
                icon={LayoutDashboard}
                label="Dashboard"
                active={location.pathname.includes("dashboard")}
                onClick={() =>
                  navigate(
                    isHR
                      ? "/hr-dashboard"
                      : isSupervisor
                        ? "/sv-dashboard"
                        : "/admin-dashboard",
                  )
                }
              />
              <SidebarItem
                icon={Users}
                label="Workers"
                badge="142"
                active={location.pathname.includes("workers")}
                onClick={() =>
                  navigate(
                    isHR
                      ? "/hr-workers"
                      : isSupervisor
                        ? "/sv-workers"
                        : "/workers",
                  )
                }
              />
              {(isAdmin || isSupervisor) && (
                <SidebarItem
                  icon={Truck}
                  label="Deployment"
                  active={location.pathname.includes("deployment")}
                  onClick={() =>
                    navigate(isSupervisor ? "/sv-deployment" : "/deployment")
                  }
                />
              )}
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
                onClick={() =>
                  navigate(
                    isHR
                      ? "/hr-attendance"
                      : isSupervisor
                        ? "/sv-attendance"
                        : "/attendance",
                  )
                }
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
                        icon={FileText}
                        label="Invoices"
                        active={location.pathname === "/invoices"}
                        onClick={() => navigate("/invoices")}
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

        <div className="p-3 border-t border-slate-800 bg-brand-navy">
          <div className="flex items-center gap-3 bg-[#1e293b] p-2 rounded-xl mb-2 border border-slate-700/50">
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
            <div className="flex-1">
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
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {getPageTitle()}
          </h2>
          <div className="flex items-center gap-4">
            <div
              className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                isAccounts
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
            <div className="relative p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-gold cursor-pointer transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-[8px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">
                5
              </span>
            </div>
          </div>
        </header>
        <div className="p-8 max-w-[1600px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
