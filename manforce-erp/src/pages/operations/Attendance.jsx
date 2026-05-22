import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { 
  Calendar as CalendarIcon, 
  Check, 
  X, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award,
  AlertTriangle,
  Loader2,
  ChevronDown,
  UserCheck
} from "lucide-react";
import api from "../../utils/api";

export default function Attendance({ role }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [mergedWorkers, setMergedWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [siteFilter, setSiteFilter] = useState("");
  const [savingStates, setSavingStates] = useState({});
  const [focusedValue, setFocusedValue] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // 1. Fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [attRes, workRes] = await Promise.all([
        api.get(`/attendance?date=${selectedDate}`),
        api.get("/workers"),
      ]);
      const merged = mergeData(workRes.data, attRes.data);
      setMergedWorkers(merged);
    } catch (err) {
      console.error("Failed to fetch attendance data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  // 2. Merge helper
  const mergeData = (allWorkers, attRecords) => {
    return allWorkers.map((worker) => {
      const record = attRecords.find((r) => r.worker_id === worker.id);
      return {
        ...worker,
        attendance_id: record ? record.id : null,
        status: record ? record.status : null, // null = Unmarked
        check_in: record ? (record.check_in ? record.check_in.substring(0, 5) : "") : "",
        check_out: record ? (record.check_out ? record.check_out.substring(0, 5) : "") : "",
        ot_hours: record ? Number(record.ot_hours || 0) : 0,
      };
    });
  };

  // 3. Local update helper
  const updateLocalRecord = (workerId, fields) => {
    setMergedWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, ...fields } : w))
    );
  };

  // 4. Save a row to DB
  const saveAttendanceRow = async (workerId, status, checkIn, checkOut, otHours) => {
    if (!status) return;
    setSavingStates((prev) => ({ ...prev, [workerId]: "saving" }));
    try {
      await api.post("/attendance", {
        worker_id: workerId,
        status,
        check_in: status === "Present" ? checkIn || null : null,
        check_out: status === "Present" ? checkOut || null : null,
        ot_hours: status === "Present" ? Number(otHours || 0) : 0,
        date: selectedDate,
      });

      setSavingStates((prev) => ({ ...prev, [workerId]: "saved" }));
      setTimeout(() => {
        setSavingStates((prev) => {
          const next = { ...prev };
          if (next[workerId] === "saved") {
            next[workerId] = null;
          }
          return next;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to save row:", err);
      setSavingStates((prev) => ({ ...prev, [workerId]: "error" }));
    }
  };

  // 5. Delete/Unmark a row from DB
  const deleteAttendanceRow = async (workerId) => {
    setSavingStates((prev) => ({ ...prev, [workerId]: "saving" }));
    try {
      await api.delete(`/attendance?date=${selectedDate}&worker_id=${workerId}`);
      setSavingStates((prev) => ({ ...prev, [workerId]: "saved" }));
      setTimeout(() => {
        setSavingStates((prev) => {
          const next = { ...prev };
          if (next[workerId] === "saved") {
            next[workerId] = null;
          }
          return next;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to clear row:", err);
      setSavingStates((prev) => ({ ...prev, [workerId]: "error" }));
    }
  };

  // 6. Action Handlers
  const handleStatusToggle = async (workerId, clickedStatus) => {
    const w = mergedWorkers.find((item) => item.id === workerId);
    if (!w) return;

    if (w.status === clickedStatus) {
      // Toggle off -> Unmarked
      updateLocalRecord(workerId, {
        status: null,
        check_in: "",
        check_out: "",
        ot_hours: 0
      });
      await deleteAttendanceRow(workerId);
    } else {
      // Toggle on
      const checkIn = clickedStatus === "Present" ? (w.check_in || "08:00") : "";
      const checkOut = clickedStatus === "Present" ? (w.check_out || "18:00") : "";
      const otHours = clickedStatus === "Present" ? (w.ot_hours || 0) : 0;

      updateLocalRecord(workerId, {
        status: clickedStatus,
        check_in: checkIn,
        check_out: checkOut,
        ot_hours: otHours
      });
      await saveAttendanceRow(workerId, clickedStatus, checkIn, checkOut, otHours);
    }
  };

  const handleInputChange = (workerId, field, value) => {
    updateLocalRecord(workerId, { [field]: value });
  };

  const handleInputFocus = (worker) => {
    setFocusedValue(`${worker.check_in || ""}|${worker.check_out || ""}|${worker.ot_hours || 0}`);
  };

  const handleInputBlur = (workerId) => {
    const w = mergedWorkers.find((item) => item.id === workerId);
    if (!w) return;

    const currentValue = `${w.check_in || ""}|${w.check_out || ""}|${w.ot_hours || 0}`;
    if (currentValue === focusedValue) return; // No change, skip API call

    saveAttendanceRow(workerId, w.status, w.check_in, w.check_out, w.ot_hours);
  };

  // 7. Bulk Handlers
  const handleMarkAllPresent = async () => {
    const unmarked = filteredWorkers.filter((w) => !w.status);
    if (unmarked.length === 0) return;

    setIsBulkLoading(true);
    const records = unmarked.map((w) => ({
      worker_id: w.id,
      status: "Present",
      check_in: "08:00",
      check_out: "18:00",
      ot_hours: 0,
    }));

    try {
      await api.post("/attendance/bulk", {
        date: selectedDate,
        records,
      });

      setMergedWorkers((prev) =>
        prev.map((w) => {
          const isMarked = unmarked.some((u) => u.id === w.id);
          if (isMarked) {
            return {
              ...w,
              status: "Present",
              check_in: "08:00",
              check_out: "18:00",
              ot_hours: 0,
            };
          }
          return w;
        })
      );
    } catch (err) {
      console.error("Failed to bulk mark present:", err);
    } finally {
      setIsBulkLoading(false);
    }
  };

  const handleClearAllToday = async () => {
    setIsBulkLoading(true);
    try {
      await api.delete(`/attendance?date=${selectedDate}`);
      setMergedWorkers((prev) =>
        prev.map((w) => ({
          ...w,
          status: null,
          check_in: "",
          check_out: "",
          ot_hours: 0,
        }))
      );
      setShowClearConfirm(false);
    } catch (err) {
      console.error("Failed to clear attendance:", err);
    } finally {
      setIsBulkLoading(false);
    }
  };

  // 8. Unique client sites for filter dropdown
  const getUniqueSites = () => {
    const sites = new Set();
    mergedWorkers.forEach((w) => {
      if (w.client_name) {
        sites.add(`${w.client_name} - ${w.site || "No Site"}`);
      } else {
        sites.add("Unassigned");
      }
    });
    return Array.from(sites).sort();
  };

  // 9. Initials for avatars
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // 10. Filtered worker list
  const filteredWorkers = mergedWorkers.filter((w) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      w.name.toLowerCase().includes(query) ||
      (w.worker_id && w.worker_id.toLowerCase().includes(query)) ||
      (w.display_id && w.display_id.toLowerCase().includes(query));

    let matchesStatus = true;
    if (statusFilter === "Present") {
      matchesStatus = w.status === "Present";
    } else if (statusFilter === "Absent") {
      matchesStatus = w.status === "Absent";
    } else if (statusFilter === "Leave") {
      matchesStatus = w.status === "Leave";
    } else if (statusFilter === "Unmarked") {
      matchesStatus = !w.status;
    }

    let matchesSite = true;
    if (siteFilter) {
      const siteKey = w.client_name ? `${w.client_name} - ${w.site || "No Site"}` : "Unassigned";
      matchesSite = siteKey === siteFilter;
    }

    return matchesSearch && matchesStatus && matchesSite;
  });

  // 11. Statistics calculation (derived from state)
  const stats = {
    present: mergedWorkers.filter((w) => w.status === "Present").length,
    absent: mergedWorkers.filter((w) => w.status === "Absent").length,
    leave: mergedWorkers.filter((w) => w.status === "Leave").length,
    totalOt: mergedWorkers.reduce((sum, w) => sum + Number(w.ot_hours || 0), 0),
  };

  const formatDisplayDate = (dateStr) => {
    const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6 relative pb-12">
        {/* --- DYNAMIC STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)
          ) : (
            <>
              <MetricCard
                title="Present Today"
                value={stats.present}
                icon={<CheckCircle size={22} />}
                colorClass="text-emerald-600 bg-emerald-50 border-emerald-100"
              />
              <MetricCard
                title="Absent Today"
                value={stats.absent}
                icon={<XCircle size={22} />}
                colorClass="text-red-600 bg-red-50 border-red-100"
              />
              <MetricCard
                title="On Leave"
                value={stats.leave}
                icon={<Clock size={22} />}
                colorClass="text-amber-600 bg-amber-50 border-amber-100"
              />
              <MetricCard
                title="Total OT Hours"
                value={`${stats.totalOt} hrs`}
                icon={<Award size={22} />}
                colorClass="text-blue-600 bg-blue-50 border-blue-100"
              />
            </>
          )}
        </div>

        {/* --- MAIN INTERACTIVE CONTAINER --- */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          {/* Header & Date / Bulk Actions Toolbar */}
          <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/20">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Attendance Register</h2>
              <p className="text-[12px] text-slate-400 mt-1 font-medium">
                {formatDisplayDate(selectedDate)}
                <span className="mx-2">•</span>
                {!isLoading && `${filteredWorkers.length} of ${mergedWorkers.length} Workers listed`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Date Input */}
              <div className="relative group">
                <CalendarIcon
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-gold"
                />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 pr-4 py-2.5 text-[11px] font-bold text-slate-600 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all bg-white cursor-pointer hover:bg-slate-50 shadow-sm"
                />
              </div>

              {/* Bulk Actions */}
              <button
                onClick={handleMarkAllPresent}
                disabled={isLoading || isBulkLoading || filteredWorkers.filter(w => !w.status).length === 0}
                className="px-4 py-2.5 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-transparent border border-emerald-600 rounded-xl shadow-lg shadow-emerald-600/10 transition-all cursor-pointer flex items-center gap-1.5"
              >
                {isBulkLoading ? <Loader2 size={13} className="animate-spin" /> : <UserCheck size={13} />}
                Mark Filtered Present
              </button>

              <button
                onClick={() => setShowClearConfirm(true)}
                disabled={isLoading || isBulkLoading || mergedWorkers.filter(w => w.status).length === 0}
                className="px-4 py-2.5 text-[11px] font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 bg-white shadow-sm"
              >
                <Trash2 size={13} />
                Clear Register
              </button>
            </div>
          </div>

          {/* Local Filter controls */}
          <div className="px-6 py-4 md:px-8 border-b border-slate-50 flex flex-col md:flex-row items-center gap-4 bg-white">
            {/* Search */}
            <div className="relative w-full md:flex-1 group">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-gold transition-colors"
              />
              <input
                type="text"
                placeholder="Search worker by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all placeholder:text-slate-400 bg-slate-50/30"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative w-full md:w-48 group">
              <Filter
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-[11px] font-bold text-slate-600 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all bg-white cursor-pointer hover:bg-slate-50 appearance-none shadow-sm"
              >
                <option value="All">All Statuses</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">On Leave</option>
                <option value="Unmarked">Unmarked</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Client/Site Filter Dropdown */}
            <div className="relative w-full md:w-64 group">
              <select
                value={siteFilter}
                onChange={(e) => setSiteFilter(e.target.value)}
                className="w-full pl-4 pr-8 py-2.5 text-[11px] font-bold text-slate-600 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all bg-white cursor-pointer hover:bg-slate-50 appearance-none shadow-sm"
              >
                <option value="">All Project Sites</option>
                {getUniqueSites().map((site, index) => (
                  <option key={index} value={site}>
                    {site === "Unassigned" ? "Available / Unassigned" : site}
                  </option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Spreadsheet Table Grid */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <TableSkeleton />
            ) : filteredWorkers.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
                  <Search size={24} />
                </div>
                <h3 className="text-sm font-bold text-slate-700">No Workers Found</h3>
                <p className="text-xs text-slate-400 max-w-[280px] mx-auto">
                  No workers match your filters or search term. Try adjusting your search query or dropdown criteria.
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider w-[350px]">Worker Details</th>
                    <th className="px-6 py-4 font-semibold tracking-wider w-[220px]">Mark Status</th>
                    <th className="px-4 py-4 font-semibold tracking-wider w-[140px] text-center">Check In</th>
                    <th className="px-4 py-4 font-semibold tracking-wider w-[140px] text-center">Check Out</th>
                    <th className="px-4 py-4 font-semibold tracking-wider w-[120px] text-center">OT Hours</th>
                    <th className="px-6 py-4 font-semibold tracking-wider w-[80px] text-center">Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[12.5px]">
                  {filteredWorkers.map((worker) => {
                    const isPresent = worker.status === "Present";
                    const rowSyncState = savingStates[worker.id];

                    return (
                      <tr
                        key={worker.id}
                        className="hover:bg-slate-50/40 transition-colors group"
                      >
                        {/* Worker Identity */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-navy/5 text-brand-navy flex items-center justify-center font-bold text-[11px] shadow-sm border border-brand-navy/10 tracking-wider">
                              {getInitials(worker.name)}
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="font-bold text-slate-700 hover:text-brand-gold transition-colors">
                                {worker.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[10.5px]">
                                <span className="font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                                  {worker.worker_id || worker.display_id || "—"}
                                </span>
                                <span className="text-slate-400 font-semibold">•</span>
                                <span className="text-slate-400 truncate max-w-[180px]">
                                  {worker.client_name
                                    ? `${worker.client_name} (${worker.site || "No Site"})`
                                    : "Available / Unassigned"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Direct PAL Buttons */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            {/* Present Toggle */}
                            <button
                              onClick={() => handleStatusToggle(worker.id, "Present")}
                              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center border transition-all cursor-pointer shadow-sm ${
                                isPresent
                                  ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6] ring-2 ring-emerald-100"
                                  : "bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                              title="Mark Present"
                            >
                              P
                            </button>

                            {/* Absent Toggle */}
                            <button
                              onClick={() => handleStatusToggle(worker.id, "Absent")}
                              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center border transition-all cursor-pointer shadow-sm ${
                                worker.status === "Absent"
                                  ? "bg-[#FFF5F5] text-red-700 border-red-100 ring-2 ring-red-100"
                                  : "bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                              title="Mark Absent"
                            >
                              A
                            </button>

                            {/* Leave Toggle */}
                            <button
                              onClick={() => handleStatusToggle(worker.id, "Leave")}
                              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center border transition-all cursor-pointer shadow-sm ${
                                worker.status === "Leave"
                                  ? "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3] ring-2 ring-amber-100"
                                  : "bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                              title="Mark On Leave"
                            >
                              L
                            </button>
                          </div>
                        </td>

                        {/* Inline Check In */}
                        <td className="px-4 py-4 text-center">
                          <input
                            type="time"
                            value={worker.check_in}
                            disabled={!isPresent}
                            onChange={(e) => handleInputChange(worker.id, "check_in", e.target.value)}
                            onFocus={() => handleInputFocus(worker)}
                            onBlur={() => handleInputBlur(worker.id)}
                            className="w-full max-w-[110px] mx-auto px-2.5 py-1.5 border border-slate-200 rounded-xl text-center font-mono text-[11.5px] text-slate-600 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold disabled:bg-slate-50 disabled:text-slate-300 disabled:border-slate-100 transition-all bg-slate-50/10 shadow-sm"
                          />
                        </td>

                        {/* Inline Check Out */}
                        <td className="px-4 py-4 text-center">
                          <input
                            type="time"
                            value={worker.check_out}
                            disabled={!isPresent}
                            onChange={(e) => handleInputChange(worker.id, "check_out", e.target.value)}
                            onFocus={() => handleInputFocus(worker)}
                            onBlur={() => handleInputBlur(worker.id)}
                            className="w-full max-w-[110px] mx-auto px-2.5 py-1.5 border border-slate-200 rounded-xl text-center font-mono text-[11.5px] text-slate-600 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold disabled:bg-slate-50 disabled:text-slate-300 disabled:border-slate-100 transition-all bg-slate-50/10 shadow-sm"
                          />
                        </td>

                        {/* Inline OT Hours */}
                        <td className="px-4 py-4 text-center">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            value={worker.ot_hours === 0 ? "" : worker.ot_hours}
                            placeholder="0"
                            disabled={!isPresent}
                            onChange={(e) => handleInputChange(worker.id, "ot_hours", e.target.value)}
                            onFocus={() => handleInputFocus(worker)}
                            onBlur={() => handleInputBlur(worker.id)}
                            className="w-full max-w-[80px] mx-auto px-2.5 py-1.5 border border-slate-200 rounded-xl text-center font-bold text-[11.5px] text-slate-700 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold disabled:bg-slate-50 disabled:text-slate-300 disabled:border-slate-100 transition-all bg-slate-50/10 shadow-sm"
                          />
                        </td>

                        {/* Row Status Feedback indicator */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center w-5 h-5 mx-auto">
                            {rowSyncState === "saving" && (
                              <Loader2 size={13} className="animate-spin text-slate-400" />
                            )}
                            {rowSyncState === "saved" && (
                              <Check size={14} className="text-emerald-500 font-bold animate-in zoom-in" />
                            )}
                            {rowSyncState === "error" && (
                              <AlertTriangle size={14} className="text-red-500 animate-bounce" title="Failed to save" />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* --- CLEAR REGISTER CONFIRMATION MODAL --- */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200 text-left border border-slate-100">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertTriangle size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-800">Clear Attendance Logs?</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    This action will delete all attendance records (Present, Absent, and On Leave logs) for **{formatDisplayDate(selectedDate)}** from the database. This action is irreversible.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 border-t border-slate-50 pt-5">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-5 py-2.5 text-[11px] font-bold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAllToday}
                  className="px-5 py-2.5 text-[11px] font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer shadow-lg shadow-red-600/15"
                >
                  Yes, Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// --- SUB-COMPONENTS ---

function MetricCard({ title, value, icon, colorClass }) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 flex items-center gap-5 hover:translate-y-[-2px] transition-all hover:shadow-md duration-300">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h4 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">{value}</h4>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 flex items-center gap-5 animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="h-2.5 bg-slate-100 rounded w-1/2" />
        <div className="h-5 bg-slate-100 rounded w-1/3" />
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-slate-100 rounded w-full mb-6" />
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="flex items-center gap-6 py-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-slate-100 rounded w-1/4" />
            <div className="h-2.5 bg-slate-100 rounded w-1/3" />
          </div>
          <div className="w-32 h-8 bg-slate-100 rounded-xl" />
          <div className="w-24 h-8 bg-slate-100 rounded-xl" />
          <div className="w-24 h-8 bg-slate-100 rounded-xl" />
          <div className="w-16 h-8 bg-slate-100 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
