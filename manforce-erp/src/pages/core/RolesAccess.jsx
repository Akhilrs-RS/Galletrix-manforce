import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Users,
  UserCheck,
  Briefcase,
  Wrench,
  Shield,
  Search,
  Eye,
  EyeOff,
  MoreHorizontal,
  Download,
  X,
  Check,
  ChevronDown,
  Plus
} from "lucide-react";

// --- Mock User Generator ---
const generateMockUsers = () => {
  const list = [
    { name: "Anjali Nair", role: "HR", loginId: "MWF-HR-002", password: "passwordHR2", status: "Active" },
    { name: "John", role: "Supervisor", loginId: "MWF-SUP-003", password: "passwordSUP3", status: "Active" },
    { name: "Shameer", role: "Worker", loginId: "MWF-WRK-0142", password: "passwordWRK142", status: "Active" },
    { name: "Nikhil Raj", role: "Worker", loginId: "MWF-WRK-0108", password: "passwordWRK108", status: "Active" },
    { name: "System Administrator", role: "Admin", loginId: "MWF-ADM-001", password: "adminPassword", status: "Active" },
    { name: "Priya Sharma", role: "HR", loginId: "MWF-HR-001", password: "passwordHR1", status: "Active" },
    { name: "Robert Dow", role: "Supervisor", loginId: "MWF-SUP-001", password: "passwordSUP1", status: "Active" },
    { name: "Amit Patel", role: "Supervisor", loginId: "MWF-SUP-002", password: "passwordSUP2", status: "Inactive" },
  ];

  const workerNames = [
    "Rahul Verma", "Suresh Raina", "Vikram Singh", "Deepak Kumar", "Ali Mustafa",
    "Sanjay Dutt", "Arjun Rampal", "Vijay Joseph", "Karan Johar", "Abhishek Das",
    "Rajesh Koothrapali", "Howard Wolowitz", "Sheldon Cooper", "Leonard Hofstadter",
    "Anil Kapoor", "Salman Khan", "Shah Rukh Khan", "Aamir Khan", "Hrithik Roshan"
  ];

  // We need 140 more workers to reach 142 total workers (Shameer and Nikhil Raj are 2).
  // 11 of the generated ones will be inactive to hit exactly 12 inactive overall (Amit Patel is 1).
  for (let i = 1; i <= 140; i++) {
    const isInactive = i <= 11;
    const baseName = workerNames[i % workerNames.length];
    const name = `${baseName} ${100 + i}`;
    const idNum = String(i).padStart(3, "0");
    list.push({
      name,
      role: "Worker",
      loginId: `MWF-WRK-0${idNum}`,
      password: `passWorker${i}`,
      status: isInactive ? "Inactive" : "Active"
    });
  }

  return list;
};

export default function RolesAccess({ role = "admin" }) {
  // --- STATE ---
  const [users, setUsers] = useState(() => generateMockUsers());
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [visiblePasswords, setVisiblePasswords] = useState({}); // { loginId: boolean }
  const [activePermTab, setActivePermTab] = useState("Admin");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeActionDropdown, setActiveActionDropdown] = useState(null); // loginId of selected user


  // Form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Worker");
  const [newPassword, setNewPassword] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- STATS CALCULATION ---
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "Active").length;
    const hr = users.filter((u) => u.role === "HR").length;
    const worker = users.filter((u) => u.role === "Worker").length;
    const supervisor = users.filter((u) => u.role === "Supervisor").length;

    return { total, active, hr, worker, supervisor };
  }, [users]);

  // --- FILTERING LOGIC ---
  const filteredUsers = useMemo(() => {
    setCurrentPage(1); // Reset page on filter
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.loginId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // --- PAGINATION LOGIC ---
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;

  // --- ACTIONS ---
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const togglePasswordVisibility = (loginId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [loginId]: !prev[loginId]
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName || !newPassword) return;

    // Generate custom prefix ID based on role
    const roleAbbrev = newRole === "Supervisor" ? "SUP" : newRole.toUpperCase();
    const existingRoleCount = users.filter((u) => u.role === newRole).length;
    const newIdNum = String(existingRoleCount + 2).padStart(3, "0"); // Offset for custom listing
    const newLoginId = `MWF-${roleAbbrev}-${newIdNum}`;

    const newUser = {
      name: newName,
      role: newRole,
      loginId: newLoginId,
      password: newPassword,
      status: "Active"
    };

    setUsers((prev) => [newUser, ...prev]);
    setShowAddUserModal(false);
    triggerNotify(`User "${newName}" added successfully!`);

    // Reset Form
    setNewName("");
    setNewEmail("");
    setNewRole("Worker");
    setNewPassword("");
  };

  const handleExportCredentials = () => {
    const headers = ["Name", "Role", "Login ID", "Password", "Status"];
    const rows = users.map((u) => [u.name, u.role, u.loginId, u.password, u.status]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `manforce_erp_credentials_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerNotify("Credentials exported successfully!");
  };

  // --- PERMISSION DICTIONARY ---
  const permissionsByRole = {
    Admin: ["Full System Access", "Manage all users", "Financial access", "Setting access", "Reports access"],
    HR: ["Manage all workers", "Recruitment portal", "Leave request approval", "Compliance documents", "Reports access"],
    Supervisor: ["Mark site attendance", "View deployment status", "Manage site work orders"],
    Worker: ["View personal profile", "Apply annual & sick leaves", "Track own attendance"]
  };

  // Inject header actions into the layout
  const headerActions = (
    <div className="flex items-center gap-3">
      <button
        onClick={handleExportCredentials}
        className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
      >
        <Download size={14} /> Export Credentials
      </button>
      <button
        onClick={() => setShowAddUserModal(true)}
        className="bg-brand-gold text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
      >
        <Plus size={16} /> Add User
      </button>
    </div>
  );

  return (
    <DashboardLayout role={role} headerActions={headerActions}>
      <div className="space-y-6">
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

        {/* 1. STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Card 1: Total Users */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 leading-tight">{stats.total}</p>
              <p className="text-[12px] text-slate-500 font-medium">Total Users</p>
            </div>
          </div>

          {/* Card 2: Active Access */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 leading-tight">{stats.active}</p>
              <p className="text-[12px] text-slate-500 font-medium">Active Access</p>
            </div>
          </div>

          {/* Card 3: HR IDs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 leading-tight">{stats.hr}</p>
              <p className="text-[12px] text-slate-500 font-medium">HR IDs</p>
            </div>
          </div>

          {/* Card 4: Workers IDs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <Wrench size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 leading-tight">{stats.worker}</p>
              <p className="text-[12px] text-slate-500 font-medium">Workers IDs</p>
            </div>
          </div>

          {/* Card 5: Supervisor IDs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 leading-tight">{stats.supervisor}</p>
              <p className="text-[12px] text-slate-500 font-medium">Supervisor IDs</p>
            </div>
          </div>
        </div>

        {/* 2. ACCESS LIST TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          {/* Card Header & Controls */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-left">
              <h3 className="text-lg font-bold text-slate-800">Access List</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {filteredUsers.length} Users Found
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-none">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-brand-gold transition-all"
                />
              </div>

              {/* Roles Dropdown */}
              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-slate-600 cursor-pointer outline-none focus:bg-white focus:border-brand-gold transition-all"
                >
                  <option value="All">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Worker">Worker</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-slate-600 cursor-pointer outline-none focus:bg-white focus:border-brand-gold transition-all"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Access Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/40 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-8 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Login ID</th>
                  <th className="px-6 py-4">Password</th>
                  <th className="px-8 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <tr key={user.loginId} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-8 py-4 font-bold text-slate-800">{user.name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${
                            user.role === "HR"
                              ? "bg-blue-50/40 text-blue-500 border-blue-200/50"
                              : user.role === "Supervisor"
                              ? "bg-amber-50/40 text-amber-500 border-amber-200/50"
                              : user.role === "Admin"
                              ? "bg-emerald-50/40 text-emerald-600 border-emerald-200/50"
                              : "bg-slate-50/40 text-slate-500 border-slate-200/50"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-medium text-slate-600">{user.loginId}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-600 select-all">
                            {visiblePasswords[user.loginId] ? user.password : "•••••••"}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(user.loginId)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                          >
                            {visiblePasswords[user.loginId] ? <EyeOff size={13} /> : <Eye size={13} />}
                          </button>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-center relative">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => setActiveActionDropdown(activeActionDropdown === user.loginId ? null : user.loginId)}
                            className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                          >
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                        {activeActionDropdown === user.loginId && (
                          <>
                            {/* Backdrop to close dropdown on click outside */}
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveActionDropdown(null)}
                            />
                            {/* Dropdown Menu */}
                            <div className="absolute right-8 mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-20 text-left animate-in fade-in slide-in-from-top-1 duration-100">
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveActionDropdown(null);
                                  triggerNotify(`Profile details for ${user.name}`);
                                }}
                                className="w-full px-4 py-2 text-slate-600 hover:bg-slate-50 text-[11px] font-semibold transition-all text-left flex items-center gap-2 cursor-pointer"
                              >
                                View Profile
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveActionDropdown(null);
                                  const generatedPass = `temp${Math.floor(1000 + Math.random() * 9000)}`;
                                  setUsers((prev) =>
                                    prev.map((u) =>
                                      u.loginId === user.loginId ? { ...u, password: generatedPass } : u
                                    )
                                  );
                                  triggerNotify(`Password reset for ${user.name} to "${generatedPass}"`);
                                }}
                                className="w-full px-4 py-2 text-slate-600 hover:bg-slate-50 text-[11px] font-semibold transition-all text-left flex items-center gap-2 cursor-pointer"
                              >
                                Reset Password
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveActionDropdown(null);
                                  const newStatus = user.status === "Active" ? "Inactive" : "Active";
                                  setUsers((prev) =>
                                    prev.map((u) =>
                                      u.loginId === user.loginId ? { ...u, status: newStatus } : u
                                    )
                                  );
                                  triggerNotify(`Access ${newStatus === "Active" ? "enabled" : "disabled"} for ${user.name}`);
                                }}
                                className="w-full px-4 py-2 text-slate-600 hover:bg-slate-50 text-[11px] font-semibold transition-all text-left flex items-center gap-2 cursor-pointer"
                              >
                                {user.status === "Active" ? "Disable Access" : "Enable Access"}
                              </button>
                              <hr className="border-slate-100 my-1" />
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveActionDropdown(null);
                                  if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                                    setUsers((prev) => prev.filter((u) => u.loginId !== user.loginId));
                                    triggerNotify(`User ${user.name} deleted.`);
                                  }
                                }}
                                className="w-full px-4 py-2 text-rose-600 hover:bg-rose-50 text-[11px] font-semibold transition-all text-left flex items-center gap-2 cursor-pointer"
                              >
                                Delete Access
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-10 text-center text-slate-400 font-medium">
                      No matching users found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>
                Showing {Math.min(filteredUsers.length, (currentPage - 1) * itemsPerPage + 1)} to{" "}
                {Math.min(filteredUsers.length, currentPage * itemsPerPage)} of {filteredUsers.length} entries
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white cursor-pointer transition-colors"
                >
                  Previous
                </button>
                <span className="px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white cursor-pointer transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. ROLE PERMISSION OVERVIEW */}
        <div className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200/60 shadow-sm text-left">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Role permission Overview</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Default permission set assigned to each role in the system
            </p>
          </div>

          {/* Toggle Tab Row */}
          <div className="bg-slate-200/50 p-1 rounded-full flex gap-1 max-w-sm mb-6 shadow-inner">
            {Object.keys(permissionsByRole).map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePermTab(tab)}
                className={`flex-1 py-1.5 text-center text-xs font-bold rounded-full cursor-pointer transition-all ${
                  activePermTab === tab ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid of Permission Badges */}
          <div className="flex flex-wrap gap-3">
            {permissionsByRole[activePermTab].map((perm) => (
              <div
                key={perm}
                className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-4 py-1.5 text-xs font-bold shrink-0 shadow-sm animate-in fade-in duration-200"
              >
                <Check size={13} className="text-emerald-500 stroke-[3]" />
                {perm}
              </div>
            ))}
          </div>
        </div>

        {/* --- ADD USER MODAL --- */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center text-left bg-slate-50/20">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Add New User</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Create a new access profile</p>
                </div>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleAddUser} className="p-6 space-y-4 text-left">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Anjali Nair"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. anjali@manforce.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Assign Role
                    </label>
                    <div className="relative">
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold appearance-none cursor-pointer"
                      >
                        <option value="Worker">Worker</option>
                        <option value="HR">HR</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Initial Password
                    </label>
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-brand-gold text-xs font-bold transition-all"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold hover:brightness-105 transition-all cursor-pointer shadow-md shadow-brand-gold/10"
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
