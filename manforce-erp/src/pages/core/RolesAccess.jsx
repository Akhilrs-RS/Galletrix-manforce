import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for routing
import DashboardLayout from "../../components/DashboardLayout";
import { Lock, Plus, Check, X, ChevronDown, UserPlus } from "lucide-react";

// --- Internal Component: Role Card ---
const RoleCard = ({
  title,
  icon,
  desc,
  userCount,
  active,
  colorClass,
  onSwitch,
}) => (
  <div
    className={`bg-white p-6 rounded-2xl border-2 transition-all duration-300 ${
      active
        ? "border-brand-gold shadow-lg scale-[1.02]"
        : "border-transparent shadow-sm grayscale-[0.5]"
    }`}
  >
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className={`font-bold text-lg ${colorClass}`}>{title}</h3>
      <p className="text-[10px] text-slate-400 font-medium leading-relaxed px-2 h-10">
        {desc}
      </p>
      <div className="flex flex-col items-center gap-2 pt-2">
        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full">
          {userCount} user{userCount !== 1 ? "s" : ""}
        </span>
        {active ? (
          <span className="bg-amber-50 text-brand-gold text-[9px] font-bold px-3 py-1 rounded-full border border-brand-gold/20 animate-pulse">
            • Active Role
          </span>
        ) : (
          <div className="h-[21px]" />
        )}
      </div>
      <button
        onClick={onSwitch}
        className={`w-full mt-4 border text-[11px] font-bold py-2.5 rounded-xl transition-all cursor-pointer ${
          active
            ? "bg-slate-50 border-slate-200 text-slate-400 cursor-default"
            : "border-slate-200 text-slate-600 hover:bg-brand-navy hover:text-white hover:border-brand-navy"
        }`}
      >
        {active ? `Managing ${title}` : `Switch to ${title}`}
      </button>
    </div>
  </div>
);

// --- Internal Component: Functional Toggle ---
const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-10 h-5 rounded-full relative transition-all duration-300 cursor-pointer ${
      enabled ? "bg-brand-gold shadow-inner" : "bg-slate-200"
    }`}
  >
    <div
      className={`absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-300 ${
        enabled ? "left-6" : "left-1"
      }`}
    />
  </button>
);

export default function RolesAccess({ role = "admin" }) {
  const navigate = useNavigate(); // Hook for navigation

  // --- 1. STATE MANAGEMENT ---
  const [activeRole, setActiveRole] = useState("Admin");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const [permissionMatrix, setPermissionMatrix] = useState([
    { module: "View Dashboard", roles: [true, true, true, true] },
    { module: "View All Workers", roles: [true, true, true, false] },
    { module: "Add / Edit Workers", roles: [true, true, true, false] },
    { module: "View Worker Salaries", roles: [true, false, false, false] },
    { module: "View Clients", roles: [true, true, false, false] },
    { module: "Manage Deployment", roles: [true, false, true, false] },
    { module: "Mark Attendance", roles: [true, true, true, false] },
    { module: "Manage Recruitment", roles: [true, true, false, false] },
    { module: "View Payroll", roles: [true, true, false, false] },
    { module: "Run Payroll", roles: [true, false, false, false] },
    { module: "View Invoices", roles: [true, true, false, false] },
    { module: "View Revenue Reports", roles: [true, false, false, false] },
    { module: "Approve Leave Requests", roles: [true, true, false, false] },
    { module: "Apply for Own Leave", roles: [true, true, true, true] },
    { module: "View Documents", roles: [true, true, false, false] },
    { module: "View Operational Reports", roles: [true, true, true, false] },
    { module: "Manage Roles & Access", roles: [true, false, false, false] },
  ]);

  // --- 2. ACTIONS ---
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggle = (rowIdx, colIdx) => {
    const newMatrix = [...permissionMatrix];
    newMatrix[rowIdx].roles[colIdx] = !newMatrix[rowIdx].roles[colIdx];
    setPermissionMatrix(newMatrix);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setShowAddUserModal(false);
    triggerNotify("New user created successfully");
  };

  // --- 3. REROUTING LOGIC ---
  const handleSwitchRole = (newRole) => {
    setActiveRole(newRole);
    triggerNotify(`Switching to ${newRole} view...`);

    // Redirect logic: adjust paths to match your actual App.js routes
    setTimeout(() => {
      if (newRole === "Admin") navigate("/admin");
      else if (newRole === "HR") navigate("/hr");
      else if (newRole === "Supervisor") navigate("/supervisor");
      else if (newRole === "Worker") navigate("/worker");
    }, 1000);
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-8 relative">
        {/* SUCCESS NOTIFICATION */}
        {notification && (
          <div className="fixed top-24 right-12 z-[100] animate-in slide-in-from-right-4 duration-300">
            <div className="bg-[#1e293b] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
              <Check size={18} className="text-emerald-400" />
              <span className="text-[13px] font-bold tracking-tight">
                {notification}
              </span>
            </div>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-slate-700">
            <Lock size={18} className="text-brand-gold" />
            <h2 className="text-sm font-bold uppercase tracking-widest">
              Roles & Permissions
            </h2>
          </div>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="bg-brand-gold text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <Plus size={16} /> Add User
          </button>
        </div>

        {/* Role Overview Cards */}
        <div className="grid grid-cols-4 gap-6">
          <RoleCard
            title="Admin"
            icon="👑"
            userCount={1}
            active={activeRole === "Admin"}
            desc="Full system access — all modules, settings, and financial data"
            colorClass="text-brand-gold"
            onSwitch={() => handleSwitchRole("Admin")}
          />
          <RoleCard
            title="HR"
            icon="👤"
            userCount={2}
            active={activeRole === "HR"}
            desc="Manage workers, recruitment, leave, and documents (no financials)"
            colorClass="text-blue-600"
            onSwitch={() => handleSwitchRole("HR")}
          />
          <RoleCard
            title="Supervisor"
            icon="👷"
            userCount={3}
            active={activeRole === "Supervisor"}
            desc="Site-level access — attendance marking and deployment view"
            colorClass="text-emerald-600"
            onSwitch={() => handleSwitchRole("Supervisor")}
          />
          <RoleCard
            title="Worker"
            icon="👷‍♂️"
            userCount={142}
            active={activeRole === "Worker"}
            desc="Self-service portal — view profile, apply and track leave requests"
            colorClass="text-orange-500"
            onSwitch={() => handleSwitchRole("Worker")}
          />
        </div>

        {/* Permissions Table (Independent Toggles) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center px-10">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-brand-gold" />
              <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
                Permissions Matrix
              </h3>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              <span className="text-brand-gold">Gold</span> = allowed •{" "}
              <span className="text-slate-300">Grey</span> = denied
            </p>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-10 py-5 w-1/2">Module / Permission</th>
                <th className="px-4 py-5 text-center">Admin</th>
                <th className="px-4 py-5 text-center">HR</th>
                <th className="px-4 py-5 text-center">Supervisor</th>
                <th className="px-4 py-5 text-center">Worker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {permissionMatrix.map((p, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-10 py-4 text-[13px] font-bold text-slate-700">
                    {p.module}
                  </td>
                  {p.roles.map((isEnabled, colIdx) => (
                    <td key={colIdx} className="px-4 py-4">
                      <div className="flex justify-center">
                        <Toggle
                          enabled={isEnabled}
                          onToggle={() => handleToggle(rowIdx, colIdx)}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- ADD USER MODAL --- */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg text-brand-gold">
                    <UserPlus size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Add New User
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={handleAddUser}
                className="p-8 space-y-6 text-left"
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Smith"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="john@manforce.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                        Assign Role
                      </label>
                      <div className="relative">
                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
                          <option>HR</option>
                          <option>Supervisor</option>
                          <option>Admin</option>
                          <option>Worker</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                        Initial Password
                      </label>
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-6 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all cursor-pointer"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
