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
  ShieldCheck,
  FileStack,
  BarChart3,
  ShieldAlert,
  ChevronRight,
  Lock,
  Bell,
  LogOut,
  AlertTriangle,
} from "lucide-react";

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

const StatCard = ({ title, value, subtext, trend }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-brand-gold flex flex-col justify-between h-32 relative overflow-hidden">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-3xl font-bold text-slate-800 mt-1">{value}</h4>
    </div>
    <div className="flex items-center gap-1 mt-2">
      {trend && (
        <span className="text-[10px] text-emerald-500 font-bold">{trend}</span>
      )}
      <p className="text-[10px] text-slate-400 font-medium">{subtext}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const revenueData = [
    { month: "Jan", val: 78 },
    { month: "Feb", val: 82 },
    { month: "Mar", val: 91 },
    { month: "Apr", val: 88 },
    { month: "May", val: 95 },
    { month: "Jun", val: 103 },
  ];

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-900">
      {/* SIDEBAR NAVIGATION */}
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
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
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto space-y-6">
          {/* Top Statistics Cards */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="Total Workers"
              value="6"
              subtext="+4 this month"
              trend="↑ 4"
            />
            <StatCard title="Deployed" value="3" subtext="Utilization: 50%" />
            <StatCard
              title="Active Clients"
              value="4"
              subtext="135 workers placed"
            />
            <StatCard
              title="Monthly Revenue"
              value="AED 427K"
              subtext="vs last month"
              trend="↑ 12%"
            />
          </div>

          {/* Alert Bars */}
          <div className="space-y-2">
            <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-center justify-between text-[12px] shadow-sm">
              <div className="flex items-center gap-2 text-red-700">
                <ShieldCheck size={16} className="text-red-500" />
                <span className="font-bold">2 documents</span>{" "}
                <span className="text-red-600/80 font-medium">
                  expiring or expired.
                </span>
              </div>
              <button
                onClick={() => navigate("/documents")}
                className="text-red-700 font-bold hover:underline flex items-center gap-1"
              >
                View <ChevronRight size={14} />
              </button>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex items-center justify-between text-[12px] shadow-sm">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle size={16} className="text-amber-500" />
                <span className="font-bold">3 leave requests</span>{" "}
                <span className="text-amber-600/80 font-medium">
                  awaiting approval.
                </span>
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
            {/* Revenue Chart Section */}
            <div className="col-span-2 bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[13px] font-bold text-slate-700 mb-10">
                Revenue (Last 6 Months)
              </h3>
              <div className="flex items-end justify-between h-48 gap-4 px-2 border-b border-slate-50">
                {revenueData.map((data, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-3 group"
                  >
                    <span className="text-[10px] font-bold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      AED {data.val}K
                    </span>
                    <div
                      className="w-full bg-brand-gold/15 rounded-t-lg relative transition-all cursor-pointer hover:bg-brand-gold/30"
                      style={{ height: `${data.val}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-gold to-brand-gold/40 opacity-90 rounded-t-lg"></div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter mb-[-24px]">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Worker Status Gauge Section */}
            <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[13px] font-bold text-slate-700 mb-8">
                Worker Status
              </h3>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-36 h-36">
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
                      strokeWidth="3.5"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-brand-gold"
                      strokeWidth="3.5"
                      strokeDasharray="50, 100"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-emerald-500"
                      strokeWidth="3.5"
                      strokeDasharray="33, 100"
                      strokeDashoffset="-50"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-slate-800">
                      50%
                    </span>
                  </div>
                </div>
                <div className="mt-10 w-full space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-gold"></div>{" "}
                      Deployed (3)
                    </span>
                    <span className="text-slate-800">50%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>{" "}
                      Available (2)
                    </span>
                    <span className="text-slate-800">33%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span className="flex items-center gap-2.5 text-slate-400">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>{" "}
                      On Leave (1)
                    </span>
                    <span>17%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Workers and Activity Timeline */}
          <div className="grid grid-cols-3 gap-6 pb-12">
            <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                  Recent Workers
                </h3>
                <button
                  onClick={() => navigate("/workers")}
                  className="text-[11px] font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-lg hover:bg-white transition-all cursor-pointer"
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
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px]">
                        MA
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-slate-800 group-hover:text-brand-gold transition-colors">
                          Mohammed Al Rashidi
                        </p>
                        <p className="text-[10px] text-slate-400">W001</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[12px] font-medium text-slate-500">
                      Electrician
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded text-[10px] font-bold border border-blue-100">
                        Deployed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-[13px] font-bold text-slate-700 mb-8 tracking-wide">
                Recent Activity
              </h3>
              <div className="space-y-8 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-100">
                <div className="relative pl-7 group">
                  <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-brand-gold border-2 border-white ring-4 ring-brand-gold/10 transition-all group-hover:ring-brand-gold/30"></div>
                  <p className="text-[12px] font-bold text-slate-800">
                    Ahmed Hassan deployed to DAMAC - Arjan
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">
                    Today, 09:14 AM
                  </p>
                </div>
                <div className="relative pl-7 group">
                  <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white ring-4 ring-emerald-500/10 transition-all group-hover:ring-emerald-500/30"></div>
                  <p className="text-[12px] font-bold text-slate-800">
                    INV-001 paid by Al Futtaim Group
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tight">
                    AED 89,600
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">
                    Today, 08:30 AM
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
