import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Calendar as CalendarIcon, Check, X, ChevronDown } from "lucide-react";

import api from "../../utils/api";

export default function Attendance({ role }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [showMarkPopup, setShowMarkPopup] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal form state
  const [markData, setMarkData] = useState({
    worker_id: "",
    status: "Present",
    check_in: "",
    check_out: "",
    ot_hours: 0,
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [attRes, workRes] = await Promise.all([
        api.get(`/attendance?date=${selectedDate}`),
        api.get("/workers"),
      ]);
      setAttendanceData(attRes.data);
      setWorkers(workRes.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await api.post("/attendance", { ...markData, date: selectedDate });
      setShowMarkPopup(true);
      fetchData();
      setTimeout(() => setShowMarkPopup(false), 3000);
    } catch (err) {
      console.error("Failed to mark attendance:", err);
    }
  };

  // --- 2. ACTIONS ---
  const handleMarkToday = () => {
    setShowMarkPopup(true);
    // Auto-hide popup after 3 seconds
    setTimeout(() => setShowMarkPopup(false), 30000);
  };

  // Function to format display date (e.g., June 10, 2025)
  const formatDisplayDate = (dateStr) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6 relative">
        {/* --- MARK ATTENDANCE MODAL --- */}
        {showMarkPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-8 animate-in zoom-in-95 duration-200 text-left">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Mark Attendance</h3>
                <button onClick={() => setShowMarkPopup(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleMarkAttendance} className="space-y-4">
                <select
                  className="w-full p-3 border rounded-xl text-sm"
                  onChange={(e) =>
                    setMarkData({ ...markData, worker_id: e.target.value })
                  }
                  required
                >
                  <option value="">Select Worker</option>
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full p-3 border rounded-xl text-sm"
                  onChange={(e) =>
                    setMarkData({ ...markData, status: e.target.value })
                  }
                >
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Leave</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    className="w-full p-3 border rounded-xl"
                    onChange={(e) =>
                      setMarkData({ ...markData, check_in: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    className="w-full p-3 border rounded-xl"
                    onChange={(e) =>
                      setMarkData({ ...markData, check_out: e.target.value })
                    }
                  />
                </div>
                <input
                  type="number"
                  placeholder="OT Hours"
                  className="w-full p-3 border rounded-xl text-sm"
                  onChange={(e) =>
                    setMarkData({ ...markData, ot_hours: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-gold text-white rounded-xl font-bold text-xs"
                >
                  Save Attendance
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- TOP SUMMARY STAT CARDS --- */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="Present Today"
            value={attendanceData.filter((a) => a.status === "Present").length}
            color="emerald"
          />
          <StatCard
            title="Absent"
            value={attendanceData.filter((a) => a.status === "Absent").length}
            color="red"
          />
          <StatCard
            title="On Leave"
            value={attendanceData.filter((a) => a.status === "Leave").length}
            color="amber"
          />
          <StatCard
            title="Total OT Hours"
            value={attendanceData.reduce(
              (acc, a) => acc + Number(a.ot_hours || 0),
              0,
            )}
            color="blue"
          />
        </div>

        {/* --- MAIN ATTENDANCE TABLE CARD --- */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          {/* Header Area */}
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
              Attendance — {formatDisplayDate(selectedDate)}
            </h3>

            <div className="flex items-center gap-3">
              {/* DATE PICKER */}
              <div className="relative group">
                <CalendarIcon
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-gold"
                />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-9 pr-3 py-2 text-[11px] font-bold text-slate-600 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all bg-white cursor-pointer hover:bg-slate-50"
                />
              </div>

              {/* MARK TODAY BUTTON */}
              <button
                onClick={handleMarkToday}
                className="px-5 py-2 text-[11px] font-bold text-white bg-brand-gold rounded-xl hover:brightness-110 shadow-lg shadow-brand-gold/20 transition-all cursor-pointer"
              >
                Mark Today
              </button>
            </div>
          </div>

          {/* Table Area */}
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Worker</th>
                <th className="px-6 py-4">In Time</th>
                <th className="px-6 py-4">Out Time</th>
                <th className="px-6 py-4">OT Hours</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {attendanceData.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-8 py-5 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                      {row.display_id || "—"}
                    </div>
                    <span className="font-bold text-slate-700">
                      {row.worker_name}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-mono text-slate-500">
                    {row.check_in || "—"}
                  </td>
                  <td className="px-6 py-5 font-mono text-slate-500">
                    {row.check_out || "—"}
                  </td>
                  <td className="px-6 py-5 font-bold text-brand-gold">
                    {row.ot_hours || 0} hrs
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                        row.status === "Present"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : row.status === "Absent"
                            ? "bg-red-50 text-red-700 border-red-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

// --- REUSABLE STAT CARD COMPONENT ---
function StatCard({ title, value, color }) {
  const colors = {
    emerald: "border-emerald-500 text-emerald-600",
    red: "border-red-500 text-red-700",
    amber: "border-amber-500 text-amber-600",
    blue: "border-blue-500 text-blue-600",
  };

  return (
    <div
      className={`bg-white p-6 rounded-2xl border-t-4 shadow-sm ${colors[color]}`}
    >
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h4 className="text-3xl font-bold mt-2 uppercase">{value}</h4>
    </div>
  );
}
