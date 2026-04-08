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
  UserCircle, // Added for Profile icon
} from "lucide-react";

const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-6 py-2.5 cursor-pointer transition-all duration-200 ${
      active
        ? "bg-[#1e293b] border-r-4 border-brand-gold"
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

export default function DashboardLayout({ children, role = "admin" }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Role Checks
  const isHR = role === "hr";
  const isSupervisor = role === "supervisor";
  const isWorker = role === "worker";
  const isAdmin = role === "admin";

  const getPageTitle = () => {
    const path = location.pathname
      .replace("/", "")
      .replace("hr-", "")
      .replace("sv-", "")
      .replace("worker-", ""); // Clean worker prefix

    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("workers") || path.includes("profile"))
      return isWorker ? "My Profile" : "Workers";
    if (path === "roles") return "Roles & Access";
    if (path.includes("leaves")) return "My Leaves";

    return path.replace("-", " ") || "Home";
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] font-sans text-slate-900">
      <aside className="w-64 bg-brand-navy flex flex-col shadow-2xl shrink-0 z-20">
        <div className="p-6 mb-4 flex items-center gap-3">
          <div className="bg-brand-gold p-2 rounded-lg text-white font-bold text-xl shadow-sm">
            M
          </div>
          <div>
            <h1 className="text-white font-bold text-sm leading-none">
              ManForce ERP
            </h1>
            <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">
              Dubai · UAE
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto pb-6 custom-scrollbar">
          {/* --- WORKER PORTAL VIEW --- */}
          {isWorker ? (
            <>
              <p className="px-6 text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">
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
          ) : (
            <>
              {/* --- ADMIN / HR / SUPERVISOR CORE --- */}
              <p className="px-6 text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">
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

              {/* --- OPERATIONS SECTION --- */}
              <p className="px-6 text-[10px] font-bold text-slate-500 uppercase mt-8 mb-3 tracking-widest">
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

              {/* --- COMPLIANCE SECTION --- */}
              {!isSupervisor && (
                <>
                  <p className="px-6 text-[10px] font-bold text-slate-500 uppercase mt-8 mb-3 tracking-widest">
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
                  <p className="px-6 text-[10px] font-bold text-slate-500 uppercase mt-8 mb-3 tracking-widest">
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

        {/* Profile Card */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 bg-[#1e293b] p-3 rounded-xl mb-3 border border-slate-700/50 shadow-inner">
            <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white font-bold text-[10px]">
              {isWorker ? "WK" : isHR ? "HR" : isSupervisor ? "SV" : "AD"}
            </div>
            <div className="flex-1">
              <p className="text-xs text-white font-bold">
                {isWorker
                  ? "Field Worker"
                  : isHR
                    ? "HR Manager"
                    : isSupervisor
                      ? "Supervisor"
                      : "Admin"}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">
                {isWorker
                  ? "W-001"
                  : isHR
                    ? "HR Dept"
                    : isSupervisor
                      ? "Site Supervisor"
                      : "Super Admin"}
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

      <main className="flex-1 overflow-y-auto bg-[#FDFBF7]">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {getPageTitle()}
          </h2>
          <div className="flex items-center gap-4">
            <div
              className={`px-3 py-1 rounded-full text-[11px] font-bold border 
              ${
                isWorker
                  ? "bg-amber-50 text-amber-600 border-amber-100"
                  : isHR
                    ? "bg-blue-50 text-blue-600 border-blue-100"
                    : isSupervisor
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-amber-50 text-amber-600 border-amber-100"
              }`}
            >
              {isWorker
                ? "Worker Portal"
                : isHR
                  ? "HR Portal"
                  : isSupervisor
                    ? "Site Supervisor"
                    : "Admin Access"}
            </div>
            <div className="relative p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-gold cursor-pointer transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-[9px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">
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
