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
  ChevronRight,
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

export default function Recruitment() {
  const navigate = useNavigate();
  const location = useLocation();

  const pipeline = [
    {
      stage: "Applied",
      color: "slate",
      count: 1,
      items: [
        {
          name: "Deepak Chaudhary",
          role: "Helper",
          nat: "Nepalese",
          exp: "1 yr",
          date: "2025-06-07",
        },
      ],
    },
    {
      stage: "Screening",
      color: "blue",
      count: 2,
      items: [
        {
          name: "Pradeep Singh",
          role: "Welder",
          nat: "Indian",
          exp: "5 yrs",
          date: "2025-06-05",
        },
        {
          name: "Samuel Okafor",
          role: "Mason",
          nat: "Nigerian",
          exp: "6 yrs",
          date: "2025-06-08",
        },
      ],
    },
    {
      stage: "Interview",
      color: "amber",
      count: 2,
      items: [
        {
          name: "Jomar Reyes",
          role: "Driver",
          nat: "Filipino",
          exp: "3 yrs",
          date: "2025-06-03",
        },
        {
          name: "Rizwan Malik",
          role: "Plumber",
          nat: "Pakistani",
          exp: "4 yrs",
          date: "2025-06-01",
        },
      ],
    },
    {
      stage: "Offer",
      color: "brand-gold",
      count: 1,
      items: [
        {
          name: "Mohammed Iqbal",
          role: "Electrician",
          nat: "Pakistani",
          exp: "8 yrs",
          date: "2025-05-28",
        },
      ],
    },
    {
      stage: "Hired",
      color: "emerald",
      count: 1,
      items: [
        {
          name: "Ali Karimi",
          role: "Foreman",
          nat: "Iranian",
          exp: "12 yrs",
          date: "2025-05-20",
          hired: true,
        },
      ],
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

        {/* User Profile Card */}
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
          <h2 className="text-xl font-bold text-slate-800">Recruitment</h2>
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
            <button className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all cursor-pointer">
              + Add Candidate
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] mx-auto space-y-6">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { t: "TOTAL CANDIDATES", v: "7" },
              { t: "IN PROGRESS", v: "5" },
              { t: "HIRED THIS MONTH", v: "1" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border-t-4 border-brand-gold shadow-sm"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {s.t}
                </p>
                <h4 className="text-4xl font-bold mt-2 text-slate-800">
                  {s.v}
                </h4>
              </div>
            ))}
          </div>

          {/* Kanban Pipeline View */}
          <div className="grid grid-cols-5 gap-4">
            {pipeline.map((p, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${p.color === "brand-gold" ? "bg-[#c5a447]" : `bg-${p.color}-500`}`}
                    ></div>
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">
                      {p.stage}
                    </span>
                  </div>
                  <span className="bg-slate-200/50 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {p.count}
                  </span>
                </div>
                <div className="space-y-3">
                  {p.items.map((c, j) => (
                    <div
                      key={j}
                      className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3 transition-transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white text-[10px] font-bold">
                          {c.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-800 leading-tight">
                            {c.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {c.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="bg-slate-50 text-[9px] px-2 py-0.5 rounded border border-slate-100 font-bold text-slate-500">
                          🌍 {c.nat}
                        </span>
                        <span className="bg-slate-50 text-[9px] px-2 py-0.5 rounded border border-slate-100 font-bold text-slate-500">
                          🏗️ {c.exp}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                        <span className="text-[9px] text-slate-400 font-medium">
                          {c.date}
                        </span>
                        {c.hired ? (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                            ✓ Hired
                          </span>
                        ) : (
                          <button className="bg-brand-gold/10 text-brand-gold p-1 rounded-md hover:bg-brand-gold hover:text-white transition-all cursor-pointer">
                            <ChevronRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
