import React from "react";
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

  const roles = [
    { id: "admin", title: "Admin", desc: "Full access", icon: ShieldCheck },
    {
      id: "hr",
      title: "HR Manager",
      desc: "Workers & operations",
      icon: Users,
    },
    {
      id: "accounts",
      title: "Accounts",
      desc: "Invoices & Payroll",
      icon: Wallet,
    },
    {
      id: "supervisor",
      title: "Supervisor",
      desc: "Attendance & site",
      icon: ClipboardList,
    },
    {
      id: "worker",
      title: "Worker",
      desc: "My profile & leave",
      icon: UserCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-blue flex items-center justify-center p-4 font-sans">
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

        <div className="grid grid-cols-2 gap-4 mb-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => role.id === "admin" && navigate("/dashboard")}
              className="p-4 border border-slate-200 rounded-2xl hover:border-brand-gold hover:bg-brand-gold/5 group transition-all text-left bg-white shadow-sm cursor-pointer"
            >
              <role.icon
                className="text-slate-400 group-hover:text-brand-gold mb-2 transition-colors"
                size={24}
              />
              <p className="font-bold text-xs text-slate-800">{role.title}</p>
              <p className="text-[10px] text-slate-400 font-medium">
                {role.desc}
              </p>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-brand-gold text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20 cursor-pointer"
        >
          Login as Admin <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
}
