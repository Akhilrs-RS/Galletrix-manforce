import React, { useState } from "react";
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
  ChevronRight,
  Lock,
  Bell,
  LogOut,
  AlertTriangle,
  Filter,
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

const StatCard = ({ title, value, subtext, trend, isLoss }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-brand-gold flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-all">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-3xl font-bold text-slate-800 mt-1">{value}</h4>
    </div>
    <div className="flex items-center gap-1 mt-2">
      {trend && (
        <span
          className={`text-[10px] font-bold ${isLoss ? "text-red-500" : "text-emerald-500"}`}
        >
          {isLoss ? "↓" : "↑"} {trend}
        </span>
      )}
      <p className="text-[10px] text-slate-400 font-medium">{subtext}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [financialView, setFinancialView] = useState("Revenue");

  // Data for the Bar Chart toggle
  const financialData = {
    Revenue: [
      { month: "Jan", val: 78 },
      { month: "Feb", val: 82 },
      { month: "Mar", val: 91 },
      { month: "Apr", val: 88 },
      { month: "May", val: 95 },
      { month: "Jun", val: 103 },
    ],
    Profit: [
      { month: "Jan", val: 32 },
      { month: "Feb", val: 35 },
      { month: "Mar", val: 40 },
      { month: "Apr", val: 38 },
      { month: "May", val: 45 },
      { month: "Jun", val: 52 },
    ],
    Expenses: [
      { month: "Jan", val: 46 },
      { month: "Feb", val: 47 },
      { month: "Mar", val: 51 },
      { month: "Apr", val: 50 },
      { month: "May", val: 50 },
      { month: "Jun", val: 51 },
    ],
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-900">
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

      {/* MAIN CONTENT Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="bg-amber-100/50 text-amber-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-amber-200">
              <ShieldCheck size={14} /> Admin
            </div>
            <div className="relative bg-slate-100 p-2 rounded-lg text-slate-500">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-[9px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">
                5
              </span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto space-y-6">
          {/* STAT CARDS: Includes Profit & Expense */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value="AED 427K"
              subtext="vs last month"
              trend="12%"
            />
            <StatCard
              title="Total Profit"
              value="AED 185K"
              subtext="Net Margin: 43%"
              trend="8.4%"
            />
            <StatCard
              title="Total Expenses"
              value="AED 242K"
              subtext="Operational costs"
              trend="2.1%"
              isLoss
            />
            <StatCard title="Deployed" value="3" subtext="Utilization: 50%" />
          </div>

          {/* ALERT BANNER */}
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

          <div className="grid grid-cols-3 gap-6">
            {/* DYNAMIC GOLD BAR CHART */}
            <div className="col-span-2 bg-white p-7 rounded-2xl border border-slate-100 shadow-sm relative">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-[13px] font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                  Financial Performance{" "}
                  <span className="text-brand-gold text-[10px]">
                    ({financialView})
                  </span>
                </h3>

                {/* Gold Dropdown */}
                <div className="relative">
                  <select
                    value={financialView}
                    onChange={(e) => setFinancialView(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold py-1.5 pl-3 pr-8 rounded-lg outline-none focus:ring-1 focus:ring-brand-gold cursor-pointer transition-all"
                  >
                    <option value="Revenue">Revenue</option>
                    <option value="Profit">Profit</option>
                    <option value="Expenses">Expenses</option>
                  </select>
                  <Filter
                    size={12}
                    className="absolute right-2.5 top-2.5 text-brand-gold pointer-events-none"
                  />
                </div>
              </div>

              {/* The Bars */}
              <div className="flex items-end justify-between h-48 gap-4 px-2 border-b border-slate-100">
                {financialData[financialView].map((data, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-3 group h-full justify-end"
                  >
                    <span className="text-[10px] font-bold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      AED {data.val}K
                    </span>
                    <div
                      className="w-full bg-brand-gold/20 rounded-t-md relative transition-all duration-500 ease-in-out cursor-pointer hover:bg-brand-gold/40"
                      style={{ height: `${(data.val / 110) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-gold to-[#e5c567] opacity-100 rounded-t-md shadow-gold"></div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STATUS GAUGE */}
            <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[13px] font-bold text-slate-700 mb-8 uppercase tracking-widest">
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
                </div>
              </div>
            </div>
          </div>

          {/* RECENT TABLE */}
          <div className="grid grid-cols-3 gap-6 pb-12">
            <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                  Recent Activity
                </h3>
                <button className="text-[11px] font-bold text-brand-gold hover:underline">
                  View All
                </button>
              </div>
              <div className="p-5 space-y-4">
                {/* Add activity items here if needed */}
                <p className="text-xs text-slate-400 italic text-center">
                  System initialized and up to date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
