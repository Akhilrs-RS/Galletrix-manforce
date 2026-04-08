import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Wallet,
  ClipboardList,
  UserCheck,
} from "lucide-react";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("admin");

  const roles = [
    {
      id: "admin",
      title: "Admin",
      desc: "Full access",
      icon: ShieldCheck,
      path: "/admin-dashboard", // ✅ UPDATED from /dashboard
    },
    {
      id: "hr",
      title: "HR Manager",
      desc: "Workers & operations",
      icon: Users,
      path: "/hr-dashboard", // ✅ Matches your App.jsx
    },
    {
      id: "accounts",
      title: "Accounts",
      desc: "Invoices & Payroll",
      icon: Wallet,
      path: null,
    },
    {
      id: "supervisor",
      title: "Supervisor",
      desc: "Attendance & site",
      icon: ClipboardList,
      path: null,
    },
    {
      id: "worker",
      title: "Worker",
      desc: "My profile & leave",
      icon: UserCheck,
      path: null,
    },
  ];

  const handleLogin = () => {
    const role = roles.find((r) => r.id === selectedRole);
    // Only navigate if a path exists (Admin or HR)
    if (role && role.path) {
      navigate(role.path);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4 font-sans">
      <div className="bg-brand-cream p-10 rounded-[2rem] shadow-2xl w-full max-w-md text-center">
        <div className="inline-block bg-brand-gold p-4 rounded-xl text-white font-bold text-2xl mb-4 shadow-md">
          M
        </div>
        <h2 className="text-2xl font-bold text-brand-navy leading-tight">
          ManForce ERP
        </h2>
        <p className="text-[10px] text-slate-500 tracking-[0.2em] mb-8 uppercase font-semibold">
          Dubai · UAE · Manpower Management
        </p>

        <h3 className="font-bold text-slate-700 mb-6 text-sm tracking-tight">
          Select Your Role to Continue
        </h3>

        {/* ROLE GRID */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`p-4 border rounded-2xl transition-all text-left shadow-sm cursor-pointer group ${
                selectedRole === role.id
                  ? "border-brand-gold bg-brand-gold/10 ring-2 ring-brand-gold/20"
                  : "border-slate-200 bg-white hover:border-brand-gold/50"
              }`}
            >
              <role.icon
                className={`mb-2 transition-colors ${
                  selectedRole === role.id
                    ? "text-brand-gold"
                    : "text-slate-400 group-hover:text-brand-gold"
                }`}
                size={24}
              />
              <p
                className={`font-bold text-xs ${selectedRole === role.id ? "text-brand-gold" : "text-slate-800"}`}
              >
                {role.title}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {role.desc}
              </p>
            </button>
          ))}
        </div>

        {/* DYNAMIC LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
            selectedRole === "admin" || selectedRole === "hr"
              ? "bg-brand-gold text-white hover:brightness-110 shadow-brand-gold/20"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Login as {roles.find((r) => r.id === selectedRole)?.title}{" "}
          {(selectedRole === "admin" || selectedRole === "hr") && (
            <span className="text-lg">→</span>
          )}
        </button>

        {/* Helper text for inactive roles */}
        {!(selectedRole === "admin" || selectedRole === "hr") && (
          <p className="text-[9px] text-slate-400 mt-4 italic font-medium">
            Access for this role is currently restricted to the mobile app.
          </p>
        )}
      </div>
    </div>
  );
}
