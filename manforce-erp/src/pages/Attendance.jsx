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
  Calendar,
} from "lucide-react";

// --- Sidebar Item Component ---
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

export default function Attendance() {
  const navigate = useNavigate();
  const location = useLocation();

  const attendanceData = [
    {
      name: "Mohammed Al Rashidi",
      id: "MA",
      in: "07:02",
      out: "18:05",
      ot: "1.08 hrs",
      status: "Present",
    },
    {
      name: "Carlos Fernandez",
      id: "CF",
      in: "06:58",
      out: "19:10",
      ot: "2.17 hrs",
      status: "Present",
    },
    {
      name: "Ahmed Hassan",
      id: "AH",
      in: "07:30",
      out: "17:55",
      ot: "0.92 hrs",
      status: "Present",
    },
    {
      name: "Ramesh Kumar",
      id: "RK",
      in: "—",
      out: "—",
      ot: "—",
      status: "Absent",
    },
    {
      name: "Sanjay Patel",
      id: "SP",
      in: "—",
      out: "—",
      ot: "—",
      status: "Leave",
    },
    {
      name: "Bibek Thapa",
      id: "BT",
      in: "07:15",
      out: "17:00",
      ot: "—",
      status: "Present",
    },
  ];

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-brand-navy flex flex-col shadow-2xl shrink-0 z-20">
        <div className="p-6 mb-4 flex items-center gap-3">
          <div className="bg-brand-gold p-2 rounded-lg text-white font-bold text-xl">
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

        {/* User Profile Section */}
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
          <h2 className="text-xl font-bold text-slate-800">Attendance</h2>
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
          </div>
        </header>

        <div className="p-8 max-w-[1500px] mx-auto space-y-6">
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { t: "PRESENT TODAY", v: "4" },
              { t: "ABSENT", v: "1" },
              { t: "ON LEAVE", v: "1" },
              { t: "TOTAL OT HOURS", v: "4.2" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border-t-4 border-brand-gold shadow-sm"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {s.t}
                </p>
                <h4 className="text-3xl font-bold mt-2 text-slate-800">
                  {s.v}
                </h4>
              </div>
            ))}
          </div>

          {/* Attendance Table Area */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
                Attendance — June 10, 2025
              </h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600">
                  10/06/2025 <Calendar size={14} />
                </div>
                <button className="bg-brand-gold text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg cursor-pointer hover:brightness-110">
                  Mark Today
                </button>
              </div>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Worker</th>
                  <th className="px-8 py-4">In Time</th>
                  <th className="px-8 py-4">Out Time</th>
                  <th className="px-8 py-4">OT Hours</th>
                  <th className="px-8 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {attendanceData.map((w, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors text-[12px]"
                  >
                    <td className="px-8 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px]">
                        {w.id}
                      </div>
                      <span className="font-bold text-slate-700">{w.name}</span>
                    </td>
                    <td className="px-8 py-4 font-mono text-slate-600">
                      {w.in}
                    </td>
                    <td className="px-8 py-4 font-mono text-slate-600">
                      {w.out}
                    </td>
                    <td className="px-8 py-4 font-bold text-brand-gold">
                      {w.ot}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          w.status === "Present"
                            ? "bg-emerald-50 text-emerald-600"
                            : w.status === "Absent"
                              ? "bg-red-50 text-red-600"
                              : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {w.status}
                      </span>
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
