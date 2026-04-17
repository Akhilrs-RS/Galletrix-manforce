import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Search,
  X,
  ChevronDown,
} from "lucide-react";
import api from "../../utils/api";

export default function Recruitment({ role = "admin" }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [candidates, setCandidates] = useState([]);

  const stages = ["Applied", "Screening", "Interview", "Offer", "Hired"];

  const stageColors = {
    Applied: "bg-blue-500",
    Screening: "bg-yellow-500",
    Interview: "bg-orange-500",
    Offer: "bg-purple-500",
    Hired: "bg-emerald-500",
  };

  // Form State
  const [newCandidate, setNewCandidate] = useState({
    candidate_name: "",
    role: "Helper",
    nationality: "Indian",
    experience: "1 yr",
    stage: "Applied",
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await api.get("/recruitment");
      setCandidates(res.data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  const moveCandidate = async (id, direction) => {
    const candidate = candidates.find((c) => c.id === id);
    const currentIndex = stages.indexOf(candidate.stage);
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < stages.length) {
      try {
        await api.patch(`/recruitment/${id}`, { stage: stages[nextIndex] });
        fetchCandidates();
      } catch (err) {
        console.error("Update error:", err);
      }
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recruitment", newCandidate);
      setShowAddModal(false);
      fetchCandidates();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const filteredCandidates = candidates.filter((c) =>
    c.candidate_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* --- TOP SUMMARY CARDS --- */}
        <div className="grid grid-cols-3 gap-6">
          <SummaryCard title="Total Candidates" value={candidates.length} />
          <SummaryCard
            title="In Progress"
            value={candidates.filter((c) => c.stage !== "Hired").length}
          />
          <SummaryCard
            title="Hired This Month"
            value={candidates.filter((c) => c.stage === "Hired").length}
          />
        </div>

        {/* --- SEARCH & ACTION BAR --- */}
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center bg-white px-4 py-2 rounded-xl border border-slate-200 focus-within:border-brand-gold shadow-sm transition-all">
            <Search size={16} className="text-slate-400 mr-3" />
            <input
              type="text"
              placeholder="Search candidates..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-gold text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg shadow-brand-gold/20 transition-all cursor-pointer"
          >
            <Plus size={16} /> Add Candidate
          </button>
        </div>

        {/* --- KANBAN PIPELINE VIEW --- */}
        <div className="grid grid-cols-5 gap-4 h-full items-start">
          {stages.map((stage) => (
            <div key={stage} className="space-y-4">
              {/* Stage Header */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${stageColors[stage]}`}
                  ></div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">
                    {stage}
                  </span>
                </div>
                <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {filteredCandidates.filter((c) => c.stage === stage).length}
                </span>
              </div>

              {/* Candidate Cards */}
              <div className="space-y-3">
                {filteredCandidates
                  .filter((c) => c.stage === stage)
                  .map((c) => (
                    <div
                      key={c.id}
                      className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3 transition-all hover:border-brand-gold/40 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white text-[10px] font-bold">
                          {c.candidate_name
                            ? c.candidate_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "?"}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-800 leading-tight">
                            {c.candidate_name}
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
                        <div className="flex gap-1">
                          {/* Back Arrow */}
                          {stage !== "Applied" && (
                            <button
                              onClick={() => moveCandidate(c.id, -1)}
                              className="bg-slate-100 text-slate-400 p-1 rounded hover:bg-slate-200 transition-all cursor-pointer"
                            >
                              <ChevronLeft size={14} />
                            </button>
                          )}

                          {/* Forward Arrow or Hired Status */}
                          {c.stage === "Hired" ? (
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                              ✓ Hired
                            </span>
                          ) : (
                            <button
                              onClick={() => moveCandidate(c.id, 1)}
                              className="bg-brand-gold/10 text-brand-gold p-1 rounded hover:bg-brand-gold hover:text-white transition-all cursor-pointer"
                            >
                              <ChevronRight size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- ADD CANDIDATE MODAL --- */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800">
                  Add Candidate
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form
                onSubmit={handleAddCandidate}
                className="p-8 space-y-5 text-left"
              >
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                      onChange={(e) =>
                        setNewCandidate({
                          ...newCandidate,
                          candidate_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                      Position
                    </label>
                    <select
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      onChange={(e) =>
                        setNewCandidate({
                          ...newCandidate,
                          role: e.target.value,
                        })
                      }
                    >
                      {[
                        "Electrician",
                        "Foreman",
                        "Helper",
                        "Mason",
                        "Driver",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                      Nationality
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      onChange={(e) =>
                        setNewCandidate({
                          ...newCandidate,
                          nationality: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                      Experience
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      onChange={(e) =>
                        setNewCandidate({
                          ...newCandidate,
                          experience: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border border-slate-200 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 bg-brand-gold text-white rounded-lg text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all cursor-pointer"
                  >
                    Save
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

// --- HELPER COMPONENTS ---
function SummaryCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl border-t-4 border-brand-gold shadow-sm">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-2xl font-bold mt-1 text-slate-800 uppercase tracking-tight">
        {value}
      </h4>
    </div>
  );
}

function ModalInput({ label, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm transition-all"
      />
    </div>
  );
}

function ModalSelect({ label, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
        {label}
      </label>
      <div className="relative">
        <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
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
