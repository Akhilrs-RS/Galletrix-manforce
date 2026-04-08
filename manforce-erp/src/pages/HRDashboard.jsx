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
  ShieldCheck,
  FileStack,
  BarChart3,
  ChevronRight,
  Lock,
  Bell,
  LogOut,
  AlertTriangle,
  Search,
} from "lucide-react";

// --- Internal Components ---

const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-6 py-2.5 cursor-pointer transition-all duration-200 ${active ? "bg-sidebar-active border-r-4 border-brand-gold" : "hover:bg-slate-800"}`}
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

const HRStatCard = ({ title, value, subtext }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-3xl font-bold text-slate-800 mt-1">{value}</h4>
    </div>
    <p className="text-[10px] text-slate-400 font-medium">{subtext}</p>
  </div>
);

export default function HRDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#FDFBF7] font-sans text-slate-900">
      {/* SIDEBAR */}
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
            active={location.pathname === "/hr-dashboard"}
            onClick={() => navigate("/hr-dashboard")}
          />
          <SidebarItem
            icon={Users}
            label="Workers"
            badge="142"
            active={location.pathname === "/workers"}
            onClick={() => navigate("/workers")}
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
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 bg-[#1e293b] p-3 rounded-xl mb-3 border border-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white font-bold text-xs">
              HR
            </div>
            <div className="flex-1">
              <p className="text-xs text-white font-bold">HR Manager</p>
              <p className="text-[10px] text-slate-500 font-medium">HR Dept</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-red-400 text-xs font-bold w-full p-2.5 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-blue-100">
              <Users size={14} /> HR
            </div>
            <div className="relative bg-slate-100 p-2 rounded-lg text-slate-500">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-[9px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">
                4
              </span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto space-y-6">
          {/* HR Top Metrics */}
          <div className="grid grid-cols-4 gap-6">
            <HRStatCard
              title="Total Workers"
              value="6"
              subtext="+4 this month"
            />
            <HRStatCard title="Deployed" value="3" subtext="Utilization: 50%" />
            <HRStatCard title="Available" value="2" subtext="Ready to assign" />
            <HRStatCard
              title="Pending Leaves"
              value="3"
              subtext="Awaiting review"
            />
          </div>

          {/* Alerts Row */}
          <div className="space-y-2">
            <div className="bg-red-50/50 border border-red-100 p-3 rounded-lg flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle size={16} className="text-red-500" />
                <span className="font-bold">2 documents</span>{" "}
                <span className="text-red-600/80">expiring or expired.</span>
              </div>
              <button
                onClick={() => navigate("/documents")}
                className="text-red-700 font-bold hover:underline flex items-center gap-1"
              >
                View <ChevronRight size={14} />
              </button>
            </div>
            <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-lg flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2 text-amber-700">
                <CalendarCheck size={16} className="text-amber-500" />
                <span className="font-bold">3 leave requests</span>{" "}
                <span className="text-amber-600/80">awaiting approval.</span>
              </div>
              <button
                onClick={() => navigate("/leave-mgmt")}
                className="text-amber-700 font-bold hover:underline flex items-center gap-1"
              >
                Review <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Attendance List Area */}
            <div className="col-span-2 bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[13px] font-bold text-slate-700 mb-6 uppercase tracking-widest">
                Attendance Today
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[13px] font-medium text-slate-600">
                    Present
                  </span>
                  <span className="text-lg font-bold text-emerald-600">4</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[13px] font-medium text-slate-600">
                    Absent
                  </span>
                  <span className="text-lg font-bold text-red-500">1</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[13px] font-medium text-slate-600">
                    On Leave
                  </span>
                  <span className="text-lg font-bold text-amber-500">1</span>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-tighter">
                    <span>Attendance Rate</span>
                    <span>67%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-gold h-full rounded-full"
                      style={{ width: "67%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Worker Status Donut */}
            <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[13px] font-bold text-slate-700 mb-8 uppercase tracking-widest">
                Worker Status
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-slate-100"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-brand-gold"
                      strokeWidth="3"
                      strokeDasharray="50, 100"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-emerald-500"
                      strokeWidth="3"
                      strokeDasharray="33, 100"
                      strokeDashoffset="-50"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-800">
                    50%
                  </div>
                </div>
                <div className="mt-8 w-full space-y-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-gold" />{" "}
                      Deployed (3)
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />{" "}
                      Available (2)
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-300" /> On
                      Leave (1)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="grid grid-cols-3 gap-6 pb-12">
            <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                  Recent Workers
                </h3>
                <button
                  onClick={() => navigate("/workers")}
                  className="text-[10px] font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-lg hover:bg-white"
                >
                  View all
                </button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Worker</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[12px]">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">
                      Mohammed Al Rashidi
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      Electrician
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                        Deployed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-[13px] font-bold text-slate-700 mb-6 uppercase tracking-widest">
                Recent Activity
              </h3>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-slate-100">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-brand-gold border-2 border-white" />
                  <p className="text-[11px] font-bold text-slate-800">
                    Ahmed Hassan deployed to DAMAC - Arjan
                  </p>
                  <p className="text-[9px] text-slate-400 mt-1">
                    Today, 09:14 AM
                  </p>
                </div>
                <div className="relative pl-6 border-l-2 border-slate-100">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
                  <p className="text-[11px] font-bold text-slate-800 text-red-600">
                    Visa expiry alert: Carlos Fernandez (EXPIRED)
                  </p>
                  <p className="text-[9px] text-slate-400 mt-1">
                    Yesterday, 08:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
