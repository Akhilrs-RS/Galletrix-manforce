import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, Bell } from "lucide-react";

export default function DashboardLayout({ children, role = "admin" }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Define which links each role can see
  const menuItems = {
    admin: [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { label: "Workers", path: "/workers", icon: Users },
      { label: "Payroll", path: "/payroll", icon: LayoutDashboard },
    ],
    hr: [
      { label: "Dashboard", path: "/hr-dashboard", icon: LayoutDashboard },
      { label: "Workers", path: "/workers", icon: Users },
      { label: "Leave Mgmt", path: "/leave-mgmt", icon: LayoutDashboard },
    ],
  };

  return (
    <div className="flex h-screen bg-brand-cream">
      {/* Dynamic Sidebar */}
      <aside className="w-64 bg-brand-navy flex flex-col">
        <div className="p-6 font-bold text-white text-xl">ManForce</div>
        <nav className="flex-1 px-4">
          {menuItems[role]?.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`p-3 cursor-pointer rounded-lg mb-1 ${location.pathname === item.path ? "bg-sidebar-active text-brand-gold" : "text-slate-400"}`}
            >
              <div className="flex items-center gap-3 text-sm">
                <item.icon size={18} /> {item.label}
              </div>
            </div>
          ))}
        </nav>
        {/* Profile Card based on Role */}
        <div className="p-4 border-t border-slate-800 text-white text-xs">
          Logged in as:{" "}
          <span className="text-brand-gold uppercase">{role}</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="font-bold text-slate-700 capitalize">
            {location.pathname.replace("/", "")}
          </h2>
          <Bell size={20} className="text-slate-400" />
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
