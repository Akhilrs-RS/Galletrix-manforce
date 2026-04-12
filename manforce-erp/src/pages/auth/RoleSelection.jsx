import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Wallet,
  ClipboardList,
  UserCheck,
  Lock,
  User as UserIcon,
  ArrowLeft,
} from "lucide-react";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("admin");
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentials, setCredentials] = useState({ userId: "", password: "" });

  const roles = [
    {
      id: "admin",
      title: "Admin",
      desc: "Full access (ERP & CRM)", //  Updated to reflect CRM access
      icon: ShieldCheck,
      path: "/admin-dashboard",
    },
    {
      id: "hr",
      title: "HR Manager",
      desc: "Workers & operations",
      icon: Users,
      path: "/hr-dashboard",
    },
    {
      id: "supervisor",
      title: "Supervisor",
      desc: "Attendance & site",
      icon: ClipboardList,
      path: "/sv-dashboard",
    },
    {
      id: "worker",
      title: "Worker",
      desc: "My profile & leave",
      icon: UserCheck,
      path: "/worker-dashboard",
    },
    {
      id: "accounts",
      title: "Accounts",
      desc: "Salary & Expenses",
      icon: Wallet,
      path: "/accounts-dashboard",
    },
  ];

  const isWebRole = roles.find((r) => r.id === selectedRole)?.path !== null;

  const handleInitialClick = () => {
    if (isWebRole) setShowCredentials(true);
  };

  const handleFinalLogin = (e) => {
    e.preventDefault();
    const roleObj = roles.find((r) => r.id === selectedRole);

    if (credentials.userId && credentials.password) {
      if (roleObj && roleObj.path) {
        navigate(roleObj.path);
      }
    } else {
      alert("Please enter both User ID and Password");
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4 font-sans text-left">
      <div className="bg-[#FAF9F6] p-10 rounded-[2rem] shadow-2xl w-full max-w-md text-center transition-all duration-500">
        <div className="inline-block bg-brand-gold p-4 rounded-xl text-white font-bold text-2xl mb-4 shadow-md">
          M
        </div>
        <h2 className="text-2xl font-bold text-brand-navy leading-tight">
          ManForce ERP
        </h2>
        <p className="text-[10px] text-slate-500 tracking-[0.2em] mb-8 uppercase font-semibold">
          Dubai · UAE
        </p>

        {!showCredentials ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-slate-700 mb-6 text-sm tracking-tight">
              Select Your Role to Continue
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 border rounded-2xl transition-all shadow-sm cursor-pointer group flex flex-col items-start ${
                    selectedRole === role.id
                      ? "border-brand-gold bg-brand-gold/10 ring-2 ring-brand-gold/20"
                      : "border-slate-200 bg-white hover:border-brand-gold/50"
                  }`}
                >
                  <role.icon
                    className={`mb-2 ${selectedRole === role.id ? "text-brand-gold" : "text-slate-400"}`}
                    size={24}
                  />
                  <p
                    className={`font-bold text-xs ${selectedRole === role.id ? "text-brand-gold" : "text-slate-800"}`}
                  >
                    {role.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight">
                    {role.desc}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={handleInitialClick}
              disabled={!isWebRole}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                isWebRole
                  ? "bg-brand-gold text-white hover:brightness-110"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              Continue as {roles.find((r) => r.id === selectedRole)?.title}{" "}
              <span className="text-lg">→</span>
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleFinalLogin}
            className="animate-in fade-in zoom-in-95 duration-300 text-left"
          >
            <button
              type="button"
              onClick={() => setShowCredentials(false)}
              className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6 hover:text-brand-gold transition-colors"
            >
              <ArrowLeft size={14} /> Back to roles
            </button>

            <h3 className="font-bold text-slate-800 text-lg mb-1">Sign In</h3>
            <p className="text-xs text-slate-400 mb-6">
              Enter credentials for{" "}
              {roles.find((r) => r.id === selectedRole)?.title}
            </p>

            <div className="space-y-4">
              <div className="relative">
                <UserIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="User ID"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                  onChange={(e) =>
                    setCredentials({ ...credentials, userId: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 py-4 bg-brand-gold text-white rounded-xl font-bold shadow-lg shadow-brand-gold/20 hover:brightness-110 active:scale-95 transition-all"
            >
              Confirm Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
