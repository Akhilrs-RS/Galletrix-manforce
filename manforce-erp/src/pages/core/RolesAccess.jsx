import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Lock, Plus, ShieldCheck, Bell } from "lucide-react";

// --- Internal Components ---
const RoleCard = ({
  title,
  icon,
  desc,
  userCount,
  active,
  colorClass,
  btnLabel,
}) => (
  <div
    className={`bg-white p-6 rounded-2xl border-2 transition-all ${
      active ? "border-brand-gold shadow-md" : "border-transparent shadow-sm"
    }`}
  >
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="text-3xl">{icon}</div>
      <h3 className={`font-bold text-lg ${colorClass}`}>{title}</h3>
      <p className="text-[10px] text-slate-400 font-medium leading-relaxed px-2">
        {desc}
      </p>
      <div className="flex flex-col items-center gap-2 pt-2">
        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full">
          {userCount} user{userCount !== 1 ? "s" : ""}
        </span>
        {active && (
          <span className="bg-amber-50 text-brand-gold text-[9px] font-bold px-2 py-0.5 rounded-full border border-brand-gold/20">
            • Active Role
          </span>
        )}
      </div>
      <button className="w-full mt-4 border border-slate-200 text-slate-600 text-[11px] font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
        {btnLabel}
      </button>
    </div>
  </div>
);

const Toggle = ({ enabled }) => (
  <div
    className={`w-10 h-5 rounded-full relative transition-colors ${
      enabled ? "bg-brand-gold" : "bg-slate-200"
    }`}
  >
    <div
      className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${
        enabled ? "right-1" : "left-1"
      }`}
    ></div>
  </div>
);

export default function RolesAccess({ role = "admin" }) {
  const permissions = [
    { module: "View Dashboard", roles: [true, true, true, true] },
    { module: "View All Workers", roles: [true, true, true, false] },
    { module: "Add / Edit Workers", roles: [true, true, true, false] },
    { module: "View Worker Salaries", roles: [true, false, false, false] },
    { module: "View Clients", roles: [true, true, false, false] },
    { module: "Manage Deployment", roles: [true, false, true, false] },
    { module: "Mark Attendance", roles: [true, true, true, false] },
    { module: "Manage Recruitment", roles: [true, true, false, false] },
  ];

  return (
    <DashboardLayout role={role}>
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-slate-700">
            <Lock size={18} className="text-brand-gold" />
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Access Control
            </h2>
          </div>
          <button className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg hover:brightness-110 transition-all">
            <Plus size={16} /> Add User
          </button>
        </div>

        {/* Role Overview Cards */}
        <div className="grid grid-cols-4 gap-6">
          <RoleCard
            title="Admin"
            icon="👑"
            userCount={1}
            active
            desc="Full system access — all modules, settings, and financial data"
            colorClass="text-brand-gold"
            btnLabel="Manage Admins"
          />
          <RoleCard
            title="HR"
            icon="👤"
            userCount={2}
            desc="Manage workers, recruitment, leave, and documents (no financials)"
            colorClass="text-blue-600"
            btnLabel="Manage HR"
          />
          <RoleCard
            title="Supervisor"
            icon="👷"
            userCount={3}
            desc="Site-level access — attendance marking and deployment view"
            colorClass="text-emerald-600"
            btnLabel="Manage Supers"
          />
          <RoleCard
            title="Worker"
            icon="👷‍♂️"
            userCount={142}
            desc="Self-service portal — view profile, apply and track leave requests"
            colorClass="text-orange-500"
            btnLabel="Manage Portal"
          />
        </div>

        {/* Permissions Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-12">
          <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-brand-gold" />
              <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
                Permissions Matrix
              </h3>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Green = allowed • Grey = denied
            </p>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4 w-1/2">Module / Permission</th>
                <th className="px-4 py-4 text-center">Admin</th>
                <th className="px-4 py-4 text-center">HR</th>
                <th className="px-4 py-4 text-center">Supervisor</th>
                <th className="px-4 py-4 text-center">Worker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {permissions.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 text-[13px] font-medium text-slate-700">
                    {p.module}
                  </td>
                  {p.roles.map((isEnabled, idx) => (
                    <td key={idx} className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle enabled={isEnabled} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
