import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Search,
  Plus,
  ExternalLink,
  Users,
  X,
  ChevronDown,
  Calendar,
  Clock,
  Info,
} from "lucide-react";

export default function Workers({ role }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Labour");

  const [workers, setWorkers] = useState([
    {
      name: "Mohammed Al Rashidi",
      id: "W001",
      category: "Electrician",
      type: "Own",
      nationality: "Pakistani",
      salary: "2,800",
      status: "Deployed",
      expiry: "2025-08-14",
      emiratesId: "784-2020-1234567-1",
      client: "Al Futtaim Group",
      site: "Downtown Dubai",
    },
    {
      name: "Ramesh Kumar",
      id: "W002",
      category: "Plumber",
      type: "Own",
      nationality: "Indian",
      salary: "2,400",
      status: "Available",
      expiry: "2025-11-30",
      emiratesId: "784-2020-5555666-2",
      client: "Emaar",
      site: "Business Bay",
    },
    {
      name: "Ahmed Hassan",
      id: "W005",
      category: "Foreman",
      type: "Own",
      nationality: "Egyptian",
      salary: "3,500",
      status: "Deployed",
      expiry: "2026-03-10",
      emiratesId: "784-2020-1111222-3",
      client: "DAMAC",
      site: "Arjan",
    },
    {
      name: "Carlos Fernandez",
      id: "W003",
      category: "Driver",
      type: "Outsourced",
      nationality: "Filipino",
      salary: "2,200",
      status: "Deployed",
      expiry: "2024-12-20",
      emiratesId: "784-2020-4444555-4",
      client: "Sobha",
      site: "Meydan",
    },
    {
      name: "Sanjay Patel",
      id: "W004",
      category: "Mason",
      type: "Outsourced",
      nationality: "Indian",
      salary: "2,100",
      status: "On Leave",
      expiry: "2025-09-15",
      emiratesId: "784-2020-7777888-5",
      client: "Dubai Mall",
      site: "Downtown",
    },
    {
      name: "Bibek Thapa",
      id: "W006",
      category: "Helper",
      type: "Outsourced",
      nationality: "Nepalese",
      salary: "1,800",
      status: "Available",
      expiry: "2025-07-05",
      emiratesId: "784-2020-9999000-6",
      client: "Nshama",
      site: "Town Square",
    },
  ]);

  const [newWorker, setNewWorker] = useState({
    name: "",
    id: "",
    type: "Own Labour",
    category: "Electrician",
    nationality: "Pakistani",
    salary: "",
    expiry: "",
    emiratesId: "",
    otHours: "",
    otMultiplier: "1.25x (Standard UAE)",
  });

  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      const matchesSearch =
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" || w.status === statusFilter;
      const matchesType =
        typeFilter === "All Labour" ||
        (typeFilter === "Own Labour"
          ? w.type === "Own"
          : w.type === "Outsourced");
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [workers, searchQuery, statusFilter, typeFilter]);

  const handleAddWorker = (e) => {
    e.preventDefault();
    const formattedWorker = {
      ...newWorker,
      id: `W00${workers.length + 1}`,
      type: newWorker.type === "Own Labour" ? "Own" : "Outsourced",
      status: "Available",
      expiry: newWorker.expiry || "2026-01-01",
      salary: Number(newWorker.salary).toLocaleString(),
    };
    setWorkers([...workers, formattedWorker]);
    setShowAddModal(false);
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* --- ACTIONS BAR --- */}
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
          <div className="flex-1 flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 focus-within:border-brand-gold transition-all">
            <Search size={16} className="text-slate-400 mr-3" />
            <input
              type="text"
              placeholder="Search by name, ID, category..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-[11px] font-bold text-slate-600 outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Deployed</option>
              <option>Available</option>
              <option>On Leave</option>
            </select>
            <select
              className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-[11px] font-bold text-slate-600 outline-none cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All Labour</option>
              <option>Own Labour</option>
              <option>Outsourced</option>
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-brand-gold text-white px-4 py-2 rounded-lg text-[11px] font-bold flex items-center gap-2 hover:brightness-110 shadow-lg ml-2 transition-all cursor-pointer"
            >
              <Plus size={16} /> Add Worker
            </button>
          </div>
        </div>

        {/* --- TABLES --- */}
        <WorkerTableSection
          title="Own Labour"
          workers={filteredWorkers.filter((w) => w.type === "Own")}
          icon={Users}
          desc="Directly employed workers"
          onView={(w) => {
            setSelectedWorker(w);
            setShowViewModal(true);
          }}
        />
        <WorkerTableSection
          title="Outsourced Labour"
          workers={filteredWorkers.filter((w) => w.type === "Outsourced")}
          icon={ExternalLink}
          desc="Third-party / contract workers"
          onView={(w) => {
            setSelectedWorker(w);
            setShowViewModal(true);
          }}
        />

        {/* --- MODALS (Add & View) --- */}
        {showAddModal && (
          /* Modal logic same as before, ensuring Visa Expiry input and OT section match screenshot exactly */
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
                <h3 className="text-lg font-bold text-slate-800">
                  Add New Worker
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={handleAddWorker}
                className="p-8 space-y-6 text-left"
              >
                <div className="grid grid-cols-2 gap-5">
                  <ModalInput
                    label="Full Name"
                    value={newWorker.name}
                    onChange={(e) =>
                      setNewWorker({ ...newWorker, name: e.target.value })
                    }
                    placeholder="Mohammed Al Hassan"
                  />
                  <ModalInput
                    label="Worker ID"
                    value={`W00${workers.length + 1}`}
                    disabled
                  />
                  <ModalSelect
                    label="Labour Type"
                    value={newWorker.type}
                    onChange={(e) =>
                      setNewWorker({ ...newWorker, type: e.target.value })
                    }
                    options={["Own Labour", "Outsourced"]}
                  />
                  <ModalSelect
                    label="Category"
                    value={newWorker.category}
                    onChange={(e) =>
                      setNewWorker({ ...newWorker, category: e.target.value })
                    }
                    options={["Electrician", "Plumber", "Mason", "Foreman"]}
                  />
                  <ModalSelect
                    label="Nationality"
                    value={newWorker.nationality}
                    onChange={(e) =>
                      setNewWorker({
                        ...newWorker,
                        nationality: e.target.value,
                      })
                    }
                    options={["Pakistani", "Indian", "Filipino", "Egyptian"]}
                  />
                  <ModalInput
                    label="Basic Salary (AED)"
                    value={newWorker.salary}
                    onChange={(e) =>
                      setNewWorker({ ...newWorker, salary: e.target.value })
                    }
                    placeholder="2500"
                  />
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Visa Expiry
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                      onChange={(e) =>
                        setNewWorker({ ...newWorker, expiry: e.target.value })
                      }
                    />
                  </div>
                  <ModalInput
                    label="Emirates ID"
                    value={newWorker.emiratesId}
                    onChange={(e) =>
                      setNewWorker({ ...newWorker, emiratesId: e.target.value })
                    }
                    placeholder="784-YYYY-XXXXXXX-X"
                  />
                </div>
                <div className="pt-4 space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} /> Overtime (This Month)
                  </h4>
                  <div className="grid grid-cols-2 gap-5">
                    <ModalInput label="OT Hours Worked" placeholder="e.g. 12" />
                    <ModalSelect
                      label="OT Rate Multiplier"
                      value={newWorker.otMultiplier}
                      options={["1.25x (Standard UAE)", "1.5x (Holiday)"]}
                    />
                  </div>
                  <ModalInput
                    label="OT Amount (AED) — Auto-calculated"
                    placeholder="0"
                  />
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex gap-3 items-start">
                    <Info size={16} className="text-blue-500 shrink-0" />
                    <p className="text-[9px] text-blue-700">
                      <strong>UAE Labour Law:</strong> OT is paid at 1.25× the
                      basic hourly rate.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-gold text-white rounded-xl font-bold text-xs shadow-lg cursor-pointer"
                  >
                    Save Worker Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showViewModal && selectedWorker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-700">
                  Worker — {selectedWorker.name}
                </h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="bg-brand-navy rounded-2xl p-6 text-center text-white relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-brand-gold mx-auto flex items-center justify-center text-xl font-bold mb-3 shadow-lg">
                    {selectedWorker.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h4 className="text-lg font-bold">{selectedWorker.name}</h4>
                  <p className="text-[10px] text-brand-gold font-medium mt-1 uppercase tracking-wider">
                    {selectedWorker.id} · {selectedWorker.category}
                  </p>
                  <div className="mt-4 inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold border border-white/20">
                    {selectedWorker.status}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <DetailBox
                    label="Nationality"
                    value={selectedWorker.nationality}
                  />
                  <DetailBox
                    label="Salary"
                    value={`AED ${selectedWorker.salary}`}
                  />
                  <DetailBox label="Labour Type" value={selectedWorker.type} />
                  <DetailBox label="Status" value={selectedWorker.status} />
                  <DetailBox
                    label="Visa Expiry"
                    value={selectedWorker.expiry}
                  />
                  <DetailBox
                    label="Emirates ID"
                    value={selectedWorker.emiratesId}
                  />
                  <DetailBox label="Client" value={selectedWorker.client} />
                  <DetailBox label="Site" value={selectedWorker.site} />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// --- TABLE SECTION COMPONENT ---
function WorkerTableSection({ title, workers, icon: Icon, desc, onView }) {
  if (workers.length === 0) return null;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
      <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-slate-400" />
          <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">
            {title}
          </h3>
          <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {workers.length}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium italic">{desc}</p>
      </div>
      <table className="w-full text-left">
        <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4">Worker</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Labour Type</th>
            <th className="px-6 py-4">Nationality</th>
            <th className="px-6 py-4">Salary (AED)</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Visa Expiry</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-[11px]">
          {workers.map((w, i) => (
            <tr key={i} className="hover:bg-slate-50/30 transition-colors">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px] uppercase">
                  {w.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">{w.name}</span>
                  <span className="text-[9px] text-slate-400">{w.id}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-500">{w.category}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-0.5 rounded font-bold border text-[9px] uppercase ${w.type === "Own" ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-amber-50 text-amber-600 border-amber-100"}`}
                >
                  {w.type}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500">{w.nationality}</td>
              <td className="px-6 py-4 font-bold text-slate-700">{w.salary}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-[10px] font-bold border ${w.status === "Deployed" ? "bg-blue-50 text-blue-600" : w.status === "Available" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                >
                  {w.status}
                </span>
              </td>
              <td
                className={`px-6 py-4 font-mono font-bold ${new Date(w.expiry) < new Date("2025-01-01") ? "text-red-500" : "text-slate-500"}`}
              >
                {w.expiry}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onView(w)}
                  className="text-[11px] font-bold text-slate-500 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all cursor-pointer"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- HELPERS ---
function ModalInput({ label, value, onChange, placeholder, disabled }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </label>
      <input
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm ${disabled ? "bg-slate-100 cursor-not-allowed text-slate-400" : ""}`}
      />
    </div>
  );
}

function ModalSelect({ label, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="bg-[#FAF9F6] p-3 rounded-xl border border-slate-100">
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-xs font-bold text-slate-700">{value}</p>
    </div>
  );
}
